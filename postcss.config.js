const postcss = require('postcss')
module.exports = {
  plugins: {
    'postcss-sprites': {
      spritePath: './tmp',
      filterBy: function (image) {
        // Allow only png files with ?_
        if (!/\w+\._\w+_\.png$/.test(image.originalUrl)) {
          return Promise.reject(new Error('Ignore'))
        }
        return Promise.resolve()
      },
      groupBy: function (image) {
        const group = image.originalUrl
          .match(/_\w+_\.png$/)[0]
          .split('.')[0]
        return Promise.resolve(group.substring(1, group.length - 1))
      },
      spritesmith: {
        padding: 10
      },
      hooks: {
        onUpdateRule: function (rule, token, image) {
          let backgroundSizeX = (image.spriteWidth / image.coords.width) * 100
          // let backgroundSizeY = (image.spriteHeight / image.coords.height) * 100
          let backgroundPositionX = (image.coords.x / (image.spriteWidth - image.coords.width)) * 100
          let backgroundPositionY = (image.coords.y / (image.spriteHeight - image.coords.height)) * 100

          backgroundSizeX = isNaN(backgroundSizeX) ? 0 : backgroundSizeX
          // backgroundSizeY = isNaN(backgroundSizeY) ? 0 : backgroundSizeY
          backgroundPositionX = isNaN(backgroundPositionX) ? 0 : backgroundPositionX
          backgroundPositionY = isNaN(backgroundPositionY) ? 0 : backgroundPositionY

          const backgroundImage = postcss.decl({
            prop: 'background-image',
            value: 'url(' + image.spriteUrl + ')'
          })

          const backgroundSize = postcss.decl({
            prop: 'background-size',
            value: backgroundSizeX + '% '//  + backgroundSizeY + '%'
          })

          const backgroundPosition = postcss.decl({
            prop: 'background-position',
            value: backgroundPositionX + '% ' + backgroundPositionY + '%'
          })
          const backgroundRepeat = postcss.decl({
            prop: 'background-repeat',
            value: 'no-repeat '
          })

          rule.insertAfter(token, backgroundImage)
          rule.insertAfter(backgroundImage, backgroundPosition)
          rule.insertAfter(backgroundPosition, backgroundSize)
          rule.insertAfter(backgroundPosition, backgroundRepeat)
        }
      }
    },
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3,
      features: {
        'custom-properties': false
      }
    },
    cssnano: {
      preset: 'default'
    }
  }
}

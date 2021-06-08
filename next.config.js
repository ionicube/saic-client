const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const nextConfig = {
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT || 'https://saic-cms.mediaman.com.cn/graphql',
    REST_ENDPOINT: process.env.REST_ENDPOINT || 'https://saic-cms.mediaman.com.cn/wp-json',
    // FOR data import
    JWT_AUTH_USER: process.env.JWT_AUTH_USER,
    JWT_AUTH_PASSWORD: process.env.JWT_AUTH_PASSWORD,
    WeChat_APP_ID: process.env.WeChat_APP_ID,
    WeChat_APP_SECRET: process.env.WeChat_APP_SECRET
  },
  async redirects () {
    return []
  },
  future: {
    webpack5: true
  }
}
module.exports = withPlugins([
  withImages
], nextConfig)

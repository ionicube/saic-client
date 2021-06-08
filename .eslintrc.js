module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'standard',
    'standard-jsx',
    'standard-react'
  ],
  rules: {},
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: [
    'react-hooks',
    'graphql'
  ]
}

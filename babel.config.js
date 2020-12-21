module.exports = {
  plugins: [
    '@babel/plugin-transform-typescript',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ]
}

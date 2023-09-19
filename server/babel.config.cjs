module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
  plugins: [
    'tsconfig-paths-module-resolver',
    '@babel/plugin-transform-typescript',
  ],
}

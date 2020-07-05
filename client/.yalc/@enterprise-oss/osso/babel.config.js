module.exports = {
  plugins: [['babel-plugin-root-import']],
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-react', '@babel/preset-typescript'],
};

// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-import')({
      addModulesDirectories: ['node_modules', 'web_modules']
    }),
  ]
}
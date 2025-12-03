module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        browserslistEnv: 'javascripts',
        bugfixes: true,
        loose: true,
        modules: true
      }
    ]
  ]
}

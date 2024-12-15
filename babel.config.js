module.exports = {
    presets: [
      ['@babel/preset-env', {
        targets: {
          ie: '11',
          edge: '14',
          firefox: '52',
          chrome: '49',
          safari: '10',
        },
        useBuiltIns: 'usage',
        corejs: 3,
        modules: false
      }],
      ['@babel/preset-react', {
        runtime: 'automatic'
      }],
      '@babel/preset-typescript'
    ],
    plugins: [
      '@babel/plugin-transform-runtime'
    ]
  };
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        // targets: {
        //   node: '6.5', /* ES2015 compilation target */
        // },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    [
      'module-resolver',
      {
        extensions: ['.js'],
        root: ['./src'],
        alias: {
          '~': '.',
          src: './src',
        },
      },
    ],
  ],
};

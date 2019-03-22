/*
 * webpack 4+
 * */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');

// const IsWebpackDevServer = /webpack-dev-server/.test(process.env.npm_lifecycle_script);

module.exports = (env = {}, argv = {}) => {
  //console.log('***', 'env', env, 'argv', argv, '***');

  const PRODUCTION = 'production';
  const DEVELOPMENT = 'development';
  const VALIDATE = 'validate';

  const entries = {
    [DEVELOPMENT]: './src/development-entry',
    [VALIDATE]: './src/validate-entry',
  };

  let type = env.VALIDATE ? VALIDATE : DEVELOPMENT;
  
  let port = env.PORT ? env.PORT : 5555;
  
  const isProd = argv.mode === PRODUCTION;
  
  let entry = entries[type];

  console.log('***', type, entry, '***');

  let config = {
    devtool: 'cheap-module-source-map',
    mode: DEVELOPMENT,
    optimization: {
      minimizer: [

      ].filter(Boolean),
    },
    entry: {
      fuzzyToggle: entry,
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: '[name].js',
      filename: '[name].js',
      library: 'fuzzyToggle',
      libraryTarget: 'umd',
      publicPath: '/',
    },
    devServer: {
      //https: true,
      port,
      contentBase: path.join(__dirname, ''),
      publicPath: '/',
      open: true,
      hot: true,
      disableHostCheck: true,
      watchContentBase: true,
      historyApiFallback: true,
    },
    performance: {
      maxEntrypointSize: 5000,
      hints: 'warning',
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: isProd,
              },
            },
          ],
        },
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          include: path.join(__dirname, 'src'),
          use: {
            loader: 'babel-loader',
          },
        },
      ].filter(Boolean),
    },
    plugins: [
      new HtmlWebpackPlugin({
        compile: false,
        inject: true,
        hash: true,
        template: 'src/index.html',
        filename: 'index.html',
      }),
      !isProd && new webpack.HotModuleReplacementPlugin(),
      new WebpackMd5Hash(),
    ].filter(Boolean),
    resolve: {
      //modules: [path.resolve(__dirname), 'node_modules'],
      extensions: ['.js'],
      alias: {
        root: __dirname,
        src: path.resolve(__dirname, 'src'),
        dist: path.resolve(__dirname, 'dist'),
      },
    },
    externals: {},
  };

  return config;
};

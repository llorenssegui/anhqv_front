const webpack = require('webpack');
const dotenv = require('dotenv');

let env = dotenv.config().parsed;

if(env === undefined || env === null) env = process.env;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js',
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'app.bundle.js'
  },
  performance: {
    hints: false
  },
  watch: false,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(envKeys)
  ],
  devtool: false,
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
    port: 5000
  }
};
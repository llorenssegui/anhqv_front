const webpack = require('webpack');
const dotenv = require('dotenv');


module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
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
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: false,
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
    port: 5000
  }
};
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./react/index.js",
  output: {
    filename: '[name]-[hash].js',
    path: __dirname + "/dist",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true
    })
  ]
}

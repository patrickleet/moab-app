module.exports = {
  entry: './src/ui/client.js',
  output: {
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }, {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  devServer: {
  },
  devtool: 'eval-source-map'
}

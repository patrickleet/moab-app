var IsomorphicLoaderPlugin = require("isomorphic-loader/lib/webpack-plugin");

module.exports = {
  entry: './src/ui/client.js',
  output: {
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file!isomorphic"
      },
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
  plugins: [
    new IsomorphicLoaderPlugin({
      webpackDev: {
        url: "http://localhost:3020",
        addUrl: true
      }
    })
  ],
  devServer: {
  },
  devtool: 'eval-source-map'
}

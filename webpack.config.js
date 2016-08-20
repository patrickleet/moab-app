const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './ui/index.js',
  output: {
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000'
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
    new HtmlWebpackPlugin({
      template: 'ui/index.html'
    })
  ],
  devServer: {
    proxy: {
      "/graphql": "http://localhost:3010/graphql",
      "/graphiql": "http://localhost:3010/graphiql",
      "/login/*": "http://localhost:3010",
      "/logout": "http://localhost:3010"
    },
    historyApiFallback: {
      index: '/',
    },
  },
}

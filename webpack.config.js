var path = require('path');
module.exports = {
  entry: {
    app: './app.coffee'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
    filename: '[name].js',
    library: 'EmojiPaint',
    libraryTarget: 'var'
  },
  module: {
    loaders: [
      { test: /\.coffee$/, loader: 'coffee-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.coffee']
  }
};
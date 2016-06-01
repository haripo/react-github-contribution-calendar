module.exports = {
  entry: './src/calendar.jsx',
  output: {
    filename: './lib/index.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'babel-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

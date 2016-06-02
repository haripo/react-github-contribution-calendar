module.exports = {
  entry: './main.jsx',
  output: {
    filename: './bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'babel-loader' }
    ]
  },
  resolve: {
    modulesDirectories: ['../node_modules'],
    extensions: ['', '.js', '.jsx']
  }
};

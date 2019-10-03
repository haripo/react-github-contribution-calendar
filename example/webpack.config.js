module.exports = {
  entry: './main.jsx',
  output: {
    filename: './bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['../node_modules'],
    extensions: ['.js', '.jsx']
  }
};

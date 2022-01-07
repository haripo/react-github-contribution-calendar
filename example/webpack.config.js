module.exports = {
  mode: 'production',
  entry: './main.jsx',
  output: {
    filename: './bundle.js'
  },
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

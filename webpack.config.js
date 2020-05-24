const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'easy-utils.js',
    library: 'easyUtils',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js|.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/, 
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],  
}
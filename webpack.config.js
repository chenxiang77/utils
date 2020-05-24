'use strict';
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
        use: [
          {
            loader: 'babel-loader',
            options: {
              "plugins": [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    "absoluteRuntime": false,
                    "corejs": 2,
                    "helpers": true,
                    "regenerator": true,
                    "useESModules": false,
                    "version": "7.0.0-beta.0"
                  }
                ]
              ]
            },
          }, 
          'ts-loader'
        ],
        exclude: /node_modules/, 
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],  
}
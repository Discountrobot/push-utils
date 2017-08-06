const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'scripts.ts'),
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        }
      }
    ],
  },
  output: {
    path: __dirname,
    filename: "scripts.min.js"
  },
  resolve: {
    alias: {
      'node-forge': path.resolve(__dirname, 'vendor', 'forge.min.js')
    }
  }
};
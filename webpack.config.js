const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {
    app: './src/index.ts'
  },

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },

  devtool: 'inline-source-map',

  devServer: {
    contentBase: './dist',
  },

  module: {
    rules: [
      {
        // Currently run babel only for new TypeScript code
        test: /\.(t|j)sx?$/,
        use: {
            loader: 'babel-loader',
        }
      },
      {
        // The file-loader is used in conjuction with html-loader
        test: /\.(png|jpe?g|gif)$/i,
        use: {
            loader: 'file-loader'
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Tree Drawing',
    }),
  ],

  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.tsx', '.jsx', '.json'],
  },

  watchOptions: {
      ignored: /node_modules/
  }
};
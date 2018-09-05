require("babel-polyfill");

// require('css-modules-require-hook')({
//   generateScopedName: '[path][name]__[local]__[hash:base64:5]',
//   extensions: ['.scss', '.css'],
//   camelCase: true
// });

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var combineLoaders = require('webpack-combine-loaders');

module.exports = {
  entry: ["babel-polyfill", './src/index.js'],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js'
  },

  

  module: {
    rules: [
      // {
      //   test: /\.scss$/,
      //   include: [
      //     path.join(__dirname, 'node_modules/wix-style-react'),
      //     path.join(__dirname, 'node_modules/bootstrap-sass') // only if you use Grid component
      //   ],
      //   loaders: [
      //     'style-loader',
      //     'css-loader?modules&importLoaders=1&camelCase&localIdentName=[name]__[local]___[hash:base64:5]',
      //     'sass-loader'
      //   ]
      // },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },

      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract(
      //     'css-loader',
      //     combineLoaders([{
      //       loader: 'style-loader',
      //       query: {
      //         modules: true,
      //         localIdentName: '[name]__[local]___[hash:base64:5]'
      //       }
      //     }])
      //   )
      // },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      {
        test: /\.less$/,
        use: ['less-loader']
      },

      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
			{ test: /\.(woff|woff2)$/, loader:"url-loader?prefix=font/&limit=5000" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" }



  ],

  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin('styles.css')
  ]
};



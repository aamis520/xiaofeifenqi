var path = require('path')
var fs = require('fs')
var utils = require('./utils')
var config = require('./config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: ''
  },
  output: {
    path: '',
    filename: '[name].js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      // {
      //   test: /\.css$/,
      //   use: [ 'style-loader', 'css-loader' ],
      //   exclude: /node_modules/
      // },
      // {
      //   test: /\.less$/,
      //   use: [{
      //       loader: "style-loader"
      //   }, {
      //       loader: "css-loader"
      //   }, {
      //       loader: "less-loader"
      //   }],
      //   exclude: /node_modules/
      // },
      // {
      //   test: /\.scss$/,
      //   use: [{
      //       loader: "style-loader"
      //   }, {
      //       loader: "css-loader"
      //   }, {
      //       loader: "sass-loader"
      //   }],
      //   exclude: /node_modules/  
      // }
    ]
  }
}

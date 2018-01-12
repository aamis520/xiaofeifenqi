/**
 * 组装本地自测环境webpack配置
 * @date: 2017-09-25
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

const utils = require('./utils'); 
const webpackConfig = require('./webpack.dev.conf');

function webpackDev ( wyConfig ) {
    // 设置entry
    webpackConfig.entry.app = utils.getEntryFileAbsolutePath();
    // add hot-reload related code to entry chunks
    webpackConfig.entry.app = ['./build/dev-client'].concat( webpackConfig.entry.app );

    // 设置output
    webpackConfig.output.path = wyConfig.devAssetsRoot;
    webpackConfig.output.publicPath = wyConfig.assetsPublicPath;

    // 设置HtmlWebpackPlugin
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    const htmlWebpackPlugin = new HtmlWebpackPlugin({
      filename: 'index.html',
      template: utils.getTemplateFileAbsolutePath(),
      inject: true
    });
    webpackConfig.plugins.splice( 3,0,htmlWebpackPlugin );

    return webpackConfig;
}

module.exports = webpackDev;

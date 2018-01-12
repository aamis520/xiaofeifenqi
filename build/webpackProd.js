/**
 * 组装生产环境webpack配置
 * @author: gaoyong@weiyankeji.cn
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

const utils = require('./utils'); 
const webpackConfig = require('./webpack.prod.conf');

function webpackProd ( wyConfig ) {
    // 设置entry
    webpackConfig.entry.app = utils.getEntryFileAbsolutePath();

    // 设置output
    webpackConfig.output.path = wyConfig.assetsRoot;
    webpackConfig.output.publicPath = wyConfig.assetsPublicPath;

    // 设置devtool
    webpackConfig.devtool = wyConfig.productionSourceMap ? '#cheap-module-eval-source-map' : false;

    // 设置HtmlWebpackPlugin
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    const htmlWebpackPlugin = new HtmlWebpackPlugin({
      filename: wyConfig.templateFileAbsolutePathName,
      template: utils.getTemplateFileAbsolutePath(),
      inject: true,
      minify: {
        removeComments: true,
        // collapseWhitespace: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    });
    webpackConfig.plugins.splice( 4,0,htmlWebpackPlugin );

    return webpackConfig;
}

module.exports = webpackProd;

/**
 * for 联调
 * @author: gaoyong@weiyankeji.cn
 * @date: 2017.09.24
 */
require('./check-versions')()

const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');

const parser = require('./parser');
const wyfe = require('../wyfe');

const webpackProd = require('./webpackProd');
const MyEmitHook = require('./pluginHook').MyEmitHook;

// 初始化
async function init () {
    // 得到非webpack配置信息 
    const wyConfig = await parser.parseBuild( wyfe );

    // 得到webpack配置信息
    const webpackConfig = webpackProd( wyConfig );

    // 添加plugins
    addPlugins( webpackConfig );

    //webpack watching
    watch( wyConfig,webpackConfig );

    return '联调监控中!!!!!!!!';
}

/**
 * 添加插件
 * @param {*} webpackConfig 
 */
function addPlugins ( webpackConfig ) {
    const myEmitHook = new MyEmitHook();

    webpackConfig.plugins.splice( 5,0,myEmitHook );
} 

/**
*  开始编译
*   @config: 
*   @webpackConfig: 
*/
function watch ( config,webpackConfig ) {
    console.log(chalk.green('start webpack watching.\n'))

    rm( config.assetsRoot, err => {
        if (err) throw err

        const compiler = webpack(webpackConfig);

        const watching = compiler.watch({
            aggregateTimeout: 300,
            poll: 1000
        },(err, stats) => {
            if (err) throw err;

            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n\n')

            if (stats.hasErrors()) {
                console.log(chalk.red('  Build failed with errors.\n'))
                process.exit(1)
            }
        });
    })
}

init().then( data => {
    console.log(`${data}`);
} ).catch( err => {
    console.log(`err: ${err}`);
} );




require('./check-versions')()

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');

const parser = require('./parser');
const wyfe = require('../wyfe');

const webpackProd = require('./webpackProd');

// 初始化
async function init () {
    // 得到非webpack配置信息 
    const wyConfig = await parser.parseBuild( wyfe );

    // 得到webpack配置信息
    const webpackConfig = webpackProd( wyConfig );

    // 编译
    await build( wyConfig,webpackConfig );

    return `构建工具构建成功!!!!!!!!`;
}

/**
*  开始编译
*   @config: 
*   @webpackConfig: 
*/
function build ( config,webpackConfig ) {
  var spinner = ora('building for production...')
  spinner.start()

  return new Promise( ( resolve,reject ) => {
      rm( config.assetsRoot, err => {
        if (err) throw err
        
        webpack(webpackConfig, function (err, stats) {
          spinner.stop()
          if (err) reject(err)
          process.stdout.write(stats.toString({
            colors: false,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
          }) + '\n\n')

          if (stats.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'))
            process.exit(1)
          }

          console.log(chalk.cyan('  Build complete.\n'))
          console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
          ))

          resolve( true );
        })
      })
  });
}

init().then( data => {
    console.log(`${data}`);
} ).catch( err => {
    console.log(`err: ${err}`);
} );

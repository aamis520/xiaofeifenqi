require('./check-versions')()

var config = require('./config');
const wyfe = require('../wyfe');
const parser = require('./parser');
const bodyParser = require('body-parser')

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
const webpackDev = require('./webpackDev');
var proxyMiddleware = require('http-proxy-middleware')

const routerManager = require('./routerManager');

process.env.NODE_ENV = 'development';

// default port where dev server listens for incoming traffic
const port = parseInt( wyfe.devPort );
// automatically open browser, if not set will be false
var autoOpenBrowser = true;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable;

let server;

// 初始化
async function init () {
  // 得到非webpack配置信息 
  const wyConfig = await parser.parseDev( wyfe );

  // 得到webpack配置信息
  const webpackConfig = webpackDev( wyConfig );

  // 编译
  await startDevServer( wyConfig,webpackConfig );

  return `本地自测服务器启动,端口: ${port} !!!`;
}

async function startDevServer ( wyConfig,webpackConfig ) {
  var app = express()
  
  // 添加json解析
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json()) 


  await routerManager.addRoutes(app);
  
  var compiler = webpack(webpackConfig)

  var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
  })

  var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    heartbeat: 2000
  })
  // force page reload when html-webpack-plugin template changes
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      hotMiddleware.publish({ action: 'reload' })
      cb()
    })
  })

  // proxy api requests
  Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
      options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
  })

  // handle fallback for HTML5 history API
  app.use(require('connect-history-api-fallback')())

  // serve webpack bundle output
  app.use(devMiddleware)

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware)

  // serve pure static assets
  var staticPath = path.posix.join(wyConfig.assetsPublicPath, '.');
  app.use(staticPath, express.static('./static'))
	
  var uri = 'http://localhost:' + port

  devMiddleware.waitUntilValid(() => {
    // when env is testing, don't need open it
    if ( autoOpenBrowser ) {
      opn(uri)
    }
  });

  

  await new Promise( ( resolve,reject ) => {
      server = app.listen(port, () => {
        resolve( port );
      });
  } );

  
}

init().then( data => {
    console.log(`data : ${data}`);
} ).catch( err => {
    console.log(`err : ${err}`);
} );


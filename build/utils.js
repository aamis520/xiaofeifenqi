const path = require('path');
const config = require('./config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');
const wyfe = require('../wyfe');

const projectPath = path.join( __dirname,'..' );
exports.projectPath = projectPath;

/**
 * 得到入口文件的绝对路径
 */
exports.getEntryFileAbsolutePath = function () {
    const filePath = path.join( projectPath,wyfe.entry );
    return filePath;
};

/**
 * 得到模版文件的绝对路径
 */
exports.getTemplateFileAbsolutePath = function () {
    const filePath = path.join( projectPath,wyfe.templateFile );
    return filePath;
};

/**
 * 得到模版文件目录下的所有模版文件的文件名
 */
exports.getAllTemplateNames = function () {
    return new Promise( ( resolve,reject ) => {
        glob(config.templateFileDir,{ dot:false },( err, files ) => {
            if ( err ) {
                reject(err);
                return;
            }

            resolve( files );
        });
    } );  
}


exports.assetsPath = function (_path) {
  // var assetsSubDirectory = process.env.NODE_ENV === 'production'
  //   ? config.build.assetsSubDirectory
  //   : config.dev.assetsSubDirectory
  // return path.posix.join(assetsSubDirectory, _path)
  return path.posix.join('.',_path);
}



exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

/**
*   核心项目配置文件,主要用于构建工具
*/
const path = require('path');

module.exports = {
	// dev模式
	devPort: 8083,
	devAssetsRoot: './dist',
	devAssetsPublicPath: '/',
	// 入口文件相对路径
	entry: './src/main.js',
	/**
	* 前端静态资源目录
	*   注意必须放到后台工程的某个目录中
	*/
	assetsRoot: '../public/static/vue/',
	testAssetsPublicPath: 'http://39.106.8.2:8120/static/vue/',
	assetsPublicPath: 'https://www.weiyankeji.cn/static/vue',
	/**
	*  后台模版文件
	*/
	templateFile: './tpl/index.html',
	type: 'php',
	templateDir: '../resources/views/vue/',
	outputTemplateFileName: 'index.blade.php'
}

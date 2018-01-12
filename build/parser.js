/**
*   解析配置
*/
const path = require('path');

const utils = require('./utils');
const config = require('./config');

const parser = {
	parseDev ( wyfeObj ) {
		if ( !wyfeObj ) {
			throw new Error('parser parseBuild param error!!!!');
			return null;
		}

		const tmp = wyfeObj.templateFile.split('/');
		const templateFileName = tmp[ tmp.length-1 ];

		const assetsRoot = path.join(__dirname,'..',wyfeObj.devAssetsRoot);

		
		const templateFileAbsolutePathName = path.join( utils.projectPath,
					wyfeObj.templateDir,wyfeObj.outputTemplateFileName );		

		const wyConfig = Object.assign({},config.build,{
			templateFileAbsolutePathName,
			assetsRoot,
			assetsPublicPath: wyfeObj.devAssetsPublicPath
		});

		// 设置HtmlWebpackPlugin
		wyConfig.index = utils.getTemplateFileAbsolutePath;

		return wyConfig;
	},
	async parseBuild ( wyfeObj ) {
		if ( !wyfeObj ) {
			throw new Error('parser parseBuild param error!!!!');
			return null;
		}

		const tmp = wyfeObj.templateFile.split('/');
		const templateFileName = tmp[ tmp.length-1 ];

		const assetsRoot = path.join(utils.projectPath,wyfeObj.assetsRoot);
		
		const templateFileAbsolutePathName = path.join( utils.projectPath,
					wyfeObj.templateDir,wyfeObj.outputTemplateFileName );
					
		const assetsPublicPath =  process.env.NODE_ENV == 'production' ? 
						wyfeObj.assetsPublicPath : wyfeObj.testAssetsPublicPath;			

		const wyConfig = Object.assign({},config.build,{
			templateFileAbsolutePathName,
			assetsRoot,
			assetsPublicPath
		});

		// 设置HtmlWebpackPlugin
		wyConfig.index = utils.getTemplateFileAbsolutePath;

		return wyConfig;
	}
};


module.exports = parser;

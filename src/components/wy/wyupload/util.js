/**
*  工具类
*  @author: gaoyong@weiyankeji.cn
*  @date: 2017.11.02
*/
import config from './config'

let $uid = 0;


function createTwoWei ( val ) {
	if ( val < 10 ) {
		return '0' + val;
	}

	return ''+val;
}

function createBigRandom () {
	return (++$uid) + parseInt(Math.random() * 100000);
}


/**
*  产生当前时刻的字符串表示 年-月-日-时-分-秒
*/
function createCurrentTimeStr () {
	const currentTime = new Date();
	let year = currentTime.getFullYear(),
			month = currentTime.getMonth()+1,
			date = currentTime.getDate(),
			hour = currentTime.getHours(),
			minute = currentTime.getMinutes(),
			second = currentTime.getSeconds();
	month = createTwoWei( month );
	date = createTwoWei( date );
	hour = createTwoWei( hour );
	minute = createTwoWei( minute );
	second = createTwoWei( second );

	const ret = `${year}-${month}-${date}-${hour}-${minute}-${second}`
						 + '-' + createBigRandom();
	return ret;
}

const util = {
	/**
	*    userName:用户名
	*	 fileName:文件名
	*    exsmple: yd/uploads/**_2017-04-26_16-17-09089_房屋.jpg
	*/
	createUserDateFileKey ( userName,fileName ) {  
		let filePathName = config.projectPrefixCode + userName + '_';
		filePathName += createCurrentTimeStr();
		filePathName += '__' + fileName;

		return filePathName;
	},
	createFileCDNURI ( cdnUrl,key ) {
		if ( cdnUrl[cdnUrl.length-1] != '/' ) {
			cdnUrl += '/';
		}

		return cdnUrl + key;
	}
};

export default util;
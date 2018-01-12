/**
*   七牛云element扩展
*	@date: 2017.11.02
*/
import config from '../config'
import util from '../util'
import database from './database'

export default function onSuccessFactory ( successFn ) {
	if ( typeof successFn != 'function' ) {
	    throw new Error('onSuccessFactory get error type successFn!');
	    return;
	}

	return function (response, file, fileList) {
		// 得到订单ID
		const field = this.name,
				key = response.key,
				fileCNDURI = util.createFileCDNURI( database.qiniu_url,key );
		file.fileCNDURI = fileCNDURI;	

		successFn( field,fileCNDURI,file );
	}
}
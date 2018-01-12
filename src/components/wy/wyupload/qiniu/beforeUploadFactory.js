/**
*   七牛云element扩展
*	@date: 2017.11.02
*/
import axios from 'axios'
import config from '../config'
import database from './database'

export default function beforeUploadFactory ( inspectFn ) {
	if ( typeof keyFn != 'undefined' ) {
	    throw new Error('beforeUploadFactory get error type keyFn!');
	    return;
	}

	return function ( file ) {
		if ( !inspectFn() ) {
			return false;
		}

		const self = this;

		const now = Date.now();
		if ( now - database.lastsTimestamp < config.tokenPeriod ) { //缓存
			return true;
		}

		database.lastsTimestamp = now;
		return new Promise( ( resolve,reject ) => {
			axios.post(config.tokenUrl,null)
				.then( response => {
					if ( response.data.code === 0 ) {
						database.token = response.data.data.upload_token;
						database.qiniu_url = response.data.data.qiniu_url;
						
						resolve(true);
					} else {
						reject( new Error(`server error code : ${response.data.code}`) );
					}
				} )
				.catch( error => {
					reject(error);
				} );
		} );
	}
}

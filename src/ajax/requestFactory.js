/**
*  基于axios的请求生成工厂
*	@date: 2017.09.05
*	注意返回值一律为Promise类型
*/
import URI from './uri'
import restUrl from 'rest-url'


const requestFactory = {
	// common
	createCommonInfoRequest () {
		const request = window.$axios.get( URI.common_info );

		return request;
	},
	// platform ----------------------------------------
	createPlatformListRequest ( paramObj ) {
		const url = URI.platform_list;

		let request = window.$axios.get( url,{
			params: paramObj
		} );

		return request;
	},
	createPlatformInfoUrl ( platformId ) {
		if ( !platformId ) {
			throw new Error('platformId is empty!!!!');
			return;
		}

		const url = restUrl.make( URI.platform_info,{ id: platformId } );
		return url;
	}
};

export default requestFactory

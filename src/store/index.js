/**
*   状态管理
*   @author: gaoyong@weiyankeji.cn
*   @date: 2017.08.29
*/
import Vuex from 'vuex'

import state from './state'
import getters from './'
import mutations from './mutations'
import actions from './actions'
import plugin from './plugin'

let _Vue,store;
function init ( Vue ) {
	if ( _Vue || !Vue ) {
		return null;
	}
	Vue.use( Vuex );

	store = new Vuex.Store({
	    state,
	    mutations,
		actions,
		plugins: [plugin]
	});

	return store;
}
	

export default init
/**
*   mutation
*   @author: gaoyong@weiyankeji.cn
*   @date: 2017.08.29 
*/
import types from './types'

export default {
	
	[types.preview_show] ( state, payload ) {
		if ( payload && payload.length > 0 ) {
			state.preivew.contents = payload;
			state.preivew.visibility = true;
		}
	},
	[types.preview_hide] ( state, payload ) {
		state.preivew.contents = [];
		state.preivew.visibility = false;
	},
	[types.ajax_loading] ( state, payload ) {
		state.common.ajaxLoading = payload;
	},
	[types.user_role] ( state, payload ) {
		state.userInfo.currentRole = payload;
	},
	[types.user_role_id] ( state, payload ) {
		state.userInfo.role_id = payload;
	},
	
}

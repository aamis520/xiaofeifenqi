/**
*   uri资源配置 
*/

const uri = {
		//后台管理 审核 授信  校园大使
		user_list:'/fe-api/admin/user/list',
		user_add:'/fe-api/admin/user/add',
		user_update:'/fe-api/admin/user/update',
		file_upload:'/file/upload',
		switch_role:'/fe-api/switch-role',
		common_data:'/fe-api/common',
		//运营员
		
		//TODO 联调的时候需要更改URL 并且每个调用的地方也要使用rest-url处理
		//申请列表 GET
		apply_list: ' /fe-api/apply/list/:role_name/:type',
		//申请详情 GET
		apply_detail:'/fe-api/apply/:apply_id/detail/:role_name/:type',
		//接单 POST
		apply_accept:'/fe-api/apply/:apply_id/accept/:role_name',
		//审核处理  POST
		apply_operate:'/fe-api/apply/:apply_id/operate/:role_name',
		
		//运营员 
		// 统计 GET
		operation_statics:'/fe-api/operation/statistics',
		//申请列表
		//同审批的申请列表API 即 apply_list
		//申请详情
		//同审批的申请列表API 即 apply_detail
		
		//系统管理员--后台管理
		//人员列表 
		//添加人员 POST
		//修改人员 POST
		user_update:'/fe-api/admin/user/:user_id/update',
		change_password:"/fe-api/update-password",
		switch_language:'/fe-api/switch-locale',
		file_upload:'/file/upload '
};

export default uri

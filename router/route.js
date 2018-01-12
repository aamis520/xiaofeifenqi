/**
 * 自定义路由
 */
function createResponseJSON ( data ) {
	return {
		code: 0,
		msg: 'ok',
		data: data
	};
}

function responseWithWait ( res,data,wait = 1000 ) {

	setTimeout( () => {
		res.json( createResponseJSON( data ) )
	}, wait);

}

function responseError(res,data,wait = 500){
	setTimeout( () => {
		res.json( {
			code:1,
			msg:"error",
			data:data
		} )
	}, wait);
}



function addRoutes ( app ) {
	var role_id = "1"
	// 获取用户信息
    app.post('/api/web/user/info', ( req,res ) => {
        responseWithWait( res, {
            "id": 3,
            "name": "张三",
            "email": "zhangsan@weiyankeji.cn",
            "mobile": "18818888888",
            "roles": [
              {
                "display_name": "校园大使",
                "name": "xyds"
              },
              {
                "display_name": "运营员",
                "name": "yyy"
              },
              {
                "display_name": "审核员",
                "name": "shy"
              },
              {
                "display_name": "授信员",
                "name": "sxy"
              },
              {
                "display_name": "账号管理",
                "name": "gly"
              }
            ]
        });
    });    
    // 获取左侧菜单数据
	app.post('/api/web/menu/lists', ( req,res ) => {
		let menus = []
		var body = req.body
    		if(body.role == "xyds" || body.role == "校园大使"){
    			menus = [{
                "id": 7,
                "name": "校园大使-未处理",
                "th_name":"weichuli",
                "route_uri": "/fe/xydswcl",
                "level": 1,
                "sub": [
                  {
                    "id": 8,
                    "name": "未处理",
                    "th_name":"weichuli",
                    "route_uri": "/fe/xydswcl",
                    "level": 2,
                    "sub": []
                  },
                  {
                    "id": 8,
                    "name": "已处理",
                    "th_name":"yichuli",
                    "route_uri": "/fe/xydsycl",
                    "level": 2,
                    "sub": [
                        {
	                        	"id": 9,
		                    "name": "详情",
		                    "th_name":"xiangqing",
		                    "route_uri": "/fe/xydsycl/yclxqym",
		                    "level": 2,
		                    "sub": []
                        }
                    ]
                  }
                ]
            }]
    		}
    		if(body.role == "账号管理"){
    			menus = [{
                    "id": 7,
                    "name": "账号管理",
                    "th_name":"zhanghaoguanli",
                    "route_uri": "#",
                    "level": 1,
                    "sub": [
                    		{
	                        "id": 8,
	                        "name": "账号管理",
	                        "th_name":"zhanghaoguanli",
	                        "route_uri": "/fe/zhglindex",
	                        "level": 2,
	                        "sub": []
                      	}
                    ]
                }]
    		}
    		if(body.role == "审核员"){
    			menus = [{
                    "id": 7,
                    "name": "审核员-工作台",
                    "th_name":"gongzuotai",
                    "route_uri": "/fe/shywcl",
                    "level": 1,
                    "sub": [
                      {
                        "id": 8,
                        "name": "未处理",
                        "th_name":"weichuli",
                        "route_uri": "/fe/shywcl",
                        "level": 2,
                        "sub": [
                        		{
                        			"id":9,
                        			"name":"详情",
                        			"th_name":"xiangqing",
                        			"router_uri":"/fe/shywcl/shyjd"
                        		}
                        ]
                      },
                      {
                        "id": 8,
                        "name": "已处理",
                        "th_name":"yichuli",
                        "route_uri": "/fe/shyycl",
                        "level": 2,
                        "sub": [
                        		{
                        			"id":9,
                        			"name":"详情",
                        			"th_name":"xiangqing",
                        			"router_uri":"/fe/shyycl/shyxqym"
                        		}
                        ]
                      }
                    ]
                }]
    		}
    		if(body.role == "授信员"){
    			menus = [{
                    "id": 7,
                    "name": "授信员-工作台",
                    "th_name":"gongzuotai",
                    "route_uri": "/fe/sxywcl",
                    "level": 1,
                    "sub": [
                      {
                        "id": 8,
                        "name": "未处理",
                        "th_name":"weichuli",
                        "route_uri": "/fe/sxywcl",
                        "level": 2,
                        "sub": []
                      },
                      {
                        "id": 8,
                        "name": "已处理",
                        "th_name":"yichuli",
                        "route_uri": "/fe/sxyycl",
                        "level": 2,
                        "sub": [
                        		{
                        			"id":9,
                        			"name":"详情",
                        			"th_name":"xiangqing",
                        			"router_uri":"/fe/sxyycl/sxyxqym"
                        		}
                        ]
                      }
                    ]
                }]
    		}
    		if(body.role == "还款员"){
    			menus = [{
                    "id": 7,
                    "name": "还款员-还款列表",
                    "th_name":"huankuanliebiao",
                    "route_uri": "/fe/hkyyjq",
                    "level": 1,
                    "sub": [
                      {
                        "id": 8,
                        "name": "已结清列表",
                        "th_name":"yijieqingliebiao",
                        "route_uri": "/fe/hkyyjq",
                        "level": 2,
                        "sub": [
                        		{
                        			"id":9,
                        			"name":"详情",
                        			"th_name":"xiangqing",
                        			"router_uri":"/fe/hkyyjq/hkyyjqxq"
                        		}
                        ]
                      },
                      {
                        "id": 8,
                        "name": "还款列表",
                        "th_name":"huankuanliebiao",
                        "route_uri": "/fe/hkyhklb",
                        "level": 2,
                        "sub": [
                        		
                        ]
                      }
                    ]
                }]
    		}
    		if(body.role == "运营员"){
    			menus = [{
                    "id": 7,
                    "name": "运营员-工作台",
                    "th_name":"gongzuotai",
                    "route_uri": "/fe/yyysqlb",
                    "level": 1,
                    "sub": [
                    		{
                    			id:8	,
                    			name:'工作台',
                    			th_name:'gongzuotai',
                    			route_uri:'/fe/yyygzt',
                    			level:2,
                    			sub:[]
                    		},
                      {
                        "id": 8,
                        "name": "申请列表",
                        "th_name":"shenqingliebiao",
                        "route_uri": "/fe/yyysqlb",
                        "level": 2,
                        "sub": [
                        		{
                        			"id": 9,
		                        "name": "详情",
		                        "th_name":"xiangqing",
		                        "route_uri": "/fe/yyysqlb/yyyxqym",
		                        "level": 2
                        		}
                        ]
                      }
                    ]
                }]
    		}
		responseWithWait( res, {
			menus:menus
		});
	});

    // 审核 额度授信 校园大使管理 
    //申请列表
    //param  role_name type
    app.get('/fe-api/apply/list', ( req,res ) => {
    		console.log(req.query)
    		// xyds processing
    		// xyds processed
    		// shy processing
    		// shy processed
    		// sxy processing
    		// sxy processed
    		let data = {
    			
    		}
    		let all_steps = {
    			"audit_procedures_step": "审核员",
            "campus_operate_step": "校园大使审核",
            "credit_procedures_step": "授信员",
            "credit_success": "申请通过",
            "audit_close": "增信申请关闭",
            "audit_reject": "增信申请驳回",
            "credit_reject": "授信申请驳回",
            "credit_close": "授信申请关闭"
    		}
    		let page = {
    			page_index:1,
    			page_size:10,
    			total:20,
    		};
    		data.page = page
    		let request = {
    			apply_name:"大牛",
    			page:"2"
    		}
    		data.request = request
    		let role_name = req.query.role_name
    		let type = req.query.type
    		let lists = []
    		if(role_name == "" || req.query == {}){
//  			responseError(res,data)
    		}else if(role_name == "1"){
    			if(type == "processing"){
    				lists = [
	    				{
	    					id:1,
	    					apply_surname:"李",apply_name:'张三',
	    					bank_telephone:"18888888888",
	    					id_number:"101010101010101010",
	    					school:'清华大学',
	    					create_at:'2017-12-12 00:00:00',
	    					status:1
	    				},
	    				{
	    					id:2,
	    					apply_surname:"李",apply_name:'王五',
	    					bank_telephone:"18888888888",
	    					id_number:"101010101010101010",
	    					school:'清华大学',
	    					create_at:'2017-12-12 00:00:00',
	    					status:1
	    				}
	    			]
    			}else if(type == "processed"){
    				lists = [
	    				{
	    					id:3,
	    					apply_surname:"李",apply_name:'张四',
	    					bank_telephone:"18888888888",
	    					id_number:"101010101010101010",
	    					school:'清华大学',
	    					create_at:'2017-12-12 00:00:00',
	    					status:3
	    				},
	    				{
	    					id:4,
	    					apply_surname:"李",apply_name:'王六',
	    					bank_telephone:"18888888888",
	    					id_number:"101010101010101010",
	    					school:'清华大学',
	    					create_at:'2017-12-12 00:00:00',
	    					status:3
	    				}
	    			]
    			}
    			data.data = lists
    			data.all_steps = all_steps
    			responseWithWait(res,data)
    		}else if(role_name == "2"){
    			if(type == "processing"){
    				lists = [
	    				{
	    					id:5,
	    					apply_surname:"李",apply_name:'张三',
	    					bank_telephone:"18888888888",
	    					id_number:"101010101010101010",
	    					school:'清华大学',
	    					create_at:'2017-12-12 00:00:00',
	    					status:1
	    				},
	    				{
	    					id:6,
	    					apply_surname:"李",apply_name:'王五',
	    					bank_telephone:"18888888888",
	    					id_number:"101010101010101010",
	    					school:'清华大学',
	    					create_at:'2017-12-12 00:00:00',
	    					status:1
	    				}
	    			]
    			}else if(type == "processed"){
    				lists = [
	    				{
	    					id:7,
	    					apply_surname:"李",apply_name:'张四',
	    					bank_telephone:"18888888888",
	    					id_number:"101010101010101010",
	    					school:'清华大学',
	    					create_at:'2017-12-12 00:00:00',
	    					status:3
	    				},
	    				{
	    					id:8,
	    					apply_surname:"李",apply_name:'王六',
	    					bank_telephone:"18888888888",
	    					id_number:"101010101010101010",
	    					school:'清华大学',
	    					create_at:'2017-12-12 00:00:00',
	    					status:3
	    				}
	    			]
    			}
    			data.data = lists
    			data.all_steps = all_steps
    			data.all_steps = allsteps
    			responseWithWait(res,data)
    		}else if(role_name == "3"){
    			if(type == "processing"){
    				lists = [
	    				{
	    					id:9,
	    					apply_surname:"李",apply_name:'张三',
	    					bank_telephone:"18888888888",
	    					id_number:"101010101010101010",
	    					school:'清华大学',
	    					create_at:'2017-12-12 00:00:00',
	    					status:1
	    				},
	    				{
	    					id:10,
	    					apply_surname:"李",apply_name:'王五',
	    					bank_telephone:"18888888888",
	    					id_number:"101010101010101010",
	    					school:'清华大学',
	    					create_at:'2017-12-12 00:00:00',
	    					status:1
	    				}
	    			]
    			}else if(type == "processed"){
    				lists = [
	    				{
	    					id:11,
	    					apply_surname:"李",apply_name:'张四',
	    					bank_telephone:"18888888888",
	    					id_number:"101010101010101010",
	    					school:'清华大学',
	    					create_at:'2017-12-12 00:00:00',
	    					status:3
	    				},
	    				{
	    					id:12,
	    					apply_surname:"李",apply_name:'王六',
	    					bank_telephone:"18888888888",
	    					id_number:"101010101010101010",
	    					school:'清华大学',
	    					create_at:'2017-12-12 00:00:00',
	    					status:3
	    				}
	    			]
    			}
    			data.data = lists
    			data.all_steps = all_steps
    			data.all_steps = allsteps
    			responseWithWait(res,data)
    		}else{
    			responseWithWait(res,data)
    		}
    		
    		
    });
    
    //接单
    //param apply_id 
    app.post('/fe-api/apply/accept', ( req,res ) => {
    		responseWithWait(res,{
    			operate_result:true
    		},300)
    })
    
    //申请详情
    app.get('/fe-api/apply/1/detail/1/processing', ( req,res ) => {
    		responseWithWait(res,{
    			"approve_select": [
	            {
	                "action_id": 10,
	                "action_name": "同意",
	                "step": "credit_procedures_step",
	                "step_name": "授信员"
	            },
	            {
	                "action_id": 11,
	                "action_name": "驳回补充材料",
	                "step": "campus_operate_step",
	                "step_name": "校园大使审核"
	            },
	            {
	                "action_id": 12,
	                "action_name": "增信申请关闭",
	                "step": "audit_close",
	                "step_name": "增信申请关闭"
	            },
	            {
	                "action_id": 13,
	                "action_name": "增信申请驳回",
	                "step": "audit_reject",
	                "step_name": "增信申请驳回"
	            }
	        ],
	        "comments": [
	            {
	                "title": "接受",
	                "flow_id": 22,
	                "role_name": "campus_operator",
	                "comment": "无"
	            },
	            {
	                "title": "通过",
	                "flow_id": 22,
	                "role_name": "campus_operator",
	                "comment": null
	            },
	            {
	                "title": "接受",
	                "flow_id": 22,
	                "role_name": "auditor_procedures",
	                "comment": "无"
	            }
	        ],
	        "apply_info": {
	            "id": 60,
	            "merchant_id": 1,
	            "apply_name": "张三yrg7ZsqY4T",
	            "apply_surname": null,
	            "id_number": "gOm2ienLEJ",
	            "peoples": 1,
	            "house_registration": "山东",
	            "house_address": "山东oTuNgmw5Oi",
	            "dormitory_address": "泰山q6Bx6l0i6c",
	            "social_account_type": 2,
	            "social_account": "xczYahZB",
	            "bank_telephone": "LeSfKnGZHH1",
	            "school_id": 1,
	            "school_time": 2014,
	            "educational_background": "本科",
	            "academic_system": "4",
	            "majors": "软件工程",
	            "student_id": "201207",
	            "card_type": 1,
	            "work_order_no": "lhySiruMkhar4",
	            "status": 1,
	            "gender": 1,
	            "customer_id": 100,
	            "created_at": "2017-11-16 17:30:04",
	            "updated_at": "2017-11-16 17:30:04",
	            "religious": "",
	            "shop_user_id": 0,
	            "bank_code": "101",
	            "bank_card_no": "",
	            "birthday": "",
	            "school": "北京大学",
	            "bank": "中国银行"
	        },
	        "apply_contact": [
	            {
	                "id": 5,
	                "apply_id": 60,
	                "contact_name": "张三",
	                "relation": 2,
	                "contact_telephone": 123123,
	                "machine_phone": "1",
	                "contact_address": "山东威海",
	                "contact_type": 1,
	                "contact_gender": 0,
	                "contact_surname": null,
	                "created_at": null,
	                "updated_at": null,
	                "contact_relation": "母子"
	            }
	        ],
	        "apply_files": [
	        		{
	                "field": "12",
	                "file": "sdfsdf"
	            }
	        ],
	        "support_files": [
	        		{
	                "field": "300",
	                "file": "sdfsdf"
	            }
	        ]
    		})
    })
    
    //审核处理
    app.post('/fe-api/apply/operate', ( req,res ) => {
    		responseWithWait(res,{
    			operate_result:true
    		})
    })
    
    //运营管理
    //申请统计 
    app.get('/fe-api/operation/statistics', ( req,res ) => {
    		responseWithWait(res,{
    			apply_total:30,    
    			campus_untreated:30,
    			approve_untreated:30,
    			audit_untreated:30,
    			closing_time:'2017-11-11 10:10:10'
    		})
    })
    
    //运营申请列表
    app.post('/fe-api/operation/list', ( req,res ) => {
    		responseWithWait(res,{
    			lists:[]
    		})
    })
    //运营申请详情
    app.post('/fe-api/operation/detail', ( req,res ) => {
    		responseWithWait(res,{
    			operate_result:true
    		})
    })
    
    //公共API 用户 菜单 文件 配置 /fe-api/common 
    app.get('/fe-api/common', ( req,res ) => {
    		
		let menus = []
		var id = role_id
    		if(id == "1"){
    			menus = [{
                "id": 7,
                "name": "校园大使-未处理",
                "th_name":"weichuli",
                "route_uri": "/fe/xydswcl",
                "level": 1,
                "sub": [
                  {
                    "id": 8,
                    "name": "未处理",
                    "th_name":"weichuli",
                    "route_uri": "/fe/xydswcl",
                    "level": 2,
                    "sub": []
                  },
                  {
                    "id": 8,
                    "name": "已处理",
                    "th_name":"yichuli",
                    "route_uri": "/fe/xydsycl",
                    "level": 2,
                    "sub": [
                        {
	                        	"id": 9,
		                    "name": "详情",
		                    "th_name":"xiangqing",
		                    "route_uri": "/fe/xydsycl/yclxqym",
		                    "level": 2,
		                    "sub": []
                        }
                    ]
                  }
                ]
            }]
    		}
    		if(id == "6"){
    			menus = [{
                    "id": 7,
                    "name": "账号管理",
                    "th_name":"zhanghaoguanli",
                    "route_uri": "/fe/zhglindex",
                    "level": 1,
                    "sub": [
                    		{
	                        "id": 8,
	                        "name": "账号管理",
	                        "th_name":"zhanghaoguanli",
	                        "route_uri": "/fe/zhglindex",
	                        "level": 2,
	                        "sub": []
                      	}
                    ]
                }]
    		}
    		if(id == "2"){
    			menus = [{
                    "id": 7,
                    "name": "审核员-工作台",
                    "th_name":"gongzuotai",
                    "route_uri": "/fe/shywcl",
                    "level": 1,
                    "sub": [
                      {
                        "id": 8,
                        "name": "未处理",
                        "th_name":"weichuli",
                        "route_uri": "/fe/shywcl",
                        "level": 2,
                        "sub": [
                        		{
                        			"id":9,
                        			"name":"详情",
                        			"th_name":"xiangqing",
                        			"router_uri":"/fe/shywcl/shyjd"
                        		}
                        ]
                      },
                      {
                        "id": 8,
                        "name": "已处理",
                        "th_name":"yichuli",
                        "route_uri": "/fe/shyycl",
                        "level": 2,
                        "sub": [
                        		{
                        			"id":9,
                        			"name":"详情",
                        			"th_name":"xiangqing",
                        			"router_uri":"/fe/shyycl/shyxqym"
                        		}
                        ]
                      }
                    ]
                }]
    		}
    		if(id == "3"){
    			menus = [{
                    "id": 7,
                    "name": "授信员-工作台",
                    "th_name":"gongzuotai",
                    "route_uri": "/fe/sxywcl",
                    "level": 1,
                    "sub": [
                      {
                        "id": 8,
                        "name": "未处理",
                        "th_name":"weichuli",
                        "route_uri": "/fe/sxywcl",
                        "level": 2,
                        "sub": []
                      },
                      {
                        "id": 8,
                        "name": "已处理",
                        "th_name":"yichuli",
                        "route_uri": "/fe/sxyycl",
                        "level": 2,
                        "sub": [
                        		{
                        			"id":9,
                        			"name":"详情",
                        			"th_name":"xiangqing",
                        			"router_uri":"/fe/sxyycl/sxyxqym"
                        		}
                        ]
                      }
                    ]
                }]
    		}
    		if(id == "5"){
    			menus = [{
                    "id": 7,
                    "name": "还款员-还款列表",
                    "th_name":"huankuanliebiao",
                    "route_uri": "/fe/hkyyjq",
                    "level": 1,
                    "sub": [
                      {
                        "id": 8,
                        "name": "已结清列表",
                        "th_name":"yijieqingliebiao",
                        "route_uri": "/fe/hkyyjq",
                        "level": 2,
                        "sub": [
                        		{
                        			"id":9,
                        			"name":"详情",
                        			"th_name":"xiangqing",
                        			"router_uri":"/fe/hkyyjq/hkyyjqxq"
                        		}
                        ]
                      },
                      {
                        "id": 8,
                        "name": "还款列表",
                        "th_name":"huankuanliebiao",
                        "route_uri": "/fe/hkyhklb",
                        "level": 2,
                        "sub": [
                        		
                        ]
                      }
                    ]
                }]
    		}
    		if(id == "4"){
    			menus = [{
                    "id": 7,
                    "name": "运营员-工作台",
                    "th_name":"gongzuotai",
                    "route_uri": "/fe/yyysqlb",
                    "level": 1,
                    "sub": [
                    		{
                    			id:8	,
                    			name:'工作台',
                    			th_name:'gongzuotai',
                    			route_uri:'/fe/yyygzt',
                    			level:2,
                    			sub:[]
                    		},
                      {
                        "id": 8,
                        "name": "申请列表",
                        "th_name":"shenqingliebiao",
                        "route_uri": "/fe/yyysqlb",
                        "level": 2,
                        "sub": [
                        		{
                        			"id": 9,
		                        "name": "详情",
		                        "th_name":"xiangqing",
		                        "route_uri": "/fe/yyysqlb/yyyxqym",
		                        "level": 2
                        		}
                        ]
                      }
                    ]
                }]
    		}
    		var roles = [
			{id:'1',display_name:'校园大使'},
			{id:'2',display_name:'审核员'},
			{id:'3',display_name:'授信员'},
			{id:'4',display_name:'运营员'},
			{id:'5',display_name:'还款员'},
			{id:'6',display_name:'账号管理员'}
		]
    		var current_role = {}
    		for(var i=0;i<roles.length;i++){
    			if(roles[i].id == id){
    				current_role = roles[i]
    			}
    		}
    		responseWithWait(res,{
    			project_name:"消费金融系统",
    			user:{
    				id:"1234",
    				name:'执行总裁',
    				email:'ccc@sina.com'
    			},
    			roles:roles,
    			current_role:current_role,
    			menu:menus,
    			config:[]
    		})
    })
    
    //后台管理-人员列表 
    app.post('/fe-api/admin/user/list', ( req,res ) => {
    		responseWithWait(res,{
    			page:{
    				current_page:'1',
    				from:'',
    				last_page:'2',
    				next_page_url:'',
    				path:'',
    				per_page:'25',
    				prev_page_url:'',
    				to:'',
    				total:'2'
    			},
    			data:[{
    				//用户信息
    				id:'1',
    				display_name:'xxx',
    				email:'xxx@sina.com',
    				mobile_phone:'13288889999',
    				status:'10',
    				roles:[1,2],
    				created_at:'2017-12-12 00:00:00',
    				updated_at:'2017-12-12 00:00:00'
    			},
    			{
    				//用户信息
    				id:'2',
    				display_name:'ccc',
    				email:'ccc@sina.com',
    				mobile_phone:'13288889999',
    				status:'20',
    				roles:[1,2],
    				created_at:'2017-12-12 00:00:00',
    				updated_at:'2017-12-12 00:00:00'
    			}]
    		})
    })
    
    //后台管理-添加人员
    app.post('/fe-api/admin/user/add', (req,res) => {
    		//参数--人员信息
    		responseWithWait(res,{
    			user_id:""
    		})
    })
    //后台管理-修改人员
    app.post('/fe-api/admin/user/update', (req,res) => {
    		//参数--人员信息
    		responseWithWait(res,{
    			user_id:"",
    			status:''
    		})
    })
    
    //材料上传
    app.post('/file/upload',(req,res) => {
    		//参数  以及file文件
    		responseWithWait(res,{
    			file_id:'',
    			url:''
    		})
    })
    
    //切换角色 -- 之后要在调用一次公共数据接口
    app.post('/fe-api/switch-role',(req,res) => {
    		var id = req.body.role_id
    		role_id = id
    		responseWithWait(res,"ok")
    })
}

module.exports = addRoutes; 
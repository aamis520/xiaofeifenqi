/**
*  路由
*  @date: 2018.08.29
*/
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const Index = r => require(['../pages/Index.vue'], r);
const PublicIndex = r => require(['../pages/index/PublicIndex.vue'], r);
const SearchWrap = r => require(['../pages/layouts/SearchWrap.vue'], r);

//账号管理
const ZhglIndex = r => require(['../pages/zhgl/ZhglIndex.vue'], r)
//校园大使
const XydsWcl = r => require(['../pages/xyds/XydsWeichuli.vue'], r)
const XydsJd = r => require(['../pages/xyds/XydsJd.vue'], r)
const XydsYcl = r => require(['../pages/xyds/XydsYichuli.vue'], r)
const XydsYclXq = r => require(['../pages/xyds/XydsYichulixiangqing.vue'], r)
//运营员
const YyySqlb = r => require(['../pages/yyy/YyyShenqingliebiao.vue'], r)
const YyyGzt = r => require(['../pages/yyy/YyyGongzuotai.vue'], r)
const YyySqlbXq = r => require(['../pages/yyy/YyyShenqingliebiaoxiangqing.vue'], r)
//审核员
const ShyWcl = r => require(['../pages/shy/ShyWeichuli.vue'], r)
const ShyWclJd = r => require(['../pages/shy/ShyJd.vue'], r)
const ShyYcl = r => require(['../pages/shy/ShyYichuli.vue'], r)
const ShyYclXq = r => require(['../pages/shy/ShyYichulixiangqing.vue'], r)
//授信员
const SxyWcl = r => require(['../pages/sxy/SxyWeichuli.vue'], r)
const SxyWclJd = r => require(['../pages/sxy/SxyJd.vue'], r)
const SxyYcl = r => require(['../pages/sxy/SxyYichuli.vue'], r)
const SxyYclXq = r => require(['../pages/sxy/SxyYichulixiangqing.vue'], r)
//还款员
const HkyYjqlb = r => require(['../pages/hky/HkyYijieqingliebiao.vue'], r)
const HkyYjqxq = r => require(['../pages/hky/HkyYijieqingliebiaoxiangqing.vue'], r)
const HkyHklb = r => require(['../pages/hky/HkyHuankuanliebiao.vue'], r)
const HkyHklbxq = r => require(['../pages/hky/HkyHuankuanliebiaoxiangqing.vue'], r)

const routes = [
	{
		path: '/',
		redirect: 'fe/yd'
	},
	{
		path: '/fe',
    		name: 'Index',
    		component: Index,
		children: [
			{
				path:'yd',
				component:PublicIndex
			},
			// 账号管理
			{
			    path: 'zhglindex',
			    component: ZhglIndex   
		  	},
			//校园大使
			{
			    path: 'xydswcl',   //未处理
			    component: XydsWcl
		  	},
		  	{
		  		path:'xydswcl/xydsjd',   //接单
	    			component:XydsJd	
		  	},
		  	{
			    path: 'xydsycl',   //已处理列表
			    component: XydsYcl
		  	},
		  	{
			  	path: 'xydsycl/yclxqym',   //已处理详情
			    component: XydsYclXq
	  		},
			//运营员
		  	{
			    path: 'yyysqlb',   //申请列表
			    component: YyySqlb
		  	},
		  	{
			  	path: 'yyygzt',   //工作台
			    component: YyyGzt
		  	},
		  	{
			  	path: 'yyysqlb/yyyxqym', //详情页面
			    component: YyySqlbXq
		  	},
			//审核员
			{
			    path: 'shywcl',    //未处理列表
			    component: ShyWcl
		  	},
		  	{
			    path: 'shywcl/shywcljd',   //未处理接单
			    component: ShyWclJd
		  	},
		  	{
			    path: 'shyycl',     //已处理列表
			    component: ShyYcl
		  	},
		  	{
			    path: 'shyycl/shyxqym',   //已处理详情
			    component: ShyYclXq
		  	},
			//授信员
			{
			    path: 'sxywcl', //未处理列表
			    component: SxyWcl
		  	},
		  	{
			    path: 'sxywcl/sxywcljd',  //未处理接单
			    component: SxyWclJd
		  	},
		  	{
			    path: 'sxyycl',  //已处理列表
			    component: SxyYcl
		  	},
		  	{
			    path: 'sxyycl/sxyxqym', //已处理详情
			    component: SxyYclXq
		  	},
			//还款员
			{
			    path: 'hkyhklb',  //还款列表
			    component: HkyHklb
		  	},
		  	{
			    path: 'hkyhklb/hkyhklbxq', //还款列表详情
			    component: HkyHklbxq
		  	},
		  	{
			    path: 'hkyyjq',  //已结清列表
			    component: HkyYjqlb
		  	},
		  	{
			    path: 'hkyyjq/hkyyjqxq', //已结清列表详情
			    component: HkyYjqxq
		  	},
		]
	}
];

// 空白权限

/**
*  路由全局钩子
*/
function beforeEach ( to, from, next ) {
	NProgress.start();

	next();
}

function afterEach ( route ) {
	NProgress.done();
}

let _Vue,router;
function init ( Vue ) {
	if ( _Vue || !Vue ) {
		return null;
	}

	_Vue = Vue;

	Vue.use(VueRouter);

	// 将router顺带绑定到widnow上,方便有些情况下需要在一些js环境中控制路由
	router = new VueRouter({
	  mode: 'history',
	  routes
	});

	// add global beforeEach
	router.beforeEach( beforeEach );
	router.afterEach( afterEach );

	return router;
}


export default init

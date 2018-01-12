/**
*   程序总初始化 ( !!!顺序最重要!!! )
*	@author: gaoyong@weiyankeji.cn
*	@date: 2017.10.16 
*/
import Vue from 'vue'
import ElementUI from 'element-ui'

import App from './App'
import routerInit from './router'
import storeInit from './store'

import * as types from './store/types'

import ajaxInit from './ajax'
import requestFactory from './ajax/requestFactory'

import thLocale from 'element-ui/lib/locale/lang/th'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'

// 设置语言
let lan = window.localStorage.getItem("language")
if(lan == "th"){
	locale.use(thLocale)
}else{
	locale.use(zhLocale)
}


function addProto ( name,obj ) {
	if ( typeof name != 'string' || !name || !obj ) {
		return false;
	}

	Object.defineProperty( _Vue.prototype,name,{
		configurable: false,
    	enumerable: true,
    	get () {
    		return obj;
    	}
	} );

	return obj;
}


let _Vue,router,store;
async function init ( Vue ) {
	if ( _Vue ) {
		throw new Error('project has already inited.');
	}
	_Vue = Vue;

	let router = window.$router = routerInit( Vue );
	let store = window.$store = storeInit( Vue );
	
	let axios = window.$axios = ajaxInit( Vue );
	addProto('$axios',axios);

	addProto('$requestFactory',requestFactory);
	window.$requestFactory = requestFactory;

	Vue.use(ElementUI);

	Vue.config.productionTip = false;

	// 请求用户是否登录及用户能看到的菜单项
	//await store.dispatch( types.getCommonInfo );

	return {
		router,
		store
	};
}

export default init
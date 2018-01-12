/**
*   ajax管理
*	@author: zxc
*	@date: 2017.08.30
*/
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import types from '../store/types'

let _Vue;
function ajaxInit ( Vue ) {
	if ( _Vue || !Vue ) {
		return null;
	}

	axios.defaults.timeout = 5000;
	axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
	
	axios.interceptors.request.use( (config) => {
			window.$store.commit(types.ajax_loading, true);
	    // 在请求之前做些事情
	    if (
	    	config.method === 'post' ||
	    	config.method === 'get' ||
	    	config.method === 'delete'
	    ) {
	    	// 数据序列化成表单
	    	config.data = qs.stringify(config.data);
	    }
	    return config;
	  }, (error) => {
	  	Message({  // 饿了么的消息弹窗组件,类似toast
	      showClose: true,
	      message: error,
	      type: 'error'
	    });
	    return Promise.reject(error);
	  });

	// 返回状态判断(添加响应拦截器)
	axios.interceptors.response.use( (response) => {
			window.$store.commit(types.ajax_loading, false);
	    // 用户没有登录
	    if (response.data.code == 20001) {
        // 跳转到uCenter的登录页面
        window.location = 'https://www.baidu.com/';
	    }

	    if (response.data.code == 25002) {
        // 用户没有权限,跳转到无权限页面
//      window.$router.push({
//	        path: '/fe/permission'
//	      });
	    }

	    return response;
	  }, function (error) {
	  	console.log(error)
	    // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
//	    if (error.response.status === 404 || error.response.status === 500) {
//	      window.$router.push({
//	        path: '/fe/error'
//	      });
//	    }

	    return Promise.reject(error);
	  });

	return axios;
}

export default ajaxInit

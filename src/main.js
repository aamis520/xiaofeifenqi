/**
*   main
*   @date: 2017.10.16
*/
import './assets/css/reset.css'
//import './assets/css/element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css'

import Vue from 'vue'

import init from './init'
import App from './App'
import languageConfig from './languageConfig'

Vue.prototype.languageConfig = languageConfig

init( Vue ).then( data => {
	let { router,store } = data;

	// 保存实例
	window.$vue = new Vue({
	  router,
	  store,
	  render: r => r(App),
	  methods: {
	      ajaxError ( responseList ) {
	          if ( !responseList ) {
	              return false;
	          }

	          if ( !Array.isArray( responseList ) ) {
	              responseList = [ responseList ];	
	          }

	          for ( let response of responseList ) {
	              if ( response.data.code != 0 ) {
	                  this.$message.error( response.data.msg );
	                  return true;	
	              }		
	          }	

	          return false;	
	      }			
	  }
	}).$mount('#app');
} ).catch( err => {
	console.log(`init err : ${err}`);
	alert( `init err : ${err}` );
} );


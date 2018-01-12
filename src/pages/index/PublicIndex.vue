<template>
	<div class="yd_common_home">
		{{luangeneedtobechange.huanyingdenglufenqifuxitong}}
	</div>
</template>
<script>
	export default {
    data () {
		return {
			luangeneedtobechange:{
				huanyingdenglufenqifuxitong:''
			}
		}
    },
    methods: {
		handlequery(){
	      	let lan = window.localStorage.getItem('language')
			let language ={}
			let zh_cn= require("../../config/zh_cn.js")
			let th = require("../../config/th.js")
			if(lan == null || lan == "zh"){
				language = zh_cn
			}else{
				language = th
			}
	      	
	      	for(let k in this.luangeneedtobechange) {
				this.luangeneedtobechange[k] = language[k]
			}
	    }
    },
    created(){
    		this.handlequery()
    }
  }
</script>

<style scoped lang="scss">
	div.yd_common_home {
		font-size: 20px;
		padding: 20px;
	}
</style>
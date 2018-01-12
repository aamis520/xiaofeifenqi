<template>
	<div class="xf_slidebar">
		<h3>{{luangeneedtobechange.fenqifuhoutaiguanlixitong}}</h3>
		<el-menu mode="vertical" class="xf_el_menu" :default-openeds="['01']" :router="true" :default-active="activeIndex">
			 <el-submenu v-for="(item, index) in menus" :key="item.id" :index="index + '1'" class="xf_submenu">
        			<template slot="title"><i class="el-icon-menu"></i>
        				<span v-if="lanTh">{{item.display_name}}</span>
        				<span v-if="!lanTh">{{item.th_name}}</span>
        			</template>
				<el-menu-item-group class="xf_submenu">
					<template v-if="item.sub && item.sub.length > 0">
						<el-menu-item :index="sub.route_uri" v-for="(sub, sIndex) in item.sub" :key="sub.id" class="xf_menu_item">
					      	{{ lanTh ? sub.display_name : sub.th_name }}
					    </el-menu-item>
					</template>
		   		</el-menu-item-group>
			</el-submenu>
	  </el-menu>
	</div>
  
</template>

<script>
  export default {
    data () {
      return {
        lanTh:true,
        luangeneedtobechange:{
			fenqifuhoutaiguanlixitong:''
		},
      }
    },
    props: {
    	menus: Array,
    	role: String
    },
    watch:{
    		menus(){
    			this.handlequery()
    		}
    },
    computed: {
      activeIndex () {
      	// 如果遇见动态路由，会用路由参数替换匹配的key，实现菜单高亮
//	    	let matchedPath = this.$route.matched[1].path.split('/:');
//	    	let index = ""
//		for(let i=0;i<this.menus[0].sub.length;i++){
//			let temp = i
//			console.log(this.menus[0].sub[temp].route_uri)
//			if(this.menus[0].sub[temp].route_uri == "matchedPath"){
//				index = temp
//			}
//		}
//		console.log(index)
//	    	return matchedPath[1] == 'id' ? [matchedPath[0], this.$route.params.id].join('/') : this.$route.matched[1].path;
      },
    },
    methods: {
		handlequery(){
	      	let locallan = window.localStorage.getItem('language')
	      	if(locallan== null || locallan == "zh"){
	      		this.lanTh = true 
	      	}else{
	      		this.lanTh = false
	      	}
	      	let language ={}
			let zh_cn= this.languageConfig.zh_cn
			let th = this.languageConfig.th
			if(locallan == null || locallan == "zh"){
				language = zh_cn
			}else{
				language = th
				let th_menu =  this.languageConfig.th_menu
				for(let i=0;i<this.menus.length;i++){
					for(let j=0;j<th_menu.one.length;j++){
						if(this.menus[i].route_uri == th_menu.one[j].route_uri){
							this.menus[i].th_name = th_menu.one[j].th_name
						}
					}
					if(this.menus[i].sub.length >0){
						for(let x=0;x<this.menus[i].sub.length;x++){
							for(let z=0;z<th_menu.second.length;z++){
								let reg = new RegExp(th_menu.second[z].route_uri)
								if(reg.test(this.menus[i].sub[x].route_uri)){
									this.menus[i].sub[x].th_name = th_menu.second[z].th_name
									
								}
							}
						}
					}
				}
			}
			for(let k in this.luangeneedtobechange) {
				this.luangeneedtobechange[k] = language[k]
			}
	    }
    },
    mounted(){
    		this.handlequery()
    },
    updated(){
    		this.handlequery()
    }
  }
</script>

<style scoped lang="scss">
	.xf_slidebar{
		h3{
			display: block;
			background: #4a63e0;
			color: #f5f5f5;
			text-align: center;
			font-size: 16px;
			font-weight: normal;
			height: 50px;
			line-height: 50px;
		}
		.xf_el_menu{
			background: #eff2f7;
			border-right: none;
			padding-top: 30px;
		}
		.xf_submenu{
			background: #eff2f7;
			.xf_menu_item{
				padding-left: 70px;
			}
		}
	}
</style>

  

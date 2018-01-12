<template>
	<section>
		<el-container>
			<el-aside width="200px" class="xc_aside">
				<SideBar :menus="menus"></SideBar>
			</el-aside>
			<el-container>
				<div class="xc-main">
					<div class="clearfix xf_head">
						<el-header>
							<TopBar :roles="roles" :currentRoles = "currentRole" :userName="userName" @getMenus="getSlideBarData"></TopBar>
						</el-header>
					</div>
					<div>
						<el-main>
							<div class="r_main">
								<router-view></router-view>
							</div>
						</el-main>
					</div>
				</div>
			</el-container>
		</el-container>
	</section>
</template>

<script>
	import TopBar from '../components/topbar'
	import SideBar from '../components/sidebar'
	import URI from '../ajax/uri'
	import types from '../store/types'
	
	export default {
		data() {
			return {
				roles: [],
				userName: '',
				menus: [],
				currentRole:{}
			}
		},
		components: {
			TopBar,
			SideBar
		},
		computed: {
			ajaxLoading() {
				return this.$store.state.common.ajaxLoading;
			}
		},
		methods: {
			getSlideBarData() {
				this.getTopBar()
				this.$router.push(this.menus[0].route_uri)
			},
			getTopBar() {
				// 获取头部信息 和菜单栏信息
				let self = this;
				self.$axios.get(URI.common_data)
					.then(function(res) {
						if(res.data.code == 0) {
							let getData = res.data.data
							self.menus = [];
							self.menus.push(...getData.menu);
							console.log(self.menus)
							self.currentRole = getData.current_role
							self.roles = getData.roles;
							let th_roles = self.languageConfig.th_roles
							let lan = window.localStorage.getItem('language')
							if(lan == "th"){
								for(let z=0;z<self.roles.length;z++){
									for(let x=0;x<th_roles.length;x++){
										if(self.roles[z].display_name == th_roles[x].display_name){
											self.roles[z].th_name == th_roles[x].th_name
										}
									}
								}
								for(let c=0;c<th_roles.length;c++){
									if(self.currentRole.display_name == th_roles[c].display_name){
										self.currentRole.display_name = th_roles[c].th_name
									}
								}
							}
							//处理current_role
							self.$store.commit(types.user_role, getData.current_role.display_name);
							self.$store.commit(types.user_role_id, getData.current_role.id);
							self.userName = getData.user.display_name;
//							self.$router.push(self.menus[0].route_uri)
						} else {
							self.$message.error(res.data.msg);
						}
					})
			}
		},
		created() {
			this.getTopBar();
		},
	}
</script>

<style scoped="scoped" lang="scss">
	.xc_aside{
		background: #eff2f7;
		position: absolute;
		top: 0px;
		bottom: 0;
		box-sizing: border-box;
	}
	.xc-main{
		width: 100%;
		padding-left: 200px;
		.xf_head{
			background: #5f77ed;
			height: 50px;
			box-sizing: border-box;
		}
	}
</style>


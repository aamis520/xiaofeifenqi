<template>
	<div class="xf_header">
		<el-row>
			<el-col :span="14">
				<el-dropdown @command="handleCommand" class="xf_currentRole">
					<span class="el-dropdown-link">
						{{luangeneedtobechange.dangqianjuese}}：{{ current_name }}<i class="el-icon-caret-bottom el-icon--right"></i>
					</span>
					<el-dropdown-menu class="el-dropdown-menu" slot="dropdown">
						<el-dropdown-item v-for="item in roles" :command="item.id" :key="item.display_name">
							{{ item.display_name }}
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
			<el-col :span="10" class="xf_info">
				<el-button type="text" @click="setlanguage('zh')">{{luangeneedtobechange.zhongwen}}</el-button>
				<span>|</span>
				<el-button type="text" @click="setlanguage('th')">{{luangeneedtobechange.taiyu}}</el-button>
				<el-dropdown @command="handleOperation">
					<span class="el-dropdown-link">
						{{luangeneedtobechange.ninhao}}，{{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
  					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command = "changepsd">{{luangeneedtobechange.xiugaimima}}</el-dropdown-item>
						<el-dropdown-item command = "loginout">{{luangeneedtobechange.tuichu}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-row>
		<form id="form-logout" action="/logout" method="post"></form>
		<el-dialog :title="luangeneedtobechange.xiugaimima" :visible="changepwd">
			<div class="profileForm">
				<el-form 
					:model="pwdForm" 
					:rules="pwdFormRule"
					ref = "pwdForm" 
					:label-width="labelWidth"
					class="xf-manange">
					<el-form-item 
						:label="luangeneedtobechange.jiumima + '：'" 
						prop="old_password">
						<el-input type="password" v-model.trim="pwdForm.old_password"></el-input>
					</el-form-item>
					<el-form-item 
						:label="luangeneedtobechange.xinmima + '：'" 
						prop="password">
						<el-input type="password" v-model.trim="pwdForm.password"></el-input>
					</el-form-item>
					<el-form-item 
						:label="luangeneedtobechange.querenxinmima + '：'" 
						prop="password_confirmation">
						<el-input type="password" v-model.trim="pwdForm.password_confirmation"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button @click="cancel('pwdForm')">{{luangeneedtobechange.quxiao}}</el-button>
			    			<el-button type="primary" @click="submitForm('pwdForm')">{{luangeneedtobechange.baocun}}</el-button>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
			   
		 	</span>
		</el-dialog>
	</div>
</template>

<script>
	import types from '../store/types'
	import URI from "../ajax/uri"
	export default {
		data() {
			var checkOld = (rule,value,callback) => {
				if(!value){
					return callback(new Error(this.luangeneedtobechange.mimabudewk))
				}else{
					//密码为不能含有空格
					if(/\s/.test(value)){
						return callback(new Error(this.luangeneedtobechange.mimabdbhkbzf))
					}else{
						//数字和字母的组合
						if(!(/^[A-Za-z0-9]{6,20}$/.test(value))){
							return callback(new Error(this.luangeneedtobechange.qingshuruldeswszhywzm))
						}else{
							callback()
						}
					}
				}
			}
			var checkPassword = (rule,value,callback) => {
				if(!value){
					return callback(new Error(this.luangeneedtobechange.mimabudewk))
				}else{
					//密码为不能含有空格
					if(/\s/.test(value)){
						return callback(new Error(this.luangeneedtobechange.mimabdbhkbzf))
					}else{
						//数字和字母的组合
						if(!(/^[A-Za-z0-9]{6,20}$/.test(value))){
							return callback(new Error(this.luangeneedtobechange.qingshuruldeswszhywzm))
						}else{
							callback()
						}
					}
				}
			}
			var checkPassConfirmation = (rule,value,callback) => {
				if(!value){
					return callback(new Error(this.luangeneedtobechange.querenmimabdwk))
				}else{
					//密码为不能含有空格
					if(/\s/.test(value)){
						return callback(new Error(this.luangeneedtobechange.querenmimabdbhkbzf))
					}else{
						//数字和字母的组合
						if(!(/^[A-Za-z0-9]{6,20}$/.test(value))){
							return callback(new Error(this.luangeneedtobechange.qingshuruldeswszhywzm))
						}else{
							//验证同两次密码一致
							if(value != this.pwdForm.password){
								return callback(new Error(this.luangeneedtobechange.liangcimimabyz))
							}else{
								callback()
							}
						}
					}
				}
			}
			return {
				luangeneedtobechange: {
					fenqifuhoutaiguanlixitong: '',
					dangqianjuese: '',
					ninhao: '',
					xiugaimima: '',
					tuichu: '',
					zhongwen: '',
					taiyu: '',
					xiugaimima:"",
					jiumima:'',
					xinmima:'',
					querenxinmima:'',
					quxiao:'',
					baocun:'',
					mimabudewk:'',
					mimabdbhkbzf:'',
					qingshuruldeswszhywzm:'',
					querenmimabdwk:'',
					querenmimabdbhkbzf:'',
					liangcimimabyz:''
				},
				changepwd:false,
				pwdForm:{
					old_password:'',
					password:'',
					password_confirmation:''
				},
				pwdFormRule:{
					old_password:[
						{ validator: checkOld, trigger: 'blur' }
					],
					password:[
						{ validator: checkPassword, trigger: 'blur' }
					],
					password_confirmation:[
						{ validator: checkPassConfirmation, trigger: 'blur' }
					]
				},
				labelWidth:"200px",
			}
		},
		computed: {
			current_name: {
				get() {
					return this.$store.state.userInfo.currentRole;
				},
				set(){
					
				}
			}
			
		},
		props: {
			roles: Array,
			userName: String,
			currentRoles: {}
		},
		methods: {
			handleQuery() {
				let lan = window.localStorage.getItem('language')
				let language = {}
				let zh_cn = this.languageConfig.zh_cn
				let th = this.languageConfig.th
				if(lan == null || lan == "zh") {
					language = zh_cn
				} else {
					language = th
				}
				for(let k in this.luangeneedtobechange) {
					this.luangeneedtobechange[k] = language[k]
				}
			},
			handleCommand(command) {
				let role_name = this.currentRole
				this.currentRole = command
				let params = {
					role_id: command
				}
				let th_roles = this.languageConfig.th_roles
				let lan = window.localStorage.getItem('language')
				//取出来display_name  
				//先把泰语角色写进roles
				if(lan == "th"){
					for(let z=0;z<this.roles.length;z++){
						for(let x=0;x<th_roles.length;x++){
							if(this.roles[z].display_name == th_roles[x].display_name){
								this.roles[z].th_name == th_roles[x].th_name
							}
						}
					}
				}
				let display_name = ''
				for(let i=0;i<this.roles.length;i++){
					if(command == this.roles[i].id){
						if(lan == "th"){
							display_name = this.roles[i].th_name
						}else{
							display_name = this.roles[i].display_name
						}
					}
				}
				let self = this
				self.$axios.post(URI.switch_role, {
					role_id: command
				}).then(function(response) {
					if(response.data.code == 0) {
						self.$emit('getMenus');
						self.$store.commit(types.user_role, display_name)
						self.$store.commit(types.user_role_id, command);
					} else {
						self.$message.error(response.data.msg);
					}
				})
			},
			handleOperation(command){
				console.log(command)
				if(command == "changepsd"){
					//修改密码  弹出框  /fe-api/update-password 
					this.changepwd = true
				}else if(command == "loginout"){
					//退出登录
					//uri   /logout
					this.$nextTick(function(){
						document.getElementById("form-logout").submit()
					})
					
				}
			},
			setlanguage(lan) {
				let localLan = window.localStorage.getItem("language")
				if(lan == "zh") {
					if(localLan == null) {
						window.localStorage.setItem('language', lan)
						let self = this
						self.$axios.post(URI.switch_language,{
							lacale:"zh_CN"
						}).then(function(res){
							if(res.data.code == 0){
								self.$message.success(res.data.msg)
							}else{
								self.$message.error(res.data.msg)
							}
						})
						return false;
					} else if(lan == localLan) {
						return false;
					} else if(localLan == "th") {
						window.localStorage.setItem('language', lan)
						let self = this
						self.$axios.post(URI.switch_language,{
							lacale:"zh_CN"
						}).then(function(res){
							if(res.data.code == 0){
								self.$message.success(res.data.msg)
							}else{
								self.$message.error(res.data.msg)
							}
						})
						this.$router.go(0)
					}
				} else if(lan == "th") {
					if(localLan == null) {
						window.localStorage.setItem('language', lan)
						let self = this
						self.$axios.post(URI.switch_language,{
							lacale:"th"
						}).then(function(res){
							if(res.data.code == 0){
								self.$message.success(res.data.msg)
							}else{
								self.$message.error(res.data.msg)
							}
						})
						this.$router.go(0)
					} else if(lan == localLan) {
						return false;
					} else if(localLan == "zh") {
						window.localStorage.setItem('language', lan)
						let self = this
						self.$axios.post(URI.switch_language,{
							lacale:"th"
						}).then(function(res){
							if(res.data.code == 0){
								self.$message.success(res.data.msg)
							}else{
								self.$message.error(res.data.msg)
							}
						})
						this.$router.go(0)
					}
				}
			},
			cancel(formName) {
				this.$nextTick(function(){
					this.changepwd = false
					this.$refs[formName].resetFields();
				})
			},
			submitForm(formName) {
				///fe-api/update-password 
				console.log(this.$refs.pwdForm)
				this.$refs.pwdForm.validate((valid) => {
					if(valid) {
						let self = this
						self.$axios.post(URI.change_password,{
							old_paasword:self.old_paasword,
							password:self.password,
							password_confirmation:self.password_confirmation
						}).then(function(res){
							if(res.data.code == 0){
								this.changepwd = false
								self.$message.success(res.data.msg)
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		},
		created() {
			this.handleQuery()
		},
		updated() {
			this.current_name = this.currentRoles.display_name
		}

	}
</script>
<style scoped="scoped" lang="scss">
	.xf_header {
		.xf_currentRole {
			top: 15px;
			font-size: 16px;
			color: #f1f1f1;
			cursor: pointer;
		}
		.xf_info {
			text-align: right;
			padding-right: 40px;
			line-height: 50px;
			.el-button {
				font-size: 14px;
				font-weight: normal;
				color: #f1f1f1;
				cursor: pointer;
				&:hover {
					color: #fff;
				}
			}
			span {
				margin: 0 10px;
				font-size: 14px;
				color: #f1f1f1;
				cursor: pointer;
			}
			span.xf_userName {}
		}
	}
</style>
<template>
	<section>
		<el-card>
			<div class="zhgl_search">
				<el-form :model="zhglSearchForm" :inline="true" ref="zhglSearchForm" class="demo-form-inline">
					<el-form-item :label="luangeneedtobechange.dengluming + '：'" prop="email">
						<el-input v-model="zhglSearchForm.email">
							<i slot="prefix" class="el-input__icon el-icon-search"></i>
						</el-input>
					</el-form-item>
					<el-form-item :label="luangeneedtobechange.shiyongrenxingming + '：'" prop="display_name">
						<el-input v-model="zhglSearchForm.display_name">
							<i slot="prefix" class="el-input__icon el-icon-search"></i>
						</el-input>
					</el-form-item>
					<el-form-item :label="luangeneedtobechange.shoujihao + '：'" prop="mobile_phone">
						<el-input v-model="zhglSearchForm.mobile_phone">
							<i slot="prefix" class="el-input__icon el-icon-search"></i>
						</el-input>
					</el-form-item>
					<el-form-item :label="luangeneedtobechange.zhanghaozhuangtai + '：'" prop="status">
						<el-select v-model="zhglSearchForm.status" :placeholder="luangeneedtobechange.qingxuanze">
							<el-option v-for="item in statuses"
								:key="item.value"
								:label="item.label"
								:value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="el-icon-search">{{luangeneedtobechange.chaxun}}</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon=" el-icon-refresh" @click="resetSearch('zhglSearchForm')">{{luangeneedtobechange.chongzhi}}</el-button>
					</el-form-item>
				</el-form>
			
			</div>
			<div class="zhgl_list">
				<div class="zhgl_copration pd30">
					<el-button type="primary" icon="el-icon-plus" @click="handleOpen">{{luangeneedtobechange.xinjian}}</el-button>
				</div>
				<div class="zhgl_table">
					<el-table :data="zhglData" ref="zhglData" style="width: 100%" border stripe >
						<!--<el-table-column type="selection" width="55"></el-table-column>-->
						<el-table-column prop="email" :label="luangeneedtobechange.dengluming"></el-table-column>
						<el-table-column prop="display_name" :label="luangeneedtobechange.shiyongrenxingming"></el-table-column>
						<el-table-column prop="mobile_phone" width="150" :label="luangeneedtobechange.shoujihao"></el-table-column>
						<el-table-column prop="role_name" :label="luangeneedtobechange.juese"></el-table-column>
						<el-table-column prop="created_at" :label="luangeneedtobechange.chuangjianshijian"></el-table-column>
						<el-table-column prop="updated_at" :label="luangeneedtobechange.xiugaishijian"></el-table-column>
						<el-table-column prop="status" width="90" :label="luangeneedtobechange.zhuangtai"></el-table-column>
						<el-table-column prop="action" width="90" :label="luangeneedtobechange.caozuo">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="handleUpdate(scope.$index,scope.row)">{{luangeneedtobechange.xiugai}}</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="page">
						<el-pagination
						    layout="prev, pager, next"
						    :total="pageTotal"
						    :page-size="pageSize"
						    :current-page="currentPage"
						    @current-change="getDataByPage">
						  </el-pagination>
					</div>
				</div>
			</div>
		</el-card>	
		<el-dialog :title="creatOrupdate" :visible.sync="centerDialogVisible">
			<div class="profileForm">
				<el-form 
					:model="profileForm" 
					:rules="profileFormRule"
					ref = "profileForm" 
					:label-width="labelWidth"
					class="xf-manange">
					<el-form-item 
						:label="luangeneedtobechange.dengluyouxiang + '：'" 
						prop="email">
						<el-input v-model.trim="profileForm.email"></el-input>
					</el-form-item>
					<el-form-item 
						:label="luangeneedtobechange.mima + '：'" 
						prop="password">
						<el-input type="password" v-model.trim="profileForm.password"></el-input>
					</el-form-item>
					<el-form-item 
						:label="luangeneedtobechange.querenmima + '：'" 
						prop="password_confirmation">
						<el-input type="password" v-model.trim="profileForm.password_confirmation"></el-input>
					</el-form-item>
					<el-form-item 
						:label="luangeneedtobechange.shiyongrenxingming + '：'" 
						prop="display_name">
						<el-input v-model.trim="profileForm.display_name"></el-input>
					</el-form-item>
					<el-form-item 
						:label="luangeneedtobechange.shiyongrenshoujihao + '：'" 
						prop="mobile_phone">
						<el-input v-model.trim="profileForm.mobile_phone"></el-input>
					</el-form-item>
					<el-form-item 
						:label="luangeneedtobechange.juese" 
						prop="role_ids">
						<el-checkbox-group v-model="profileForm.role_ids" @change="chooseRole">
					    		<el-checkbox label="1" name="role_ids">{{luangeneedtobechange.xiaoyuandashi}}</el-checkbox>
					    		<el-checkbox label="2" name="role_ids">{{luangeneedtobechange.shenheyuan}}</el-checkbox>
					    		<el-checkbox label="3" name="role_ids">{{luangeneedtobechange.shouxinyuan}}</el-checkbox>
					    		<el-checkbox label="4" name="role_ids">{{luangeneedtobechange.huankuanyuan}}</el-checkbox>
					  	</el-checkbox-group>
					</el-form-item>
					
					<el-form-item 
						v-if="isXyds" 
						:label="luangeneedtobechange.fuzexuexiao" 
						prop="channel_info">
						<el-select v-model="profileForm.channel_info" multiple :placeholder="luangeneedtobechange.qingxuanze" class="fuzexuexiao">
							<el-option v-for="item in schools"
								:key="item.value"
								:label="item.label"
								:value="item.value"></el-option>
						</el-select>
						<span><i ></i>{{luangeneedtobechange.xiaoyuandashiqingxuanzexuexiao}}</span>
					</el-form-item>
					<el-form-item 
						:label="luangeneedtobechange.zhanghaozhuangtai" 
						:placeholder="luangeneedtobechange.qingxuanze" 
						prop="status">
						<el-select v-model="profileForm.status">
							<el-option v-for="item in statuses"
								:key="item.value"
								:label="item.label"
								:value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button @click="cancel('profileForm')">{{cancelBtn}}</el-button>
			    			<el-button type="primary" @click="submitForm('profileForm')">{{saveBtn}}</el-button>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
			   
		 	</span>
		</el-dialog>
	</section>
</template>

<script>
	import URI from '../../ajax/uri'
	export default {
		data(){
			//自定义表单验证
			var checkEmail = (rule,value,callback) => {
				if(!value){
					return callback(new Error(this.luangeneedtobechange.denglumingbdwk))
				}else{
					callback()
				}
			}
			var checkPass = (rule,value,callback) => {
				if(!value){
					return callback(new Error(this.luangeneedtobechange.mimabudewk))
				}else{
					//密码为不能含有空格
					if(/\s/.test(value)){
						console.log(value)
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
			var checkPassConfirm = (rule,value,callback) => {
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
							if(value != this.profileForm.password){
								return callback(new Error(this.luangeneedtobechange.liangcimimabyz))
							}else{
								callback()
							}
						}
					}
				}
			}
			var checkUsername = (rule,value,callback) => {
				if(!value){
					return callback(new Error(this.luangeneedtobechange.shiyongrenxingmingbdwk))
				}else{
					callback()
				}
			}
			var checkTelephone = (rule,value,callback) => {
				if(!value){
					return callback(new Error(this.luangeneedtobechange.shiyongrenshoujihaobdwk))
				}else{
					if(value.length != 10){
					 	//10位手机号验证
					 	return callback(new Error(this.luangeneedtobechange.qingshurushiweisjh))						
					}else{
						//只能输入数字
						if((/^\d{n}$/.test(parseInt(value)))){
							return callback(new Error(this.luangeneedtobechange.shoujihaoznsrsz))
						}else{
							callback()
						}
					}
				}
				
			}
			var checkStatus= (rule,value,callback) => {
				if(!value){
					return callback(new Error(this.luangeneedtobechange.qingxuanzezhzt))
				}else{
					callback()
				}
			}
			//非空  邮箱、密码、确认密码、姓名、手机号
			//密码和确认密码不能包含空格
			//手机号只能输入10 并且只能输入数字
			//密码 6-20位数字或者有效密码
			return{
				headCellStyle:"headCellStyle",
				luangeneedtobechange: {
					dengluming: '',
					shiyongrenxingming: '',
					shoujihao: '',
					zhanghaozhuangtai: '',
					chaxun: '',
					chongzhi: '',
					xinjian: '',
					qiyong: '',
					jinyong: '',
					youxiang: '',
					juese: '',
					chuangjianshijian: '',
					xiugaishijian: '',
					caozuo: '',
					zhuangtai: '',
					xiugai: '',
					quanbu: '',
					xinjianzhanghao: '',
					xiugaizhanghao: '',
					mima: '',
					querenmima: '',
					shiyongrenshoujihao: '',
					xiaoyuandashi: '',
					sheheyuan: '',
					shouxinyuan: '',
					huankuanyuan: '',
					fuzexuexiao: '',
					qingxuanze: '',
					xiaoyuandashiqingxuanzexuexiao: '',
					baocun: '',
					quxiao: '',
					zhengchang:'',
					dengluyouxiang:'',
					shenheyuan:'',
					denglumingbdwk:'',
					mimabudewk:'',
					mimabdbhkbzf:'',
					qingshuruldeswszhywzm:'',
					querenmimabdwk:'',
					querenmimabdbhkbzf:'',
					liangcimimabyz:'',
					shiyongrenxingmingbdwk:'',
					shiyongrenshoujihaobdwk:'',
					qingshurushiweisjh:'',
					shoujihaoznsrsz:'',
					qingxuanzezhzt:'',
					xiugairenyuanchenggong:'',
					tianjiarenyuanchenggong:'',
					caozuoshibai:''
				},
				zhglSearchForm: {
					display_name: '',
					email: '',
					mobile_phone: '',
					status: ''
				},
				isXyds:false,
				zhglData: [],
				centerDialogVisible:false,
				creatOrupdate:"Create" , //根据点击按钮 不同 修改标题
				cancelBtn:'Cancel',
				saveBtn:'Save',
				profileForm:{
					email:'',
					user_id:'',
					password:'', //密码需要转成*号
					password_confirmation:'',
					display_name:'',
					mobile_phone:'',
					role_ids:[],
					channel_info:[],
					status:'启用'
				},
				profileFormRule:{
					email:[
						{ validator: checkEmail, trigger: 'blur' }
					],
					password:[
						{ validator: checkPass, trigger: 'blur' }
					],
					password_confirmation:[
						{ validator: checkPassConfirm, trigger: 'blur' }
					],
					display_name:[
						{ validator: checkUsername, trigger: 'blur' }
					],
					mobile_phone:[
						{ validator: checkTelephone, trigger: 'blur' }
					]
				},
				schools:[
					{
						label:'',
						value:''
					}
				],
				statuses:[],
				labelWidth:"200px",
				pageTotal:10,
				pageSize:10,
				currentPage:1,
				createOrUpdate:1
				
			}
		},
		methods: {
			handleQuery() {
				console.log(document.body.clientWidth )
				let lan = window.localStorage.getItem('language')
				let language ={}
				let zh_cn= this.languageConfig.zh_cn
				let th = this.languageConfig.th
				if(lan == null || lan == "zh"){
					this.labelWidth = "200px"
					language = zh_cn
				}else{
					language = th
					this.labelWidth = "300px"
				}
				for(let k in this.luangeneedtobechange) {
					this.luangeneedtobechange[k] = language[k]
				}
				//TODO 
				this.statuses.push({
					label:this.luangeneedtobechange.quanbu,
					value:'全部'
				},{
					label:this.luangeneedtobechange.qiyong,
					value:'启用'
				},{
					label:this.luangeneedtobechange.jinyong,
					value:'禁用'
				})
				//获取人员列表
				this.getUserList()
				
			},
			getUserList(searchs){
				let self = this
				self.$axios.post(URI.user_list,{params:searchs}).then(function(res){
					if(res.data.code == 0){
						let getData = res.data.data
						let userData = getData.data
						let pageData = getData.page
						// 角色 和状态需要处理
						for(let i=0,luser=userData.length;i<luser;i++){
							if(userData[i].status == "10"){
								userData[i].status = self.luangeneedtobechange.jinyong
							}else if(userData[i].status == "20"){
								userData[i].status = self.luangeneedtobechange.zhengchang
							}
							let role_name = ""
							if(userData[i].roles.length != 0){
								for(let j=0,lr=userData[i].roles.length;j<lr;j++){
									if(userData[i].roles[j] == 1){
										if(j == (lr-1)){
											role_name += self.luangeneedtobechange.xiaoyuandashi
										}else{
											role_name += self.luangeneedtobechange.xiaoyuandashi +'、'
										}
									}else if(userData[i].roles[j] == 2){
										if(j == (lr-1)){
											role_name += self.luangeneedtobechange.shenheyuan
										}else{
											role_name += self.luangeneedtobechange.shenheyuan +'、'
										}
									}else if(userData[i].roles[j] == 3){
										if(j == (lr-1)){
											role_name += self.luangeneedtobechange.shouxinyuan
										}else{
											role_name += self.luangeneedtobechange.shouxinyuan +'、'
										}
									}else if(userData[i].roles[j] == 4){
										if(j == (lr-1)){
											role_name += self.luangeneedtobechange.yunyingyuan
										}else{
											role_name += self.luangeneedtobechange.yunyingyuan +'、'
										}
									}
								}
							}
							userData[i].role_name = role_name
						}
						console.log(userData)
						self.zhglData = userData
						//分页
						self.currentPage = parseInt(pageData.current_page)
						self.pageTotal = parseInt(pageData.total)
						self.pageSize = parseInt(pageData.per_page)
					}
					
				})
			},
			//新建人员 -- 打开对话框
			handleOpen(){  
				this.creatOrupdate = this.luangeneedtobechange.xinjianzhanghao
				this.cancelBtn = this.luangeneedtobechange.quxiao
				this.saveBtn = this.luangeneedtobechange.baocun
				this.createOrUpdate  = 1
				this.centerDialogVisible = true
				this.$nextTick(function(){
					this.$refs.profileForm.resetFields()
				})
			},
			//修改人员--打开对话框
			handleUpdate(index,row){
				this.creatOrupdate = this.luangeneedtobechange.xiugaizhanghao
				this.cancelBtn = this.luangeneedtobechange.quxiao
				this.saveBtn = this.luangeneedtobechange.baocun
				this.createOrUpdate  = 2
				let self = this
				this.centerDialogVisible = true
				this.$nextTick(function(){
					this.$refs.profileForm.resetFields()
					this.profileForm.mobile_phone = row.mobile_phone
					this.profileForm.email = row.email
					this.profileForm.display_name = row.display_name
					this.profileForm.user_id = row.id
					this.profileForm.role_ids = row.roles
					this.profileForm.status = status
				})
			},
			resetSearch(formName){   //重置搜索
				this.$refs[formName].resetFields();
			},
			//查询
			
			getDataByPage(){
				//点击分页 请求人员列表
				
			},  
			cancel(formName){
				this.centerDialogVisible = false
			},
			//提交
			submitForm(name){
				this.$refs[name].validate((valid) => {
			        if (valid) {
			        		let self = this
			        		if(self.createOrUpdate  == 2){
			        			//修改
			        			let url = URI.user_update
			        			let restUrl = require("rest-url")
			        			url = restUrl.make(url,{
			        				user_id:this.profileForm.user_id
			        			})
			        			self.$axios.post(url).then((response) => {
			        				if(response.data.code == 0){
			        					//关闭对话框
			        					//重置表单
			        					self.centerDialogVisible = false
									self.$refs[name].resetFields();
			        					self.$message({
							          message: self.luangeneedtobechange.xiugairenyuanchenggong,
							          type: 'success'
							        });
			        				}
			        			})
			        		}else if(self.createOrUpdate  == 1){
			        			//新建
			        			self.$axios.post(URI.user_add).then((response) => {
			        				if(response.data.code == 0){
			        					self.centerDialogVisible = false
									self.$refs[name].resetFields();
			        					self.$message({
							          message: self.luangeneedtobechange.tianjiarenyuanchenggong,
							          type: 'success'
							        });
							        self.handleQuery()
			        				}
			        			})
			        		}
			        		
			        } else {
			        		this.$message({
				          message: this.luangeneedtobechange.caozuoshibai,
				          type: 'error'
				        });
			           	return false;
			        }
		        });
				
				
			},
			chooseRole(){
				let flag = false
				for(let i=0;i<this.profileForm.role_ids.length;i++){
					if(this.profileForm.role_ids[i] == "1"){
						flag = true
					}else{
						continue
					}
				}
				if(flag){
					this.isXyds = true
				}else{
					this.isXyds = false
				}
			},
		},
		created() {
			this.handleQuery()
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.pd30{
		padding: 30px 0;
	}
	.page{
		text-align: center;
		padding: 20px;
	}
</style>
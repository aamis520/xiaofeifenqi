<template>
	<section>
		<div class="xydsJd">
			<div class="xydsJd_title">
				<h1>{{luangeneedtobechange.chuli}}</h1>
			</div>
			<div class="xydsJd_back">
				<el-button @click="back">{{luangeneedtobechange.fanhui}}</el-button>
			</div>
			<div class="xydsJd_tabs">
				<el-tabs type="border-card">
					<el-tab-pane :label="luangeneedtobechange.gerenxinxi">
						<!--个人信息-->
						<div class="clearfix">
							<div class="fl">
								{{luangeneedtobechange.kehuxing}}：{{profile.apply_surname}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.kehuxingming}}：{{profile.apply_name}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.qinshidizhi}}：{{profile.house_address}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.yinhangyuliushoujihao}}：{{profile.bank_telephone}}
							</div>
						</div>
						<div class="clearfix">
							<div class="fl">
								{{luangeneedtobechange.xuexiaomingcheng}}：{{profile.school}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.zhuanye}}：{{profile.majors}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.ruxuenianfen}}：{{profile.school_year}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.xuehao}}：{{profile.student_id}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.zaiduxueli}}：{{profile.educational_background}}
							</div>
						</div>
					</el-tab-pane>
					
					<el-tab-pane :label="luangeneedtobechange.shenpixinxi">
						<div class="approval_info" v-for="item in approval_info">
                    			<div class="clearfix">
                    				<div class="fl" style="width: 30%;"><p>{{luangeneedtobechange.shenheyuan}}：{{item.role_name}}</p></div>
                    				<div class="fl"> <p>{{luangeneedtobechange.shenpijielun}}：{{item.title}}</p> </div>
                    				<div class="fl" style="width: 50%;">
                    					<p>{{luangeneedtobechange.shenpiyijian}}：{{item.comment}}</p>
                    				</div>
                    			</div>
                        </div>
					</el-tab-pane>
					<el-tab-pane :label="luangeneedtobechange.buchongcailiao">
						<div class="upload">
							<h3>{{luangeneedtobechange.buchongcailiao}}</h3>
							<div class="clearfix">
								<el-upload 
									:action="uploadUrl" 
									:before-upload="beforeUpload"
									:on-success = "uploadSuccess"
									list-type="picture-card" 
									:on-preview="handlePictureCardPreview" 
									:on-remove="handleRemove"
									:data="submitdata">
									<i class="el-icon-plus"></i>
								</el-upload>
								<el-dialog :visible.sync="dialogVisible" size="tiny">
									<img width="100%" :src="dialogImageUrl" alt="">
								</el-dialog>
							</div>
							
						</div>
						<div class="comment">
							<el-form :model="commentForm" ref="commentForm">
								<el-form-item :label="luangeneedtobechange.shenpijielun">
								<el-select v-model="commentForm.action_id" style="width: 400px;" :placeholder="luangeneedtobechange.qingxuanze">
									<el-option v-for="item in approve_select"
										:key="item.action_id"
										:label="item.action_name"
										:value="item.action_id">
									</el-option>
								</el-select>
							</el-form-item>
								<el-form-item :label="luangeneedtobechange.beizhuxinxi">
									<el-input type="textarea" :rows="5" style="width: 400px; display: block;" v-model="commentForm.comments"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button @click="xydsSubmit">{{luangeneedtobechange.tijiao}}</el-button>
								</el-form-item>
							</el-form>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</section>
</template>

<script>
	import URI from '../../ajax/uri'
	export default {
		data: () => ({
			luangeneedtobechange: {
				shenqingbianhao:'',
				kehuxingming:'',
				kehushoujihao:'',
				zhengjianleixing:'',
				shenfenzheng:'',
				zhengjianhaoma:'',
				xuexiaomingcheng:'',
				shenqingzhuangtai:'',
				shenqingshijian:'',
				kaishishijian:'',
				jieshushijian:'',
				jiedan:'',
				shenpizhong:'',
				gerenxinxi:'',
				jiaoyuxinxi:'',
				lianxirenxinxi:'',
				shenqingcailiao:'',
				shenpixinxi:'',
				minzu:'',
				chuxuka:'',
				chuxukahao:'',
				yinhangyuliushoujihao:'',
				shenfenzhenghao:'',
				huji:'',
				jiatingdizhi:'',
				qinshidizhi:'',
				shejiaozhanghao:'',
				zhuanye:'',
				ruxuenianfen:'',
				xuehao:'',
				zaiduxueli:'',
				benkezaidu:'',
				xuezhi:'',
				jiaowuwangyonghuming:'',
				jiaowuwangmima:'',
				qinshuxingming:'',
				guanxi:'',
				shoujihao:'',
				zuojihao:'',
				dizhi:'',
				jinjilianxirenxingming:'',
				shengfenzhengzhengmian:'',
				shenfenzhengfanmian:'',
				shouchishenfenzhengzhengmian:'',
				xueshengzheng:'',
				shenpijielun:'',
				shenpiyijian:'',
				tijiao:'',
				tongguo:'',
				jujue:'',
				bohui:'',
				chuli:'',
				fanhui:'',
				xiangqing:'',
				zuizhongshenpixinxi:'',
				xiaoyuandashishenpixinxi:'',
				buchongcailiao:'',
				beizhuxinxi:'',
				kehuxing:'',
				shenheyuan:''
			},
			approve_select:[],
			profile: {
				jwt_user_id:'',
				apply_name:'',
				house_address:'',
				bank_telephone:'',
				school:'',
				majors:'',
				school_year:'',
				educational_background:'',
				student_id:''
			},
			approval_info:[],
			dialogVisible:false,
			dialogImageUrl:'',
			commentForm:{
				comments:'',
				file_arr:[]
			},
			uploadUrl:URI.file_upload,
			submitdata:{
			},
			file_arr:[]
		}),
		methods: {
			handleQuery() {
				let lan = window.localStorage.getItem('language')
				let language ={}
				let zh_cn= this.languageConfig.zh_cn
				let th = this.languageConfig.th
				if(lan == null || lan == "zh"){
					language = zh_cn
				}else{
					language = th
				}
				for(let k in this.luangeneedtobechange) {
					this.luangeneedtobechange[k] = language[k]
				}
				let apply_id = this.$route.query.id
				//获取详情信息
				let self = this
				//Path:/fe-api/apply/{apply_id}/detail/{role_name}/{type} 
				//先拼出来URL 然后发起请求
				let url = URI.apply_detail
				let restUrl = require("rest-url")
				url = restUrl.make(url,{
					apply_id:apply_id,
					role_name:"campus_operator",
					type:"processing"
				})
				self.$axios.get(url, {
					apply_id:apply_id,
					role_name:"campus_operator",
					type:"processing"
				}).then((res) => {
					if(res.data.code == 0){
						let getData = res.data.data
						self.profile = getData.apply_info
						//审批结论
						this.approve_select = getData.approve_select
						self.approval_info = getData.comments
					}else{
						self.$message.error(res.data.msg)
					}
				})
				
			},
			back(){
				this.$router.go(-1)
			},
			xydsSubmit(){
				let self = this
				var url = URI.apply_operate
				console.log(url)
				var restUrl = require('rest-url');
				let apply_id = this.$route.query.id
				url = restUrl.make(url, {
				   "apply_id":apply_id,
				   "role_name":"campus_operator"
				});
				self.$axios.post(url,{
					apply_id:apply_id,
					role_name:"campus_operator",
					action_id:self.commentForm.action_id,  
					comment:self.commentForm.comments,
					file_arr:self.commentForm.file_arr
				}).then(function(res){
					if(res.data.code == 0){
						self.$message.success(res.data.msg)
						self.$router.go(-1)
					}else{
						self.$message.error(res.data.msg)
					}
				})
			},
			//TODO 
			beforeUpload(file){
				this.submitdata.file_type = "300"
				this.submitdata.user_id = this.profile.jwt_user_id
			},
			uploadSuccess(response,file,fileList){
				if(response.code == 0){
					if(response.data.file_id){
						this.commentForm.file_arr.push(response.data.file_id)
					}
				}
			},
			handleRemove(file, fileList){
				
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
        			this.dialogVisible = true;
			}
		},
		created() {
			this.handleQuery()
		}
  	}
</script>

<style scoped lang="scss">
	.xydsJd_tabs .fl{
		width: 20%;
		float: left;
		padding: 15px 0;
	}
	.approval p{
		padding: 15px 0;
		span{
			font-weight: bold;
		}
	}
	.upload{
		margin-top: 20px;
		h3{
			font-size: 20px;
			line-height: 1;
			padding: 15px 0;
		}
	}
	.comment{
		margin-top: 30px;
	}
	.xydsJd_back{
		margin: 20px 0;
		/*.el-button{
			padding: 10px 40px;
		}*/
	}
</style>
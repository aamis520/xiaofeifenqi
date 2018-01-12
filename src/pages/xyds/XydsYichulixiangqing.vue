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
								<div class="fl" v-for="item in support_files">
									<div>
										<img :src="item.file"/>
									</div>
								</div>
							</div>
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
				shenheyuan:'',
				shenpijielun:'',
				shenpiyijian:''
			},
			profile: {
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
			support_files:[]
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
				}).then(function(res){
					if(res.data.code == 0){
						let getData = res.data.data
						self.profile = getData.apply_info
						//审批结论
						self.approval_info = getData.comments
						//补充材料
						self.support_files = getData.support_files
					}else{
						self.$message.error(res.data.msg)
					}
				})
				
			},
			back(){
				this.$router.go(-1)
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
	.approval_info{
		margin-left: 30px;
		padding-bottom: 20px;
		p{
			font-size: 16px;
			line-height: 24px;
		}
	}
</style>
<template>
	<section>
		<div class="shyJd">
			<div class="shyJd_title">
				<h1>{{luangeneedtobechange.chuli}}</h1>
			</div>
			<div class="shyJd_back">
				<el-button @click="back">{{luangeneedtobechange.fanhui}}</el-button>
			</div>
			<div class="shyJd_tabs">
				<el-tabs type="border-card">
					<el-tab-pane :label="luangeneedtobechange.gerenxinxi">
						<!--个人信息 亲属信息 紧急联系人信息-->
						<div class="clearfix">
							<div class="fl">
								<div class="clearfix">
									<div style="float: left;box-sizing: border-box;width: 50%;">
										{{luangeneedtobechange.kehuxing}}：{{profile.apply_surname}}
									</div>
									<div style="float: left;box-sizing: border-box;width: 50%;">
										{{luangeneedtobechange.kehuming}}：{{profile.apply_name}}
									</div>
								</div>
							</div>
							<div class="fl">
								{{luangeneedtobechange.xingbie}}：{{profile.sex}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.chushengriqi}}：{{profile.birthday}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.shenfenzheng}}：{{profile.id_number}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.zongjiao}}：{{profile.religious}}
							</div>
						</div>
						<div class="clearfix">
							<div class="fl">
								{{luangeneedtobechange.chuxuka}}：{{profile.bank}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.chuxukahao}}：{{profile.bank_card_no}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.huji}}：{{profile.house_registration}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.jiatingdizhi}}：{{profile.dormitory_address}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.qinshidizhi}}：{{profile.house_address}}
							</div>
						</div>
						<div class="clearfix">
							<div class="fl">
								{{luangeneedtobechange.yinhangyuliushoujihao}}：{{profile.bank_telephone}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.shejiaopingtai}}：{{profile.social_account_type}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.shejiaozhanghao}}：{{profile.social_account}}
							</div>
						</div>
						<div class="contact">
							<div>
								<p>亲属联系人表格</p>
								<el-table :data="relateData">
									<el-table-column prop="contact_name" :label="luangeneedtobechange.qinshuxingming"></el-table-column>
									<el-table-column prop="contact_relation" :label="luangeneedtobechange.guanxi"></el-table-column>
									<el-table-column prop="contact_telephone" :label="luangeneedtobechange.shoujihao"></el-table-column>
									<el-table-column prop="machine_phone" :label="luangeneedtobechange.zuojihao"></el-table-column>
									<el-table-column prop="contact_address" :label="luangeneedtobechange.dizhi"></el-table-column>
								</el-table>
							</div>
							<div>
								<p>紧急联系人表格</p>
								<el-table :data="jinjiData">
									<el-table-column prop="contact_name" :label="luangeneedtobechange.jinjilianxirenxingming"></el-table-column>
									<el-table-column prop="contact_relation" :label="luangeneedtobechange.guanxi"></el-table-column>
									<el-table-column prop="contact_telephone" :label="luangeneedtobechange.shoujihao"></el-table-column>
									<el-table-column prop="machine_phone" :label="luangeneedtobechange.zuojihao"></el-table-column>
								</el-table>
							</div>
						</div>	
					</el-tab-pane>
					<el-tab-pane :label="luangeneedtobechange.jiaoyuxinxi">
						<div class="clearfix">
							<div class="fl">
								{{luangeneedtobechange.xuexiaomingcheng}}：{{profile.school}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.zhuanye}}：{{profile.majors}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.ruxuenianfen}}：{{profile.school_time}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.xuehao}}：{{profile.student_id}}
							</div>
						</div>
						<div class="clearfix">
							<div class="fl">
								{{luangeneedtobechange.xuezhi}}：{{profile.academic_system}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.zaiduxueli}}：{{profile.educational_background}}
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane :label="luangeneedtobechange.shenqingcailiao">
						<div>
							<h2>{{luangeneedtobechange.yonghutijiaodecailiao}}</h2>
							<div v-if="id_card_exist">
								<h3>{{luangeneedtobechange.shenfenzheng}}</h3>
								<div>
									<img :src="id_card_forward_url"/>
								</div>
								<p>{{luangeneedtobechange.shengfenzhengzhengmian}}.jpg</p>
							</div>
							<!--银行卡-->
							<div v-if="bank_card_exist">
								<h3>{{luangeneedtobechange.yinhangka}}</h3>
								<div>
									<img :src="bank_card_url"/>
								</div>
								<p>{{luangeneedtobechange.yinhangkazhengmian}}.jpg</p>
							</div>
							<!--学生证-->
							<div v-if="student_card_exist">
								<h3>{{luangeneedtobechange.xueshengzheng}}</h3>
								<div>
									<img :src="student_card_url"/>
								</div>
							</div>
							<!--户口本-->
							<h3>{{luangeneedtobechange.hukouben}}</h3>
							<div class="clearfix">
								<div class="fl" v-if="nation_card_forward_exist">
									<div>
										<img :src="nation_card_forward_url"/>
									</div>
									<p>{{luangeneedtobechange.dizhiyemian}}.jpg</p>
								</div>
								<div class="fl" v-if="nation_card_back_exist">
									<div>
										<img :src="nation_card_back_url"/>
									</div>
									<p>{{luangeneedtobechange.shenqingrenxingmingyemian}}.jpg</p>
								</div>
							</div>
							<!--补充材料-->
							<h2>{{luangeneedtobechange.buchongcailiao}}</h2>
							<div class="clearfix">
								<div class="fl" v-for="item in support_files">
									<div>
										<img :src="item.file"/>
									</div>
								</div>
							</div>
							<div class="ps">
								<p>{{luangeneedtobechange.beizhu}}：<span></span></p>
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
				yinhangka:'银行卡',
				yinhangkazhengmian:'银行卡正面',
				hukouben:'户口本',
				dizhiyemian:'地址页面',
				shenqingrenxingmingyemian:'申请人姓名页面',
				jiashizheng:'驾驶证',
				jiashizhengzhengmian:'驾驶证正面',
				jiashizhenhgfamian:'驾驶证发面',
				beizhu:'备注：',
				yonghutijiaodecailiao:'用户提交的材料',
				buchongcailiao:'',
				shenheyuanshenpi:'',
				zongjiao:'',
				chushengriqi:'出生日期',
				shejiaopingtai:'社交平台',
				shejiaozhanghao:'',
				xingbie:'性别',
				kehuxing:'姓',
				kehuming:'名',
				nan:'',
				nv:'',
				shenheyuan:''
			},
			//TODO
			profile: {
				apply_id: "001",
				apply_surname:'',
				apply_name:'',
				gender:'',
				religious:'',
				//身份证
				id_number:'',
				//户籍
				house_registration:'',
				//出生日期
				birthday:'',
				bank:'',
				bank_card_no:'',
				//家庭地址
				dormitory_address:'',
				//现住地址
				house_address:'',
				//预留手机号
				bank_telephone:'',
				//社交平台
				social_account_type:'',
				//社交账号
				social_account:'',
				//专业
				majors:'',
				//学校名称
				school:'',
				//入学时间
				school_time:'',
				//学号
				student_id:'',
				//在读学历
				educational_background:'',
				//学制
				academic_system:'',
				userName:'',
				sex:''
			},
			approvalForm:{
				result:'',
				approvalComment:''
			},
			results:[],
			relateData:[],
			jinjiData:[],
			apply_files:[],
			support_files:[],
			id_card_exist:false,
			id_card_url:'',
			bank_card_exist:false,
			bank_card_url:'',
			student_card_url:'',
			student_card_exist:false,
			nation_card_forward_url:'',
			nation_card_forward_exist:false,
			nation_card_back_url:'',
			nation_card_back_exist:false,
			approval_info:[]
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
				this.results = []
				this.results.push({
					label:this.luangeneedtobechange.tongguo,
					value:'1'
				},{
					label:this.luangeneedtobechange.jujue,
					value:'2'
				},{
					label:this.luangeneedtobechange.bohui,
					value:'3'
				},
				{
					label:this.luangeneedtobechange.xydsbuchongcailiao,
					value:'4'
				})
				let apply_id = this.$route.query.id
				//获取详情信息
				let self = this
				let url = URI.apply_detail
				let restUrl = require("rest-url")
				url = restUrl.make(url,{
					apply_id:apply_id,
					role_name:"auditor_procedures",
					type:"processed"
				})
				self.$axios.get(url, {
					apply_id:apply_id,
					role_name:"auditor_procedures",
					type:"processed"
				}).then(function(res){
					if(res.data.code == 0){
						let getData = res.data.data
						let apply_contact_info = getData.apply_contact
						for(let i=0;i<apply_contact_info.length;i++){
							if(apply_contact_info[i].contact_type == 1){
								self.relateData.push(apply_contact_info[i])
							}else if(apply_contact_info[i].contact_type == 2){
								self.jinjiData.push(apply_contact_info[i])
							}
						}
						//个人信息
						let personInfo = getData.apply_info
						if(personInfo.gender == "1"){
							personInfo.sex = self.luangeneedtobechange.nan
						}else if(personInfo.gender == "2"){
							personInfo.sex = self.luangeneedtobechange.nv
						}
						self.profile = personInfo
						//补充材料
						self.support_files = getData.support_files
						//用户提交的材料
						self.apply_files = getData.apply_files
						for(let j=0;j<self.apply_files.length;j++){
							if(self.apply_files[j].file_type == "102"){
								//身份证正面
								self.id_card_exist = true
								self.id_card_url = self.apply_files[j].file
							}else if(self.apply_files[j].file_type == "202"){
								//银行卡正面
								self.bank_card_exist = true
								self.bank_card_url = self.apply_files[j].file
							}else if(self.apply_files[j].file_type == "121"){
								//学生证
								self.student_card_exist = true
								self.student_card_url = self.apply_files[j].file
							}else if(self.apply_files[j].file_type == "111"){
								//户口簿地址页
								self.nation_card_forward_exist = true
								self.nation_card_forward_url = self.apply_files[j].file
							}else if(self.apply_files[j].file_type == "112"){
								//户口簿本人页
								self.nation_card_back_exist = true
								self.nation_card_back_url = self.apply_files[j].file
							}
						}
						//审批结论
						self.approval_info = getData.comments
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
	.shyJd_tabs .fl{
		width: 20%;
		float: left;
		padding: 15px 0;
	}
	.shyJd_back{
		margin: 20px 0;
	}
	.contact{
		margin: 40px 0 30px 0;
		p{
			font-size: 30px;
			font-weight: bold;
			padding: 20px 0;
		}
		.el-table{
			
		}
	}
</style>

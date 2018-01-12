<template>
	<section>
		<div class="xydsJd">
			<div class="xydsJd_title">
				<h1>{{luangeneedtobechange.xiangqing}}</h1>
			</div>
			<div class="xydsJd_back">
				<el-button>{{luangeneedtobechange.fanhui}}</el-button>
			</div>
			<div class="xydsJd_tabs">
				<el-tabs type="border-card">
					<el-tab-pane :label="luangeneedtobechange.gerenxinxi">
						<div class="clearfix">
							<div class="fl">
								{{luangeneedtobechange.kehuxingming}}：{{profile.userName}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.minzu}}：{{profile.userName}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.chuxuka}}：{{profile.userName}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.chuxukahao}}：{{profile.userName}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.yinhangyuliushoujihao}}：{{profile.userName}}
							</div>
						</div>
						<div class="clearfix">
							<div class="fl">
								{{luangeneedtobechange.shenfenzhenghao}}：{{profile.userName}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.huji}}：{{profile.userName}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.jiatingdizhi}}：{{profile.userName}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.qinshidizhi}}：{{profile.userName}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.shejiaozhanghao}}：{{profile.userName}}
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane :label="luangeneedtobechange.jiaoyuxinxi">
						<div class="clearfix">
							<div class="fl">
								{{luangeneedtobechange.xuexiaomingcheng}}：{{profile.userName}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.zhuanye}}：{{profile.userName}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.ruxuenianfen}}：{{profile.userName}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.xuehao}}：{{profile.userName}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.zaiduxueli}}：{{profile.userName}}
							</div>
						</div>
						<div class="clearfix">
							<div class="fl">
								{{luangeneedtobechange.xuezhi}}：{{profile.userName}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.jiaowuwangyonghuming}}：{{profile.userName}}
							</div>
							<div class="fl">
								{{luangeneedtobechange.jiaowuwangmima}}：{{profile.userName}}
							</div>
							
						</div>
					</el-tab-pane>
					<el-tab-pane :label="luangeneedtobechange.lianxirenxinxi">
						<!--联系人表格-->
						<div>
							<p>亲属联系人表格</p>
							<el-table :data="relateData">
								<el-table-column prop="name" :label="luangeneedtobechange.qinshuxingming"></el-table-column>
								<el-table-column prop="relate" :label="luangeneedtobechange.guanxi"></el-table-column>
								<el-table-column prop="mobile" :label="luangeneedtobechange.shoujihao"></el-table-column>
								<el-table-column prop="zmobile" :label="luangeneedtobechange.zuojihao"></el-table-column>
								<el-table-column prop="address" :label="luangeneedtobechange.dizhi"></el-table-column>
							</el-table>
						</div>
						<div>
							<p>紧急联系人表格</p>
							<el-table :data="jinjiData">
								<el-table-column prop="name" :label="luangeneedtobechange.qinshuxingming"></el-table-column>
								<el-table-column prop="relate" :label="luangeneedtobechange.guanxi"></el-table-column>
								<el-table-column prop="mobile" :label="luangeneedtobechange.shoujihao"></el-table-column>
								<el-table-column prop="zmobile" :label="luangeneedtobechange.zuojihao"></el-table-column>
							</el-table>
						</div>
					</el-tab-pane>
					<el-tab-pane :label="luangeneedtobechange.shenqingcailiao">
						<div class="shenfenzheng">
							<h3>{{luangeneedtobechange.shenfenzheng}}</h3>
							<div class="clearfix">
								<div class="fl">
									<div>
										<img src=""/>
									</div>
									<p>{{luangeneedtobechange.shenfenzhengzhengmian}}.jpg</p>
								</div>
								<div class="fl">
									<div>
										<img src=""/>
									</div>
									<p>{{luangeneedtobechange.shenfenzhengfanmian}}.jpg</p>
								</div>
								<div class="fl">
									<div>
										<img src=""/>
									</div>
									<p>{{luangeneedtobechange.shouchishenfenzhengzhengmian}}.jpg</p>
								</div>
							</div>
							<h3>{{luangeneedtobechange.xueshengzheng}}</h3>
							
						</div>
					</el-tab-pane>
					<el-tab-pane :label="luangeneedtobechange.shenpixinxi">
						<div class="">{{luangeneedtobechange.xiaoyuandashishenpixinxi}}</div>
						<div class="">{{luangeneedtobechange.zuizhongshenpixinxi}}</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</section>
</template>

<script>
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
				xiaoyuandashishenpixinxi:''
			},
			profile: {
				bianhao: "001",
				userName: 'xxxx',
				mobile: '1234567',
				inNum: '654323456', 
				schoolName: "泰国大学",
				approvalTime:'2017-11-11',
				status: '启用'
			},
			
			approvalForm:{
				result:'',
				approvalComment:''
			},
			results:[],
			relateData:[{
				name:'xxx',
				relate:'父子',
				mobile:'234',
				zmobile:'12345675',
				address:'北京市'
			}],
			jinjiData:[{
				name:'xxx',
				relate:'父子',
				mobile:'234',
				zmobile:'12345675',
				address:'北京市'
			}]
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
					value:'通过'
				},{
					label:this.luangeneedtobechange.jujue,
					value:'拒绝'
				},{
					label:this.luangeneedtobechange.bohui,
					value:'驳回'
				})
				
			},
		},
		created() {
			this.handleQuery()
		}
  	}
</script>

<style scoped>
	.xydsJd_tabs .fl{
		width: 20%;
		float: left;
	}
</style>
<template>
	<section>
		<div class="yyy_search">
			<el-form :model="yyySeachForm" ref="yyySeachForm" :inline="true"  class="demo-form-inline">
						<el-form-item :label="luangeneedtobechange.shenqingbianhao">
							<el-input v-model="yyySeachForm.work_order_no"></el-input>
						</el-form-item>
						<el-form-item :label="luangeneedtobechange.kehuxingming">
							<el-input v-model="yyySeachForm.userName"></el-input>
						</el-form-item>
						<el-form-item :label="luangeneedtobechange.kehushoujihao">
							<el-input v-model="yyySeachForm.bank_telephone"></el-input>
						</el-form-item>
						<el-form-item :label="luangeneedtobechange.zhengjianleixing">
							<el-select v-model="yyySeachForm.card_type" :placeholder="luangeneedtobechange.qingxuanze">
								<el-option v-for="item in types"
									:key="item.value"
									:label="item.label"
									:value="item.value"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item :label="luangeneedtobechange.zhengjianhaoma">
							<el-input v-model="yyySeachForm.id_number"></el-input>
						</el-form-item>
						<el-form-item :label="luangeneedtobechange.xuexiaomingcheng">
							<el-input v-model="yyySeachForm.school"></el-input>
						</el-form-item>
						<el-form-item :label="luangeneedtobechange.shenqingzhuangtai">
							<el-select v-model="yyySeachForm.status" :placeholder="luangeneedtobechange.qingxuanze">
								<el-option v-for="item in statuses"
									:key="item.value"
									:label="item.label"
									:value="item.value"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item :label="luangeneedtobechange.shenqingshijian">
							<el-date-picker
							    v-model="yyySeachForm.time"
							    type="datetimerange"
							    :start-placeholder="luangeneedtobechange.kaishishijian"
      							:end-placeholder="luangeneedtobechange.jieshushijian">
						    </el-date-picker>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" icon="el-icon-search" @click="getData">{{luangeneedtobechange.chaxun}}</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" icon="el-icon-refesh" @click="resetSearch('yyySeachForm')">{{luangeneedtobechange.chongzhi}}</el-button>
						</el-form-item>
			</el-form>
		</div>
		<div class="yyy_list">
			<div class="yyy_table">
				<el-table :data="yyyData" ref="yyyData" style="width: 100%" border stripe>
					<el-table-column prop="work_order_no" :label="luangeneedtobechange.shenqingbianhao"></el-table-column>
					<el-table-column prop="user_name" :label="luangeneedtobechange.kehuxingming"></el-table-column>
					<el-table-column prop="bank_telephone" :label="luangeneedtobechange.kehushoujihao"></el-table-column>
					<el-table-column prop="id_number" :label="luangeneedtobechange.zhengjianhaoma"></el-table-column>
					<el-table-column prop="school" :label="luangeneedtobechange.xuexiaomingcheng"></el-table-column>
					<el-table-column prop="create_at" :label="luangeneedtobechange.shenqingshijian"></el-table-column>
					<el-table-column prop="status" :label="luangeneedtobechange.shenqingzhuangtai"></el-table-column>
					<el-table-column prop="action" :label="luangeneedtobechange.caozuo">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="viewDetail(scope.$index,scope.row)">{{luangeneedtobechange.xiangqing}}</el-button>
						</template>
					</el-table-column>
				</el-table>
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
				chaxun:'',
				chongzhi:'',
				caozuo:'',
				shehetongguo:'',
				sheheweitongguo:'',
				shenhezhong:'',
				shenheguoqi:''
			},
			yyySeachForm: {
				work_order_no: '',
				userName: '',
				bank_telephone: '',
				card_type: '',
				id_number:'',
				school:'',
				status:'',
				time:[]
			},
			yyyData: [],
			
			statuses:[
			],
			types:[]
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
				this.statuses = []
				this.statuses.push({
					label:this.luangeneedtobechange.quanbu,
					value:'全部'
				},{
					label:this.luangeneedtobechange.shenpizhong,
					value:'审批中'
				})
				this.types = []
				this.types.push({
					label:this.luangeneedtobechange.shenfenzheng,
					value:'1'
				})
				
				let searchs = {
					role_name: "operating_member",
					type:"all"
				}
				this.getlist(searchs)
			},
			getData(){  //查询搜索结果  查询按钮点击
				console.log(this.yyySeachForm)
				let searchs = {
					role_name: "operating_member",
					type:"all",
				}
				for(let k in this.yyySeachForm){
					if(k == "time" && this.yyySeachForm[k].length != 0){
						searchs.begin_at = this.yyySeachForm.time[0]
						searchs.end_at = this.yyySeachForm.time[1]
					}else{
						searchs[k] = this.yyySeachForm[k]
					}
				}
			},
			resetSearch(formName){
				this.$refs[formName].resetFields()
			},
			getlist(params){        //获取列表数据
				let self = this
				let url = URI.apply_list
				let restUrl = require("rest-url")
				url = restUrl.make(url,{
					role_name:params.role_name,
					type:params.type
				})
				self.$axios.get(url, {params:params})
				.then(function(res) {
					if(res.data.code == 0) {
						let getData = res.data.data
						let lists = getData.data
						for(let i=0,len=lists.length;i<len;i++){
							lists[i].user_name = lists[i].apply_surname +" " + lists[i].apply_name
							if(lists[i].status){
								if(lists[i].status == 1){
									lists[i].status = self.luangeneedtobechange.shenhezhong
								}else if(lists[i].status == 2){
									lists[i].status = self.luangeneedtobechange.shenheweitongguo
								}else if(lists[i].status == 3){
									lists[i].status = self.luangeneedtobechange.shenhetongguo
								}else if(lists[i].status == 4){
									lists[i].status = self.luangeneedtobechange.shenheguoqi
								}
							}
						}
						self.yyyData = lists
						self.pageSize = getData.page.page_size
						self.pageTotal = getData.page.total
						self.currentPage = getData.page.page_index
						for(let k in getData.request){
							for(let key in self.yyySeachForm){
								if(k == key){
									self.yyySeachForm[k] = getData.request[k]
								}
							}
							if(k == "begin_at"){
								self.yyySeachForm.time[0] = getData.request[k]	
							}
							if(k == "end_at"){
								self.yyySeachForm.time[1] = getData.request[k]	
							}
						}
					} else {
						self.$message.error(res.data.msg)
					}
				})
			
			},
			viewDetail(index,row){
				let id = row.apply_id
				this.$router.push({
					path:'yyysqlb/yyyxqym',
					query:{
						id:id
					}
				})
			}
		},
		created() {
			this.handleQuery()
		}
  	}
</script>
	
<style>
</style>
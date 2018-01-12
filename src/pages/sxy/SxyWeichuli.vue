<template>
	<section>
		<div class="sxy_search">
			<el-form :model="sxySeachForm" ref="sxySeachForm" :inline="true" class="demo-form-inline">
						<el-form-item :label="luangeneedtobechange.shenqingbianhao" prop="work_order_no">
							<el-input v-model="sxySeachForm.work_order_no"></el-input>
						</el-form-item>
						<el-form-item :label="luangeneedtobechange.kehuxingming" prop="apply_name">
							<el-input v-model="sxySeachForm.apply_name"></el-input>
						</el-form-item>
						<el-form-item :label="luangeneedtobechange.kehushoujihao" prop="bank_telephone">
							<el-input v-model="sxySeachForm.bank_telephone"></el-input>
						</el-form-item>
						<el-form-item :label="luangeneedtobechange.zhengjianleixing" prop="card_type">
							<el-select v-model="sxySeachForm.card_type" :placeholder="luangeneedtobechange.qingxuanze">
								<el-option v-for="item in types"
									:key="item.value"
									:label="item.label"
									:value="item.value"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item :label="luangeneedtobechange.zhengjianhaoma" prop="id_number">
							<el-input v-model="sxySeachForm.id_number"></el-input>
						</el-form-item>
						<el-form-item :label="luangeneedtobechange.xuexiaomingcheng" prop="school">
							<el-input v-model="sxySeachForm.school"></el-input>
						</el-form-item>
						<el-form-item :label="luangeneedtobechange.shenqingshijian" prop="create_at">
							<el-date-picker
							    v-model="sxySeachForm.create_at"
							    type="datetimerange"
							    :start-placeholder="luangeneedtobechange.kaishishijian"
      							:end-placeholder="luangeneedtobechange.jieshushijian">
						    </el-date-picker>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" icon="el-icon-search" @click="getData">{{luangeneedtobechange.chaxun}}</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" icon="el-icon-refresh" @click="resetSearch('sxySeachForm')">{{luangeneedtobechange.chongzhi}}</el-button>
						</el-form-item>
			</el-form>
		</div>
		<div class="sxy_list">
			<div class="sxy_table">
				<el-table :data="sxyData" ref="sxyData" style="width: 100%" border stripe>
					<el-table-column prop="work_order_no" :label="luangeneedtobechange.shenqingbianhao"></el-table-column>
					<el-table-column prop="user_name" :label="luangeneedtobechange.kehuxingming"></el-table-column>
					<el-table-column prop="bank_telephone" width="180" :label="luangeneedtobechange.kehushoujihao"></el-table-column>
					<el-table-column prop="id_number" :label="luangeneedtobechange.zhengjianhaoma"></el-table-column>
					<el-table-column prop="school" :label="luangeneedtobechange.xuexiaomingcheng"></el-table-column>
					<el-table-column prop="create_at" :label="luangeneedtobechange.shenqingshijian"></el-table-column>
					<el-table-column prop="status" :label="luangeneedtobechange.shenqingzhuangtai"></el-table-column>
					<el-table-column prop="action" width="90" fixed="right" :label="luangeneedtobechange.caozuo">
						<template slot-scope="scope">
							<el-button type="text" size="small" v-if="!jiedanOrchuli[scope.$index].chuli" @click="aceept(scope.$index, scope.row)">{{luangeneedtobechange.jiedan}}</el-button>
							<el-button type="text" size="small" v-if="jiedanOrchuli[scope.$index].chuli" @click="doSomething(scope.$index, scope.row)">{{luangeneedtobechange.chuli}}</el-button>
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
				quanbu:'',
				shenpizhong:'',
				shenhezhong:'',
				shenheweitongguo:'',
				shenhetongguo:'',
				shenheguoqi:'',
				chaxun:'',
				chongzhi:'',
				qingxuanze:'',
				chaxun:'',
				chongzhi:'',
				caozuo:'',
				chuli:''
			},
			sxySeachForm: {
				work_order_no: '',
				apply_name: '',
				bank_telephone: '',
				card_type: '',
				id_number:'',
				school:'',
				status:'',
				time:[]
			},
			sxyData: [],
			pageTotal:10,
			pageSize:10,
			currentPage:1,
			types:[],
			jiedanOrchuli:[]
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
				this.types = []
				this.types.push({
					label:this.luangeneedtobechange.shenfenzheng,
					value:'0'
				})
				//获取未处理列表
				let searchs = {
					role_name: "credit_member",
					type:"processing"
				}
				this.getlist(searchs)
			},
			resetSearch(formName){
				this.$refs[formName].resetFields()
			},
			getData(){  //查询搜索结果  查询按钮点击
				let searchs = {
					role_name: "credit_member",
					type:"processing",
				}
				this.getlist(searchs)
			},
			aceept(index,row){    //接单
				let id = row.apply_id
				let self = this
				let url = URI.apply_accept
				let restUrl = require("rest-url")
				url = restUrl.make(url,{
					apply_id:id,
					role_name:"credit_member"
				})
				self.$axios.post(url).then(function(res){
					if(res.data.code == 0){
						self.jiedanOrchuli[index].chuli = true
						self.$message.success(res.data.msg)
					}else{
						self.$message.error(res.data.msg)
					}
				})
			},
			doSomething(index,row){
				let id = row.apply_id
				this.$router.push({
					path:'/fe/sxywcl/sxywcljd',
					query:{
						id:id
					}
				})
			},
			getDataByPage(index){
				let searchs = {
					role_name: "credit_member",
					type:"processing",
					page_index:index
				}
				this.getlist(searchs)
			},
			getlist(params){
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
						console.log(getData)
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
							if(lists[i].user_id && lists[i].user_id > 0){
								self.jiedanOrchuli.push({chuli:true})
							}else{
								self.jiedanOrchuli.push({chuli:false})
							}
						}
						self.sxyData = lists
						self.pageSize = getData.page.page_size
						self.pageTotal = getData.page.total
						self.currentPage = getData.page.page_index
						for(let k in getData.request){
							for(let key in self.sxySeachForm){
								if(k == key){
									self.sxySeachForm[key] = getData.request[k]
								}
							}
							if(k == "begin_at"){
								self.sxySeachForm.time[0] = getData.request[k]	
							}
							if(k == "end_at"){
								self.sxySeachForm.time[1] = getData.request[k]	
							}
						}
					} else {
						self.$message.error(res.data.msg)
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
	.page{
		text-align: center;
		padding: 20px;
	}
</style>
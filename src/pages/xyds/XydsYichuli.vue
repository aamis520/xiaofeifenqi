<template>
	<section>
		<div class="xyds_search">
			<el-form :model="xydsSeachForm" :inline="true" ref="xydsSeachForm"  class="demo-form-inline">
				<el-form-item :label="luangeneedtobechange.shenqingbianhao" prop="work_order_no">
					<el-input v-model="xydsSeachForm.work_order_no"></el-input>
				</el-form-item>
				<el-form-item :label="luangeneedtobechange.kehuxingming" prop="apply_name">
					<el-input v-model="xydsSeachForm.apply_name"></el-input>
				</el-form-item>
				<el-form-item :label="luangeneedtobechange.kehushoujihao" prop="bank_telephone">
					<el-input v-model="xydsSeachForm.bank_telephone"></el-input>
				</el-form-item>
				<el-form-item :label="luangeneedtobechange.zhengjianleixing" prop="card_type">
					<el-select v-model="xydsSeachForm.card_type" :placeholder="luangeneedtobechange.qingxuanze">
						<el-option v-for="item in types"
							:key="item.value"
							:label="item.label"
							:value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="luangeneedtobechange.zhengjianhaoma" prop="id_number">
					<el-input type="number" v-model="xydsSeachForm.id_number"></el-input>
				</el-form-item>
				<el-form-item :label="luangeneedtobechange.xuexiaomingcheng" prop="school">
					<el-input v-model="xydsSeachForm.school"></el-input>
				</el-form-item>
				<el-form-item :label="luangeneedtobechange.shenqingzhuangtai" prop="status">
					<el-select v-model="xydsSeachForm.status" :placeholder="luangeneedtobechange.qingxuanze">
						<el-option v-for="item in statuses"
							:key="item.value"
							:label="item.label"
							:value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="luangeneedtobechange.shenqingshijian" prop="create_at">
					<el-date-picker
					    v-model="xydsSeachForm.create_at"
					    type="datetimerange"
					    :start-placeholder="luangeneedtobechange.kaishishijian"
						:end-placeholder="luangeneedtobechange.jieshushijian">
				    </el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="getData">{{luangeneedtobechange.chaxun}}</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon=" el-icon-refresh" @click="resetSearch('xydsSeachForm')">{{luangeneedtobechange.chongzhi}}</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="xyds_list">
			<div class="xyds_table">
				<el-table :data="xydsData" ref="xydsData" style="width: 100%" border stripe>
					<el-table-column prop="work_order_no" :label="luangeneedtobechange.shenqingbianhao"></el-table-column>
					<el-table-column prop="user_name" :label="luangeneedtobechange.kehuxingming"></el-table-column>
					<el-table-column prop="bank_telephone" width="180" :label="luangeneedtobechange.kehushoujihao"></el-table-column>
					<el-table-column prop="id_number" :label="luangeneedtobechange.zhengjianhaoma"></el-table-column>
					<el-table-column prop="school" :label="luangeneedtobechange.xuexiaomingcheng"></el-table-column>
					<el-table-column prop="create_at" :label="luangeneedtobechange.shenqingshijian"></el-table-column>
					<el-table-column prop="status" :label="luangeneedtobechange.shenqingzhuangtai"></el-table-column>
					<el-table-column prop="action"  fixed="right" width="90" :label="luangeneedtobechange.caozuo">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="viewDetail(scope.$index,scope.row)">{{luangeneedtobechange.xiangqing}}</el-button>
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
				shenhezhong:'',
				shenheweitongguo:'',
				shenhetongguo:'',
				shenheguoqi:'',
			},
			xydsSeachForm: {
				work_order_no: '',
				apply_name: '',
				bank_telephone: '',
				card_type: '',
				id_number:'',
				school:'',
				status:'',
				create_at:[]
			},
			xydsData: [],
			statuses:[],
			pageTotal:10,
			pageSize:10,
			currentPage:1,
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
					label:this.luangeneedtobechange.shenhezhong,
					value:'1'
				},
				{
					label:this.luangeneedtobechange.shenheweitongguo,
					value:'2'
				},
				{
					label:this.luangeneedtobechange.shenhetongguo,
					value:'3'
				},
				{
					label:this.luangeneedtobechange.shenheguoqi,
					value:'4'
				})
				this.types = []
				this.types.push({
					label:this.luangeneedtobechange.shenfenzheng,
					value:'0'
				})
				//获取已处理列表
				let self = this;
				let searchs = {
					role_name: "campus_operator",
					type:'processed',
				}
				this.getlist(searchs)
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
						self.xydsData = lists
						self.pageSize = getData.page.page_size
						self.pageTotal = getData.page.total
						self.currentPage = getData.page.page_index
						for(let k in getData.request){
							for(let key in self.xydsSeachForm){
								if(k == key){
									self.xydsSeachForm[k] = getData.request[k]
								}
							}
						}
					} else {
						self.$message.error(res.data.msg)
					}
				})
			
			},
			getData(){  //查询搜索结果  查询按钮点击
				let self = this
				let searchs = {
					role_name: "campus_operator",
					type:'processed',
				}
				for(let k in this.xydsSeachForm){
					if(k == "time" && this.xydsSeachForm[k].length != 0){
						searchs.begin_at = this.xydsSeachForm.time[0]
						searchs.end_at = this.xydsSeachForm.time[1]
					}else{
						searchs[k] = this.xydsSeachForm[k]
					}
				}
				this.getlist(searchs)
			},
			getDataByPage(index){
				//带上搜索条件 加上第几页的数据
				let self = this
				let searchs = {
					role_name: "campus_operator",
					type:'processed',
					page_index:index
				}
				for(let k in this.xydsSeachForm){
					if(k == "time" && this.xydsSeachForm[k].length != 0){
						searchs.begin_at = this.xydsSeachForm.time[0]
						searchs.end_at = this.xydsSeachForm.time[1]
					}else{
						searchs[k] = this.xydsSeachForm[k]
					}
				}
				this.getlist(searchs)
			},
			viewDetail(index,row){
				//查看详情
				let id = row.apply_id
				this.$router.push({
					path:'/fe/xydsycl/yclxqym',
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
	
<style scope>
	.page{
		text-align: center;
		padding: 20px;
	}
</style>
<template>
	<section>
		<div class="hky_search">
			<div class="hkySeachForm">
				<el-form>
					
				</el-form>
			</div>
			<el-form :model="hkySeachForm" ref="hkySeachForm" label-width="110px">
				<el-row>
					<el-col :span="6">
						<el-form-item :label="luangeneedtobechange.dingdanhao">
							<el-input v-model="hkySeachForm.bianhao"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item :label="luangeneedtobechange.xingming">
							<el-input v-model="hkySeachForm.userName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item :label="luangeneedtobechange.shenfenzhenghaoma">
							<el-input v-model="hkySeachForm.mobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item :label="luangeneedtobechange.shoujihaoma">
							<el-input v-model="hkySeachForm.idNum"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item :label="luangeneedtobechange.xuexiao">
							<el-select v-model="hkySeachForm.idType" :placeholder="luangeneedtobechange.qingxuanze">
								<el-option v-for="item in types"
									:key="item.value"
									:label="item.label"
									:value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item :label="luangeneedtobechange.huankuanzhuangtai">
							<el-select v-model="hkySeachForm.idType" :placeholder="luangeneedtobechange.qingxuanze">
								<el-option v-for="item in types"
									:key="item.value"
									:label="item.label"
									:value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item :label="luangeneedtobechange.dingdanshijian">
							<el-date-picker
							    v-model="hkySeachForm.approvalTime"
							    type="datetimerange"
							    :start-placeholder="luangeneedtobechange.kaishishijian"
      							:end-placeholder="luangeneedtobechange.jieshushijian">
						    </el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item :label="luangeneedtobechange.huankuanshijian">
							<el-date-picker
							    v-model="hkySeachForm.approvalTime"
							    type="datetimerange"
							    :start-placeholder="luangeneedtobechange.kaishishijian"
      							:end-placeholder="luangeneedtobechange.jieshushijian">
						    </el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div class="zhgl_btngroup">
			<el-button type="primary">{{luangeneedtobechange.chaxun}}</el-button>
			<el-button type="primary">{{luangeneedtobechange.chongzhi}}</el-button>
		</div>
		<div class="hky_list">
			<div class="hky_table">
				<el-table :data="hkyData" ref="hkyData" style="width: 100%">
					<el-table-column prop="bianhao" :label="luangeneedtobechange.dingdanhao"></el-table-column>
					<el-table-column prop="userName" :label="luangeneedtobechange.xingming"></el-table-column>
					<el-table-column prop="mobile" :label="luangeneedtobechange.shenfenzhenghaoma"></el-table-column>
					<el-table-column prop="idNum" :label="luangeneedtobechange.xuexiao"></el-table-column>
					<el-table-column prop="schoolName" :label="luangeneedtobechange.dangqianqishu"></el-table-column>
					<el-table-column prop="approvalTime" :label="luangeneedtobechange.yinghuanjine"></el-table-column>
					<el-table-column prop="status" :label="luangeneedtobechange.yinghuanriqi"></el-table-column>
					<el-table-column prop="status" :label="luangeneedtobechange.huankuanzhuangtai"></el-table-column>
					<el-table-column prop="action" :label="luangeneedtobechange.caozuo" v-bind:min-width="140">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="huandangqi">{{luangeneedtobechange.dangqihuankuan}}</el-button>
							<el-button type="text" size="small" @click="tiqianhuankuan">{{luangeneedtobechange.tiqianjieqing}}</el-button>
							<el-button type="text" size="small">{{luangeneedtobechange.xiangqing}}</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<!--还款对话框-->
		<el-dialog :title="dlsgTitle" :visible.sync="centerDialogVisible" width="30%" center>
			<div class="profileForm"style="margin: 0 auto;width: 80%;">
				<el-form ref="buyForm" :model="buyForm" label-width="160px">
					<el-form-item :label="luangeneedtobechange.dingdanhao + '：'">
						<span>{{buyForm.dingdanhao}}</span>
					</el-form-item>
					<el-form-item :label="luangeneedtobechange.dingdanxinxi + '：'">
						<span>{{buyForm.dingdanxinxi}}</span>
					</el-form-item>
					<el-form-item :label="luangeneedtobechange.huankuanleixing + '：'">
						<span>{{buyForm.huankuanleixing}}</span>
					</el-form-item>
					<el-form-item :label="luangeneedtobechange.dangqianqishu + '：'">
						<span>{{buyForm.dangqianqishu}}</span>
					</el-form-item>
					<el-form-item :label="luangeneedtobechange.yinghuanjine + '：'">
						<span>{{buyForm.yinghuanjine}}</span>
					</el-form-item>
					<el-form-item :label="luangeneedtobechange.huankuanjine + '：'">
						<el-input style="width: 300px;margin-right: 30px;" v-model="buyForm.huankuanjine" ></el-input>元
					</el-form-item>
					
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
			    <el-button type="primary" style="width: 200px;" @click="centerDialogVisible = false">{{luangeneedtobechange.queding}}</el-button>
			    <i style="display: block;padding: 15px 0;color: red;">{{luangeneedtobechange.huankuanzhuyi}}</i>
		 	</span>
		</el-dialog>
	</section>
</template>

<script>
	export default {
		data: () => ({
			luangeneedtobechange: {
				yijieqingliebiao:'',
				yijieqingliebiaoxiangqing:'',
				huankuanliebiao:'',
				dingdanhao:'',
				xingming:'',
				shoujihaoma:'',
				shenfenzhenghaoma:'',
				xuexiao:'',
				huankuanzhuangtai:'',
				dengdaihuankuan:'',
				huankuanchenggong:'',
				huankuanshibai:'',
				yuqi:'',
				dingdanshijian:'',
				huankuanshijian:'',
				dangqianqishu:'',
				yinghuanjine:'',
				yinghuanriqi:'',
				dangqihuankuan:'',
				tiqianjieqing:'',
				huankuanjihua:'',
				dingdanxinxi:'',
				huankuanleixing:'',
				huankuanjine:'',
				huankuanzhuyi:'',
				queding:'',
				huandangqi:'',
				quanbu:'',
				chaxun:'',
				chongzhi:'',
				qingxuanze:'',
				caozuo:'',
				xiangqing:''
			},
			hkySeachForm: {
				bianhao: '',
				userName: '',
				mobile: '',
				idType: '',
				idNum:'',
				schoolName:'',
				status:'',
				approvalTime:[]
			},
			hkyData: [{
				bianhao: "001",
				userName: 'xxxx',
				mobile: '1234567',
				idNum: '654323456', 
				schoolName: "泰国大学",
				approvalTime:'2017-11-11',
				status: '启用'
			}],
			
			statuses:[
			],
			types:[],
			dlsgTitle:'',
			centerDialogVisible:false,
			buyForm:{
				dingdanhao:'123',
				dingdanxinxi:'xxx电商',
				huankuanleixing:'还当期',
				dangqianqishu:'3/6',
				yinghuanjine:'3000.00',
				huankuanjine:'3000.00'
			}
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
					label:this.luangeneedtobechange.quanbu,
					value:'全部'
				},{
					label:this.luangeneedtobechange.shenfenzheng,
					value:'身份证'
				})
			},
			huandangqi(){
				console.log(this.luangeneedtobechange.huandangqi)
				this.dlsgTitle = this.luangeneedtobechange.huandangqi
				this.centerDialogVisible = true
			},
			tiqianhuankuan(){
				this.dlsgTitle = this.luangeneedtobechange.tiqianjieqing
				this.centerDialogVisible = true
			}
		},
		created() {
			this.handleQuery()
		}
  	}
</script>
	
<style>
</style>
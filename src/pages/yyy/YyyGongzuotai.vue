<template>
	<section>
		<el-card>
			<div class="yyy_gzt clearfix">
				<div class="fl">
					<p class="title">{{luangeneedtobechange.shenqingzongshu}}</p>
					<p class="num">{{result.apply_total}}</p>
				</div>
				<div class="fl">
					<p class="title">{{luangeneedtobechange.xiaoyuandashidaichuli}}</p>
					<p class="num">{{result.campus_untreated}}</p>
				</div>
				<div class="fl">
					<p class="title">{{luangeneedtobechange.shehaidaichuli}}</p>
					<p class="num">{{result.approve_untreated}}</p>
				</div>
				<div class="fl">
					<p class="title">{{luangeneedtobechange.shouxinyuandaichuli}}</p>
					<p class="num">{{result.audit_untreated}}</p>
				</div>
			</div>
			<div class="count">
				<p>{{luangeneedtobechange.yishangshujujiezhizhi}}：<span>{{result.closing_time}}</span></p>
			</div>
		</el-card>		
	</section>
</template>

<script>
	import URI from '../../ajax/uri'
	export default {
		data: () => ({
			luangeneedtobechange: {
				shenqingzongshu:'',
				xiaoyuandashidaichuli:'',
				shehaidaichuli:'',
				shouxinyuandaichuli:'',
				yishangshujujiezhizhi:'',
			},
			result:{
				approve_untreated:'',
				audit_untreated:'',
				campus_untreated:'',
				apply_total:'',
				closing_time:''
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
				let self = this 
				self.$axios.get(URI.operation_statics,{}).then(function(res){
					if(res.data.code == 0){
						self.result = res.data.data
					}else{
						self.$message.error(res.data.msg)
					}
				})
			},
		},
		created() {
			this.handleQuery()
		}
  	}
</script>
	
<style scoped lang="scss">
	.yyy_gzt{
		.fl{
			width: 25%;
			float: left;
		}
		p{
			text-align: center;
		}
		p.title{
			font-size: 16px;
			color: #767676;
			line-height: 24px;
		}
		p.num{
			font-size: 30px;
			font-weight: bold;
			color: #5f77ed;
			line-height: 40px;
		}
	}
	.count{
		p{
			text-align: right;
			padding-right: 40px;
			padding-top: 40px;
			padding-bottom: 20px;
			font-size:14px;
		}
	}
</style>
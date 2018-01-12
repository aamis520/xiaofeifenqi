<template>
	<div class="preview-mask" v-show="visibility">
        <a class="shutdown-btn" @click="shutdown">关闭</a>

        <div class="btn-c" v-show="controlBtnsShow">
	        <p>
		        <button type="button" @click="leftTransformClick">左旋</button>
		        <button type="button" @click="rightTransformClick">右旋</button>
		        <button type="button" @click="normalClick">原图</button>
		        <button type="button" @click="enlargeClick">放大</button>
		        <button type="button" @click="narrowClick">缩小</button>
	        </p>
        </div>
        <div class="main-content">
        	<h2 class="title">{{ fileName }}</h2>
        
	        <div class="pre-content">
	        	<img draggable="true" v-show="imgShow" :src="imgSrc" :style="imgStyleObj" 
	        	    @dragstart="dragStart" @dragend="dragEnd" />
	        	<iframe width="100" v-show="pdfShow" frameborder="0" height="100%" :src="pdfSrc"></iframe>
		        <div class="download-c" v-show="downloadOtherShow">
		        	<a :href="downloadLink">点击下载</a>
		        </div>
	    	</div>
	        <i class="preview-pre-btn" v-show="preBtnShow" @click="showPreClick"></i>
	        <i class="preview-next-btn" v-show="nextBtnShow" @click="showNextClick"></i>
        </div>
    </div>
</template>

<script>
	import types from '../../store/types'

	export default {
		data () {
			return {
				imgShow: false,
				pdfShow: false,
				controlBtnsShow: false,
				downloadOtherShow: false,
				preBtnShow: false,
				nextBtnShow: false,

				fileName: '',
				imgSrc: '',
				pdfSrc: '',
				downloadLink: '',

				currrentType: 'img', // img && pdf && other
				preivewType: 1, // 1--单图片  2--多图片+pdf

				index : 0,

				scaleVari: 1,
				scale: 1,
				rotate : 0,
				rotateVari: 0,

				left : 0,
				top : 0,
				startX: 0,
				startY: 0,

			}
		},
		computed: {
			imgStyleObj () {
				let scale = this.scale,rotate = this.rotate;
				return {
					'-webkit-transform': 'scale(' + Number(scale) + ') rotateZ(' + Number(rotate) + 'deg)',
					left: this.left + "px",
            		top:  this.top + "px"
				}
			},
			visibility () {
				const visibility = this.$store.state.preivew.visibility;

				this.previewInit();

				return visibility;
			},
			hasMorePreviews () {
				return true;
			},
			contents () {
				return this.$store.state.preivew.contents;
			}
		},
		methods: {
			shutdown () {
				this.$store.commit( types.preview_hide );
			},
			previewInit () {
				this.resetTransform();
				const index = 0;

				const contentLen = this.contents.length;
				if ( contentLen > 1 ) {
					this.preBtnShow = true;
					this.nextBtnShow = true;
				} else {
					this.preBtnShow = false;
					this.nextBtnShow = false;
				}

				this.previewSwitch( index );
			},
			previewSwitch ( _index ) { // 主要用于控制切换pdf和img是的显示
				const contentLen = this.contents.length;
				if ( _index < 0 || _index > contentLen - 1 ) {
					return;
				}

				if ( contentLen.length > 1 ) {
					if ( _index <= 1 ) {
						this.preBtnShow = false;
					} else if ( _index >= contentLen - 1 ) {
						this.nextBtnShow = false;
					}
				}

				let fileSrc = this.contents[ _index ]['src'],
						fileType = this.contents[ _index ]['type'],
							fileName = this.contents[ _index ]['name'];
				if ( 'jpg' == fileType ||
						'jpeg' == fileType || 
						   'gif' == fileType || 
						   		'png' == fileType ) {
					this.downloadOtherShow = false;
					this.pdfShow = false;
					this.pdfSrc = '';
					
					this.showControlBtns();
					this.resetTransform();
					this.fileName = fileName;

					this.imgSrc = fileSrc;
					this.imgShow = true;
				} else if ( 'pdf' == fileType || 
								'PDF' == fileType ) {
					this.downloadOtherShow = false;
					this.imgShow = false;
					this.imgSrc = '';

					this.hideControlBtns();
					this.fileName = fileName;
					
					this.pdfSrc = fileSrc;
					this.pdfShow = true;
				} else {
					this.imgShow = false;
					this.pdfShow = false;
					this.imgSrc = '';
					this.pdfSrc = '';
					
					this.fileName = fileName;

					this.downloadLink = fileSrc;
					this.downloadOtherShow = true;
				}

				this.index = _index;
			},
			resetTransform () {
				this.scaleVari = 1;
				this.rotateVari = 0;
				this.scale = 1;
				this.rotate = 0;
				this.left = 0;
				this.top = 0;
			},
			leftTransformClick () {
				let { rotateVari } = this;
				rotateVari -= 90;
				this.rotateVari = rotateVari;

            	this.transformWithVariable();
			},
			rightTransformClick () {
				let { rotateVari } = this;
				rotateVari += 90;
				this.rotateVari = rotateVari;;

            	this.transformWithVariable();
			},
			normalClick () {
				this.scaleVari = 1;
				this.rotateVari = 0;
				
		        this.transformWithVariable();
			},
			enlargeClick () {
				let { scaleVari } = this;

				if ( scaleVari < 9 ) {
	                this.scaleVari = ++scaleVari;
	            }
	            console.log(`enlarge scale : ${this.scaleVari} .`);
	            
	            this.transformWithVariable();
			},
			narrowClick () {
				let { scaleVari } = this;

				if ( scaleVari > -3 ) {
	                this.scaleVari = --scaleVari;
	            }
	            console.log(`narrow scale : ${this.scaleVari} .`);

	            this.transformWithVariable();
			},
			transformWithVariable () {
				this.transform( this.scaleVari,this.rotateVari );
			},
			dragStart ( event ) {
				event.stopPropagation();

				this.startX = event.clientX;
				this.startY = event.clientY;
			},
			dragEnd ( event ) {
				event.stopPropagation();

				const offsetX = event.clientX - this.startX,
            			offsetY = event.clientY - this.startY;

            	this.left += offsetX;		
            	this.top += offsetY;
			},
			showPreClick () {
				let index = this.index;
				--index;
				this.previewSwitch( index );
			},
			showNextClick () {
				let index = this.index;
				++index;
				this.previewSwitch( index );
			},
			downloadOther () {

			},
			// -----------------------------
			transform ( scale, deg ) {
				scale = 1 + (scale / 10);
		        
				this.scale = scale;
				this.rotate = deg;
			},
			showControlBtns () {
				this.controlBtnsShow = true;
			},
			hideControlBtns () {
				this.controlBtnsShow = false;
			},

		}
	}
</script>

<style lang="scss" scoped>
	.preview-mask {
		position:fixed;
		z-index:9999;
		top:0;
		left: 0;
		overflow: hidden;
		width:100%;
		height:100%;
		/*min-width:1000px;min-height:700px;*/
		background:rgba(0,0,0,0.9);

		
		.shutdown-btn {
			position: absolute;
			z-index: 5000;
			width: 54px;
			height: 34px;
			line-height: 34px;
			text-align: center;
			top: 5px;
			right: 50px;
			color: #fff;
			background-color: #dd4b39;
		}

		.btn-c {
			height: 34px;
    		position: absolute;
    		z-index: 1000;
    		top: 0;
    		left: 0;
    		width: 100%;
    		text-align: center;

    		p {
    			font-size: 0;

    			button {
    				display: inline-block;
				    padding: 6px 12px;
				    margin: 0;
				    font-size: 14px;
				    color: #fff;
				    white-space: nowrap;
				    vertical-align: middle;
				    -ms-touch-action: manipulation;
				    touch-action: manipulation;
				    cursor: pointer;
				    -webkit-user-select: none;
				    -moz-user-select: none;
				    -ms-user-select: none;
				    user-select: none;
				    background-image: none;
				    border: 1px solid transparent;
				    border-radius: 1px;
				    background-color: #3c8dbc;
    				border-color: #367fa9;
    			}
    		}
		}

		.preview-pre-btn {
			display: inline-block;
			width: 30px;
			height: 30px;
			-webkit-user-select:none;
			position:absolute; 
			left:5%;
			top:45%;
			font-size:50px;
			background: red;
		}
		.preview-next-btn {
			display: inline-block;
			width: 30px;
			height: 30px;
			-webkit-user-select:none;
			position:absolute; 
			right:5%;
			top:45%;
			font-size:50px;
			background: red;
		}




		.main-content {
			width:100%;
			overflow-y:scroll;
			height:100%;
			position:absolute;
			z-index: 1;
			box-sizing: border-box;
			padding-top: 50px;
		}
		.main-content .title {
			position: relative;
			z-index:10001;
			color:#3C8DBC;
			text-align: center;
			font-size: 30px;
		}

		.pre-content {
			width: 800px;
			height: 500px;
			text-align: center;
			z-index:1;
			position:absolute;
			top:50%;
			left:50%;
			margin:-250px 0 0 -400px;

			img {
				max-width:100%;
				min-height:100%;
				-webkit-transition: 0.3s;
				-moz-transition: 0.3s;
				transition: 0.3s;
				position:relative;
			}

			iframe {
				width: 800px
			}

			div {
				width:800px;
				height:500px;
				text-align: center;
				font-size: 38px;
				color: #3C8DBC;

				a {
					font-size: 38px;
					color: #3c8dbc;
				}
			}
		}
	}
</style>

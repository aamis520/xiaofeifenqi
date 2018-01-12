/**
*  入口
*  @author: gaoyong@weiyankeji.cn
*  @date: 2017.11.02
*  注意:
*		所有扩展函数都是工厂模式，因为需要在上传前判断借贷人姓名,
*			上传时上传文件名等问题 如果开发者不需要控制的，返回空字符串即可	
*/
import qiniuBeforeUploadFactory from './qiniu/beforeUploadFactory'
import qiniuHttpRequestFactory from './qiniu/httpRequestFactory'
import qiniuSuccessFactory from './qiniu/onSuccessFactory'


export default {
	qiniuBeforeUploadFactory,
	qiniuHttpRequestFactory,
	qiniuSuccessFactory,

	

}
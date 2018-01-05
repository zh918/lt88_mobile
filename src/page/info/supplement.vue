<template>
	<div class="collect-supplement"> 

	    <!-- <ymt-upload-img class="supplement-img" @change="handleChangeImg">
			<div slot="icon" class="supplement-icon">
				<i class="icon iconfont icon-tianjia icon-img"></i> 
				<div class="icon-des">点击上传行驶证照片</div>
			</div>
		</ymt-upload-img> -->

		<input type="file" 
					ref="image_uploads_camera" 
					class="image-uploads-input" 
					accept="image/*"  
					capture="camera"
					@change="handleFileChange">
		<input type="file" 
				ref="image_uploads_image" 
				class="image-uploads-input" 
				accept="image/*"  
				@change="handleFileChange">

		<div class="supplement-img">
			<div v-if="!imgUrl" slot="icon" class="supplement-icon"  @click="handleShowShade">
				<i class="icon iconfont icon-tianjia icon-img"></i> 
				<div class="icon-des">点击上传行驶证照片</div>
			</div>
			<img id="result_img" v-else width="100%" height="100%" :src="imgUrl" @click="handleViewImage">
			<canvas id="canvas"  style="display: none;"></canvas> 

			<ymt-view-image v-if="isViewAndReset && !isUploadSuccess" @close="handleCloseViewImage">  
				<img :src="imgUrl" alt="" slot="img" >
		   		<ymt-button slot="footer" class="btn-blue btn-submit" @click="handleResetClick">重新上传</ymt-button> 
		   </ymt-view-image> 

			<div v-if="showLoading" class="load-container">
				<div v-if="!uploadStatus" class="loader"></div>
				<span v-if="uploadStatus=='success'" class="iconfont icon-chenggong1"></span>
				<span v-if="uploadStatus=='error'" class="iconfont icon-shibai"></span>
				<div v-if="uploadStatus=='error'" class="reset-upload" @click="handleResetUpload"><span>点击重新上传</span></div>
			</div>

		</div>
		<p class="error-tip">
			<span v-if="uploadStatus=='error'">上传出现错误，请重新上传 </span>
			&nbsp;
		</p>
		<div class="operate" v-if="!isUploadSuccess">
			<ymt-button :class="['btn-blue',{'btn-submit':file && isCanSubmit}]" @click="handleSubmit">提交照片</ymt-button>
		</div>
		<div class="success-upload" v-else>
			<i class="icon iconfont icon-chenggong"></i>
			<div class="p-1">您的行驶证照片已经提交成功。</div>
			<div class="p-2">我们将重新为您报价，</div>
			<div class="p-2">报价成功后，将会以短信的方式发送到您的手机！</div>
		</div>
        
		<ymt-shade v-if="isShowShade"  @closeShade="handleCloseShade">
			<div class="flot-eg">
				<div class="close"><i class="icon iconfont icon-guanbi" @click="handleCloseShade"></i></div>
				<img src="../../assets/images/IDcard@2x.png" alt="">
				<div class="flot-eg-des">
					请按照图示，提交行驶证照片，照片要四角对齐，避免出现模糊，太暗有遮挡的情况。
				</div>

				<div class="flot-operate">
					<ymt-button class="btn-opactiy" @click="handleChoosePhoto">拍照</ymt-button>
				</div>
				<div class="flot-operate">
					<ymt-button class="btn-opactiy" @click="handleChoosePicture">从相册选择</ymt-button>
				</div>
			</div>
		</ymt-shade>
	</div>
</template>
<script>
    import api from '../../server/info'
    import 'fileapi' 
    import EXIF from 'exif-js'

	export default {
		data() {
			return {
				isViewAndReset:false,
				isCanSubmit:false,
				isUploadSuccess:false,
				isShowShade:false,
				isCamera:false,
				file:null,
				channelMarketID:"",
				imgInfo:{},
				imgUrl:null,
				showLoading:false,
				uploadStatus:"",
			}
		},
		beforeCreate() { 
			document.title = '提交行驶证照片'; 
		},
		created() {   
			this.channelMarketID=$ParmsHelper.loadPageParms("channelMarketID"); 
		},
		methods:{
			handleResetClick () {
				// 重新上传
				this.isViewAndReset = false;
				this.isShowShade = true;
			},
			handleCloseViewImage() {
				// 关闭查看图片
				this.isViewAndReset = false;
			},
			handleViewImage() {
				// 查看图片
				this.isViewAndReset = true;
			},
			handleShowShade() {
				this.isShowShade = true;
			},
			handleCloseShade() {
				this.isShowShade = false;
			},
			handleFileChange(file) {
				let _this = this;
				this.isShowShade = false;
				this.isCanSubmit = true;
				let result = document.getElementById('result_img');

				try	{  
					// 方法一，无法转换方向
					var input = this.isCamera ? this.$refs.image_uploads_camera : this.$refs.image_uploads_image;  
					this.file = input.files[0];

					var reader = new FileReader();
	     			reader.readAsDataURL(_this.file);
	     			reader.onload = function(e) { 
	     				_this.imgUrl = this.result;   
     					// 手机调测
						setTimeout(function(){
		 					let img = document.getElementById('result_img'); 
		 					EXIF.getData(img, function() {
		     					let orient = EXIF.getTag(this, 'Orientation');
		     					let make = EXIF.getTag(this, 'Make'); 
		     					let exifIFDPointer = EXIF.getTag(this, 'ExifIFDPointer');  
  
								let canvas = document.getElementById("canvas");  
								let w = Number(img.offsetWidth);
								let h = Number(img.offsetHeight);

					 			var mpImg = new $MegaPixImage(img);
		     					mpImg.render(canvas, { maxWidth: w, maxHeight: h, quality: 0.6,orientation:orient }); 

		     					let canvasUrl = canvas.toDataURL('image/jpeg');
		     					// _this.imgUrl = canvasUrl;

	     		 				canvas.toBlob(function(b){ 
									_this.file = b; 
								},"image/jpeg");  
		     				}); 
		 				},150)  
					} 

				} catch(ex) { 
					console.log('error',ex)
				}

				
			},
			handleClose() {
				console.log('handleClose')
				this.isShowShade = false;
			},
			handleChoosePhoto() {
				console.log('handleChoosePhoto'); 
				this.isCamera = true;
				this.$refs.image_uploads_camera.click(); 
			},
			handleChoosePicture() {
				console.log('handleChoosePicture'); 
				this.isCamera = false;
				this.$refs.image_uploads_image.click();
			},
			handleSubmit() { 
				if(!this.file || !this.isCanSubmit) return;
				console.log(this.file)
				this.showLoading=true;
				this.isCanSubmit = false;
				let _this=this;								
				let form = new FormData();
				form.append("file",this.file,"temp.jpeg"); 
	            form.append("channelMarketID",this.channelMarketID); // 可以增加表单数据
	             
	            api.uploadPic(form).then(data => {
                    if(data.errorCode==0){
                    	_this.uploadStatus='success';
                    	_this.isUploadSuccess = true;
                    	setTimeout(()=>{
                            _this.showLoading=false;
                            _this.file="";
                            _this.uploadStatus="";
                    	},1000)                 	
                    } else {
                    	_this.uploadStatus='error';
                    }
            	})			  
			},
			handleResetUpload() {
				let _this = this;
				_this.uploadStatus="";
				_this.isCanSubmit = true;
				_this.handleSubmit();
				event.stopPropagation();

			}
		}
	}
</script>
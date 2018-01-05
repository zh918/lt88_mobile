<template>
	<div class="collect-container">
    	<div class="bai_map" style="display: none;"></div>
		<div class="banner"><img src="../../assets/images/banner@2x.png"></div>

		<div class="collect-form">
			<div class="title">填写信息</div>
			<div class="item">
				<div class="left">车牌号</div>
				<div class="right">
					<div class="licence-area" @click="handleChangeArea">
						<span>{{area}}</span>
						<span><i class="icon iconfont icon-xiala-copy"></i></span> 
					</div>

					<input type="text" maxlength="6" placeholder="请输入车牌号码" v-model="licenceNumber"> 
				</div>
			</div>
			<div class="item">
				<div class="left">手机号</div>
				<div class="right">
					<input type="number" maxlength="11" placeholder="请输入您的手机号" v-model="mobile">
					<div class="remove-code" @click="handleRemoveMobile" v-if="mobile"><i class="icon iconfont icon-guanbi"></i></div>
				</div>
			</div>
			<div class="item border-none">
				<div class="left">验证码</div>
				<div class="right">
					<input type="number" placeholder="请输入验证码" maxlength="6" v-model="validateCode">
					<div class="send-code disabled" v-if="!mobile">获取验证码</div>
					<div class="send-code" @click="handleSendCode" v-else-if="!sendCodeIntervalId && mobile">获取验证码</div>
					<div class="send-code actived" v-else>{{seconed + 'S'}}</div>
				</div>
			</div>
		</div>

		<div class="operate">
			<ymt-button class="btn-blue" :class="flag || !(licenceNumber && mobile && validateCode) ? 'disabled':''" :disable="flag || !(licenceNumber && mobile && validateCode) "  @click="handleSubmit">我要报价</ymt-button>
		</div>

		<ymt-city-area v-if="areaDatas.isShow"
					:initData="areaDatas" 
					@change="handleCityAreaChange"
					@closeShade="handleCityAreaCloseShade"></ymt-city-area>
		 

	</div>
</template>
<script>
    import api from '../../server/info'
    import * as reg from '@/common/reg'

	export default {
		data() {
			return {
				flag:false,
				isShowPlaceholder:true,
				area:'粤',
				// code:'B',
				licenceNumber:'',// 带首字母

				fullLicence:null,
				mobile:null,
				validateCode:null, 
				seconed:60,
				sendCodeIntervalId:null,

				// 经纬度
				latitude:null,
				longitude:null,

				areaDatas:{
					isShow:false,
					data:[
						{key: "皖",	value: 1,	code: "B"},
						{key: "京",	value: 100,	code: "A"},
						{key: "渝",	value: 100,	code: "A"},
						{key: "闽",	value: 100,	code: "A"},
						{key: "粤",	value: 100,	code: "A",	isDefault: true},
						{key: "贵",	value: 100,	code: "A"},
						{key: "甘",	value: 100,	code: "A"},
						{key: "琼",	value: 100,	code: "A"},
						{key: "豫",	value: 100,	code: "A"},
						{key: "鄂",	value: 100,	code: "B"},
						{key: "湘",	value: 100,	code: "B"},
						{key: "冀",	value: 100,	code: "B"},
						{key: "黑",	value: 100,	code: "B"},
						{key: "苏",	value: 100,	code: "B"},
						{key: "赣",	value: 100,	code: "B"},
						{key: "吉",	value: 100,	code: "B"},
						{key: "辽",	value: 100,	code: "B"},
						{key: "蒙",	value: 100,	code: "C"},
						{key: "宁",	value: 100,	code: "C"},
						{key: "青",	value: 100,	code: "C"},
						{key: "陕",	value: 100,	code: "C"},
						{key: "川",	value: 100,	code: "C"},
						{key: "沪",	value: 100,	code: "C"},
						{key: "晋",	value: 100,	code: "C"},
						{key: "鲁",	value: 100,	code: "C"},
						{key: "新",	value: 100,	code: "D"},
						{key: "藏",	value: 100,	code: "D"},
						{key: "云",	value: 100,	code: "D"},
						{key: "浙",	value: 100,	code: "D"}
					]
				}
			}
		},
		beforeCreate() {
			document.title = '车险报价'; 
		}, 
		created(){   
			let _this = this;

			try {
				// 百度地图API功能
				var map = new BMap.Map("bai_map");  
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r){
					if(this.getStatus() == BMAP_STATUS_SUCCESS){  
						_this.longitude = r.point.lng;
						_this.latitude = r.point.lat;  
					}         
				},{enableHighAccuracy: true})
			} catch(ex) { 
			}  
		},
		methods: {
			handleSubmit() { 

				if (!this.licenceNumber) {
					globalVue.$message({msg: '请输入车牌号', duration: 1500});
					return;
				}

				if (!this.mobile) {
					globalVue.$message({msg: '请输入手机号', duration: 1500});
					return;
				}

				if (!this.validateCode) {
					globalVue.$message({msg: '请输入验证码', duration: 1500});
					return;
				}

				if (!reg.checkcarLicense(this.licenceNumber)) {
					this.$message({msg:'请输入正确的车牌号',duration:1000});
					return false;
				}

				if (!reg.checkMobile(this.mobile)) {
					this.$message({msg:'请输入正确的手机号',duration:1000});
					return false;
				}
 

				let parms = {
					DS:$ParmsHelper.loadPageParms("DS"), 
					BS:$ParmsHelper.loadPageParms("BS"),// || '02',
					BSN:$ParmsHelper.loadPageParms("BSN"),
					BSD:$ParmsHelper.loadPageParms("BSD"),
					BSDN:$ParmsHelper.loadPageParms("BSDN"),
					carLicenseNO:this.area + this.licenceNumber,
					phone:this.mobile,
					validCode:this.validateCode,
					insuranceCode:'CPIC', // CPIC 中国太平洋财产保险股份有限公司
					gps:{lon:this.longitude,lat:this.latitude}
				}; 

				this.flag = true;

				api.applyQuote(parms).then(result => { 
					this.flag = false;
					if (result.errorCode == "0") {
						this.$router.push({path:'/success'})
					}
					else {
						globalVue.$message({msg: $MessageHelper.toMsg(result), duration: 1500});
					}
				});
 
				
			},
			hidePlaceHolder() {
				console.log('hidePlaceHolder'); 
			},
			handleRemoveMobile() {
				console.log('handleRemoveMobile');
				this.mobile = null;
			},
			handleSendCode(e) {
				console.log('handleSendCode');
				if (!reg.checkMobile(this.mobile)) {
					return this.$message({msg:'请输入正确的手机号',duration:1000});
				}
				let _this = this; 
				
				if (!this.mobile) {
					globalVue.$message({msg: '请输入手机号',duration: 1500});
					return;
				}
				
				api.getValidCode({phone:this.mobile}).then(result => { 
					 
					if (result.errorCode != "0") {
						globalVue.$message({
			                msg: $MessageHelper.toMsg(result),  
			                duration: 1500
			            });
					}
				});

				if (_this.sendCodeIntervalId == null) {
					_this.sendCodeIntervalId = setInterval(function(){
						// console.log(_this.seconed);
						_this.seconed--;
						if (_this.seconed == 0) {
							window.clearInterval(_this.sendCodeIntervalId);
							_this.sendCodeIntervalId = null;
							_this.seconed = 60;
						}
					},1000);
				}
			},
			handleLicenceNumberKeyup(e) {
				// console.log('handleLicenceNumberKeyDown')
				let target = e.target || e.srcElement; 
				let temp = target.value;
				this.licenceNumber = temp; 

				let reg = /[a-zA-Z0-9]/;  				 
				let tempArray = Array.from(temp);
			 	// debugger
				if (tempArray.length > 0) {
					tempArray.forEach((c)=>{ 
						if (!reg.test(c)) this.licenceNumber = this.licenceNumber.replace(c,'');
					});
				}
				this.licenceNumber = this.licenceNumber.toUpperCase(); 

				// if (this.carInfo.carLicenseNumber.length > 7) this.carInfo.carLicenseNumber = this.carInfo.carLicenseNumber.substring(0,7);
			},

			handleChangeArea() { 
				this.areaDatas.isShow = true;
			},
			handleCityAreaChange(item) { 
				this.area = item.key;
				this.areaDatas.data.find(d=>d.isDefault).isDefault = false;
				this.areaDatas.data.find(d=>d.key == item.key).isDefault = true;
				setTimeout(()=>{
					this.areaDatas.isShow = false;
				},300)

			},
			handleCityAreaCloseShade() {
				this.areaDatas.isShow = false;
			}
		},
		watch:{
			licenceNumber:function(curVal){
				this.licenceNumber = this.licenceNumber.toUpperCase();
			}
		} 
	}
</script>
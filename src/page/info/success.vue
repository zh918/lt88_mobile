<template>
	<div class="collect-success">
		<div class="banner">
			<i class="icon iconfont icon-chenggong"></i>
		</div>
		<div class="p">您的报价信息已经提交成功，</div>
		<div class="p">报价成功后，将会以短信的方式发送到您的手机！</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		beforeCreate() {
			document.title = '报价成功'; 
		}
	}
</script>
<template>
	<div class="app-body tf-bg" :style="{ 'min-height': windowHeight+'px'}">
		<div class="order-bar bar-white"><van-nav-bar title="填写换货物流" :border="false" fixed left-text="" left-arrow></van-nav-bar></div>
		<div class="bar-empty"></div>
		<div class="order-session">
			<div class="cont-session goods-session">
				<!-- <div class="order-goods-info">
					<div class="order-pic-block">
						<img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg"/>
					</div>
					<div class="order-info">
						<div class="order-name-price">
							<div class="order-name"><div class="color-222 font-28 order-name-text">yeah jewelry U形项链yeah jewelry U形项链ry U形项链yeah jewelry U形</div></div>
						</div>
						<div class="order-sku-num">
							<div class="order-sku"><div class="color-8f8f94 font-24 order-sku-text">规格：银色</div></div>
						</div>
						<div class="order-action-session">
							<div class="order-action-text">
								<div class="color-eb5841 font-24">换货规格：粉色</div>
							</div>
						</div>
					</div>
				</div> -->
				<div class="order-goods-info">
					<div class="order-pic-block">
						<img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg"></img>
					</div>
					<div class="order-info">
						<div class="order-name-price">
							<div class="order-name order-name-text p-nowrap">yeah jewelry U形项链</div>
						</div>
						<div class="order-sku-num">
							<div class="order-sku order-sku-text p-nowrap">规格：银色</div>
						</div>
						<div class="order-action-session">
							<div class="order-action-text">换货中</div>
						</div>
					</div>
				</div>
				<div class="order-goods-info">
					<div class="order-pic-block">
						<img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg"></img>
					</div>
					<div class="order-info">
						<div class="order-name-price">
							<div class="order-name order-name-text p-nowrap">yeah jewelry U形项链</div>
						</div>
						<div class="order-sku-num">
							<div class="order-sku order-sku-text p-nowrap">规格：银色</div>
						</div>
						<div class="order-action-session">
							<div class="order-action-text">换货中</div>
						</div>
					</div>
				</div>
			</div>
			<div class="cont-session common-list">
				<div class="common-item common-item-first">
					<div class="common-item-left">
						<div class="color-222 font-28 width-146">物流公司</div>
						<div class="color-222 font-28">顺丰速运</div>
					</div>
					<div class="common-item-right">
						<div class="color-8f8f94 font-28">请选择</div>
						<van-icon class="van-icon" name="arrow" size="0.32rem" color="#aaa" />
						<!-- <img class="common-item-arrow" src="https://bht.liwushijian.com/library/barter/2020-07/21/3_15952989190.jpg" mode=""/> -->
					</div>
				</div>
				<div class="common-item">
					<div class="common-item-left">
						<div class="color-222 font-28 width-146">物流单号</div>
						<div class="color-222 font-28">SF123456789012</div>
					</div>
					<div class="common-item-right">
						<div class="common-item-code">
							<van-icon class="van-icon" name="scan" size="0.52rem" color="#383838" />
						</div>
					</div>
				</div>
			</div>
			<div class="cont-session common-list common-list-pic">
				<div class="common-item common-item-first">
					<div class="common-item-left">
						<div class="color-222 font-28">上传凭证</div>
						<div class="color-8f8f94 font-28">(最多5张)</div>
					</div>
				</div>
				<div class="common-item pic-list">
					<div class="pic-item">
						<img class="pic-url" src="https://bht.liwushijian.com/library/barter/2020-07/21/3_15952989190.jpg" mode="aspectFill"/>
						<div class="pic-del">
							<div class="del-bg">
								<div class="del-line"></div>
							</div>
						</div>
					</div>
					<div class="pic-item">
						<img class="pic-url" src="https://bht.liwushijian.com/library/barter/2020-07/21/3_15952989190.jpg" mode="aspectFill"/>
						<div class="pic-del">
							<div class="del-bg">
								<div class="del-line"></div>
							</div>
						</div>
					</div>
					<div class="pic-item">
						<img class="pic-url" src="https://bht.liwushijian.com/library/barter/2020-07/21/3_15952989190.jpg" mode="aspectFill"/>
						<div class="pic-del">
							<div class="del-bg">
								<div class="del-line"></div>
							</div>
						</div>
					</div>
					<div class="pic-item">
						<img class="pic-url" src="https://bht.liwushijian.com/library/barter/2020-07/21/3_15952989190.jpg" mode="aspectFill"/>
						<div class="pic-del">
							<div class="del-bg">
								<div class="del-line"></div>
							</div>
						</div>
					</div>
					<div class="pic-item">
						<div class="upload-pic">
							<!-- <van-icon class="van-icon" name="plus" size="0.52rem" color="#aaa" /> -->
							<van-uploader :after-read="onRead">
							  <van-icon class="van-icon" name="plus" size="0.52rem" color="#aaa" />
							</van-uploader>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="fixed-submit-empty"></div>
		<div class="submit-fixed-buttom">
			<div class="submit-btn">
				<div class="color-fff font-30">提交</div>
			</div>
		</div>
	</div>
</template>

<script>
// import '@/styles/life.css'
// import '@/styles/order.css'
export default {
  data () {
    return {
      windowHeight: document.documentElement.clientHeight
    }
  },
  methods: {

  }
}
</script>

<style scoped>
@import '../../../styles/life.css';
@import '../../../styles/order.css';
.goods-session {
	margin-top: 0.3rem;
	padding: 0.4rem 0.3rem 0.1rem;
}
.order-name-text,.order-sku-text {
	max-width: 5rem;
}
.common-item-code {
	width: 0.8rem;
	height: 0.8rem;
	display: flex;
	justify-content: flex-end;
	align-items:center;
}
.code-pic {
	width: 0.44rem;
	height: 0.44rem;
}

.common-list-pic {
	padding-right: 0;
}
.pic-list {
	height: 1.94rem;
	display: flex;
	justify-content: flex-start;
}
.pic-item {
	width: 1.34rem;
	height: 1.34rem;
	position: relative;
}
.pic-url,.upload-pic {
	width: 1.14rem;
	height: 1.14rem;
	position: absolute;
	z-index: 2;
	left: 0;
	bottom: 0;
}
.pic-del {
	position: absolute;
	top: 0;
	right: 0;
	width: 0.54rem;
	height: 0.54rem;
	justify-content: center;
	align-items: center;
	z-index: 5;
}
.del-bg {
	width: 0.34rem;
	height: 0.34rem;
	border-radius: 0.17rem;
	background-color: #eb5841;
	z-index: 5;
	position: relative;
}
.del-line {
	width: 0.2rem;
	height: 0.02rem;
	border-radius: 0.01rem;
	position: absolute;
	top: 0.16rem;
	left: 0.07rem;
	background-color: #fff;
}
.upload-pic {
	background-color: #f2f2f4;
	display: flex;
	align-items: center;
	justify-content: center;
}
.upload-add {
	color: #aaa;
	font-size: 0.6rem;
}
</style>

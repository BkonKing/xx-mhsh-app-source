<template>
	<div class="app-body tf-bg" :style="{ 'min-height': windowHeight+'px'}">
		<div class="order-bar bar-white"><van-nav-bar title="填写换货物流" :border="false" fixed @click-left="$router.go(-1)" left-arrow></van-nav-bar></div>
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
						<!-- <van-icon class="van-icon" name="arrow" size="32px" color="#aaa" /> -->
						<img class="common-item-arrow" src="@/assets/img/right.png" mode=""/>
					</div>
				</div>
				<div class="common-item">
					<div class="common-item-left">
						<div class="color-222 font-28 width-146">物流单号</div>
						<div class="color-222 font-28">SF123456789012</div>
					</div>
					<div class="common-item-right">
						<div class="common-item-code" @click="scanFunc">
							<van-icon class="van-icon" name="scan" size="26px" color="#383838" />
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
							<!-- <van-icon class="van-icon" name="plus" size="0.52px" color="#aaa" /> -->
							<van-uploader :after-read="onRead">
							  <van-icon class="van-icon" name="plus" size="26px" color="#aaa" />
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
import { NavBar,Icon } from 'vant'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight
    }
  },
  methods: {
  	scanFunc(){
  		var FNScanner = api.require('FNScanner');
        FNScanner.open({
            autorotation: true
        }, function(ret, err) {
            if (ret) {
                alert(JSON.stringify(ret));
            } else {
                alert(JSON.stringify(err));
            }
        });
  	}
  }
}
</script>

<style scoped  src="../../../styles/life.css"></style>
<style scoped  src="../../../styles/order.css"></style>
<style scoped>
.goods-session {
	margin-top: 30px;
	padding: 40px 30px 10px;
}
.order-name-text,.order-sku-text {
	max-width: 500px;
}
.common-item-code {
	width: 80px;
	height: 80px;
	display: flex;
	justify-content: flex-end;
	align-items:center;
}
.code-pic {
	width: 44px;
	height: 44px;
}

.common-list-pic {
	padding-right: 0;
}
.pic-list {
	height: 194px;
	display: flex;
	justify-content: flex-start;
}
.pic-item {
	width: 134px;
	height: 134px;
	position: relative;
}
.pic-url,.upload-pic {
	width: 114px;
	height: 114px;
	position: absolute;
	z-index: 2;
	left: 0;
	bottom: 0;
}
.pic-del {
	position: absolute;
	top: 0;
	right: 0;
	width: 54px;
	height: 54px;
	justify-content: center;
	align-items: center;
	z-index: 5;
}
.del-bg {
	width: 34px;
	height: 34px;
	border-radius: 17px;
	background-color: #eb5841;
	z-index: 5;
	position: relative;
}
.del-line {
	width: 20px;
	height: 2px;
	border-radius: 1px;
	position: absolute;
	top: 16px;
	left: 7px;
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
	font-size: 60px;
}
</style>

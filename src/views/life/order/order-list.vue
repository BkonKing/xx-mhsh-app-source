<template>
	<view class="app-body tf-bg">
		<!-- <uni-segmented-control style="background-color: #fff;" :current="current" :values="items" @clickItem="onClickItem"
		 style-type="text" active-color="#222222"></uni-segmented-control> -->
		<view class="nav-empty"></view>
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in items" :key="index" :data-currentindex="index" @click="onClickItem">
				<text :class="[index==current?'nav-cur':'nav-text']">{{item}}</text>
				<view v-if="index==current" class="nav-line"></view>
			</view>
		</view>

		<view class="order-list">
			<view class="order-item">
				<view class="order-header">
					<view class="order-no"><text class="font-28 color-8f8f94">订单号：20181106121211061223</text></view>
					<view class="order-status"><text class="font-28 color-eb5841 text-right">配货中</text></view>
				</view>
				<view class="order-goods-info">
					<view class="order-pic-block">
						<image class="order-pic" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg"></image>
					</view>
					<view class="order-info">
						<view class="order-name-price">
							<view class="order-name p-nowrap"><text class="color-222 font-28 order-name-text">yeah jewelry U形项链</text></view>
							<view class="order-price"><text class="color-222 font-28">￥20000.00</text></view>
						</view>
						<view class="order-sku-num">
							<view class="order-sku p-nowrap"><text class="color-8f8f94 font-24 order-sku-text">规格：银色</text></view>
							<view class="order-num"><text class="color-8f8f94 font-24">￥21000.00</text></view>
						</view>
						<view class="order-action-session">
							<view class="order-action-text"><text class="color-8f8f94 font-24">不支持退货</text>
								<view class="order-action-btn">
									<image class="order-action-pic" src="http://192.168.1.158/library/img/xcx_img/activity/question_01.png" mode=""></image>
								</view>
							</view>
							<view class="order-buy-num"><text class="color-8f8f94 font-24">x1</text></view>
						</view>
					</view>
				</view>
				<view class="order-goods-info">
					<view class="order-pic-block">
						<image class="order-pic" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg"></image>
					</view>
					<view class="order-info">
						<view class="order-name-price">
							<view class="order-name p-nowrap"><text class="color-222 font-28 order-name-text">yeah jewelry U形项链yeah jewelry U形项链</text></view>
							<view class="order-price"><text class="color-222 font-28">￥20000.00</text></view>
						</view>
						<view class="order-sku-num">
							<view class="order-sku p-nowrap"><text class="color-8f8f94 font-24 order-sku-text">规格：银色</text></view>
							<view class="order-num"><text class="color-8f8f94 font-24">￥21000.00</text></view>
						</view>
						<view class="order-action-session">
							<view class="order-action-text"></view>
							<view class="order-buy-num"><text class="color-8f8f94 font-24">x1</text></view>
						</view>
					</view>
				</view>
				<!-- <view v-show="false" class="toggle-btn">111
					<image src="" mode=""></image>
				</view> -->
				<view class="order-footer">
					<view class="order-total">
						<text class="color-8f8f94 font-24">共 1 件</text>
						<view class="order-price-total">
							<text class="color-8f8f94 font-24">合计:</text><text class="color-222 font-34 font-weight">￥200.00</text>
						</view>
					</view>
					<view class="order-btn-box">
						<navigator class="order-border-btn" hover-class="none"><text class="color-8f8f94 font-28">物流详情</text></navigator>
						<view class="order-border-btn paid-btn"><text class="color-fff font-26">付款(59:59:30)</text></view>
					</view>
				</view>
			</view>
			<view class="order-item">
				<view class="order-header">
					<view class="order-no"><text class="font-28 color-8f8f94">订单号：20181106121211061223</text></view>
					<view class="order-status"><text class="font-28 color-eb5841 text-right">配货中</text></view>
				</view>
				<view class="order-goods-info">
					<view class="order-pic-block">
						<image class="order-pic" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg"></image>
					</view>
					<view class="order-info">
						<view class="order-name-price">
							<view class="order-name p-nowrap"><text class="color-222 font-28 order-name-text">yeah jewelry U形项链</text></view>
							<view class="order-price"><text class="color-222 font-28">￥20000.00</text></view>
						</view>
						<view class="order-sku-num">
							<view class="order-sku p-nowrap"><text class="color-8f8f94 font-24 order-sku-text">规格：银色</text></view>
							<view class="order-num"><text class="color-8f8f94 font-24">￥21000.00</text></view>
						</view>
						<view class="order-action-session">
							<view class="order-action-text"></view>
							<view class="order-buy-num"><text class="color-8f8f94 font-24">x1</text></view>
						</view>
					</view>
				</view>
				<view class="order-footer">
					<view class="order-total">
						<text class="color-8f8f94 font-24">共 1 件</text>
						<view class="order-price-total">
							<text class="color-8f8f94 font-24">合计:</text><text class="color-222 font-34 font-weight">￥200.00</text>
						</view>
					</view>
					<view class="order-btn-box">
						<navigator class="order-border-btn" hover-class="none"><text class="color-8f8f94 font-28">物流详情</text></navigator>
						<navigator class="order-border-btn" hover-class="none"><text class="color-8f8f94 font-28">申请换货</text></navigator>
					</view>
				</view>
			</view>
			<view class="order-item">
				<view class="order-header">
					<view class="order-no"><text class="font-28 color-8f8f94">订单号：20181106121211061223</text></view>
					<view class="order-status"><text class="font-28 color-eb5841 text-right">配货中</text></view>
				</view>
				<view class="order-goods-info">
					<view class="order-pic-block">
						<image class="order-pic" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg"></image>
					</view>
					<view class="order-info">
						<view class="order-name-price">
							<view class="order-name p-nowrap"><text class="color-222 font-28 order-name-text">yeah jewelry U形项链</text></view>
							<view class="order-price"><text class="color-222 font-28">￥20000.00</text></view>
						</view>
						<view class="order-sku-num">
							<view class="order-sku p-nowrap"><text class="color-8f8f94 font-24 order-sku-text">规格：银色</text></view>
							<view class="order-num"><text class="color-8f8f94 font-24">￥21000.00</text></view>
						</view>
						<view class="order-action-session">
							<view class="order-action-text"><text class="color-8f8f94 font-24">不支持退货</text>
								<view class="order-action-btn">
									<image class="order-action-pic" src="http://192.168.1.158/library/img/xcx_img/activity/question_01.png" mode=""></image>
								</view>
							</view>
							<view class="order-buy-num"><text class="color-8f8f94 font-24">x1</text></view>
						</view>
					</view>
				</view>
				<view class="order-goods-info">
					<view class="order-pic-block">
						<image class="order-pic" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg"></image>
					</view>
					<view class="order-info">
						<view class="order-name-price">
							<view class="order-name p-nowrap"><text class="color-222 font-28 order-name-text">yeah jewelry U形项链</text></view>
							<view class="order-price"><text class="color-222 font-28">￥20000.00</text></view>
						</view>
						<view class="order-sku-num">
							<view class="order-sku p-nowrap"><text class="color-8f8f94 font-24 order-sku-text">规格：银色</text></view>
							<view class="order-num"><text class="color-8f8f94 font-24">￥21000.00</text></view>
						</view>
						<view class="order-action-session">
							<view class="order-action-text"></view>
							<view class="order-buy-num"><text class="color-8f8f94 font-24">x1</text></view>
						</view>
					</view>
				</view>
				<view class="order-footer">
					<view class="order-total">
						<text class="color-8f8f94 font-24">共 1 件</text>
						<view class="order-price-total">
							<text class="color-8f8f94 font-24">合计:</text><text class="color-222 font-34 font-weight">￥200.00</text>
						</view>
					</view>
					<view class="order-btn-box">
						<navigator class="order-border-btn" hover-class="none"><text class="color-8f8f94 font-28">物流详情</text></navigator>
						<view class="order-border-btn paid-btn"><text class="color-fff font-26">付款(59:59:30)</text></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: ['全部', '待付款', '待发货', '待收货', '退换'],
				current: 0,
			};
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentTarget.dataset.currentindex) {
					this.current = e.currentTarget.dataset.currentindex;
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../styles/life.less';
	@import '../../../styles/order.less';
	// %fx-row {
	// 	flex-direction: row;
	// }
	// %fx-space-between {
	// 	@extend %fx-row;
	// 	justify-content: space-between;
	// }
	// %fx-flex-end {
	// 	@extend %fx-row;
	// 	justify-content: flex-end;
	// }
	// @mixin border-radius($radius) {
	//           border-radius: $radius;
	//       -ms-border-radius: $radius;
	//      -moz-border-radius: $radius;
	//   -webkit-border-radius: $radius;
	// }
	// %border-top {
	// 	border-top-width: 1px;
	// 	border-top-style: solid;
	// 	border-top-color: @divider-color;
	// }
	// %border-bottom {
	// 	border-bottom-width: 1px;
	// 	border-bottom-style: solid;
	// 	border-bottom-color: @divider-color;
	// }
	// %border-all {
	// 	border-top-width: 1px;
	// 	border-top-style: solid;
	// 	border-top-color: @gray-6;
	// 	border-left-width: 1px;
	// 	border-left-style: solid;
	// 	border-left-color: @gray-6;
	// 	border-right-width: 1px;
	// 	border-right-style: solid;
	// 	border-right-color: @gray-6;
	// 	border-bottom-width: 1px;
	// 	border-bottom-style: solid;
	// 	border-bottom-color: @gray-6;
	// }
	// .font-24 {
	// 	font-size: 24px;
	// }
	// .font-26 {
	// 	font-size: 26px;
	// }
	// .font-28 {
	// 	font-size: 28px;
	// }
	// .font-34 {
	// 	font-size: 34px;
	// }
	// .font-weight {
	// 	font-weight: bold;
	// }
	// .color-8f8f94 {
	// 	color: @gray-7;
	// }
	// .color-fff {
	// 	color: @text-color-inverse;
	// }
	// .color-222 {
	// 	color: @text-color;
	// }
	// .color-eb5841 {
	// 	color: @red-dark;
	// }
	// .text-right {
	// 	text-align: right;
	// }
  .nav-empty {
		height: 98px;
	}
	.nav-list {
		height: 98px;
		@extend %fx-row;
		background-color: @text-color-inverse;
		position: fixed;
		/* #ifndef H5 */
		top: 88px;
		/* #endif */
		/* #ifdef APP-PLUS */
		top: 0;
		/* #endif */
		left: 0;
		right: 0;
		z-index: 5;
		align-items: center;
	}
	.nav-item {
		width: 150px;
		text-align: center;
		position: relative;
		align-items: center;
	}
	.nav-text,.nav-cur {
		font-size: 30px;
		height: 98px;
		line-height: 98px;
		text-align: center;
		color: @gray-7;
	}
	.nav-cur {
		font-size: 34px;
		font-weight: bold;
		color: @text-color !important;
	}
	.nav-line {
		position: absolute;
		bottom: 0;
		left: 42px;
		width: 66px;
		height: 2px;
		background-color: @red-dark;
	}
	/* 列表 */
	// .order-list {
	//   padding: 0 20px 30px;
	// }
	// .order-item {
	//   width: 710px;
	//   min-height: 370px;
	//   @include border-radius(10px);
	//   overflow: hidden;
	//   margin-top: 30px;
	//   padding: 0 30px;
	// 	background-color: @text-color-inverse;
	// }
	// .order-header {
	//   height: 90px;
	// 	color: @gray-7;
	// 	@extend %fx-row;
	//   align-items: center;
	//   @extend %border-bottom;
	// 	margin-bottom: @padding-lg;
	// }
	// .order-no {
	//   width: 480px;
	// }
	// .order-status {
	//   text-align: right;
	// 	width: 170px;
	// }
	// .order-goods-info {
	//   margin-bottom: @padding-lg;
	//   height: 130px;
	// 	@extend %fx-space-between;
	// }
	// .order-pic-block {
	//   width: 130px;
	//   height: 130px;
	// 	@extend %fx-row;
	// 	overflow: hidden;
	// }
	// .order-pic {
	// 	width: 130px;
	// 	height: 130px;
	// }
	// .order-info {
	//   width: 500px;
	// 	flex-wrap: wrap;
	// }
	// .order-name-price {
	// 	width: 100%;
	//   height: 46px;
	//   color: @text-color;
	// 	@extend %fx-space-between;
	// 	align-items: center;
	// }
	// .order-sku-num {
	//   height: 44px;
	//   color: @gray-7;
	// 	font-size: 24px;
	// 	@extend %fx-space-between;
	// 	align-items: center;
	// }
	// .order-action-session {
	// 	@extend %fx-space-between;
	// 	height: 40px;
	// 	line-height: 30px;
	// 	padding-top: 10px;
	// 	font-size: 24px;
	// 	color: @gray-7;
	// }
	// .order-buy-num {
	// 	text-align: right;
	// }
	// .order-action-text {
	// 	@extend %fx-row;
	// }
	// .order-action-btn {
	// 	width: 50px;
	// 	height: 50px;
	// 	padding: 10px;
	// 	margin-top: -10px;
	// }
	// .order-action-pic {
	// 	width: 30px;
	// 	height: 30px;
	// }
	// .order-name,.order-sku {
	//   max-width: 340px;
	// }
	// .order-footer {
	// 	min-height: 92px;
	//   @extend %border-top;
	// }
	// .order-total {
	// 	height: 80px;
	// 	text-align: right;
	// 	padding-top: 15px;
	// 	@extend %fx-flex-end;
	// 	align-items: center;
	// 	color: @gray-7;
	// }
	// .order-price-total {
	// 	@extend %fx-row;
	// 	margin-left: 18px;
	// 	align-items: center;
	// }
	// .order-btn-box {
	// 	padding-bottom: 30px;
	// 	@extend %fx-flex-end;
	// }
	// .order-border-btn {
	//   height: 66px;
	//   min-width: 158px;
	//   @include border-radius(6px);
	//   @extend %border-all;
	//   padding: 0 @padding-md;
	// 	@extend %fx-row;
	//   align-items: center;
	// 	display: flex;
	// }
	// .order-border-btn {
	//   margin-left: @padding-md;
	// }
	// .paid-btn {
	//   border-width: 0;
	//   background-color: @red-dark;
	// }
	
	// .toggle-btn {
	// 	height: 66px;
	// 	margin-top: -30px;
	// }
</style>

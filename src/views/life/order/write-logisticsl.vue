<template>
	<view class="app-body tf-bg">
		<!-- <placeholderNavBar></placeholderNavBar> -->
		<scroll-view scroll-y="true" class="scroll-body">
			<view class="order-session">
				<view class="cont-session goods-session">
					<view class="order-goods-info">
						<view class="order-pic-block">
							<image class="order-pic" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg"></image>
						</view>
						<view class="order-info">
							<view class="order-name-price">
								<view class="order-name"><text class="color-222 font-28 order-name-text">yeah jewelry U形项链yeah jewelry U形项链ry U形项链yeah jewelry U形</text></view>
							</view>
							<view class="order-sku-num">
								<view class="order-sku"><text class="color-8f8f94 font-24 order-sku-text">规格：银色</text></view>
							</view>
							<view class="order-action-session">
								<view class="order-action-text">
									<text class="color-eb5841 font-24">换货规格：粉色</text>
								</view>
							</view>
						</view>
					</view>
					<view class="order-goods-info">
						<view class="order-pic-block">
							<image class="order-pic" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg"></image>
						</view>
						<view class="order-info">
							<view class="order-name-price">
								<view class="order-name"><text class="color-222 font-28 order-name-text">yeah jewelry U形项链yeah jewelry U形项链</text></view>
							</view>
							<view class="order-sku-num">
								<view class="order-sku"><text class="color-8f8f94 font-24 order-sku-text">规格：银色</text></view>
							</view>
							<view class="order-action-session">
								<view class="order-action-text">
									<text class="color-eb5841 font-24">换货规格：粉色</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="cont-session common-list">
					<view class="common-item common-item-first">
						<view class="common-item-left">
							<text class="color-222 font-28 width-146">物流公司</text>
							<text class="color-222 font-28">顺丰速运</text>
						</view>
						<view class="common-item-right">
							<text class="color-8f8f94 font-28">请选择</text>
							<image class="common-item-arrow" src="../../../static/app-icon.png" mode=""></image>
						</view>
					</view>
					<view class="common-item">
						<view class="common-item-left">
							<text class="color-222 font-28 width-146">物流单号</text>
							<text class="color-222 font-28">SF123456789012</text>
						</view>
						<view class="common-item-right">
							<view class="common-item-code">
								<image class="code-pic" src="../../../static/app-icon.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
				<view class="cont-session common-list common-list-pic">
					<view class="common-item common-item-first">
						<view class="common-item-left">
							<text class="color-222 font-28">上传凭证</text>
							<text class="color-8f8f94 font-28">(最多5张)</text>
						</view>
					</view>
					<view class="common-item pic-list">
						<view class="pic-item">
							<image class="pic-url" src="../../../static/app-icon.png" mode="aspectFill"></image>
							<view class="pic-del">
								<view class="del-bg">
									<text class="del-line"></text>
								</view>
							</view>
						</view>
						<view class="pic-item">
							<image class="pic-url" src="../../../static/app-icon.png" mode="aspectFill"></image>
							<view class="pic-del">
								<view class="del-bg">
									<text class="del-line"></text>
								</view>
							</view>
						</view>
						<view class="pic-item">
							<image class="pic-url" src="../../../static/app-icon.png" mode="aspectFill"></image>
							<view class="pic-del">
								<view class="del-bg">
									<text class="del-line"></text>
								</view>
							</view>
						</view>
						<view class="pic-item">
							<image class="pic-url" src="../../../static/app-icon.png" mode="aspectFill"></image>
							<view class="pic-del">
								<view class="del-bg">
									<text class="del-line"></text>
								</view>
							</view>
						</view>
						<view class="pic-item">
							<view class="upload-pic">
								<text class="upload-add">+</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="fixed-submit-empty"></view>
			<view class="submit-fixed-buttom">
				<view class="submit-btn">
					<text class="color-fff font-30">提交</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../styles/life.less';
	@import '../../../styles/order.less';
	.scroll-body {
		padding-top: 30px;
	}
	.goods-session {
		padding: 20px 15px 10px;
	}
	.order-name-text,.order-sku-text {
		max-width: 500px;
	}
	.common-item-code {
		width: 80px;
		height: 80px;
		justify-content: center;
		align-items: flex-end;
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
		@extend %fx-row;
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
		@include border-radius(17px);
		background-color: @red-dark;
		z-index: 5;
		position: relative;
	}
	.del-line {
		width: 20px;
		height: 2px;
		@include border-radius(1px);
		position: absolute;
		top: 16px;
		left: 7px;
		background-color: @text-color-inverse;
	}
	.upload-pic {
		background-color: @background-color;
		align-items: center;
		justify-content: center;
	}
	.upload-add {
		color: @gray-6;
		font-size: 60px;
	}
</style>

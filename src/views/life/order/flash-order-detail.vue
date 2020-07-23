<template>
	<view class="app-body tf-bg">
		<!-- <placeholderNavBar></placeholderNavBar> -->
		<scroll-view scroll-y="true" class="scroll-body">
			<view class="order-session">
				<view class="order-header-bg"></view>
				<view class="order-status-session">
					<text class="order-status-name">待付款</text>
					<text class="order-status-tip">剩余23:23:23 自动取消订单</text>
				</view>
				<view class="cont-session goods-session">
					<view class="order-goods-info">
						<view class="order-pic-block">
							<image class="order-pic" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg"></image>
						</view>
						<view class="order-info">
							<view class="order-name-price">
								<view class="order-name"><text class="color-222 font-28 order-name-text">yeah jewelry U形项链yeah jewelry U形项链</text></view>
								<view class="order-price"><text class="color-222 font-28">￥20000.00</text></view>
							</view>
							<view class="order-sku-num">
								<view class="order-sku"><text class="color-8f8f94 font-24 order-sku-text">规格：银色</text></view>
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
								<view class="order-name"><text class="color-222 font-28">yeah jewelry U形项链</text></view>
								<view class="order-price"><text class="color-222 font-28">￥20000.00</text></view>
							</view>
							<view class="order-sku-num">
								<view class="order-sku"><text class="color-8f8f94 font-24">规格：银色</text></view>
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
					<view class="detail-price-list">
						<view class="detail-price-item">
							<text class="color-222 font-24">商品总价</text>
							<text class="color-222 font-24">￥600.00</text>
						</view>
						<view class="detail-price-item">
							<text class="color-222 font-24">运费</text>
							<text class="color-222 font-24">￥600.00</text>
						</view>
						<view class="detail-price-item">
							<text class="color-222 font-24">优惠券</text>
							<text class="color-222 font-24">￥600.00</text>
						</view>
						<view class="detail-price-item">
							<text class="color-222 font-24">幸福币抵扣</text>
							<text class="color-222 font-24">￥600.00</text>
						</view>
					</view>
					<view class="order-total order-total-detail">
						<text class="color-8f8f94 font-24">共 1 件</text>
						<view class="order-price-total">
							<text class="color-8f8f94 font-24">合计:</text><text class="color-222 font-34 font-weight">￥200.00</text>
						</view>
					</view>
				</view>
				<view class="cont-session address-logistics">
					<view class="shipping-address">
						<view class="shipping-address-item">
							<text class="shipping-address-item-left color-222 font-28">收货地址:</text>
							<view class="shipping-address-item-right">
								<text class="color-222 font-28 shipping-address-username">安琪拉安琪拉安琪拉安琪拉</text>
								<text class="color-222 font-28">15000112233</text>
							</view>
						</view>
						<view class="shipping-address-item">
							<text class="shipping-address-item-left"></text>
							<view class="shipping-address-item-right">
								<text class="color-8f8f94 font-24 shipping-address-text">福建省福州市仓山区下渡街道三盛滨江国际三盛滨江国</text>
							</view>
						</view>
					</view>
					<view class="shipping-logistics">
						<view class="shipping-address-item">
							<text class="shipping-address-item-left color-222 font-28">物流配送:</text>
							<view class="shipping-address-item-right">
								<text class="color-222 font-28">顺丰速运</text>
								<text class="color-8f8f94 font-28">(SF123456789002)</text>
								<image class="shipping-address-icon" src="../../../static/LoginSuccess.png" mode=""></image>
							</view>
						</view>
						<view class="shipping-logistics-item">
							<text class="shipping-address-item-left"></text>
							<view class="shipping-address-item-right shipping-logistics-item-right">
								<text class="shipping-logistics-point"></text>
								<text class="shipping-logistics-line"></text>
								<text class="color-8f8f94 font-24 shipping-logistics-text">快递已到达仓山区菜鸟驿站\n2020-07-02 10:00:00</text>
							</view>
						</view>
					</view>
				</view>
				<view class="cont-session order-remarks">
					<view class="order-remarks-item">
						<text class="order-remarks-item-left color-222 font-28">订单备注:</text>
						<view class="shipping-address-item-right">
							<text class="color-222 font-28 order-remarks-text">电子商品做好防潮防摔措施</text>
						</view>
					</view>
				</view>
				<view class="cont-session order-message">
					<view class="order-message-item">
						<text class="order-message-item-left color-8f8f94 font-28">订单编号:</text>
						<text class="color-8f8f94 font-28 order-message-item-right">20200702184050</text>
						<view class="copy-btn">
							<text class="copy-text">复制</text>
						</view>
					</view>
					<view class="order-message-item">
						<text class="order-message-item-left color-8f8f94 font-28">下单时间:</text>
						<text class="color-8f8f94 font-28 order-message-item-right">2020-02-02  12:00:00</text>
					</view>
					<view class="order-message-item">
						<text class="order-message-item-left color-8f8f94 font-28">支付方式:</text>
						<text class="color-8f8f94 font-28 order-message-item-right">支付宝支付</text>
					</view>
					<view class="order-message-item">
						<text class="order-message-item-left color-8f8f94 font-28">支付时间:</text>
						<text class="color-8f8f94 font-28 order-message-item-right">2020-02-02  12:00:00</text>
					</view>
				</view>
			</view>
			<view class="fixed-empty"></view>
			<view class="btn-fixed-buttom">
				<navigator class="order-border-btn" hover-class="none"><text class="color-8f8f94 font-28">物流详情</text></navigator>
				<view class="order-border-btn paid-btn"><text class="color-fff font-26">付款(59:59:30)</text></view>
			</view>
		</scroll-view>
		<view class="mask-bg">
			<view class="mask-block">
				<view class="mask-close">
					
				</view>
				<view class="mask-tit">
					<text class="mask-tit-text font-30 color-000">不支持退换说明</text>
				</view>
				<view class="mask-cont">
					<text class="mask-cont-text font-24 color-222">贵重物品、贴身衣物、肉类果蔬生鲜商品、定制商品、虚拟商品、报纸期刊等，处于信息安全或者卫生考虑，不支持无理由退货。跨境商品不支持换货。</text>
				</view>
				<view class="mask-sure-btn">
					<text class="mask-sure-text font-30 color-fff">知道了</text>
				</view>
			</view>
		</view>
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
	.mask-bg {
		position: fixed; 
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba($color: #000, $alpha: 0.7);
		justify-content: center;
		align-items: center;
	}
	.mask-block {
		width: 560px;
		height: 528px;
		padding: 0 50px;
		background-color: #fff;
		@include border-radius(10px);
		position: relative;
	}
	.mask-tit {
		height: 120px;
		border-bottom-color: @divider-color;
		border-bottom-width: 2px;
		border-bottom-style: solid;
		align-items: center;
		justify-content: center;
	}
	.mask-cont {
		margin: 58px 0;
		overflow: visible;
	}
	.mask-cont-text {
		line-height: 46px;
	}
	.mask-sure-btn {
		align-items: center;
	}
	.mask-sure-text {
		width: 300px;
		height: 66px;
		background-color: @red-dark;
		text-align: center;
		line-height: 66px;
		@include border-radius(4px);
	}
	.mask-close {
		position: absolute;
		right: 20px;
		top: -80px;
		width: 70px;
		height: 70px;
		padding: 10px;
		background-color: #000;
		z-index: 5;
	}
</style>

<template>
	<view class="app-body tf-bg">
		<!-- <placeholderNavBar></placeholderNavBar> -->
		<scroll-view scroll-y="true" class="scroll-body">
			<view class="order-session">
				<view class="order-header-bg"></view>
				<view class="order-status-session">
					<text class="order-status-name">申请退款中</text>
					<text class="order-status-tip">订单等待处理中</text>
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
								<view class="order-num"><text class="color-8f8f94 font-24">幸福币 500</text></view>
							</view>
							<view class="order-action-session">
								<view class="order-action-text">
									<text class="color-eb5841 font-24">退款中</text>
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
								<view class="order-name"><text class="color-222 font-28 order-name-text">yeah jewelry U形项链yeah jewelry U形项链</text></view>
								<view class="order-price"><text class="color-222 font-28">￥20000.00</text></view>
							</view>
							<view class="order-sku-num">
								<view class="order-sku"><text class="color-8f8f94 font-24 order-sku-text">规格：银色</text></view>
							</view>
							<view class="order-action-session">
								<view class="order-action-text">
									<text class="color-eb5841 font-24">换货中</text>
								</view>
								<view class="order-buy-num"><text class="color-8f8f94 font-24">x1</text></view>
							</view>
						</view>
					</view>
					<view class="detail-price-list">
						<view class="flex-sart-item">
							<text class="color-222 font-28 flex-sart-item-left">退款原因：</text>
							<text class="color-222 font-28">尺码拍错/不喜欢/效果不好</text>
						</view>
						<view class="flex-sart-item">
							<text class="color-222 font-28 flex-sart-item-left">换货编号：</text>
							<text class="color-222 font-28">20200702101045</text>
						</view>
						<view class="flex-sart-item">
							<text class="color-222 font-28 flex-sart-item-left">下单时间：</text>
							<text class="color-222 font-28">2020-07-02  12:00:00</text>
						</view>
						<!-- <view class="flex-sart-item">
							<text class="color-222 font-28 flex-sart-item-left">完成时间：</text>
							<text class="color-222 font-28">2020-07-02  12:00:00</text>
						</view> -->
					</view>
					<view class="order-total order-total-detail">
						<text class="color-8f8f94 font-24">共 1 件</text>
					</view>
				</view>
				<!-- <view class="cont-session address-logistics">
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
				</view> -->
				<view class="cont-session order-message">
					<view class="order-tip-item">
						<text class="order-tip-item-left order-tip-text color-222 font-28">退款总额:</text>
						<text class="color-222 font-28 order-tip-text">￥100、幸福币500</text>
					</view>
					<view class="order-tip-item">
						<text class="order-tip-item-left order-tip-text color-222 font-28">退款说明:</text>
						<text class="order-tip-item-right color-222 font-28 order-tip-text">颜色不喜欢买错色号，希望能换一个颜色和样式</text>
					</view>
					<view class="order-tip-item">
						<text class="order-tip-item-left order-tip-text color-222 font-28">寄出物流: </text>
						<text class="color-eb5841 font-28 order-tip-text">请及时寄出并填写物流单号</text>
					</view>
				</view>
				<!-- <view class="cont-session order-message">
					<view class="order-tip-item">
						<text class="order-tip-item-left order-tip-text color-222 font-28">退款总额:</text>
						<text class="color-222 font-28 order-tip-text">￥100、幸福币500</text>
					</view>
					<view class="order-tip-item">
						<text class="order-tip-item-left order-tip-text color-222 font-28">退款说明：</text>
						<text class="order-tip-item-right color-8f8f94 font-28 order-tip-text">无</text>
					</view>
					<view class="order-tip-item">
						<text class="order-tip-item-left order-tip-text color-222 font-28">寄出物流: </text>
						<text class="color-222 font-28 order-tip-text">顺丰速运</text>
						<text class="color-8f8f94 font-28 order-tip-text">(已签收)</text>
					</view>
				</view> -->
			</view>
			<view class="fixed-empty"></view>
			<view class="btn-fixed-buttom">
				<navigator class="order-border-btn" hover-class="none"><text class="color-8f8f94 font-28">取消退款</text></navigator>
				<view class="order-border-btn paid-btn"><text class="color-fff font-26">填写退货物流</text></view>
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
</style>

<template>
	<div class="app-body">
		<div class="order-bar"><van-nav-bar title="换货详情" :border="false" fixed left-text="" left-arrow></van-nav-bar></div>
		<div class="bar-empty"></div>
		<div class="order-session">
			<div class="order-header-bg"></div>
			<div class="order-status-session">
				<div class="order-status-name">申请换货中</div>
				<div class="order-status-tip">订单等待处理中</div>
			</div>
			<div class="cont-session goods-session">
				<div class="order-goods-info">
					<div class="order-pic-block">
						<img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg"></img>
					</div>
					<div class="order-info">
						<div class="order-name-price">
							<div class="order-name p-nowrap">yeah jewelry U形项链</div>
							<div class="order-price">￥20000.00</div>
						</div>
						<div class="order-sku-num">
							<div class="order-sku p-nowrap">规格：银色</div>
							<div class="order-num">￥21000.00</div>
						</div>
						<div class="order-action-session">
							<div class="order-action-text">换货中</div>
							<div class="order-buy-num">x1</div>
						</div>
					</div>
				</div>
				<div class="order-goods-info">
					<div class="order-pic-block">
						<img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg"></img>
					</div>
					<div class="order-info">
						<div class="order-name-price">
							<div class="order-name p-nowrap">yeah jewelry U形项链</div>
							<div class="order-price">￥20000.00</div>
						</div>
						<div class="order-sku-num">
							<div class="order-sku p-nowrap">规格：银色</div>
							<div class="order-num">￥21000.00</div>
						</div>
						<div class="order-action-session">
							<div class="order-action-text">换货中</div>
							<div class="order-buy-num">x1</div>
						</div>
					</div>
				</div>
				<div class="detail-price-list">
					<div class="flex-sart-item">
						<div class="color-222 font-28 flex-sart-item-left">换货原因：</div>
						<div class="color-222 font-28">发错货</div>
					</div>
					<div class="flex-sart-item">
						<div class="color-222 font-28 flex-sart-item-left">换货编号：</div>
						<div class="color-222 font-28">20200702101045</div>
					</div>
					<div class="flex-sart-item">
						<div class="color-222 font-28 flex-sart-item-left">下单时间：</div>
						<div class="color-222 font-28">2020-07-02  12:00:00</div>
					</div>
					<div class="flex-sart-item">
						<div class="color-222 font-28 flex-sart-item-left">完成时间：</div>
						<div class="color-222 font-28">2020-07-02  12:00:00</div>
					</div>
				</div>
				<div class="order-total order-total-detail">
					<div class="color-8f8f94 font-24">共 1 件</div>
				</div>
			</div>
			<div class="cont-session address-logistics">
				<div class="shipping-address">
					<div class="shipping-address-item">
						<div class="shipping-address-item-left color-222 font-28">收货地址:</div>
						<div class="shipping-address-item-right">
							<div class="shipping-address-username p-nowrap">安琪拉安琪拉安琪拉安琪拉</div>
							<div class="color-222 font-28">15000112233</div>
						</div>
					</div>
					<div class="shipping-address-item">
						<div class="shipping-address-item-left"></div>
						<div class="shipping-address-item-right">
							<div class="shipping-address-text p-nowrap">福建省福州市仓山区下渡街道三盛滨江国际三盛滨江国</div>
						</div>
					</div>
				</div>
				<div class="shipping-logistics">
					<div class="shipping-address-item">
						<div class="shipping-address-item-left color-222 font-28">物流配送:</div>
						<div class="shipping-address-item-right">
							<div class="color-222 font-28">顺丰速运</div>
							<div class="color-8f8f94 font-28">(SF123456789002)</div>
							<img class="shipping-address-icon" src="" mode="" />
						</div>
					</div>
					<div class="shipping-logistics-item">
						<div class="shipping-address-item-left"></div>
						<div class="shipping-address-item-right shipping-logistics-item-right">
							<div class="shipping-logistics-point"></div>
							<div class="shipping-logistics-line"></div>
							<div class="shipping-logistics-text">快递已到达仓山区菜鸟驿站\n2020-07-02 10:00:00</div>
						</div>
					</div>
				</div>
			</div>
			<!-- <div class="cont-session order-message">
				<div class="order-tip-item">
					<div class="order-tip-item-left order-tip-text color-222 font-28">换货规格:</div>
					<div class="color-222 font-28 order-tip-text">粉色</div>
				</div>
				<div class="order-tip-item">
					<div class="order-tip-item-left order-tip-text color-222 font-28">换货说明：</div>
					<div class="order-tip-item-right color-222 font-28 order-tip-text">颜色不喜欢买错色号，希望能换一个颜色和样式</div>
				</div>
				<div class="order-tip-item">
					<div class="order-tip-item-left order-tip-text color-222 font-28">寄出物流: </div>
					<div class="color-eb5841 font-28 order-tip-text">请及时寄出并填写物流单号</div>
				</div>
			</div> -->
			<div class="cont-session order-message">
				<div class="order-tip-item">
					<div class="order-tip-item-left order-tip-text color-222 font-28">换货规格:</div>
					<div class="color-222 font-28 order-tip-text">粉色</div>
				</div>
				<div class="order-tip-item">
					<div class="order-tip-item-left order-tip-text color-222 font-28">换货说明:</div>
					<div class="order-tip-item-right color-8f8f94 font-28 order-tip-text">无</div>
				</div>
				<div class="order-tip-item">
					<div class="order-tip-item-left order-tip-text color-222 font-28">寄出物流: </div>
					<div class="color-222 font-28 order-tip-text">顺丰速运</div>
					<div class="color-8f8f94 font-28 order-tip-text">(已签收)</div>
				</div>
			</div>
		</div>
		<div class="fixed-empty"></div>
		<div class="btn-fixed-buttom">
			<div class="order-border-btn" hover-class="none"><div class="color-8f8f94 font-28">取消换货</div></div>
			<div class="order-border-btn paid-btn"><div class="color-fff font-26">填写寄出物流</div></div>
		</div>
	</div>
</template>

<script>
import { NavBar } from 'vant'
export default {
  components: {
    [NavBar.name]: NavBar,
  },
  data () {
    return {

    }
  },
  onLoad () {

  },
  methods: {

  }
}
</script>

<style scoped  src="../../../styles/life.css"></style>
<style scoped  src="../../../styles/order.css"></style>

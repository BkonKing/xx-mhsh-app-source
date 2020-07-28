<template>
	<div class="app-body tf-bg">
		<div class="order-bar">
			<van-nav-bar title="订单详情" :border="false" fixed left-text="" left-arrow></van-nav-bar>
		</div>
		<div class="bar-empty"></div>
		<div class="order-session">
			<div class="order-header-bg"></div>
			<div class="order-status-session">
				<div class="order-status-name">待付款</div>
				<div class="order-status-tip">剩余23:23:23 自动取消订单</div>
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
							<div class="order-action-text">不支持退货
								<div class="order-action-btn">
									<img class="img-100" src="@/assets/img/question_01.png" />
								</div>
							</div>
							<div class="order-buy-num">x1</div>
						</div>
					</div>
					<div class="order-goods-btn">
						<div class="order-border-btn" hover-class="none">申请退换</div>
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
							<div class="order-action-text color-8f8f94">不支持退货
								<div class="order-action-btn">
									<img class="img-100" src="@/assets/img/question_01.png" />
								</div>
							</div>
							<div class="order-buy-num">x1</div>
						</div>
					</div>
					<div class="order-goods-btn">
						<div class="order-border-btn" hover-class="none">申请退换</div>
					</div>
				</div>
				<div class="detail-price-list">
					<div class="detail-price-item">
						<div>商品总价</div>
						<div>￥600.00</div>
					</div>
					<div class="detail-price-item">
						<div>运费</div>
						<div>￥600.00</div>
					</div>
					<div class="detail-price-item">
						<div>优惠券</div>
						<div>￥600.00</div>
					</div>
					<div class="detail-price-item">
						<div>幸福币抵扣</div>
						<div>￥600.00</div>
					</div>
				</div>
				<div class="order-total order-total-detail">
					<div class="color-8f8f94 font-24">共 1 件</div>
					<div class="order-price-total">
						合计:<span>￥200.00</span>
					</div>
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
			<div class="cont-session order-remarks">
				<div class="order-remarks-item">
					<div class="order-remarks-item-left color-222 font-28">订单备注:</div>
					<div class="shipping-address-item-right">
						<div class="color-222 font-28 order-remarks-text">电子商品做好防潮防摔措施</div>
					</div>
				</div>
			</div>
			<div class="cont-session order-message">
				<div class="order-message-item">
					<div class="order-message-item-left color-8f8f94 font-28">订单编号:</div>
					<div class="color-8f8f94 font-28 order-message-item-right">20200702184050</div>
					<div class="copy-btn">
						<div class="copy-text">复制</div>
					</div>
				</div>
				<div class="order-message-item">
					<div class="order-message-item-left color-8f8f94 font-28">下单时间:</div>
					<div class="color-8f8f94 font-28 order-message-item-right">2020-02-02  12:00:00</div>
				</div>
				<div class="order-message-item">
					<div class="order-message-item-left color-8f8f94 font-28">支付方式:</div>
					<div class="color-8f8f94 font-28 order-message-item-right">支付宝支付</div>
				</div>
				<div class="order-message-item">
					<div class="order-message-item-left color-8f8f94 font-28">支付时间:</div>
					<div class="color-8f8f94 font-28 order-message-item-right">2020-02-02  12:00:00</div>
				</div>
			</div>
		</div>
		<div class="fixed-empty"></div>
		<div class="btn-fixed-buttom">
			<div class="order-border-btn" hover-class="none">物流详情</div>
			<div class="order-border-btn paid-btn">付款(59:59:30)</div>
		</div>
		<div v-show="false" class="mask-bg">
			<div class="mask-block">
				<div class="mask-close">
          <img class="img-100" src="@/assets/img/close.png" />
        </div>
				<div class="mask-tit">
					<div class="mask-tit-text font-30 color-000">不支持退换说明</div>
				</div>
				<div class="mask-cont">
					<div class="mask-cont-text font-24 color-666">贵重物品、贴身衣物、肉类果蔬生鲜商品、定制商品、虚拟商品、报纸期刊等，处于信息安全或者卫生考虑，不支持无理由退货。跨境商品不支持换货。</div>
				</div>
				<div class="mask-btn flex-between">
          <div class="mask-sure-btn flex-center">知道了</div>
        </div>
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

    }
  },
  methods: {

  }
}
</script>

<style scoped>
@import '../../../styles/life.css';
@import '../../../styles/order.css';
.app-body {
	background-color: #f2f2f4;
	font-size: 28px;
	width: 100%;
	overflow: hidden;
}
</style>

<template>
	<div class="app-body tf-bg">
		<div class="order-bar">
			<van-nav-bar title="订单详情" :border="false" fixed left-text="" left-arrow></van-nav-bar>
		</div>
		<div class="bar-empty"></div>
		<div class="order-session">
			<div class="order-header-bg"></div>
			<div class="order-status-session">
				<div class="order-status-name">拼单-还差1人</div>
				<div class="order-status-tip">剩余23:23:23 自动取消订单</div>
			</div>
			<div class="cont-session goods-session">
				<div class="order-goods-info">
					<div class="order-pic-block">
						<img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg"></img>
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
									<img class="img-100" src="@/assets/img/question_01.png" mode="" />
								</div>
							</div>
							<div class="order-buy-num">x1</div>
						</div>
					</div>
				</div>
				<div class="order-goods-info">
					<div class="order-pic-block">
						<img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg"></img>
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
						<router-link class="order-border-btn" to='detail'>申请退换</router-link>
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
			<div class="cont-session collage-session collage-ing">
				<div class="collage-header flex-align-center">
					<span>拼单</span>(新老用户均可参加)
        </div>
        <div class="collage-step flex-between">
          <div>①选择商品</div>
          <div class="collage-step-icon"></div>
          <div>②支付开团</div>
          <div class="collage-step-icon"></div>
          <div>③分享好友</div>
          <div class="collage-step-icon"></div>
          <div>④成功(失败退款)</div>
        </div>
        <!-- <div class="collage-num flex-align-center">还差<sapn class="color-eb5841">&nbsp;1&nbsp;</sapn>人<sapn class="color-8f8f94">（7人拼单）</sapn></div> -->
        <!-- <div class="collage-num flex-align-center"><sapn class="color-eb5841">3人拼单成功</sapn></div> -->
        <div class="collage-num flex-align-center"><sapn class="color-eb5841">拼单失败</sapn><sapn class="color-8f8f94">（7人拼单）</sapn></div>
        <div class="collage-user flex-align-center">
	        <div class="collage-user-info">
            <img class="collage-user-photo" src="http://192.168.1.158/library/user_avatar/202007/2015/tx_42.jpg" />
            <div class="collage-user-name p-nowrap">旅途</div>
          </div>
          <div class="collage-user-info">
            <img class="collage-user-photo" src="http://192.168.1.158/library/user_avatar/202007/0220/tx_39.jpg" />
            <div class="collage-user-name p-nowrap">旅途</div>
          </div>
          <div class="collage-user-info">
            <img class="collage-user-photo" src="http://192.168.1.158/library/user_avatar/202007/0220/tx_39.jpg" />
            <div class="collage-user-name p-nowrap">旅途</div>
          </div>
          <div class="collage-user-info">
            <img class="collage-user-photo" src="http://192.168.1.158/library/user_avatar/202007/2015/tx_42.jpg" />
            <div class="collage-user-name p-nowrap">旅途</div>
          </div>
          <div class="collage-user-info">
            <img class="collage-user-photo" src="http://192.168.1.158/library/user_avatar/202007/2015/tx_42.jpg" />
            <div class="collage-user-name p-nowrap">旅途</div>
          </div>
          <div class="collage-user-info">
          	<div class="collage-mask flex-center"><span></span><span></span><span></span></div>
            <img class="collage-user-photo" src="http://192.168.1.158/library/user_avatar/202007/2015/tx_42.jpg" />
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
			<div class="color-eb5841">剩余59：59:59结束</div>
			<div class="order-border-btn paid-btn">邀请好友</div>
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
	font-size: 0.28rem;
	width: 100%;
	overflow: hidden;
}

.collage-header {
  height: 1.2rem;
  padding: 0 0.3rem;
  color: #222222;
  font-size: 0.3rem;
}
.collage-header span {
	font-size: 0.34rem;
	font-weight: bold;
	margin-right: 0.08rem;
}
.collage-ing .collage-header {
  background-color: #d2ebff;
  color: #209cff;
}
.collage-fail .collage-header {
  background-color: #aaa;
}
.collage-sucess .collage-step {
  border-top: 1px dashed #aaa;
}
.collage-step {
	border-bottom: 1px dashed #aaa;
  height: 0.83rem;
  font-size: 0.22rem;
  color: #222;
  width: 6.5rem;
  margin: 0 auto;
}
.collage-step div {
	white-space: nowrap;
}
.collage-step-icon {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0.09rem 0 0.09rem 0.1rem;
  border-color: transparent transparent transparent #383838;
}
.collage-num {
	margin: 0.12rem 0 0 0.3rem;
	font-size: 0.24rem;
	height: 0.62rem;
}
.collage-user {
  width: 6.72rem;
  margin: 0 auto;
  padding-bottom: 0.3rem;
}
.collage-user-info {
  width: 1.12rem;
  height: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.collage-user-photo {
  width: 0.88rem;
  height: 0.88rem;
  border-radius: 50%;
}
.collage-user-name {
  width: 100%;
  line-height: 0.42rem;
  text-align: center;
  color: #8f8f94;
  font-size: 0.22rem;
}
.collage-mask {
	position: absolute;
	top: 0;
	left: 50%;
	margin-left: -0.44rem;
	width: 0.88rem;
	height: 0.88rem;
	background-color: rgba(0,0,0,0.5);
	border-radius: 50%;
}
.collage-mask span {
	width: 0.08rem;
	height: 0.08rem;
	margin: 0 0.05rem;
	background-color: #fff;
	border-radius: 50%;
}
</style>

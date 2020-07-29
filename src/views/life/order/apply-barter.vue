<template>
	<div class="app-body" :style="{ 'min-height': windowHeight+'px'}">
		<div class="order-bar bar-white"><van-nav-bar title="申请换货" :border="false" fixed left-text="" left-arrow></van-nav-bar></div>
    <div class="bar-empty"></div>
    <div class="apply-tip">如有多件商品需要换货，请一并提交申请</div>
		<div class="order-session">
			<div class="cont-session goods-session">
				<div class="can-apply">
					<div class="apply-goods">
						<div class="cart-checkbox flex-center cur" bindtap="checkboxOne" data-index="">
		          <div class="checkbox-session"></div>
		        </div>
						<div class="order-goods-info">
							<div class="order-pic-block">
								<img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg">
							</div>
							<div class="order-info">
								<div class="order-name-price">
									<div class="order-name order-name-text p-nowrap">yeah jewelry U形项链</div>
									<div class="order-price">￥20000.00</div>
								</div>
								<div class="order-sku-num">
									<div class="order-sku order-sku-text p-nowrap">规格：银色</div>
									<div class="order-buy-num">x1</div>
								</div>
								<div class="order-action-session">
									<div class="order-action-text">换货中</div>
								</div>
							</div>
						</div>
					</div>
					<div class="apply-goods">
						<div class="cart-checkbox flex-center cur" bindtap="checkboxOne" data-index="">
		          <div class="checkbox-session"></div>
		        </div>
						<div class="order-goods-info">
							<div class="order-pic-block">
								<img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg">
							</div>
							<div class="order-info">
								<div class="order-name-price">
									<div class="order-name order-name-text p-nowrap">yeah jewelry U形项链</div>
									<div class="order-price">￥20000.00</div>
								</div>
								<div class="order-sku-num">
									<div class="order-sku order-sku-text p-nowrap">规格：银色</div>
									<div class="order-buy-num">x1</div>
								</div>
								<div class="order-action-session">
									<div class="order-action-text">换货中</div>
								</div>
							</div>
							<div class="apply-select flex-between">
								<div class="select-left">
									<div>换货原因：商品质量问题</div>
									<div class="color-eb5841">换成：黑色</div>
								</div>
								<div class="select-right">
									<img class="img-100" src="@/assets/img/right.png" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="not-apply">
					<div class="apply-toggle">部分商品不支持换货(2)</div>
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
								<div class="order-buy-num">x1</div>
							</div>
							<div class="order-action-session">
								<div class="order-action-text">不支持退货
									<div class="order-action-btn">
										<img class="img-100" src="@/assets/img/question_01.png" />
									</div>
								</div>
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
								<div class="order-buy-num">x1</div>
							</div>
							<div class="order-action-session">
								<div class="order-action-text">退货中</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="cont-session common-list common-list-pic">
				<div class="common-item common-item-first">
					<div class="common-item-left color-222 font-28">
						<div class="item-first-left">换货说明</div>
						<input class="item-first-right" type="text" placeholder="填写换货理由" />
					</div>
				</div>
				<div class="common-item common-item-second">
					<div class="common-item-left">
						<div class="color-222 font-28">上传凭证</div>
						<div class="color-8f8f94 font-28">(最多5张)</div>
					</div>
				</div>
				<div class="common-item pic-list no-top-border">
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
			</div>

		</div>
		<div class="fixed-submit-empty"></div>
		<div class="submit-fixed-buttom">
			<div class="submit-btn">
				<div class="color-fff font-30">提交</div>
			</div>
		</div>

		<div v-show="false" class="publick-mask reason-mask bottom-fixed">
      <div class="publick-dclose" catchtap="ensureFunc"><img class="img-100" src="@/assets/img/close.png" /></div>
      <div class="publick-header">选择换货原因</div>
      <div class="action-block">请选择实际原因，以便我们更好地为您提供服务</div>
      <div class="common-list">
				<div class="common-item common-item-first">
					<div class="common-item-left">拍错/不喜欢</div>
				</div>
				<div class="common-item">
					<div class="common-item-left">发错规格</div>
				</div>
				<div class="common-item">
					<div class="common-item-left">少件/破损/变形等</div>
				</div>
				<div class="common-item">
					<div class="common-item-left">拍错尺码/规格/型号</div>
				</div>
			</div>
    </div>
    <div v-show="false" class="mask-bg" catchtouchmove="true" catchtap="ensureFunc"></div>
	</div>
</template>

<script>
import { Swipe, SwipeItem, Icon, NavBar } from 'vant'
export default {
  components: {
    [Icon.name]: Icon,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NavBar.name]: NavBar,
  },
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
@import '../../../styles/apply.css';
.goods-session {
	padding: 40px 0 0 0;
	flex-wrap: wrap;
}

</style>

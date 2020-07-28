<template>
	<div class="app-body tf-bg">
		<van-nav-bar title="我的订单" fixed left-text="返回" left-arrow>
		  <van-icon name="search" slot="right" />
		</van-nav-bar>
		<div class="bar-empty"></div>
		<div class="nav-empty"></div>
		<div class="nav-box">
		  <div class="nav-item cur" bindtap="navFun" data-typeval="1">全部</div>
		  <div class="nav-item" bindtap="navFun" data-typeval="2">待付款</div>
		  <div class="nav-item" bindtap="navFun" data-typeval="3">待发货</div>
		  <div class="nav-item" bindtap="navFun" data-typeval="4">待收货</div>
		  <div class="nav-item" bindtap="navFun" data-typeval="5">退换</div>
		</div>

		<div class="order-list">
			<div class="order-item">
				<div class="order-header">
					<div class="order-no">订单号：20181106121211061223</div>
					<div class="order-status">配货中<text class="font-28 color-eb5841 text-right"></text></div>
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
							<div class="order-action-text">不支持退货
								<div class="order-action-btn">
									<img class="img-100" src="http://192.168.1.158/library/img/xcx_img/activity/question_01.png" mode="" />
								</div>
							</div>
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
							<div class="order-action-text">不支持退货
								<div class="order-action-btn">
									<image class="order-action-pic" src="http://192.168.1.158/library/img/xcx_img/activity/question_01.png" mode=""></image>
								</div>
							</div>
							<div class="order-buy-num">x1</div>
						</div>
					</div>
				</div>
				<div v-show="false" class="toggle-btn">111
					<image src="" mode=""></image>
				</div>
				<div class="order-footer">
					<div class="order-total">
						<div class="color-8f8f94 font-24">共 1 件</div>
						<div class="order-price-total">
							合计:<span>￥200.00</span>
						</div>
					</div>
					<div class="order-btn-box">
						<div class="order-border-btn" hover-class="none">物流详情</div>
						<div class="order-border-btn paid-btn">付款(59:59:30)</div>
					</div>
				</div>
			</div>
			<div class="order-item">
				<div class="order-header">
					<div class="order-no">订单号：20181106121211061223</div>
					<div class="order-status">配货中<text class="font-28 color-eb5841 text-right"></text></div>
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
							<div class="order-action-text">不支持退货
								<div class="order-action-btn">
									<image class="order-action-pic" src="http://192.168.1.158/library/img/xcx_img/activity/question_01.png" mode=""></image>
								</div>
							</div>
							<div class="order-buy-num">x1</div>
						</div>
					</div>
				</div>
				<div class="order-total">
						<div class="color-8f8f94 font-24">共 1 件</div>
						<div class="order-price-total">
							合计:<span>￥200.00</span>
						</div>
					</div>
					<div class="order-btn-box">
						<div class="order-border-btn" hover-class="none">物流详情</div>
						<div class="order-border-btn" hover-class="none">物流详情</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import '@/styles/order.css'
// Vue.use(NavBar);
export default {
  data () {
    return {
      typeVal: 0,
      navItems: ['全部', '待付款', '待发货', '待收货', '退换'],
      current: 0
    }
  },
  methods: {
    onClickItem (e) {
      if (this.current !== e.currentTarget.dataset.currentindex) {
        this.current = e.currentTarget.dataset.currentindex
      }
    }
  }
}
</script>
<style scoped>
@import '../../../styles/life.css';
@import '../../../styles/order.css';
@import '../../../styles/nav.css';
.app-body {
	background-color: #f2f2f4;
	font-size: 28px;
}
/* 导航 start */
.nav-item.cur::after {
  width: 66px;
  margin-left: -33px;
}
/* 导航 end */
/*.nav-item:nth-child(1).cur::after,.nav-item:nth-child(5).cur::after {
  width: 0.58rem;
  margin-left: -0.29rem;
}*/
</style>

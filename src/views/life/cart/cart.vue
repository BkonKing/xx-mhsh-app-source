<template>
	<div class="app-body tf-bg" :style="{ 'min-height': windowHeight+'px'}">
    <div class="order-bar bar-white"><van-nav-bar title="购物车" :border="false" fixed left-text="" left-arrow></van-nav-bar></div>
    <div class="bar-empty"></div>
		<div class="cart-session">
			<div class="cart-list">
	      <div class="cart-item cart-item-sg" v-for="(item,key) in carts">
	        <div class="cart-checkbox cur" bindtap="checkboxOne" data-index="">
	          <div class="checkbox-session"></div>
	        </div>
	        <div class="cart-cont" hover-class="none">
	          <div class="product-pic">
	            <img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20200529/20200529143533_43955.jpg" />
	          </div>
	          <div class="product-info">
	            <div class="product-name p-nowrap">日本索尼拍立得相机富士mini90</div>
	            <div class="product-specs">黑色</div>
	            <div class="flex-align-center"><div class="product-icon flex-center">限时闪购</div></div>
	            <div class="product-price">￥<span>3800.00</span> <span>￥4000.00</span></div>
	          </div>
	        </div>
	        <div class="cart-operate">
	          <div class="operate-btn product-sub flex-between" data-types="-1" data-index="" bindtap="countTab"></div>
	          <div class="shop-btn-block">
	            <div class="shop-num">11</div>
	          </div>
	          <div class="operate-btn product-add not-add flex-between" data-types="1" data-index="" bindtap=""></div>
	        </div>
	        <div class="product-del" catchtap="delCarts" data-index=""><img class="width-100" mode="aspectFill" src="/resource/images/close_02.png" /></div>
	      </div>
	    </div>
		</div>
    <div class="cart-empty"></div>
    <div class="cart-bottom bottom-fixed">
      <div class="cart-data flex-align-center">
        <div class="all-checkbox" catchtap="checkboxAll"><div class="all-checkbox-session"></div>全选</div>
        <div class="all-price"><span>合计：</span>￥55</div>
        <div class="all-go flex-center" catchtap="payFunc">结算(2)</div>
      </div>
    </div>
		<!-- <div class="cart-bottom">
			<van-submit-bar
			  :price="3050"
			  button-text="提交订单"
			  @submit="onSubmit"
			>
			  <van-checkbox v-model="checked">全选</van-checkbox>
			</van-submit-bar>
		</div> -->
	</div>
</template>

<script>
// import '@/styles/life.css'
export default {
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      checked: false,
      carts: [1, 2, 3, 4, 5, 6]
    }
  },
  methods: {
    onSubmit: function () {

    }
  }
}
</script>

<style scoped>
@import '../../../styles/life.css';
.app-body {
  background-color: #f2f2f4;
  font-size: 0.28rem;
  overflow: hidden;
}
/* 购物车商品列表 start */
.cart-session {
  overflow: hidden;
}
.cart-list {
  margin: 0.3rem auto 0;
  width: 7.1rem;
  padding-bottom: 0.3rem;
}
.cart-item {
  display: flex;
  background-color: #fff;
  position: relative;
  padding: 0.3rem 0;
  margin-bottom: 0.3rem;
  height: 2rem;
  border-radius: 0.1rem;
}
.cart-item-sg,.cart-item-tm {
  height: 2.53rem;
}
.cart-item:last-child {
  margin-bottom: 0;
}
.cart-checkbox {
  width: 0.72rem;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  justify-content: center;
}
.checkbox-session,.all-checkbox-session {
  width: 0.32rem;
  height: 0.32rem;
  border-radius: 50%;
  border: 0.02rem solid #96a8bb;
  margin-top: 0.54rem;
}
.cart-checkbox.cur .checkbox-session,.all-checkbox.cur .all-checkbox-session {
  border: none;
  background: #eb5841 url('https://bht.liwushijian.com/library/img/xcx_img/tick2.png') no-repeat center center/100% 100%;
}
.cart-cont {
  width: 6.38rem;
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}
.product-pic {
  width: 1.4rem;
  height: 1.4rem;
  display: flex;
  flex-shrink: 0;
  border-radius: 0.04rem;
  overflow: hidden;
}
.product-info {
  width: 4.78rem;
}
.product-name {
  line-height: 0.38rem;
  color: #222;
  width: 4.06rem;
}
.product-specs {
  line-height: 0.5rem;
  font-size: 0.24rem;
  color: #8f8f94;
}
.product-icon {
  padding: 0 0.1rem;
  height: 0.44rem;
  line-height: 0.44rem;
  border-radius: 0.04rem;
  overflow: hidden;
  font-size: 0.24rem;
  margin: 0.07rem 0 0.03rem;
}
.cart-item-tm .product-icon {
  color: #55b862;
  background-color: #eef8ef;
}
.cart-item-sg .product-icon {
  color: #eb5841;
  background-color: #fdeeec;
}
.product-price {
  padding-top: 0.06rem;
  line-height: 0.45rem;
  font-size: 0.24rem;
  color: #eb5841;
}
.product-price span:nth-of-type(1) {
  font-size: 0.32rem;
  font-weight: bold;
}
.product-price span:nth-of-type(2) {
  color: #8f8f94;
  text-decoration: line-through;
}
.cart-operate {
  position: absolute;
  right: 0.1rem;
  bottom: 0.1rem;
  width: 1.92rem;
  height: 0.86rem;
  display: flex;
  justify-content: space-between;
}
.operate-btn {
  width: 0.87rem;
  height: 100%;
  z-index: 5;
  position: relative;
}
.product-sub {
  background: url('https://bht.liwushijian.com/library/img/xcx_img/sub.png') no-repeat center center/0.16rem 0.16rem;
}
.product-add {
  background: url('https://bht.liwushijian.com/library/img/xcx_img/add.png') no-repeat center center/0.16rem 0.16rem;
}
.operate-btn::after {
  position: absolute;
  content: '';
  width: 0.47rem;
  height: 0.44rem;
  top: 0.2rem;
  bottom: 0.2rem;
  border: 1px solid #aaa;
  box-sizing: border-box;
}
.product-sub::after {
  left: 0.2rem;
}
.product-add::after {
  right: 0.2rem;
}
.shop-num {
  position: absolute;
  top: 0.2rem;
  left: 0.67rem;
  right: 0.67rem;
  height: 0.44rem;
  z-index: 3;
  line-height: 0.82rem;
  font-size: 0.26rem;
  color: #222;
  text-align: center;
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
}
.product-del {
  position: absolute;
  top: 0.18rem;
  right: 0.1rem;
  width: 0.6rem;
  height: 0.6rem;
  padding: 0.2rem;
  display: flex;
  z-index: 5;
}

/*底部*/
.cart-empty {
  height: 1.2rem;
}
.cart-data {
  height: 1.2rem;
  background-color: #fff;
  line-height: 1.2rem;
}
.all-checkbox {
  width: 1.4rem;
  display: flex;
  justify-content: space-between;
  padding-left: 0.4rem;
  align-items: center;
}
.all-checkbox-session {
  margin-top: 0;
}
.all-price {
  width: 3.5rem;
  flex-grow: 1;
  font-weight: bold;
  color: #eb5841;
  font-size: 0.34rem;
  text-align: right;
  margin-right: 0.3rem;
}
.all-price span {
  color: #8f8f94;
  font-size: 0.24rem;
  font-weight: normal;
}
.all-go {
  width: 1.9rem;
  height: 0.88rem;
  color: #fefefe;
  font-size: 0.3rem;
  background-image: linear-gradient(to right, #f9866b, #eb5841);
  border-radius: 0.1rem;
  margin-right: 0.2rem;
}
/* 购物车商品列表 end */
/*.cart-bottom .van-submit-bar__bar {
	height: 1.2rem;
	padding: 0;
}
.cart-bottom .van-checkbox {
	height: 100%;
	padding-left: 0.4rem;
}
.cart-bottom .van-checkbox__icon {
	height: 0.32rem;
	line-height: 0.32rem;
	font-size: 0.2rem;
}
.cart-bottom .van-checkbox__label {
	margin-left: 0.2rem;
  color: #8f8f94;
  font-size: 0.24rem;
}*/
</style>

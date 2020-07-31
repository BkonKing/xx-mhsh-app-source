<template>
	<div class="app-body" :style="{ 'min-height': windowHeight+'px'}">
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
	        <div class="product-del" catchtap="delCarts" data-index=""><img class="img-100" mode="aspectFill" src="@/assets/img/close_02.png" /></div>
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
import { NavBar } from 'vant'
export default {
  components: {
    [NavBar.name]: NavBar,
  },
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
  font-size: 28px;
  overflow: hidden;
}
/* 购物车商品列表 start */
.cart-session {
  overflow: hidden;
}
.cart-list {
  margin: 30px auto 0;
  width: 710px;
  padding-bottom: 30px;
}
.cart-item {
  display: flex;
  background-color: #fff;
  position: relative;
  padding: 30px 0;
  margin-bottom: 30px;
  height: 200px;
  border-radius: 10px;
}
.cart-item-sg,.cart-item-tm {
  height: 253px;
}
.cart-item:last-child {
  margin-bottom: 0;
}
.cart-checkbox {
  width: 72px;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  justify-content: center;
}
.checkbox-session,.all-checkbox-session {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #96a8bb;
  margin-top: 54px;
}
.cart-checkbox.cur .checkbox-session,.all-checkbox.cur .all-checkbox-session {
  border: none;
  background: url('../../../assets/img/tick2.png') no-repeat center center/100% 100%;
}
.cart-cont {
  width: 638px;
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}
.product-pic {
  width: 140px;
  height: 140px;
  display: flex;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
}
.product-info {
  width: 478px;
}
.product-name {
  line-height: 38px;
  color: #222;
  width: 406px;
}
.product-specs {
  line-height: 50px;
  font-size: 24px;
  color: #8f8f94;
}
.product-icon {
  padding: 0 10px;
  height: 44px;
  line-height: 44px;
  border-radius: 4px;
  overflow: hidden;
  font-size: 24px;
  margin: 7px 0 3px;
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
  padding-top: 6px;
  line-height: 45px;
  font-size: 24px;
  color: #eb5841;
}
.product-price span:nth-of-type(1) {
  font-size: 32px;
  font-weight: bold;
}
.product-price span:nth-of-type(2) {
  color: #8f8f94;
  text-decoration: line-through;
}
.cart-operate {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 192px;
  height: 86px;
  display: flex;
  justify-content: space-between;
}
.operate-btn {
  width: 87px;
  height: 100%;
  z-index: 5;
  position: relative;
}
.product-sub {
  background: url('https://bht.liwushijian.com/library/img/xcx_img/sub.png') no-repeat center center/16px 16px;
}
.product-add {
  background: url('https://bht.liwushijian.com/library/img/xcx_img/add.png') no-repeat center center/16px 16px;
}
.operate-btn::after {
  position: absolute;
  content: '';
  width: 47px;
  height: 44px;
  top: 20px;
  bottom: 20px;
  border: 1px solid #aaa;
  box-sizing: border-box;
}
.product-sub::after {
  left: 20px;
}
.product-add::after {
  right: 20px;
}
.shop-num {
  position: absolute;
  top: 20px;
  left: 67px;
  right: 67px;
  height: 44px;
  z-index: 3;
  line-height: 82px;
  font-size: 26px;
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
  top: 18px;
  right: 10px;
  width: 60px;
  height: 60px;
  padding: 20px;
  display: flex;
  z-index: 5;
}

/*底部*/
.cart-empty {
  height: 120px;
}
.cart-data {
  height: 120px;
  background-color: #fff;
  line-height: 120px;
}
.all-checkbox {
  width: 140px;
  display: flex;
  justify-content: space-between;
  padding-left: 40px;
  align-items: center;
}
.all-checkbox-session {
  margin-top: 0;
}
.all-price {
  width: 350px;
  flex-grow: 1;
  font-weight: bold;
  color: #eb5841;
  font-size: 34px;
  text-align: right;
  margin-right: 30px;
}
.all-price span {
  color: #8f8f94;
  font-size: 24px;
  font-weight: normal;
}
.all-go {
  width: 190px;
  height: 88px;
  color: #fefefe;
  font-size: 30px;
  background-image: linear-gradient(to right, #f9866b, #eb5841);
  border-radius: 10px;
  margin-right: 20px;
}
/* 购物车商品列表 end */
/*.cart-bottom .van-submit-bar__bar {
	height: 120px;
	padding: 0;
}
.cart-bottom .van-checkbox {
	height: 100%;
	padding-left: 40px;
}
.cart-bottom .van-checkbox__icon {
	height: 32px;
	line-height: 32px;
	font-size: 20px;
}
.cart-bottom .van-checkbox__label {
	margin-left: 20px;
  color: #8f8f94;
  font-size: 24px;
}*/
</style>

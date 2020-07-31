<template>
	<div class="app-body" :style="{ 'min-height': windowHeight+'px'}">
    <div class="order-bar"><van-nav-bar title="结算" :border="false" fixed left-text="" left-arrow></van-nav-bar></div>
    <div class="bar-empty"></div>

    <div class="address-session">
      <div class="address-bg"></div>
      <div v-if="1==1" class="bht-session address-info" bindtap="linkFunc" data-url="/page/my/pages/address/address?page_type=1">
        <div class="address-text">
          <div class="address-user flex-between">
            <div class="address-name p-nowrap">旅途</div>
            <div class="address-tel">15860069682</div>
            <div class="link-icon"><img class="img-100" src="@/assets/img/right.png" /></div>
          </div>
          <div class="address-detail">
            <div class="address-default" v-if="1==1">默认</div>
            <div class="p-nowrap">福州三盛滨江国际</div>
          </div>
        </div>
      </div>
      <div v-else class="bht-session address-info no-address flex-between" bindtap="linkFunc" data-url="">
        <img class="address-icon" src="@/assets/img/address_02.png" alt="">
        <div class="no-address-text">请选择收货地址</div>
        <div class="link-icon"><img class="img-100" src="@/assets/img/right.png" /></div>
      </div>
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
            <div class="order-action-text color-8f8f94">不支持退货
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
                <img class="img-100" src="@/assets/img/question_01.png" mode="" />
              </div>
            </div>
            <div class="order-buy-num">x1</div>
          </div>
        </div>
      </div>
    </div>

    <div class="cont-session common-list">
      <div class="common-item common-item-first">
        <div class="common-item-left">
          <div class="color-222 font-28 width-146">优惠券</div>
        </div>
        <div class="common-item-right">
          <!-- <div class="color-8f8f94 font-28">请选择</div> -->
          <div class="color-eb5841 font-28">满100减20</div>
          <div class="link-icon">
            <img class="img-100" src="@/assets/img/right.png" mode=""/>
          </div>
        </div>
      </div>
      <div class="common-item">
        <div class="common-item-left">
          <div class="checkbox-xfb cur flex-center"></div>
          <div class="color-222 font-28">可用800幸福币抵扣￥80.00</div>
        </div>
      </div>
    </div>

    <div class="cont-session goods-session detail-list-block">
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

    <div class="cont-session order-remarks">
      <div class="order-remarks-item">
        <div class="order-remarks-item-left color-222 font-28">订单备注:</div>
        <div class="shipping-address-item-right">
          <input class="color-222 font-28 order-remarks-text" type="text" placeholder="备注">
          <!-- <div class="color-222 font-28 order-remarks-text">电子商品做好防潮防摔措施</div> -->
        </div>
      </div>
    </div>

    <div class="cart-empty"></div>
    <div class="cart-bottom bottom-fixed">
      <div class="cart-data flex-align-center">
        <div class="all-price"><span>合计：</span>￥55</div>
        <div class="all-go flex-center" catchtap="payFunc">结算(2)</div>
      </div>
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
      windowHeight: document.documentElement.clientHeight
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
@import '../../../styles/order.css';
.app-body {
  background-color: #f2f2f4;
  font-size: 28px;
  overflow: hidden;
}
/* 收货地址 start */
.address-session {
  height: 183px;
  margin-bottom: 30px;
  position: relative;
}
.address-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  z-index: 2;
  background-image: linear-gradient(to right, #f9866b, #eb5841);
}
.address-info {
  height: 163px;
  border-radius: 10px;
  border: none;
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  z-index: 5;
  padding: 0 30px;
  display: flex;
  background: #fff url('../../../assets/img/address_bg.png') repeat-x -60px bottom/auto 8px;
}
.address-icon {
  width: 28px;
  height: 36px;
  margin-right: 20px;
}
.no-address-text {
  width: 300px;
  flex-grow: 1;
  color: #222222;
  font-size: 34px;
}
.link-icon {
  width: 12px;
  height: 22px;
  display: flex;
  margin-left: 12px;
}
  /* 有地址 */
.address-text {
  width: 600px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.address-user {
  height: 72px;
  line-height: 72px;
  color: #222;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.address-name {
  max-width: 380px;
  font-weight: bold;
  margin-right: 30px;
}
.address-tel {
  width: 200px;
  flex-grow: 1;
}
.address-detail {
  height: 30px;
  line-height: 30px;
  color: #919499;
  font-size: 24px;
  display: flex;
}
.address-default {
  flex-shrink: 0;
  height: 30px;
  width: 60px;
  line-height: 30px;
  color: #ffffff;
  font-size: 24px;
  text-align: center;
  border-radius: 2px;
  margin-right: 8px;
  background-image: linear-gradient(to right, #f9866b, #eb5841);
}
/* 收货地址 end */
.order-goods-info:last-child{
  padding-bottom: 30px;
}
.detail-list-block {
  padding-top: 25px;
}
.detail-price-list {
  border-top: none;
  padding-top: 0;
}
input.order-remarks-text {
  width: 504px;
  border: none;
  font-size: 28px;
}
.common-item {
  height: 106px;
}
.checkbox-xfb {
  width: 24px;
  height: 24px;
  border: 1px solid #eb5841;
  margin-right: 10px;
}
.checkbox-xfb.cur {
  background: url('../../../assets/img/tick3.png') no-repeat center center/100% 100%;
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
</style>

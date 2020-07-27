<template>
	<div class="app-body tf-bg" :style="{ 'min-height': windowHeight+'px'}">
    <div class="order-bar bar-white"><van-nav-bar title="商品详情" :border="false" fixed left-text="" left-arrow></van-nav-bar></div>
    <div class="bar-empty"></div>

    <div class="banner">
      <van-swipe @change="onChange">
        <van-swipe-item @click="predivPic">
          <img src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622112505_52991.png" alt="">
        </van-swipe-item>
        <van-swipe-item @click="predivPic">
          <img src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" alt="">
        </van-swipe-item>
        <div class="custom-indicator flex-center" slot="indicator">
          {{ current + 1 }}/2
        </div>
      </van-swipe>
    </div>
    <van-image-prediv
      v-model="show"
      :images="images"
      @change="onChange2"
    >
      <template v-slot:index>第{{index+1}}页</template>
    </van-image-prediv>

    <div class="goods-info goods-session">
      <div class="goods-name">日本拍立得相机富士mini90 复古造型皮质手感轻巧便携微单</div>
      <div class="goods-price"><span class="font-24">￥</span>3800.00 <span class="font-24 color-8f8f94">￥4000.00</span></div>
      <div class="happy-block"><div class="happy-coin">幸福币可抵￥100</div></div>
    </div>

    <div class="common-list goods-session">
      <div class="common-item">
        <div class="font-26 color-222">基础保障</div>
        <div class="link-icon">
          <img class="img-100" src="@/assets/img/right.png" />
        </div>
      </div>
    </div>

    <div class="goods-tip goods-session flex-align-center">
      <div class="tip-left flex-center">
        <img src="@/assets/img/icon_02.png" />
      </div>
      <div class="tip-right">
        <div>不享受优惠券</div>
        <div>不支持退换</div>
        <div>不可与满减红包叠加使用</div>
      </div>
    </div>

    <div class="goods-tip goods-session flex-align-center">
      <div class="tip-left logistics-left">
        <div>配送</div>
        <div>运费</div>
      </div>
      <div class="tip-right color-222">
        <div>上门自提（台江万达苏宁门店）</div>
        <div>免邮</div>
      </div>
    </div>

    <div class="goods-cont goods-session">
      <div class="goods-cont-tit">商品详情</div>
    </div>

    <div class="fixed-empty"></div>
    <div class="bottom-fixed operate-session flex-align-center">
      <div class="kf-btn flex-center">
        <img src="@/assets/img/icon_07.png" />
      </div>
      <div class="cart-btn flex-center">
        <img src="@/assets/img/icon_06.png" />
        <div class="cart-num">22</div>
      </div>
      <div class="add-btn" catchtap="showFunc" data-type="cart">加入购物车</div>
      <div class="buy-btn" catchtap="showFunc" data-type="buy">立即购买</div>
      <!-- <div class="add-btn btn-disabled">售罄</div> -->
    </div>

    <div v-show="false" class="ensure-mask bottom-fixed">
      <div class="shop-dclose" catchtap="ensureFunc"><img class="img-100" src="@/assets/img/close.png" /></div>
      <div class="ensure-header">基础保障</div>
      <div class="ensure-list">
        <div class="ensure-item">
          <div class="ensure-tit flex-align-center"><img src="@/assets/img/icon_03.png" />假一赔二</div>
          <div class="ensure-cont">正品保障，假一赔二</div>
        </div>
        <div class="ensure-item">
          <div class="ensure-tit flex-align-center"><img src="@/assets/img/icon_04.png" />破损 补寄</div>
          <div class="ensure-cont">签收48小时(食品24小时)内，商品破损/漏液并提供有效凭证的，24小时内响应补寄事宜。</div>
        </div>
        <div class="ensure-item">
          <div class="ensure-tit flex-align-center"><img src="@/assets/img/icon_05.png" />15天保价</div>
          <div class="ensure-cont">活动结束后15天内若发生降价，可举证申请差价双倍赔付。</div>
        </div>
      </div>
      <div class="submit-btn" catchtap="ensureFunc">确认</div>
    </div>
    <div v-show="false" class="mask-bg" catchtouchmove="true" catchtap="ensureFunc"></div>

    <div v-show="false" class="ensure-mask bottom-fixed">
      <div class="shop-dclose" catchtap="ensureFunc"><img class="img-100" src="@/assets/img/close.png" /></div>
      <div class="ensure-header">基础保障</div>
      <div class="ensure-list">
        <div class="ensure-item">
          <div class="ensure-tit flex-align-center"><img src="@/assets/img/icon_03.png" />假一赔二</div>
          <div class="ensure-cont">正品保障，假一赔二</div>
        </div>
        <div class="ensure-item">
          <div class="ensure-tit flex-align-center"><img src="@/assets/img/icon_04.png" />破损 补寄</div>
          <div class="ensure-cont">签收48小时(食品24小时)内，商品破损/漏液并提供有效凭证的，24小时内响应补寄事宜。</div>
        </div>
        <div class="ensure-item">
          <div class="ensure-tit flex-align-center"><img src="@/assets/img/icon_05.png" />15天保价</div>
          <div class="ensure-cont">活动结束后15天内若发生降价，可举证申请差价双倍赔付。</div>
        </div>
      </div>
      <div class="submit-btn" catchtap="ensureFunc">确认</div>
    </div>
    <div v-show="false" class="mask-bg" catchtouchmove="true" catchtap="ensureFunc"></div>
	</div>
</template>

<script>
// import '@/styles/life.css'
export default {
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      current: 0,

      show: false,
      index: 0,
      images: [
        'https://bht.liwushijian.com/library/uploads/image/20200622/20200622112505_52991.png',
        'https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png'
      ]
    }
  },
  methods: {
    onChange (index) {
      this.current = index
    },
    onChange2 (index) {
      this.index = index
    },
    predivPic () {
      this.show = true
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
/*轮播*/
.banner {
  width: 100%;
  height: 7.5rem;
  position: relative;
}
.banner .van-swipe {
  height: 100%;
}
.banner .van-swipe-item img {
  width: 100%;
  height: 100%;
}
.custom-indicator {
  position: absolute;
  bottom: 0.3rem;
  right: 0.3rem;
  width: 0.9rem;
  height: 0.44rem;
  border-radius: 0.22rem;
  background-color: rgba(0,0,0,0.5);
  color: #fff;
  font-size: 0.24rem;
}

.goods-session {
  background-color: #fff;
  margin-bottom: 0.3rem;
}
.goods-info {
  padding: 0.3rem 0.3rem 0.4rem;
}
.goods-name {
  color: #222;
  font-size: 0.34rem;
  line-height: 0.52rem;
  font-weight: bold;
  text-align: center;
}
.goods-price {
  line-height: 0.92rem;
  margin-top: 0.1rem;
  color: #eb5841;
  font-size: 0.42rem;
  text-align: center;
}
.happy-block {
  height: 0.6rem;
  display: flex;
}
.happy-coin {
  line-height: 0.6rem;
  height: 0.6rem;
  color: #ffa110;
  font-size: 0.24rem;
  padding: 0 0.28rem;
  background-color: #fff5e7;
  margin: 0 auto;
  border-radius: 0.3rem;
}

.link-icon {
  width: 0.15rem;
  height: 0.26rem;
}
.goods-tip {
  padding: 0.2rem 0;
  color: #8f8f94;
  font-size: 0.26rem;
}
.tip-left {
  width: 1rem;
  line-height: 0.44rem;
}
.tip-left img {
  width: 0.28rem;
  height: 0.28rem;
}
.tip-right{
  line-height: 0.44rem;
}
.logistics-left {
  padding-left: 0.3rem;
}

.goods-cont-tit {
  line-height: 1.1rem;
  text-align: center;
  font-size: 0.34rem;
  color: #383838;
}

/*基础保障*/
.ensure-mask {
  background-color: #fff;
  border-radius: 0.1rem 0.1rem 0 0;
  z-index: 102;
  padding: 0 0.3rem 0.4rem;
  color: #222;
}
.ensure-header {
  height: 1.12rem;
  line-height: 1.12rem;
  text-align: center;
  font-size: 0.34rem;
  font-weight: bold;
  position: relative;
}
/*.ensure-list {
  padding: 0 0.32rem;
}*/
.ensure-tit {
  font-size: 0.3rem;
  height: 0.44rem;
}
.ensure-tit img {
  width: 0.44rem;
  height: 0.44rem;
  margin-right: 0.20rem;
}
.ensure-cont {
  padding: 0.12rem 0 0.30rem 0.64rem;
  line-height: 0.4rem;
  color: #8f8f94;
  font-size: 0.26rem;
}
/*.ensure-mask .shops-btn {
  margin: 0.16rem auto;
}*/
.shop-dclose {
  display: flex;
  position: absolute;
  top: -0.9rem;
  right: 0.2rem;
  width: 0.7rem;
  height: 0.7rem;
  padding: 0.1rem;
}
.ensure-mask .submit-btn {
  color: #fff;
  font-size: 0.3rem;
}

/* 操作 start */
.fixed-empty {
  height: 0.58rem;
}
.operate-session {
  display: flex;
  height: 0.98rem;
  z-index: 20;
  background-color: #fff;
}
.kf-btn,.cart-btn {
  width: 1rem;
  height: 100%;
  position: relative;
}
.cart-num {
  position: absolute;
  top: 0.06rem;
  left: 0.39rem;
  min-width: 0.34rem;
  height: 0.34rem;
  line-height: 0.34rem;
  border-radius: 0.17rem;
  background-color: #eb5841;
  text-align: center;
  color: #fff;
  font-size: 0.24rem;
  padding: 0 0.05rem;
}
.operate-session img {
  width: 0.44rem;
  height: 0.44rem;
}
.cart-btn img {
  margin-left: -0.16rem;
}
.add-btn,.buy-btn {
  width: 2.75rem;
  height: 100%;
  flex-grow: 1;
  text-align: center;
  line-height: 0.98rem;
  color: #fff;
  font-size: 0.3rem;
}
.add-btn {
  background-color: #ffc017;
}
.buy-btn {
  background-color: #eb5841;
}
div.btn-disabled {
  background-color: #919499;
}
</style>

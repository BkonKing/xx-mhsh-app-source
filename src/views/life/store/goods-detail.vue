<template>
	<div class="app-body" :style="{ 'min-height': windowHeight+'px'}">
    <div class="order-bar bar-white"><van-nav-bar title="商品详情" :border="false" fixed @click-left="$router.go(-1)" left-arrow></van-nav-bar></div>
    <div class="bar-empty"></div>

    <div class="banner">
      <van-swipe @change="onChange">
        <van-swipe-item @click="predivPic(0)">
          <img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622112505_52991.png" />
        </van-swipe-item>
        <van-swipe-item @click="predivPic(1)">
          <img class="img-100" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" />
        </van-swipe-item>
        <div class="custom-indicator flex-center" slot="indicator">
          {{ current + 1 }}/2
        </div>
      </van-swipe>
    </div>

    <div class="flash-session flash-session-bg">
      <div class="flash-limit">
        <div class="flash-limit-l"></div>
        <div class="flash-limit-m">限量500件</div>
        <div class="flash-limit-r"></div>
      </div>
      <div v-if="1==2" class="flash-time">距离结束还剩12:12:12</div>
      <div v-else class="flash-time">今天23:00:00开始</div>
    </div>
    <!-- <div class="flash-session flash-over">
      <div>已结束</div>
    </div> -->

    <div class="goods-info goods-session">
      <div class="goods-name">日本拍立得相机富士mini90 复古造型皮质手感轻巧便携微单</div>

      <!-- <div class="goods-price"><span class="font-24">￥</span>3800.00 <span class="font-24 color-8f8f94 font-normal">￥4000.00</span></div> -->

      <!-- 闪购 -->
      <!-- <div class="goods-price activity-flash-price"><span class="font-30 color-209cff">限时闪购 </span><span class="font-24 color-209cff">￥</span>3800.00 <span class="font-24 color-8f8f94 font-normal">￥4000.00</span></div> -->
      
      <!-- 拼单 -->
      <div class="price-block">
        <div class="price-left">
          <div class="activity-limit-price activity-flash-price">预售价</div>
          <div class="activity-now-price activity-pay-price">到手价</div>
        </div>
        <div class="price-right">
          <div class="activity-flash-price"><span class="font-24">￥</span>120.01<div class="activity-old-price">￥130.02</div></div>
          <div class="activity-pay-price"><span class="font-24">￥</span>144</div>
        </div>
      </div>
      <div class="happy-block"><div class="happy-coin">幸福币可抵￥100</div></div>
    </div>

    <div class="goods-session collage-session">
      <div class="flex-between collage-header"><span>拼单</span>(新老用户均可参加)</div>
      <div class=" p-30">
        <div class="flex-between collage-step">
          <div>①选择商品</div>
          <div class="collage-step-icon"></div>
          <div>②支付开团</div>
          <div class="collage-step-icon"></div>
          <div>③分享好友</div>
          <div class="collage-step-icon"></div>
          <div>④成功(失败退款)</div>
        </div>
        <div class="collage-total flex-between">
          <div class="color-8f8f94">以下小伙伴正在发起拼单，可直接参与</div>
          <div class="color-222">8人拼单</div>
        </div>
        <div class="collage-list">
          <div class="collage-item flex-between">
            <div class="collage-user flex-align-center">
              <div class="collage-user-info">
                <img class="collage-user-photo" src="http://192.168.1.158/library/user_avatar/202007/0220/tx_39.jpg" />
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
                <img class="collage-user-photo" src="http://192.168.1.158/library/user_avatar/202007/0220/tx_39.jpg" />
                <div class="collage-user-name p-nowrap">旅途</div>
              </div>
              <div class="collage-user-info">
                <div class="collage-mask flex-center"><span></span><span></span><span></span></div>
                <img class="collage-user-photo" src="http://192.168.1.158/library/user_avatar/202007/2015/tx_42.jpg" />
              </div>
            </div>
            <div class="collage-item-right">
              <div class="collage-btn yq-btn">邀请好友</div>
              <div class="collage-need-num">还差 <span class="color-eb5841">1</span> 人</div>
            </div>
          </div>
          <div class="collage-item flex-between">
            <div class="collage-user flex-align-center">
              <div class="collage-user-info">
                <img class="collage-user-photo" src="http://192.168.1.158/library/user_avatar/202007/0220/tx_39.jpg" />
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
            </div>
            <div class="collage-item-right">
              <div class="collage-btn pd-btn">一起拼单</div>
              <div class="collage-need-num">还差 <span class="color-eb5841">3</span> 人</div>
            </div>
          </div>
        </div>
      </div>
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
      <!-- <div class="add-btn" catchtap="showFunc" data-type="cart">加入购物车</div>
      <div class="buy-btn" catchtap="showFunc" data-type="buy">立即购买</div> -->
      <!-- <div class="add-btn btn-disabled">售罄</div> -->
      <!-- <div class="add-btn" catchtap="showFunc" data-type="cart">加入购物车</div>
      <div class="buy-btn" catchtap="showFunc" data-type="buy">开抢提醒</div> -->
      <!-- <div class="buy-btn btn-linear" catchtap="showFunc" data-type="buy">立即购买</div> -->
      <div class="count-time">剩余12:59:59结束</div>
      <div class="buy-btn btn-linear" catchtap="showFunc" data-type="buy">立即购买</div>
    </div>

    <div v-show="false" class="publick-mask  bottom-fixed">
      <div class="publick-dclose" catchtap="ensureFunc"><img class="img-100" src="@/assets/img/close.png" /></div>
      <div class="shops-params">
        <div class="params-goods-info">
          <div class="params-goods-left">
            <img class="img-100" bindtap="bigPic2" src="https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png" data-src="" />
          </div>
          <div class="params-goods-right">
            <div>
              <div class="goods-name p-nowrapm">日本拍立得相机富士mini90 复古造型皮质手感轻巧便携微单</div>
              <div class="goods-price"><span class="font-24">￥</span>3800.00 <span class="font-24 color-8f8f94 font-normal">￥4000.00</span></div>
            </div>
            <div class="happy-block"><div class="happy-coin">幸福币可抵￥100</div></div>
          </div>
        </div>
      
        <div class="shops-dlist">
          <div class="shops-ditem">
            <div class="shops-dtit">规格</div>
            <div class="doption-list">
              <div class="shops-doption active" bindtap="typeFunc" data-typeval="index" data-typetext="33">蓝色</div>
              <div class="shops-doption" bindtap="typeFunc" data-typeval="index" data-typetext="33">绿色</div>
              <div class="shops-doption" bindtap="typeFunc" data-typeval="index" data-typetext="33">淡蓝色</div>
            </div>
          </div>
          <div class="shops-ditem">
            <div class="shops-dtit">数量</div>
            <div class="goods-num-count">
              <div class="goods-btn-block">
                <div class="goods-btn goods-sub" bindtap="countTab" data-types="-1">-</div>
                <div class="goods-num">2</div>
                <div class="goods-btn goods-add not-add" catchtap="goods.count>=skuList[typeVal].stock ? '' : 'countTab'" data-types="1">+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="submit-btn" catchtap="ensureFunc">确认</div>
    </div>
    <div v-show="false" class="mask-bg" catchtouchmove="true" catchtap="ensureFunc"></div>

    <div v-show="false" class="publick-mask bottom-fixed">
      <div class="goods-dclose" catchtap="ensureFunc"><img class="img-100" src="@/assets/img/close.png" /></div>
      <div class="public-header">基础保障</div>
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
import { Swipe, SwipeItem, Icon, ImagePreview, NavBar } from 'vant'
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon,
    [ImagePreview.name]: ImagePreview,
    [NavBar.name]: NavBar
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      id: '',   //商品id
      current: 0,

      // show: false,
      images: [
        'https://bht.liwushijian.com/library/uploads/image/20200622/20200622112505_52991.png',
        'https://bht.liwushijian.com/library/uploads/image/20200622/20200622114458_27364.png'
      ]
    }
  },
  created(){
    this.id = this.$route.query.id;
    console.log(this.id);
  },
  methods: {
    onChange (index) {
      this.current = index
    },
    predivPic(index) {
      ImagePreview({
      images: this.images,
      startPosition: index,
      onClose() {
        // do something
      }
    })
    }
  }
}
</script>

<style scoped>
@import '../../../styles/life.css';
.app-body {
  background-color: #f2f2f4;
  font-size: 28px;
  /*overflow: hidden;*/
}
/*轮播*/
.banner {
  width: 100%;
  height: 750px;
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
  bottom: 30px;
  right: 30px;
  width: 90px;
  height: 44px;
  border-radius: 22px;
  background-color: rgba(0,0,0,0.5);
  color: #fff;
  font-size: 24px;
}

.goods-session {
  background-color: #fff;
  margin-bottom: 30px;
}
.goods-info {
  padding: 30px 30px 40px;
}
.goods-name {
  color: #222;
  font-size: 34px;
  line-height: 52px;
  font-weight: bold;
  text-align: center;
}
.goods-price {
  line-height: 92px;
  margin-top: 10px;
  color: #eb5841;
  font-size: 42px;
  text-align: center;
  font-weight: bold;
}
.font-normal {
  font-weight: normal;
}
.happy-block {
  height: 60px;
  display: flex;
}
.happy-coin {
  line-height: 60px;
  height: 60px;
  color: #ffa110;
  font-size: 24px;
  padding: 0 28px;
  background-color: #fff5e7;
  margin: 0 auto;
  border-radius: 30px;
}

.link-icon {
  width: 15px;
  height: 26px;
}
.goods-tip {
  padding: 20px 0;
  color: #8f8f94;
  font-size: 26px;
  min-height: 100px;
}
.tip-left {
  width: 100px;
  line-height: 44px;
}
.tip-left img {
  width: 28px;
  height: 28px;
}
.tip-right{
  line-height: 44px;
}
.logistics-left {
  padding-left: 30px;
}

.goods-cont-tit {
  line-height: 110px;
  text-align: center;
  font-size: 34px;
  color: #383838;
}

/*基础保障*/
.ensure-tit {
  font-size: 30px;
  height: 44px;
}
.ensure-tit img {
  width: 44px;
  height: 44px;
  margin-right: 20px;
}
.ensure-cont {
  padding: 12px 0 30px 64px;
  line-height: 40px;
  color: #8f8f94;
  font-size: 26px;
}
.ensure-mask .submit-btn {
  color: #fff;
  font-size: 30px;
}

/* 操作 start */
.fixed-empty {
  height: 58px;
}
.operate-session {
  display: flex;
  height: 98px;
  z-index: 20;
  background-color: #fff;
}
.kf-btn,.cart-btn {
  width: 100px;
  height: 100%;
  position: relative;
}
.cart-num {
  position: absolute;
  top: 6px;
  left: 39px;
  min-width: 34px;
  height: 34px;
  line-height: 34px;
  border-radius: 17px;
  background-color: #eb5841;
  text-align: center;
  color: #fff;
  font-size: 24px;
  padding: 0 5px;
}
.operate-session img {
  width: 44px;
  height: 44px;
}
.cart-btn img {
  margin-left: -16px;
}
.add-btn,.buy-btn {
  width: 275px;
  height: 100%;
  flex-grow: 1;
  text-align: center;
  line-height: 98px;
  color: #fff;
  font-size: 30px;
}
.add-btn {
  background-color: #ffc017;
}
.buy-btn {
  background-color: #eb5841;
}
.buy-btn.btn-linear {
   background-image: linear-gradient(to right, #f9856b, #eb5841);
}
div.btn-disabled {
  background-color: #919499;
}

/*规格*/
.shops-params {
  position: relative;
  padding: 40px 0 0 0;
  min-height: 180px;
  background-color: #fff;
}
.params-goods-info {
  height: 230px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.params-goods-left {
  width: 230px;
  height: 100%;
  display: flex;
  flex-shrink: 0;
}
.params-goods-right {
  width: 431px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.params-goods-right .goods-name {
  font-size: 26px;
  line-height: 40px;
  text-align: left;
  margin-top: 6px;
}
.params-goods-right .goods-price {
  line-height: 76px;
  margin: 0 0 8px 0;
  font-size: 42px;
  text-align: left;
}
.params-goods-right .happy-coin {
  margin: 0;
}
.shops-dlist {
  max-height: 600px;
  overflow-y: auto;
}
.shops-ditem {
  overflow: hidden;
}
.shops-dtit {
  color: #222;
  padding-top: 10px;
  line-height: 86px;
}
.doption-list {
  display: flex;
  flex-wrap: wrap;
}
.shops-doption {
  color: #666;
  height: 66px;
  border: 2px solid #f2f2f4;
  line-height: 62px;
  margin: 0 20px 20px 0;
  background-color: #f2f2f4;
  border-radius: 4px;
  padding: 0 30px;
}
.shops-doption.active {
  background-color: #fdeeec;
  color: #eb5841;
  border-color: #eb5841;
}
.goods-num-count {
  display: flex;
  margin-bottom: 60px;
}
.goods-btn-block {
  height: 44px;
  border-radius: 2px;
  color: #aaa;
  font-size: 24px;
  display: flex;
}
.goods-btn {
  width: 47px;
  height: 100%;
  border: 1px solid #aaa;
  line-height: 42px;
  text-align: center;
  font-size: 30px;
}
.not-add.goods-btn {
  background-color: #eee;
}
.goods-num {
  float: left;
  width: 58px;
  height: 100%;
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
  box-sizing: border-box;
  min-height: 100%;
  text-align: center;
  line-height: 42px;
  color: #222;
}

/* 闪购、拼单 */
.flash-session {
  height: 98px;
  position: relative;
  background: #fff url('../../../assets/img/flash_01.png') center center/100% 100%;
}
.flash-session-bg.flash-session {
  background: #fff url('../../../assets/img/flash_03.png') center center/100% 100%;
}
.flash-session.flash-over {
  background: #fff url('../../../assets/img/flash_02.png') center center/100% 100%;
}
.flash-over div {
  color: #333;
  font-weight: bold;
  padding-left: 192px;
  text-align: center;
  line-height: 98px;
}
.flash-limit {
  /* height: 58px; */
  position: absolute;
  left: 200px;
  top: 20px;
  bottom: 20px;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.flash-limit-m {
  line-height: 58px;
  background-color: #209cff;
  padding: 0 6px;
  min-width: 126px;
  color: #fff;
  font-size: 24px;
  text-align: center;
}
.flash-limit-l,.flash-limit-r {
  width: 0;
  height: 0;
  border-style: solid;
}
.flash-limit-l {
  border-width: 29px 12px 29px 0;
  border-color: transparent #209cff transparent transparent;
}
.flash-limit-r {
  border-width: 29px 0 29px 12px;
  border-color: transparent transparent transparent #209cff;
}
.flash-time {
  float: right;
  color: #209cff;
  line-height: 98px;
  margin-right: 32px;
}
.activity-flash-price {
  color: #209cff;
}
.activity-old-price {
  margin-left: 8px;
  text-decoration: line-through;
  font-size: 24px;
  color: #8f8f94;
  font-weight: normal;
}
.activity-presale-price {
  color: #ffae00;
}
.activity-pay-price {
  color: #ff656f;
}
.price-block {
  display: flex;
  line-height: 61px;
  margin: 18px 0 24px;
}
.price-left {
  width: 260px;
  flex-shrink: 1;
  text-align: right;
  font-size: 30px;
}
.price-left div {
  line-height: 61px;
}
.price-right {
  flex-grow: 1;
  text-align: left;
  font-size: 42px;
  
}
.price-right div {
  height: 61px;
  line-height: 61px;
  font-weight: bold;
}
.price-right span {
  font-weight: bold;
}
.price-right .activity-old-price {
  display: inline;
}


  /* 拼单 */
.collage-header {
  height: 120px;
  background-color: #d2ebff;
  padding: 0 30px;
}
.collage-header-l {
  color: #209cff;
  font-size: 30px;
}
.collage-header-l span {
  font-size: 34px;
  font-weight: bold;
  padding-right: 6px;
}
.p-30 {
  padding: 0 30px;
}
.collage-step {
  height: 83px;
  font-size: 24px;
  color: #222;
  border-bottom: 1.5px dashed #aaa;
}
.collage-step-icon {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 9px 0 9px 10px;
  border-color: transparent transparent transparent #383838;
}
.collage-total {
  height: 84px;
  font-size: 24px;
}
.collage-item {
  height: 161px;
  padding-bottom: 30px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 30px;
}
.collage-item:last-child {
  border-bottom: 0;
}

.collage-user {
  height: 130px;
  width: 540px;
}
.collage-user-info {
  width: 88px;
  height: 100%;
  margin-right: 20px;
  position: relative;
}
.collage-user-photo {
  width: 100%;
  height: 88px;
  border-radius: 50%;
}
.collage-mask {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -44px;
  width: 88px;
  height: 88px;
  background-color: rgba(0,0,0,0.5);
  border-radius: 50%;
}
.collage-mask span {
  width: 8px;
  height: 8px;
  margin: 0 5px;
  background-color: #fff;
  border-radius: 50%;
}
.collage-user-name {
  width: 100%;
  line-height: 42px;
  text-align: center;
  color: #8f8f94;
  font-size: 22px;
}
.collage-item-right {
  width: 140px;
  height: 130px;
  overflow: hidden;
  text-align: center;
}
.collage-btn {
  width: 100%;
  height: 66px;
  line-height: 66px;
  border-radius: 10px;
  font-size: 26px;
  color: #fff;
  margin: 11px 0;
}
.collage-btn.yq-btn {
  background-color: #eb5841;
}
.collage-btn.pd-btn {
  background-color: #ffae00;
}
.collage-need-num {
  height: 42px;
  line-height: 42px;
  font-size: 24px;
  color: #222;
}
.count-time {
  width: 275px;
  color: #eb5841;
  font-size: 24px;
  padding-left: 26px;
  text-align: center;
}
</style>

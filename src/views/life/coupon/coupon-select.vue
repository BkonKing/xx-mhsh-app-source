<template>
	<div class="app-body" :style="{ 'min-height': windowHeight+'px'}">
		<div class="order-bar bar-white"><van-nav-bar title="优惠券" :border="false" fixed @click-left="$router.go(-1)" left-arrow></van-nav-bar></div>
	  <div class="bar-empty"></div>
    <div class="coupon-num">可用优惠券<span>（5张）</span></div>
		<div class="coupon-list">
	    <div class="coupon-item">
	      <div class="coupon-block flex-align-center">
	        <div class="coupon-info flex-align-center">
            <div v-if="1==1" class="coupon-price coupon-icon">
            	<div class="coupon-price-num"><span>￥</span>121</div>
            	<div class="coupon-icon-block">新人专享</div>
            </div>
            <div v-else class="coupon-price">6<span>折</span></div>
            <div class="coupon-line"></div>
            <div class="coupon-time">
            	<div>满150减20</div>
            	<div class="color-ffa110 font-24">还剩5天到期</div>
            </div>
          </div>
	        <div class="coupon-btn" bindtap="linkFunc" data-url="/page/tabBar/store/index">立即使用</div>
	      </div>
	      <div class="coupon-down">
	        <div :class="['toggle-btn',1==1 ? '' : 'toggle-btn-down']" bindtap="contToggle" data-id="index"></div>
	        <div class="toggle-box p-nowrap" v-if="1==1">
	          券前金额满1000元减200元，全场通用
	        </div>
	        <div class="coupon-detail" v-if="1==2">
	          <span>券编号：fafe60540</span>
	          <div>优惠说明：券前金额满150元减50元，全场通用</div>
	          <div>有效期：2019.05.05-2019.05.10</div>
	          <div>使用须知：</div>
	          <div class="point-bg">
	            <span v-html="msg"></span>
	          </div>
	          <div>
	            <span>领取时间：2019.05.05 10:00</span>
	          </div>
	        </div>
	      </div>
	    </div>
	    <div class="coupon-item">
	      <div class="coupon-block flex-align-center">
	        <div class="coupon-info flex-align-center">
            <div v-if="1==1" class="coupon-price">
            	<div class="coupon-price-num"><span>￥</span>121</div>
            </div>
            <div v-else class="coupon-price">6<span>折</span></div>
            <div class="coupon-line"></div>
            <div class="coupon-time">
            	<div>满150减20</div>
            	<div class="color-ffa110 font-24">还剩5天到期</div>
            </div>
          </div>
	        <div class="coupon-btn" bindtap="linkFunc" data-url="/page/tabBar/store/index">立即使用</div>
	      </div>
	      <div class="coupon-down">
	        <div :class="['toggle-btn',1==2 ? '' : 'toggle-btn-down']" bindtap="contToggle" data-id="index"></div>
	        <div class="toggle-box p-nowrap" v-if="1==2">
	          券前金额满1000元减200元，全场通用
	        </div>
	        <div class="coupon-detail" v-if="1==1">
	          <span>券编号：fafe60540</span>
	          <div>优惠说明：券前金额满150元减50元，全场通用</div>
	          <div>有效期：2019.05.05-2019.05.10</div>
	          <div>使用须知：</div>
	          <div class="point-bg">
	            <span v-html="msg"></span>
	          </div>
	          <div>
	            <span>领取时间：2019.05.05 10:00</span>
	          </div>
	        </div>
	      </div>
	    </div>
		</div>
		<div class="coupon-num unable-num">不可用优惠券<span>（1张）</span></div>
		<div class="coupon-list">
	    <div class="coupon-item coupon-invalid">
	      <div class="coupon-block flex-align-center">
	        <div class="coupon-info flex-align-center">
            <div v-if="1==1" class="coupon-price coupon-icon">
            	<div class="coupon-price-num"><span>￥</span>121</div>
            	<div class="coupon-icon-block">新人专享</div>
            </div>
            <div v-else class="coupon-price">6<span>折</span></div>
            <div class="coupon-line"></div>
            <div class="coupon-time">
            	<div>满150减20</div>
            	<div class="color-ffa110 font-24">还剩5天到期</div>
            </div>
          </div>
	        <div class="coupon-btn" bindtap="linkFunc" data-url="/page/tabBar/store/index">立即使用</div>
	      </div>
	      <div class="coupon-down">
	        <div :class="['toggle-btn',1==1 ? '' : 'toggle-btn-down']" bindtap="contToggle" data-id="index"></div>
	        <div class="toggle-box p-nowrap" v-if="1==1">
	          券前金额满1000元减200元，全场通用
	        </div>
	        <div class="coupon-detail" v-if="1==2">
	          <span>券编号：fafe60540</span>
	          <div>优惠说明：券前金额满150元减50元，全场通用</div>
	          <div>有效期：2019.05.05-2019.05.10</div>
	          <div>使用须知：</div>
	          <div class="point-bg">
	            <span v-html="msg"></span>
	          </div>
	          <div>
	            <span>领取时间：2019.05.05 10:00</span>
	          </div>
	        </div>
	      </div>
	    </div>
	    <div class="coupon-item coupon-invalid">
	      <div class="coupon-block flex-align-center">
	        <div class="coupon-info flex-align-center">
            <div v-if="1==1" class="coupon-price">
            	<div class="coupon-price-num"><span>￥</span>121</div>
            </div>
            <div v-else class="coupon-price">6<span>折</span></div>
            <div class="coupon-line"></div>
            <div class="coupon-time">
            	<div>满150减20</div>
            	<div class="color-ffa110 font-24">还剩5天到期</div>
            </div>
          </div>
	        <div class="coupon-btn" bindtap="linkFunc" data-url="/page/tabBar/store/index">立即使用</div>
	      </div>
	      <div class="coupon-down">
	        <div :class="['toggle-btn',1==1 ? '' : 'toggle-btn-down']" bindtap="contToggle" data-id="index"></div>
	        <div class="toggle-box p-nowrap" v-if="1==1">
	          券前金额满1000元减200元，全场通用
	        </div>
	        <div class="coupon-detail" v-if="1==2">
	          <span>券编号：fafe60540</span>
	          <div>优惠说明：券前金额满150元减50元，全场通用</div>
	          <div>有效期：2019.05.05-2019.05.10</div>
	          <div>使用须知：</div>
	          <div class="point-bg">
	            <span v-html="msg"></span>
	          </div>
	          <div>
	            <span>领取时间：2019.05.05 10:00</span>
	          </div>
	        </div>
	      </div>
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
      windowHeight: document.documentElement.clientHeight,
      typeVal: 1,
      navItems: ['未使用', '已使用', '已过期'],
      current: 0,
      msg: '一个订单只能使用一张优惠券；\n可与其他活动优惠同时享受（提示不可用券的除外）；\n订单申请退款，优惠券不退回；'
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

<style scoped  src="../../../styles/life.css"></style>
<style scoped  src="../../../styles/coupon.css"></style>
<style scoped>
.app-body {
	background-color: #f2f2f4;
	font-size: 28px;
}
.coupon-list .coupon-item:first-child {
	margin-top: 0;
}
.coupon-num {
  padding-top: 10px;
  line-height: 88px;
  font-size: 30px;
  padding-left: 50px;
  color: #222;
  font-weight: bold;
}
.coupon-num span {
	color: #8f8f94;
  font-weight: normal;
}
.coupon-num.unable-num {
	padding-top: 50px;
}
</style>

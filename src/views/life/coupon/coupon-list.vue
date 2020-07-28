<template>
	<div class="app-body tf-bg" :style="{ 'min-height': windowHeight+'px'}">
		<div class="order-bar bar-white"><van-nav-bar title="优惠券" :border="false" fixed left-text="" left-arrow></van-nav-bar></div>
	    <div class="bar-empty"></div>
		<div class="nav-empty"></div>
		<div class="nav-box">
		  <div class="nav-item cur" bindtap="navFun" data-typeval="1">未使用</div>
		  <div class="nav-item" bindtap="navFun" data-typeval="2">已使用</div>
		  <div class="nav-item" bindtap="navFun" data-typeval="3">已过期</div>
		</div>

		<div class="coupon-list">
	    <div :class="['coupon-item',typeVal==2||typeVal==3 ? 'coupon-invalid' : '']">
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
	        <div class="coupon-btn" v-if="typeVal==1" bindtap="linkFunc" data-url="/page/tabBar/store/index">立即使用</div>
	        <img class="invalid-icon" v-else-if="typeVal==2" src="@/assets/img/icon_10.png" />
	        <img class="invalid-icon" v-else src="@/assets/img/icon_09.png" />
	        <!-- <div class="coupon-btn" v-else-if="typeVal == 2"><span>已\n使\n用</span></div>
	        <div class="coupon-btn" v-else><span>已\n过\n期</span></div> -->
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
	    <div :class="['coupon-item',typeVal==2 ? 'coupon-item-ysy' : '',typeVal==3 ? 'coupon-item-ygq' : '']">
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
	        <div class="coupon-btn" v-if="typeVal==1" bindtap="linkFunc" data-url="/page/tabBar/store/index">立即使用</div>
	        <img class="invalid-icon" v-else-if="typeVal==2" src="@/assets/img/icon_10.png" />
	        <img class="invalid-icon" v-else src="@/assets/img/icon_09.png" />
	        <!-- <div class="coupon-btn" v-else-if="typeVal == 2"><span>已\n使\n用</span></div>
	        <div class="coupon-btn" v-else><span>已\n过\n期</span></div> -->
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
	</div>
</template>

<script>
// Vue.use(NavBar);
export default {
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
<style scoped>
@import '../../../styles/life.css';
@import '../../../styles/nav.css';
@import '../../../styles/coupon.css';
.app-body {
	background-color: #f2f2f4;
	font-size: 28px;
}
/* 导航 start */
.nav-item.cur::after {
  width: 92px;
  margin-left: -46px;
}
/* 导航 end */
</style>

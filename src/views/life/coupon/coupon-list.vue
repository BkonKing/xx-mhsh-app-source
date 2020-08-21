<template>
	<div class="app-body">
		<div class="order-bar bar-white"><van-nav-bar title="优惠券" :border="false" fixed left-text="" left-arrow></van-nav-bar></div>
	    <div class="bar-empty"></div>
		<div class="nav-empty"></div>
		<div class="nav-box" :style="{'margin-top':$store.state.paddingTop+'px'}">
			<div v-for="(item, index) in navItems" :class="[index == typeVal-1 ? 'cur' : '','nav-item']" @click="navFun(index+1)" data-typeval="1">{{item}}</div>
		  <!-- <div :class="['cur' : '','nav-item']" @click="navFun(1)" data-typeval="1">未使用</div>
		  <div class="nav-item" @click="navFun(2)" data-typeval="2">已使用</div>
		  <div class="nav-item" @click="navFun(3)" data-typeval="3">已过期</div> -->
		</div>

    <van-list
        v-model="loading"
        :finished="finished"
        finished-text=""
        @load="onLoad"
      >
      <div v-if="listData.length > 0" class="coupon-list">
        <div v-for="(item,index) in listData" :class="['coupon-item',typeVal==2||typeVal==3 ? 'coupon-invalid' : '']">
          <div class="coupon-block flex-align-center">
            <div class="coupon-info flex-align-center">
              <div v-if="item.type == 1" class="coupon-price coupon-icon">
                <div class="coupon-price-num"><span>￥</span>{{item.reduce_price}}</div>
                <div class="coupon-icon-block">新人专享</div>
              </div>
              <div v-else class="coupon-price">{{item.discount_num}}<span>折</span></div>
              <div class="coupon-line"></div>
              <div class="coupon-time">
                <div>{{item.coupon_name}}</div>
                <div class="color-ffa110 font-24">{{item.term_of_validity}}</div>
              </div>
            </div>
            <div class="coupon-btn" v-if="typeVal==1" @click="linkFunc()">立即使用</div>
            <img class="invalid-icon" v-else-if="typeVal==2" src="@/assets/img/icon_10.png" />
            <img class="invalid-icon" v-else src="@/assets/img/icon_09.png" />
          </div>
          <div class="coupon-down">
            <div :class="['toggle-btn',item.is_down ? 'toggle-btn-down' : '']" @click="contToggle(index)" data-id="index"></div>
            <div v-if="!item.is_down" class="toggle-box p-nowrap">
              {{item.coupon_explain}}
            </div>
            <div v-else class="coupon-detail">
              <span>券编号：{{item.coupon_code}}</span>
              <div>优惠说明：{{item.coupon_explain}}</div>
              <div>有效期：{{item.g_time2}}</div>
              <div>使用须知：</div>
              <div class="point-bg">
                <span v-html="item.coupon_rule"></span>
              </div>
              <div>
                <span>领取时间：{{item.ctime}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="empty-session">
        <img src="@/assets/img/empty_coupon.png" />
        <div>暂无优惠券</div>
      </div>
    </van-list>
      

		<div v-show="false" class="coupon-list">
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
	        <div class="coupon-btn" v-if="typeVal==1" @click="linkFunc" data-url="/page/tabBar/store/index">立即使用</div>
	        <img class="invalid-icon" v-else-if="typeVal==2" src="@/assets/img/icon_10.png" />
	        <img class="invalid-icon" v-else src="@/assets/img/icon_09.png" />
	        <!-- <div class="coupon-btn" v-else-if="typeVal == 2"><span>已\n使\n用</span></div>
	        <div class="coupon-btn" v-else><span>已\n过\n期</span></div> -->
	      </div>
	      <div class="coupon-down">
	        <div :class="['toggle-btn',1==2 ? '' : 'toggle-btn-down']" @click="contToggle" data-id="index"></div>
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
	        <div class="coupon-btn" v-if="typeVal==1" @click="linkFunc" data-url="/page/tabBar/store/index">立即使用</div>
	        <img class="invalid-icon" v-else-if="typeVal==2" src="@/assets/img/icon_10.png" />
	        <img class="invalid-icon" v-else src="@/assets/img/icon_09.png" />
	        <!-- <div class="coupon-btn" v-else-if="typeVal == 2"><span>已\n使\n用</span></div>
	        <div class="coupon-btn" v-else><span>已\n过\n期</span></div> -->
	      </div>
	      <div class="coupon-down">
	        <div :class="['toggle-btn',1==2 ? '' : 'toggle-btn-down']" @click="contToggle" data-id="index"></div>
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
import { NavBar, List } from 'vant'
import { getCoupon } from '@/api/life.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [List.name]: List,
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      typeVal: 1,
      navItems: ['未使用', '已使用', '已过期'],
      msg: '一个订单只能使用一张优惠券；\n可与其他活动优惠同时享受（提示不可用券的除外）；\n订单申请退款，优惠券不退回；',

      listData: [],   //数据列表
      page: 1,   //页码
      pageSize: 10,  //分页条数
      isEmpty: false, //是否为空
      loading: false,
      finished: false
    }
  },
  methods: {
    navFun (index) {
      this.typeVal = index;
      this.page = 1;
      this.loading = false;
      this.finished = false;
    },
    onLoad() {
      // 异步更新数据
      this.getData();
      return;
    },
    getData () {
      getCoupon({
        page: this.page,
        c_type: this.typeVal
      }).then(res => {
        if (res.success) {
          this.listData = this.page == 1 ? res.data : this.listData.concat(res.data);
          this.isEmpty = this.page == 1 && res.data.length ==0 ? true : false;
          if(res.data.length < res.pageSize){
            this.finished = true;
          }else {
            this.page = this.page+1;
          }
          this.loading = false;
        }
      })
    },
    contToggle(index){
      console.log(this.listData[index].is_down);
      this.listData[index].is_down = !this.listData[index].is_down;
    },
    linkFunc(type,obj={}) {
      switch (type){
        case 5:
        this.$router.push({
          path: '/store/goods-detail',
          query: {
            id: obj.id
          }
        })
        break;
      }
    },
  }
}
</script>
<style scoped  src="../../../styles/life.css"></style>
<style scoped  src="../../../styles/nav.css"></style>
<style scoped  src="../../../styles/coupon.css"></style>
<style scoped>
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

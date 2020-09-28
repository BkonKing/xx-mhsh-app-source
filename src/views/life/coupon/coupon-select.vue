<template>
	<div class="app-body">
		<div class="order-bar bar-white">
      <van-nav-bar
        title="优惠券"
        fixed
        :border="false"
        placeholder
        left-arrow
        @click-left="$router.go(-1)"
      ></van-nav-bar>
    </div>
	  <template v-if="ableNum">
	  	<div class="coupon-num">可用优惠券<span>（{{ableNum}}张）</span></div>
			<div class="coupon-list">
		    <div v-for="(item,index) in ableList" class="coupon-item">
          <div class="coupon-block flex-align-center">
            <div class="coupon-info flex-align-center">
              <template v-if="item.i_img">
                <div class="coupon-icon coupon-price">
                  <div v-if="item.type == 1" class="coupon-price-num"><span>￥</span>{{item.coupon_pay/100}}</div>
                  <div v-else class="coupon-price-num">{{item.discount_num}}<span>折</span></div>
                  <div class="coupon-icon-block"><img class="img-100" :src="item.i_img" /></div>
                </div>
              </template>
              <template v-else>
                <div v-if="item.type == 1" class="coupon-price"><span>￥</span>{{item.coupon_pay/100}}</div>
                <div v-else class="coupon-price">{{item.discount_num}}<span>折</span></div>
              </template>

              <!-- <div v-if="item.type == 1" class="coupon-price coupon-icon">
                <div class="coupon-price-num"><span>￥</span>{{item.coupon_pay/100}}</div>
                <div class="coupon-icon-block">{{item.coupon_name}}</div>
              </div>
              <div v-else class="coupon-price">{{item.discount_num}}<span>折</span></div> -->
              <div class="coupon-line"></div>
              <div class="coupon-time">
                <div>{{item.coupon_text}}</div>
                <div class="color-ffa110 font-24">{{item.term_of_validity}}</div>
              </div>
            </div>
            <div class="coupon-btn" @click="clickItem(index)">立即使用</div>
          </div>
          <div class="coupon-down">
            <div :class="['toggle-btn',item.is_down ? 'toggle-btn-down' : '']" @click="contToggle(index,1)" data-id="index"></div>
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
	  </template>
	  <template v-if="unableNum">
	  	<div class="coupon-num unable-num">不可用优惠券<span>（{{unableNum}}张）</span></div>
			<div class="coupon-list">
		    <div v-for="(item,index) in unableList" class="coupon-item coupon-invalid">
		      <div class="coupon-block flex-align-center">
		        <div class="coupon-info flex-align-center">
              <template v-if="item.i_img">
                <div class="coupon-icon coupon-price">
                  <div v-if="item.type == 1" class="coupon-price-num"><span>￥</span>{{item.coupon_pay/100}}</div>
                  <div v-else class="coupon-price-num">{{item.discount_num}}<span>折</span></div>
                  <div class="coupon-icon-block"><img class="img-100" :src="item.i_img" /></div>
                </div>
              </template>
              <template v-else>
                <div v-if="item.type == 1" class="coupon-price"><span>￥</span>{{item.coupon_pay/100}}</div>
                <div v-else class="coupon-price">{{item.discount_num}}<span>折</span></div>
              </template>
              <!-- <div v-if="item.type == 1" class="coupon-price coupon-icon">
                <div class="coupon-price-num"><span>￥</span>{{item.coupon_pay/100}}</div>
                <div class="coupon-icon-block">{{item.coupon_name}}</div>
              </div>
              <div v-else class="coupon-price">{{item.discount_num}}<span>折</span></div> -->
              <div class="coupon-line"></div>
              <div class="coupon-time">
                <div>{{item.coupon_text}}</div>
                <div class="color-ffa110 font-24">{{item.term_of_validity}}</div>
              </div>
            </div>
		        
		      </div>
		      <div class="coupon-down">
            <div :class="['toggle-btn',item.is_down ? 'toggle-btn-down' : '']" @click="contToggle(index,0)" data-id="index"></div>
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
  	</template>
	</div>
</template>

<script>
import { NavBar } from 'vant'
import { getSelectCoupon } from '@/api/life.js'
import eventBus from '@/api/eventbus.js';
export default {
  components: {
    [NavBar.name]: NavBar,
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      ableList: [],
      ableNum: 0,
      unableList: [],
      unableNum: 0,
    }
  },
  created(){
    this.prev_page = this.$route.query.prev_page;
    this.user_coupon_id = this.$route.query.user_coupon_id;
    this.total();
  },
  methods: {
  	/**
     * 计算商品数量/价格
     */
    total: function (e) {
      const that = this;
      let carts_arr = [];
      if (this.prev_page == 1){
        // carts_arr = JSON.parse(localStorage.getItem('cart2'))|| [];
        carts_arr = api.getPrefs({ sync: true, key: 'cart2' }) || [];
        if(carts_arr && carts_arr.length > 0){
          carts_arr = JSON.parse(carts_arr);
        }
      }else {
        // carts_arr = JSON.parse(localStorage.getItem('cart'))|| [];
        carts_arr = api.getPrefs({ sync: true, key: 'cart' }) || [];
        if(carts_arr && carts_arr.length > 0){
          carts_arr = JSON.parse(carts_arr);
        }
      }
      let carts_list = [];
      if (carts_arr && carts_arr.length > 0) {
        for (var j in carts_arr) {
          if (carts_arr[j].is_checked) {
            carts_list.push(carts_arr[j]);
          }
        }
        this.carts = carts_list;
      } else {
        return;
      }
      that.getData();
      return;
	  },
    getData () {
      getSelectCoupon({
        user_coupon_id: this.user_coupon_id,
        giftbag: JSON.stringify(this.carts),
      }).then(res => {
        if (res.success) {
          this.ableList = res.data.available;
          this.ableNum = res.data.available_num;
          this.unableList = res.data.disable;
          this.unableNum = res.data.disable_num;
        }
      })
    },
    contToggle(index,type){
    	if(type == 1){
    		this.ableList[index].is_down = !this.ableList[index].is_down;
    	}else {
        console.log(this.unableList[index]);
    		this.unableList[index].is_down = !this.unableList[index].is_down;
    	}
    },
    clickItem(index){
      //传递一个map，chooseCoupon是key，id是value
      var obj = {
      	user_coupon_id: this.ableList[index].user_coupon_id,
      	coupon_text: this.ableList[index].coupon_text,
      }
      eventBus.$emit('chooseCoupon',JSON.stringify(obj));
      //调用router回退页面
      this.$router.go(-1);
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

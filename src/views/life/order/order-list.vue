<template>
	<div class="app-body">
		<div class="order-bar bar-white">
			<van-nav-bar
	      :title="navHide ? titList[typeVal] : titList[0]"
	      :fixed="true"
	      :border="false"
	      placeholder
	      left-arrow
	      @click-left="$router.go(-1)"
	    ></van-nav-bar>
		</div>
		<div v-if="!navHide" class="nav-box-block">
			<div class="nav-box">
				<div v-for="(item, index) in navItems" :class="[typeVal == index ? 'cur' : '', 'nav-item']" @click="navFun(index)" data-typeval="1">{{item}}</div>
			</div>
		</div>
		
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text=""
        @load="onLoad"
      >
      <div v-if="listData.length > 0" class="order-list">
				<div v-for="(item, index) in listData" class="order-item" @click="linkFunc(item.order_type==1 ? 12 : 13,{id: item.id})">
					<div class="order-header">
						<div class="order-no">订单号：{{item.order_numb}}</div>
						<div :class="[item.order_status==3 || item.order_status==5 ? 'color-8f8f94' : 'color-eb5841','order-status']">{{item.order_status_name}}</div>
					</div>
					<div v-for="(goods, key) in item.order_goods_specs_list" :class="[key > 4 ? 'toggle-up' : '', item.is_toggle ? 'toggle-down' : '', 'order-goods-info']">
						<div class="order-pic-block">
							<img class="img-100" mode="aspectFill" :src="goods.specs_img"/>
						</div>
						<div class="order-info">
							<div class="order-name-price">
								<div class="order-name p-nowrap">{{goods.goods_name}}</div>
								<div class="order-price">￥{{goods.pay_price/100}}</div>
							</div>
							<div class="order-sku-num">
								<div class="order-sku p-nowrap">{{goods.specs_name}}</div>
								<div v-if="goods.y_pay_price && goods.y_pay_price!='0'" class="order-num">￥{{goods.y_pay_price/100}}</div>
							</div>
							<div class="order-action-session">
								<div class="order-action-text">
									<template v-if="goods.order_status_name">
										{{goods.order_status_name}}
									</template>
								</div>
								<div class="order-buy-num">x1</div>
							</div>
						</div>
					</div>
					<div @click.stop="toggle(index)" v-show="item.order_goods_specs_list.length > 5" :class="[item.is_toggle ? 'btn-up' : '', 'toggle-btn']">
						<img src="@/assets/img/icon_25.png" />
					</div>
					<div class="order-footer">
						<div class="order-total">
							<div class="color-8f8f94 font-24">共 {{item.goods_num}} 件</div>
							<div class="order-price-total">
								合计:<span>￥{{item.pay_price/100}}</span>
							</div>
						</div>
						<div class="order-btn-box">
							<div v-if="item.is_cancel_btn" class="order-border-btn" @click.stop="openSwal(index,item.order_id)">取消订单</div>
							<div v-if="item.is_logistics" class="order-border-btn" @click.stop="logisticsLink(index)">物流详情</div>
							<div @click.stop="payFunc(index,item.order_id)" v-if="item.is_again_pay_btn" class="order-border-btn paid-btn">付款(<van-count-down ref="countDown" :auto-start="true" :time="item.is_again_pay_time*1000-newTime" @finish="finish(index,item.order_id)">
	            <template v-slot="timeData">{{ timeData.hours<10 ? '0'+timeData.hours : timeData.hours }}:{{ timeData.minutes<10 ? '0'+timeData.minutes : timeData.minutes }}:{{ timeData.seconds<10 ? '0'+timeData.seconds : timeData.seconds }}
	            </template>
	          </van-count-down>)</div>
						</div>
					</div>
				</div>
			</div>
			<div v-else class="empty-session">
        <img src="@/assets/img/empty_order.png" />
        <div>暂无订单</div>
      </div>
    </van-list>
		<explain-swal 
    :show-swal="showExplainSwal"
    :swal-cont="swalCont"
    @closeSwal="closeExplainSwal"
    ></explain-swal>
    <pay-swal 
    :show-swal="showPaySwal"
    :pay-money="payMoney"
    :down-time="downTime"
    @closeSwal="closePaySwal"
    @sureSwal="surePaySwal"
    ></pay-swal>
    <remind-swal 
    :show-swal="showSwal"
    :remind-tit="remindTit"
    @closeSwal="closeSwal"
    @sureSwal="sureSwal()">
    </remind-swal>
	</div>
</template>

<script>
import { NavBar, CountDown, List } from 'vant'
import paySwal from './../components/pay-swal'
import explainSwal from './../components/explain-swal'
import remindSwal from './../components/remind-swal'
import { getOrderList, cancelNoPayOrder, cancelPayOrder, payOrderUp } from '@/api/life.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [CountDown.name]: CountDown,
    [List.name]: List,
    explainSwal,
    remindSwal,
    paySwal
  },
  data () {
    return {
      navItems: ['全部', '待付款', '待发货', '待收货', '退换'],
      titList: ['我的订单','待付款','待发货','待收货','退换'],
      showExplainSwal: false,  //弹窗
      swalCont: '贵重物品、贴身衣物、肉类果蔬生鲜商品、定制商品、虚拟商品、报纸期刊等，处于信息安全或者卫生考虑，不支持无理由退货。跨境商品不支持换货。',
      showSwal: false,                           //提醒弹窗
      remindTit: '确定取消订单', //提醒标题

	    typeVal: 0,          //tab切换index
	    navHide: false,
	 
	    time: 11 * 60 * 60 * 1000,
	    newTime: '',       //当前时间

	    listData: [],   //数据列表
      page: 1,   //页码
      pageSize: 10,  //分页条数
      isEmpty: false, //是否为空
      loading: false,
      finished: false,

      showPaySwal: false,   //支付方式弹窗
      payMoney: 0,          //支付金额
      downTime: 0,          //支付结束时间
    }
  },
  created(){
  	var type = this.$route.query.type;
  	if(type&&type!='undefined'){
  		this.typeVal = type;
  		this.navHide = true;
  	}
  	// console.log(this.$store.state.paddingTop)
  },
  methods: {
    navFun (index) {
      this.typeVal = index;
      this.initFunc();
    },
    onLoad() {
      // 异步更新数据
      this.getData();
      return;
    },
    getData () {
      getOrderList({
        page: this.page,
        page_type: this.typeVal
      }).then(res => {
        if (res.success) {
        	this.flag = true;
        	this.newTime = parseInt(new Date().getTime());
          this.listData = this.page == 1 ? res.data.order_project_list : this.listData.concat(res.data.order_project_list);
          this.isEmpty = this.page == 1 && res.data.order_project_list.length ==0 ? true : false;
          if(res.data.order_project_list.length < res.data.pageSize){
            this.finished = true;
            this.flag = true;
          }else {
            this.page = this.page+1;
            this.flag = false;
          }
          this.loading = false;
        }
      })
    },
    //倒计时开始
    start() {
      this.$refs.countDown.start();
    },
    //倒计时暂停
    pause() {
      this.$refs.countDown.pause();
    },
    //倒计时结束
    finish(index,id) {
      // Toast('倒计时结束');
      this.cancelOrder(index,id);
    },
    //再次付款
    payFunc(index,id){
    	this.downTime = this.listData[index].is_again_pay_time*1000-this.newTime;
    	this.payMoney = this.listData[index].pay_price/100;
    	this.showPaySwal = true;
    	this.payOderdId = id;
    },
    // 关闭支付选择弹窗
    closePaySwal(data){
      this.showPaySwal = data == 1 ? true : false;
    },
    surePaySwal(data){
      this.showPaySwal = false;
      payOrderUp({
        order_id: this.payOderdId,
        pay_type: data == 0 ? 1 : 2
      }).then(res => {
        if (res.success) {
          if(res.data){
            this.payOrderInfo = res.data;
            this.aliPayUp();
          }
        }
      })
    },
    //支付宝支付
    aliPayUp(){
      let that = this;
      var aliPayPlus = api.require('aliPayPlus'); 
      aliPayPlus.payOrder({ orderInfo: this.payOrderInfo }, 
        function(ret, err) { 
          that.initFunc(1);
          if(ret.code == '9000'){  //支付成功
            
          }
        }
      );
    },
    // 取消订单
    cancelOrder(index,id){
    	let that = this;
    	if(this.listData[index].is_pay == 0){ //未付款
    		cancelNoPayOrder({
	        order_project_id: this.listData[index].order_id,
	      }).then(res => {
	        if (res.success) {
	        	that.initFunc(1);
	        }
	      })
    	}else {
    		cancelPayOrder({
	        order_project_id: this.listData[index].order_id,
	      }).then(res => {
	        if (res.success) {
	        	that.initFunc(1);
	        }
	      })
    	}
    },
    //初始化列表
    initFunc(type=''){
    	this.listData = [];
      this.page = 1;
      this.loading = false;
      this.finished = false;
      if(!this.flag || type==1){
      	this.getData();
      }
    },
    // 打开弹窗
    openExplainSwal(){
      this.showExplainSwal = true;
    },
    // 关闭弹窗
    closeExplainSwal(data){
      this.showExplainSwal = data == 1 ? true : false;
    },
    //打开取消弹窗
    openSwal(index,id){
      this.clickIndex = index;
      this.clickId = id;
      this.showSwal = true;
    },
    //关闭取消弹窗
    closeSwal(data){
      this.showSwal = data == 1 ? true : false;
    },
    // 取消提醒回调
    sureSwal: function (e) {
      const that = this;
      this.closeSwal(0);
      console.log(this.clickIndex);
      this.cancelOrder(this.clickIndex,this.clickId);
    },
    //列表商品显示隐藏
    toggle (index) {
      this.listData[index].is_toggle = this.listData[index].is_toggle ? false : true;
    },
    linkFunc (type,obj={}) {
    	switch (type){
    		case 5:
    		this.$router.push({
	      	path: '/store/goods-detail',
	      	query: {
	      		id: obj.id
	      	}
	      })
    		break;
    		case 12:
    		this.$router.push({
	      	path: '/order/detail',
	      	query: {
	      		id: obj.id
	      	}
	      })
    		break;
    		case 13:
    		this.$router.push({
	      	path: '/order/special-detail',
	      	query: {
	      		id: obj.id
	      	}
	      })
    		break;
    		case 20:
    		this.$router.push({
	      	path: '/logistics/list',
	      	query: {
	      		id: 3
	      	}
	      })
    		break;
    	}
    },
    logisticsLink(index) {
    	var _this = this.listData[index];
      if(_this.project_logistice_count > 1 || (_this.project_logistice_count = 1 && _this.order_status == 1)){
      	this.$router.push({
          path: '/logistics/list',
          query: {
            id: _this.id
          }
        })
      }else {
      	if(_this.project_logistice_buy_type == 0){ //0快递 1自提 2商家配送
      		this.$router.push({
	          path: '/logistics/logistics-express',
	          query: {
	            id: _this.id
	          }
	        })
      	}else if(_this.project_logistice_buy_type == 1){
      		this.$router.push({
	          path: '/logistics/logistics-self',
	          query: {
	            id: _this.id
	          }
	        })
      	}else {
      		this.$router.push({
	          path: '/logistics/logistics-business',
	          query: {
	            id: _this.id
	          }
	        })
      	}
      }
    },
  }
}
</script>
<style scoped  src="../../../styles/life.css"></style>
<style scoped  src="../../../styles/order.css"></style>
<style scoped  src="../../../styles/nav.css"></style>
<style scoped>
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

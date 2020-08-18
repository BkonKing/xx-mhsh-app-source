<template>
	<div class="app-body">
		<div class="order-bar bar-white"><van-nav-bar title="我的订单" :border="false" fixed @click-left="$router.go(-1)" left-arrow></van-nav-bar></div>
		<div class="bar-empty"></div>
		<div class="nav-empty"></div>
		<div class="nav-box">
			<div v-for="(item, index) in navItems" :class="[typeVal == index ? 'cur' : '', 'nav-item']" @click="navFun(index)" data-typeval="1">{{item}}</div>
		</div>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text=""
        @load="onLoad"
      >
      <div class="order-list">
				<div v-for="(item, index) in listData" class="order-item" @click="linkFunc(item.order_type==1 ? 12 : 13,{id: item.id})">
					<div class="order-header">
						<div class="order-no">订单号：{{item.order_numb}}</div>
						<div class="order-status">{{item.order_status_name}}<text class="font-28 color-eb5841 text-right"></text></div>
					</div>
					<div v-for="(goods, key) in item.order_goods_specs_list" class="order-goods-info" @click.stop="linkFunc(5,{id:goods.goods_id})">
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
									<template v-if="goods.is_returnfund==1 || goods.is_return==1">
										{{goods.is_returnfund==1 ? '不支持退换' : '不支持退货'}}
									</template>
								</div>
								<div class="order-buy-num">x1</div>
							</div>
						</div>
					</div>
					<div v-show="item.order_goods_specs_list.length > 5" class="toggle-btn">111
						<img src="" />
					</div>
					<div class="order-footer">
						<div class="order-total">
							<div class="color-8f8f94 font-24">共 {{item.goods_num}} 件</div>
							<div class="order-price-total">
								合计:<span>￥{{item.pay_price/100}}</span>
							</div>
						</div>
						<div class="order-btn-box">
							<div v-if="item.is_cancel_btn" class="order-border-btn" @click.stop="cancelOrder(index,item.order_id)">取消订单</div>
							<div v-if="item.is_logistics" class="order-border-btn" @click.stop="logisticsLink(index)">物流详情</div>
							<div v-if="item.is_again_pay_btn" class="order-border-btn paid-btn">付款(<van-count-down ref="countDown" :auto-start="true" :time="item.is_again_pay_time*1000-newTime" @finish="finish">
	            <template v-slot="timeData">{{ timeData.hours<10 ? '0'+timeData.hours : timeData.hours }}:{{ timeData.minutes<10 ? '0'+timeData.minutes : timeData.minutes }}:{{ timeData.seconds<10 ? '0'+timeData.seconds : timeData.seconds }}
	            </template>
	          </van-count-down>)</div>
						</div>
					</div>
				</div>
			</div>
    </van-list>
		<!-- <div class="order-list">
			<div class="order-item" @click.stop="linkFunc(12)">
				<div class="order-header">
					<div class="order-no">订单号：20181106121211061223</div>
					<div class="order-status">配货中<text class="font-28 color-eb5841 text-right"></text></div>
				</div>
				<div class="order-goods-info" @click.stop="linkFunc(5,{id:12})">
					<div class="order-pic-block">
						<img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg"/>
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
							<div class="order-action-text">不支持退货
								<div class="order-action-btn">
									<img class="img-100" src="http://192.168.1.158/library/img/xcx_img/activity/question_01.png" mode="" />
								</div>
							</div>
							<div class="order-buy-num">x1</div>
						</div>
					</div>
				</div>
				<div class="order-goods-info" @click.stop="linkFunc(5,{id:12})">
					<div class="order-pic-block">
						<img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg"/>
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
							<div class="order-action-text">不支持退货
								<div class="order-action-btn">
									<image class="order-action-pic" src="http://192.168.1.158/library/img/xcx_img/activity/question_01.png" mode=""></image>
								</div>
							</div>
							<div class="order-buy-num">x1</div>
						</div>
					</div>
				</div>
				<div v-show="false" class="toggle-btn">111
					<image src="" mode=""></image>
				</div>
				<div class="order-footer">
					<div class="order-total">
						<div class="color-8f8f94 font-24">共 1 件</div>
						<div class="order-price-total">
							合计:<span>￥200.00</span>
						</div>
					</div>
					<div class="order-btn-box">
						<div class="order-border-btn" @click.stop="linkFunc(20)">物流详情</div>
						<div class="order-border-btn paid-btn">付款(<van-count-down ref="countDown" :auto-start="true" :time="time" @finish="finish">
            <template v-slot="timeData">{{ timeData.hours }}:{{ timeData.minutes }}:{{ timeData.seconds }}
            </template>
          </van-count-down>)</div>
					</div>
				</div>
			</div>
			<div class="order-item" @click.stop="linkFunc(13)">
				<div class="order-header">
					<div class="order-no">订单号：20181106121211061223</div>
					<div class="order-status">配货中<text class="font-28 color-eb5841 text-right"></text></div>
				</div>
				<div class="order-goods-info" @click.stop="linkFunc(5,{id:12})">
					<div class="order-pic-block">
						<img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg"/>
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
							<div class="order-action-text">不支持退货
								<div class="order-action-btn">
									<image class="order-action-pic" src="http://192.168.1.158/library/img/xcx_img/activity/question_01.png" mode=""></image>
								</div>
							</div>
							<div class="order-buy-num">x1</div>
						</div>
					</div>
				</div>
				<div class="order-total">
					<div class="color-8f8f94 font-24">共 1 件</div>
					<div class="order-price-total">
						合计:<span>￥200.00</span>
					</div>
				</div>
				<div class="order-btn-box">
					<div class="order-border-btn" @click.stop="linkFunc(20)">物流详情</div>
					<div class="order-border-btn" @click.stop="linkFunc(20)">物流详情</div>
				</div>
			</div>
		</div> -->
		<explain-swal 
    :show-swal="showExplainSwal"
    :swal-cont="swalCont"
    @closeSwal="closeExplainSwal"
    ></explain-swal>
	</div>
</template>

<script>
import { NavBar, CountDown, List } from 'vant'
import explainSwal from './../components/explain-swal'
import { getOrderList } from '@/api/life.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [CountDown.name]: CountDown,
    [List.name]: List,
    explainSwal
  },
  data () {
    return {
      navItems: ['全部', '待付款', '待发货', '待收货', '退换'],
      showExplainSwal: false,  //弹窗
      swalCont: '贵重物品、贴身衣物、肉类果蔬生鲜商品、定制商品、虚拟商品、报纸期刊等，处于信息安全或者卫生考虑，不支持无理由退货。跨境商品不支持换货。',

	    typeVal: 0,          //tab切换index
	 
	    time: 11 * 60 * 60 * 1000,
	    newTime: '',       //当前时间

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
    	this.listData = [];
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
      getOrderList({
        page: this.page,
        page_type: this.typeVal
      }).then(res => {
        if (res.success) {
        	this.newTime = parseInt(new Date().getTime());
          this.listData = this.page == 1 ? res.data.order_project_list : this.listData.concat(res.data.order_project_list);
          this.isEmpty = this.page == 1 && res.data.order_project_list.length ==0 ? true : false;
          if(res.data.order_project_list.length < res.data.pageSize){
            this.finished = true;
          }else {
            this.page = this.page+1;
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
    finish() {
      Toast('倒计时结束');
    },
    // 取消订单
    cancelOrder(index,id){

    },
    // 打开弹窗
    openExplainSwal(){
      this.showExplainSwal = true;
    },
    // 关闭弹窗
    closeExplainSwal(data){
      this.showExplainSwal = data == 1 ? true : false;
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
      if(_this.project_logistice_count > 1){
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

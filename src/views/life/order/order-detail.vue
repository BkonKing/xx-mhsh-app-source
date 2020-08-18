<template>
	<div class="app-body" :style="{ 'min-height': windowHeight+'px'}">
		<div class="order-bar"><van-nav-bar title="订单详情" :border="false" fixed @click-left="$router.go(-1)" left-arrow></van-nav-bar></div>
		<div class="bar-empty"></div>
		<div class="order-session">
			<div class="order-header-bg"></div>
			<div class="order-status-session">
				<div class="order-status-name">{{orderInfo.order_status_name}}</div>
				<div v-if="orderInfo.is_again_pay_btn" class="order-status-tip">剩余<van-count-down ref="countDown" :auto-start="true" :time="orderInfo.is_again_pay_time*1000-newTime" @finish="finish">
	            <template v-slot="timeData">{{ timeData.hours<10 ? '0'+timeData.hours : timeData.hours }}:{{ timeData.minutes<10 ? '0'+timeData.minutes : timeData.minutes }}:{{ timeData.seconds<10 ? '0'+timeData.seconds : timeData.seconds }}
	            </template>
	          </van-count-down> 自动取消订单</div>
	      <div v-else class="order-status-tip">{{orderInfo.order_status_text_name}}</div>
			</div>
			<div class="cont-session goods-session">
				<div v-for="(item, index) in goodsList" class="order-goods-info">
					<div class="order-pic-block">
						<img class="img-100" mode="aspectFill" :src="item.specs_img"></img>
					</div>
					<div class="order-info">
						<div class="order-name-price">
							<div class="order-name p-nowrap">{{item.goods_name}}</div>
							<div class="order-price">￥{{item.pay_price/100}}</div>
						</div>
						<div class="order-sku-num">
							<div class="order-sku p-nowrap">{{item.specs_name}}</div>
							<div v-if="item.y_pay_price && item.y_pay_price!='0'" class="order-num">￥{{item.y_pay_price/100}}</div>
						</div>
						<div class="order-action-session">
							<div @click.stop="openExplainSwal" class="order-action-text">
								<template v-if="item.is_returnfund==0 || item.is_return==0">
									{{item.is_returnfund==0 ? '不支持退换' : '不支持退货'}}
									<div class="order-action-btn">
										<img class="img-100" src="@/assets/img/question_01.png" mode="" />
									</div>
								</template>
							</div>
							<div class="order-buy-num">x1</div>
						</div>
					</div>
					<div v-if="item.is_shouhou_btn == 1" class="order-goods-btn">
						<div @click.stop="linkFunc(14,{logistice_id: item.logistice_id})" class="order-border-btn" hover-class="none">申请退换</div>
					</div>
					<div class="order-goods-btn">
						<div v-if="item.is_barter_btn == 1" class="order-border-btn" hover-class="none">换货详情</div>
						<div v-if="item.is_refund_btn == 1" class="order-border-btn" hover-class="none">申请退换</div>
						<div v-if="item.is_returnfund_btn == 1" class="order-border-btn" hover-class="none">申请退换</div>
					</div>
				</div>
				<!-- <div class="order-goods-info">
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
							<div class="order-action-text color-8f8f94"></div>
							<div class="order-buy-num">x1</div>
						</div>
					</div>
					<div class="order-goods-btn">
						<div class="order-border-btn" hover-class="none">申请退换</div>
					</div>
				</div> -->
				<div class="detail-price-list">
					<div class="detail-price-item">
						<div>商品总价</div>
						<div>￥{{orderInfo.goods_price_total/100}}</div>
					</div>
					<div v-if="orderInfo.freight && orderInfo.freight!=0" class="detail-price-item">
						<div>运费</div>
						<div>￥{{orderInfo.freight/100}}</div>
					</div>
					<div v-if="orderInfo.coupon_money && orderInfo.coupon_money!=0" class="detail-price-item">
						<div>优惠券</div>
						<div>-￥{{orderInfo.coupon_money/100}}</div>
					</div>
					<div v-if="orderInfo.happiness_price && orderInfo.happiness_price!=0" class="detail-price-item">
						<div>幸福币抵扣</div>
						<div>-￥{{orderInfo.happiness_price/100}}</div>
					</div>
				</div>
				<div class="order-total order-total-detail">
					<div class="color-8f8f94 font-24">共 {{orderInfo.goods_num}} 件</div>
					<div class="order-price-total">
						合计:<span>￥{{orderInfo.pay_price/100}}</span>
					</div>
				</div>
			</div>
			<div class="cont-session address-logistics">
				<div class="shipping-address">
					<div class="shipping-address-item">
						<div class="shipping-address-item-left color-222 font-28">收货地址:</div>
						<div class="shipping-address-item-right">
							<div class="shipping-address-username p-nowrap">{{orderInfo.rece_realname}}</div>
							<div class="color-222 font-28">{{orderInfo.rece_mobile}}</div>
						</div>
					</div>
					<div class="shipping-address-item">
						<div class="shipping-address-item-left"></div>
						<div class="shipping-address-item-right">
							<div class="shipping-address-text p-nowrap">{{orderInfo.rece_address}}</div>
						</div>
					</div>
				</div>
				<div v-if="logisticsInfo" class="shipping-logistics">
					<div v-if="logisticsInfo.l_status == 0" class="shipping-address-item">
						<div class="shipping-address-item-left color-222 font-28">物流配送:</div>
						<div class="shipping-address-item-right">
							<div class="color-222 font-28">{{logisticsInfo.kuaidi_name}}</div>
							<div class="color-8f8f94 font-28">({{logisticsInfo.kuaidi_numb}})</div>
							<img class="shipping-address-icon" src="" mode="" />
						</div>
					</div>
					<div v-else class="shipping-address-item">
						<div class="shipping-address-item-left color-222 font-28">物流配送:</div>
						<div class="shipping-address-item-right">
							<div class="color-222 font-28">{{logisticsInfo.kuaidi_name}}</div>
							<div class="color-8f8f94 font-28">(已签收)</div>
							<img class="shipping-address-icon" src="" mode="" />
						</div>
					</div>
					<div v-if="logisticsInfo.l_status == 0" class="shipping-logistics-item">
						<div class="shipping-address-item-left"></div>
						<div class="shipping-address-item-right shipping-logistics-item-right">
							<div class="shipping-logistics-point"></div>
							<div class="shipping-logistics-line"></div>
							<div class="shipping-logistics-text">{{logisticsInfo.kd_data.data[0].context}}<br />{{logisticsInfo.kd_data.data[0].time}}</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="orderInfo.user_explain" class="cont-session order-remarks">
				<div class="order-remarks-item">
					<div class="order-remarks-item-left color-222 font-28">订单备注:</div>
					<div class="shipping-address-item-right">
						<div class="color-222 font-28 order-remarks-text">{{orderInfo.user_explain}}</div>
					</div>
				</div>
			</div>
			<div class="cont-session order-message">
				<div class="order-message-item">
					<div class="order-message-item-left color-8f8f94 font-28">订单编号:</div>
					<div class="color-8f8f94 font-28 order-message-item-right">{{orderInfo.order_numb}}</div>
					<div class="copy-btn" @click="copy_cont(orderInfo.order_numb)">
						<div class="copy-text">复制</div>
					</div>
				</div>
				<div class="order-message-item">
					<div class="order-message-item-left color-8f8f94 font-28">下单时间:</div>
					<div class="color-8f8f94 font-28 order-message-item-right">{{orderInfo.ctime}}</div>
				</div>
				<div v-if="orderInfo.payment_type_name" class="order-message-item">
					<div class="order-message-item-left color-8f8f94 font-28">支付方式:</div>
					<div class="color-8f8f94 font-28 order-message-item-right">{{orderInfo.payment_type_name}}</div>
				</div>
				<div v-if="orderInfo.pay_time" class="order-message-item">
					<div class="order-message-item-left color-8f8f94 font-28">支付时间:</div>
					<div class="color-8f8f94 font-28 order-message-item-right">{{orderInfo.pay_time}}</div>
				</div>
			</div>
		</div>

		<template v-if="orderInfo.is_cancel_btn || orderInfo.is_again_pay_btn || orderInfo.is_logistice_btn">
			<div class="fixed-empty"></div>
			<div class="btn-fixed-buttom">
				<div v-if="orderInfo.is_cancel_btn" @click="cancelOrder" class="order-border-btn" hover-class="none">取消订单</div>
				<template v-if="orderInfo.is_logistice_btn">
					<div @click="logisticsLink" class="order-border-btn" hover-class="none">物流详情</div>
				</template>
				<div v-if="orderInfo.is_again_pay_btn" class="order-border-btn paid-btn">付款(<van-count-down ref="countDown" :auto-start="true" :time="orderInfo.is_again_pay_time*1000-newTime" @finish="finish">
	            <template v-slot="timeData">{{ timeData.hours<10 ? '0'+timeData.hours : timeData.hours }}:{{ timeData.minutes<10 ? '0'+timeData.minutes : timeData.minutes }}:{{ timeData.seconds<10 ? '0'+timeData.seconds : timeData.seconds }}
	            </template>
	          </van-count-down>)</div>
			</div>
		</template>
		<explain-swal 
    :show-swal="showExplainSwal"
    :swal-cont="swalCont"
    @closeSwal="closeExplainSwal"
    ></explain-swal>
	</div>
</template>

<script>
import { NavBar, CountDown } from 'vant'
import explainSwal from './../components/explain-swal'
import { getOrderDetail } from '@/api/life.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [CountDown.name]: CountDown,
    explainSwal
  },
  data () {
    return {
    	windowHeight: document.documentElement.clientHeight,
    	showExplainSwal: false,  //弹窗
    	swalCont: '贵重物品、贴身衣物、肉类果蔬生鲜商品、定制商品、虚拟商品、报纸期刊等，处于信息安全或者卫生考虑，不支持无理由退货。跨境商品不支持换货。',
    	newTime: '',       //当前时间
    	time: 11 * 60 * 60 * 1000,
    	goodsList: [],
    	orderInfo: '',
    	logisticsInfo: ''
    }
  },
  created(){
    this.order_id = this.$route.query.id;
    this.getData();
  },
  methods: {
  	getData () {
      getOrderDetail({
        order_project_id: this.order_id
      }).then(res => {
        if (res.success) {
        	this.goodsList = res.order_goods_specs_list;
        	this.orderInfo = res.order_project_info;
        	this.logisticsInfo = res.logistice_info;
        	this.newTime = parseInt(new Date().getTime());
        	console.log(this.orderInfo.goods_price_total);
        }
      })
    },
  	// 打开弹窗
  	openExplainSwal(){
      this.showExplainSwal = true;
    },
  	// 关闭弹窗
  	closeExplainSwal(data){
      this.showExplainSwal = data == 1 ? true : false;
    },
    // 取消订单
    cancelOrder(){

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
    copy_cont(text_c){
      var clipBoard = api.require('clipBoard');
      clipBoard.set({
        value: text_c
      }, function(ret, err) {
        if (ret) {
            Toast('复制成功');
        } else {
            alert(JSON.stringify(err));
        }
      });
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
        case 14:
        this.$router.push({
          path: '/order/order-apply',
          query: {
            id: this.order_id,
            logistice_id: obj.logistice_id
          }
        })
        break;
      }
    },
    logisticsLink() {
      if(this.orderInfo.project_logistice_count > 1){
      	this.$router.push({
          path: '/logistics/list',
          query: {
            id: this.orderInfo.order_id
          }
        })
      }else {
      	if(this.orderInfo.project_logistice_buy_type == 0){ //0快递 1自提 2商家配送
      		this.$router.push({
	          path: '/logistics/logistics-express',
	          query: {
	            id: this.orderInfo.order_id
	          }
	        })
      	}else if(this.orderInfo.project_logistice_buy_type == 1){
      		this.$router.push({
	          path: '/logistics/logistics-self',
	          query: {
	            id: this.orderInfo.order_id
	          }
	        })
      	}else {
      		this.$router.push({
	          path: '/logistics/logistics-business',
	          query: {
	            id: this.orderInfo.order_id
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
<style scoped>
.app-body {
	background-color: #f2f2f4;
	font-size: 28px;
	width: 100%;
}
</style>

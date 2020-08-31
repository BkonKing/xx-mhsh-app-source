<template>
	<div class="app-body">
		<div class="order-bar">
			<van-nav-bar
        title="退款详情"
        fixed
        :border="false"
        placeholder
        left-arrow
        @click-left="$router.go(-1)"
      ></van-nav-bar>
		</div>
		<div class="order-session">
			<div class="order-header-bg"></div>
			<div class="order-status-session">
				<div class="order-status-name">{{infoData.order_status_name}}</div>
				<div class="order-status-tip">{{infoData.order_status_name2}}</div>
			</div>
			<div class="cont-session goods-session">
				<div v-for="(item,index) in goodsList" class="order-goods-info">
					<div class="order-pic-block">
						<img class="img-100" mode="aspectFill" :src="item.specs_img" />
					</div>
					<div class="order-info">
						<div class="order-name-price">
							<div class="order-name p-nowrap">{{item.goods_name}}</div>
							<div class="order-price">￥{{item.pay_price/100}}</div>
						</div>
						<div class="order-sku-num">
							<div class="order-sku p-nowrap">{{item.specs_name}}</div>
							<div class="order-num color-222" v-if="item.happiness_price!=0">幸福币{{item.happiness_price/10}}</div>
						</div>
						<div class="order-action-session">
							<div class="order-action-text">{{item.order_status_name}}</div>
							<div class="order-buy-num">x1</div>
						</div>
					</div>
					<div v-if="item.reason_type!=''" class="apply-select flex-between">
						<div class="select-left">
							<div>退款原因：{{item.reason_type}}</div>
						</div>
					</div>
				</div>
				<div class="detail-price-list">
					<div class="flex-sart-item">
						<div class="color-222 font-28 flex-sart-item-left">退款编号：</div>
						<div class="color-222 font-28">{{typeVal == 1 ? infoData.refund_numb : infoData.returnfund_numb}}</div>
					</div>
					<div class="flex-sart-item">
						<div class="color-222 font-28 flex-sart-item-left">申请时间：</div>
						<div class="color-222 font-28">{{infoData.ctime}}</div>
					</div>
					<div v-if="infoData.refund_time" class="flex-sart-item">
						<div class="color-222 font-28 flex-sart-item-left">退款时间：</div>
						<div class="color-222 font-28">{{infoData.refund_time}}</div>
					</div>
					<div v-if="infoData.cancel_time" class="flex-sart-item">
						<div class="color-222 font-28 flex-sart-item-left">取消时间：</div>
						<div class="color-222 font-28">{{infoData.cancel_time}}</div>
					</div>
				</div>
				<div class="order-total order-total-detail">
					<div class="color-8f8f94 font-24">共 {{typeVal == 1 ? infoData.refund_num : infoData.return_num}} 件</div>
				</div>
			</div>
			<!-- <div class="cont-session address-logistics">
				<div class="shipping-address">
					<div class="shipping-address-item">
						<div class="shipping-address-item-left color-222 font-28">收货地址:</div>
						<div class="shipping-address-item-right">
							<div class="color-222 font-28 shipping-address-username">安琪拉安琪拉安琪拉安琪拉</div>
							<div class="color-222 font-28">15000112233</div>
						</div>
					</div>
					<div class="shipping-address-item">
						<div class="shipping-address-item-left"></div>
						<div class="shipping-address-item-right">
							<div class="color-8f8f94 font-24 shipping-address-text">福建省福州市仓山区下渡街道三盛滨江国际三盛滨江国</div>
						</div>
					</div>
				</div>
				<div class="shipping-logistics">
					<div class="shipping-address-item">
						<div class="shipping-address-item-left color-222 font-28">物流配送:</div>
						<div class="shipping-address-item-right">
							<div class="color-222 font-28">顺丰速运</div>
							<div class="color-8f8f94 font-28">(SF123456789002)</div>
							<image class="shipping-address-icon" src="../../../static/LoginSuccess.png" mode=""></image>
						</div>
					</div>
					<div class="shipping-logistics-item">
						<div class="shipping-address-item-left"></div>
						<div class="shipping-address-item-right shipping-logistics-item-right">
							<div class="shipping-logistics-point"></div>
							<div class="shipping-logistics-line"></div>
							<div class="color-8f8f94 font-24 shipping-logistics-text">快递已到达仓山区菜鸟驿站\n2020-07-02 10:00:00</div>
						</div>
					</div>
				</div>
			</div> -->
			<template v-if="(typeVal ==1&&infoData.order_status<2)||(typeVal ==2&&infoData.order_status<5)">
				<div class="cont-session order-message">
					<div class="order-tip-item">
						<div class="order-tip-item-left order-tip-text color-222 font-28">退款总额:</div>
						<div class="color-222 font-28 order-tip-text">{{infoData.pay_text}}</div>
					</div>
					<div v-if="infoData.reason_text" class="order-tip-item">
						<div class="order-tip-item-left order-tip-text color-222 font-28">退款说明:</div>
						<div class="order-tip-item-right color-222 font-28 order-tip-text">{{infoData.reason_text}}</div>
					</div>
					<template v-if="typeVal==2">
						<template v-if="infoData.order_status == 1">
							<div class="shipping-address">
								<div class="shipping-address-item">
									<div class="shipping-address-item-left color-222 font-28">退货地址:</div>
									<div class="shipping-address-item-right">
										<div class="shipping-address-username p-nowrap">{{infoData.tuihuo1}}</div>
									</div>
								</div>
								<div class="shipping-address-item">
									<div class="shipping-address-item-left"></div>
									<div class="shipping-address-item-right">
										<div class="shipping-address-text p-nowrap">{{infoData.tuihuo2}}</div>
									</div>
								</div>
							</div>
							<div @click="linkFunc(19)" class="order-tip-item">
								<div class="order-tip-item-left order-tip-text color-222 font-28">退货物流: </div>
								<div class="color-eb5841 font-28 order-tip-text">请及时寄出并填写物流单号</div>
								<img class="shipping-address-icon" src="@/assets/img/right.png" />
							</div>
						</template>
						<template v-else>
							<template v-if="go_logistice_info">
								<div @click="linkFunc(22,{id:go_logistice_info.id})" v-if="go_logistice_info.s_time && go_logistice_info.s_time!='0'" class="order-tip-item">
									<div class="order-tip-item-left order-tip-text color-222 font-28">退货物流: </div>
									<div class="color-222 font-28 order-tip-text">{{go_logistice_info.kuaidi_name}}</div>
									<div class="color-8f8f94 font-28 order-tip-text">(已签收)</div>
									<img class="shipping-address-icon" src="@/assets/img/right.png" />
								</div>
								<div @click="linkFunc(22,{id:go_logistice_info.id})" v-else class="shipping-address">
									<div class="shipping-address-item">
										<div class="shipping-address-item-left color-222 font-28">退货物流:</div>
										<div class="shipping-address-item-right">
											<div class="color-222 font-28">{{go_logistice_info.kuaidi_name}}</div>
											<div class="color-8f8f94 font-28">({{go_logistice_info.kuaidi_numb}})</div>
											<img class="shipping-address-icon" src="@/assets/img/right.png" />
										</div>
									</div>
									<div class="shipping-logistics-item">
										<div class="shipping-address-item-left"></div>
										<div class="shipping-address-item-right shipping-logistics-item-right">
											<div class="shipping-logistics-point"></div>
											<div class="shipping-logistics-line"></div>
											<div class="shipping-logistics-text">{{go_logistice_info.kd_text_arr.data[0].context}}<br />{{go_logistice_info.kd_text_arr.data[0].time}}</div>
										</div>
									</div>
								</div>
							</template>
							
						</template>
					</template>
						
				</div>
			</template>
			<!-- <div class="cont-session order-message">
				<div class="order-tip-item">
					<div class="order-tip-item-left order-tip-text color-222 font-28">退款总额:</div>
					<div class="color-222 font-28 order-tip-text">￥100、幸福币500</div>
				</div>
				<div class="order-tip-item">
					<div class="order-tip-item-left order-tip-text color-222 font-28">退款说明：</div>
					<div class="order-tip-item-right color-8f8f94 font-28 order-tip-text">无</div>
				</div>
				<div class="order-tip-item">
					<div class="order-tip-item-left order-tip-text color-222 font-28">寄出物流: </div>
					<div class="color-222 font-28 order-tip-text">顺丰速运</div>
					<div class="color-8f8f94 font-28 order-tip-text">(已签收)</div>
				</div>
			</div> -->
		</div>
		<template v-if="typeVal ==1&&infoData.order_status==0&&infoData.is_cancel_btn==1">
			<div class="fixed-empty"></div>
			<div class="btn-fixed-buttom">
				<div class="order-border-btn"><div @click="cancelApply" class="color-8f8f94 font-28">取消退款</div></div>
			</div>
		</template>
		<template v-if="typeVal ==2&&infoData.order_status<2">
			<div class="fixed-empty"></div>
			<div class="btn-fixed-buttom">
				<div v-if="infoData.order_status==0&&infoData.is_cancel_btn==1" class="order-border-btn"><div @click="cancelApply" class="color-8f8f94 font-28">取消退款</div></div>
				<div @click="linkFunc(19)" v-else class="order-border-btn paid-btn"><div class="color-fff font-26">填写退货物流</div></div>
			</div>
		</template>
	</div>
</template>

<script>
import { NavBar } from 'vant'
import { getRefundInfo, getReturnRefundInfo, cancelRefundApply, cancelRefundReturnApply } from '@/api/life.js'
export default {
  components: {
    [NavBar.name]: NavBar,
  },
  data () {
    return {
    	windowHeight: document.documentElement.clientHeight,
    	typeVal: 1,
    	goodsList: [],  //商品列表
    	infoData: '',   //退款信息
    	go_logistice_info: ''//物流信息
    }
  },
  created(){
    this.sale_order_id = this.$route.query.id;
    this.typeVal = this.$route.query.type;
    this.getData();
  },
  methods: {
  	getData () {
  		if(this.typeVal == 1){  //退款
  			getRefundInfo({
	        sale_order_id: this.sale_order_id,
	      }).then(res => {
	        if (res.success) {
	        	this.goodsList = res.sale_goods_specs_list;
	        	this.infoData = res.refund_info;
	        }
	      })
  		}else {
  			getReturnRefundInfo({
	        sale_order_id: this.sale_order_id,
	      }).then(res => {
	        if (res.success) {
	        	this.goodsList = res.sale_goods_specs_list;
	        	this.infoData = res.returnfund_info;
	        	this.go_logistice_info = res.go_logistice_info;
	        }
	      })
  		}
    },
    // 取消申请
    cancelApply(){
    	if(this.typeVal == 1){  //退款
    		cancelRefundApply({
	        sale_order_id: this.sale_order_id,
	      }).then(res => {
	        if (res.success) {
	        	this.getData();
	        }
	      })
    	}else {   //退货退款
    		cancelRefundReturnApply({  
	        sale_order_id: this.sale_order_id,
	      }).then(res => {
	        if (res.success) {
	        	this.getData();
	        }
	      })
    	}
    },
    linkFunc (type,obj={}) {
    	switch (type){
    		case 19:
    		this.$router.push({
	      	path: '/order/write-logistics',
	      	query: {
	      		id: this.sale_order_id,
	      		type: 2
	      	}
	      })
    		break;
    		case 22:
    		this.$router.push({
          path: '/logistics/logistics-express',
          query: {
            logistice_id: obj.id,
            num: this.goodsList.length,
            url: this.goodsList[0].specs_img,
          }
        })
    		break;
    	}
    },

  },
  beforeRouteLeave (to, from, next) {
    if(to.name == 'applyRefund'){
      this.$router.go(-2);
    }
    next();
  }
}
</script>

<style scoped  src="../../../styles/life.css"></style>
<style scoped  src="../../../styles/order.css"></style>
<style scoped>
.apply-select {
  width: 100%;
  height: 90px;
  background-color: #fce6e3;
  border-radius: 4px;
  margin-top: 20px;
  padding: 0 30px;
}
.select-left {
  font-size: 24px;
  color: #222;
}
.select-left div {
  line-height: 44px;
}
.public-hr {
	height: 1.5px;
	background-color: #f0f0f0;
	margin: 20px 0;
}
</style>
<template>
	<div class="app-body">
		<div class="order-bar">
			<van-nav-bar
        title="换货详情"
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
							<div class="order-num"></div>
						</div>
						<div class="order-action-session">
							<div class="order-action-text">{{item.order_status_name}}</div>
							<div class="order-buy-num">x1</div>
						</div>
					</div>
					<div class="apply-select flex-between">
						<div class="select-left">
							<div>换货原因：{{item.reason_type}}</div>
							<div class="color-eb5841">换成：{{item.new_specs_name}}</div>
						</div>
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
							<div class="order-action-text">换货中</div>
							<div class="order-buy-num">x1</div>
						</div>
					</div>
				</div> -->
				<div class="detail-price-list">
					<div class="flex-sart-item">
						<div class="color-222 font-28 flex-sart-item-left">换货编号：</div>
						<div class="color-222 font-28">{{infoData.barter_numb}}</div>
					</div>
					<div class="flex-sart-item">
						<div class="color-222 font-28 flex-sart-item-left">申请时间：</div>
						<div class="color-222 font-28">{{infoData.ctime}}</div>
					</div>
					<div v-if="infoData.ftime" class="flex-sart-item">
						<div class="color-222 font-28 flex-sart-item-left">完成时间：</div>
						<div class="color-222 font-28">{{infoData.ftime}}</div>
					</div>
					<div v-if="infoData.cancel_time" class="flex-sart-item">
						<div class="color-222 font-28 flex-sart-item-left">取消时间：</div>
						<div class="color-222 font-28">{{infoData.cancel_time}}</div>
					</div>
				</div>
				<div class="order-total order-total-detail">
					<div class="color-8f8f94 font-24">共 {{infoData.barter_num}} 件</div>
				</div>
			</div>
			<div v-if="infoData.order_status != 6" class="cont-session address-logistics">
				<div class="shipping-address">
					<div class="shipping-address-item">
						<div class="shipping-address-item-left color-222 font-28">收货地址:</div>
						<div class="shipping-address-item-right">
							<div class="shipping-address-username p-nowrap">{{infoData.rece_realname}}</div>
							<div class="color-222 font-28">{{infoData.rece_mobile}}</div>
						</div>
					</div>
					<div class="shipping-address-item">
						<div class="shipping-address-item-left"></div>
						<div class="shipping-address-item-right">
							<div class="shipping-address-text p-nowrap">{{infoData.rece_address}}</div>
						</div>
					</div>
				</div>
				<div v-if="mail_logistice_info" class="shipping-logistics">
					<div @click="linkFunc(22,{id:mail_logistice_info.id})" v-if="mail_logistice_info.s_time && mail_logistice_info.s_time!='0'" class="order-tip-item">
						<div class="order-tip-item-left order-tip-text color-222 font-28">收货物流: </div>
						<div class="color-222 font-28 order-tip-text">{{mail_logistice_info.kuaidi_name}}</div>
						<div class="color-8f8f94 font-28 order-tip-text">(已签收)</div>
						<img class="shipping-address-icon" src="@/assets/img/right.png" />
					</div>
					<template v-else>
						<div @click="linkFunc(22,{id:mail_logistice_info.id})" class="shipping-address-item">
							<div class="shipping-address-item-left color-222 font-28">收货物流:</div>
							<div class="shipping-address-item-right">
								<div class="color-222 font-28">{{mail_logistice_info.kuaidi_name}}</div>
								<div class="color-8f8f94 font-28">({{mail_logistice_info.kuaidi_numb}})</div>
								<img class="shipping-address-icon" src="@/assets/img/right.png" />
							</div>
						</div>
						<div @click="linkFunc(22,{id:mail_logistice_info.id})" class="shipping-logistics-item">
							<div class="shipping-address-item-left"></div>
							<div class="shipping-address-item-right shipping-logistics-item-right">
								<div class="shipping-logistics-point"></div>
								<div class="shipping-logistics-line"></div>
								<div class="shipping-logistics-text">{{mail_logistice_info.kd_text_arr.data[0].context}}<br />{{mail_logistice_info.kd_text_arr.data[0].time}}</div>
							</div>
						</div>
					</template>
				</div>
			</div>
			<div v-if="infoData.order_status == 0 || infoData.order_status == 1" class="cont-session order-message">
				<template>
					<div class="order-tip-item">
						<div class="order-tip-item-left order-tip-text color-222 font-28">换货说明:</div>
						<div class="order-tip-item-right color-222 font-28 order-tip-text">{{infoData.reason_text ? infoData.reason_text : '无'}}</div>
					</div>
					<div class="public-hr"></div>
				</template>
				<div class="shipping-address">
					<div class="shipping-address-item">
						<div class="shipping-address-item-left color-222 font-28">退货地址:</div>
						<div class="shipping-address-item-right">
							<div class="shipping-address-username p-nowrap">{{infoData.return_name}}</div>
							<div class="color-222 font-28">{{infoData.return_tel}}</div>
						</div>
						<div class="copy-btn" @click="copy_cont(infoData.return_name+infoData.return_tel+infoData.tuihuo2)">
							<div class="copy-text">复制</div>
						</div>
					</div>
					<div class="shipping-address-item">
						<div class="shipping-address-item-left"></div>
						<div class="shipping-address-item-right">
							<div class="shipping-address-text p-nowrap">{{infoData.tuihuo2}}</div>
						</div>
					</div>
				</div>
				<template v-if="infoData.order_status == 1">
					<div class="public-hr"></div>
					<div @click="linkFunc(19)" class="order-tip-item">
						<div class="order-tip-item-left order-tip-text color-222 font-28">寄出物流: </div>
						<div class="color-eb5841 font-28 order-tip-text">请及时寄出并填写物流单号</div>
						<img class="shipping-address-icon" src="@/assets/img/right.png" />
					</div>
				</template>
			</div>
			<div v-else class="cont-session order-message">
				<template>
					<div class="order-tip-item">
						<div class="order-tip-item-left order-tip-text color-222 font-28">换货说明:</div>
						<div class="order-tip-item-right color-8f8f94 font-28 order-tip-text">{{infoData.reason_text ? infoData.reason_text : '无'}}</div>
					</div>
					<div v-if="go_logistice_info" class="public-hr"></div>
				</template>
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
			</div>
		</div>
		<template v-if="infoData.order_status == 0 || infoData.order_status == 1">
			<div class="fixed-empty"></div>
			<div class="btn-fixed-buttom">
				<div v-if="infoData.order_status == 0" class="order-border-btn" hover-class="none"><div @click="cancelApply" class="color-8f8f94 font-28">取消换货</div></div>
				<div v-else-if="infoData.order_status == 1" class="order-border-btn paid-btn"><div @click="linkFunc(19)" class="color-fff font-26">填写寄出物流</div></div>
			</div>
		</template>
		
	</div>
</template>

<script>
import { NavBar, Toast } from 'vant'
import { getBarterInfo, cancelBarterApply } from '@/api/life.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
  },
  data () {
    return {
    	windowHeight: document.documentElement.clientHeight,
    	goodsList: [],  //商品列表
    	infoData: '',   //换货信息
    	mail_logistice_info: '',//卖家发回物流信息
    	go_logistice_info: ''//买家寄回物流信息
    }
  },
  created(){
    this.sale_order_id = this.$route.query.id;
    this.getData();
  },
  methods: {
  	getData () {
      getBarterInfo({
        sale_order_id: this.sale_order_id,
      }).then(res => {
        if (res.success) {
        	this.goodsList = res.sale_goods_specs_list;
        	this.infoData = res.barter_info;
        	this.mail_logistice_info = res.mail_logistice_info;
        	this.go_logistice_info = res.go_logistice_info;
        }
      })
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
    		case 19:
    		this.$router.push({
	      	path: '/order/write-logistics',
	      	query: {
	      		type: 3,
	      		id: this.sale_order_id,
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
    // 取消申请
    cancelApply(){
    	cancelBarterApply({
        sale_order_id: this.sale_order_id,
      }).then(res => {
        if (res.success) {
        	this.getData();
        }
      })
    },
  },
  beforeRouteLeave (to, from, next) {
    if(to.name == 'applyBarter'){
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
  height: 127px;
  background-color: #fce6e3;
  border-radius: 4px;
  margin-top: 20px;
  padding: 0 30px;
}
.refund-session .apply-select {
  height: 90px;
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

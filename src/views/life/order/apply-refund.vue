<template>
	<div class="app-body" :style="{ 'min-height': windowHeight+'px'}">
	<div class="order-bar bar-white"><van-nav-bar :title="titName" :border="false" fixed @click-left="$router.go(-1)" left-arrow></van-nav-bar></div>
    <div class="bar-empty"></div>
    <div class="apply-tip">如有多件商品需要退款，请一并提交申请</div>
		<div class="order-session refund-session">
			<div class="cont-session goods-session">
				<div class="can-apply">
					<div v-for="(item,index) in ableList" class="apply-goods">
						<div :class="[item.is_checked ? 'cur' : '','cart-checkbox flex-center']" @click="checkboxOne(index)" data-index="">
		          <div class="checkbox-session"></div>
		        </div>
						<div class="order-goods-info">
							<div class="order-pic-block">
								<img class="img-100" mode="aspectFill" :src="item.specs_img">
							</div>
							<div class="order-info">
								<div class="order-name-price">
									<div class="order-name order-name-text p-nowrap">{{item.goods_name}}</div>
									<div class="order-price">￥{{item.pay_price/100}}</div>
								</div>
								<div class="order-sku-num">
									<div class="order-sku order-sku-text p-nowrap">{{item.specs_name}}</div>
									
								</div>
								<div class="order-action-session">
									<div class="order-action-text"></div>
									<div class="order-buy-num">x1</div>
								</div>
							</div>
							<div v-if="item.is_checked" @click.stop="closeReasonSwal(1)" class="apply-select flex-between">
								<div class="select-left">
									<div>退款原因：{{item.reason}}</div>
								</div>
								<div class="select-right">
									<img class="img-100" src="@/assets/img/right.png" />
								</div>
							</div>
						</div>
					</div>
					<!-- <div class="apply-goods">
						<div class="cart-checkbox flex-center cur" @click="checkboxOne" data-index="">
		          <div class="checkbox-session"></div>
		        </div>
						<div class="order-goods-info">
							<div class="order-pic-block">
								<img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg">
							</div>
							<div class="order-info">
								<div class="order-name-price">
									<div class="order-name order-name-text p-nowrap">yeah jewelry U形项链</div>
									<div class="order-price">￥20000.00</div>
								</div>
								<div class="order-sku-num">
									<div class="order-sku order-sku-text p-nowrap">规格：银色</div>
									<div class="order-buy-num">x1</div>
								</div>
								<div class="order-action-session">
									<div class="order-action-text">换货中</div>
								</div>
							</div>
							<div class="apply-select flex-between">
								<div class="select-left">
									<div>退款原因：商品质量问题</div>
								</div>
								<div class="select-right">
									<img class="img-100" src="@/assets/img/right.png" />
								</div>
							</div>
						</div>
					</div> -->
				</div>
				<div v-if="unableList.length > 0" class="not-apply">
					<div @click="toggle" :class="[toggleDown ? 'cur' : '', 'apply-toggle']">部分商品不支持换货({{unableList.length}})</div>
					<div v-show="!toggleDown" v-for="(item,index) in unableList" class="order-goods-info">
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
								
							</div>
							<div class="order-action-session">
								<div class="order-action-text">
									<template v-if="item.is_returnfund==0 || item.is_return==0">
										{{item.is_returnfund==0 ? '不支持退换' : '不支持退货'}}
										<div class="order-action-btn">
											<img class="img-100" src="@/assets/img/question_01.png" mode="" />
										</div>
									</template>
									<template v-else>{{item.order_status_name}}</template>
								</div>
								<div class="order-buy-num">x1</div>
							</div>
						</div>
					</div>
					<!-- <div class="order-goods-info">
						<div class="order-pic-block">
							<img class="img-100" mode="aspectFill" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg" />
						</div>
						<div class="order-info">
							<div class="order-name-price">
								<div class="order-name p-nowrap">yeah jewelry U形项链</div>
								<div class="order-price">￥20000.00</div>
							</div>
							<div class="order-sku-num">
								<div class="order-sku p-nowrap">规格：银色</div>
								<div class="order-buy-num">x1</div>
							</div>
							<div class="order-action-session">
								<div class="order-action-text">退货中</div>
							</div>
						</div>
					</div> -->
				</div>
			</div>
			<div class="cont-session common-list common-list-pic">
				<div class="common-item no-top-border refund-item-number">
					<div class="common-item-left color-222 font-28">
						<div class="item-left-name">退款金额</div>
						<input class="item-first-text" type="text" :placeholder="'￥'+refundPrice" v-model="refundNum" />
					</div>
					<div class="item-left-tip">可修改金额，最多￥{{refundPrice}}</div>
				</div>
				<div class="common-item">
					<div class="common-item-left color-222 font-28">
						<div class="item-left-name">退款说明</div>
						<input class="item-first-text" type="text" placeholder="填写退款说明" v-model="explainTxt" />
					</div>
				</div>
				<div class="common-item common-item-second">
					<div class="common-item-left">
						<div class="color-222 font-28">上传凭证</div>
						<div class="color-8f8f94 font-28">(最多5张)</div>
					</div>
				</div>
				<div class="common-item pic-list no-top-border">
					<!-- <div class="pic-item">
						<img class="pic-url" src="https://bht.liwushijian.com/library/barter/2020-07/21/3_15952989190.jpg" mode="aspectFill"/>
						<div class="pic-del">
							<div class="del-bg">
								<div class="del-line"></div>
							</div>
						</div>
					</div> -->
					<!-- <div class="pic-item">
						<img class="pic-url" src="https://bht.liwushijian.com/library/barter/2020-07/21/3_15952989190.jpg" mode="aspectFill"/>
						<div class="pic-del">
							<div class="del-bg">
								<div class="del-line"></div>
							</div>
						</div>
					</div>
					<div class="pic-item">
						<img class="pic-url" src="https://bht.liwushijian.com/library/barter/2020-07/21/3_15952989190.jpg" mode="aspectFill"/>
						<div class="pic-del">
							<div class="del-bg">
								<div class="del-line"></div>
							</div>
						</div>
					</div>
					<div class="pic-item">
						<img class="pic-url" src="https://bht.liwushijian.com/library/barter/2020-07/21/3_15952989190.jpg" mode="aspectFill"/>
						<div class="pic-del">
							<div class="del-bg">
								<div class="del-line"></div>
							</div>
						</div>
					</div> -->
					<tf-uploader v-model="images" max-count="5"></tf-uploader>
					<!-- <div class="pic-item">
						<div class="upload-pic">
							<tf-uploader v-model="images" max-count="9"></tf-uploader>
							<van-uploader :max-count="2" :after-read="afterRead">
							  <van-icon class="van-icon" name="plus" size="26px" color="#aaa" />
							</van-uploader>
						</div>
					</div> -->
				</div>
			</div>
			<!-- <div class="cont-session address-logistics">
				<div class="shipping-address">
					<div class="shipping-address-item">
						<div class="shipping-address-item-left color-222 font-28">收货地址:</div>
						<div class="shipping-address-item-right">
							<div class="shipping-address-username p-nowrap">安琪拉安琪拉安琪拉安琪拉</div>
							<div class="color-222 font-28">15000112233</div>
						</div>
					</div>
					<div class="shipping-address-item">
						<div class="shipping-address-item-left"></div>
						<div class="shipping-address-item-right">
							<div class="shipping-address-text p-nowrap">福建省福州市仓山区下渡街道三盛滨江国际三盛滨江国</div>
						</div>
					</div>
				</div>
			</div> -->

		</div>
		<div class="fixed-submit-empty"></div>
		<div class="submit-fixed-buttom">
			<div class="submit-btn" @click="submitAjax">
				<div class="color-fff font-30">提交</div>
			</div>
		</div>

		<explain-swal 
    :show-swal="showExplainSwal"
    :swal-cont="swalCont"
    @closeSwal="closeExplainSwal"
    ></explain-swal>
    <reason-swal 
    :show-swal="showReasonSwal"
    :swal-list="swalList"
    :swal-info="swalInfo"
    @closeSwal="closeReasonSwal"
    @sureSwal="sureSwal"
    ></reason-swal>
	</div>
</template>

<script>
import {  Icon, NavBar, Uploader,Toast } from 'vant'
import { getApplyRefund, refundSubmit, returnRefundSubmit } from '@/api/life.js'
import tfUploader from '@/components/tf-uploader/index'
import reasonSwal from './../components/reason-swal'
import explainSwal from './../components/explain-swal'
export default {
  components: {
    [Icon.name]: Icon,
    [NavBar.name]: NavBar,
    [Uploader.name]: Uploader,
    [Toast.name]: Toast,
    reasonSwal,
    explainSwal,
    tfUploader
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      id: '', //物流id
      type: 1, // 1退货退款 2退款
      titName: '申请退换退款', //标题
      refundPrice: 0,//退款金额(展示)
      refundNum: null, //退款金额(提交)
      explainTxt: '', //退款说明
      showExplainSwal: false, //说明弹窗
      swalInfo: new Object(),  //标题描述
      swalCont: '贵重物品、贴身衣物、肉类果蔬生鲜商品、定制商品、虚拟商品、报纸期刊等，处于信息安全或者卫生考虑，不支持无理由退货。跨境商品不支持换货。',
      showReasonSwal: false,  //原因弹窗
      swalList: [],
      ableList: [],   //可以申请的商品
      unableList: [], //不能申请的商品
      images: [],
      toggleDown: true
    }
  },
  created(){
    this.order_project_id = this.$route.query.order_id;
    this.logistice_id = this.$route.query.logistice_id;
    this.sale_type = this.$route.query.type;
    this.titName = this.$route.query.type == 2 ? '申请退换退款' : '申请退款';
    console.log(this.type);
    this.getData();
  },
  methods: {
  	getData () {
      getApplyRefund({
        order_project_id: this.order_project_id,
        logistice_id: this.logistice_id,
        sale_type: this.sale_type,
      }).then(res => {
        if (res.success) {
        	this.ableList = res.data.data_ok;
        	this.unableList = res.data.data_no;
        	if(this.sale_type == 1){  //申请退款
        		this.swalInfo.tit = "选择退款原因";
        		this.swalInfo.tip = "请选择实际原因，以便我们更好地为您提供服务";
        		this.swalList = res.refund_arr;
        	}else {    //申请退款退货
        		this.swalList = res.returnfund_arr;
        		this.swalInfo.tit = "选择退货原因";
        		this.swalInfo.tip = "请选择实际原因，以便我们更好地为您提供服务";
        	}
        }
      })
    },
    checkboxOne(index){
    	this.tabIndex =  index;
    	console.log(this.ableList[index].is_checked);
    	if(this.ableList[index].is_checked){
    		this.ableList[index].is_checked = false;
    		this.ableList[index].reason = '';
    		this.total();
    	}else {
    		this.showReasonSwal = true;
    	}
    },
    toggle(){
    	this.toggleDown = !this.toggleDown;
    },
  	// 打开弹窗
  	openExplainSwal(){
      this.showExplainSwal = true;
    },
    // 弹窗选择(回调)
    sureSwal(data){
    	console.log(data)
    	this.ableList[this.tabIndex].is_checked = true;
    	this.ableList[this.tabIndex].reason = this.swalList[data].text;
    	console.log('a',this.ableList[this.tabIndex].reason);
    	this.total();
    	this.closeReasonSwal(0);
    },
  	// 关闭弹窗(回调)
  	closeReasonSwal(data){
      this.showReasonSwal = data == 1 ? true : false;
    },
    // 关闭弹窗(回调)
  	closeExplainSwal(data){
      this.showExplainSwal = data == 1 ? true : false;
    },
    //图片上传完成
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    total(){
    	var list = this.ableList;
    	var id_arr = [];
    	var reason_arr = [];
    	var refundPrice = 0;
    	for(var i=0;i<list.length;i++){
    		if(list[i].is_checked){
    			id_arr.push(list[i].id);
    			reason_arr.push(list[i].reason);
    			refundPrice+=parseInt(list[i].pay_price);
    		}
    	}
    	this.id_arr = id_arr;
    	this.reason_arr = reason_arr;
    	this.refundPrice = refundPrice/100;
    	console.log(this.refundPrice);
    },
    submitAjax(){
    	console.log(this.images);
    	if(typeof this.id_arr =='undefined' || this.id_arr.length == 0){
    		Toast('请选择商品');
    	}else {
    		if(this.refundNum > this.refundPrice){
    			Toast('退款金额不能大于'+this.refundPrice);
    			return;
    		}
    		if(this.sale_type == 1){
    			refundSubmit({
		        order_project_id: this.order_project_id,
		        logistice_id: this.logistice_id,
		        order_goods_ids: this.id_arr,
		        refund_price: this.refundNum ? this.refundNum : this.refundPrice,
		        reason_type: this.reason_arr,
		        reason_text: this.explainTxt,
		        pic: this.images,
		      }).then(res => {
		        if (res.success) {
		        	Toast(res.message);
		        	//跳转订单详情
		        }
		      })
    		}else {
    			returnRefundSubmit({
		        order_project_id: this.order_project_id,
		        logistice_id: this.logistice_id,
		        order_goods_ids: this.id_arr,
		        refund_price: this.refundNum ? this.refundNum : this.refundPrice,
		        reason_type: this.reason_arr,
		        reason_text: this.explainTxt,
		        pic: this.images,
		      }).then(res => {
		        if (res.success) {
		        	Toast(res.message);
		        	//跳转订单详情
		        }
		      })
    		}
    		
    	}
    }
  }
}
</script>

<style scoped  src="../../../styles/life.css"></style>
<style scoped  src="../../../styles/order.css"></style>
<style scoped  src="../../../styles/apply.css"></style>
<style scoped>
.goods-session {
	padding: 40px 0 0 0;
	flex-wrap: wrap;
}
.van-uploader__wrapper {
	display: flex;
}
</style>


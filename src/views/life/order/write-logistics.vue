<template>
	<div class="app-body">
		<div class="order-bar bar-white"><van-nav-bar title="填写换货物流" :border="false" fixed @click-left="$router.go(-1)" left-arrow></van-nav-bar></div>
		<div class="bar-empty"></div>
		<div class="order-session">
			<div class="cont-session goods-session">
				<!-- <div class="order-goods-info">
					<div class="order-pic-block">
						<img class="img-100" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg"/>
					</div>
					<div class="order-info">
						<div class="order-name-price">
							<div class="order-name"><div class="color-222 font-28 order-name-text">yeah jewelry U形项链yeah jewelry U形项链ry U形项链yeah jewelry U形</div></div>
						</div>
						<div class="order-sku-num">
							<div class="order-sku"><div class="color-8f8f94 font-24 order-sku-text">规格：银色</div></div>
						</div>
						<div class="order-action-session">
							<div class="order-action-text">
								<div class="color-eb5841 font-24">换货规格：粉色</div>
							</div>
						</div>
					</div>
				</div> -->
				<div v-for="(item,index) in goodsList" class="order-goods-info">
					<div class="order-pic-block">
						<img class="img-100" :src="item.specs_img" />
					</div>
					<div class="order-info">
						<div class="order-name-price">
							<div class="order-name order-name-text p-nowrap">{{item.goods_name}}</div>
						</div>
						<div class="order-sku-num">
							<div class="order-sku order-sku-text p-nowrap">{{item.specs_name}}</div>
						</div>
						<div v-if="item.type == 3" class="order-action-session">
							<div class="order-action-text">{{item.new_specs_name}}</div>
						</div>
					</div>
				</div>
				<!-- <div class="order-goods-info">
					<div class="order-pic-block">
						<img class="img-100" src="http://192.168.1.158/library/uploads/image/20181220/20181220142322_65224.jpg" />
					</div>
					<div class="order-info">
						<div class="order-name-price">
							<div class="order-name order-name-text p-nowrap">yeah jewelry U形项链</div>
						</div>
						<div class="order-sku-num">
							<div class="order-sku order-sku-text p-nowrap">规格：银色</div>
						</div>
						<div class="order-action-session">
							<div class="order-action-text">换货中</div>
						</div>
					</div>
				</div> -->
			</div>
			<div class="cont-session common-list">
				<div @click="closeReasonSwal(1)" class="common-item common-item-first">
					<div class="common-item-left">
						<div class="color-222 font-28 width-146">物流公司</div>
						<div v-if="selectedVal.express_name" class="color-222 font-28">{{selectedVal.express_name}}</div>
					</div>
					<div class="common-item-right">
						<div v-if="!selectedVal.express_name" class="color-8f8f94 font-28">请选择</div>
						<img class="common-item-arrow" src="@/assets/img/right.png" mode=""/>
					</div>
				</div>
				<div class="common-item">
					<div class="common-item-left">
						<div class="color-222 font-28 width-146">物流单号</div>
						<div class="color-222 font-28">SF123456789012</div>
					</div>
					<div class="common-item-right">
						<div class="common-item-code" @click="scanFunc">
							<van-icon class="van-icon" name="scan" size="26px" color="#383838" />
						</div>
					</div>
				</div>
			</div>
			<div class="cont-session common-list common-list-pic">
				<div class="common-item common-item-first">
					<div class="common-item-left">
						<div class="color-222 font-28">上传凭证</div>
						<div class="color-8f8f94 font-28">(最多5张)</div>
					</div>
				</div>
				<div class="common-item pic-list">
					<tf-uploader v-model="images" max-count="5"></tf-uploader>
					<!-- <div class="pic-item">
						<img class="pic-url" src="https://bht.liwushijian.com/library/barter/2020-07/21/3_15952989190.jpg"/>
						<div class="pic-del">
							<div class="del-bg">
								<div class="del-line"></div>
							</div>
						</div>
					</div>
					<div class="pic-item">
						<img class="pic-url" src="https://bht.liwushijian.com/library/barter/2020-07/21/3_15952989190.jpg"/>
						<div class="pic-del">
							<div class="del-bg">
								<div class="del-line"></div>
							</div>
						</div>
					</div>
					<div class="pic-item">
						<img class="pic-url" src="https://bht.liwushijian.com/library/barter/2020-07/21/3_15952989190.jpg"/>
						<div class="pic-del">
							<div class="del-bg">
								<div class="del-line"></div>
							</div>
						</div>
					</div>
					<div class="pic-item">
						<img class="pic-url" src="https://bht.liwushijian.com/library/barter/2020-07/21/3_15952989190.jpg"/>
						<div class="pic-del">
							<div class="del-bg">
								<div class="del-line"></div>
							</div>
						</div>
					</div>
					<div class="pic-item">
						<div class="upload-pic">
							<van-uploader :after-read="onRead">
							  <van-icon class="van-icon" name="plus" size="26px" color="#aaa" />
							</van-uploader>
						</div>
					</div> -->
				</div>
			</div>
		</div>
		<div class="fixed-submit-empty"></div>
		<div class="submit-fixed-buttom">
			<div  @click="submitAjax" class="submit-btn">
				<div class="color-fff font-30">提交</div>
			</div>
		</div>
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
import { NavBar, Icon, Toast } from 'vant'
import { getWriteInfo, logisticsSubmit } from '@/api/life.js'
import tfUploader from '@/components/tf-uploader/index'
import reasonSwal from './../components/reason-swal'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    tfUploader,
    reasonSwal
  },
  data () {
    return {
    	windowHeight: document.documentElement.clientHeight,
    	goodsList: [],  //商品列表
    	selectedVal: {id: '',express_name: ''},//选择的快递
    	images: [],
    	swalInfo: new Object(),  //标题描述
      showReasonSwal: false,  //原因弹窗
      swalList: [],
    }
  },
  created(){
    this.sale_order_id = this.$route.query.id;
    this.sale_type = this.$route.query.type;
    this.getData();
  },
  methods: {
  	getData () {
      getWriteInfo({
        sale_order_id: this.sale_order_id,
        sale_type: this.sale_type,
      }).then(res => {
        if (res.success) {
        	this.swalInfo.tit = "物流公司";
	    		this.swalInfo.tip = "";
        	this.goodsList = res.sale_goods_specs_list;
        	this.logisticsList = res.kuaidi_list;
        	if(res.kuaidi_list.length > 0){
        		res.kuaidi_list.forEach((res)=>{
        			var obj = {text: ''};
        			obj.text = res.express_name;
        			this.swalList.push(obj);
        		})
        		console.log(this.swalList);
        	}
        }
      })
    },
    // 弹窗选择(回调)
    sureSwal(data){
    	console.log(data)
    	this.selectedVal = this.logisticsList[data];
    	console.log(this.logisticsList);
    	this.closeReasonSwal(0);
    },
  	// 关闭弹窗(回调)
  	closeReasonSwal(data){
      this.showReasonSwal = data == 1 ? true : false;
    },
    submitAjax(){
    	logisticsSubmit({
        sale_order_id: this.sale_order_id,
        sale_type: this.sale_type,
        kuaidi_id: this.selectedVal.id,
        go_kuaidi_numb: this.kuaidi_num,
        pic: this.images,
      }).then(res => {
        if (res.success) {
        	Toast(res.message);
        	//跳转订单详情
        }
      })
    },
  	scanFunc(){
  		let that = this;
  		var FNScanner = api.require('FNScanner');
      FNScanner.open({
        autorotation: true
      }, function(ret, err) {
        if (ret) {
        	that.kuaidi_num = ret;
          alert(JSON.stringify(ret));
        } else {
          alert(JSON.stringify(err));
        }
      });
  	}
  }
}
</script>

<style scoped  src="../../../styles/life.css"></style>
<style scoped  src="../../../styles/order.css"></style>
<style scoped>
.goods-session {
	margin-top: 30px;
	padding: 40px 30px 10px;
}
.order-name-text,.order-sku-text {
	max-width: 500px;
}
.common-item-code {
	width: 80px;
	height: 80px;
	display: flex;
	justify-content: flex-end;
	align-items:center;
}
.code-pic {
	width: 44px;
	height: 44px;
}

.common-list-pic {
	padding-right: 0;
}
.pic-list {
	height: 194px;
	display: flex;
	justify-content: flex-start;
}
.pic-item {
	width: 134px;
	height: 134px;
	position: relative;
}
.pic-url,.upload-pic {
	width: 114px;
	height: 114px;
	position: absolute;
	z-index: 2;
	left: 0;
	bottom: 0;
}
.pic-del {
	position: absolute;
	top: 0;
	right: 0;
	width: 54px;
	height: 54px;
	justify-content: center;
	align-items: center;
	z-index: 5;
}
.del-bg {
	width: 34px;
	height: 34px;
	border-radius: 17px;
	background-color: #eb5841;
	z-index: 5;
	position: relative;
}
.del-line {
	width: 20px;
	height: 2px;
	border-radius: 1px;
	position: absolute;
	top: 16px;
	left: 7px;
	background-color: #fff;
}
.upload-pic {
	background-color: #f2f2f4;
	display: flex;
	align-items: center;
	justify-content: center;
}
.upload-add {
	color: #aaa;
	font-size: 60px;
}
</style>

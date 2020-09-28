<template>
	<div class="app-body">
		<div class="order-bar bar-white">
      <van-nav-bar
        title="申请换货"
        fixed
        :border="false"
        placeholder
        left-arrow
        @click-left="$router.go(-1)"
      ></van-nav-bar>
    </div>
    <div class="apply-tip">如有多件商品需要换货，请一并提交申请</div>
		<div class="order-session">
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
							<div v-if="item.is_checked" @click.stop="showFunc(index+1)" class="apply-select flex-between">
								<div class="select-left">
									<div>换货原因：{{item.reason}}</div>
									<div class="color-eb5841">换成：{{item.sku_name}}</div>
								</div>
								<div class="select-right">
									<img class="img-100" src="@/assets/img/right.png" />
								</div>
							</div>
						</div>
					</div>
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
								<div class="order-action-text color-8f8f94">
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
				<div class="common-item common-item-first">
					<div class="common-item-left color-222 font-28">
						<div class="item-left-name">换货说明</div>
						<input class="item-first-right" type="text" placeholder="填写换货理由" />
					</div>
				</div>
				<div class="common-item common-item-second">
					<div class="common-item-left">
						<div class="color-222 font-28">上传凭证</div>
						<div class="color-8f8f94 font-28">(最多5张)</div>
					</div>
				</div>
				<div class="common-item pic-list no-top-border">
					<tf-uploader v-model="images" max-count="5"></tf-uploader>
				</div>
			</div>
			<div @click="linkFunc(23,{isSelect: 1})" class="cont-session address-logistics">
				<div class="shipping-address">
					<div class="shipping-address-item">
						<div class="shipping-address-item-left color-222 font-28">收货地址:</div>
						<div class="shipping-address-item-right">
							<div class="shipping-address-username p-nowrap">{{addressInfo.realname}}</div>
							<div class="color-222 font-28">{{addressInfo.mobile}}</div>
						</div>
					</div>
					<div class="shipping-address-item">
						<div class="shipping-address-item-left"></div>
						<div class="shipping-address-item-right">
							<div class="shipping-address-text p-nowrap">{{addressInfo.address_name + addressInfo.address_house}}</div>
						</div>

					</div>
					<div class="address-go">
						<img class="img-100" src="@/assets/img/right.png" />
					</div>
				</div>
			</div>

		</div>
		<div class="fixed-submit-empty"></div>
		<div class="submit-fixed-buttom">
			<div @click="submitAjax" class="submit-btn">
				<div class="color-fff font-30">提交</div>
			</div>
		</div>
		
		<div v-show="skuShow" class="public-mask  bottom-fixed">
      <div class="public-dclose" @click="showFunc()"><img class="img-100" src="@/assets/img/close.png" /></div>
      <div class="shops-params">
        <div v-if="skuList.length > 0" class="params-goods-info">
          <div class="params-goods-left">
            <img class="img-100" @click="predivPic(typeVal,2)" :src="skuList[typeVal].specs_img" data-src="" />
          </div>
          <div class="params-goods-right">
            <div class="goods-name p-nowrapm">{{ableList[tabIndex].goods_name}}</div>
          </div>
        </div>
      
        <div class="shops-dlist">
          <div class="shops-ditem">
            <div class="shops-dtit">规格</div>
            <div class="doption-list">
              <div v-for="(item, index) in skuList" :class="[typeVal == index ? 'active' : '','shops-doption']" @click="typeFunc(index)">{{item.specs_name}}</div>
            </div>
          </div>
          <div class="shops-ditem">
            <div class="shops-dtit">数量</div>
            <div class="goods-num-count">
              <div class="goods-btn-block">
                <div class="goods-btn goods-sub not-add">-</div>
                <div class="goods-num">1</div>
                <div class="goods-btn goods-add not-add">+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="submit-btn color-fff" @click="skuSure">确认</div>
    </div>
    <div v-show="skuShow" class="mask-bg" catchtouchmove="true" @click="showFunc()"></div>

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
import { Icon, NavBar, ImagePreview, Toast } from 'vant'
import { getApplyBarter, barterSubmit } from '@/api/life.js'
import eventBus from '@/api/eventbus.js';
import tfUploader from '@/components/tf-uploader/index'
import reasonSwal from './../components/reason-swal'
import explainSwal from './../components/explain-swal'
export default {
  name: 'applyBarter',
  components: {
    [Icon.name]: Icon,
    [NavBar.name]: NavBar,
    [ImagePreview.name]: ImagePreview,
    [Toast.name]: Toast,
    reasonSwal,
    explainSwal,
    tfUploader
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      showExplainSwal: false, //说明弹窗
      swalInfo: new Object(),  //标题描述
      swalCont: '贵重物品、贴身衣物、肉类果蔬生鲜商品、定制商品、虚拟商品、报纸期刊等，处于信息安全或者卫生考虑，不支持无理由退货。跨境商品不支持换货。',
      showReasonSwal: false,  //原因弹窗
      swalList: [],
      explainTxt: '', //换货说明
      ableList: [],   //可以申请的商品
      unableList: [], //不能申请的商品
      skuList: [],    //规格
      typeVal: 0,     //当前选中的商品规格index
      images: [],
      tabIndex: 0,    //当前选中的商品index
      toggleDown: true,

      skuShow: false,        //商品规格弹窗是否显示

      isSelectAddress: false,//是否选择地址
      addressInfo: '',       //收货地址信息
    }
  },
  mounted(){
    var that = this;
    //根据key名获取传递回来的参数，data就是map
    eventBus.$on('chooseAddress', function(data){
      that.addressInfo = JSON.parse(data);
      that.isSelectAddress = true;
      // that.getData();
    }.bind(this));
  },
  created(){
    eventBus.$off('chooseAddress');
    this.order_project_id = this.$route.query.order_id;
    this.logistice_id = this.$route.query.logistice_id;
    this.getData();
  },
  methods: {
  	getData () {
      getApplyBarter({
        order_project_id: this.order_project_id,
        logistice_id: this.logistice_id,
      }).then(res => {
        if (res.success) {
        	this.ableList = res.data.data_ok;
        	this.unableList = res.data.data_no;
        	this.skuList = res.data.data_ok[0] ? res.data.data_ok[0].goods_specs_list : [];
        	this.swalInfo.tit = "选择退款原因";
      		this.swalInfo.tip = "请选择实际原因，以便我们更好地为您提供服务";
      		this.swalList = res.refund_arr;
      		if(!this.isSelectAddress){
            this.userAddId = res.data.address_info.id;
            if(!this.isSelectAddress){
              this.addressInfo = res.data.address_info;
            }
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
    		this.skuList = this.ableList[index].goods_specs_list;
    		this.total();
    	}else {
    		this.showReasonSwal = true;
    	}
    },
    predivPic(index,type) {
      var imagesArr = [];
      imagesArr = this.skuPicArr
      ImagePreview({
        images: imagesArr,
        startPosition: index,
        onClose() {
          // do something
        }
      })
    },
    // 显示/隐藏弹窗(规格)
    showFunc(index='') {
    	if(index){
    		this.tabIndex = index-1;
    		this.skuList = this.ableList[this.tabIndex].goods_specs_list;
    	}
      this.skuShow = !this.skuShow;
    },
    // 显示/隐藏不可选商品
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
    	this.tapReason = this.swalList[data].text;
    	this.showFunc();
    	this.closeReasonSwal(0);
    },
    // 选中规格
    typeFunc(index) {
      this.typeVal = index;
    },
    // 选中规格确定
    skuSure(){
    	this.ableList[this.tabIndex].is_checked = true;
    	this.ableList[this.tabIndex].reason = this.tapReason;
    	this.ableList[this.tabIndex].sku_id = this.skuList[this.typeVal].id;
    	this.ableList[this.tabIndex].sku_name = this.skuList[this.typeVal].specs_name;
    	this.showFunc();
    	this.total();
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
    	var specs_arr = [];
    	for(var i=0;i<list.length;i++){
    		if(list[i].is_checked){
    			id_arr.push(list[i].id);
    			reason_arr.push(list[i].reason);
    			specs_arr.push(list[i].sku_id);
    		}
    	}
    	this.specs_arr = specs_arr;
    	this.id_arr = id_arr;
    	this.reason_arr = reason_arr;
    },
    submitAjax(){
    	console.log(this.images);
    	if(typeof this.id_arr =='undefined' || this.id_arr.length == 0){
    		Toast('请选择商品');
    	}else {
    		barterSubmit({
    			address_id: this.addressInfo.id,
	        order_project_id: this.order_project_id,
	        logistice_id: this.logistice_id,
	        order_goods_ids: this.id_arr,
	        reason_type: this.reason_arr,
	        specs_ids: this.specs_arr,
	        reason_text: this.explainTxt,
	        pic: this.images,
	      }).then(res => {
	        if (res.success) {
	        	// Toast(res.message);
            this.mtjEvent({eventId: '55'}); 
	        	//跳转换货详情
            this.$router.push({
              path: '/order/barter-detail',
              query: {
                id: res.barter_id,
              }
            })
	        }
	      })
    	}
    },
    linkFunc (type,obj={}) {
      switch (type){
        case 23:
        this.$router.push({
          path: '/address/list',
          query: {
            isSelect: 1
          }
        })
        break;
      }
    },
  },
  beforeRouteLeave (to, from, next) {
    if(to.name == 'goodsDetail' || to.name == 'orderApply'){
      this.$destroy();
      this.$store.commit('deleteKeepAlive',from.name);
    }
    next();
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
.address-go {
	position: absolute;
	right: 30px;
	top: 50%;
	margin-top: -13px;
	width: 15px;
	height: 26px;
}

/*规格*/
.shops-params {
  position: relative;
  padding: 40px 0 0 0;
  min-height: 180px;
  background-color: #fff;
}
.params-goods-info {
  height: 120px;
  display: flex;
  margin-bottom: 20px;
}
.params-goods-left {
  width: 120px;
  height: 100%;
  display: flex;
  flex-shrink: 0;
  margin-right: 20px;
}
.params-goods-right {
  width: 431px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  font-size: 26px;
  line-height: 40px;
}
.shops-dlist {
  max-height: 600px;
  overflow-y: auto;
}
.shops-ditem {
  overflow: hidden;
}
.shops-dtit {
  color: #222;
  padding-top: 10px;
  line-height: 86px;
}
.doption-list {
  display: flex;
  flex-wrap: wrap;
}
.shops-doption {
  color: #666;
  height: 66px;
  border: 2px solid #f2f2f4;
  line-height: 62px;
  margin: 0 20px 20px 0;
  background-color: #f2f2f4;
  border-radius: 4px;
  padding: 0 30px;
}
.shops-doption.active {
  background-color: #fdeeec;
  color: #eb5841;
  border-color: #eb5841;
}
.goods-num-count {
  display: flex;
  margin-bottom: 60px;
}
.goods-btn-block {
  height: 44px;
  border-radius: 2px;
  color: #aaa;
  font-size: 24px;
  display: flex;
}
.goods-btn {
  width: 47px;
  height: 100%;
  border: 1px solid #aaa;
  line-height: 42px;
  text-align: center;
  font-size: 30px;
}
.not-add.goods-btn {
  background-color: #eee;
}
.goods-num {
  float: left;
  width: 58px;
  height: 100%;
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
  box-sizing: border-box;
  min-height: 100%;
  text-align: center;
  line-height: 42px;
  color: #222;
}
</style>

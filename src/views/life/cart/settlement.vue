<template>
	<div class="app-body">
    <div class="order-bar">
      <van-nav-bar
        title="结算"
        fixed
        :border="false"
        placeholder
        left-arrow
        @click-left="$router.go(-1)"
      ></van-nav-bar>
    </div>
    <div class="address-session">
      <div class="address-bg"></div>
      <div v-if="addressInfo" class="bht-session address-info" @click="linkFunc(23,{isSelect: 1})">
        <div class="address-text">
          <div class="address-user flex-between">
            <div class="address-name p-nowrap">{{addressInfo.realname}}</div>
            <div class="address-tel">{{addressInfo.mobile}}</div>
            <div class="link-icon"><img class="img-100" src="@/assets/img/right.png" /></div>
          </div>
          <div class="address-detail">
            <div class="address-default" v-if="addressInfo.is_default == 1">默认</div>
            <div class="p-nowrap">{{addressInfo.address_name+addressInfo.address_house}}</div>
          </div>
        </div>
      </div>
      <div v-else class="bht-session address-info no-address flex-between" @click="linkFunc(23,{isSelect: 1})" data-url="">
        <img class="address-icon" src="@/assets/img/address_02.png" alt="">
        <div class="no-address-text">请选择收货地址</div>
        <div class="link-icon"><img class="img-100" src="@/assets/img/right.png" /></div>
      </div>
    </div>

    <div class="cont-session goods-session">
      <div v-for="(item,index) in carts" class="order-goods-info">
        <div class="order-pic-block">
          <img class="img-100" mode="aspectFill" :src="item.specs_img"></img>
        </div>
        <div class="order-info">
          <div class="order-name-price">
            <div class="order-name p-nowrap">{{item.goods_name}}</div>
            <div v-if="order_type!=3" class="order-price">￥{{item.s_price/100}}</div>
            <div v-else class="order-price"><img src="@/assets/img/icon_20.png" />{{settlementInfo.credits/item.count}}</div>
          </div>
          <div class="order-sku-num">
            <div class="order-sku p-nowrap">{{item.specs_name}}</div>
            <div v-if="order_type!=3 && item.y_price && item.y_price!='0'" class="order-num">￥{{item.y_price/100}}</div>
          </div>
          <div class="order-action-session">
            <div class="order-action-text color-8f8f94">
              <template v-if="item.tip_text||item.is_returnfund==0 || item.is_return==0">{{item.tip_text ? item.tip_text : (item.is_returnfund==0 ? '不支持退换' : '不支持退货')}}
                <div class="order-action-btn" @click.stop="openExplainSwal">
                  <img class="img-100" src="@/assets/img/question_01.png" mode="" />
                </div>
              </template>
            </div>
            <div class="order-buy-num">x{{item.count}}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="order_type!=3" class="cont-session common-list">
      <div v-if="order_type<1" class="common-item common-item-first" @click="linkFunc(10)">
        <div class="common-item-left">
          <div class="color-222 font-28 width-146">优惠券</div>
        </div>
        <div class="common-item-right">
          <div v-if="settlementInfo.coupon_money&&settlementInfo.coupon_money!='0.00'" class="color-eb5841 font-28">{{couponInfo.coupon_text}}</div>
          <div v-else class="color-8f8f94 font-28">无可用优惠券</div>
          <div class="link-icon">
            <img class="img-100" src="@/assets/img/right.png" mode=""/>
          </div>
        </div>
      </div>
      <div v-if="order_type==0&&settlementInfo.z_total_credits!=0 || (order_type==1 || order_type==2)&&settlementInfo.pay_credits!=0" @click="selectFunc" class="common-item">
        <div class="common-item-left">
          
          <div v-if="order_type==0" class="color-222 font-28">可用{{settlementInfo.z_total_credits/10}}幸福币抵扣￥{{settlementInfo.z_total_credits/100}}</div>
          <div v-else-if="order_type==1 || order_type==2" class="color-222 font-28">可用{{settlementInfo.pay_credits/10}}幸福币抵扣￥{{settlementInfo.pay_credits/100}}</div>
        </div>
        <div :class="[is_credits ? 'cur' : '', 'checkbox-xfb flex-center']"></div>
      </div>
    </div>

    <div v-if="order_type==0" class="cont-session goods-session detail-list-block">
      <div class="detail-price-list">
        <div class="detail-price-item">
          <div>商品总价</div>
          <div>￥{{priceTotal/100}}</div>
        </div>
        <div class="detail-price-item">
          <div>运费</div>
          <div>￥{{settlementInfo.freight/100}}</div>
        </div>
        <div v-if="settlementInfo.coupon_money&&settlementInfo.coupon_money!='0'" class="detail-price-item">
          <div>优惠券</div>
          <div>-￥{{settlementInfo.coupon_money/100}}</div>
        </div>
        <div v-if="is_credits" class="detail-price-item">
          <div>幸福币抵扣</div>
          <div>-￥{{settlementInfo.z_total_credits/100}}</div>
        </div>
      </div>
      <div class="order-total order-total-detail">
        <div class="color-8f8f94 font-24">共 {{goodsNum}} 件</div>
        <div class="order-price-total">
          合计:<span>￥{{is_credits ? (parseInt(settlementInfo.total_price) + parseInt(settlementInfo.freight))/100 : (parseInt(settlementInfo.total_pay_price) + parseInt(settlementInfo.freight))/100}}</span>
        </div>
      </div>
    </div>
    <div v-else-if="order_type==1 || order_type==2" class="cont-session goods-session detail-list-block">
      <div class="detail-price-list">
        <div class="detail-price-item">
          <div>商品总价</div>
          <div>￥{{priceTotal/100}}</div>
        </div>
        <div class="detail-price-item">
          <div>运费</div>
          <div>￥{{settlementInfo.freight/100}}</div>
        </div>
        <div v-if="is_credits" class="detail-price-item">
          <div>幸福币抵扣</div>
          <div>-￥{{settlementInfo.pay_credits/100}}</div>
        </div>
      </div>
      <div class="order-total order-total-detail">
        <div class="color-8f8f94 font-24">共 {{goodsNum}} 件</div>
        <div class="order-price-total">
          合计:<span>￥{{is_credits ? (parseInt(settlementInfo.credits_pay_money) + parseInt(settlementInfo.freight))/100 : (parseInt(settlementInfo.new_pay_money) + parseInt(settlementInfo.freight))/100}}</span>
        </div>
      </div>
    </div>
    <div v-else class="cont-session goods-session detail-list-block">
      <div class="detail-price-list">
        <div class="detail-price-item">
          <div>商品总价</div>
          <div><img src="@/assets/img/icon_20.png" />{{settlementInfo.credits}}</div>
        </div>
        <div class="detail-price-item">
          <div>运费</div>
          <div><img src="@/assets/img/icon_20.png" />{{settlementInfo.freight/10}}</div>
        </div>
      
      </div>
      <div class="order-total order-total-detail">
        <div class="color-8f8f94 font-24">共 1 件</div>
        <div class="order-price-total">
          合计:<span><img src="@/assets/img/icon_20.png" />{{settlementInfo.freight ? parseInt(settlementInfo.freight/10) + parseInt(settlementInfo.credits) : settlementInfo.credits}}</span>
        </div>
      </div>
    </div>

    <div class="cont-session order-remarks">
      <div class="order-remarks-item">
        <div class="order-remarks-item-left color-222 font-28">订单备注:</div>
        <div class="shipping-address-item-right">
          <input v-model="remarks" class="color-222 font-28 order-remarks-text" type="text" placeholder="备注">
        </div>
      </div>
    </div>

    <div class="cart-empty"></div>
    <div class="cart-bottom bottom-fixed">
      <div class="cart-data flex-align-center">
        <div v-if="order_type==0" class="all-price"><span>合计：</span>￥{{is_credits ? (parseInt(settlementInfo.total_price) + parseInt(settlementInfo.freight))/100 : (parseInt(settlementInfo.total_pay_price) + parseInt(settlementInfo.freight))/100}}</div>
        <div v-else-if="order_type==1 || order_type==2" class="all-price"><span>合计：</span>￥{{is_credits ? (parseInt(settlementInfo.credits_pay_money) + parseInt(settlementInfo.freight))/100 : (parseInt(settlementInfo.new_pay_money) + parseInt(settlementInfo.freight))/100}}</div>
        <template v-else>
          <div v-if="settlementInfo.is_ok" class="all-price"><span>合计：</span><img src="@/assets/img/icon_20.png" />{{settlementInfo.freight ? parseInt(settlementInfo.freight/10) + parseInt(settlementInfo.credits) : settlementInfo.credits}}</div>
          <div v-else class="all-price">还差{{settlementInfo.differ_credits}}幸福币</div>
        </template>
        <div v-if="order_type!=3" class="all-go flex-center" @click="payFunc">付款</div>
        <template v-else>
          <div v-if="settlementInfo.is_ok" class="all-go flex-center" @click="payFunc">兑换</div>
          <div v-else class="all-go flex-center btn-disabled">兑换</div>
        </template>
      </div>
    </div>
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
  </div>
</template>

<script>
import { NavBar, Toast } from 'vant'
import explainSwal from './../components/explain-swal'
import paySwal from './../components/pay-swal'
import eventBus from '@/api/eventbus.js';
import { getOrdinaryInfo, getFlashInfo, getExchangeInfo, ordinaryCreate, flashCreate, exchangeCreate, payOrderUp } from '@/api/life.js'
export default {
  name: 'settlement',
  components: {
    [NavBar.name]: NavBar,
    explainSwal,
    paySwal
  },
  data () {
    return {
      showExplainSwal: false,  //弹窗
      swalCont: '贵重物品、贴身衣物、肉类果蔬生鲜商品、定制商品、虚拟商品、报纸期刊等，处于信息安全或者卫生考虑，不支持无理由退货。跨境商品不支持换货。',

      showPaySwal: false,   //支付方式弹窗
      payMoney: 0,          //支付金额
      downTime: 0,          //支付结束时间

      nocarts: [],         //未选中商品
      carts: [],           //选中商品
      goodsNum: '',        //购物车商品件数
      priceTotal: '',      //商品总额
      userId: '',          //用户uid
      userData: '',        //用户信息
      remarks: '',         //备注
      // coupon_id: '',       //优惠券id
      isSelectCoupon: false,//是否选择优惠券
      // selectCouponId: '',   //选择的优惠券id
      // selectCouponTxt: '',  //选择的优惠券信息
      couponInfo: '',      //优惠券信息
      coupon_price: '',    //优惠券金额
      priceInfo: '',       //优惠信息

      is_credits: false,    //是否使用积分

      isSelectAddress: false,//是否选择地址
      addressInfo: '',       //收货地址信息
      userAddId: '',         //选中的地址id
      uname: '',             //选中地址-收货人姓名
      utel: '',              //选中地址-收货人电话
      userAddress: '',       //选中的地址详情
      is_default: 0,         //默认地址
      prev_page: 0,          //1商品详情页直接购买
      isNew: false,          //购物车商品是否有变动

      flashInfo: '',         //闪购结算信息
      settlementInfo: '',
    }
  },
  mounted(){
    var that = this;
    //根据key名获取传递回来的参数，data就是map
    eventBus.$on('chooseAddress', function(data){
      if(data){
        that.addressInfo = JSON.parse(data);
      }
      console.log(that.addressInfo);
      this.isSelectAddress = true;
      // that.getData();
    }.bind(this));

    eventBus.$on('chooseCoupon', function(data){
      this.isSelectCoupon = true;
      if(data){
        that.couponInfo = JSON.parse(data);
      }
      that.getData();
    }.bind(this));
    
  },
  created(){
    eventBus.$off('chooseAddress');
    eventBus.$off('chooseCoupon');
    var prev_page = this.$route.query.prev_page;
    this.order_type = this.$route.query.order_type;  //订单类型 0普通商品（普通、特卖、专车） 1闪购 2拼单 3幸福币兑换
    this.flashParam = {
      ollage_id: this.$route.query.ollage_id,
      specs_id: this.$route.query.specs_id,
      specs_num: this.$route.query.specs_num,
      is_credits: this.is_credits ? 1 : 0,
      order_type: this.order_type,
    }
    this.f_id = this.$route.query.f_id;
    if(typeof this.f_id!='undefined' && this.f_id){
      this.flashParam.f_id = this.f_id;
    }

    this.prev_page = prev_page ? prev_page : 0;
    if(!this.prev_page) this.order_type = 0;
    this.total();
    // that.getData();
  },
  methods: {
    getData: function (e) {
      if(this.order_type == 0 || this.prev_page == 0){
        getOrdinaryInfo({
          giftbag: JSON.stringify(this.carts),
          user_coupon_id: this.couponInfo.user_coupon_id,
          // user_coupon_id: 2
        }).then(res => {
          if (res.success) {
            this.settlementInfo = res.data;
            if (!this.isSelectCoupon){
              this.couponInfo = res.data.coupon_arr.length > 0 && !this.couponInfo ? res.data.coupon_arr[0] : this.couponInfo;
            }
            if(!this.isSelectAddress){
              this.addressInfo = res.address_info;
            }
          }
          console.log(this.couponInfo)
        })
      }else if(this.order_type == 3){
        getExchangeInfo(this.flashParam).then(res => {
          if (res.success) {
            this.settlementInfo = res.data.pay;
            if(!this.isSelectAddress){
              this.addressInfo = res.data.address_info;
            }
          }
        })
      }else {
        getFlashInfo(this.flashParam).then(res => {
          if (res.success) {
            this.settlementInfo = res.data.pay;
            if(this.isSelectAddress){
              this.isSelectAddress = false;
            }else {
              this.addressInfo = res.data.address_info;
            }
          }
        })
      }
    },
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
      let carts_list2 = [];
      let goodsNum = 0;
      console.log(carts_arr);
      if (carts_arr && carts_arr.length > 0) {
        let priceTotal = 0;
        for (var j in carts_arr) {
          if (carts_arr[j].is_checked) {
            carts_list.push(carts_arr[j]);
            goodsNum += carts_arr[j].count;
            priceTotal+= carts_arr[j].count * carts_arr[j].s_price;
          }else {
            carts_list2.push(carts_arr[j]);
          }
        }
        this.carts = carts_list;  //选中的
        if(this.isNew){
          this.carts = this.backCarts;
          this.isNew = false;
        }
        this.goodsNum = goodsNum;
        this.nocarts = carts_list2;  //没选中的
        this.priceTotal = priceTotal;
        this.flashParam.specs_num = goodsNum;
      }else {
        return;
      }
      that.getData();
      return;
    },
    /**
     * 结算
    */
    payFunc: function (e) {
      const that = this;
      if (!this.addressInfo || !this.addressInfo.id){
        Toast('请先选择收货地址');
        return;
      }
      if(this.order_type == 0 || this.prev_page == 0){
        var pricetotal = this.is_credits ? (parseInt(this.settlementInfo.total_price) + parseInt(this.settlementInfo.freight)) : (parseInt(this.settlementInfo.total_pay_price) + parseInt(this.settlementInfo.freight));
        ordinaryCreate({
          giftbag: JSON.stringify(this.carts),
          address_id: this.addressInfo.id,
          user_coupon_id: this.couponInfo.user_coupon_id,
          pricetotal: pricetotal,
          is_credits: this.is_credits ? 1 : 0,
          user_explain: this.remarks
        }).then(res => {
          if (res.success) {
            if(res.code == '200'){
              this.callbackData = res.order_info;
              this.order_id = res.order_info.id;
              that.cartInit();
              this.openPaySwal();
            }
          }else {
            // if (this.prev_page == 1){
            //   api.setPrefs({ key: 'cart2', value: JSON.stringify(that.backCarts) });
            // }else {
            //   api.setPrefs({ key: 'cart', value: JSON.stringify(that.backCarts) });
            // }
            Toast(res.message);
            that.backCarts = res.goods_arr;
            that.isNew = true;
            console.log(that.backCarts)
            that.total();
          }
        })
      }else if(this.order_type == 3){
        this.flashParam.address_id = this.addressInfo.id;
        exchangeCreate(this.flashParam).then(res => {
          if (res.success) {
            if(res.code == '200'){
              this.order_id = res.order_id;
              that.cartInit();
              this.linkFunc(12,{id: this.order_id});
            }
          }
        })
      }else {
        this.flashParam.address_id = this.addressInfo.id;
        flashCreate(this.flashParam).then(res => {
          if (res.success) {
            if(res.code == '200'){
              // this.callbackData = res.order_info;
              this.order_id = res.order_id;
              that.cartInit();
              this.openPaySwal();
            }else {
              
            } 
          }
        })
      }
    },
    /**
     * 积分选择
     */
    selectFunc: function (e) {
      this.is_credits = !this.is_credits;
    },


    // 打开弹窗
    openExplainSwal(){
      this.showExplainSwal = true;
    },
    // 关闭弹窗
    closeExplainSwal(data){
      this.showExplainSwal = data == 1 ? true : false;
    },
    // 打开支付选择弹窗
    openPaySwal(){
      this.downTime = parseInt(new Date().getTime()) + 30*60*1000 - parseInt(new Date().getTime());
      let settlementInfo = this.settlementInfo;
      if(this.order_type==0){
        this.payMoney = this.is_credits ? (parseInt(settlementInfo.total_price) + parseInt(settlementInfo.freight))/100 : (parseInt(settlementInfo.total_pay_price) + parseInt(settlementInfo.freight))/100;
      }else if(this.order_type==1 || this.order_type==2){
        this.payMoney = this.is_credits ? (parseInt(settlementInfo.credits_pay_money) + parseInt(settlementInfo.freight))/100 : (parseInt(settlementInfo.new_pay_money) + parseInt(settlementInfo.freight))/100;
      }
      
      this.showPaySwal = true;
    },
    // 关闭支付选择弹窗
    closePaySwal(data){
      this.showPaySwal = data == 1 ? true : false;
      this.goDetail();
    },
    surePaySwal(data){
      this.showPaySwal = false;
      payOrderUp({
        order_id: this.order_id,
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
          that.goDetail();
          // api.alert({ title: '支付结果', msg: ret.code, buttons: ['确定'] }); 
        }
      );
    },
    goDetail(){
      if(this.order_type == 1 || this.order_type == 2){ //闪购、拼单
        this.linkFunc(13,{id: this.order_id});
      }else {
        this.linkFunc(12,{id: this.order_id});
      }
    },
    //清理购物车
    cartInit(){
      let that = this;
      if(that.prev_page == 0){
        //删除已购买商品缓存
        api.removePrefs({ key: 'cart' });
        api.setPrefs({ key: 'cart', value: JSON.stringify(that.nocarts) });
      }else {
        api.removePrefs({ key: 'cart2' });
      }
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
        case 10:
        this.$router.push({
          path: '/coupon/coupon-select',
          query: {
            prev_page: this.prev_page,
            user_coupon_id: this.couponInfo.user_coupon_id
          }
        })
        break;
        case 11:
        this.$router.push('/order/list');
        break;
        case 12:
        this.$router.replace({
          path: '/order/detail',
          query: {
            id: obj.id
          }
        })
        break;
        case 13:
        this.$router.replace({
          path: '/order/special-detail',
          query: {
            id: obj.id
          }
        })
        break;
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
    if(to.name == 'goodsDetail' || to.name == 'cart'){
      console.log(to.name)
      
      this.$destroy();
      this.$store.commit('deleteKeepAlive',from.name);
    }
    next();
  }
}
</script>

<style scoped  src="../../../styles/life.css"></style>
<style scoped  src="../../../styles/order.css"></style>
<style scoped>
.app-body {
  background-color: #f2f2f4;
  font-size: 28px;
}
.detail-price-list .detail-price-item {
  font-size: 28px;
}
/* 收货地址 start */
.address-session {
  height: 183px;
  margin-bottom: 30px;
  position: relative;
}
.address-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  z-index: 2;
  background-image: linear-gradient(to right, #f9866b, #eb5841);
}
.address-info {
  height: 163px;
  border-radius: 10px;
  border: none;
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  z-index: 5;
  padding: 0 30px;
  display: flex;
  background: #fff url('../../../assets/img/address_bg.png') repeat-x -60px bottom/auto 8px;
}
.address-icon {
  width: 28px;
  height: 36px;
  margin-right: 20px;
}
.no-address-text {
  width: 300px;
  flex-grow: 1;
  color: #222222;
  font-size: 34px;
}
.link-icon {
  width: 12px;
  height: 22px;
  display: flex;
  margin-left: 12px;
}
  /* 有地址 */
.address-text {
  width: 600px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.address-user {
  height: 72px;
  line-height: 72px;
  color: #222;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.address-name {
  max-width: 380px;
  font-weight: bold;
  margin-right: 30px;
}
.address-tel {
  width: 200px;
  flex-grow: 1;
}
.address-detail {
  height: 30px;
  line-height: 30px;
  color: #919499;
  font-size: 24px;
  display: flex;
}
.address-default {
  flex-shrink: 0;
  height: 30px;
  width: 60px;
  line-height: 30px;
  color: #ffffff;
  font-size: 24px;
  text-align: center;
  border-radius: 2px;
  margin-right: 8px;
  background-image: linear-gradient(to right, #f9866b, #eb5841);
}
/* 收货地址 end */
.order-goods-info:last-child{
  padding-bottom: 10px;
}
.detail-list-block {
  padding-top: 25px;
}
.detail-price-list {
  border-top: none;
  padding-top: 0;
}
input.order-remarks-text {
  width: 504px;
  border: none;
  font-size: 28px;
}
.common-item {
  height: 106px;
}
.checkbox-xfb {
  width: 24px;
  height: 24px;
  border: 1px solid #eb5841;
}
.checkbox-xfb.cur {
  background: url('../../../assets/img/tick3.png') no-repeat center center/100% 100%;
}

/*底部*/
.cart-empty {
  height: 120px;
}
.cart-data {
  height: 121px;
  background-color: #fff;
  line-height: 120px;
  border-top: 1.4px solid #E5E5E5;
}
.all-checkbox {
  width: 140px;
  display: flex;
  justify-content: space-between;
  padding-left: 40px;
  align-items: center;
}
.all-checkbox-session {
  margin-top: 0;
}
.all-price {
  width: 350px;
  flex-grow: 1;
  font-weight: bold;
  color: #eb5841;
  font-size: 34px;
  margin-right: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.all-price img {
  width: 28px;
  height: 28px;
  margin-right: 8px;
}
.all-price span {
  color: #8f8f94;
  font-size: 24px;
  font-weight: normal;
}
.all-go {
  width: 190px;
  height: 88px;
  color: #fefefe;
  font-size: 30px;
  background-image: linear-gradient(to right, #f9866b, #eb5841);
  border-radius: 10px;
  margin-right: 20px;
}
.all-go.btn-disabled {
  background: #aaa;
}

</style>

<template>
	<div class="app-body">
    <div class="order-bar bar-white"><van-nav-bar title="购物车" :border="false" fixed @click-left="$router.go(-1)" left-arrow></van-nav-bar></div>
    <div class="bar-empty"></div>
		<div v-if="carts.length" class="cart-session">
			<div class="cart-list">
	      <div :class="[item.goods_type == 2 ? 'cart-item-tm' : '','cart-item']" v-for="(item,index) in carts" @click="linkFunc(5,{id: item.goods_id})">
	        <div :class="[item.is_checked ? 'cur' : '', 'cart-checkbox']" @click.stop="checkboxOne(index)">
	          <div class="checkbox-session"></div>
	        </div>
	        <div class="cart-cont" hover-class="none">
	          <div class="product-pic">
	            <img class="img-100" mode="aspectFill" :src="item.specs_img" />
	          </div>
	          <div class="product-info">
	            <div class="product-name p-nowrap">{{item.goods_name}}</div>
	            <div class="product-specs">{{item.specs_name}}</div>
	            <div v-if="item.goods_type == 2" class="flex-align-center"><div class="product-icon flex-center">特卖</div></div>
	            <div class="product-price">￥<span>{{item.s_price/100}}</span> <span v-if="item.y_price && item.y_price!=0">￥{{item.y_price/100}}</span></div>
	          </div>
	        </div>
	        <div class="cart-operate">
	          <div class="operate-btn product-sub flex-between" @click.stop="countTab(index,-1)"></div>
	          <div class="shop-btn-block">
	            <div class="shop-num">{{item.count}}</div>
	          </div>
	          <div :class="[item.count >= item.max_buy ? 'not-add' : '','operate-btn product-add flex-between']" @click.stop="countTab(index,1)"></div>
	        </div>
	        <div class="product-del" @click.stop="delCarts(index)" data-index=""><img class="img-100" mode="aspectFill" src="@/assets/img/close_02.png" /></div>
	      </div>
	    </div>
		</div>
    <div v-else class="empty-session">
      <img src="@/assets/img/empty_cart.png" />
      <div>暂无商品</div>
    </div>
    <div class="cart-empty"></div>
    <div class="cart-bottom bottom-fixed">
      <div class="cart-data flex-align-center">
        <div :class="[allSelected ? 'cur' : '', 'all-checkbox']" @click="checkboxAll"><div class="all-checkbox-session"></div>全选</div>
        <div class="all-price"><span>合计：</span>￥{{priceTotal}}</div>
        <div class="all-go flex-center" @click="payFunc">结算({{numTotal}})</div>
      </div>
    </div>
	</div>
</template>

<script>
import { NavBar, Toast } from 'vant'
import { getCart } from '@/api/life.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      checked: false,

      carts: [],           //购物车
      priceTotal: '',      //支付总额
      numTotal: '',        //支付商品总件数
      noneHidden: true,    //购物车是否为空
      allSelected: true,   //全选
    }
  },
  created(){
    // var carts = JSON.parse(localStorage.getItem('cart'));
    var carts = JSON.parse(api.getPrefs({ key: 'cart' })) || [];
    this.carts = carts;
    this.total();
    console.log(carts);
    // this.getData();
  },
  methods: {
    getData(){
      console.log('cart',this.carts);
      getCart({
        giftbag: JSON.stringify(this.carts)
      }).then(res => {
        if (res.success) {
          this.carts = res.goods_arr;
        }
      })
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
        case 8:
        this.$router.push({
          path: '/life/settlement',
          query: {
            id: 1
          }
        })
        break;
      }
    },
    // 商品数量加减
    countTab(index, types) {
      if(types === 1 && this.carts[index].count >= this.carts[index].max_buy) return;
      if (parseInt(this.carts[index].count) + types > 0) {
        this.carts[index].count = parseInt(this.carts[index].count) + types;
      } else {
        this.delOne(index);
      }
      // localStorage.setItem('cart', JSON.stringify(this.carts));
      api.setPrefs({ key: 'cart', value: JSON.stringify(this.carts) });
      this.total();
    },
    //点击删除按钮
    delCarts(index) {
      this.delOne(index);
      // localStorage.setItem('cart', JSON.stringify(this.carts));
      api.setPrefs({ key: 'cart', value: JSON.stringify(this.carts) });
      this.total();
    },
    // 删除购物车中的某个商品
    delOne(index) {
      let indexTab = index;
      let carts_arr = this.carts;
      carts_arr.splice(indexTab, 1);
      this.carts = carts_arr;
    },
    /**
     * 勾选/取消单个商品
    */
    checkboxOne(index) {
      let indexTab = index;
      this.carts[index].is_checked = !this.carts[indexTab].is_checked;
      // localStorage.setItem('cart', JSON.stringify(this.carts));
      api.setPrefs({ key: 'cart', value: JSON.stringify(this.carts) });
      this.total();
    },
    /**
     * 全选/全不选
    */
    checkboxAll() {
      let carts_arr = this.carts;
      let is_checked= this.allSelected;
      for (let i = 0; i < carts_arr.length; i++) {
        carts_arr[i].is_checked = !is_checked;
      }
      this.carts = carts_arr;
      this.allSelected = !is_checked;
      // localStorage.setItem('cart', JSON.stringify(this.carts));
      api.setPrefs({ key: 'cart', value: JSON.stringify(this.carts) });
      this.total();
    },
    /**
     * 计算商品数量/价格
     */
    total() {
      let carts_arr = this.carts;
      if(carts_arr.length < 1){
        this.numTotal = 0;
        this.priceTotal = '0.00';
        this.allSelected = false;
      }else{
        let carts_list = [];
        let numTotal = 0;
        let priceTotal = 0;
        let checked_num = 0;
        for (var j in carts_arr) {
          if (carts_arr[j].is_checked){
            checked_num++;
            numTotal += parseInt(carts_arr[j].count);
            priceTotal += parseFloat(carts_arr[j].count * carts_arr[j].pay_price);
          }
        }
        this.allSelected = checked_num === carts_arr.length ? true : false;
        this.numTotal = numTotal;
        this.priceTotal = 0 ? '0.00' : (priceTotal/100).toFixed(2);
        if (numTotal > 0) {
          this.getData();
          return;
          app.util.request({
            'url': '/xcx/wxvipjson/common_pay',
            'cachetime': '0',
            'showLoading': false,
            'data': {
              uid: this.userId,
              giftbag: JSON.stringify(this.carts),
            },
            success(res) {
              let result = res.data;
              // that.setData({
              //   discountInfo: result.data,
              //   carts: result.goods_arr,
              //   priceTotal: (result.data.total_pay_price).toFixed(2)
              // })
              wx.setStorageSync('cart', result.goods_arr);
            }
          });
        }
      } 
    },
    /**
     * 结算
    */
    payFunc() {
      Toast('请选择要结算的商品');
      if(this.numTotal === 0){
        Toast('请选择要结算的商品');
      }else {
        this.linkFunc(8);
      }
    }
  }
}
</script>

<style scoped  src="../../../styles/life.css"></style>
<style scoped>
.app-body {
  background-color: #f2f2f4;
  font-size: 28px;
}
/* 购物车商品列表 start */
.cart-session {
  overflow: hidden;
}
.cart-list {
  margin: 30px auto 0;
  width: 710px;
  padding-bottom: 30px;
}
.cart-item {
  display: flex;
  background-color: #fff;
  position: relative;
  padding: 30px 0;
  margin-bottom: 30px;
  height: 200px;
  border-radius: 10px;
}
.cart-item-sg,.cart-item-tm {
  height: 253px;
}
.cart-item:last-child {
  margin-bottom: 0;
}
.cart-checkbox {
  width: 72px;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  justify-content: center;
}
.checkbox-session,.all-checkbox-session {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #96a8bb;
  margin-top: 54px;
}
.cart-checkbox.cur .checkbox-session,.all-checkbox.cur .all-checkbox-session {
  border: none;
  background: url('../../../assets/img/tick2.png') no-repeat center center/100% 100%;
}
.cart-cont {
  width: 638px;
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}
.product-pic {
  width: 140px;
  height: 140px;
  display: flex;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
}
.product-info {
  width: 478px;
}
.product-name {
  line-height: 38px;
  color: #222;
  width: 406px;
}
.product-specs {
  line-height: 50px;
  font-size: 24px;
  color: #8f8f94;
}
.product-icon {
  padding: 0 10px;
  height: 44px;
  line-height: 44px;
  border-radius: 4px;
  overflow: hidden;
  font-size: 24px;
  margin: 7px 0 3px;
}
.cart-item-tm .product-icon {
  color: #55b862;
  background-color: #eef8ef;
}
.cart-item-sg .product-icon {
  color: #eb5841;
  background-color: #fdeeec;
}
.product-price {
  padding-top: 6px;
  line-height: 45px;
  font-size: 24px;
  color: #eb5841;
}
.product-price span:nth-of-type(1) {
  font-size: 32px;
  font-weight: bold;
}
.product-price span:nth-of-type(2) {
  color: #8f8f94;
  text-decoration: line-through;
}
.cart-operate {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 192px;
  height: 86px;
  display: flex;
  justify-content: space-between;
}
.operate-btn {
  width: 87px;
  height: 100%;
  z-index: 5;
  position: relative;
}
.product-sub::after {
  background: url('https://bht.liwushijian.com/library/img/xcx_img/sub.png') no-repeat center center/16px 16px;
}
.product-add::after {
  background: url('https://bht.liwushijian.com/library/img/xcx_img/add.png') no-repeat center center/16px 16px;
}
.product-add.not-add::after {
  background-color: #ccc;
}
.operate-btn::after {
  position: absolute;
  content: '';
  width: 47px;
  height: 44px;
  top: 20px;
  bottom: 20px;
  border: 1px solid #aaa;
  box-sizing: border-box;
}
.product-sub::after {
  left: 20px;
}
.product-add::after {
  right: 20px;
}
.shop-num {
  position: absolute;
  top: 20px;
  left: 67px;
  right: 67px;
  height: 44px;
  z-index: 3;
  line-height: 82px;
  font-size: 26px;
  color: #222;
  text-align: center;
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
}
.product-del {
  position: absolute;
  top: 18px;
  right: 10px;
  width: 60px;
  height: 60px;
  padding: 20px;
  display: flex;
  z-index: 5;
}

/*底部*/
.cart-empty {
  height: 120px;
}
.cart-data {
  height: 120px;
  background-color: #fff;
  line-height: 120px;
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
  text-align: right;
  margin-right: 30px;
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
/* 购物车商品列表 end */
/*.cart-bottom .van-submit-bar__bar {
	height: 120px;
	padding: 0;
}
.cart-bottom .van-checkbox {
	height: 100%;
	padding-left: 40px;
}
.cart-bottom .van-checkbox__icon {
	height: 32px;
	line-height: 32px;
	font-size: 20px;
}
.cart-bottom .van-checkbox__label {
	margin-left: 20px;
  color: #8f8f94;
  font-size: 24px;
}*/
</style>

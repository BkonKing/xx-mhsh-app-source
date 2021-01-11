<template>
  <div class="app-body">
    <div class="order-bar bar-white">
      <van-nav-bar
        title="购物车"
        fixed
        :border="false"
        placeholder
        left-arrow
        @click-left="$router.go(-1)"
      ></van-nav-bar>
    </div>
    <div v-if="carts.length" class="cart-session">
      <div class="cart-list">
        <div :class="[item.goods_type == 2 ? 'cart-item-tm' : '','cart-item']" v-for="(item,index) in carts" :key="index" @click="linkFunc(5,{id: item.goods_id})">
          <div :class="[item.is_checked ? 'cur' : '', 'cart-checkbox']" @click.stop="checkboxOne(index)">
            <div class="checkbox-session"></div>
          </div>
          <div class="cart-cont" hover-class="none">
            <div class="product-pic">
              <img class="img-100" mode="aspectFill" :src="item.specs_img" />
            </div>
            <div class="product-info">
              <div class="product-name p-nowrap">{{item.goods_name}}</div>
              <div @click.stop="SelectSku(item.goods_id, index)" class="product-specs">
                <div>{{item.specs_name}}<img src="@/assets/img/down.png" /></div>
              </div>
              <!-- <div v-if="item.goods_type == 2" class="flex-align-center"><div class="product-icon flex-center">特卖</div></div> -->
              <div class="flex-align-center">
                <div v-if="item.goods_type == 2" class="product-icon goods-type flex-center">特卖</div>
                <!-- <div class="product-icon flex-center product-label">顺丰</div> -->
              </div>
              <div class="product-price">￥<span>{{item.s_price/100}}</span> <span v-if="item.y_price && item.y_price!=0">￥{{item.y_price/100}}</span></div>
            </div>
          </div>
          <div class="cart-operate">
            <div class="operate-btn product-sub flex-between" @click.stop="countTab(index,-1)"></div>
            <div class="shop-btn-block">
              <div class="shop-num">{{item.count}}</div>
            </div>
            <div :class="[parseInt(item.count) >= parseInt(item.max_buy) ? 'not-add' : '','operate-btn product-add flex-between']" @click.stop="countTab(index,1)"></div>
          </div>
          <div class="product-del" @click.stop="delCarts(index)" v-txAnalysis="{eventId: 13}"><img class="img-100" mode="aspectFill" src="@/assets/img/close_02.png" /></div>
        </div>
      </div>
    </div>
    <div v-else class="empty-session">
      <img src="@/assets/img/empty_cart.png" />
      <div>暂无商品</div>
    </div>
    <div class="cart-empty"></div>
    <div v-if="carts.length" class="cart-bottom bottom-fixed">
      <div class="cart-data flex-align-center">
        <div :class="[allSelected ? 'cur' : '', 'all-checkbox']" @click="checkboxAll"><div class="all-checkbox-session"></div>全选</div>
        <div class="all-price"><span>合计：</span>￥{{priceTotal}}</div>
        <div class="all-go flex-center" v-txAnalysis="{eventId: 15}" @click="payFunc">结算({{numTotal}})</div>
      </div>
    </div>
    <goods-sku
      :goods-id="goodsId"
      :carts-index="cartsIndex"
      :id-change="idChange"
      :show-sku="showSku"
      :closeSku.sync='showSku'
      @sureSku="sureSku"
      >
    </goods-sku >
    <remind-swal
      :show-swal="showSwal"
      :remind-tit="remindTit"
      @closeSwal="closeSwal"
      @sureSwal="sureSwal()">
    </remind-swal>
  </div>
</template>

<script>
import { NavBar, Toast } from 'vant'
import { getCart } from '@/api/life.js'
import goodsSku from './../components/goods-sku'
import remindSwal from './../components/remind-swal'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    goodsSku,
    remindSwal
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      checked: false,

      carts: [], // 购物车
      priceTotal: '', // 支付总额
      numTotal: '', // 支付商品总件数
      noneHidden: true, // 购物车是否为空
      allSelected: true, // 全选
      cartsIndex: -1, // 选中的购物车index
      delIndex: 0, // 要删除的index
      goodsId: 0,
      showSku: false,
      idChange: 1, // 0商品id不变 1商品id变化
      showSwal: false, // 提醒弹窗
      remindTit: '是否删除商品？' // 提醒标题
    }
  },
  created () {
    // var carts = JSON.parse(localStorage.getItem('cart'));
    var carts = api.getPrefs({ sync: true, key: 'cart' }) || []
    if (carts && carts.length > 0) {
      carts = JSON.parse(carts)
    }
    this.carts = carts
    this.total()
    // this.getData();
  },
  methods: {
    getData () {
      console.log('cart', this.carts)
      getCart({
        giftbag: JSON.stringify(this.carts)
      }).then(res => {
        if (res.success) {
          this.infoData = res.data
          this.carts = res.goods_arr
          api.setPrefs({ key: 'cart', value: JSON.stringify(this.carts) })
        }
      })
    },
    // 修改选择规格
    SelectSku (id, index) {
      if (id == this.goodsId && this.cartsIndex == index) {
        this.idChange = 0
      } else {
        this.goodsId = parseInt(id)
        this.idChange = 1
      }
      this.cartsIndex = index
      this.showSku = true
    },
    sureSku (callData) {
      this.showSku = false
      this.carts = callData
      this.total()
    },
    // 关闭提醒弹窗
    closeSwal (data) {
      console.log(data)
      this.showSwal = data == 1
    },
    // 确定删除
    sureSwal: function (e) {
      this.closeSwal(0)
      this.delCarts(this.delIndex)
    },
    linkFunc (type, obj = {}) {
      switch (type) {
        case 5:
          this.$router.push({
            path: '/store/goods-detail',
            query: {
              id: obj.id
            }
          })
          break
        case 8:
          this.$router.push({
            path: '/life/settlement',
            query: {
              id: 1
            }
          })
          break
      }
    },
    // 商品数量加减
    countTab (index, types) {
      if (types === 1 && this.carts[index].count >= this.carts[index].max_buy) return
      if (parseInt(this.carts[index].count) + types > 0) {
        this.carts[index].count = parseInt(this.carts[index].count) + types
      } else {
        this.showSwal = true
        this.delIndex = index
        return
      }
      // localStorage.setItem('cart', JSON.stringify(this.carts));
      api.setPrefs({ key: 'cart', value: JSON.stringify(this.carts) })
      this.total()
    },
    // 点击删除按钮
    delCarts (index) {
      this.delOne(index)
      // localStorage.setItem('cart', JSON.stringify(this.carts));
      api.setPrefs({ key: 'cart', value: JSON.stringify(this.carts) })
      this.total()
    },
    // 删除购物车中的某个商品
    delOne (index) {
      const indexTab = index
      const carts_arr = this.carts
      carts_arr.splice(indexTab, 1)
      this.carts = carts_arr
    },
    /**
     * 勾选/取消单个商品
    */
    checkboxOne (index) {
      const indexTab = index
      this.carts[index].is_checked = !this.carts[indexTab].is_checked
      // localStorage.setItem('cart', JSON.stringify(this.carts));
      api.setPrefs({ key: 'cart', value: JSON.stringify(this.carts) })
      this.total()
    },
    /**
     * 全选/全不选
    */
    checkboxAll () {
      const carts_arr = this.carts
      const is_checked = this.allSelected
      for (let i = 0; i < carts_arr.length; i++) {
        carts_arr[i].is_checked = !is_checked
      }
      this.carts = carts_arr
      this.allSelected = !is_checked
      // localStorage.setItem('cart', JSON.stringify(this.carts));
      api.setPrefs({ key: 'cart', value: JSON.stringify(this.carts) })
      this.total()
    },
    /**
     * 计算商品数量/价格
     */
    total () {
      const carts_arr = this.carts
      if (carts_arr.length < 1) {
        this.numTotal = 0
        this.priceTotal = '0.00'
        this.allSelected = false
      } else {
        const carts_list = []
        let numTotal = 0
        let priceTotal = 0
        let checked_num = 0
        for (var j in carts_arr) {
          if (carts_arr[j].is_checked) {
            checked_num++
            numTotal += parseInt(carts_arr[j].count)
            priceTotal += parseFloat(carts_arr[j].count * carts_arr[j].pay_price)
          }
        }
        this.allSelected = checked_num === carts_arr.length
        this.numTotal = numTotal
        this.priceTotal = 0 ? '0.00' : (priceTotal / 100).toFixed(2)
        if (numTotal > 0) {
          this.getData()
        }
      }
    },
    /**
     * 结算
    */
    payFunc () {
      const that = this
      if (this.numTotal === 0) {
        Toast('请选择要结算的商品')
      } else {
        getCart({
          giftbag: JSON.stringify(this.carts)
        }).then(res => {
          if (res.success) {
            if (res.goods_arr.length && that.infoData.total_pay_price == res.data.total_pay_price) {
              that.linkFunc(8)
            } else {
              that.carts = res.goods_arr
              api.setPrefs({ key: 'cart', value: JSON.stringify(that.carts) })
              that.total()
            }
          }
        })
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
  min-height: 229px;
  border-radius: 10px;
}
.cart-item-sg,.cart-item-tm {
  /* height: 253px; */
}
.cart-item:last-child {
  margin-bottom: 0;
}
.cart-checkbox {
  width: 72px;
  flex-shrink: 0;
  /* height: 100%; */
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
  width: 166px;
  height: 166px;
  display: flex;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f4f4f4;
}
.product-info {
  width: 442px;
}
.product-name {
  line-height: 38px;
  color: #222;
  width: 406px;
  margin-bottom: 14px;
}
.product-specs {
  font-size: 24px;
  color: #8F8F94;
  height: 52px;
  display: flex;
  margin-bottom: 20px;
}
.product-specs div {
  display: flex;
  align-items: center;
  height: 100%;
  line-height: 52px;
  background: #F2F2F4;
  padding: 0 20px;
}
.product-specs img {
  width: 18px;
  height: 10px;
  margin-left: 12px;
}
.product-icon {
  padding: 0 10px;
  height: 36px;
  line-height: 36px;
  border-radius: 4px;
  overflow: hidden;
  font-size: 24px;
  margin-bottom: 10px;
  margin-right: 10px;
}
.cart-item-tm .product-icon.goods-type {
  color: #fff;
  background: linear-gradient(90deg, #EB5841, #FFA45A);
}
.cart-item-sg .product-icon.goods-type {
  color: #fff;
  background: linear-gradient(90deg, #FFA110, #FFC017);
}
.product-label {
  color: #55b862;
  border: 1PX solid #55b862;
  line-height: 34px;
  /* display: none; */
}
.product-price {
  line-height: 42px;
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
  border: 1.3px solid #aaa;
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
  border-top: 1.3px solid #aaa;
  border-bottom: 1.3px solid #aaa;
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
.product-del img {
  width: 20px;
  height: 20px;
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

<template>
  <div>
    <div v-show="contShow" class="public-mask  bottom-fixed">
      <div class="public-dclose" @click="showFunc()"><img class="img-100" src="@/assets/img/close.png" /></div>
      <div class="shops-params" v-if="skuList.length > 0">
        <div class="params-goods-info">
          <div class="params-goods-left">
            <img class="img-100" :src="skuList[typeVal].specs_img" data-src="" />
          </div>
          <div class="params-goods-right">
            <div>
              <div class="goods-name p-nowrapm">{{infoData.goods_name}}</div>
              <template v-if="infoData.goods_type<3">
                <div class="goods-price">
                  <span class="font-24">￥</span>{{skuList[typeVal].s_price/100}}
                  <span v-if="skuList[typeVal].y_price && skuList[typeVal].y_price!='0'" class="font-24 color-8f8f94 font-normal through-line">￥{{skuList[typeVal].y_price/100}}</span>
                </div>
              </template>
              <template v-else>
                <div v-if="is_collage" class="goods-price">
                  <span class="font-24">￥</span>{{skuList[typeVal].s_price/100}}
                  <span v-if="skuList[typeVal].y_price && skuList[typeVal].y_price!='0'" class="font-24 color-8f8f94 font-normal through-line">￥{{skuList[typeVal].y_price/100}}</span>
                </div>
                <div v-else class="goods-price">
                  <span class="font-24">￥</span>{{infoData.ollage_info.is_start == 1 ? skuList[typeVal].o_price/100 : skuList[typeVal].s_price/100}}
                  <span v-if="skuList[typeVal].y_price && skuList[typeVal].y_price!='0'" class="font-24 color-8f8f94 font-normal through-line">￥{{skuList[typeVal].y_price/100}}</span>
                </div>
              </template>
            </div>
            <template v-if="infoData.pay_type == 1">
              <div class="happy-block"><div class="happy-coin"><img src="@/assets/img/icon_20.png" />{{skuList[typeVal].credits/10}}</div></div>
            </template>
            <template v-else>
              <template v-if="infoData.goods_type<3">
                <div v-if="skuList[typeVal].credits!=0" class="happy-block"><div class="happy-coin">幸福币可抵￥{{skuList[typeVal].credits/100}}</div></div>
              </template>
              <template v-else>
                <div class="happy-block" v-if="(is_collage&&skuList[typeVal].p_credits!=0) || (!is_collage && infoData.ollage_info.is_start==1&&skuList[typeVal].o_credits!=0) || (infoData.ollage_info.is_start!=1&&skuList[typeVal].credits!=0)"><div class="happy-coin">幸福币可抵￥{{is_collage ? skuList[typeVal].p_credits/100 : (infoData.ollage_info.is_start == 1 ? skuList[typeVal].o_credits/100 : skuList[typeVal].credits/100)}}</div></div>
              </template>
            </template>
          </div>
        </div>

        <div class="shops-dlist">
          <div class="shops-ditem">
            <div class="shops-dtit">规格</div>
            <div class="doption-list">
              <div v-for="(item, index) in skuList" :key="index" :class="[typeVal == index ? 'active' : '','shops-doption']" @click="typeFunc(index)">{{item.specs_name}}</div>
            </div>
          </div>
          <div class="shops-ditem">
            <div class="shops-dtit">数量</div>
            <div class="goods-num-count">
              <div class="goods-btn-block">
                <van-stepper v-model="skuList[typeVal].count" min="1" :max="+skuList[typeVal].stock" integer />
                <!-- <div class="goods-btn goods-sub" @click.stop="countTab(-1)" data-types="-1">-</div>
                <div class="goods-num">{{skuList[typeVal].count}}</div>
                <div :class="[skuList[typeVal].notAdd ? 'not-add' : '','goods-btn goods-add']" @click.stop="countTab(1)">+</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="submit-btn" @click="addCar()">{{infoData.pay_type == 1 ? '确认兑换' : '确认'}}</div>
    </div>
    <div v-show="contShow" class="mask-bg" @click="showFunc"></div>
  </div>
</template>

<script>
import { Icon, ImagePreview } from 'vant'
import { getGoodsDetail } from '@/api/life.js'
export default {
  components: {
    [Icon.name]: Icon,
    [ImagePreview.name]: ImagePreview
  },
  name: 'goods-sku',
  props: {
    showSku: {
      type: Boolean,
      default: false
    },
    idChange: {
      type: Number,
      default: 1
    },
    goodsId: {
      type: Number,
      default: 0
    },
    cartsIndex: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      contShow: false,
      skuList: [], // 商品规格
      isShow: false, // 商品规格弹窗是否显示
      typeVal: 0, // 当前选中的商品规格index
      is_collage: true, // 是否拼单(拼单专用 true拼单 false 单独购买)
      f_orderid: '', // 拼单分享 分享人订单id(f_collage_order_project_id)
      f_id: '', // 参与的拼单 id
      specs_id: '', // 拼单分享 分享商品规格id
      goods: { // 购物车
        goods_id: '',
        goods_name: '',
        sign_url: '',
        count: 1, // 数量
        goods_type: 1, // 类型 1正常  2特价  3闪购
        special_bargain_type: '', // 1专区 2特价
        y_specs_img: '', // 规格图
        specs_img: '', // 规格图
        specs_name: '', // 规格名称
        specs_id: '', // 规格id
        s_price: '', // 售价
        pay_price: '', // 售价
        y_price: '', // 规格原价
        credits: '', // 规格幸福币
        stock: 0, // 库存
        max_buy: 0, // 限制最大购买数
        is_checked: true, // 是否选中（购物车中）
        tip_text: ''
      },
      cartCounts: 0, // 购物车中这个商品的总数量
      // goodsId: '', // 商品id
      infoData: '' // 商品数据
    }
  },
  created () {
    console.log(this.goodsId)
    // this.getData()
  },
  methods: {
    showFunc () {
      // this.showSku = false
      // this.$emit('update:showSku', false)
      // this.$emit('closeSku')
      this.contShow = false
      this.$emit('update:closeSku', false)
    },
    getData () {
      getGoodsDetail({
        goods_id: this.goodsId,
        f_id: this.f_orderid
      }).then(res => {
        if (res.success) {
          this.infoData = res.data
          this.ableCredits = res.ok_credits
          this.swiperArr = res.data.pic_url_arr
          this.skuList = res.data.formats
          const arr = this.getCarts()
          const selectCarts = arr[this.cartsIndex]
          let skuIndex = 0
          this.skuList.forEach((res2, index) => {
            if (selectCarts.specs_id == res2.specs_id) {
              skuIndex = index
              this.$set(res2, 'count', selectCarts.count)
            } else {
              this.$set(res2, 'count', 1)
            }
            // this.skuPicArr.push(res2.specs_img)
          })
          this.newTime = parseInt(new Date().getTime())

          this.goods.goods_id = res.data.id
          this.goods.goods_name = res.data.goods_name
          this.goods.goods_type = res.data.goods_type
          this.goods.tip_text = res.data.tip_text
          if (res.data.goods_type == 3) {
            this.goods.sign_url = res.data.sign_url
          }
          if (res.data.goods_type == 2) {
            this.goods.special_bargain_type = res.data.special_bargain_type
          }
          this.contShow = true
          this.typeFunc(skuIndex)
        }
      })
    },
    /*
    *选中规格
    */
    typeFunc (index) {
      const nowSku = this.skuList[index]
      this.typeVal = index
      this.goods.y_specs_img = nowSku.y_specs_img
      this.goods.specs_img = nowSku.specs_img
      this.goods.specs_name = nowSku.specs_name
      this.goods.specs_id = nowSku.specs_id
      this.goods.s_price = nowSku.s_price
      this.goods.pay_price = nowSku.s_price
      this.goods.y_price = nowSku.y_price ? nowSku.y_price : 0
      this.goods.credits = nowSku.credits
      this.goods.stock = nowSku.stock
      nowSku.count = nowSku.count ? nowSku.count : 1
      nowSku.notAdd = nowSku.notAdd ? nowSku.notAdd : false
      // this.goods.count = 1;
      this.limitNum()
    },
    /**
     * 判断限购数量是否大于购物车数量
    */
    limitNum () {
      // let cartsArr = JSON.parse(localStorage.getItem('cart')) || [];
      var cartsArr = this.getCarts()
      // let cartCounts = 0
      var numCount = this.skuList[this.typeVal].count
      const that = this
      if (cartsArr.length > 0) {
        cartsArr.forEach(function (val, index) {
          if (val.specs_id == that.skuList[that.typeVal].specs_id) {
            if (that.infoData.goods_type != 3 || that.infoData.ollage_info.is_start != 1) {
              numCount += parseInt(val.count)
            }
            // cartCounts += parseInt(val.count)
          }
        })
        // this.cartCounts = cartCounts;
      }

      this.goods.max_buy = parseInt(this.skuList[this.typeVal].stock)
      if (this.infoData.goods_type == 3) {
        if (this.goods.max_buy > parseInt(this.infoData.ollage_quota_num)) {
          this.goods.max_buy = parseInt(this.infoData.ollage_quota_num)
        }
      }
      if (this.infoData.is_quota == 1) {
        if (parseInt(this.goods.max_buy) > parseInt(this.infoData.quota_num)) {
          this.goods.max_buy = parseInt(this.infoData.quota_num)
        }
      }
      if (numCount >= this.goods.max_buy) {
        this.skuList[this.typeVal].notAdd = true
      } else {
        this.skuList[this.typeVal].notAdd = false
      }
    },
    /*
    *商品数量加减
    */
    countTab (types) {
      const nowSku = this.skuList[this.typeVal]
      nowSku.stock = parseInt(nowSku.stock)
      if (nowSku.notAdd && types == 1) return
      if (nowSku.stock > this.goods.max_buy) {
        nowSku.stock = this.goods.max_buy
      }
      if (nowSku.count + types >= nowSku.stock) {
        console.log(nowSku.count, nowSku.stock)
        if (nowSku.count + types == nowSku.stock) {
          nowSku.count = parseInt(nowSku.count) + types
        }
        console.log(nowSku.count, nowSku.stock)
        nowSku.notAdd = true; return
      }
      if (nowSku.count + types > 0) {
        nowSku.count = parseInt(nowSku.count) + types
        nowSku.notAdd = false
      }
    },
    getCarts () {
      let arr = api.getPrefs({ sync: true, key: 'cart' }) || []
      if (arr && arr.length > 0) {
        arr = JSON.parse(arr)
      }
      return arr
    },
    /**
     * 加入购物车
     */
    addCar: function (e) {
      this.checkData()
    },
    // 加入购物车
    checkNext () {
      var goods = this.goods
      goods.count = this.skuList[this.typeVal].count
      // goods.isSelect = false;
      // 获取购物车的缓存数组（没有数据，则赋予一个空数组）
      var arr = []
      if ((this.infoData.pay_type == 0 && this.infoData.goods_type < 3) || (this.infoData.goods_type == 3 && this.infoData.ollage_info.is_start == 0)) {
        // var arr = JSON.parse(localStorage.getItem('cart')) || [];
        var arr = this.getCarts()
        if (arr.length > 0) {
          // 遍历购物车数组
          let status = 1 // 1 规格不变，只改数量 2 规格变动，并且购物车中有修改后的规格 3 规格变动，购物车中无该规格
          let nowIndex = 0
          for (var j in arr) {
            if (arr[j].goods_id == goods.goods_id) {
              if (arr[j].specs_id == goods.specs_id) {
                if (j == this.cartsIndex) {
                  status = 1
                  break
                } else {
                  nowIndex = j
                  status = 2
                  break
                }
              } else {
                status = 3
              }
            }
          }
          if (status == 1) {
            arr[this.cartsIndex] = goods
          } else if (status == 2) {
            if (parseInt(arr[nowIndex].count) >= goods.max_buy) { // 判断是否已经达到限购
              arr[nowIndex].count = parseInt(arr[nowIndex].count) + goods.count - 1
            } else {
              arr[nowIndex].count = parseInt(arr[nowIndex].count) + goods.count
            }
            if (parseInt(arr[nowIndex].max_buy) > goods.max_buy) {
              arr[nowIndex].max_buy = goods.max_buy
            }
            arr.splice(this.cartsIndex, 1)
          } else {
            arr.splice(this.cartsIndex, 1, goods)
          }
          console.log(arr)
          try {
            // localStorage.setItem('cart', JSON.stringify(arr))
            api.setPrefs({ key: 'cart', value: JSON.stringify(arr) })
          } catch (e) {
            console.log(e)
          }
          this.contShow = false
          this.$emit('sureSku', arr)
          return
        } else {
          arr.push(goods)
        }
        // 最后，把购物车数据，存放入缓存
        try {
          // localStorage.setItem('cart', JSON.stringify(arr));
          api.setPrefs({ key: 'cart', value: JSON.stringify(arr) })
          // 返回（在if内使用return，跳出循环节约运算，节约性能）
          // 关闭窗口
          return
        } catch (e) {
          console.log(e)
        }
      } else {
        arr.push(goods)
        // localStorage.setItem('cart2', JSON.stringify(arr));
        api.setPrefs({ key: 'cart2', value: JSON.stringify(arr) })
      }
    },
    // 再次请求数据，验证商品信息是否更改
    checkData () {
      const that = this
      var backVal = true
      getGoodsDetail({
        goods_id: this.goodsId,
        f_id: this.f_orderid
      }).then(res => {
        var newData = res.data
        if (newData.is_sell_out > 0) { // 上下架变动
          backVal = false
        } else {
          if (that.infoData.pay_type != newData.pay_type) { // 购买方式变动（兑换/购买）
            backVal = false
          } else {
            if (that.infoData.goods_type != newData.goods_type) { // 商品购买类型变动（闪购/特卖）
              backVal = false
            } else {
              if (that.infoData.goods_type == 3 && that.infoData.ollage_info.is_start != newData.ollage_info.is_start) { // 闪购状态改变
                backVal = false
              }
            }
          }
        }
        if (backVal) {
          that.checkNext()
        } else {
          that.getData()
        }
      })
    }
  },
  watch: {
    cartsIndex (newV, oldV) {
      this.getData()
    },
    showSku (newV) {
      if (newV) {
        if (!this.idChange) {
          const arr = this.getCarts()
          const count = arr[this.cartsIndex].count
          this.goods.count = count
          this.skuList[this.typeVal].count = count
          this.contShow = true
        }
      }
    }
  }
}
</script>

<style src="../../../styles/life.css" scoped></style>

<style lang="less" scoped>
/deep/ .van-stepper__minus,
/deep/ .van-stepper__plus {
  width: 48px;
  height: 48px;
  background-color: #fff;
  border: 1px solid #ccc;
}
/deep/ .van-stepper__minus--disabled,
/deep/ .van-stepper__plus--disabled {
  background-color: #f2f2f4;
}
/deep/ .van-stepper__input {
  width: 68px;
  height: 48px;
  background-color: #fff;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.goods-price {
  line-height: 70px;
  color: #eb5841;
  font-size: 44px;
  font-weight: bold;
}
.happy-block {
  height: 60px;
  display: flex;
}
.happy-coin {
  display: flex;
  align-items: center;
  height: 60px;
  font-size: 24px;
  padding: 0 28px;
  background: rgba(235, 88, 65, 0.1);
  color: #EB5841;
  margin: 0 auto;
  border-radius: 30px;
}
.happy-coin img {
  width: 28px;
  height: 28px;
  margin-right: 8px;
}
/*规格*/
.shops-params {
  position: relative;
  padding: 40px 0 0 0;
  min-height: 180px;
  background-color: #fff;
}
.params-goods-info {
  height: 230px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.params-goods-left {
  width: 230px;
  height: 100%;
  display: flex;
  flex-shrink: 0;
  background-color: #f4f4f4;
}
.params-goods-right {
  width: 431px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.params-goods-right .goods-name {
  font-size: 30px;
  line-height: 40px;
  text-align: left;
  margin-top: 6px;
}
.params-goods-right .goods-price {
  line-height: 76px;
  margin: 0 0 8px 0;
  font-size: 42px;
  text-align: left;
}
.params-goods-right .happy-coin {
  margin: 0;
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
  border: 1.3px solid #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}
.not-add.goods-btn {
  background-color: #eee;
}
.goods-num {
  float: left;
  width: 58px;
  height: 100%;
  border-top: 1.3px solid #aaa;
  border-bottom: 1.3px solid #aaa;
  box-sizing: border-box;
  min-height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #222;
}
.submit-btn {
  color: #fff;
  font-size: 30px;
}
</style>

<template>
  <div class="app-body">
    <div class="body-block">
      <div class="order-bar">
        <van-nav-bar
          title="订单详情"
          fixed
          :border="false"
          placeholder
          left-arrow
          @click-left="$router.go(-1)"
        >
          <template #right>
            <a :href="'tel: '+orderInfo.customerServiceHotline" class="nav-serve" v-txAnalysis="{eventId: 53}"><img src="@/assets/img/icon_23.png" /></a>
          </template>
        </van-nav-bar>
      </div>
      <div v-if="orderInfo" :class="[(orderInfo.is_cancel_btn || orderInfo.is_again_pay_btn || orderInfo.is_logistice_btn) && !(goodsList[0].buy_type == 1 && orderInfo.order_status==3) ? 'scroll-body-btn' : '', 'order-session scroll-body']">
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
          <div v-for="(item, index) in goodsList" @click.stop="linkFunc(5,{id: item.goods_id})" :class="[index > 4 ? 'toggle-up' : '', is_toggle ? 'toggle-down' : '', 'order-goods-info']">
            <div class="order-pic-block">
              <img class="img-100" mode="aspectFill" :src="item.specs_img" />
            </div>
            <div class="order-info">
              <div class="order-name-price">
                <div class="order-name p-nowrap">{{item.goods_name}}</div>
                <div class="order-price">￥{{item.pay_type == 1 ? item.happiness_price/100 : item.pay_price/100}}</div>
              </div>
              <div class="order-sku-num">
                <div class="order-sku p-nowrap">{{item.specs_name}}</div>
                <div v-if="item.y_pay_price && item.y_pay_price!='0'" class="order-num">￥{{item.y_pay_price/100}}</div>
              </div>
              <div class="order-action-session">
                <div v-if="item.is_returnfund==0 || item.is_return==0" @click.stop="openExplainSwal" class="order-action-text color-8f8f94">
                  {{item.is_returnfund==0 ? '不支持退换' : '不支持退货'}}
                  <div class="order-action-btn">
                    <img class="img-100" src="@/assets/img/question_01.png" mode="" />
                  </div>
                </div>
                <div v-else class="order-action-text">
                  {{item.order_status_name}}
                </div>
                <div class="order-buy-num">x1</div>
              </div>
            </div>
            <div v-if="item.is_shouhou_btn == 1" class="order-goods-btn">
              <div @click.stop="linkFunc(14,{logistice_id: item.logistice_id})" class="order-border-btn" hover-class="none">申请退换</div>
            </div>
            <div v-if="item.is_barter_btn == 1 || item.is_refund_btn == 1 || item.is_returnfund_btn == 1" class="order-goods-btn">
              <div v-if="item.is_barter_btn == 1" @click.stop="linkFunc(16,{id: item.sale_order_id})" class="order-border-btn" hover-class="none">换货详情</div>
              <div v-if="item.is_refund_btn == 1" @click.stop="linkFunc(18,{id: item.sale_order_id,type: 1})" class="order-border-btn" hover-class="none">退款详情</div>
              <div v-if="item.is_returnfund_btn == 1" @click.stop="linkFunc(18,{id: item.sale_order_id,type: 2})" class="order-border-btn" hover-class="none">退款详情</div>
            </div>
          </div>
          <div @click.stop="toggle()" v-show="goodsList.length > 5" :class="[is_toggle ? 'btn-up' : '', 'toggle-btn']">
            <img src="@/assets/img/icon_25.png" />
          </div>
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
              合计:<span>￥{{orderInfo.pay_type==1 ? orderInfo.happiness_price/100 : orderInfo.pay_price/100}}</span>
            </div>
          </div>
        </div>
        <div v-if="goodsList[0].buy_type == 1" @click="(orderInfo.project_logistice_buy_type && orderInfo.project_logistice_buy_type == 1 && orderInfo.order_status==3) && getLogistics()" class="cont-session order-message smzt-session">
          <div class="order-message-item th-type">
            <div class="order-message-item-left color-222 font-28">配送方式</div>
            <div class="color-222 font-28 order-message-item-right">上门自提</div>
          </div>
          <div :class="[!(orderInfo.project_logistice_buy_type && orderInfo.project_logistice_buy_type == 1 && orderInfo.order_status!=3) ? 'th-item-log' : '', 'order-message-item th-item']">
            <div class="order-message-item-left color-222 font-28">提货地点</div>
            <div class="shipping-address-item-right">
              <div class="color-222 font-28">{{goodsList[0].take_address}}</div>
            </div>
          </div>
          <template v-if="orderInfo.project_logistice_buy_type && orderInfo.project_logistice_buy_type == 1 && orderInfo.order_status!=3">
            <div class="th-line"></div>
            <div class="th-code" @click.stop="getLogistics"><img class="img-100" src="@/assets/img/code.png" /></div>
          </template>
          <img v-if="orderInfo.project_logistice_buy_type && orderInfo.project_logistice_buy_type == 1 && orderInfo.order_status==3" class="shipping-address-icon" src="@/assets/img/right.png" />
        </div>
        <div v-else class="cont-session address-logistics">
          <div @click="linkFunc(23)" class="shipping-address">
            <div class="shipping-address-item">
              <div class="shipping-address-item-left color-222 font-28">收货地址:</div>
              <div class="shipping-address-item-right">
                <div class="shipping-address-username p-nowrap">{{orderInfo.rece_realname}}</div>
                <div class="color-222 font-28">{{orderInfo.rece_mobile}}</div>
                <img v-if="orderInfo.is_again_pay_btn" class="shipping-address-icon" src="@/assets/img/right.png" />
              </div>
            </div>
            <div class="shipping-address-item">
              <div class="shipping-address-item-left"></div>
              <div class="shipping-address-item-right">
                <div class="shipping-address-text">{{orderInfo.rece_address}}</div>
              </div>
            </div>
          </div>
          <div @click="logisticsLink" v-if="logisticsInfo" class="shipping-logistics">
            <div v-if="logisticsInfo.l_status == 0" class="shipping-address-item">
              <div class="shipping-address-item-left color-222 font-28">物流配送:</div>
              <div class="shipping-address-item-right">
                <div class="color-222 font-28">{{logisticsInfo.kuaidi_name}}</div>
                <div class="color-8f8f94 font-28">({{logisticsInfo.kuaidi_numb}})</div>
                <img class="shipping-address-icon" src="@/assets/img/right.png" />
              </div>
            </div>
            <div v-else class="shipping-address-item">
              <div class="shipping-address-item-left color-222 font-28">物流配送:</div>
              <div class="shipping-address-item-right">
                <div class="color-222 font-28">{{logisticsInfo.kuaidi_name}}</div>
                <div class="color-8f8f94 font-28">(已签收)</div>
                <img class="shipping-address-icon" src="@/assets/img/right.png" />
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
          <div v-if="orderInfo.cancel_time" class="order-message-item">
            <div class="order-message-item-left color-8f8f94 font-28">取消时间:</div>
            <div class="color-8f8f94 font-28 order-message-item-right">{{orderInfo.cancel_time}}</div>
          </div>
        </div>
      </div>

      <template v-if="(orderInfo.is_cancel_btn || orderInfo.is_again_pay_btn || orderInfo.is_logistice_btn) && !(goodsList[0].buy_type == 1 && orderInfo.order_status==3)">
        <div class="fixed-empty"></div>
        <div class="btn-fixed-buttom">
          <div v-if="orderInfo.is_cancel_btn" @click="openSwal" class="order-border-btn" hover-class="none" v-txAnalysis="{eventId: 51}">取消订单</div>
          <template v-if="orderInfo.is_logistice_btn">
            <div v-if="orderInfo.project_logistice_buy_type && orderInfo.project_logistice_buy_type == 1" @click="getLogistics" class="order-border-btn paid-btn" hover-class="none">提货二维码</div>
            <div v-else @click="logisticsLink" class="order-border-btn" hover-class="none">物流详情</div>
          </template>
          <div @click.stop="payFunc()" v-if="orderInfo.is_again_pay_btn" class="order-border-btn paid-btn">付款(<van-count-down ref="countDown" :auto-start="true" :time="orderInfo.is_again_pay_time*1000-newTime" @finish="finish" @change="getChangeTime">
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
      <pay-swal
      ref="payblock"
      :showSwal.sync="showPaySwal"
      :pay-money="payMoney"
      :down-time="downTime"
      @sureSwal="surePaySwal"
      @fyResult="fyResult"
      ></pay-swal>
      <remind-swal
      :show-swal="showSwal"
      :remind-tit="remindTit"
      @closeSwal="closeSwal"
      @sureSwal="sureSwal()">
      </remind-swal>
      <zt-order ref="ztswal" :thSwal.sync="thSwal"></zt-order>
    </div>
  </div>
</template>

<script>
import { NavBar, CountDown, Toast } from 'vant'
import paySwal from './../components/pay-swal'
import explainSwal from './../components/explain-swal'
import remindSwal from './../components/remind-swal'
import ztOrder from './../components/zt-order'
import eventBus from '@/api/eventbus.js'
import { getOrderDetail, cancelNoPayOrder, cancelPayOrder, payOrderUp, editOrderAddress } from '@/api/life.js'
export default {
  name: 'orderDetail',
  components: {
    [NavBar.name]: NavBar,
    [CountDown.name]: CountDown,
    [Toast.name]: Toast,
    paySwal,
    explainSwal,
    remindSwal,
    ztOrder
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      showExplainSwal: false, // 弹窗
      swalCont: '贵重物品、贴身衣物、肉类果蔬生鲜商品、定制商品、虚拟商品、报纸期刊等，处于信息安全或者卫生考虑，不支持无理由退货。跨境商品不支持换货。',
      newTime: '', // 当前时间
      time: 11 * 60 * 60 * 1000,
      goodsList: [],
      orderInfo: '',
      logisticsInfo: '',
      showSwal: false, // 提醒弹窗
      remindTit: '确定取消订单', // 提醒标题

      showPaySwal: false, // 支付方式弹窗
      payMoney: 0, // 支付金额
      downTime: 0, // 支付结束时间
      is_toggle: false,
      idcard: '', // 身份证
      thSwal: false, // 自提弹窗
      timer: '', // 定时器
      infoData: '' // 自提物流信息
    }
  },
  mounted () {
    var that = this
    // 根据key名获取传递回来的参数，data就是map
    eventBus.$on('chooseAddress', function (data) {
      if (data) {
        that.addressInfo = JSON.parse(data)
        that.orderInfo.rece_realname = that.addressInfo.realname
        that.orderInfo.rece_mobile = that.addressInfo.mobile
        that.orderInfo.rece_address = that.addressInfo.address_detail + that.addressInfo.address_name + that.addressInfo.address_house
        that.orderAddress(that.addressInfo.id)
      }
    })
  },
  created () {
    eventBus.$off('chooseAddress')
    this.order_id = this.$route.query.id
    this.getData()
  },
  activated () {
    let bankCardInfo = api.getPrefs({ sync: true, key: 'realNameInfo' }) || ''
    if (bankCardInfo) {
      if (typeof bankCardInfo.idcard === 'undefined' || !bankCardInfo.idcard) {
        this.idcard = bankCardInfo.idCard
      }
      bankCardInfo = JSON.parse(bankCardInfo)
      this.$refs.payblock.newCard(bankCardInfo)
    }
  },
  methods: {
    // 到时间时间变化
    getChangeTime (timeData) {
      this.downTime = (timeData.hours * 3600 + timeData.minutes * 60 + timeData.seconds) * 1000
    },
    getData () {
      getOrderDetail({
        order_project_id: this.order_id
      }).then(res => {
        if (res.success) {
          this.goodsList = res.order_goods_specs_list
          this.orderInfo = res.order_project_info
          this.logisticsInfo = res.logistice_info
          this.newTime = parseInt(new Date().getTime())
        }
      })
    },
    orderAddress (address_id) {
      editOrderAddress({
        order_id: this.orderInfo.order_id,
        address_id: address_id
      }).then(res => {
        if (res.success) {

        }
      })
    },
    // 自提物流
    getLogistics () {
      this.$refs.ztswal.getLogistics(this.orderInfo.id)
      this.thSwal = true
    },
    // 打开弹窗
    openExplainSwal () {
      this.showExplainSwal = true
    },
    // 关闭弹窗
    closeExplainSwal (data) {
      this.showExplainSwal = data == 1
    },
    // 打开取消弹窗
    openSwal () {
      this.showSwal = true
    },
    // 关闭取消弹窗
    closeSwal (data) {
      this.showSwal = data == 1
    },
    // 取消提醒回调
    sureSwal: function (e) {
      const that = this
      this.closeSwal(0)
      this.cancelOrder()
    },
    // 再次付款
    payFunc () {
      // this.downTime = this.orderInfo.is_again_pay_time * 1000 - this.newTime
      this.payMoney = this.orderInfo.pay_price / 100
      this.showPaySwal = true
    },
    surePaySwal (callData) {
      payOrderUp({
        order_id: this.orderInfo.order_id,
        pay_type: callData.pay_type,
        bank_id: callData.bank_id,
        bank_card: callData.bank_card,
        realname: callData.realname,
        idcard: callData.idcard,
        mobile: callData.mobile
      }).then(res => {
        if (res.success) {
          if (res.data) {
            this.payOrderInfo = res.data
            if (callData.pay_type == 1) {
              this.showPaySwal = false
              this.wxPayUp()
            } else if (callData.pay_type == 2) {
              this.showPaySwal = false
              this.aliPayUp()
            } else if (callData.pay_type == 4) {
              this.$refs.payblock.sendCode(res)
            }
          }
        }
      }).catch((res) => {
        if (callData.pay_type == 4) {
          if (callData.idcard) {
            this.$router.push({
              path: '/pages/personage/information/addBankCard',
              query: {
                message: res.message
              }
            })
          } else {
            this.$router.push({
              path: '/pages/personage/information/certification',
              query: {
                message: res.message
              }
            })
          }
        }
      })
    },
    // 支付宝支付
    aliPayUp () {
      const that = this
      var aliPayPlus = api.require('aliPayPlus')
      aliPayPlus.payOrder({ orderInfo: this.payOrderInfo },
        function (ret, err) {
          that.getData()
        }
      )
    },
    // 微信支付
    wxPayUp () {
      const that = this
      const wxPayPlus = api.require('wxPayPlus')
      wxPayPlus.payOrder({
        apiKey: that.payOrderInfo.appid,
        mchId: that.payOrderInfo.partnerid,
        orderId: that.payOrderInfo.prepayid,
        nonceStr: that.payOrderInfo.noncestr,
        timeStamp: that.payOrderInfo.timestamp,
        package: that.payOrderInfo.package,
        sign: that.payOrderInfo.paySign
      }, function (ret, err) {
        that.getData()
      })
    },
    fyResult () {
      this.showPaySwal = false
      this.getData()
    },
    // 取消订单
    cancelOrder () {
      if (this.orderInfo.is_pay == 0) { // 未付款
        cancelNoPayOrder({
          order_project_id: this.orderInfo.id
        }).then(res => {
          if (res.success) {
            this.getData()
          }
        })
      } else {
        cancelPayOrder({
          order_project_id: this.orderInfo.id
        }).then(res => {
          if (res.success) {
            this.getData()
          }
        })
      }
    },
    // 列表商品显示隐藏
    toggle (index) {
      this.is_toggle = !this.is_toggle
    },
    // 倒计时开始
    start () {
      this.$refs.countDown.start()
    },
    // 倒计时暂停
    pause () {
      this.$refs.countDown.pause()
    },
    // 倒计时结束
    finish () {
      this.cancelOrder()
      // Toast('倒计时结束');
    },
    copy_cont (text_c) {
      var clipBoard = api.require('clipBoard')
      clipBoard.set({
        value: text_c
      }, function (ret, err) {
        if (ret) {
          Toast('复制成功')
        } else {
          alert(JSON.stringify(err))
        }
      })
    },
    linkFunc (type, obj = {}) {
      switch (type) {
        case 5:
          this.clickGoods = true
          this.$router.push({
            path: '/store/goods-detail',
            query: {
              id: obj.id
            }
          })
          break
        case 14:
          this.$router.push({
            path: '/order/order-apply',
            query: {
              id: this.order_id,
              logistice_id: obj.logistice_id
            }
          })
          break
        case 16:
          this.$router.push({
            path: '/order/barter-detail',
            query: {
              id: obj.id
            }
          })
          break
        case 18:
          this.$router.push({
            path: '/order/refund-detail',
            query: {
              id: obj.id,
              type: obj.type
            }
          })
          break
        case 23:
          if (this.orderInfo.is_again_pay_btn) {
            this.$router.push({
              path: '/address/list',
              query: {
                isSelect: 1
              }
            })
          }
          break
      }
    },
    logisticsLink () {
      if (this.orderInfo.project_logistice_count > 1 || (this.orderInfo.project_logistice_count = 1 && this.orderInfo.order_status == 1)) {
        this.$router.push({
          path: '/logistics/list',
          query: {
            id: this.orderInfo.id
          }
        })
      } else {
        if (this.orderInfo.project_logistice_buy_type == 0) { // 0快递 1自提 2商家配送
          this.$router.push({
            path: '/logistics/logistics-express',
            query: {
              id: this.orderInfo.id
            }
          })
        } else if (this.orderInfo.project_logistice_buy_type == 1) {
          this.$router.push({
            path: '/logistics/logistics-self',
            query: {
              id: this.orderInfo.id
            }
          })
        } else {
          this.$router.push({
            path: '/logistics/logistics-business',
            query: {
              id: this.orderInfo.id
            }
          })
        }
      }
    }
  },
  watch: {
    thSwal (val) {
      console.log(val)
      if (val) {
        this.timer = setInterval(() => {
          this.getLogistics()
        }, 2000)
      } else {
        clearInterval(this.timer)
        this.getData()
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.timer)
    if (!this.clickGoods && (to.name == 'goodsDetail' || to.name == 'cart')) {
      this.$router.push('/order/list')
    }
    if (to.name != 'addressList' && to.name != 'addBankCard' && to.name != 'certification') {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
  }
}
</script>

<style scoped  src="../../../styles/life.css"></style>
<style scoped  src="../../../styles/order.css"></style>
<style lang="less" scoped>
.app-body {
  background-color: #f2f2f4;
  font-size: 28px;
  width: 100%;
}
.smzt-session .order-message-item {
  padding-right: 20px;
}
.smzt-session .shipping-address-icon {
  right: 30px;
}
.th-code {
  width: 52px;
  height: 52px;
  position: absolute;
  right: 30px;
  top: 50%;
  margin-top: -26px;
  display: flex;
}
.th-line {
  width: 1PX;
  height: 60px;
  position: absolute;
  right: 112px;
  top: 50%;
  margin-top: -30px;
  background-color: #F0F0F0;
}
.th-type {
  height: 56px;
}
.th-item {
  align-items: flex-start;
  height: auto;
  padding-top: 10px;
  .order-message-item-left {
    line-height: 36px;
  }
  .shipping-address-item-right {
    max-width: 390px;
    word-break: break-all;
    div {
      word-break: break-all;
    }
  }
  &.th-item-log {
    .shipping-address-item-right {
      max-width: 430px;
    }
  }
}
.th-body {
  border-radius: 10px;
  overflow: hidden;
  .th-bg {
    background: linear-gradient(90deg, #F9866B, #EB5841);
  }
  .th-tit {
    height: 88px;
    line-height: 88px;
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    color: #FFFFFF;
  }
  .th-info {
    font-size: 24px;
    font-weight: 400;
    color: #FFFFFF;
    padding: 20px 30px;
    background: rgba(255, 255, 255, 0.1);
    & > div {
      min-height: 42px;
      line-height: 42px;
    }
    .flex-align-center div:nth-child(1) {
      width: 133px;
      flex-shrink: 0;
    }
    .th-address {
      align-items: flex-start;
      padding-top: 10px;
      div:nth-child(2) {
        word-break: break-all;
      }
    }
  }
  .th-cont {
    font-size: 24px;
    color: #8F8F94;
    flex-direction: column;
    height: 543px;
    .th-tip {
      line-height: 46px;
      margin: 38px auto 6px;
    }
    .th-time {
      line-height: 46px;
      margin-bottom: 86px;
    }
    img.wx-code {
      width: 380px;
      height: 380px;
      margin-top: 13px;
    }
    img.th-sucess-icon {
      width: 160px;
      height: 160px;
    }
  }
}
</style>

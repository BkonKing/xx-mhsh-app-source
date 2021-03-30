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
      <div v-if="orderInfo" :class="[orderInfo.is_cancel_btn || orderInfo.is_again_pay_btn || orderInfo.is_logistice_btn ? 'scroll-body-btn' : '', 'order-session scroll-body']">
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
        <div v-if="goodsList[0].buy_type == 1" @click="(orderInfo.project_logistice_buy_type && orderInfo.project_logistice_buy_type == 1 && orderInfo.order_status==3) && logisticsLink()" class="cont-session order-message smzt-session">
          <div class="order-message-item th-type">
            <div class="order-message-item-left color-222 font-28">配送方式</div>
            <div class="color-222 font-28 order-message-item-right">上门自提</div>
          </div>
          <div class="order-message-item th-item">
            <div class="order-message-item-left color-222 font-28">提货地点</div>
            <div class="shipping-address-item-right">
              <div class="color-222 font-28">{{goodsList[0].take_address}}</div>
            </div>
          </div>
          <div v-if="orderInfo.project_logistice_buy_type && orderInfo.project_logistice_buy_type == 1 && orderInfo.order_status!=3" class="th-code" @click.stop="getLogistics"><img class="img-100" src="@/assets/img/code.png" /></div>
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
      <explain-swal
      :show-swal="showExplainSwal"
      :swal-cont="swalCont"
      @closeSwal="closeExplainSwal"
      ></explain-swal>
      <remind-swal
      :show-swal="showSwal"
      :remind-tit="remindTit"
      @closeSwal="closeSwal"
      @sureSwal="sureSwal()">
      </remind-swal>
    </div>
  </div>
</template>

<script>
import { NavBar, CountDown, Toast } from 'vant'
import paySwal from './../components/pay-swal'
import explainSwal from './../components/explain-swal'
import remindSwal from './../components/remind-swal'
import { getCoinOrderDetail } from '@/api/life.js'
export default {
  name: 'coinDetail',
  components: {
    [NavBar.name]: NavBar,
    [CountDown.name]: CountDown,
    [Toast.name]: Toast,
    paySwal,
    explainSwal,
    remindSwal
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
      timer: '', // 定时器
      infoData: '' // 自提物流信息
    }
  },
  mounted () {
  },
  created () {
    this.order_id = this.$route.query.id
    this.getData()
  },
  methods: {
    getData () {
      getCoinOrderDetail({
        order_id: this.order_id
      }).then(res => {
        if (res.success) {
          this.goodsList = res.order_goods_specs_list
          this.orderInfo = res.order_info
          // this.logisticsInfo = res.logistice_info
          this.newTime = parseInt(new Date().getTime())
        }
      })
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
    // 列表商品显示隐藏
    toggle (index) {
      this.is_toggle = !this.is_toggle
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
.order-status-session {
  height: 20px;
}
.order-header-bg {
  height: 120px;
}
</style>

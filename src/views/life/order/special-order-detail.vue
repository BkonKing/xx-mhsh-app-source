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
            <a
              :href="'tel: ' + orderInfo.customerServiceHotline"
              class="nav-serve"
              v-txAnalysis="{ eventId: 53 }"
              ><img src="@/assets/img/icon_23.png"
            /></a>
          </template>
        </van-nav-bar>
      </div>
      <div
        :class="[
          (orderInfo.ollage_pay_type == 2 && orderInfo.order_status == 0) ||
          orderInfo.is_logistice_btn
            ? 'scroll-body-btn'
            : '',
          'order-session scroll-body'
        ]"
      >
        <div class="order-header-bg"></div>
        <div class="order-status-session">
          <div class="order-status-name">{{ orderInfo.order_status_name }}</div>
          <div
            v-if="orderInfo.ollage_pay_type == 2 && orderInfo.order_status == 0"
            class="order-status-tip"
          >
            剩余<van-count-down
              ref="countDown"
              :auto-start="true"
              :time="orderInfo.ollage_etime * 1000 - newTime"
              @finish="finish"
            >
              <template v-slot="timeData"
                >{{
                  timeData.hours < 10 ? "0" + timeData.hours : timeData.hours
                }}:{{
                  timeData.minutes < 10
                    ? "0" + timeData.minutes
                    : timeData.minutes
                }}:{{
                  timeData.seconds < 10
                    ? "0" + timeData.seconds
                    : timeData.seconds
                }}
              </template>
            </van-count-down>
            自动取消订单
          </div>
          <div v-else class="order-status-tip">
            {{ orderInfo.order_status_text_name }}
          </div>
        </div>
        <div class="cont-session goods-session">
          <div
            v-for="(item, index) in goodsList"
            @click.stop="linkFunc(5, { id: item.goods_id })"
            class="order-goods-info"
          >
            <div class="order-pic-block">
              <img class="img-100" mode="aspectFill" :src="item.specs_img" />
            </div>
            <div class="order-info">
              <div class="order-name-price">
                <div class="order-name p-nowrap">{{ item.goods_name }}</div>
                <div class="order-price">￥{{ item.pay_price / 100 }}</div>
              </div>
              <div class="order-sku-num">
                <div class="order-sku p-nowrap">{{ item.specs_name }}</div>
                <div
                  v-if="item.y_pay_price && item.y_pay_price != '0'"
                  class="order-num"
                >
                  ￥{{ item.y_pay_price / 100 }}
                </div>
              </div>
              <div class="order-action-session">
                <!-- <div @click.stop="openExplainSwal" class="order-action-text color-8f8f94">
                  <template v-if="item.is_returnfund==1 || item.is_return==1">
                    {{item.is_returnfund==1 ? '不支持退换' : '不支持退货'}}
                    <div class="order-action-btn">
                      <img class="img-100" src="@/assets/img/question_01.png" mode="" />
                    </div>
                  </template>
                </div> -->
                <div
                  v-if="item.is_returnfund == 0 || item.is_return == 0"
                  @click.stop="openExplainSwal"
                  class="order-action-text color-8f8f94"
                >
                  {{ item.is_returnfund == 0 ? "不支持退换" : "不支持退货" }}
                  <div class="order-action-btn">
                    <img
                      class="img-100"
                      src="@/assets/img/question_01.png"
                      mode=""
                    />
                  </div>
                </div>
                <div v-else class="order-action-text">
                  {{ item.order_status_name }}
                </div>
                <div class="order-buy-num">×{{ item.specs_count || 1 }}</div>
              </div>
            </div>
            <div v-if="item.is_shouhou_btn == 1" class="order-goods-btn">
              <div
                @click.stop="linkFunc(14, { logistice_id: item.logistice_id })"
                class="order-border-btn"
                hover-class="none"
              >
                申请退换
              </div>
            </div>
            <div
              v-if="
                item.is_barter_btn == 1 ||
                  item.is_refund_btn == 1 ||
                  item.is_returnfund_btn == 1
              "
              class="order-goods-btn"
            >
              <div
                v-if="item.is_barter_btn == 1"
                @click.stop="linkFunc(16, { id: item.sale_order_id })"
                class="order-border-btn"
                hover-class="none"
              >
                换货详情
              </div>
              <div
                v-if="item.is_refund_btn == 1"
                @click.stop="linkFunc(18, { id: item.sale_order_id, type: 1 })"
                class="order-border-btn"
                hover-class="none"
              >
                退款详情
              </div>
              <div
                v-if="item.is_returnfund_btn == 1"
                @click.stop="linkFunc(18, { id: item.sale_order_id, type: 2 })"
                class="order-border-btn"
                hover-class="none"
              >
                退款详情
              </div>
            </div>
          </div>
          <div class="detail-price-list">
            <div class="detail-price-item">
              <div>商品总价</div>
              <div>￥{{ orderInfo.goods_price_total / 100 }}</div>
            </div>
            <div
              v-if="orderInfo.freight && orderInfo.freight != 0"
              class="detail-price-item"
            >
              <div>运费</div>
              <div>￥{{ orderInfo.freight / 100 }}</div>
            </div>
            <div
              v-if="orderInfo.coupon_money && orderInfo.coupon_money != 0"
              class="detail-price-item"
            >
              <div>优惠券</div>
              <div>-￥{{ orderInfo.coupon_money / 100 }}</div>
            </div>
            <div
              v-if="orderInfo.happiness_price && orderInfo.happiness_price != 0"
              class="detail-price-item"
            >
              <div>幸福币抵扣</div>
              <div>-￥{{ orderInfo.happiness_price / 100 }}</div>
            </div>
          </div>
          <div class="order-total order-total-detail">
            <div class="color-8f8f94 font-24">
              共 {{ orderInfo.goods_num }} 件
            </div>
            <div class="order-price-total">
              合计:<span>￥{{ orderInfo.pay_price / 100 }}</span>
            </div>
          </div>
        </div>
        <div
          v-if="orderInfo.ollage_pay_type == 2"
          :class="[
            orderInfo.order_status == 0 ? 'collage-ing' : '',
            orderInfo.order_status == 5 ? 'collage-fail' : '',
            orderInfo.order_status > 0 && orderInfo.order_status < 5
              ? 'collage-sucess'
              : '',
            'cont-session',
            'collage-session'
          ]"
        >
          <div class="collage-header flex-align-center">
            <span>拼单</span>(新老用户均可参加)
          </div>
          <div class="collage-step flex-between">
            <div>①选择商品</div>
            <div class="collage-step-icon"></div>
            <div>②支付开团</div>
            <div class="collage-step-icon"></div>
            <div>③分享好友</div>
            <div class="collage-step-icon"></div>
            <div>④成功(失败退款)</div>
          </div>
          <div
            v-if="orderInfo.order_status == 0"
            class="collage-num flex-align-center"
          >
            还差<sapn class="color-eb5841"
              >&nbsp;{{ orderInfo.order_need_num }}&nbsp;</sapn
            >人<sapn class="color-8f8f94"
              >（{{ orderInfo.collage_num }}人拼单）</sapn
            >
          </div>
          <div
            v-else-if="orderInfo.order_status == 5"
            class="collage-num flex-align-center"
          >
            <sapn class="color-eb5841">拼单失败</sapn
            ><sapn class="color-8f8f94">（7人拼单）</sapn>
          </div>
          <div v-else class="collage-num flex-align-center">
            <sapn class="color-eb5841">3人拼单成功</sapn>
          </div>

          <div class="collage-user flex-align-center">
            <template v-if="userList.length < 7">
              <div v-for="(item, index) in userList" class="collage-user-info">
                <img
                  v-if="item.avatar"
                  class="collage-user-photo"
                  :src="item.avatar"
                />
                <img
                  v-else
                  class="collage-user-photo"
                  src="@/assets/imgs/touxiang.png"
                />
                <div class="collage-user-name p-nowrap">
                  {{ item.nickname }}
                </div>
              </div>
            </template>
            <template v-else>
              <div v-for="(item, index) in userList" class="collage-user-info">
                <template v-if="index < 5">
                  <img
                    v-if="item.avatar"
                    class="collage-user-photo"
                    :src="item.avatar"
                  />
                  <img
                    v-else
                    class="collage-user-photo"
                    src="@/assets/imgs/touxiang.png"
                  />
                  <div class="collage-user-name p-nowrap">
                    {{ item.nickname }}
                  </div>
                </template>
                <template v-else-if="index == 5">
                  <div class="collage-mask flex-center">
                    <span></span><span></span><span></span>
                  </div>
                  <img
                    v-if="item.avatar"
                    class="collage-user-photo"
                    :src="item.avatar"
                  />
                  <img
                    v-else
                    class="collage-user-photo"
                    src="@/assets/imgs/touxiang.png"
                  />
                </template>
              </div>
            </template>

            <!-- <div class="collage-user-info">
              <div class="collage-mask flex-center"><span></span><span></span><span></span></div>
              <img class="collage-user-photo" src="http://192.168.1.158/library/user_avatar/202007/2015/tx_42.jpg" />
            </div> -->
          </div>
        </div>

        <div
          v-if="goodsList[0] && goodsList[0].buy_type == 1"
          @click="
            orderInfo.project_logistice_buy_type &&
              orderInfo.project_logistice_buy_type == 1 &&
              orderInfo.order_status == 3 &&
              getLogistics()
          "
          class="cont-session order-message smzt-session"
        >
          <div class="order-message-item th-type">
            <div class="order-message-item-left color-222 font-28">
              配送方式
            </div>
            <div class="color-222 font-28 order-message-item-right">
              上门自提
            </div>
          </div>
          <div
            :class="[
              !(
                orderInfo.project_logistice_buy_type &&
                orderInfo.project_logistice_buy_type == 1 &&
                orderInfo.order_status != 3
              )
                ? 'th-item-log'
                : '',
              'order-message-item th-item'
            ]"
          >
            <div class="order-message-item-left color-222 font-28">
              提货地点
            </div>
            <div class="shipping-address-item-right" style="flex:1;max-width: initial;">
              <div class="color-222 font-28">
                <span style="margin-right: 4px;">{{
                  goodsList[0].take_address
                }}</span>
                <span
                  v-if="+orderInfo.order_status < 3"
                  class="copy-text"
                  @click="changeAddress"
                  style="display: inline-block;"
                  >更换</span
                >
              </div>
            </div>
          </div>
          <!-- <template
            v-if="
              orderInfo.project_logistice_buy_type &&
                orderInfo.project_logistice_buy_type == 1 &&
                orderInfo.order_status != 3
            "
          >
            <div class="th-line"></div>
            <div class="th-code" @click.stop="getLogistics">
              <img class="img-100" src="@/assets/img/code.png" />
            </div>
          </template> -->
          <img
            v-if="
              orderInfo.project_logistice_buy_type &&
                orderInfo.project_logistice_buy_type == 1 &&
                orderInfo.order_status == 3
            "
            class="shipping-address-icon"
            src="@/assets/img/right.png"
          />
        </div>
        <div v-else class="cont-session address-logistics">
          <div class="shipping-address">
            <div class="shipping-address-item">
              <div class="shipping-address-item-left color-222 font-28">
                收货地址:
              </div>
              <div class="shipping-address-item-right">
                <div class="shipping-address-username p-nowrap">
                  {{ orderInfo.rece_realname }}
                </div>
                <div class="color-222 font-28">{{ orderInfo.rece_mobile }}</div>
              </div>
            </div>
            <div class="shipping-address-item">
              <div class="shipping-address-item-left"></div>
              <div class="shipping-address-item-right">
                <div class="shipping-address-text">
                  {{ orderInfo.rece_address }}
                </div>
              </div>
            </div>
          </div>
          <div
            @click="logisticsLink"
            v-if="logisticsInfo"
            class="shipping-logistics"
          >
            <div
              v-if="logisticsInfo.l_status == 0"
              class="shipping-address-item"
            >
              <div class="shipping-address-item-left color-222 font-28">
                物流配送:
              </div>
              <div class="shipping-address-item-right">
                <div class="color-222 font-28">
                  {{ logisticsInfo.kuaidi_name }}
                </div>
                <div class="color-8f8f94 font-28">
                  ({{ logisticsInfo.kuaidi_numb }})
                </div>
                <img
                  class="shipping-address-icon"
                  src="@/assets/img/right.png"
                />
              </div>
            </div>
            <div v-else class="shipping-address-item">
              <div class="shipping-address-item-left color-222 font-28">
                物流配送:
              </div>
              <div class="shipping-address-item-right">
                <div class="color-222 font-28">
                  {{ logisticsInfo.kuaidi_name }}
                </div>
                <div class="color-8f8f94 font-28">(已签收)</div>
                <img
                  class="shipping-address-icon"
                  src="@/assets/img/right.png"
                />
              </div>
            </div>
            <div
              v-if="logisticsInfo.l_status == 0"
              class="shipping-logistics-item"
            >
              <div class="shipping-address-item-left"></div>
              <div
                class="shipping-address-item-right shipping-logistics-item-right"
              >
                <div class="shipping-logistics-point"></div>
                <div class="shipping-logistics-line"></div>
                <div class="shipping-logistics-text">
                  {{ logisticsInfo.kd_data.data[0].context }}<br />{{
                    logisticsInfo.kd_data.data[0].time
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="orderInfo.user_explain" class="cont-session order-remarks">
          <div class="order-remarks-item">
            <div class="order-remarks-item-left color-222 font-28">
              订单备注:
            </div>
            <div class="shipping-address-item-right">
              <div class="color-222 font-28 order-remarks-text">
                {{ orderInfo.user_explain }}
              </div>
            </div>
          </div>
        </div>
        <div class="cont-session order-message">
          <div class="order-message-item">
            <div class="order-message-item-left color-8f8f94 font-28">
              订单编号:
            </div>
            <div class="color-8f8f94 font-28 order-message-item-right">
              {{ orderInfo.order_numb }}
            </div>
            <div class="copy-btn" @click="copy_cont(orderInfo.order_numb)">
              <div class="copy-text">复制</div>
            </div>
          </div>
          <div class="order-message-item">
            <div class="order-message-item-left color-8f8f94 font-28">
              下单时间:
            </div>
            <div class="color-8f8f94 font-28 order-message-item-right">
              {{ orderInfo.ctime }}
            </div>
          </div>
          <div v-if="orderInfo.payment_type_name" class="order-message-item">
            <div class="order-message-item-left color-8f8f94 font-28">
              支付方式:
            </div>
            <div class="color-8f8f94 font-28 order-message-item-right">
              {{
                orderInfo.payment_type_name ? orderInfo.payment_type_name : "无"
              }}
            </div>
          </div>
          <div v-if="orderInfo.pay_time" class="order-message-item">
            <div class="order-message-item-left color-8f8f94 font-28">
              支付时间:
            </div>
            <div class="color-8f8f94 font-28 order-message-item-right">
              {{ orderInfo.pay_time }}
            </div>
          </div>
          <div v-if="orderInfo.cancel_time_val" class="order-message-item">
            <div class="order-message-item-left color-8f8f94 font-28">
              拼单失败:
            </div>
            <div class="color-8f8f94 font-28 order-message-item-right">
              {{ orderInfo.cancel_time_val }}
            </div>
          </div>
          <div v-if="orderInfo.complete_time_val" class="order-message-item">
            <div class="order-message-item-left color-8f8f94 font-28">
              拼单失败:
            </div>
            <div class="color-8f8f94 font-28 order-message-item-right">
              {{ orderInfo.complete_time_val }}
            </div>
          </div>
        </div>
      </div>
      <template
        v-if="orderInfo.ollage_pay_type == 2 && orderInfo.order_status == 0"
      >
        <div class="fixed-empty"></div>
        <div class="btn-fixed-buttom">
          <div class="color-eb5841">
            剩余<van-count-down
              ref="countDown"
              :auto-start="true"
              :time="orderInfo.ollage_etime * 1000 - newTime"
              @finish="finish"
            >
              <template v-slot="timeData"
                >{{
                  timeData.hours < 10 ? "0" + timeData.hours : timeData.hours
                }}:{{
                  timeData.minutes < 10
                    ? "0" + timeData.minutes
                    : timeData.minutes
                }}:{{
                  timeData.seconds < 10
                    ? "0" + timeData.seconds
                    : timeData.seconds
                }}
              </template> </van-count-down
            >结束
          </div>
          <div class="order-border-btn paid-btn">邀请好友</div>
        </div>
      </template>
      <template v-if="orderInfo.is_logistice_btn">
        <div class="fixed-empty"></div>
        <div class="btn-fixed-buttom">
          <div
            @click="logisticsLink"
            class="order-border-btn"
            hover-class="none"
          >
            物流详情
          </div>
        </div>
      </template>
      <explain-swal
        :show-swal="showExplainSwal"
        :swal-cont="swalCont"
        @closeSwal="closeExplainSwal"
      ></explain-swal>
      <tf-select-popup
      v-model="selectAddressVisible"
      title="提货地点"
      :data="addressData"
      :selected.sync="activeAddressId"
      labelKey="address"
      @confirm="updatePickupAddress"
    ></tf-select-popup>
    </div>
  </div>
</template>

<script>
import { NavBar, CountDown, Toast } from 'vant'
import TfSelectPopup from '@/components/tf-select-popup'
import explainSwal from './../components/explain-swal'
import { getOrderDetail, collageOver, updatePickupAddress } from '@/api/life.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [CountDown.name]: CountDown,
    [Toast.name]: Toast,
    explainSwal,
    TfSelectPopup
  },
  data () {
    return {
      windowHeight: document.documentElement.clientHeight,
      showExplainSwal: false, // 弹窗
      swalCont:
        '贵重物品、贴身衣物、肉类果蔬生鲜商品、定制商品、虚拟商品、报纸期刊等，处于信息安全或者卫生考虑，不支持无理由退货。跨境商品不支持换货。',
      time: 11 * 60 * 60 * 1000,
      newTime: '', // 当前时间
      goodsList: [],
      orderInfo: '',
      logisticsInfo: '',
      userList: [],
      selectAddressVisible: false,
      activeAddressId: ''
    }
  },
  computed: {
    addressData () {
      return this.goodsList[0] ? this.goodsList[0].pickup_address_list : []
    }
  },
  created () {
    this.order_id = this.$route.query.id
    this.getData()
  },
  methods: {
    getData () {
      getOrderDetail({
        order_project_id: this.order_id
      }).then(res => {
        if (res.success) {
          this.goodsList = res.order_goods_specs_list
          this.orderInfo = res.order_project_info
          this.logisticsInfo = res.logistice_info
          this.userList = res.ollage_user_list
          this.newTime = parseInt(new Date().getTime())
          console.log(this.orderInfo.goods_price_total)
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
      collageOver({
        order_project_id: this.order_id
      }).then(res => {
        if (res.success) {
          this.getData()
        }
      })
    },
    logisticsLink () {
      if (this.orderInfo.project_logistice_count > 1) {
        this.$router.push({
          path: '/logistics/list',
          query: {
            id: this.orderInfo.id
          }
        })
      } else {
        if (this.orderInfo.project_logistice_buy_type == 0) {
          // 0快递 1自提 2商家配送
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
      }
    },
    copy_cont (text_c) {
      var clipBoard = api.require('clipBoard')
      clipBoard.set(
        {
          value: text_c
        },
        function (ret, err) {
          if (ret) {
            Toast('复制成功')
          } else {
            alert(JSON.stringify(err))
          }
        }
      )
    },
    changeAddress () {
      this.selectAddressVisible = true
    },
    // 修改订单自提点
    updatePickupAddress ({ id }) {
      updatePickupAddress({
        order_project_id: this.order_id,
        pickup_address_id: id
      }).then(({ success }) => {
        success && this.getData(false)
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    if (!this.clickGoods && to.name == 'goodsDetail') {
      this.$router.push('/order/list')
    }
    next()
  }
}
</script>

<style scoped src="../../../styles/life.css"></style>
<style scoped src="../../../styles/order.css"></style>
<style lang="less" scoped>
.app-body {
  background-color: #f2f2f4;
  font-size: 28px;
  width: 100%;
}

.collage-header {
  height: 120px;
  padding: 0 30px;
  color: #222222;
  font-size: 30px;
}
.collage-header span {
  font-size: 34px;
  font-weight: bold;
  margin-right: 8px;
}
.collage-ing .collage-header {
  background-color: #d2ebff;
  color: #209cff;
}
.collage-fail .collage-header {
  background-color: #aaa;
}
.collage-sucess .collage-step {
  border-top: 1.3px dashed #aaa;
}
.collage-step {
  border-bottom: 1.3px dashed #aaa;
  height: 83px;
  font-size: 22px;
  color: #222;
  width: 650px;
  margin: 0 auto;
}
.collage-step div {
  white-space: nowrap;
}
.collage-step-icon {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 9px 0 9px 10px;
  border-color: transparent transparent transparent #383838;
}
.collage-num {
  margin: 12px 0 0 30px;
  font-size: 24px;
  height: 62px;
}
.collage-user {
  width: 672px;
  margin: 0 auto;
  padding-bottom: 30px;
}
.collage-user-info {
  width: 112px;
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.collage-user-photo {
  width: 88px;
  height: 88px;
  border-radius: 50%;
}
.collage-user-name {
  width: 100%;
  line-height: 42px;
  text-align: center;
  color: #8f8f94;
  font-size: 22px;
}
.collage-mask {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -44px;
  width: 88px;
  height: 88px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
}
.collage-mask span {
  width: 8px;
  height: 8px;
  margin: 0 5px;
  background-color: #fff;
  border-radius: 50%;
}
.btn-fixed-buttom .van-count-down {
  display: inline;
  color: #eb5841;
  font-size: 28px;
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
  width: 1px;
  height: 60px;
  position: absolute;
  right: 112px;
  top: 50%;
  margin-top: -30px;
  background-color: #f0f0f0;
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
    background: linear-gradient(90deg, #f9866b, #eb5841);
  }
  .th-tit {
    height: 88px;
    line-height: 88px;
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    color: #ffffff;
  }
  .th-info {
    font-size: 24px;
    font-weight: 400;
    color: #ffffff;
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
    color: #8f8f94;
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

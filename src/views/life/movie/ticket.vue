<template>
  <div class="tf-bg">
    <van-nav-bar
      title="我的影票"
      :fixed="true"
      :border="false"
      left-arrow
      placeholder
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-kefu" @click="makePhoneCall"></span>
      </template>
    </van-nav-bar>
    <div class="tf-main-container">
      <div class="order-box">
        <div class="order-header">
          <div class="order-cinema">{{ info.cinema_name }}</div>
          <div
            class="order-status"
            :class="{ 'tf-text-primary': info.get_status === 0 }"
          >
            {{ info.order_desc }}
          </div>
        </div>
        <!-- 影片详情 -->
        <div class="film-box">
          <img v-if="info.cover" class="film-cover" :src="info.cover" />
          <img v-else class="film-cover" src="@/assets/imgs/movie_nocover.png" />
          <div class="film-info">
            <div class="film-name">{{ info.film_name }}</div>
            <div class="film-type">
              {{ info.type }}
            </div>
            <div class="film-time">{{ info.total_time }} / {{ info.area }}</div>
            <div class="film-star van-ellipsis">{{ info.to_star }}</div>
          </div>
        </div>
        <!-- 订单详情 -->
        <div class="order-content">
          <div class="tf-flex">
            <div class="tf-text-grey">
              场次
            </div>
            <div>
              {{ info.date }} <span class="tf-margin">{{ info.week }}</span>
              {{ info.time }} <br />{{ info.copy_language }}
              {{ info.copy_type }}
            </div>
          </div>
          <div class="tf-flex">
            <div class="tf-text-grey">
              厅号
            </div>
            <div>
              {{ info.hall_name }}
            </div>
          </div>
          <div class="tf-flex">
            <div class="tf-text-grey">
              座位
            </div>
            <div>
              {{ info.seat_name }}
            </div>
          </div>
        </div>
      </div>
      <!-- 已取消 -->
      <div v-if="info.get_status === 2" class="order-box">
        <div class="order-content">
          <div class="tf-flex">
            <div class="tf-text-grey">
              取消时间
            </div>
            <div>
              {{ info.refund_info.ctime }}
            </div>
          </div>
          <div class="tf-flex">
            <div class="tf-text-grey">
              退款金额
            </div>
            <div>
              <!-- 退款金额 -->
              <template v-if="refundPrice">
                {{ refundPrice }}
              </template>
              <!-- 两种都有 -->
              <template v-if="refundPrice && refundHappiness">
                +
              </template>
              <!-- 退款幸福币 -->
              <template v-if="refundHappiness">
                幸福币{{ refundHappiness }}
              </template>
            </div>
          </div>
          <div class="tf-flex">
            <div class="tf-text-grey">
              退款方式
            </div>
            <div>
              {{ info.refund_info.type | refundType }}
            </div>
          </div>
          <div class="tf-flex">
            <div class="tf-text-grey">
              退款时间
            </div>
            <div>
              {{ info.refund_info.htime }}
            </div>
          </div>
        </div>
      </div>
      <!-- order-status-complete 已取票或者已取消 -->
      <div
        v-else
        class="order-status-box"
        :class="{
          'order-status-complete':
            info.get_status === 2 ||
            (info.get_status === 1 && info.overdue === 1)
        }"
      >
        <!-- 连接分割符 -->
        <div class="order-status-divider"></div>
        <div class="border-indent border-indent-left"></div>
        <div class="border-indent border-indent-right"></div>
        <!-- 有票 -->
        <template v-if="info.ticket_code !== '0'">
          <img class="ticket-code-img" :src="info.printno_url" />
          <!-- 遍历取票码等 -->
          <div v-for="(item, index) in info.ticket_info" :key="index" class="tf-text-lg">
            {{item.name}}：<span class="ticket-code-text">{{ item.value }}</span>
          </div>
        </template>
        <!-- 待出票 -->
        <template v-else>
          <van-circle
            v-model="currentRate"
            :rate="100"
            :speed="100"
            color="#EB5841"
            layer-color="#f0f0f0"
            class="tf-circle"
            ><img
              class="draw-bill-img"
              src="@/assets/imgs/movie_draw_bill.png"
              alt=""
          /></van-circle>
          <div class="tf-text-lg">出票中</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getfilmdetails,
  getCustomerPhone,
  updateOrderStatus
} from '@/api/movie'
export default {
  name: 'movieTicket',
  data () {
    return {
      orderId: '',
      info: {
        ticket_code: '  '
      },
      currentRate: 0, // 动画过程中的实时进度
      intervalTimer: 0, // 出票定时器
      customerPhone: '' // 客服电话
    }
  },
  computed: {
    // 退款金额
    refundPrice () {
      return this.info.refund_info.refund_price
    },
    // 退款幸福币
    refundHappiness () {
      return this.info.refund_info.refund_happiness
    }
  },
  created () {
    this.orderId = this.$route.query.id
    this.getfilmdetails()
    this.getCustomerPhone()
  },
  methods: {
    // 获取电影票详细信息
    getfilmdetails () {
      getfilmdetails({
        id: this.orderId
      }).then(({ data }) => {
        this.info = data
        if (this.info.ticket_code === '0') {
          this.rateLock()
        }
      })
    },
    // 客服电话
    getCustomerPhone () {
      getCustomerPhone().then(({ data }) => {
        this.customerPhone = data
      })
    },
    makePhoneCall () {
      api.call({
        type: 'tel_prompt',
        number: this.customerPhone || ''
      })
    },
    // 锁座中loading效果
    rateLock () {
      this.intervalTimer = setInterval(() => {
        if (this.currentRate < 100) {
          this.currentRate++
        } else {
          this.currentRate = 0
        }
      }, 10)
      this.updateOrderStatus()
    },
    // 更新影票取票码
    updateOrderStatus () {
      setTimeout(() => {
        updateOrderStatus({
          order_id: this.orderId
        })
          .then((res) => {
            if (res.is_update) {
              this.getfilmdetails()
              this.currentRate = 0
              clearInterval(this.intervalTimer)
            } else {
              this.updateOrderStatus()
            }
          })
          .catch(() => {
            this.updateOrderStatus()
          })
      }, 3000)
    }
  },
  filters: {
    // 退款方式
    refundType (value) {
      const text = [
        '',
        '退回微信',
        '退回支付宝',
        '全额退回幸福币',
        '退回银行卡'
      ]
      return text[value]
    }
  }
}
</script>

<style lang="less" scoped>
.order-box {
  width: 690px;
  position: relative;
  margin: 40px 30px 0;
  padding: 0 30px;
  background: #ffffff;
  border-radius: 10px;
  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90px;
    border-bottom: 2px solid #f0f0f0;
    .order-cinema {
      font-size: 30px;
      color: #222222;
    }
    .order-status {
      font-size: 28px;
      color: #8f8f94;
    }
  }
  .film-box {
    display: flex;
    padding: 30px 0;
    border-bottom: 2px solid #f0f0f0;
    .film-cover {
      width: 140px;
      height: 196px;
      margin-right: 30px;
      border-radius: 4px;
    }
    .film-info {
      flex: 1;
      width: 0;
      font-size: 26px;
      color: #8f8f94;
      .film-name {
        margin-bottom: 20px;
        font-size: 42px;
        font-weight: 500;
        color: #222;
      }
      .film-type,
      .film-time {
        margin-bottom: 4px;
      }
    }
  }
  .order-content {
    padding: 30px 0 40px;
    font-size: 30px;
    color: #222;
    .tf-text-grey {
      margin-right: 30px;
    }
    .tf-flex > div {
      line-height: 48px;
    }
  }
}
.border-indent {
  position: absolute;
  bottom: -20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f2f2f4;
}
.border-indent-left {
  left: -20px;
}
.border-indent-right {
  right: -20px;
}
.order-status-box .border-indent {
  top: -20px;
  bottom: initial;
}
.order-status-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 690px;
  position: relative;
  // height: 403px;
  margin: 0 30px;
  padding: 0 40px 60px;
  background: #ffffff;
  border-radius: 10px;
  .order-status-divider {
    width: 100%;
    border-top: 2px dotted #aaaaaa;
  }
  .ticket-code-img {
    width: 300px;
    height: 300px;
    margin-top: 50px;
  }
  .ticket-code-text {
    font-size: 34px;
    color: #222;
  }
  .tf-text-lg {
    margin-top: 36px;
    color: #222;
  }
  .tf-text-lg + .tf-text-lg {
    margin-top: 10px;
  }
}
.order-status-complete {
  .ticket-code-img,
  .tf-text-lg {
    opacity: 0.4;
  }
}
.draw-bill-img {
  width: 200px;
  height: 200px;
}
.tf-circle {
  margin-top: 78px;
}
.tf-margin {
  margin-left: 14px;
  margin-right: 14px;
}
</style>

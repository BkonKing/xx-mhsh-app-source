<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="生活缴费"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-shijian" @click="goLivePayList"></span>
      </template>
    </van-nav-bar>
    <div class="tf-body-container pay-cost-detail">
      <img class="pay-type-icon" :src="payInfo.genre_icon" />
      <div class="pay-title">{{ payInfo.genre_name }}</div>
      <div class="pay-detail">
        <div class="pay-header">
          <div class="pay-header-left">
            <div class="pay-number-label">{{type === 1 ? '应交金额' : '余额'}}</div>
            <div
              class="pay-number"
              :style="{
                color: payInfo.z_balance < 0 ? '#EB5841' : '#222'
              }"
            >
              {{
                type === 1 ? Math.abs(payInfo.z_balance) : payInfo.z_balance
              }}
            </div>
          </div>
          <div v-if="type === 1" class="pay-header-right" @click="goBill">
            查看账单 <span class="tf-icon tf-icon-right"></span>
          </div>
        </div>
        <div class="pay-info-container">
          <div class="pay-info-box">
            <div class="pay-info-label">
              住址信息
            </div>
            <div class="pay-info-content">
              {{ payInfo.house_property_name }}
            </div>
          </div>
          <div class="pay-info-box" v-if="payInfo.account_numb">
            <div class="pay-info-label">
              缴费户号
            </div>
            <div class="pay-info-content">
              {{ payInfo.account_numb || "-" }}
            </div>
          </div>
          <div class="pay-info-box">
            <div class="pay-info-label"><span>户</span><span>名</span></div>
            <div class="pay-info-content">
              {{ payInfo.realname || "-" }}
            </div>
          </div>
        </div>
        <div class="pay-info-box" v-if="false">
          <div class="pay-info-label">
            缴费单位
          </div>
          <div class="pay-info-content"></div>
        </div>
      </div>
      <div class="pay-detail pay-padding">
        <template v-if="type === 1">
          <div class="pay-number-label">缴费金额</div>
          <van-field
            v-model="money"
            class="pay-input"
            type="number"
            :autofocus="true"
          >
            <template v-slot:left-icon>￥</template>
          </van-field>
        </template>
        <template v-else>
          <div class="pay-number-label">充值金额</div>
          <van-field v-model="money" class="pay-input" type="number">
            <template v-slot:left-icon>￥</template>
          </van-field>
          <div v-if="payInfo.z_balance >= 0" class="money-primary">
            <div
              v-for="(item, i) in moneyPayList"
              :key="i"
              class="money-tag"
              :class="{ 'money-tag-active': money == item }"
              @click="money = item"
            >
              <span class="tf-text-sm">￥</span>
              <span>{{ item }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="tf-padding">
      <van-button
        v-preventReClick
        size="large"
        type="danger"
        :disabled="payStatus"
        @click="payMoney"
        >立即缴费</van-button
      >
    </div>
    <pay-success
      v-model="successShow"
      :payAmount="money"
      @confirm="$router.go(-1)"
      @look="replaceLivePayList"
    ></pay-success>
    <pay-swal
      ref="payblock"
      :show-swal="showPaySwal"
      :pay-money="totalMoney"
      :wxzfbShow="false"
      @sureSwal="surePaySwal"
      @closeSwal="(data) => (this.showPaySwal = data == 1)"
      @fyResult="fyResult"
    ></pay-swal>
  </div>
</template>

<script>
import { getRecharge, launchRechargePay } from '@/api/butler/livepay'
import paySwal from '@/views/life/components/pay-swal'
import paySuccess from './components/success'
export default {
  name: 'livemainPay',
  components: {
    paySwal,
    paySuccess
  },
  data () {
    return {
      type: 1, // 1：缴费 2：充值
      houseId: '',
      projectId: '',
      genreType: '', // 费用类别
      payInfo: {
        z_balance: 0
      },
      money: '', // 金额
      successShow: false,
      moneyPayList: [1000, 500, 300, 100], // 充值预选列表
      showPaySwal: false
    }
  },
  computed: {
    totalMoney () {
      return parseFloat(this.money) || 0
    },
    // 金额输入框为空或等0时灰显不可点击，否则亮起可点击
    payStatus () {
      return !this.money || Number.isNaN(parseFloat(this.money)) || parseFloat(this.money) <= 0
    }
  },
  created () {
    this.type = parseInt(this.$route.query.type)
    this.genreType = this.$route.query.genreType
    this.houseId = this.$route.query.houseId
    this.projectId = this.$route.query.projectId
  },
  activated () {
    this.getRecharge()
  },
  methods: {
    // 获取详情接口
    getRecharge () {
      getRecharge({
        genre_type: this.genreType,
        expenses_house_id: this.houseId
      }).then(({ data }) => {
        this.payInfo = data
      })
    },
    // 缴费
    payMoney () {
      // 金额做判断：1.大于0；2.>=应缴金额
      if (parseFloat(this.money) <= 0) {
        this.$dialog({
          title: '金额必须大于零'
        })
      } else if (parseFloat(this.money) + this.payInfo.z_balance < 0) {
        this.$dialog({
          title: '缴费金额必须大于等于欠费金额'
        })
      } else {
        this.showPaySwal = true
      }
    },
    // 发起支付
    surePaySwal (data) {
      launchRechargePay({
        expenses_house_id: this.houseId,
        genre_type: this.genreType,
        money: this.money,
        pay_type: data.pay_type,
        bank_id: data.bank_id,
        bank_card: data.bank_card,
        realname: data.realname,
        idcard: data.idcard,
        mobile: data.mobile
      }).then(res => {
        if (res.success && res.data && data.pay_type == 4) {
          this.$refs.payblock.sendCode(res)
        }
      }).catch((res) => {
        const code = ['202', '203', '204']
        if (!code.includes(res.code) && data.pay_type == 4) {
          // 有身份证就跳到添加银行卡，否则是实名认证
          if (data.idcard) {
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
    // 支付成功
    fyResult () {
      this.showPaySwal = false
      this.successShow = true
    },
    // 跳转充缴记录
    goLivePayList () {
      this.$router.push({
        name: 'livePayRecord',
        query: {
          houseId: this.houseId
        }
      })
    },
    // 重定向到充缴记录
    replaceLivePayList () {
      this.$router.replace({
        name: 'livePayRecord',
        query: {
          houseId: this.houseId,
          type: 'replace'
        }
      })
    },
    // 跳转账单列表页面
    goBill () {
      this.$router.push({
        name: 'livePayPayBill',
        query: {
          genreType: this.genreType,
          projectId: this.projectId,
          houseId: this.houseId
        }
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    const names = ['livePayIndex']
    // 支付成功后，重定向到充缴记录也要销毁当前页面
    if (names.includes(to.name) || (to.name === 'livePayRecord' && to.query.type === 'replace')) {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.pay-cost-detail {
  @flex-column();
  align-items: center;
  padding: 40px 20px 0;
  .pay-type-icon {
    width: 90px;
    height: 100px;
    margin-bottom: 15px;
  }
  .pay-title {
    margin-bottom: 10px;
    font-size: 30px;
    color: #222;
  }
  .pay-info-container {
    padding: 30px 0;
  }
  .pay-detail {
    width: 100%;
    padding: 0 30px;
    margin-top: 30px;
    background: #ffffff;
    border-radius: 10px;
    .pay-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 23px 0;
      border-bottom: 2px dashed #f0f0f0;
      .pay-header-left {
        display: flex;
        align-items: center;
      }
      .pay-header-right {
        display: flex;
        align-items: center;
        font-size: 24px;
        color: #8f8f94;
        .tf-icon-right {
          margin-left: 10px;
        }
      }
      .pay-number {
        font-size: 52px;
        font-weight: 500;
        color: #eb5841;
      }
    }

    .pay-number-label {
      width: 112px;
      margin-right: 46px;
      font-size: 28px;
      color: #222;
      line-height: 1;
    }

    .pay-info-box {
      display: flex;
      align-items: center;
      padding: 10px 0;
      .pay-info-label {
        display: flex;
        justify-content: space-between;
        width: 112px;
        margin-right: 46px;
        font-size: 28px;
        color: #949494;
      }
      .pay-info-content {
        font-size: 28px;
        color: #222;
      }
    }
  }
  .pay-padding {
    padding-top: 40px;
    padding-bottom: 30px;
  }
  .pay-input {
    padding: 24px 0 16px;
    font-size: 72px;
    line-height: 1;
    border-bottom: 2px solid #f0f0f0;
    /deep/ .van-field__left-icon {
      display: flex;
      align-items: flex-end;
      margin-right: 16px;
      transform: translateY(-6px);
      font-size: 34px;
      font-weight: 600;
      color: #222;
    }
    /deep/ .van-field__control {
      line-height: 72px;
    }
  }
}
.money-primary {
  display: flex;
  justify-content: space-between;
  padding: 40px 0 10px;
  .money-tag {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 147px;
    height: 64px;
    padding-bottom: 12px;
    font-size: 30px;
    color: #eb5841;
    background: rgba(235, 88, 65, 0.1);
    background-clip: padding-box;
    border: 4px solid rgba(235, 88, 65, 0.1);
    border-radius: 4px;
    > span {
      line-height: 1;
    }
  }
  .money-tag-active {
    border: 4px solid #eb5841;
  }
}
/deep/ .van-button--disabled {
  background: #aaa;
  border-color: #aaa;
  opacity: 1;
}
</style>

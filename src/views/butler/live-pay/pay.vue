<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="其他费用"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="tf-body-container">
      <van-checkbox-group
        v-model="result"
        ref="checkboxGroup"
        @change="handleChange"
      >
        <div class="month-bill" v-for="(item, index) in payList" :key="index">
          <div class="month-text">{{ item.month_name }}</div>
          <div class="unpay-number">待缴费￥{{ item.stay_money }}</div>
          <ul class="pay-list-container">
            <li v-for="(li, i) in item.child" :key="i" class="pay-list-item">
              <van-checkbox
                class="pay-checkbox"
                checked-color="#EB5841"
                :name="`${li.id}-${li.money}`"
                :disabled="li.is_force == 1"
              ></van-checkbox>
              <div class="pay-info" @click="goCostDetail(li)">
                <div class="pay-info-left">
                  <span class="pay-title">{{ li.genre_name }}</span>
                </div>
                <div class="pay-info-right">
                  <div class="pay-number">￥{{ li.money }}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </van-checkbox-group>
    </div>
    <div class="pay-footer">
      <van-checkbox
        class="pay-checkbox"
        checked-color="#EB5841"
        v-model="checked"
        >全选</van-checkbox
      >
      <div class="tf-flex">
        <span class="pay-sum"
          >合计：<span class="tf-text-primary">￥{{ payTotal }}</span></span
        >
        <van-button class="btn" :disabled="!result.length" @click="showPaySwal = true"
          >缴费({{ result.length }}项)</van-button
        >
      </div>
    </div>
    <pay-swal
      ref="payblock"
      :show-swal="showPaySwal"
      :pay-money="payTotal"
      :wxzfbShow="false"
      @closeSwal="closePaySwal"
      @sureSwal="surePaySwal"
      @fyResult="fyResult"
    ></pay-swal>
  </div>
</template>

<script>
import { getChoicePayList, createPay } from '@/api/butler/livepay'
import paySwal from '@/views/life/components/pay-swal'
import filters from './filters'
import { makeCount } from '@/utils/util'
export default {
  name: 'livePayPay',
  components: {
    paySwal
  },
  data () {
    return {
      checked: false, // 是否全部选中
      expensesHouseId: '', // 账单id
      projectId: '',
      result: [], // 选中缴费项数组
      payTotal: 0, // 选中的缴费金额
      coerceResult: [], // 强制缴费项数组
      payBranches: 0, // 所需缴费的所有项数量
      payList: [], // 待缴费列表
      showPaySwal: false,
      idcard: '' // 身份证
    }
  },
  created () {
    this.expensesHouseId = this.$route.query.houseId
    this.projectId = this.$route.query.projectId
  },
  mounted () {
    // 刚进入页面需要默认选中账单，所以放在mounted中
    this.getPayInfo()
  },
  activated () {
    // 判断缓存中是否有实名认证信息，有就触发支付组件回填银行卡信息（支付绑卡会跳转到实名认证或者添加银行卡页面）
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
    // 获取缴费信息
    getPayInfo () {
      return getChoicePayList({
        expenses_house_id: this.expensesHouseId,
        project_id: this.projectId
      }).then(({ table_data: data }) => {
        this.payList = data
        this.handlePaymentTerm()
        // 默认全部选中
        this.$nextTick(() => {
          this.checked = true
        })
      })
    },
    // 处理所有强制缴费项保存到变量（取消全选需要用到），并计算所有缴费项
    handlePaymentTerm () {
      let num = 0
      const coerceResult = []
      this.payList.forEach(obj => {
        num += obj.child.length
        obj.child.forEach(li => {
          if (li.is_force == 1) {
            coerceResult.push(`${li.id}-${li.money}`)
          }
        })
      })
      this.payBranches = num
      this.coerceResult = coerceResult
    },
    // 缴费项复选框改变事件
    handleChange (result) {
      // 计算所选总缴费金额
      let sum = 0
      result.forEach(obj => {
        sum += parseFloat(obj.split('-')[1])
      })
      // 实时判断是否为全选状态切换选中展示，当选中缴费项等于总缴费项数时
      if (result.length === this.payBranches) {
        !this.checked && (this.checked = true)
      } else {
        this.checked = false
      }
      // 精准度计算
      this.payTotal = makeCount(sum)
    },
    // 全选
    checkAll (type) {
      this.$refs.checkboxGroup.toggleAll({
        checked: type,
        skipDisabled: true
      })
    },
    // 跳转费用详情
    goCostDetail ({ id }) {
      this.$router.push({
        name: 'livePayCostDetail',
        query: {
          orderId: id
        }
      })
    },
    // 关闭支付选择弹窗
    closePaySwal (data) {
      this.showPaySwal = data == 1
    },
    // 发起支付
    surePaySwal (data) {
      const order_ids = this.result.map(obj => obj.split('-')[0]).join(',')
      createPay({
        order_ids,
        expenses_house_id: this.expensesHouseId,
        genre_type: 4,
        money: this.payTotal,
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
        if (['203', '204'].includes(res.code)) {
          this.getPayInfo()
        } else if (res.code == '202') {
          this.getPayInfo().then(() => {
            this.showPaySwal = true
          })
        } else if (!code.includes(res.code) && data.pay_type == 4) {
          // 有身份证就跳到添加银行卡，否则是实名认证
          if (this.idcard) {
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
      this.$toast('缴费成功')
      this.showPaySwal = false
      setTimeout(() => {
        this.getPayInfo()
      }, 10)
    }
  },
  watch: {
    checked (val) {
      if (val) {
        this.checkAll(val)
      } else {
        if (this.result.length === this.payBranches) {
          this.checkAll(false)
          this.result = JSON.parse(JSON.stringify(this.coerceResult))
        }
      }
    }
  },
  filters,
  beforeRouteLeave (to, from, next) {
    const arr = ['livePayCostDetail', 'addBankCard', 'certification']
    if (!arr.includes(to.name)) {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
      api.removePrefs({
        key: 'realNameInfo'
      })
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.swiper-nav {
  height: 66px;
  margin: 30px 20px 0;
  border-radius: 10px;
  /deep/ .van-notice-bar__left-icon {
    margin-right: 10px;
  }
  /deep/ .van-notice-bar__content {
    color: #eb5841;
    font-size: 24px;
  }
  .notice-swipe {
    height: 66px;
    /deep/ .van-swipe-item {
      line-height: 66px;
    }
  }
}
.month-bill {
  padding: 0 30px;
  margin-top: 40px;
  .month-text {
    font-size: 28px;
    color: #222;
  }
  .unpay-number {
    margin-top: 6px;
    font-size: 24px;
    color: #8f8f94;
    line-height: 1;
  }
  .pay-list-container {
    width: 100%;
    margin-top: 30px;
    .pay-list-item {
      display: flex;
      .pay-checkbox {
        width: 62px;
        display: flex;
        margin-left: 10px;
      }
    }
    .pay-list-item + .pay-list-item {
      margin-top: 30px;
    }
    .pay-info {
      flex: 1;
      display: flex;
      justify-content: space-between;
      height: 140px;
      padding: 30px;
      background: #ffffff;
      border-radius: 10px;
      .pay-info-left {
        display: flex;
        align-items: center;
        .pay-title {
          font-size: 30px;
        }
      }
      .pay-info-right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        .pay-number {
          font-size: 34px;
          font-weight: 600;
          color: #eb5841;
        }
      }
    }
    .pay-list-item + .pay-list-item {
      border-top: 1px solid #f0f0f0;
    }
  }
}
.pay-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 120px;
  padding: 0 20px 0 30px;
  background: #ffffff;
  .tf-flex {
    align-items: center;
    line-height: 1;
  }
  .pay-sum {
    font-size: 24px;
    color: #8f8f94;
    line-height: 1;
    .tf-text-primary {
      font-size: 34px;
      margin-right: 30px;
    }
  }
  .btn {
    width: 200px;
    height: 88px;
    background: linear-gradient(-90deg, #eb5841, #f9866b);
    border: none;
    border-radius: 10px;
    color: #fff;
    line-height: 1;
  }
}
/deep/ .pay-checkbox {
  .van-checkbox__icon {
    height: 32px;
    line-height: 32px;
    .van-icon {
      width: 32px;
      height: 32px;
      font-size: 26px;
    }
  }
  .van-checkbox__label {
    font-size: 24px;
    color: #8f8f94;
  }
}
/deep/ .van-checkbox__icon--disabled .van-icon {
  color: #fff;
  border-color: #eb5841;
  background-color: #eb5841;
}
/deep/ .van-checkbox-group {
  padding-bottom: 30px;
}
</style>

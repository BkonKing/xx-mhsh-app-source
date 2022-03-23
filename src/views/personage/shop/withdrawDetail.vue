<template>
  <div class="tf-bg">
    <van-nav-bar
      title="幸福币明细"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="tf-padding">
      <userInfo :avatar="info.bank_ico" :name="info.account_name"></userInfo>
      <div class="module-box money-box">
        <div class="money-num">{{ info.credits }}</div>
      </div>
      <div class="module-box">
        <div class="clist-item">
          <div class="clist-item__label">类型<span></span></div>
          <div>提现</div>
        </div>
        <template v-if="isCashBack">
          <div class="clist-item">
            <div class="clist-item__label">
              时间<span></span>
            </div>
            <div>{{ info.return_time }}</div>
          </div>
          <div class="clist-item">
            <div class="clist-item__label">对方账号</div>
            <div>{{ info.account_name }}</div>
          </div>
        </template>
        <template v-else>
          <div v-if="info.apply_time" class="clist-item">
            <div class="clist-item__label">
              申请时间<span></span>
            </div>
            <div>{{ info.apply_time }}</div>
          </div>
          <div v-if="info.cancel_time" class="clist-item">
            <div class="clist-item__label">
              取消时间<span></span>
            </div>
            <div>{{ info.cancel_time }}</div>
          </div>
          <div v-if="info.payment_date" class="clist-item">
            <div class="clist-item__label">到账时间<span></span></div>
            <div :class="{'red-text': [1, 2, 3].includes(+info.status)}">{{ info.payment_date }}</div>
          </div>
          <div class="clist-item">
            <div class="clist-item__label">到账金额<span></span></div>
            <div>￥{{ info.amount_received }}</div>
          </div>
          <div v-if="+info.service_charge" class="clist-item">
            <div class="clist-item__label">服务费<span></span></div>
            <div>
              {{ `${info.service_fee * 100}%` }}（本次收取￥{{
                info.service_charge
              }}）
            </div>
          </div>
          <div class="clist-item">
            <div class="clist-item__label">提现到<span></span></div>
            <div>{{ info.account_name }} ({{ info.realname }})</div>
          </div>
        </template>
        <div class="clist-item">
          <div class="clist-item__label">交易单号<span></span></div>
          <div>{{ info.cashout_numb }}</div>
        </div>
        <div class="clist-item">
          <div class="clist-item__label">备注<span></span></div>
          <div>{{ info.remark }}</div>
        </div>
      </div>
    </div>
    <van-button
      v-if="+info.cash_cancel"
      v-preventReClick
      class="submit-btn"
      type="primary"
      size="large"
      :loading="submitLoading"
      @click="handleCancel"
      >取消提现</van-button
    >
  </div>
</template>

<script>
import userInfo from '@/components/user-info/index.vue'
import { getCashInfo, cancelCash } from '@/api/personage/shop'
export default {
  components: {
    userInfo
  },
  data () {
    return {
      id: '',
      idType: 1,
      submitLoading: false,
      info: {
        service_fee: 0,
        credits: 0
      }
    }
  },
  computed: {
    isCashBack () {
      return +this.info.credits > 0
    }
  },
  created () {
    const { id, idType } = this.$route.query
    this.id = id
    idType && (this.idType = idType)
    this.getCashInfo()
  },
  methods: {
    async getCashInfo () {
      const { data } = await getCashInfo({
        cash_id: this.id,
        type: this.idType
      })
      this.info = data
    },
    handleCancel () {
      this.$dialog
        .confirm({
          title: '确定取消提现申请？',
          confirmButtonText: '确认取消',
          showCancelButton: false
        })
        .then(() => {
          this.cancelCash()
        })
        .catch(() => {
          this.goBack()
        })
    },
    async cancelCash () {
      const { success } = await cancelCash({
        cash_id: this.id
      })
      if (success) {
        this.getCashInfo()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.module-box {
  border-radius: 10px;
  background: #fff;
  padding: 30px;
  margin-top: 30px;
  .clist-item {
    display: flex;
    font-size: 30px;
    &__label {
      margin-right: 40px;
      color: #8f8f94;
    }
  }
  .clist-item + .clist-item {
    margin-top: 15px;
  }
  .van-ellipsis {
    flex: 1;
  }
  .clist-item__label {
    width: 142px;
    height: 42px;
    text-align: justify;
    > span {
      display: inline-block;
      padding-left: 100%;
    }
  }
}
.money-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  .money-num {
    font-size: 72px;
    font-weight: 500;
  }
}
.mr60 {
  margin-right: 60px;
}
.tf-row-space-between {
  align-items: center;
  font-size: 30px;
}
.divider-box {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 2px solid #f0f0f0;
}
.submit-btn {
  position: fixed;
  bottom: 0;
  width: 710px;
  height: 80px;
  margin: 30px 20px;
  background: #ff6555;
  border: none;
  border-radius: 40px !important;
}
.red-text {
  color:#ff6555;
}
</style>

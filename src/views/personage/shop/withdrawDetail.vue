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
      <userInfo :avatar="info.avatar" :name="info.username"></userInfo>
      <div class="module-box money-box">
        <div class="money-num">{{parseInt(info.credits) > 0 ? '+' : ''}}{{info.credits}}</div>
      </div>
      <div class="module-box">
        <div class="clist-item">
          <div class="clist-item__label">
            <span class="mr60">类</span>型
          </div>
          <div>提现</div>
        </div>
        <div class="clist-item">
          <div class="clist-item__label">
            <template v-if="true">
              <span class="mr60">时</span>间
            </template>
            <template v-else></template>
          </div>
          <div>{{info.apply_time}}</div>
        </div>
        <div class="clist-item">
          <div class="clist-item__label">到账时间</div>
          <div>{{info.payment_date}}</div>
        </div>
        <div class="clist-item">
          <div class="clist-item__label">到账金额</div>
          <div>{{info.amount_received}}</div>
        </div>
        <div class="clist-item">
          <div class="clist-item__label">服务费</div>
          <div>{{info.service_fee}}（本次收取￥{{info.service_charge}}）</div>
        </div>
        <div class="clist-item">
          <div class="clist-item__label">提现到</div>
          <div>{{info.cashout_numb}}</div>
        </div>
        <div class="clist-item">
          <div class="clist-item__label">交易单号</div>
          <div>{{info.cashout_numb}}</div>
        </div>
        <div class="clist-item">
          <div class="clist-item__label">
            <span class="mr60">备</span>注
          </div>
          <div>{{info.remark}}</div>
        </div>
      </div>
    </div>
    <van-button
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
      info: {}
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getCashInfo()
  },
  methods: {
    async getCashInfo () {
      const { data } = getCashInfo({
        cash_id: this.id
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
          this.$router.push({
            name: 'shopInformation',
            query: {
              shopId: this.shopId,
              type: 1
            }
          })
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

<style lang='less' scoped>
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
  width: 710px;
  height: 80px;
  margin: 30px 20px;
  background: #ff6555;
  border: none;
  border-radius: 40px !important;
}
</style>

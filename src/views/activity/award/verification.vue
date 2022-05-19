<template>
  <div class="tf-body tf-bg">
    <van-nav-bar
      title="奖品核销"
      :fixed="true"
      :border="false"
      left-arrow
      placeholder
      @click-left="$router.go(-1)"
    />
    <div class="tf-p-30-20">
      <div class="tf-p-30 tf-rounded-10 tf-bg-white">
        <div class="card-title">买家信息</div>
        <div class="tf-row-justify-between tf-mb-20">
          <span class="card-text-gray-4">用户昵称</span>
          <span class="card-text-gray-4">{{ infoData.nickname }}</span>
        </div>
        <div class="tf-row-justify-between">
          <span class="card-text-gray-4">联系手机</span>
          <div class="tf-row-items-center" @click="callPhone(infoData.mobile)">
            <span class="card-text-gray-4">{{ infoData.mobile }}</span>
            <img class="phone-icon" src="@/assets/icons/phone.png" />
          </div>
        </div>
      </div>
      <div class="tf-p-30 tf-mt-20 tf-rounded-10 tf-bg-white">
        <div class="card-title">
          奖品信息
          <span class="tf-text-sm card-text-gray-4" style="float: right;">
            共
            <span class="tf-text-primary">1</span>
            件
          </span>
        </div>
        <div class="tf-row-justify-between">
          <div class="tf-flex-row">
            <div class="card-tag">1</div>
            <div class="tf-ml-20">
              <div class="card-text-gray-4">{{ infoData.award_name }}</div>
              <div class="tf-text-sm card-text-gray-9 tf-mt-10">
                活动方：{{ infoData.project_name }}
              </div>
            </div>
          </div>
          <div class="card-text-gray-9 tf-text-sm">X1</div>
        </div>
      </div>
      <div
        v-if="infoData.type == 2"
        class="tf-p-30 tf-mt-20 tf-rounded-10 tf-bg-white"
      >
        <div class="card-title">核销信息</div>
        <div class="tf-row-justify-between tf-mb-20">
          <span class="card-text-gray-4">核销人</span>
          <div
            class="tf-row-items-center"
            @click="callPhone(infoData.admin_mobile)"
          >
            <span class="card-text-gray-4"
              >{{ infoData.admin_name }} {{ infoData.admin_mobile }}</span
            >
            <img class="phone-icon" src="@/assets/icons/phone.png" />
          </div>
        </div>
        <div class="tf-row-justify-between">
          <span class="card-text-gray-4">核销方式</span>
          <span class="card-text-gray-4">{{ infoData.admin_text }}</span>
        </div>
      </div>
    </div>
    <div class="fixed-placeholder">
      <van-button class="fixed-btn" :class="btnClassName" @click="awardOperation">
        {{ infoData.type | typeText }}
      </van-button>
    </div>
  </div>
</template>

<script>
import { getAwardScan, awardOperation } from '@/api/award.js'
export default {
  data () {
    return {
      id: '',
      infoData: {}
    }
  },
  computed: {
    btnClassName () {
      const classNames = {
        1: 'tf-btn-primary',
        2: 'tf-btn-gray',
        3: 'tf-btn-red'
      }
      const value = this.infoData.type
      return classNames[value]
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getAwardScan()
  },
  filters: {
    typeText (value) {
      const text = {
        1: '确定核销',
        2: '已核销',
        3: '奖品不属于我方'
      }
      return text[value] || ''
    }
  },
  methods: {
    async getAwardScan () {
      const { data } = await getAwardScan({
        award_log_id: this.id
      })
      this.infoData = data
    },
    async awardOperation () {
      if (!+this.infoData.is_convert && +this.infoData.is_power) {
        const { success } = await awardOperation({
          award_log_id: this.id
        })
        if (success) {
          this.$toast('核销成功')
          this.getAwardScan()
        }
      }
    },
    callPhone (phoneNumber) {
      api.call({
        type: 'tel_prompt',
        number: phoneNumber
      })
    }
  }
}
</script>

<style lang="less" scoped>
* {
  font-size: 28px;
}

.card-title {
  margin-bottom: 30px;
  font-size: 32px;
  font-weight: bold;
  color: #000000;
}
.card-text-gray-4 {
  color: #4d4d59;
}
.card-text-gray-9 {
  color: #999;
}
.phone-icon {
  width: 22px;
  height: 28px;
  margin-left: 20px;
}
.card-tag {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: #febf00;
  border-radius: 6px 6px 6px 6px;
  font-size: 24px;
  color: #ffffff;
}
.fixed-placeholder {
  height: calc(118px + env(safe-area-inset-bottom));
  height: calc(118px + constant(safe-area-inset-bottom));
}
.fixed-btn {
  width: 710px;
  height: 88px;
  line-height: 88px;
  border-radius: 44px;
  border: none;
  position: fixed;
  left: 20px;
  bottom: calc(30px + env(safe-area-inset-bottom));
  bottom: calc(30px + constant(safe-area-inset-bottom));
  z-index: 2;
}
.tf-btn-gray {
  background-color: #eeeeee;
  color: #999999;
}
.tf-btn-red {
  background-color: #ff65551a;
  color: #ff6555;
}
</style>

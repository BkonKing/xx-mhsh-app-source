<template>
  <div
    class="tf-white-bg tf-body"
    :class="[meterActive == 2 ? 'electricity-active' : 'water-active']"
  >
    <van-nav-bar
      title="水电抄表"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="house-switch">
      <div class="tf-icon tf-icon-doubleleft" @click="prevHouse"></div>
      <div class="house-selected">{{ houseName }}</div>
      <div class="tf-icon tf-icon-doubleright" @click="nextHouse"></div>
    </div>
    <div class="tf-body-container">
      <div
        class="meter-switch"
        :class="{ 'meter-center': !openWater || !openElectric }"
      >
        <div
          v-if="openWater == 1"
          class="meter-item water-meter"
          @click="switchMeter(1)"
        >
          <span class="tf-icon tf-icon-shuibiao"></span>水表
        </div>
        <div
          v-if="openElectric == 1"
          class="meter-item electricity-meter"
          :class="{ 'meter-active': meterActive == 2 }"
          @click="switchMeter(2)"
        >
          <span class="tf-icon tf-icon-dianbiao"></span>电表
        </div>
      </div>
      <meter-form
        ref="water"
        v-if="openWater == 1"
        v-show="meterActive == 1"
        v-bind="waterInfo"
        :disabled="isBill == '1'"
        @save="saveWater"
        key="0"
      ></meter-form>
      <meter-form
        ref="electricity"
        v-if="openElectric == 1"
        v-show="meterActive == 2"
        v-bind="electricityInfo"
        :disabled="isBill == '1'"
        @save="saveElectricity"
        key="1"
      ></meter-form>
    </div>
  </div>
</template>

<script>
import { getMonthRecord, editRecord } from '@/api/personage'
import eventBus from '@/api/eventbus'
import meterForm from './form'
export default {
  name: 'waterElectricityMeter',
  components: {
    meterForm
  },
  data () {
    return {
      first: true,
      meterActive: 1, // tab：1 => 水表 2 => 电表
      houseName: '', // 显示的房间名称
      waterInfo: {}, // 水表信息数据
      electricityInfo: {}, // 电表信息数据
      openWater: '', // 是否开启水表
      openElectric: '', // 是否开启电表
      isBill: '1', // 是否已经生成账单，生成账单后水电表不能再修改
      params: {}, // 获取房屋水电信息所需参数
      switchHouseStatus: ''
    }
  },
  created () {
    // 参数全部从上一个页面传入，请求完会更改
    this.params = this.$route.query
    this.meterActive = parseInt(this.$route.query.type)
    this.getMeterInfo()
    // 右滑切换水电表
    eventBus.$on('swiperight', (ret, err) => {
      this.meterActive == 2 && this.switchMeter(1)
    })
    // 左滑切换水电表
    api.addEventListener(
      {
        name: 'swipeleft'
      },
      (ret, err) => {
        this.meterActive == 1 && this.switchMeter(2)
      }
    )
  },
  methods: {
    // 上一个房间
    prevHouse () {
      const index = parseInt(this.params.subscript) - 1
      // subscript排序值，排序值-1为0则表示这是第一个
      if (index) {
        this.params.subscript = index
        this.switchHouseStatus = 'prev'
        this.getMeterInfo()
      } else {
        this.$toast('没有房间了')
      }
    },
    // 下一个房间
    nextHouse () {
      this.params.subscript = parseInt(this.params.subscript) + 1
      this.switchHouseStatus = 'next'
      this.getMeterInfo()
    },
    // 切换电水表
    switchMeter (type) {
      if (this.openElectric == 0 && type == 2) {
        return
      }
      if (this.openWater == 0 && type == 1) {
        return
      }
      this.getMeterInfo(type)
    },
    // 获取房屋水电信息
    getMeterInfo (type = this.meterActive) {
      this.params.type = type
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      getMonthRecord(this.params)
        .then(({ data }) => {
          this.houseName = data.house_property_name
          this.params.month_record_id = data.id
          this.isBill = data.is_bill
          this.openWater = parseInt(data.is_water_fee)
          this.openElectric = parseInt(data.is_electric_fee)
          this.meterActive = type
          // 切换房屋才执行，切换成功，如果水表开启则默认显示水表
          if (this.switchHouseStatus) {
            if (this.meterActive == 1 && this.openWater == 0) {
              this.switchMeter(2)
            }
            if (this.meterActive == 2 && this.openElectric == 0) {
              this.switchMeter(1)
            }
            this.switchHouseStatus = '' // 重置切换房屋状态
          }
          if (this.meterActive == 1) {
            this.waterInfo = data
          } else {
            this.electricityInfo = data
          }
          // 第一次进来如果未生成账单，要弹起键盘
          this.first &&
            this.isBill &&
            this.$nextTick(() => {
              this.first = false
              this.meterActive == 2
                ? this.$refs.electricity.focusMeter()
                : this.$refs.water.focusMeter()
            })
        })
        .catch(err => {
          // 没有上一家或者已经是最后一家报错203，排序号需要还原
          if (err.code == '203') {
            if (this.switchHouseStatus === 'prev') {
              this.$toast('没有房间了')
              this.params.subscript = this.params.subscript + 1
            } else if (this.switchHouseStatus === 'next') {
              this.$toast('没有房间了')
              this.params.subscript = this.params.subscript - 1
            }
          } else {
            this.$toast(err.message)
          }
          this.switchHouseStatus = ''
        })
        .finally(() => {
          this.$toast.clear()
        })
      setTimeout(() => {
        this.$toast.clear()
      }, 10000)
    },
    // 抄水表保存
    saveWater (params) {
      this.editRecord(params).then(result => {
        if (result) {
          this.$refs.water.switchEdit(false)
        }
      })
    },
    // 抄电表保存
    saveElectricity (params) {
      this.editRecord(params).then(result => {
        if (result) {
          this.$refs.electricity.switchEdit(false)
        }
      })
    },
    // 水电保存请求
    editRecord ({ record, pic_url }) {
      return editRecord({
        record,
        pic_url,
        month_record_id: this.params.month_record_id,
        type: this.meterActive
      })
        .then(({ data }) => {
          this.$toast.success('保存成功')
          return true
        })
        .catch(() => {
          // this.$toast.fail('保存失败')
          return false
        })
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$toast.clear()
    next()
  }
}
</script>

<style lang="less" scoped>
.house-switch {
  @flex();
  justify-content: space-between;
  align-items: center;
  height: 98px;
  background: #eb58411a;
  padding: 0 20px;
  .tf-icon {
    color: #eb5841;
    font-size: 28px;
  }
  .house-selected {
    font-size: 30px;
    font-weight: 500;
    color: #eb5841;
  }
}
.meter-switch {
  padding: 73px 0;
  position: relative;
  .meter-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 320px;
    height: 66px;
    background: #f2f2f4;
    border-radius: 33px;
    font-size: 30px;
    font-weight: 500;
    color: #8f8f94;
    position: absolute;
    top: 40px;
  }
  .water-meter {
    left: 85px;
  }
  .electricity-meter {
    right: 85px;
  }
  .tf-icon {
    font-size: 32px;
    margin-right: 20px;
  }
}
.meter-center {
  display: flex;
  justify-content: center;
  padding: 40px;
  .meter-item {
    position: static;
  }
}
.electricity-active {
  /deep/ .electricity-meter {
    background: #ffb915;
    color: #fff;
    z-index: 2;
  }
  /deep/ .van-button--danger {
    background: #ffb915;
    border-color: #ffb915;
  }
  /deep/ .meter-text-point::before {
    background: #ffb915;
  }
}
.water-active {
  /deep/ .water-meter {
    background: #599eed;
    color: #fff;
    z-index: 2;
  }
  /deep/ .van-button--danger {
    background: #599eed;
    border-color: #599eed;
  }
}
/deep/ .van-key {
  height: 120px;
  font-size: 36px;
}
/deep/ .van-key--large {
  height: 100%;
}
/deep/ .van-popup--center {
  top: 35%;
}
</style>

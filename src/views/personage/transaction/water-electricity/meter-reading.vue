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
      <div class="house-selected">{{houseName}}</div>
      <div class="tf-icon tf-icon-doubleright" @click="nextHouse"></div>
    </div>
    <div class="tf-body-container">
      <div class="meter-switch">
        <div class="meter-item water-meter" @click="switchMeter(1)">
          <span class="tf-icon tf-icon-shuibiao"></span>水表
        </div>
        <div
          class="meter-item electricity-meter"
          :class="{ 'meter-active': meterActive == 2 }"
          @click="switchMeter(2)"
        >
          <span class="tf-icon tf-icon-dianbiao"></span>电表
        </div>
      </div>
      <meter-form
        v-if="water == 1"
        key="0"
        ref="water"
        v-bind="waterInfo"
        @save="saveWater"
        v-show="meterActive == 1"
      ></meter-form>
      <meter-form
        v-if="electric == 1"
        key="1"
        ref="electricity"
        v-bind="electricityInfo"
        @save="saveElectricity"
        v-show="meterActive == 2"
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
      id: '',
      meterActive: 1,
      houseName: '',
      waterInfo: {},
      electricityInfo: {},
      water: '',
      electric: ''
    }
  },
  created () {
    this.id = this.$route.query.id
    this.water = this.$route.query.water
    this.electric = this.$route.query.electric
    this.meterActive = parseInt(this.$route.query.type)
    eventBus.$on('swiperight', (ret, err) => {
      this.meterActive && (this.meterActive = 0)
    })
    // api.addEventListener(
    //   {
    //     name: 'swipeleft'
    //   },
    //   (ret, err) => {
    //     !this.meterActive && (this.meterActive = 1)
    //   }
    // )
    this.getMeterInfo()
  },
  methods: {
    // 上一个房间
    prevHouse () {},
    // 下一个房间
    nextHouse () {},
    // 切换电水表
    switchMeter (type) {
      if (this.electric == 0 && type == 2) {
        this.$toast('该房间没有开启电表')
        return
      }
      if (this.water == 0 && type == 1) {
        this.$toast('该房间没有开启水表')
        return
      }
      this.meterActive = type
    },
    // 获取房屋水电信息
    getMeterInfo () {
      getMonthRecord({
        month_record_id: this.id,
        type: this.meterActive
      }).then(({ data }) => {
        this.houseName = data.house_property_name
        if (this.meterActive == 1) {
          this.waterInfo = data
        } else {
          this.electricityInfo = data
        }
      })
    },
    // 抄水表保存
    saveWater (params) {
      this.editRecord(params).then(() => {
        this.waterInfo.status = 1
        this.$refs.water.switchEdit(false)
      })
    },
    // 抄电表保存
    saveElectricity (params) {
      this.editRecord(params).then(() => {
        this.electricityInfo.status = 1
        this.$refs.electricity.switchEdit(false)
      })
    },
    // 电表保存请求
    editRecord ({ record, pic_url }) {
      if (!parseInt(record)) {
        this.$toast('请输入表读数')
        return Promise.reject(new Error(false))
      }
      return editRecord({
        record,
        pic_url,
        month_record_id: this.id,
        type: this.meterActive
      }).then(({ data }) => {
        this.$toast.success('保存成功')
      }).catch(() => {
        this.$toast.fail('保存失败')
      })
    }
  },
  watch: {
    meterActive () {
      this.getMeterInfo()
    }
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

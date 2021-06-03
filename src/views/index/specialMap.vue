<template>
  <div>
    <tf-map
      v-if="show"
      :btnText="btnText"
      :destinationInfo="mapInfo"
      @init="getMapInfo"
    >
      <div class="phone-number" @click="callPhoneNumber">
        咨询电话：{{ phoneNumber }}<i class="tf-icon tf-icon-dianhua1"></i>
      </div>
    </tf-map>
  </div>
</template>

<script>
import tfMap from '@/components/tf-map'
export default {
  components: {
    tfMap
  },
  data () {
    return {
      show: false,
      mapInfo: {},
      btnText: '',
      phoneNumber: ''
    }
  },
  created () {
    this.mapInfo.name = this.$route.query.name
    this.mapInfo.address = this.$route.query.address
    this.btnText = this.$route.query.btnText
    this.$toast.loading({
      message: '加载中...',
      duration: 500,
      forbidClick: true
    })
    setTimeout(() => {
      this.show = true
    }, 500)
  },
  methods: {
    getMapInfo () {
      this.mapInfo = this.$route.query
      this.btnText = this.$route.query.btnText
      this.phoneNumber = this.$route.query.phoneNumber
      this.$toast.clear()
    },
    callPhoneNumber () {
      api.call({
        type: 'tel_prompt',
        number: this.phoneNumber
      })
    }
  },
  beforeDestroy () {
    this.$toast.clear()
  }
}
</script>

<style lang="less" scoped>
.phone-number {
  display: flex;
  align-items: center;
  margin-top: 32px;
  font-size: 26px;
  font-weight: 500;
  color: #8f8f94;
  line-height: 1;
  .tf-icon-dianhua1 {
    margin-left: 20px;
    font-size: 36px;
    line-height: 1;
    color: #000;
  }
  /deep/ .cinema-address {
    font-size: 26px;
  }
}
/deep/ .van-button--primary {
  background-color: #00a0e9;
  border: 2px solid #00a0e9;
}
</style>

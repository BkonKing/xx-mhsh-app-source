<template>
  <div>
    <tf-map
      v-if="show"
      btnText="任务完成地点"
      :destinationInfo="mapInfo"
      @init="getMapInfo"
    ></tf-map>
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
      mapInfo: {}
    }
  },
  created () {
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
    }
  }
}
</script>

<style lang="less" scoped></style>

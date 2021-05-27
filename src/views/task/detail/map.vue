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
  mounted () {
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

<style lang="less" scoped>

</style>

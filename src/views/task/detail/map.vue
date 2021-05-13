<template>
  <div>
    <tf-map
      btnText="任务完成地点"
      :destinationInfo="mapInfo"
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
      mapInfo: ''
    }
  },
  created () {
    this.mapInfo = this.$route.query
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>

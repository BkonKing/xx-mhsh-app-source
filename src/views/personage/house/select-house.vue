<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="选择房产"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="tf-padding tf-body-container">
      <house :mode="0" :entranceStatus="entranceStatus"></house>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import house from './components/house'
export default {
  components: {
    [NavBar.name]: NavBar,
    house
  },
  data () {
    return {
      entranceStatus: false
    }
  },
  created () {
    if (this.$route.query.status === '1') {
      this.entranceStatus = true
    }
  },
  methods: {
  }
}
</script>

<style lang='less' scoped>
</style>

<template>
  <div class="tf-bg">
    <van-nav-bar
      title="选择房产"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="tf-padding">
      <house :mode="0"></house>
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
    return {}
  },
  methods: {
  }
}
</script>

<style lang='less' scoped>
</style>

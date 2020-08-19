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
      <house :mode="0" @change="bindingDefault"></house>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import house from './components/house'
import { bindingDefault } from '@/api/personage'
export default {
  components: {
    [NavBar.name]: NavBar,
    house
  },
  data () {
    return {}
  },
  methods: {
    bindingDefault (id) {
      bindingDefault({
        binding_id: id
      }).then((res) => {})
    }
  }
}
</script>

<style lang='less' scoped>
</style>

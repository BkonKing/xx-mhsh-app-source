<template>
<div class='tf-bg'>
  <van-nav-bar
    title='缴费详情'
    :fixed='true'
    :border='false'
    placeholder
    left-arrow
    @click-left='$router.go(-1)'
  >
  <div class="pay-record-detail">
    <div class="tf-icon"></div>
  </div>
  </van-nav-bar>
</div>
</template>

<script>
import { NavBar } from 'vant'
export default {
  name: 'livePayRecordDetail',
  components: {
    [NavBar.name]: NavBar
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang='less' scoped>
.pay-record-detail {
  @flex-column();
  align-items: center;
  padding: 50px 20px 0;

}
</style>

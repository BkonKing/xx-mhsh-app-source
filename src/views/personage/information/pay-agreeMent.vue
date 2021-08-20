<template>
  <div class="pay-agreeMent">
    <van-nav-bar
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="goback"
    >
      <template #title>
        <div>
          {{ info.title }}
        </div>
      </template>
    </van-nav-bar>
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import { payAgreement } from '@/api/personage.js'
export default {
  components: {
    [NavBar.name]: NavBar
  },
  data () {
    return {
      info: ''
    }
  },
  methods: {
    // 回退
    goback () {
      this.$router.go(-1)
    }
  },
  async created () {
    const res = await payAgreement()
    this.info = res.data
    console.log(res)
  }
}
</script>

<style lang="less" scoped>
.pay-agreeMent {
  height: 100%;
  overflow: auto;
  .content {
    padding: 30px 20px;
    font-size: 25px !important;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 44px;
  }
}
</style>

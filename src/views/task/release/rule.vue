<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar
      :title="infoData.title"
      :fixed="true"
      placeholder
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="content" v-html="infoData.content"></div>
  </div>
</template>

<script>
import { getNeighboursAgreement } from '@/api/home'
export default {
  data () {
    return {
      infoData: ''
    }
  },
  created () {
    this.getData()
  },
  mounted () {

  },
  methods: {
    getData () {
      getNeighboursAgreement({ article_type: 5 }).then((res) => {
        this.infoData = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.content {
    padding: 30px 20px;
    font-size: 25px !important;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 44px;
  }
</style>

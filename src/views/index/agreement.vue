<template>
  <div class="tf-bg-white">
    <van-nav-bar
      :title="title"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="goback"
    ></van-nav-bar>
    <div class="tf-padding">
      <div class="tf-text" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import { getNeighboursAgreement } from '@/api/home'

export default {
  data () {
    return {
      title: '',
      content: ''
    }
  },
  created () {
    // articleType：1、用户协议 2、其他协议 3、内容协议 4、支付协议 5、交易规则 6、隐私政策
    const { articleType } = this.$route.query
    this.getAgreement({ article_type: articleType })
  },
  methods: {
    // 获取协议内容
    getAgreement (data) {
      getNeighboursAgreement(data).then(({ data }) => {
        const { title, content } = data
        this.title = title
        this.content = content
      })
    },
    goback () {
      this.$router.go(-1)
    }
  },
  beforeRouteLeave (to, from, next) {
    this.content = ''
    this.$nextTick(() => {
      next()
    })
  }
}
</script>

<style lang="less" scoped></style>

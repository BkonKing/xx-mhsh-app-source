<template>
  <div class="tf-bg-white">
    <van-nav-bar
      title="通知详情"
      placeholder
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="goBack"
    />
    <div class="page-container">
      <div class="tf-article-title">{{title}}</div>
      <div class="tf-article-info">{{ctime}}</div>
      <div class="tf-article-content" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import { getNoticInfo } from '@/api/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar
  },
  created () {
    const { id } = this.$route.query
    this.getNoticInfo(id)
  },
  data () {
    return {
      title: '',
      ctime: '',
      content: ''
    }
  },
  methods: {
    getNoticInfo (noticeId) {
      getNoticInfo({
        noticeId
      }).then((res) => {
        if (res.success) {
          const { title, content, ctime } = res.data
          this.title = title
          this.content = content
          this.ctime = ctime
        }
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.page-container {
  padding: 50px;
}
.tf-article-info {
  margin-top: 36px;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 2px solid @divider-color;
}
</style>

<template>
  <div class="tf-article-box">
    <van-nav-bar
      title="通知详情"
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="goBack"
    />
    <div class="tf-article-title">{{title}}</div>
    <div class="tf-article-info">{{ctime}}</div>
    <div class="tf-article-content">{{content}}</div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import { getNoticInfo } from '@/api/butler/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar
  },
  created () {
    const { noticeId } = this.$route.query
    this.getNoticInfo(noticeId)
  },
  data () {
    return {
      title: '标题标题标题标题标题标题标题标题标题',
      ctime: '2020-06-06  12:12',
      content:
        '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
    }
  },
  methods: {
    getNoticInfo (noticeId) {
      getNoticInfo({
        noticeId
      }).then(res => {
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
.tf-article-box {
  height: 100%;
  padding-top: 138px;
  overflow: auto;
}
.tf-article-info {
  margin-top: 36px;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 2px solid @divider-color;
}
</style>

<template>
  <div class="tf-bg-white">
    <van-nav-bar
      title="系统通知"
      placeholder
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="goBack"
    />
    <div class="page-container">
      <div class="tf-article-title">{{title}}</div>
      <div class="tf-article-info">{{ctime}}</div>
      <div class="tf-article-content">{{content}}</div>
    </div>
  </div>
</template>

<script>
import { getAppMsgDetail } from '@/api/personage.js'
export default {
  name: 'sysMsgInfo',
  created () {
    const { id } = this.$route.query
    this.getAppMsgDetail(id)
  },
  data () {
    return {
      title: '',
      ctime: '',
      content: ''
    }
  },
  methods: {
    getAppMsgDetail (id) {
      getAppMsgDetail({
        id
      }).then((res) => {
        if (res.success) {
          const { title, content, ptime } = res.data
          this.title = title
          this.content = content
          this.ctime = ptime
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

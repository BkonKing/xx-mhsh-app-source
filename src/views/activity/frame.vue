<template>
  <div class="tf-bg">
    <van-nav-bar
      id="vanNavBar"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="goBack"
    />
    <div class="content" id="special">

    </div>
  </div>
</template>

<script>
export default {
  name: 'activityFrame',
  data () {
    return {
      url: ''
    }
  },
  created () {
    const url = this.$route.fullPath.split('?frameUrl=')[1]
    url && (this.url = unescape(url))
  },
  mounted () {
    setTimeout(() => {
      this.openFrame()
    }, 100)
  },
  beforeDestroy () {
    this.closeFrame()
  },
  methods: {
    // 打开服务器专题页
    openFrame () {
      const height = document.getElementById('vanNavBar').offsetHeight || 0
      api.openFrame({
        name: 'activityFrame',
        url: this.url,
        useWKWebView: true,
        bgColor: 'rgba(0, 0, 0, 0)',
        rect: {
          x: 0,
          y: 0,
          marginLeft: 0,
          marginRight: 0,
          marginTop: api.safeArea.top + height,
          marginBottom: 0
        }
      })
    },
    // 关闭frame
    closeFrame () {
      api.closeFrame({
        name: 'activityFrame'
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<template>
  <div class="tf-bg-white" id="special"></div>
</template>

<script>
export default {
  name: 'specialTopic',
  data () {
    return {
      url: ''
    }
  },
  created () {
    const url = this.$route.fullPath.split('?frameUrl=')[1]
    url && (this.url = unescape(url))
    this.addEventListener()
    this.openFrame()
  },
  methods: {
    // 事件监听
    addEventListener () {
      api.addEventListener(
        {
          name: 'goback'
        },
        (ret, err) => {
          this.goback()
        }
      )
      api.addEventListener(
        {
          name: 'goMap'
        },
        (ret, err) => {
          this.goMap(ret.value)
        }
      )
      api.addEventListener(
        {
          name: 'wxShare'
        },
        (ret, err) => {
          this.wxShare(ret.value)
        }
      )
    },
    // 打开服务器专题页
    openFrame () {
      api.openFrame({
        name: 'specialTopic',
        url: this.url,
        useWKWebView: true,
        bgColor: 'rgba(0, 0, 0, 0)',
        rect: {
          x: 0,
          y: 0,
          marginLeft: 0,
          marginRight: 0,
          marginTop: api.safeArea.top,
          marginBottom: 0
        }
      })
    },
    // 微信分享
    wxShare (shareObj) {
      // 1：微信好友 2：朋友圈
      let sceneVal = 'session'
      if (shareObj.type == 2) {
        sceneVal = 'timeline'
      }
      const wxPlus = api.require('wxPlus')
      wxPlus.isInstalled(function (ret, err) {
        if (ret.installed) {
          wxPlus.shareWebpage(
            {
              apiKey: 'wx7245d2cb43a093db',
              scene: sceneVal,
              title: shareObj.title,
              description: shareObj.description,
              thumb: shareObj.thumb,
              contentUrl: shareObj.contentUrl
            },
            function (ret, err) {
              if (ret.status) {
                // alert('分享成功')
              } else {
                // alert(err.code)
              }
            }
          )
        } else {
        }
      })
    },
    // 定位
    goMap (query) {
      this.$router.push({
        name: 'specialMap',
        query
      })
    },
    goback () {
      this.$router.go(-1)
    },
    // 关闭frame
    clearEvent () {
      api.closeFrame({
        name: 'specialTopic'
      })
      api.removeEventListener({
        name: 'goback'
      })
      api.removeEventListener({
        name: 'goMap'
      })
      api.removeEventListener({
        name: 'wxShare'
      })
    }
  },
  beforeDestroy () {
    this.clearEvent()
  }
}
</script>

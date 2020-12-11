<template>
  <div v-show="shareShow" class="mask-bg" @click="calcel(0)">
    <div class="mask-block" @click.stop="calcel(1)">
      <div class="mask-close">
        <img class="img-100" src="@/assets/img/close.png" @click.stop="calcel(0)" />
      </div>
      <div class="share-cont flex-center">
        <div @click.stop="shareFunc(1)" class="share-btn">
          <img src="@/assets/img/share_1.png" />
          <div>微信</div>
        </div>
        <div v-if="!shareObj.pyqHide" @click.stop="shareFunc(2)" class="share-btn">
          <img src="@/assets/img/share_2.png" />
          <div>朋友圈</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tf-share',
  props: {
    shareShow: {
      type: Boolean,
      default: false
    },
    shareObj: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    calcel (val) {
      this.$emit('closeSwal', val)
    },
    shareFunc (type) {
      const that = this
      this.$emit('closeSwal', 0)
      let sceneVal = ''
      if (type == 1) {
        sceneVal = 'session'
      } else if (type == 2) {
        sceneVal = 'timeline'
      }
      const wxPlus = api.require('wxPlus')
      wxPlus.isInstalled(function (ret, err) {
        if (ret.installed) {
          wxPlus.shareWebpage({
            apiKey: 'wx7245d2cb43a093db',
            scene: sceneVal,
            title: that.shareObj.title,
            description: that.shareObj.description,
            thumb: that.shareObj.thumb,
            contentUrl: that.shareObj.contentUrl
          }, function(ret, err) {
            if (ret.status) {
              // alert('分享成功')
            } else {
              // alert(err.code)
            }
          })
        } else {}
      })
    }
  }
}
</script>
<style scoped  src="../../styles/life.css"></style>
<style lang="less" scoped>
/*弹窗*/
.mask-bg {
  z-index: 2030;
}
.mask-block {
  height: 327px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  border-radius: 0;
}
.share-cont {
  height: 100%;
  width: 100%;
  padding-top: 20px;
}
.share-btn {
  height: 188px;
  width: 250px;
  padding: 0 65px;
  display: flex;
  flex-wrap: wrap;
}
.share-btn div {
  font-size: 28px;
  color: #666666;
  text-align: center;
  height: 68px;
  line-height: 68px;
  width: 100%;
}
.share-btn img {
  width: 120px;
  height: 120px;
}
// .mask-btn div.mask-sure-btn {
//   width: 215px;
// }
</style>

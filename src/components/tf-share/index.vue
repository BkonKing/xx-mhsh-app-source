<template>
  <div v-show="shareShow" class="mask-bg" @click="handleClickOverlay">
    <div class="mask-block" @click.stop="calcel(1)">
      <div v-if="closeIcon" class="mask-close">
        <img
          class="img-100"
          src="@/assets/img/close.png"
          @click.stop="calcel(0)"
        />
      </div>
      <div v-if="title" class="share-title">
        {{ title }}
      </div>
      <div class="share-cont flex-center">
        <div @click.stop="shareFunc(1)" class="share-btn">
          <img src="@/assets/img/share_1.png" />
          <div>微信</div>
        </div>
        <div
          v-if="!shareObj.pyqHide"
          @click.stop="shareFunc(2)"
          class="share-btn"
        >
          <img src="@/assets/img/share_2.png" />
          <div>朋友圈</div>
        </div>
      </div>
      <van-button v-if="!closeIcon" class="close-btn" @click.stop="calcel(0)"
        >取消</van-button
      >
    </div>
  </div>
</template>

<script>
import { setStatisticsData } from '@/utils/analysis.js'
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
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    // 是否显示关闭图标
    closeIcon: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 点击遮罩层
    handleClickOverlay () {
      this.closeOnClickOverlay && this.calcel(0)
    },
    calcel (val) {
      this.$emit('closeSwal', val)
    },
    shareFunc (type) {
      let eventId = ''
      if (this.shareObj.contentUrl) {
        if (this.shareObj.contentUrl.indexOf('neighbours') > 0) {
          eventId = 45
        } else if (this.shareObj.contentUrl.indexOf('goodsDetail') > 0) {
          eventId = 18
        } else if (this.shareObj.contentUrl.indexOf('invite') > 0) {
          eventId = 33
        }
      }
      if (eventId) setStatisticsData(3, { event_id: eventId })
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
          wxPlus.shareWebpage(
            {
              apiKey: 'wx7245d2cb43a093db',
              scene: sceneVal,
              title: that.shareObj.title,
              description: that.shareObj.description,
              thumb: that.shareObj.thumb,
              contentUrl: that.shareObj.contentUrl
            },
            function (ret, err) {
              if (ret.status) {
                that.$emit('success')
                // alert('分享成功')
              } else {
                // alert(err.code)
              }
            }
          )
        } else {
        }
      })
    }
  }
}
</script>
<style scoped src="../../styles/life.css"></style>
<style lang="less" scoped>
/*弹窗*/
.mask-bg {
  z-index: 2030;
}
.mask-block {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  height: auto;
  min-height: 328px;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border-radius: 20px 20px 0px 0px;
}
.share-title {
  font-size: 32px;
  line-height: 1;
  color: #000000;
}
.share-cont {
  padding: 65px 0;
}
.share-btn {
  width: 250px;
  padding: 0 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.share-btn div {
  margin-top: 24px;
  font-size: 24px;
  color: #222222;
  line-height: 1;
}
.share-btn img {
  width: 98px;
  height: 98px;
}
.close-btn {
  width: 690px;
  height: 80px;
  background: #f7f7f7;
  border: none;
  border-radius: 40px;
  font-size: 28px;
  color: #8f8f94;
}
.mask-close {
  display: flex;
}
</style>

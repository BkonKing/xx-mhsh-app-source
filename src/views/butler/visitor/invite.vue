<template>
  <div class="shade">
    <van-nav-bar
      class="invite-nav-bar"
      title="访客通行证"
      placeholder
      left-arrow
      :border="false"
      @click-left="goList"
    />
    <div class="invite-box">
      <div class="share-box">
        <div class="share-name">
          <div class="share-name__text">{{info.project_name}}</div>
        </div>
        <div class="tf-text-lg">{{info.fc_info}}</div>
        <div class="qr-box">
          <img class="qr-box__image" :src="info.url" />
        </div>
        <div class="tf-text-grey">有效次数 {{info.yx_num}}</div>
        <div class="tf-text-grey">有效日期：{{info.yxtime}}</div>
        <div class="tf-divider-dashed" style="width: 100%;"></div>
        <div class="tf-text-lg">
          {{info.realname}}
          <template v-if="info.visitor_num">({{info.visitor_num}}人)</template> {{info.gender | sexText}} {{info.mobile}}
        </div>
      </div>
      <button @click="shareShow=true" class="share-btn" type="warn">分享给访客</button>
    </div>
    <tf-share 
      :share-show="shareShow"
      :share-obj="shareObj"
      @closeSwal="closeShare"></tf-share >
  </div>
</template>

<script>
import { NavBar } from 'vant'
import { visitorCode } from '@/api/butler'
import tfShare from '@/components/tf-share'
import { downloadPic } from '@/utils/util.js'
import { mapGetters } from 'vuex'

export default {
  components: {
    [NavBar.name]: NavBar,
    tfShare
  },
  data () {
    return {
      id: '',
      info: {},
      shareObj: {},
      shareShow: false
    }
  },
  created () {
    this.id = this.$route.query.id
    this.visitorCode()
  },
  computed: {
    ...mapGetters(['currentProject'])
  },
  methods: {
    /* 保存分享图片 */
    downloadSharePic () {
      const that = this
      const urlName = 'invite_1'
      downloadPic('https://live.tosolomo.com/library/img/app_img/wx_code.png', urlName)
        .then((data) => {
          that.sendShareParam(data)
        })
        .catch(() => {
          that.sendShareParam('')
        })
    },
    sendShareParam (data) {
      let user_info = api.getPrefs({
        key: 'user_info',
        sync: true
      }) || ''
      user_info = user_info ? JSON.parse(user_info) : ''
      this.shareObj = {
        title: '[访客通行证]' + this.currentProject.project_name,
        description: '有效日期：' + this.info.yxtime,
        pyqTitle: '[访客通行证]' + this.currentProject.project_name,
        thumb: data ? 'fs://' + data + '.jpg' : '',
        contentUrl: 'http://live.tosolomo.com/wap/#/invite?uid=' + user_info.id + '&project_id=' + this.currentProject.project_id + '&id=' + this.id
      }
    },
    // 获取邀约信息
    visitorCode () {
      visitorCode({
        yy_id: this.id
      }).then((res) => {
        this.info = res.data
        this.downloadSharePic()
      })
    },
    goList () {
      this.$router.replace({
        name: 'visitorInviteList'
      })
    },
    closeShare (data) {
      this.shareShow = data == 1 ? true : false
    }
  }
}
</script>

<style lang="less" scoped>
.shade {
  width: 100%;
  height: 100%;
  background-color: #1b1b1b;
}

.share-box {
  position: relative;
  width: 620px;
  margin: 80px 65px;
  padding: 60px 66px;
  @flex-column();
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 6px #f1c7c5;
  // border:6px solid rgba(235, 88, 65, 0.3);
}

.share-name {
  position: absolute;
  z-index: 999;
  top: -38px;
  left: 92px;
  width: 436px;
  height: 76px;
  background-image: url('../../../assets/imgs/butler_yaoyue.png');
  background-size: contain;
}

.share-name__text {
  text-align: center;
  line-height: 76px;
  font-size: 30px;
  color: #fff;
}

.qr-box {
  width: 480px;
  height: 480px;
  margin: 40px 0;
}

.qr-box__image {
  width: 480px;
  height: 480px;
}

.tf-text-grey {
  font-size: 24px;
}

.share-btn {
  border: none;
  color: #fff;
  width: 620px;
  height: 88px;
  font-size: 30px;
  background-image: linear-gradient(to right, @red, @red-dark);
  border-radius: 10px;
}

.invite-box {
  @flex-column();
  align-items: center;
}

.tf-divider-dashed {
  margin: 30px 0;
}

.invite-nav-bar {
  background-color: #1b1b1b;
  /deep/ .van-icon {
    color: #fff;
  }
  /deep/ .van-nav-bar__title {
    color: #fff;
  }
}
</style>

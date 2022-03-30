<template>
  <div class="tf-body">
    <van-nav-bar
      :fixed="true"
      :border="false"
      :title="specialData.thematic_name"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <img
          class="icon-image"
          src="@/assets/butler/freeserver-forward.png"
          @click="shareShow = true"
        />
      </template>
    </van-nav-bar>
    <div class="tf-body-container" id="specialContent">
      <div
        v-for="(item, index) in specialList"
        :key="index"
        class="mobile-image-box"
      >
        <template v-for="(imgData, i) in item">
          <img
            v-if="imgData.block_img"
            :key="`img${i}`"
            :src="imgData.block_img"
            class="mobile-image"
            @click="operate(imgData)"
          />
        </template>
      </div>
    </div>
    <tf-share
      :share-show="shareShow"
      :share-obj="shareObj"
      @closeSwal="closeShare"
    >
    </tf-share>
    <sign-in-com ref="sign" :show-loading="false"></sign-in-com>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tfShare from '@/components/tf-share'
import SignInCom from '@/components/SignInCom'
import { butlerPermission } from '@/utils/business'
import { downloadPic } from '@/utils/util'
import { getSpecial } from '@/api/activity'
export default {
  name: 'activitySpecial',
  components: {
    tfShare,
    SignInCom
  },
  data () {
    return {
      id: '',
      isPreview: false,
      scrollTop: 0,
      specialData: {},
      specialList: [],
      shareShow: false,
      shareObj: {}
    }
  },
  computed: {
    ...mapGetters(['userType', 'userInfo'])
  },
  async created () {
    this.id = this.$route.query.id
    this.isPreview = !!this.$route.query.isPreview
    this.getSpecial()
  },
  activated () {
    this.scrollTop &&
      (document.getElementById('specialContent').scrollTop = this.scrollTop)
  },
  beforeRouteLeave (to, from, next) {
    butlerPermission(to, from, next, this.userType, this.userInfo, () => {
      // 如果未匹配到路由
      if (to.matched.length === 0) {
        next(false)
      } else {
        this.scrollTop = document.getElementById('specialContent').scrollTop
        const routerName = ['home', 'life', 'movieIndex', 'scanCodeIndex']
        if (routerName.includes(to.name)) {
          this.$destroy()
          this.$store.commit('deleteKeepAlive', from.name)
        }
        next()
      }
    })
  },
  methods: {
    async getSpecial () {
      const { data, child } = await getSpecial({
        thematic_id: this.id
      })
      if (+data.state === 1 || this.isPreview) {
        this.specialData = data
        this.specialList = child
        this.downloadSharePic()
      } else {
        const stateMessage = {
          2: '活动未开始',
          3: '活动已结束'
        }
        this.$toast(stateMessage[data.state])
        this.$router.go(-1)
      }
    },
    operate (data) {
      const { block_type: type } = data
      if (!+type) {
        return
      }
      const methodObj = {
        1: 'goGoodsDetail',
        2: 'goPage',
        3: 'feature'
      }
      const methodName = methodObj[type]
      this[methodName](data)
    },
    goGoodsDetail ({ goods_id: goodsId }) {
      goodsId && this.$router.push({
        name: 'goodsDetail',
        query: {
          id: goodsId
        }
      })
    },
    goPage ({ block_content: url }) {
      if (url) {
        const reg = /^(http|https):\/\//
        const status = reg.test(url)
        if (status) {
          this.$router.push({
            name: 'activityFrame',
            query: {
              frameUrl: url
            }
          })
        } else {
          this.$router.push({
            path: url
          })
        }
      }
    },
    feature ({ block_content: type }) {
      if (!type) { return }
      const featureObj = {
        1: 'signIn'
      }
      const featureName = featureObj[type]
      this[featureName]()
    },
    signIn () {
      this.$refs.sign.signIn()
    },
    downloadSharePic () {
      const urlName = 'activity_special_' + this.specialData.id
      if (this.specialData.wechat_img) {
        downloadPic(this.specialData.wechat_img, urlName)
          .then(data => {
            this.setShareObj(data)
          })
          .catch(() => {
            this.setShareObj('')
          })
      } else {
        this.setShareObj('')
      }
    },
    setShareObj (thumb) {
      this.shareObj = {
        title: this.specialData.wechat_title,
        description: this.specialData.wechat_content,
        thumb: thumb ? 'fs://' + thumb + '.png' : '',
        contentUrl: `${process.env.VUE_APP_DOMAIN_NAME}/wap/#/activity/special?id=${this.id}`,
        pyqHide: false
      }
    },
    closeShare (data) {
      this.shareShow = data == 1
    }
  }
}
</script>

<style lang="less" scoped>
.icon-image {
  width: 44px;
  height: 44px;
}
.mobile-image-box {
  display: flex;
  .mobile-image {
    flex: 1;
    width: 0;
    object-fit: cover;
  }
}
</style>

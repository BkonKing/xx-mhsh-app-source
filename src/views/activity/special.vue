<template>
  <div class="tf-body">
    <van-nav-bar
      :fixed="true"
      :border="false"
      :title="specialData.bbbbb"
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
    <div class="tf-body-container">
      <div
        v-for="(item, index) in specialData.list"
        :key="index"
        class="mobile-image-box"
      >
        <template v-for="(imgData, i) in item.list">
          <img
            v-if="imgData.url"
            :key="`img${i}`"
            :src="imgData.url"
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tfShare from '@/components/tf-share'
import { butlerPermission } from '@/utils/business'
import { getUserActivity } from '@/api/activity'
export default {
  components: {
    tfShare
  },
  data () {
    return {
      id: '',
      specialData: {
        bbbbb: '33333333333',
        ccccc: '22222222222222',
        ggggg: '777777777',
        ddddd:
          'https://img95.699pic.com/photo/40174/9787.jpg_wh300.jpg!/both/282x190',
        eeeee:
          'https://img95.699pic.com/photo/40186/5971.jpg_wh300.jpg!/both/282x190',
        fffff:
          'https://img95.699pic.com/photo/40186/5968.jpg_wh300.jpg!/both/282x190',
        list: [
          {
            id: '123',
            list: [
              {
                name:
                  '是打发第三方是打发第三方是打发第三方是打发第三方是打发第三方',
                type: 1,
                url:
                  'https://img95.699pic.com/photo/40174/9787.jpg_wh300.jpg!/both/282x190'
              },
              {
                name:
                  '是打发第三方是打发第三方是打发第三方是打发第三方是打发第三方',
                type: 1,
                url:
                  'https://img95.699pic.com/photo/40190/5612.jpg_wh300.jpg!/both/282x190'
              }
            ]
          },
          {
            id: '1234',
            list: [
              {
                name:
                  '是打发第三方是打发第三方是打发第三方是打发第三方是打发第三方',
                type: 1,
                url:
                  'https://img95.699pic.com/photo/40174/9787.jpg_wh300.jpg!/both/282x190'
              }
            ]
          },
          {
            id: '1233',
            list: [
              {
                name:
                  '是打发第三方是打发第三方是打发第三方是打发第三方是打发第三方',
                type: 1,
                url:
                  'https://img95.699pic.com/photo/40174/9787.jpg_wh300.jpg!/both/282x190'
              }
            ]
          },
          {
            id: '12334',
            list: [
              {
                name:
                  '是打发第三方是打发第三方是打发第三方是打发第三方是打发第三方',
                type: 1,
                url:
                  'https://img95.699pic.com/photo/40174/9787.jpg_wh300.jpg!/both/282x190'
              }
            ]
          }
        ]
      },
      shareShow: false,
      shareObj: {}
    }
  },
  computed: {
    ...mapGetters(['userType', 'userInfo'])
  },
  async created () {
    this.id = this.$route.query.id
    // this.getSpecial()
  },
  beforeRouteLeave (to, from, next) {
    butlerPermission(to, from, next, this.userType, this.userInfo, () => {
      // 如果未匹配到路由
      if (to.matched.length === 0) {
        next(false)
      } else {
        next()
      }
    })
  },
  methods: {
    async getSpecial () {
      const { data } = await getUserActivity({
        uid: this.userInfo.id
      })
      this.specialData = data
    },
    operate (data) {
      const { type } = data
      const methodObj = {
        1: 'goGoodsDetail',
        2: 'goPage',
        3: 'feature'
      }
      const methodName = methodObj[type]
      this[methodName](data)
    },
    goGoodsDetail ({ id }) {
      this.$router.push({
        name: 'goodsDetail',
        query: {
          id
        }
      })
    },
    goPage ({ url }) {
      this.$router.push({
        path: url
      })
    },
    feature (data) {
      const featureObj = {
        1: 'signIn'
      }
      const featureName = featureObj[data.type]
      this[featureName]()
    },
    signIn () {

    },
    setShareObj () {
      this.shareObj = {
        title: this.specialData.ccccc,
        description: this.specialData.ggggg,
        thumb: this.specialData.ddddd,
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

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
        v-for="(item, index) in specialList"
        :key="index"
        class="mobile-image-box"
      >
        <template v-for="(imgData, i) in item.list">
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
    <sign-in-com ref="sign"></sign-in-com>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tfShare from '@/components/tf-share'
import SignInCom from '@/components/SignInCom'
import { butlerPermission } from '@/utils/business'
import { getSpecial } from '@/api/activity'
export default {
  components: {
    tfShare,
    SignInCom
  },
  data () {
    return {
      id: '',
      specialData: {
        bbbbb: '33333333333',
        wechat_title: '22222222222222',
        wechat_content: '777777777',
        wechat_img:
          'https://img95.699pic.com/photo/40174/9787.jpg_wh300.jpg!/both/282x190'
      },
      specialList: [
        [
          {
            block_type: '0',
            block_content: '',
            block_img: '/upload/image/20200822/20200822135602_56310.png'
          }
        ],
        [
          {
            block_type: '1',
            block_img: '/upload/image/20211011/20211011141043_89576.png',
            goods_id: '802',
            goods_name: '雕牌肥皂102g*6'
          },
          {
            block_type: '1',
            block_img: '/upload/image/20211105/20211105134223_49730.jpg',
            goods_id: '872',
            goods_name: '【自营】金牡丹限购1次'
          }
        ],
        [
          {
            block_type: '3',
            block_content: '1',
            block_img: '/upload/image/20220125/20220125142114_97215.jpg'
          }
        ],
        [
          {
            block_type: '2',
            block_content: 'www.baidu.com',
            block_img: '/upload/image/20220125/20220125142114_97215.jpg'
          }
        ]
      ],
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
      const { data, child } = await getSpecial({
        uid: this.userInfo.id
      })
      if (+data.state === 1) {
        this.specialData = data
        this.specialList = child
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
      const methodObj = {
        1: 'goGoodsDetail',
        2: 'goPage',
        3: 'feature'
      }
      const methodName = methodObj[type]
      this[methodName](data)
    },
    goGoodsDetail ({ goods_id: goodsId }) {
      this.$router.push({
        name: 'goodsDetail',
        query: {
          id: goodsId
        }
      })
    },
    goPage ({ block_content: url }) {
      this.$router.push({
        path: url
      })
    },
    feature (data) {
      const featureObj = {
        1: 'signIn'
      }
      const featureName = featureObj[data.block_content]
      this[featureName]()
    },
    signIn () {
      this.$refs.sign.signIn()
    },
    setShareObj () {
      this.shareObj = {
        title: this.specialData.wechat_title,
        description: this.specialData.wechat_content,
        thumb: this.specialData.wechat_img,
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

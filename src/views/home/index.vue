<template>
  <div class="tf-bg-white">
    <div class="home-header" :style="{'background': headerColor}">
      <page-nav-bar search></page-nav-bar>
      <van-notice-bar class="home-notice" left-icon="volume-o" :scrollable="false">
        <van-swipe class="notice-swipe" vertical :autoplay="3000" :show-indicators="false">
          <van-swipe-item v-for="(item, i) in 6" :key="i">关于未来一周暴雨天气温馨提示。</van-swipe-item>
        </van-swipe>
      </van-notice-bar>
    </div>
    <div class="tf-main-container">
      <van-swipe class="my-swipe" :autoplay="6000" indicator-color="#fff" @change="swipeChange">
        <van-swipe-item v-for="(item, i) in swipeImages" :key="i">
          <van-image class="swipe-item__image" :src="item.icon_image" />
        </van-swipe-item>
      </van-swipe>
      <van-grid class="app-box" :border="false" :column-num="5" square>
        <van-grid-item v-for="(item, index) in appList" :key="index" :to="item.url">
          <van-image class="app-box__image" :src="item.icon_image" />
          <span class="app-box__text">{{item.application}}</span>
        </van-grid-item>
      </van-grid>
      <div class="coin-box">
        <div class="coin-box__title" @click="goHappiness">
          幸福币专区
          <span v-if="1" class="sign-btn" @click.stop="sign">签到</span>
          <span class="coin-number" v-else>
            <span class="tf-icon tf-icon-moneycollect"></span>
            <span>1000</span>
          </span>
        </div>
        <van-notice-bar
          v-if="1"
          class="coin-message"
          :scrollable="false"
          color="#8F8F94"
          background="#fff"
          @click="goHappiness"
        >
          <van-swipe class="notice-swipe" vertical :autoplay="3000" :show-indicators="false">
            <van-swipe-item v-for="(item, i) in 6" :key="i">
              <div class="coin-message-name">关于中秋节活动方式投票</div>
              <div class="coin-message-number">+10</div>
            </van-swipe-item>
          </van-swipe>
        </van-notice-bar>
        <div class="coin-image-box">
          <van-image
            class="coin-image"
            v-for="(item, i) in coinList"
            :key="i"
            :src="item.icon_image"
            @click="goCoinCommodity"
          >
            <div class="coin-tag">
              <span class="tf-icon tf-icon-moneycollect"></span>
              <span>1000</span>
            </div>
          </van-image>
        </div>
      </div>
      <div class="life-box">
        <div class="life-box__title" @click="goSpecialSale">9.9特卖</div>
        <div class="life-box__description" @click="goSpecialSale">
          省钱好机会
          <span class="tf-icon tf-icon-right"></span>
        </div>
        <!-- <div class="coin-image-box">
          <van-image
            class="coin-image"
            v-for="(item, i) in saleImages"
            :key="i"
            @click="goCoinCommodity"
          >
            <div class="coin-tag">
              <span class="tf-icon tf-icon-moneycollect"></span>
              <span>1000</span>
            </div>
          </van-image>
        </div> -->
        <tf-image-list :data="saleImages" :column="3" srcKey="src" @click="clickSpecialSale"></tf-image-list>
      </div>
      <div class="life-box tf-mt-base">
        <div class="life-box__title" @click="goTimeLimit">限时闪购</div>
        <div class="life-box__description" @click="goTimeLimit">
          惊喜折扣限时抢
          <span class="tf-icon tf-icon-right"></span>
        </div>
        <tf-image-list :data="timeLimitImages" :column="2" srcKey="src" @click="clickTimeLimit">
          <template v-slot:tag="{img}">
            <div class="price-tag">{{img.price}}</div>
          </template>
        </tf-image-list>
      </div>
      <div class="community-box">
        <div class="community-box__title" @click="goCommunity">
          社区活动
          <span class="tf-icon tf-icon-right"></span>
        </div>
        <div class="activity-list">
          <div v-for="(item, i) in 3" :key="i" class="activity-item" @click="goActivity(item)">
            <van-image class="activity-item__image">
              <template v-slot>
                <div class="activity-item__description">233人已报名</div>
              </template>
            </van-image>
            <div class="activity-info">
              <div class="activity-info__day">
                <span class="tf-text">23</span>
                <span>五月</span>
              </div>
              <div class="activity-info__right">
                <div class="activity-info__title">高考100天抢跑冲刺计划 助力助力助力</div>
                <div class="activity-info__time">报名截止：2020-07-07 12:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <van-notice-bar class="front-page" :scrollable="false">
        <template v-slot:left-icon>
          <div class="front-page__tag">美好头条</div>
        </template>
        <van-swipe class="notice-swipe" vertical :autoplay="3000" :show-indicators="false">
          <van-swipe-item v-for="(item, i) in twoFrontList" :key="i">
            <div
              class="front-page__text van-ellipsis"
              @click="clickFront(item[0])"
            >{{item[0].content}}</div>
            <div
              class="front-page__text van-ellipsis"
              @click="clickFront(item[1])"
            >{{item[1].content}}</div>
          </van-swipe-item>
        </van-swipe>
      </van-notice-bar>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Grid, GridItem, Image, NoticeBar } from 'vant'
import pageNavBar from '@/components/page-nav-bar/index'
import tfImageList from '@/components/tf-image-list'
export default {
  name: 'home',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Image.name]: Image,
    [NoticeBar.name]: NoticeBar,
    pageNavBar,
    tfImageList
  },
  data () {
    return {
      headerColor: '#fff', // 头部颜色
      swipeImages: [
        {
          icon_image: 'https://img.yzcdn.cn/vant/cat.jpeg',
          color: '#4d896f'
        },
        {
          icon_image:
            'https://ssyerv1.oss-cn-hangzhou.aliyuncs.com/picture/93bb85056504405b8e2b15ada810c82c.jpg!sswm',
          color: '#a2dae2'
        }
      ],
      appList: [
        {
          icon_image: 'https://img.yzcdn.cn/vant/cat.jpeg',
          application: '云门禁'
        }
      ],
      coinList: [
        {
          icon_image: 'https://img.yzcdn.cn/vant/cat.jpeg'
        },
        {
          icon_image: 'https://img.yzcdn.cn/vant/cat.jpeg'
        },
        {
          icon_image: 'https://img.yzcdn.cn/vant/cat.jpeg'
        },
        {
          icon_image: 'https://img.yzcdn.cn/vant/cat.jpeg'
        },
        {
          icon_image: 'https://img.yzcdn.cn/vant/cat.jpeg'
        },
        {
          icon_image: 'https://img.yzcdn.cn/vant/cat.jpeg'
        },
        {
          icon_image: 'https://img.yzcdn.cn/vant/cat.jpeg'
        },
        {
          icon_image: 'https://img.yzcdn.cn/vant/cat.jpeg'
        }
      ],
      saleImages: [
        {
          src: 'https://img.yzcdn.cn/vant/cat.jpeg',
          id: '1'
        }
      ],
      timeLimitImages: [
        {
          src: 'https://img.yzcdn.cn/vant/cat.jpeg',
          price: '123',
          id: '1'
        },
        {
          src: 'https://img.yzcdn.cn/vant/cat.jpeg',
          price: '1233',
          id: '2'
        }
      ],
      frontList: [
        {
          id: '1',
          content:
            '聊一聊买手最爱的小众设计手表——跟买手聊一聊她们私藏的小众设计表单'
        },
        {
          id: '2',
          content:
            '聊一聊买手最爱的小众设计手表——跟买手聊一聊她们私藏的小众设计表单'
        },
        {
          id: '4',
          content:
            '聊一聊买手最爱的小众设计手表——跟买手聊一聊她们私藏的小众设计表单'
        },
        {
          id: '3',
          content:
            '聊一聊买手最爱的小众设计手表——跟买手聊一聊她们私藏的小众设计表单'
        }
      ]
    }
  },
  created () {
    this.appList.push({
      icon_image: 'https://img.yzcdn.cn/vant/cat.jpeg',
      application: '全部',
      url: '/applist'
    })
    this.headerColor = this.swipeImages[0].color
  },
  methods: {
    swipeChange (index) {
      this.headerColor = this.swipeImages[index].color
    },
    /* 签到 */
    sign () {
      console.log('签到')
    },
    /* 幸福币 */
    goHappiness () {
      this.$router.push('/pages/personage/happiness-coin/index')
    },
    /* 幸福币专区商品详情 */
    goCoinCommodity () {
      console.log('幸福币专区')
    },
    /* 跳转9.9特卖专区 */
    goSpecialSale () {
      console.log('9.9特卖专区')
      // this.$router.push("")
    },
    /* 9.9特卖专区图片点击 */
    clickSpecialSale ({ id }) {
      console.log(id)
    },
    /* 跳转限时闪购 */
    goTimeLimit () {
      console.log('限时闪购')
      // this.$router.push("")
    },
    /* 限时闪购图片点击 */
    clickTimeLimit (id) {
      console.log(id)
      // this.$router.push("")
    },
    /* 跳转活动详情 */
    goActivity (item) {
      console.log(item)
      // this.$router.push("")
    },
    /* 跳转社区活动 */
    goCommunity () {
      this.$router.push({
        path: '/neighbours',
        query: {
          active: 2
        }
      })
    },
    /* 点击头条跳转相应内容 */
    clickFront (item) {
      console.log(item)
      // this.$router.push("")
    }
  },
  computed: {
    twoFrontList () {
      const arr = []
      this.frontList.forEach((obj, index) => {
        const i = Math.floor(index / 2)
        if (!arr[i]) {
          arr[i] = []
        }
        arr[i].push(obj)
      })
      return arr
    }
  }
}
</script>

<style lang='less' scoped>
.tf-bg-white {
  height: 100%;
}
.home-notice {
  height: 66px;
  margin: 0 20px 0;
  background: #fff;
  /deep/ .notice-swipe {
    height: 66px;
    .van-swipe-item {
      line-height: 66px;
      color: #222;
    }
  }
  /deep/ .van-notice-bar__content {
    color: #222;
  }
  /deep/ .van-notice-bar__left-icon {
    color: #ffa110;
  }
}
.home-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 184px;
  z-index: 9999;
}
.tf-main-container {
  padding-top: 184px;
}
.swipe-item__image {
  width: 100%;
  height: 344.4px;
}
/* app列表 */
.app-box {
  padding: 30px 20px;
  &__image {
    width: 60px;
    height: 60px;
  }
  &__text {
    margin-top: 20px;
    font-size: 24px;
  }
}
/* 幸福币专区 */
.coin-box {
  margin: 0 20px;
  padding: 0 30px 30px;
  box-shadow: 0px 0px 12px 1px rgba(99, 99, 99, 0.2);
  border-radius: 10px;
  &__title {
    display: flex;
    justify-content: space-between;
    padding: 27px 0;
    font-size: 34px;
    font-weight: 500;
    .sign-btn {
      padding: 0 30px;
      height: 44px;
      line-height: 44px;
      background: linear-gradient(90deg, @red, @red-dark);
      border-radius: 22px;
      font-size: 24px;
      text-align: center;
      color: #fff;
    }
  }
  .coin-image-box {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    height: 160px;
    .coin-image {
      height: 100%;
      flex: 0 0 160px;
      /deep/ .van-image__img {
        border-radius: 4px;
      }
    }
    .coin-image + .coin-image {
      margin-left: 20px;
    }
  }
  /deep/ .van-notice-bar__content.van-ellipsis {
    width: 100%;
  }
}
/* 专区 */
.life-box {
  padding: 30px 20px;
  margin-top: 40px;
  &__title {
    font-size: 34px;
    font-weight: 500;
    line-height: 1;
    margin-bottom: 20px;
  }
  &__description {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    line-height: 1;
    margin-bottom: 30px;
  }
  /deep/ .van-image__img {
    border-radius: 10px;
  }
  /deep/ .van-image__error {
    border-radius: 10px;
  }
}
.community-box {
  padding-left: 20px;
  &__title {
    font-size: 34px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;
    margin-bottom: 20px;
  }
  .activity-list {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    .activity-item {
      width: 480px;
    }
    .activity-item + .activity-item {
      margin-left: 20px;
    }
    .activity-item__image {
      width: 100%;
      height: 270px;
      background: #f0f0f0;
      border-radius: 10px 10px 0px 0px;
    }
    .activity-item__description {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 66px;
      line-height: 66px;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 0px 0px 10px 10px;
      font-size: 24px;
      color: #fff;
      text-align: center;
    }
    .activity-info {
      display: flex;
      margin-top: 10px;
      width: 100%;
      .activity-info__right {
        width: calc(100% - 94px);
      }
      &__day {
        width: 74px;
        height: 74px;
        background: #f2f2f4;
        border-radius: 4px;
        margin-right: 20px;
        color: #8f8f94;
        font-size: 20px;
        padding: 0 10px;
        text-align: center;
      }
      &__title {
        width: 100%;
        font-size: 28px;
        @text-ellipsis();
      }
      &__time {
        font-size: 24px;
        color: @gray-7;
      }
    }
  }
}
.front-page {
  margin: 80px 20px;
  padding: 24px 30px 30px;
  height: 142px;
  background: @background-color;
  border-radius: 10px;
  .notice-swipe {
    height: 88px;
    /deep/ .van-swipe-item {
      line-height: 88px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  &__tag {
    font-size: 16px;
    width: 88px;
    height: 88px;
    padding: 8px 14px;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 10px;
    margin-right: 20px;
    text-align: center;
  }
  &__text {
    flex: 1;
    font-size: 26px;
    line-height: 44px;
    color: #222;
  }
}
.tf-mt-base {
  margin-top: 0 !important;
}
.tf-icon-right {
  font-size: 26px;
  color: #383838;
  line-height: 1;
}
.price-tag {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 140px;
  height: 60px;
  line-height: 60px;
  background: linear-gradient(-90deg, @orange-dark, @orange);
  border-radius: 30px 30px 0px 30px;
  color: #fff;
  text-align: center;
  font-size: 24px;
}
.coin-tag {
  position: absolute;
  left: 20px;
  bottom: 10px;
  padding: 0 23px;
  height: 36px;
  line-height: 36px;
  font-size: 24px;
  color: #fff;
  background: @orange-dark;
  opacity: 0.8;
  border-radius: 18px;
}
.coin-number {
  font-size: 36px;
  font-weight: 500;
  color: @orange-dark;
  .tf-icon {
    font-size: 28px;
  }
}
.coin-message {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  font-size: 24px;
  padding: 0 20px;
  border: 1px dashed rgba(170, 170, 170, 0.6);
  border-radius: 4px;
  margin-bottom: 30px;
  color: #8f8f94;
  .notice-swipe {
    height: 60px;
    /deep/ .van-swipe-item {
      flex: 1;
      display: flex;
      justify-content: space-between;
      line-height: 60px;
      color: @gray-7;
    }
  }
  &-name {
    line-height: 66px;
    display: flex;
    align-items: center;
    &::before {
      content: "";
      display: block;
      width: 8px;
      height: 8px;
      background: #383838;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  &-number {
    line-height: 60px;
  }
}
</style>

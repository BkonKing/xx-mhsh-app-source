<template>
  <view class="tf-bg tf-padding-base">
    <list>
      <cell v-for="(item, i) in data" :key="item.id">
        <view class="tf-card" @click="jump(item)">
          <view class="tf-card-header">
            <userInfo avatar="/static/app-icon.png" :name="item.name" :time="item.ctime">
              <template v-slot:right>
                <text class="tf-icon">{{item.info_type}}</text>
              </template>
            </userInfo>
          </view>
          <text class="tf-card-content">{{ item.content }}</text>
          <view class="tf-image-box">
            <image class="details-image" mode="aspectFill" v-for="(item, i) in item.images" :key="i" :src="item.src" v-if="i < 3"></image>
            <text class="details-image--shade" v-if="item.images.length > 3">+{{ item.images.length - 3 }}</text>
          </view>
          <view v-if="item.reply" class="reply-box">
            <text class="reply-title">社区回复</text>
            <text class="reply-content">{{ item.reply }}</text>
          </view>
        </view>
      </cell>
    </list>
  </view>
</template>

<script>
import userInfo from '@/pages/components/user-info/index.nvue'
import { getComPraiseList } from '@/api/butler/butler.js'
export default {
  components: {
    userInfo
  },
  data () {
    return {
      data: [
        {
          id: '1',
          content: '厨房下水道堵了都没有及时来处理',
          info_type: 1,
          ctime: '2020-06-03 16:35:26',
          reply: '已经分派相关工作人员去处理了',
          images: [
            {
              src: '/static/app-icon.png'
            },
            {
              src: '/static/app-icon.png'
            },
            {
              src: '/static/app-icon.png'
            },
            {
              src: '/static/app-icon.png'
            }
          ]
        },
        {
          id: '2',
          content: '厨房下水道堵了都没有及时来处理2',
          info_type: 2,
          ctime: '2020-06-03 16:35:26',
          reply: '已经分派相关工作人员去处理了',
          images: [
            {
              src: '/static/app-icon.png'
            },
            {
              src: '/static/app-icon.png'
            },
            {
              src: '/static/app-icon.png'
            },
            {
              src: '/static/app-icon.png'
            }
          ]
        }
      ]
    }
  },
  onLoad () {
    this.getComPraiseList()
  },
  methods: {
    getComPraiseList () {
      getComPraiseList().then(res => {
        if (res.success) {
          this.data = res.data
        }
      })
    },
    jump (item) {
      const url = `/pages/butler/compraise/details?id=${item.id}&type=${item.info_type}`
      uni.navigateTo({
        url
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tf-card {
  margin-bottom: @padding-lg;
}

.tf-image-box {
  padding-bottom: 40px;
}

.reply-box {
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: @divider-color;
  padding-bottom: 40px;
}

.reply-title {
  font-size: @font-size-md;
  padding: 30px 0;
}

.reply-content {
  padding: 30px;
  background-color: #f0f0f0;
  color: @gray-7;
  font-size: 24px;
  line-height: 52px;
}

.details-image {
  width: 200px;
  height: 200px;
}

.details-image--shade {
  position: absolute;
  width: 200px;
  height: 200px;
  line-height: 200px;
  z-index: 1;
  background-color: #000000;
  opacity: 0.6;
  right: 0;
  text-align: center;
  color: #fff;
  font-size: 54px;
}
</style>

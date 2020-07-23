<template>
  <div class="tf-bg tf-padding-base">
    <van-nav-bar title="我的投诉表扬" :fixed="true" left-arrow @click-left="$router.go(-1)" />
    <div class="tf-main-container">
      <refreshList :list.sync="data" @load="getComPraiseList">
        <template v-slot="{item}">
          <div class="tf-card" @click="jump(item)">
          <div class="tf-card-header">
            <userInfo avatar="/static/app-icon.png" :name="item.name" :time="item.ctime">
              <template v-slot:right>
                <div class="tf-icon">{{item.info_type}}</div>
              </template>
            </userInfo>
          </div>
          <div class="tf-card-content">{{ item.content }}</div>
          <div class="tf-image-box">
            <img class="details-image" mode="aspectFill" v-for="(item, i) in item.images" :key="i" :src="item.src" v-if="i < 3">
            <div class="details-image--shade" v-if="item.images.length > 3">+{{ item.images.length - 3 }}</div>
          </div>
          <div v-if="item.reply" class="reply-box">
            <div class="reply-title">社区回复</div>
            <div class="reply-content">{{ item.reply }}</div>
          </div>
        </div>
        </template>
      </refreshList>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import userInfo from '@/components/user-info/index.vue'
import { getComPraiseList } from '@/api/butler/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    refreshList,
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
  created () {
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
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.tf-card {
  margin-bottom: @padding-lg;
}

.tf-card-header {
  border-bottom: 1px solid @divider-color;
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
  border-radius:10px;
}

.tf-image-box {
  @flex();
  justify-content: space-around;
  position: relative;
  padding-bottom: 40px;
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
  top: 0;
  right: 0;
  text-align: center;
  color: #fff;
  font-size: 54px;
}
</style>

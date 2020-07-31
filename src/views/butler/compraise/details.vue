<template>
  <div class="tf-bg">
    <van-nav-bar
      :title="title"
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="tf-main-container">
      <div class="tf-bg-white">
        <userInfo name="园博园他" avatar="/static/app-icon.png" :time="ctime"></userInfo>
        <div class="tf-auxiliary-content tf-mt-lg">{{content}}</div>
        <div class="tf-image-box tf-mt-base">
          <img class="image" v-for="(item, i) in images" :key="i" :src="item.src" mode="aspectFill" />
        </div>
      </div>
      <div v-if="reply" class="tf-card tf-mt-lg">
        <div class="tf-card-header">社区回复</div>
        <div class="tf-card-content">{{reply}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import userInfo from '@/components/user-info/index.vue'
import { getComPraiseInfo } from '@/api/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    userInfo
  },
  data () {
    return {
      title: '',
      id: '',
      content: '厨房下水道堵了都没有及时来处理',
      info_type: '2',
      ctime: '2020-06-03 16:35:26',
      reply: '已经分派相关工作人员去处理了',
      images: [
        { src: '/static/app-icon.png' },
        { src: '/static/app-icon.png' },
        { src: '/static/app-icon.png' },
        { src: '/static/app-icon.png' }
      ]
    }
  },
  created () {
    const { id, type } = this.$route.query
    this.id = id
    this.title = type === 2 ? '表扬' : '投诉'
    this.getComPraiseInfo()
  },
  methods: {
    getComPraiseInfo () {
      getComPraiseInfo({
        compraiseId: this.id
      }).then(res => {
        if (res.success) {
          const { content } = res.data
          this.content = content
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tf-card {
  width: 100%;
  border-radius: 0;
}
.tf-bg-white {
  padding: 20px 30px 10px;
}
.tf-card-header {
  font-size: 30px;
}
.image {
  width: 216px;
  height: 216px;
  margin-bottom: 20px;
}
.tf-auxiliary-content {
  line-height: 56px;
}
</style>

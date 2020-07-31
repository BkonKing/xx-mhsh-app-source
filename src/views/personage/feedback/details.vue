<template>
  <div class="tf-bg">
    <van-nav-bar title="我的反馈" :fixed="true" :border="false" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="tf-main-container">
      <div class="tf-bg-white padding">
        <div class="tf-row-space-between tf-divider">
          <div class="tf-text-lg">产品反馈</div>
          <div class="tf-text tf-text-grey">2020-07-07 12:00</div>
        </div>
        <div class="tf-auxiliary-content tf-mt-lg">{{content}}</div>
        <div class="tf-image-box tf-mt-base">
          <img class="image" v-for="(item, i) in images" :key="i" :src="item.src" mode="aspectFill" />
        </div>
      </div>
      <div v-if="reply" class="tf-card tf-mt-lg">
        <div class="tf-card-header">回复</div>
        <div class="tf-card-content">{{reply}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import { getComPraiseInfo } from '@/api/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar
  },
  data () {
    return {
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
    this.id = this.$route.query.id
    this.getComPraiseInfo()
  },
  methods: {
    getComPraiseInfo () {
      getComPraiseInfo({
        compraiseId: this.id
      }).then((res) => {
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
.padding {
  padding: 10px 30px;
}
.tf-row-space-between {
  padding-bottom: 30px;
}
.tf-text-lg {
  font-weight: 500;
}
.tf-card {
  width: 750px;
  border-radius: 0;
}
.tf-card-header {
  font-size: 30px;
}
.image {
  width: 210px;
  height: 210px;
  margin-bottom: 20px;
}
.tf-auxiliary-content {
  line-height: 52px;
}
</style>

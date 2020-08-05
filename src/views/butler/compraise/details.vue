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
        <userInfo name="园博园他" avatar="/static/app-icon.png" :time="info.ctime"></userInfo>
        <div class="tf-auxiliary-content tf-mt-lg">{{info.content}}</div>
        <tf-image-list :data="info.images" mode="show" class="tf-mt-base"></tf-image-list>
      </div>
      <div v-if="info.reply" class="tf-card tf-mt-lg">
        <div class="tf-card-header">社区回复</div>
        <div class="tf-card-content">{{info.reply}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import userInfo from '@/components/user-info/index.vue'
import { getComPraiseInfo } from '@/api/butler.js'
import tfImageList from '@/components/tf-image-list'
export default {
  components: {
    [NavBar.name]: NavBar,
    tfImageList,
    userInfo
  },
  data () {
    return {
      title: '',
      id: '',
      info: {}
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
          this.info = res.data
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

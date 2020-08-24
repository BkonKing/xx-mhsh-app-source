<template>
  <div class="tf-bg">
    <van-nav-bar
      :title="title"
      :fixed="true"
      :border="false"
       placeholder
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="tf-padding">
      <div class="tf-bg-white">
        <userInfo :avatar="userInfo.avatar" :name="userInfo.nickname" :time="info.ctime"></userInfo>
        <div class="tf-auxiliary-content tf-mt-lg">{{info.content}}</div>
        <tf-image-list v-if="info.images" :data="info.images" mode="show" class="tf-mt-base"></tf-image-list>
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
import { mapGetters } from 'vuex'
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
    const { id } = this.$route.query
    this.id = id
    this.getComPraiseInfo()
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    getComPraiseInfo () {
      getComPraiseInfo({
        compraiseId: this.id
      }).then(res => {
        this.info = res.data
        this.title = this.info.info_type == 2 ? '表扬' : '投诉'
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

<template>
  <div class="tf-bg">
    <van-nav-bar
      title="我的反馈"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="tf-bg-white padding">
      <div class="tf-row-space-between tf-divider">
        <div class="tf-text-lg">{{info_type}}</div>
        <div class="tf-text tf-text-grey">{{ctime}}</div>
      </div>
      <div class="tf-auxiliary-content tf-mt-lg">{{content}}</div>
      <tf-image-list v-if="images" :data="images" mode="show" class="tf-mt-base"></tf-image-list>
    </div>
    <div v-if="reply" class="tf-card tf-mt-lg">
      <div class="tf-card-header">回复</div>
      <div class="tf-card-content">{{reply}}</div>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import { getFeedbackInfo } from '@/api/personage.js'
import tfImageList from '@/components/tf-image-list'
export default {
  components: {
    [NavBar.name]: NavBar,
    tfImageList
  },
  data () {
    return {
      id: '',
      content: '',
      info_type: '',
      ctime: '',
      reply: '',
      images: []
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getFeedbackInfo()
  },
  methods: {
    getFeedbackInfo () {
      getFeedbackInfo({
        id: this.id
      }).then((res) => {
        if (res.success) {
          const { content, info_type, ctime, reply, images } = res.data
          this.content = content
          this.info_type = info_type
          this.ctime = ctime
          this.reply = reply
          this.images = images
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
  align-items: center;
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

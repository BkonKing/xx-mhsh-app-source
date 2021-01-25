<template>
<div class='tf-bg'>
  <van-nav-bar
    title="我的影票"
    :fixed="true"
    :border="false"
    left-arrow
    @click-left="$router.go(-1)"
  >
    <template #right>
      <span class="tf-icon tf-icon-kefu"></span>
    </template>
  </van-nav-bar>
  <div class="tf-main-container">
  </div>
</div>
</template>

<script>
import { getfilmdetails } from '@/api/movie'
export default {
  name: 'movieTicket',
  data () {
    return {
      orderId: '',
      info: {}
    }
  },
  created () {
    this.orderId = this.$route.query.id
    this.getfilmdetails()
  },
  methods: {
    // 获取电影票详细信息
    getfilmdetails () {
      getfilmdetails({
        order_id: this.orderId
      }).then(({ data }) => {
        this.info = data
      })
    }
  }
}
</script>

<style lang='less' scoped>

</style>

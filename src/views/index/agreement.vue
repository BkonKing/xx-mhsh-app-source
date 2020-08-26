<template>
<div class='tf-bg-white'>
  <van-nav-bar
    :title='title'
    :fixed='true'
    :border='false'
    placeholder
    left-arrow
    @click-left='$router.go(-1)'
  >
    <template #right>
      <span class='tf-icon tf-icon-time-circle'></span>
    </template>
  </van-nav-bar>
  <div class='tf-padding'>
    <div class="tf-text" v-html="content"></div>
  </div>
</div>
</template>

<script>
import { NavBar } from 'vant'
import { getUserAgreement } from '@/api/home'
import { mapGetters } from 'vuex'

export default {
  components: {
    [NavBar.name]: NavBar
  },
  data () {
    return {
      title: '',
      content: ''
    }
  },
  computed: {
    ...mapGetters(['otherAgreement'])
  },
  created () {
    const type = this.$route.query.type
    if (type) {
      this.title = this.otherAgreement.title
      this.content = this.otherAgreement.content
    } else {
      this.getUserAgreement()
    }
  },
  methods: {
    getUserAgreement () {
      getUserAgreement().then(res => {
        const { title, content } = res.data
        this.title = title
        this.content = content
      })
    }
  }
}
</script>

<style lang='less' scoped>

</style>

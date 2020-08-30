<template>
  <div class="tf-bg">
    <van-nav-bar title="协议及声明" :fixed="true" :border="false" left-arrow placeholder @click-left="$router.go(-1)">
      <template #right>
        <span class="tf-icon tf-icon-time-circle"></span>
      </template>
    </van-nav-bar>
    <div class="tf-padding">
      <tf-list>
        <tf-list-item title="美好生活家园用户协议" @click="goAgreement()" border>
          <template v-slot:right>
            <div class="right-text"></div>
          </template>
        </tf-list-item>
        <tf-list-item title="领里使用协议" @click="goAgreement(2)" border>
          <template v-slot:right>
            <div class="right-text"></div>
          </template>
        </tf-list-item>
        <tf-list-item title="功能使用规范" @click="goAgreement(1)">
          <template v-slot:right>
            <div class="right-text"></div>
          </template>
        </tf-list-item>
      </tf-list>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import tfList from '@/components/tf-list/index.vue'
import tfListItem from '@/components/tf-list/item.vue'
export default {
  components: {
    [NavBar.name]: NavBar,
    tfList,
    tfListItem
  },
  data () {
    return {}
  },
  methods: {
    goAgreement (type) {
      this.$router.push(`/agreement?type=${type}`)
    }
  }
}
</script>

<style lang='less' scoped>
</style>

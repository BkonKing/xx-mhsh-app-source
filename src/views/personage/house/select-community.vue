<template>
  <div class="tf-bg">
    <van-nav-bar title="选择小区" :fixed="true" :border="false" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="tf-main-container">
      <van-search v-model="value" @search="searchCommunity" placeholder="请输入关键字搜索" />
      <tf-list style="background-color: #fff;">
        <tf-list-item title="新乡美好生活家园" @click="jumpSelectHouse"></tf-list-item>
      </tf-list>
    </div>
  </div>
</template>

<script>
import { NavBar, Search } from 'vant'
import tfList from '@/components/tf-list/index'
import tfListItem from '@/components/tf-list/item.vue'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Search.name]: Search,
    tfList,
    tfListItem
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    jumpSelectHouse () {
      this.$router.push('/pages/personage/house/select-house')
    },
    searchCommunity () {}
  }
}
</script>

<style lang="less">
</style>

<template>
  <div class="tf-bg">
    <van-nav-bar :border="false" :fixed="true" placeholder :left-arrow="true">
      <template #title>
        <div @click="type = '1'">电影</div>
        <div @click="type = '2'">影院</div>
      </template>
      <template #right>
        <span class="tf-icon tf-icon-sousuo1"></span>
      </template>
    </van-nav-bar>
    <!-- 电影 -->
    <div v-show="type === '1'">
      <van-tabs v-model="movieActive">
        <van-tab title="正在上映">内容 1</van-tab>
        <van-tab title="即将上映">内容 2</van-tab>
      </van-tabs>
    </div>
    <!-- 影院 -->
    <div v-show="type === '2'">
      <van-dropdown-menu>
        <van-dropdown-item title="全程" v-model="value1" :options="option1" />
        <van-dropdown-item title="影厅" v-model="value2" :options="option2" />
        <van-dropdown-item v-model="value2" :options="option2" />
      </van-dropdown-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'movieList',
  data () {
    return {
      type: 0, // 1：影片，2：影院
      movieActive: 0
    }
  },
  created () {
    this.type = this.$route.query.type
  }
}
</script>

<style></style>

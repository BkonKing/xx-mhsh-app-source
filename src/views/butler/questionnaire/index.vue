<template>
  <div class="tf-bg">
    <van-nav-bar
      title="问卷投票"
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-time-circle" @click="goMyList"></span>
      </template>
    </van-nav-bar>
    <div class="tf-main-container">
      <questionList :data.sync="list" :load="getWjtpList"></questionList>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import questionList from './components/list.vue'
import { getWjtpList } from '@/api/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    questionList
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    getWjtpList (params) {
      return getWjtpList(params)
    },
    goMyList () {
      this.$router.push('/pages/butler/questionnaire/my')
    }
  }
}
</script>

<style scoped>
.tf-main-container {
  padding-top: 98px;
}
</style>

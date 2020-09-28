<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="问卷投票"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-shijian" @click="goMyList"></span>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
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
      const len = this.list.length
      const wjtpId = len && params.pages !== 1 ? this.list[len - 1].id : ''
      return getWjtpList({
        wjtpId
      })
    },
    goMyList () {
      this.$router.push('/pages/butler/questionnaire/my')
    }
  }
}
</script>

<style scoped>
.tf-body-container {
  padding-top: 10px;
}
</style>

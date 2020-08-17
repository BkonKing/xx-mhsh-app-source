<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="我的问卷投票"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="tf-body-container">
      <questionList :data.sync="list" :load="getMyWjtpList"></questionList>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import questionList from './components/list.vue'
import { getMyWjtpList } from '@/api/butler.js'
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
    getMyWjtpList (params) {
      return getMyWjtpList(params)
    }
  }
}
</script>

<style scoped>
.tf-body-container {
  padding-top: 10px;
}
</style>

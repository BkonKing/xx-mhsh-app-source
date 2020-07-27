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
      <questionList :data="list"></questionList>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import questionList from './components/list.vue'
import { getWjtpList } from '@/api/butler/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    questionList
  },
  data () {
    return {
      list: [
        {
          id: '1',
          title: '小区门禁更换投票',
          remarks: '小区门禁已使用多年部门功能已损坏需要更换',
          wjtp_type: '2',
          virtual_coin: 10,
          joins: '300',
          stime: '2020-06-03 16:35:26'
        },
        {
          id: '2',
          title: '疫情防范问卷调查',
          remarks: '小区开展疫情防范问卷调查',
          wjtp_type: '1',
          virtual_coin: 0,
          joins: '300',
          stime: '2020-06-03 16:35:26'
        }
      ]
    }
  },
  created () {
    this.getWjtpList()
  },
  methods: {
    getWjtpList () {
      getWjtpList().then(res => {
        if (res.success) {
          this.list = res.data
        }
      })
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

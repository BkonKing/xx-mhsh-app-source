<template>
  <div class="tf-bg">
    <van-nav-bar
      title="我的问卷投票"
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="tf-main-container">
      <questionList :data.sync="list"></questionList>
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
      list: [
        {
          id: '1',
          title: '小区门禁更换投票',
          remarks: '小区门禁已使用多年部门功能已损坏需要更换',
          wjtp_type: '2',
          virtual_coin: '10',
          joins: '300',
          stime: '2020-06-03 16:35:26'
        }
      ]
    }
  },
  created () {
    this.getMyWjtpList()
  },
  methods: {
    getMyWjtpList () {
      getMyWjtpList().then(res => {
        if (res.success) {
          this.list = res.data
        }
      })
    }
  }
}
</script>

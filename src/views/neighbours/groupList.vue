<template>
<div class='tf-bg'>
  <van-nav-bar
    :title='title'
    :fixed='true'
    :border='false'
    left-arrow
    @click-left='$router.go(-1)'
  >
    <template #right>
      <span class='tf-icon tf-icon-edit' @click="goEdit"></span>
    </template>
  </van-nav-bar>
  <div class='tf-main-container'>
    <list :data="postBarList"></list>
  </div>
</div>
</template>

<script>
import { NavBar } from 'vant'
import list from './components/list'
import {
  getPostBarList
} from '@/api/neighbours'
export default {
  components: {
    [NavBar.name]: NavBar,
    list
  },
  data () {
    return {
      categoryId: '',
      postBarList: []
    }
  },
  created () {
    this.categoryId = this.$route.query.categoryId
    this.title = this.$route.query.category
    this.getPostBarList()
  },
  methods: {
    /* 发布 */
    goEdit () {
      this.$router.push({
        name: 'neighboursPublish',
        query: {
          category_id: this.categoryId
        }
      })
    },
    /* 获取最新列表 */
    getPostBarList () {
      getPostBarList({
        categoryId: this.categoryId
      }).then(res => {
        this.postBarList = res.data
      })
    }
  }
}
</script>

<style lang='less' scoped>

</style>

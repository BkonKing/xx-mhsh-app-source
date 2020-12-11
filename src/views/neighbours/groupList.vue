<template>
<div class='tf-bg tf-body'>
  <van-nav-bar
    :title='title'
    :fixed='true'
    :border='false'
    placeholder
    left-arrow
    @click-left='$router.go(-1)'
  >
    <template #right>
      <span class='tf-icon tf-icon-bianxie' @click="goEdit"></span>
    </template>
  </van-nav-bar>
  <div class='tf-main-container tf-body-container'>
    <list :data.sync="postBarList" :load="getPostBarList" article_type="3"></list>
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
      postBarList: [],
      isAll: 1
    }
  },
  created () {
    this.categoryId = this.$route.query.categoryId
    this.title = this.$route.query.category
    this.isAll = this.$route.query.isAll
    // this.getPostBarList()
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
    getPostBarList (params) {
      return getPostBarList(Object.assign({
        categoryId: this.categoryId,
        is_all: this.isAll
      }, params))
    }
  },
  beforeRouteLeave (to, from, next) {
    this.postBarList = []
    this.$nextTick(() => {
      next()
    })
  }
}
</script>

<style lang='less' scoped>

</style>

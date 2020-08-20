<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="我的互动"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <van-tabs class="tf-body-container" v-model="active">
      <van-tab title="我发布的">
        <neighbour-list key="publish" :data.sync="myList" :load="getMyArticleList"></neighbour-list>
      </van-tab>
      <van-tab title="我评论的">
        <comment-list></comment-list>
      </van-tab>
      <van-tab title="我点赞的">
        <neighbour-list key="like" :data.sync="likeList" :load="getMythumbsupList"></neighbour-list>
      </van-tab>
      <van-tab title="参与活动">
        <neighbour-list key="activity" :data.sync="activityList" :load="getMyJoinActivityList"></neighbour-list>
      </van-tab>
      <van-tab title="问卷投票">
        <wjtp-list :data.sync="myWjtpList" :load="getMyWjtpList"></wjtp-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from 'vant'
import neighbourList from '@/views/neighbours/components/list'
import wjtpList from '@/views/butler/questionnaire/components/list'
import commentList from './components/comment-list'
import { getMyArticleList, getMythumbsupList, getMyJoinActivityList } from '@/api/personage.js'
import { getMyWjtpList } from '@/api/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    neighbourList,
    wjtpList,
    commentList
  },
  data () {
    return {
      active: 0,
      myList: [],
      likeList: [],
      activityList: [],
      myWjtpList: []
    }
  },
  created () {},
  methods: {
    getMyArticleList (params) {
      return getMyArticleList(params)
    },
    getMythumbsupList (params) {
      return getMythumbsupList(params)
    },
    getMyJoinActivityList (params) {
      return getMyJoinActivityList(params)
    },
    getMyWjtpList (params) {
      return getMyWjtpList(params)
    }
  }
}
</script>

<style lang='less' scoped>
.tf-body-container {
  @flex-column();
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: auto;
    .van-tab__pane {
      height: 100%;
    }
  }
}
</style>

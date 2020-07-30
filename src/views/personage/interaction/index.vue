<template>
  <div class="tf-bg">
    <van-nav-bar title="我的互动" :fixed="true" :border="false" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <van-tabs class="pt88" v-model="active">
      <van-tab title="我发布的">
        <neighbour-list key="publish"></neighbour-list>
      </van-tab>
      <van-tab title="我评论的">
        <reply-list grayTheme></reply-list>
      </van-tab>
      <van-tab title="我点赞的">
        <neighbour-list key="like"></neighbour-list>
      </van-tab>
      <van-tab title="参与活动">
        <neighbour-list key="activity"></neighbour-list>
      </van-tab>
      <van-tab title="问卷投票">
        <repair-list></repair-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from 'vant'
import repairList from '@/views/butler/repairs/components/list'
import neighbourList from '@/views/neighbours/components/list'
import replyList from '@/views/neighbours/components/reply'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    repairList,
    neighbourList,
    replyList
  },
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang='less' scoped>
.pt88 {
  padding-top: 88px;
  height: 100%;
}
/deep/ .van-tabs__content {
  overflow: auto;
  height: calc(100% - 87px);
}
</style>

<template>
  <div class="tf-bg">
    <van-nav-bar
      title="我的互动"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <van-tabs class="pt88" v-model="active">
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
        <neighbour-list key="activity" :data.sync="activityList" :load="activityLoad"></neighbour-list>
      </van-tab>
      <van-tab title="问卷投票">
        <wjtp-list :data.sync="myWjtpList" :load="wjtpLoad"></wjtp-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from 'vant'
import neighbourList from '@/views/neighbours/components/list'
import wjtpList from '@/views/butler/questionnaire/components/list'
import commentList from './components/comment-list'
import { getMyArticleList, getMythumbsupList } from '@/api/personage.js'
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
      myList: [
        {
          id: '4',
          category: 3,
          title: '邻里献爱心活动',
          content:
            '在宏观调控不断深入与加强的背景下，房地产行业已经从过去的资源竞争，进入到产品竞争的阶段。对于房企而言，形成产品标准化管理体系，是快速提升房地产企业管理水平的有效捷径。',
          thumbnail:
            'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1678948314,1083480950&fm=26&gp=0.jpg',
          thumbsupStatus: 1,
          thumbsups: 5,
          comments: 3,
          ctime: '2020-06-03 16:35:26'
        }
      ],
      likeList: [
        {
          id: '3',
          content:
            '在宏观调控不断深入与加强的背景下，房地产行业已经从过去的资源竞争，进入到产品竞争的阶段。对于房企而言，形成产品标准化管理体系，是快速提升房地产企业管理水平的有效捷径。',
          images: [
            '//bpic.588ku.com//back_origin_min_pic/19/04/12/a7c89ed2d90387fdfbb6daa651e2c674.jpg!/fw/750/quality/99/unsharp/true/compress/true'
          ],
          category: 2,
          account: '小雪',
          avatar:
            'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2381468826,3029522659&fm=111&gp=0.jpg',
          oneself: 0,
          thumbsupStatus: 0,
          thumbsups: 51232,
          comments: 3,
          ctime: '2020-06-03 16:35:26'
        }
      ],
      activityList: [
        {
          category: 1,
          id: '1',
          title: '邻里献爱心活动',
          content:
            '在宏观调控不断深入与加强的背景下，房地产行业已经从过去的资源竞争，进入到产品竞争的阶段。对于房企而言，形成产品标准化管理体系，是快速提升房地产企业管理水平的有效捷径。',
          thumbnail: 'https://img.yzcdn.cn/vant/apple-2.jpg',
          account: '天福集团',
          avatar:
            'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2381468826,3029522659&fm=111&gp=0.jpg',
          joins: 5,
          oneself: 1,
          thumbsupStatus: 0,
          thumbsups: 0,
          comments: 3,
          stime: '2020-06-06 08:00:00',
          etime: '2020-06-06 18:00:00',
          ctime: '2020-06-03 16:35:26'
        }
      ],
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
    activityLoad () {},
    wjtpLoad () {}
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

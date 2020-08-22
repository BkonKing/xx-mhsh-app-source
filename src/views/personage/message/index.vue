<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="消息"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      right-text="全部已读"
      @click-left="$router.go(-1)"
      @click-right="messageAllRead"
    ></van-nav-bar>
    <van-tabs class="tf-body-container" v-model="current">
      <van-tab title="交易" :badge="badgeList[2]">
        <message-list type="transaction" :load="({pages}) => getMessageList(pages, 2)" @click="toTransaction"></message-list>
      </van-tab>
      <van-tab title="互动" :badge="badgeList[3]">
        <interaction @click="toInteraction"></interaction>
      </van-tab>
      <van-tab title="物业" :badge="badgeList[4]">
        <message-list type="butler" :load="({pages}) => getMessageList(pages, 4)" @click="toButler"></message-list>
      </van-tab>
      <van-tab title="活动" :badge="badgeList[5]">
        <message-list type="activity" :load="({pages}) => getMessageList(pages, 5)"></message-list>
      </van-tab>
      <van-tab title="系统" :badge="badgeList[6]">
        <message-list type="system" :load="({pages}) => getMessageList(pages, 6)"></message-list>
      </van-tab>
      <van-tab v-if="userInfo.swrole == 1" title="工作" :badge="badgeList[1]">
        <message-list type="work" :load="({pages}) => getMessageList(pages, 1)"></message-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from 'vant'
import messageList from './components/message-list.vue'
import interaction from './components/interaction.vue'
import {
  getMessageList,
  getCountMessage,
  messageRead,
  messageAllRead
} from '@/api/personage.js'
import { mapGetters } from 'vuex'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    messageList,
    interaction
  },
  data () {
    return {
      badgeList: [],
      current: 0
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    this.getCountMessage()
  },
  methods: {
    // 获取消息列表
    getMessageList (pages, type) {
      return getMessageList({
        remind_type: type,
        pages
      })
    },
    // 获取统计未读消息
    getCountMessage () {
      getCountMessage().then(res => {
        this.badgeList = res.data
      })
    },
    // 设置已读消息
    messageRead (id) {
      messageRead({
        id
      }).then(res => {
        this.badgeList = res.data || []
      })
    },
    // 设置消息全部已读
    messageAllRead () {
      messageAllRead().then(res => {

      })
    },
    // 交易操作
    toTransaction ({ id, type }) {
      // 幸福币详情
      if (type) {
        this.$router.push(`/pages/personage/happiness-coin/details?id=${id}`)
      }
    },
    // 互动操作
    toInteraction (item) {
      this.$router.push({
        path: '/pages/neighbours/details',
        query: {
          articleType: item.article_type,
          id: item.article_id
        }
      })
    },
    // 物业操作
    toButler (item) {
      switch (item.type) {
        case '':

          break

        default:
          break
      }
      this.$router.push({
        path: '/pages/butler/repairs/details',
        query: {
          title: item.title,
          id: item.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
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
.tf-flex-item {
  overflow: auto;
}
/deep/ .van-info {
  top: 16px;
  right: -16px;
}
</style>

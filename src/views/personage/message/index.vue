<template>
  <div class="tf-bg tf-screen">
    <van-nav-bar
      title="消息"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      right-text="全部已读"
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="tf-main-container">
      <van-tabs v-model="current">
        <van-tab title="交易" :badge="badge[0]">
          <div class="tf-flex-item">
            <message-list type="transaction" :load="({pages}) => getMessageList(pages, 2)"></message-list>
          </div>
        </van-tab>
        <van-tab title="互动" :badge="badge[1]">
          <div class="tf-flex-item">
            <interaction></interaction>
          </div>
        </van-tab>
        <van-tab title="物业" :badge="badge[2]">
          <div class="tf-flex-item">
            <message-list type="butler" :load="({pages}) => getMessageList(pages, 4)"></message-list>
          </div>
        </van-tab>
        <van-tab title="活动" :badge="badge[3]">
          <div class="tf-flex-item">
            <message-list type="activity" :load="({pages}) => getMessageList(pages, 5)"></message-list>
          </div>
        </van-tab>
        <van-tab title="系统" :badge="badge[4]">
          <div class="tf-flex-item">
            <message-list type="system" :load="({pages}) => getMessageList(pages, 6)"></message-list>
          </div>
        </van-tab>
        <van-tab title="工作" :badge="badge[5]">
          <div class="tf-flex-item">
            <message-list type="work" :load="({pages}) => getMessageList(pages, 1)"></message-list>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from 'vant'
import messageList from './components/message-list.vue'
import interaction from './components/interaction.vue'
import { getMessageList } from '@/api/personage.js'
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
      items: ['交易', '互动', '物业', '活动', '系统', '工作'],
      badge: [1, 2, 3, 4, 5, 99],
      current: 0
    }
  },
  methods: {
    getMessageList (pages, type) {
      return getMessageList({
        remind_type: type,
        pages
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tf-main-container {
  @flex-column();
}
.tf-flex-item {
  overflow: auto;
}
/deep/ .van-info {
  top: 16px;
  right: -16px;
}
</style>

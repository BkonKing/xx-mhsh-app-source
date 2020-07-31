<template>
  <div class="tf-bg tf-screen">
    <van-nav-bar
      title="消息"
      :fixed="true"
      :border="false"
      left-arrow
      right-text="全部已读"
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="tf-main-container">
      <van-tabs v-model="current">
        <van-tab
          v-for="(item, i) in items"
          :key="i"
          :badge="badge[i]"
          @click="onClickItem"
          :title="item"
        ></van-tab>
      </van-tabs>
      <div class="tf-flex-item">
        <message-list type="transaction" v-show="current === 0"></message-list>
        <interaction v-show="current === 1"></interaction>
        <message-list type="butler" v-show="current === 2"></message-list>
        <message-list type="activity" v-show="current === 3"></message-list>
        <message-list type="system" v-show="current === 4"></message-list>
        <message-list type="work" v-show="current === 5"></message-list>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from 'vant'
import messageList from './components/message-list.vue'
import interaction from './components/interaction.vue'
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
    onClickItem (e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex
      }
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

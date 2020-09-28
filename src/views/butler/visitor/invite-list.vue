<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="访客邀约记录"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-tabs class="tf-body-container" v-model="isVisit">
      <van-tab title="待来访">
        <refreshList :list.sync="unvisitList" :load="(params) => getVisitorLogList(params, 1, 'unvisitList')">
          <template v-slot="{item}">
            <list-card :data="item" :key="item.id"></list-card>
          </template>
        </refreshList>
      </van-tab>
      <van-tab title="已过期">
        <refreshList :list.sync="expiredList" :load="(params) => getVisitorLogList(params, 3, 'expiredList')">
          <template v-slot="{item}">
            <list-card :data="item" :key="item.id"></list-card>
          </template>
        </refreshList>
      </van-tab>
      <van-tab title="已到访">
        <refreshList :list.sync="visitedList" :load="(params) => getVisitorLogList(params, 2, 'visitedList')">
          <template v-slot="{item}">
            <list-card :data="item" :key="item.id"></list-card>
          </template>
        </refreshList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import { getVisitorLogList } from '@/api/butler.js'
import listCard from './components/list-card'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    refreshList,
    listCard
  },
  data () {
    return {
      isVisit: 0,
      unvisitList: [],
      expiredList: [],
      visitedList: []
    }
  },
  methods: {
    getVisitorLogList (params, isVisit, listName) {
      const active = isVisit || this.isVisit
      const len = this[listName].length
      const id = len && params.pages !== 1 ? this[listName][len - 1].id : ''
      return getVisitorLogList({
        logId: id,
        isVisit: active
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
    -webkit-overflow-scrolling: touch;
    .van-tab__pane {
      height: 100%;
    }
  }
}
</style>

<template>
  <div class="tf-bg">
    <van-nav-bar
      title="访客邀约记录"
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="tf-main-container">
      <van-tabs v-model="isVisit" @change="onChange">
        <van-tab title="待来访">
          <refreshList :list.sync="data0" @load="onLoad">
            <template v-slot="{item}">
              <list-card :data="item" :key="item.id"></list-card>
            </template>
          </refreshList>
        </van-tab>
        <van-tab title="已过期">
          <refreshList :list.sync="data1" @load="onLoad">
            <template v-slot="{item}">
              <list-card :data="item" :key="item.id"></list-card>
            </template>
          </refreshList>
        </van-tab>
        <van-tab title="已到访">
          <refreshList :list.sync="data2" @load="onLoad">
            <template v-slot="{item}">
              <list-card :data="item" :key="item.id"></list-card>
            </template>
          </refreshList>
        </van-tab>
      </van-tabs>
    </div>
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
      data0: [],
      data1: [],
      data2: []
    }
  },
  created () {
    this.getVisitorLogList(0)
    this.getVisitorLogList(1)
    this.getVisitorLogList(2)
  },
  methods: {
    onLoad () {},
    getVisitorLogList (isVisit) {
      const active = isVisit || this.isVisit
      getVisitorLogList({
        isVisit: active
      }).then((res) => {
        if (res.success) {
          this[`data${active}`] = res.data
        }
      })
    },
    onChange (index) {
      // this.getVisitorLogList()
    }
  }
}
</script>

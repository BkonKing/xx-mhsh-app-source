<template>
  <van-pull-refresh
    style="text-align: center;width: 100%;"
    v-model="refreshing"
    success-text="刷新成功"
    @refresh="onRefresh"
  >
    <van-list
      class="tf-van-list"
      v-model="loading"
      :finished="finished"
      loading-text="加载中"
      finished-text="没有更多了"
      error-text="请重新加载"
      @load="onLoad"
    >
      <van-cell class="tf-van-cell" v-for="(item, i) in listChild" :key="i">
        <slot v-bind:item="item"></slot>
      </van-cell>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { List, Cell, PullRefresh } from 'vant'
export default {
  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    load: {
      type: Function
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      isAllRead: false,
      listChild: this.list
    }
  },
  created () {
    // this.getNoticeList()
  },
  methods: {
    // 上拉刷新
    onLoad () {
      // this.getList();
      if (this.refreshing) {
        this.listChild = []
        this.$emit('update:list', [])
        this.refreshing = false
      }
      this.$emit('load')
    },
    // 下拉刷新
    onRefresh () {
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  },
  watch: {
    list (value) {
      this.listChild = value
      console.log(this.listChild)
      this.loading = false
      this.refreshing = false
    }
  }
}
</script>

<style lang="less" scoped>
.tf-van-list {
  height: 100%;
  width: 100%;
  padding: 20px;
  overflow: auto;
}
.tf-van-cell {
  background: none;
  margin-bottom: 20px;
}
/deep/ .van-pull-refresh {
  width: 100%;
}
</style>

<template>
  <van-pull-refresh
    style="text-align: center;width: 100%;height: 100%;"
    v-model="refreshing"
    success-text="刷新成功"
    @refresh="onRefresh"
  >
    <van-list
      class="tf-van-list"
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      loading-text="加载中"
      finished-text="没有更多了"
      error-text="请重新加载"
      v-bind="$attrs"
      @load="onLoad"
    >
      <van-cell class="tf-van-cell" v-for="(item, i) in listChild" :key="i">
        <slot :item="item" :index="i"></slot>
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
      error: false,
      listChild: this.list,
      pageNum: 1,
      isEndNum: 0 // 列表是否不够每页条数（比如10）
    }
  },
  created () {
    // this.getNoticeList()
  },
  methods: {
    // 上拉刷新
    async onLoad () {
      if (this.refreshing) {
        this.refreshing = false
      }
      if (this.load && !this.isEndNum) {
        await this.load({
          pages: this.pageNum
        }).then(({ data }) => {
          if (data.length > 0) {
            this.listChild.push(...data)
            this.$emit('update:list', this.listChild)
            this.pageNum++
            if (data.length >= 10) {
              this.isEndNum = 0
            } else {
              this.isEndNum = 1
            }
          } else {
            this.finished = true
          }
          this.loading = false
        }).catch(() => {
          this.error = true
        })
      } else {
        this.finished = true
      }
      this.$emit('load')
    },
    // 下拉刷新
    onRefresh () {
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.isEndNum = 0
      this.pageNum = 1
      this.listChild = []
      // this.$emit('update:list', this.listChild)
      this.onLoad()
    }
  },
  watch: {
    list (value) {
      this.listChild = value
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
  -webkit-transform: translateZ(0px);
}
.tf-van-cell {
  background: none;
  padding: 0;
  margin-bottom: 20px;
}
/deep/ .van-pull-refresh {
  width: 100%;
}
/deep/ .van-cell::after {
  border-bottom: none;
}
</style>

<template>
  <van-pull-refresh
    class="tf-list-refresh"
    v-model="refreshing"
    success-text="刷新成功"
    @refresh="onRefresh"
  >
    <slot v-if="!loading && listChild.length === 0" name="nodata">
      <div class="tf-text tf-text-grey tf-padding">暂无数据</div>
    </slot>
    <van-list
      class="tf-van-list"
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      loading-text="加载中"
      error-text="请求失败，请重新加载"
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
        })
          .then(({ data }) => {
            if (data && data.length > 0) {
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
          })
          .catch(() => {
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
    },
    reload () {
      this.onRefresh()
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
.tf-list-refresh {
  width: 100%;
  height: 100%;
  overflow: auto;
  text-align: center;
  padding: 20px;
}
.tf-van-list {
  // min-height: 100%;
  flex: 1;
  width: 100%;
  // overflow: auto;
  -webkit-transform: translateZ(0px);
}
.tf-van-cell {
  background: none;
  padding: 0;
  margin-bottom: 20px;
}
/deep/ .van-pull-refresh__track {
  @flex-column();
}
/deep/ .van-cell::after {
  border-bottom: none;
}
</style>

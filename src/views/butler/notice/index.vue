<template>
  <div class="tf-bg">
    <van-nav-bar
      title="公告通知"
      :right-text="isAllRead ? '' : '全部已读'"
      :fixed="true"
      left-arrow
      @click-left="goBack"
      @click-right="setNoticeReaded(0)"
    />
    <div class="tf-flex-item">
      <van-pull-refresh
        style="text-align: center"
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
          <van-cell class="tf-van-cell" v-for="(item, i) in noticeList" :key="i">
            <div class="list-item--time">{{item.ctime}}</div>
            <div class="tf-card" @click="jump(item)">
              <div class="tf-card-header" style="justify-content: flex-start;">
                <span v-if="item.is_readed === '1'" class="tf-readed-tag"></span>
                <span class="tf-card-header__title">{{item.title}}</span>
              </div>
              <div class="tf-card-content">
                <div class="van-multi-ellipsis--l2">{{item.content}}</div>
              </div>
            </div>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { NavBar, List, Cell, PullRefresh } from 'vant'
import { getNoticeList, setNoticeReaded } from '@/api/butler/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell
  },
  data () {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      isAllRead: false,
      noticeList: [
        {
          id: '1',
          title: '关于暴雨天气温馨提示',
          content:
            '福州市气象台于2020年06月05日08时40分发布暴福州市气象台于2020年06月05日08时40分发布暴福州市气象台于2020年06月05日08时40分发布暴',
          is_readed: '1',
          ctime: '2020-06-20 15:12:36'
        },
        {
          id: '2',
          title: '关于暴雨天气温馨提示2',
          content: '福州市气象台于2020年06月05日08时40分发布暴',
          is_readed: '0',
          ctime: '2020-06-21 15:12:36'
        }
      ]
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
        this.noticeList = []
        this.refreshing = false
      }
      setTimeout(() => {
        this.noticeList.push({
          id: '2',
          title: '关于暴雨天气温馨提示2',
          content:
            '福州市气象台于2020年06月05日08时40分发布暴福州市气象台于2020年06月05日08时40分发布暴福州市气象台于2020年06月05日08时40分发布暴',
          is_readed: '0',
          ctime: '2020-06-21 15:12:36'
        })
        this.loading = false
        this.refreshing = false
      }, 30000)
    },
    // 下拉刷新
    onRefresh () {
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    // 获取公告通知列表
    getNoticeList () {
      return getNoticeList({
        project_id: '1'
        // notice_id: '1'
      }).then((res) => {
        if (res.success) {
          this.noticeList = res.data.records
        }
      })
    },
    // 设置消息已读
    setNoticeReaded (noticeId) {
      setNoticeReaded({
        project_id: '1',
        noticeId
      }).then((res) => {
        if (res.success) {
        }
      })
    },
    // 跳转到详情页
    jump (item) {
      const url = `/pages/butler/notice/details?noticeId=${item.id}`
      this.setNoticeReaded(item.id)
      this.$router.push(url)
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.tf-bg {
  height: 100%;
}
.tf-flex-item {
  height: 100%;
  padding-top: 88px;
}
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
.list-item--time {
  font-size: 24px;
  text-align: center;
  color: @gray-7;
  margin: 0 @padding-md @padding-md;
}

.tf-readed-tag {
  margin-right: 8px;
}

.notice-title {
  flex: 1;
  font-size: 17px;
  text-align: center;
  font-weight: 500;
  // transform: translateX(16px);
}

.notice-list {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 20px;
  right: 20px;
}
/deep/ .van-pull-refresh {
  width: 100%;
}
</style>

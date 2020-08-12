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
      <refreshList :list.sync="noticeList" :load="getNoticeList">
        <template v-slot="{item}">
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
        </template>
      </refreshList>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import { getNoticeList, setNoticeReaded } from '@/api/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    refreshList
  },
  data () {
    return {
      loading: false,
      refreshing: false,
      isAllRead: false,
      noticeList: []
    }
  },
  created () {
  },
  methods: {
    // 获取公告通知列表
    getNoticeList (params) {
      return getNoticeList(params)
    },
    // 设置消息已读
    setNoticeReaded (noticeId) {
      setNoticeReaded({
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
  line-height: 1;
  color: @gray-7;
  margin: 20px @padding-md @padding-md;
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

.tf-card-header__title {
  flex: 1;
}
/deep/ .van-pull-refresh {
  width: 100%;
}
</style>

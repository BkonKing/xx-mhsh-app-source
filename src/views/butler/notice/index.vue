<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="公告通知"
      placeholder
      :right-text="isAllRead ? '' : '全部已读'"
      :fixed="true"
      left-arrow
      @click-left="goBack"
      @click-right="setNoticeReaded(0)"
    />
    <div class="tf-body-container">
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
      const url = `/pages/butler/notice/details?id=${item.id}`
      // this.setNoticeReaded(item.id)
      this.$router.push(url)
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.tf-van-list {
  padding: 20px;
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

.tf-card-header__title {
  flex: 1;
}
</style>

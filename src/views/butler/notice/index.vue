<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="公告通知"
      placeholder
      :right-text="isAllRead ? '' : '全部已读'"
      :fixed="true"
      left-arrow
      @click-left="goBack"
      @click-right="setNoticeReaded"
    />
    <div class="tf-body-container" id="notice-list-container">
      <refreshList :list.sync="noticeList" :load="getNoticeList">
        <template v-slot="{item}">
          <div class="list-item--time">{{item.ctime}}</div>
          <div class="tf-card" @click="jump(item)">
            <div class="tf-card-header" style="justify-content: flex-start;">
              <span v-if="item.is_readed == '0'" class="tf-readed-tag"></span>
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
  name: 'noticeIndex',
  components: {
    [NavBar.name]: NavBar,
    refreshList
  },
  data () {
    return {
      isAllRead: false,
      noticeList: [],
      scrollTop: 0
    }
  },
  created () {
  },
  activated () {
    if (this.scrollTop) {
      document.getElementById('notice-list-container').getElementsByClassName('tf-list-refresh')[0].scrollTop = this.scrollTop
    }
  },
  methods: {
    // 获取公告通知列表
    getNoticeList (params) {
      return getNoticeList(params)
    },
    // 设置消息全部已读
    setNoticeReaded () {
      setNoticeReaded().then((res) => {
        this.noticeList.forEach(obj => {
          obj.is_readed = 1
        })
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
  },
  beforeRouteLeave (to, from, next) {
    const el = document.getElementById('notice-list-container').getElementsByClassName('tf-list-refresh')
    this.scrollTop = (el[0] && el[0].scrollTop) || 0
    next()
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

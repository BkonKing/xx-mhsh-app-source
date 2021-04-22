<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="我的任务"
      :fixed="true"
      :border="false"
      left-arrow
      placeholder
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-time-circle"></span>
      </template>
    </van-nav-bar>
    <van-tabs
      class="tf-body-container tf-column"
      v-model="current"
      @change="tabsChange"
    >
      <van-tab title="我接单的" id="neighboursList0">
        <order-list></order-list>
      </van-tab>
      <van-tab title="我发布的" id="neighboursList1">
        <publish-list></publish-list>
      </van-tab>
      <van-tab title="我的投诉" id="neighboursList2">
        <complaint-list></complaint-list>
      </van-tab>
      <van-tab title="我的提问" id="neighboursList3">
        <question-list></question-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// /pages/task/personage/index
import OrderList from './components/order'
import PublishList from './components/publish'
import ComplaintList from './components/complaint'
import QuestionList from './components/question.vue'
import {
  getNewestList,
  getPostBarCategoryList,
  getActivityList,
  getArticleList,
  getPostBarList
} from '@/api/neighbours'
import { getNeighboursAgreement } from '@/api/home'
import { mapGetters } from 'vuex'

export default {
  name: 'neighbours',
  components: {
    OrderList,
    PublishList,
    ComplaintList,
    QuestionList
  },
  data () {
    return {
      current: 0,
      isAll: 1,
      showIsAll: false,
      group: [],
      newestList: [],
      activityList: [],
      articleList: [],
      taskList: [],
      agreementDialog: false,
      agreementTitle: '',
      scrollTop: 0,
      postBarList: [],
      categoryId: '',
      groupDropdown: false,
      taskId: '',
      taskDropdown: false,
      taskTypes: []
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    // 首次进入页面需弹窗一次邻里协议
    const firstStatus = api.getPrefs({
      sync: true,
      key: 'first-neighbours'
    })
    if (!firstStatus) {
      this.getNeighboursAgreement()
      this.agreementDialog = true
      api.setPrefs({
        key: 'first-neighbours',
        value: 1
      })
    }
    this.getPostBarCategoryList()
    this.getTaskTypes()
  },
  activated () {
    if (this.scrollTop && this.current !== 1) {
      document
        .getElementById(`neighboursList${this.current}`)
        .getElementsByClassName(
          'tf-list-refresh'
        )[0].scrollTop = this.scrollTop
    }
  },
  methods: {
    // 切换全部/小区筛选
    switchIsAll (value) {
      this.isAll = value
      this.showIsAll = false
    },
    // 发布
    goEdit () {
      this.$router.push('/pages/neighbours/publish')
    },
    // 跳转消息
    goMessage () {
      this.$router.push('/pages/personage/message/index')
    },
    // 获取最新列表
    getNewestList (params) {
      params.is_all = this.isAll
      return getNewestList(params)
    },
    // tab页改变，为最新标签时刷新最新列表
    tabsChange (name) {
      if (name === 0) {
        this.$refs.list && this.$refs.list.reload()
      }
    },
    // 获取话题小组
    getPostBarCategoryList () {
      getPostBarCategoryList().then(res => {
        this.group = [
          {
            category: '全部',
            id: ''
          },
          ...res.data
        ]
      })
    },
    // 筛选小组
    getFilterGroup ({ id }) {
      this.categoryId = id
      this.$refs.postBarList.reload()
    },
    // 获取帖子列表
    getPostBarList (params) {
      params.is_all = this.isAll
      params.categoryId = this.categoryId
      return getPostBarList(params)
    },
    // 获取活动列表
    getActivityList (params) {
      params.is_all = this.isAll
      return getActivityList(params)
    },
    // 获取资讯列表
    getArticleList (params) {
      params.is_all = this.isAll
      return getArticleList(params)
    },
    // 获取任务类型
    getTaskTypes () {
      getPostBarCategoryList().then(res => {
        this.taskTypes = [
          {
            category: '全部',
            id: ''
          },
          ...res.data
        ]
      })
    },
    // 筛选任务类型
    getFilterTasks ({ id }) {
      this.taskId = id
      this.$refs.taskList.reload()
    },
    // 获取任务列表
    getTaskList (params) {
      params.is_all = this.isAll
      params.taskId = this.taskId
      return getArticleList(params)
    },
    // 邻里使用协议
    getNeighboursAgreement () {
      getNeighboursAgreement().then(({ data }) => {
        this.agreementTitle = data.title
      })
    }
  },
  watch: {
    isAll (value) {
      this.$refs.list && this.$refs.list.reload()
      this.$refs.activityList && this.$refs.activityList.reload()
      this.$refs.articleList && this.$refs.articleList.reload()
      this.$refs.postBarList && this.$refs.postBarList.reload()
      this.$refs.taskList && this.$refs.taskList.reload()
    }
  },
  beforeRouteEnter (to, from, next) {
    const { active } = to.query
    next(vm => {
      if (active && active !== vm.current) {
        vm.scrollTop = 0
        vm.current = parseInt(active)
        vm.$router.push('/neighbours')
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    if (this.current !== 1) {
      const el = document
        .getElementById(`neighboursList${this.current}`)
        .getElementsByClassName('tf-list-refresh')
      this.scrollTop = (el.length && el[0].scrollTop) || 0
    }
    next()
  }
}
</script>

<style lang="less" scoped>
// 页面
.tf-bg {
  @flex-column();
  background: #f7f7f7;
}
.main-container {
  flex: 1;
  padding: 20px 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
// 头部占位符
.header-placeholder {
  height: 22px;
  background: #fff;
}
// 头部
/deep/ .van-nav-bar__text {
  font-size: 40px;
  font-weight: bold;
  display: flex;
  align-items: center;
}
/deep/ .van-nav-bar__left:active {
  opacity: 1;
}
/deep/ .van-nav-bar__right {
  padding-right: 28px;
}
.header-message {
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  padding: 0 11px;
  .message-icon {
    width: 48px;
    height: 48px;
  }
  // 消息数
  .van-info {
    top: 24px;
    right: 22px;
  }
}
// 筛选全部/小区
.header-select {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 107px;
  height: 40px;
  margin-left: 16px;
  background: #f7f7f7;
  border-radius: 20px;
  &-text {
    font-size: 24px;
    color: #8f8f94;
  }
  .header-select-icon {
    width: 12px;
    height: 8px;
    margin-left: 10px;
  }
  .header-select-icon-flip {
    transform: rotateX(180deg);
  }
}
// 筛选弹窗
.isAll-select {
  position: absolute;
  top: 153px;
  left: 192px;
  z-index: 1000;
  padding: 0 20px;
  width: 200px;
  background: #ffffff;
  box-shadow: 1px 4px 12px 0px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  .isAll-select__item {
    height: 90px;
    line-height: 90px;
    text-align: center;
    font-size: 30px;
    color: #8f8f94;
  }
  .isAll-select__item + .isAll-select__item {
    border-top: 1px solid #f0f0f0;
  }
  .active {
    font-weight: 600;
    color: #222222;
  }
}
// 筛选弹窗遮罩
.mask-box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  opacity: 0;
  z-index: 999;
}
// tabs
/deep/ .van-tabs {
  .van-tab__text {
    color: #000000cc;
  }
  .van-tab--active .van-tab__text {
    font-size: 32px;
    font-weight: 600;
    color: #000000;
  }
  .van-tabs__line {
    width: 40px !important;
    height: 6px;
    left: -2px;
    background: #ff6555;
    border-radius: 3px;
  }
  .van-tabs__content {
    flex: 1;
    max-height: calc(100% - 98px);
    .van-tab__pane {
      height: 100%;
    }
  }
}
// 小组
.group-open-box {
  /deep/ .select-dropdown {
    .group-box {
      position: absolute;
      top: 98px;
      z-index: 4;
      height: auto;
      padding-bottom: 0;
      animation-duration: 0.2s;
    }
    .group-container {
      flex-wrap: wrap;
    }
    .group-item {
      margin-bottom: 30px;
    }
    .group-dropdown {
      margin-left: 0;
    }
    .group-open-overlay {
      position: absolute;
      top: 198px;
      left: 0;
      bottom: 0;
      z-index: 3;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      animation-duration: 0.2s;
    }
  }
  .postBarList,
  .taskList {
    padding-top: 124px;
  }
}
.postBarList,
.taskList {
  height: calc(100% - 124px) !important;
}
// 发布按钮
.publish-btn {
  position: fixed;
  right: 40px;
  bottom: 128px;
  width: 108px;
  height: 108px;
  .publish-img {
    width: 100%;
    height: 100%;
  }
}
</style>

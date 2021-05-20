<template>
  <div class="tf-bg tf-body">
    <div class="header-placeholder"></div>
    <van-nav-bar :border="false" :fixed="true" placeholder :left-arrow="false">
      <template #left>
        <span class="van-nav-bar__text">和谐邻里</span>
        <!-- 筛选全部/小区 -->
        <span
          class="header-select"
          v-if="userInfo.user_type !== '0'"
          @click.stop="showIsAll = true"
        >
          <span class="header-select-text">{{ isAll ? "全部" : "小区" }}</span>
          <img
            class="header-select-icon"
            :class="{ 'header-select-icon-flip': showIsAll }"
            src="@/assets/neighbours/open.png"
          />
        </span>
      </template>
      <template #right>
        <div class="header-message" @click="goMessage">
          <img
            class="message-icon"
            src="@/assets/neighbours/message.png"
            alt=""
          />
          <span v-if="userInfo.message_mum != 0" class="van-info">{{
            userInfo.message_mum
          }}</span>
        </div>
      </template>
    </van-nav-bar>
    <div
      v-show="showIsAll"
      class="mask-box"
      @click.stop="showIsAll = false"
    ></div>
    <div v-show="showIsAll" class="isAll-select">
      <div
        class="isAll-select__item"
        :class="{ active: isAll === 1 }"
        @click.stop="switchIsAll(1)"
      >
        全部
      </div>
      <div
        class="isAll-select__item"
        :class="{ active: isAll === 0 }"
        @click.stop="switchIsAll(0)"
      >
        小区
      </div>
    </div>
    <van-tabs
      class="tf-body-container tf-column"
      :class="{ 'tabs-5': isOpeningTask }"
      v-model="current"
      @change="tabsChange"
    >
      <van-tab title="最新" id="neighboursList0">
        <list
          v-if="isLocation"
          key="list"
          ref="list"
          :data.sync="newestList"
          :load="getNewestList"
        ></list>
      </van-tab>
      <van-tab
        title="小组"
        id="neighboursList1"
        :class="{ 'group-open-box': groupDropdown }"
      >
        <select-dropdown
          ref="groupDropdown"
          v-model="categoryId"
          :visible.sync="groupDropdown"
          :group="group"
          @change="getFilterGroup"
        ></select-dropdown>
        <list
          class="postBarList"
          key="postBarList"
          ref="postBarList"
          :data.sync="postBarList"
          :load="getPostBarList"
        ></list>
      </van-tab>
      <van-tab title="活动" id="neighboursList2">
        <list
          key="activityList"
          ref="activityList"
          :data.sync="activityList"
          :load="getActivityList"
        ></list>
      </van-tab>
      <van-tab title="资讯" id="neighboursList3">
        <list
          key="articleList"
          ref="articleList"
          :data.sync="articleList"
          :load="getArticleList"
        ></list>
      </van-tab>
      <van-tab
        v-if="isOpeningTask"
        ref="taskDropdown"
        title="任务"
        id="neighboursList4"
        :class="[{ 'group-open-box': taskDropdown }]"
      >
        <select-dropdown
          v-model="taskId"
          :visible.sync="taskDropdown"
          :group="taskTypes"
          label="type_name"
          @change="getFilterTasks"
        ></select-dropdown>
        <list
          key="taskList"
          ref="taskList"
          class="taskList"
          :data.sync="taskList"
          :load="getTaskList"
          article_type="6"
        ></list>
      </van-tab>
    </van-tabs>
    <div class="publish-btn" @click="goEdit">
      <img class="publish-img" src="@/assets/neighbours/publish.png" />
    </div>
    <tf-dialog
      class="explain-dialog"
      v-model="agreementDialog"
      title="邻里使用协议"
      :showFotter="true"
      :hiddenOff="true"
      okText="我知道了"
      @confirm="agreementDialog = false"
    >
      <div class="dialog-content">
        <div class="tf-text-sm" style="text-indent: 24px;line-height: 1.8;">
          您在使用邻里服务前，请认真阅读并充分理解相关法律条款、平台规则及用户隐私政策。当您开始使用产品或服务，即表示您已经理解并同意该协议，该协议将构成对您具有法律约束力的法律文件。
        </div>
        <div class="tf-text-sm" style="text-indent: 24px;line-height: 1.8;">
          使用邻里请阅读
          <router-link class="tf-text-blue" to="/agreement?type=2"
            >《{{ agreementTitle }}》</router-link
          >。
        </div>
      </div>
    </tf-dialog>
  </div>
</template>

<script>
import list from './components/list'
import {
  getNewestList,
  getPostBarCategoryList,
  getActivityList,
  getArticleList,
  getPostBarList
} from '@/api/neighbours'
import { getNeighboursAgreement } from '@/api/home'
import { getTaskSwitch, getTaskList, getTaskTypeList } from '@/api/task'
import tfDialog from '@/components/tf-dialog/index'
import selectDropdown from '@/views/neighbours/components/selectDropdown'
import { mapGetters } from 'vuex'
import { bMapGetLocationInfo } from '@/utils/util'

export default {
  name: 'neighbours',
  components: {
    list,
    tfDialog,
    selectDropdown
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
      taskTypes: [],
      isOpeningTask: false, // 是否开启任务模块
      province: '', // 省
      city: '', // 市
      area: '', // 县
      isLocation: false
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
    this.getLocationInfo().finally(() => {
      this.isLocation = true
    })
    this.getPostBarCategoryList()
    this.getTaskSwitch()
  },
  activated () {
    if (this.scrollTop && this.current !== 1) {
      document
        .getElementById(`neighboursList${this.current}`)
        .getElementsByClassName(
          'tf-list-refresh'
        )[0].scrollTop = this.scrollTop
    }
    this.$refs.groupDropdown && this.$refs.groupDropdown.scrollCenter()
    this.$refs.taskDropdown && this.$refs.taskDropdown.scrollCenter()
    this.getPostBarCategoryList()
    this.getTaskSwitch()
  },
  methods: {
    // 切换全部/小区筛选
    switchIsAll (value) {
      this.isAll = value
      this.showIsAll = false
    },
    // 发布
    goEdit () {
      this.$router.push({ name: 'releaseType' })
    },
    // 跳转消息
    goMessage () {
      this.$router.push('/pages/personage/message/index')
    },
    // 获取最新列表
    getNewestList (params) {
      params.province = this.province
      params.city = this.city
      params.area = this.area
      params.is_all = this.isAll
      return getNewestList(params)
    },
    // tab页改变，为最新标签时刷新最新列表
    tabsChange (name) {
      if (name === 0) {
        this.$refs.list && this.$refs.list.reload()
      } else if (name === 1) {
        this.$refs.groupDropdown && this.$refs.groupDropdown.scrollCenter()
      } else if (name === 4) {
        this.$refs.taskDropdown && this.$refs.taskDropdown.scrollCenter()
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
    // 获取任务开关
    getTaskSwitch () {
      getTaskSwitch().then(({ alluser_open }) => {
        this.isOpeningTask = +alluser_open
        if (this.isOpeningTask) {
          this.getTaskTypeList()
        }
      })
    },
    // 获取任务列表
    getTaskList (params) {
      // params.is_all = this.isAll
      params.task_type = this.taskId
      params.province = this.province
      params.city = this.city
      params.area = this.area
      return getTaskList(params)
    },
    // 获取任务类型
    getTaskTypeList () {
      getTaskTypeList().then(({ data }) => {
        this.taskTypes = [
          {
            type_name: '全部',
            id: ''
          },
          ...data
        ]
      })
    },
    // 筛选任务类型
    getFilterTasks ({ id }) {
      this.taskId = id
      this.$refs.taskList.reload()
    },
    // 邻里使用协议
    getNeighboursAgreement () {
      getNeighboursAgreement().then(({ data }) => {
        this.agreementTitle = data.title
      })
    },
    // 获取当前地址信息
    getLocationInfo () {
      // adCode:行政区编码
      return bMapGetLocationInfo().then(data => {
        const { province, city, district } = data
        this.province = province
        this.city = city
        this.area = district
        this.$refs.list && this.$refs.list.reload()
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
      width: 100%;
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
.tabs-5 /deep/ .van-tab {
  flex-basis: 20% !important;
}
</style>

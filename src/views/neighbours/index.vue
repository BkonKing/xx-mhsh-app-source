<template>
  <div class="tf-bg tf-body">
    <van-nav-bar :border="false" :fixed="true" placeholder :left-arrow="false">
      <template #left>
        <span v-if="userInfo.user_type === '0'" class="van-nav-bar__text">和谐邻里</span>
        <span v-else class="van-nav-bar__text" @click.stop="showIsAll = true">
          和谐邻里
          <span
            class="tf-icon"
            :class="[showIsAll ? 'tf-icon-caret-up' : 'tf-icon-caret-down']"
          ></span>
        </span>
      </template>
      <template #right>
        <span class="tf-icon tf-icon-bianxie" @click="goEdit"></span>
        <span class="tf-icon tf-icon-xiaoxi" @click="goMessage">
          <span v-if="userInfo.message_mum != 0" class="van-info">{{userInfo.message_mum}}</span>
        </span>
      </template>
    </van-nav-bar>
    <div v-show="showIsAll" class="mask-box" @click.stop="showIsAll =false"></div>
    <div v-show="showIsAll" class="isAll-select">
      <div
        class="isAll-select__item"
        :class="{'active': isAll === 1}"
        @click.stop="isAll = 1;showIsAll =false"
      >全部</div>
      <div
        class="isAll-select__item"
        :class="{'active': isAll === 0}"
        @click.stop="isAll = 0;showIsAll =false"
      >小区</div>
    </div>
    <van-tabs class="tf-body-container tf-column" v-model="current" @change="tabsChange">
      <van-tab title="最新" id="neighboursList0">
        <list key="list" ref="list" :data.sync="newestList" :load="getNewestList"></list>
      </van-tab>
      <van-tab title="小组" id="neighboursList1">
        <div v-if="group.length" class="group-box">
          <div class="group-item" v-for="item in group" :key="item.id" @click="goGroupList(item)">
            <img class="group-img" :src="item.icon_images" />
            <div class="group-shade"></div>
            <div class="group-name">{{item.category}}</div>
          </div>
        </div>
        <div v-else class="van-list__finished-text">没有更多了</div>
      </van-tab>
      <van-tab title="活动" id="neighboursList2">
        <list
          key="activityList"
          ref="activityList"
          :data.sync="activityList"
          :load="getActivityList"
          article_type="2"
        ></list>
      </van-tab>
      <van-tab title="资讯" id="neighboursList3">
        <list
          key="articleList"
          ref="articleList"
          :data.sync="articleList"
          :load="getArticleList"
          article_type="1"
        ></list>
      </van-tab>
    </van-tabs>
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
        <div
          class="tf-text-sm"
          style="text-indent: 24px;line-height: 1.8;"
        >您在使用邻里服务前，请认真阅读并充分理解相关法律条款、平台规则及用户隐私政策。当您开始使用产品或服务，即表示您已经理解并同意该协议，该协议将构成对您具有法律约束力的法律文件。</div>
        <div class="tf-text-sm" style="text-indent: 24px;line-height: 1.8;">
          使用邻里请阅读
          <router-link class="tf-text-blue" to="/agreement?type=2">《{{agreementTitle}}》</router-link>。
        </div>
      </div>
    </tf-dialog>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs, Popup } from 'vant'
import list from './components/list'
import {
  getNewestList,
  getPostBarCategoryList,
  getActivityList,
  getArticleList
} from '@/api/neighbours'
import { getNeighboursAgreement } from '@/api/home'
import tfDialog from '@/components/tf-dialog/index.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'neighbours',
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Popup.name]: Popup,
    list,
    tfDialog
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
      agreementDialog: false,
      agreementTitle: '',
      scrollTop: 0
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
  },
  activated () {
    if (this.scrollTop && this.current !== 1) {
      document.getElementById(`neighboursList${this.current}`).getElementsByClassName('tf-list-refresh')[0].scrollTop = this.scrollTop
    }
  },
  methods: {
    /* 发布 */
    goEdit () {
      this.$router.push('/pages/neighbours/publish')
    },
    /* 跳转消息 */
    goMessage () {
      this.$router.push('/pages/personage/message/index')
    },
    /* 跳转小组列表 */
    goGroupList ({ id, category }) {
      this.$router.push({
        path: '/pages/neighbours/groupList',
        query: {
          categoryId: id,
          category,
          isAll: this.isAll
        }
      })
    },
    /* 获取最新列表 */
    getNewestList (params) {
      params.is_all = this.isAll
      return getNewestList(params)
    },
    /* tab页改变，为最新标签时刷新最新列表 */
    tabsChange (name) {
      if (name === 0) {
        this.$refs.list && this.$refs.list.reload()
      }
    },
    /* 获取话题小组 */
    getPostBarCategoryList () {
      getPostBarCategoryList().then((res) => {
        this.group = res.data
      })
    },
    /* 获取活动列表 */
    getActivityList (params) {
      params.is_all = this.isAll
      return getActivityList(params)
    },
    /* 获取资讯列表 */
    getArticleList (params) {
      params.is_all = this.isAll
      return getArticleList(params)
    },
    /* 邻里使用协议 */
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
    }
  },
  beforeRouteEnter (to, from, next) {
    const { active } = to.query
    next((vm) => {
      if (active && active !== vm.current) {
        vm.scrollTop = 0
        vm.current = parseInt(active)
        vm.$router.push('/neighbours')
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    if (this.current !== 1) {
      const el = document.getElementById(`neighboursList${this.current}`).getElementsByClassName('tf-list-refresh')
      this.scrollTop = (el.length && el[0].scrollTop) || 0
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.isAll-select {
  position: absolute;
  top: 84px;
  left: 84px;
  z-index: 1000;
  padding: 0 20px;
  width: 200px;
  background: #ffffff;
  box-shadow: 1px 4px 12px 0px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  .isAll-select__item {
    height: 89px;
    line-height: 89px;
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
.mask-box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
  opacity: 0.3;
  z-index: 999;
}
/deep/ .van-nav-bar__left:active {
  opacity: 1;
}

/deep/ .van-nav-bar__right {
  padding-right: 0;
}

.van-info {
  top: 24px;
  right: 22px;
}

.pt88 {
  padding-top: 88px;
}
.tf-icon-xiaoxi {
  @relative();
}
.tf-bg {
  @flex-column();
}
.main-container {
  flex: 1;
  padding: 20px 0;
  overflow: auto;
}
/deep/ .van-nav-bar__text {
  font-size: 34px;
  font-weight: bold;
  display: flex;
  align-items: center;
  .tf-icon {
    margin-left: 10px;
  }
}
/deep/ .van-tabs__content {
  flex: 1;
  max-height: calc(100% - 98px);
  .van-tab__pane {
    height: 100%;
  }
}
.van-list__finished-text {
  padding-top: 20px;
}
/* 小组 */
.group-box {
  @flex();
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px 30px;
  .group-item {
    position: relative;
    width: 335px;
    height: 168px;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  .group-img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .group-shade {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.6);
  }
  .group-name {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    font-size: @font-size-md;
    font-weight: 500;
    line-height: 168px;
    text-align: center;
    color: #fff;
  }
}
/deep/ .complain-dialog {
  bottom: 98px;
}
</style>

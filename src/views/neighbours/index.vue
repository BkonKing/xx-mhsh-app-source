<template>
  <div class="tf-bg tf-body">
    <van-nav-bar :border="false" :fixed="true" placeholder :left-arrow="false">
      <template #left>
        <span v-if="userInfo.user_type === '0'" class="van-nav-bar__text">和谐邻里</span>
        <span v-else class="van-nav-bar__text" @click.stop="showIsAll = true">
          和谐邻里
          <span class="tf-icon" :class="[showIsAll ? 'tf-icon-caret-up' : 'tf-icon-caret-down']"></span>
        </span>
      </template>
      <template #right>
        <span class="tf-icon tf-icon-bianxie" @click="goEdit"></span>
        <span class="tf-icon tf-icon-xiaoxi" @click="goMessage">
          <span v-if="status" class="van-info">2</span>
        </span>
      </template>
    </van-nav-bar>
    <div v-show="showIsAll" class="mask-box" @click.stop="showIsAll =false"></div>
    <div v-show="showIsAll" class="isAll-select">
      <div class="isAll-select__item" :class="{'active': isAll === 1}" @click.stop="isAll = 1;showIsAll =false">全部</div>
      <div class="isAll-select__item" :class="{'active': isAll === 0}" @click.stop="isAll = 0;showIsAll =false">小区</div>
    </div>
    <van-tabs class="tf-body-container tf-column" v-model="current">
      <van-tab title="最新">
        <list key="list" ref="list" :data.sync="newestList" :load="getNewestList"></list>
      </van-tab>
      <van-tab title="小组">
        <div v-if="group.length" class="group-box">
          <div class="group-item" v-for="item in group" :key="item.id" @click="goGroupList(item)">
            <img class="group-img" :src="item.icon_images" />
            <div class="group-name">{{item.category}}</div>
          </div>
        </div>
        <div v-else class="van-list__finished-text">没有更多了</div>
      </van-tab>
      <van-tab title="活动">
        <list key="activityList" ref="activityList" :data.sync="activityList" :load="getActivityList" article_type="2"></list>
      </van-tab>
      <van-tab title="资讯">
        <list key="articleList" ref="articleList" :data.sync="articleList" :load="getArticleList" article_type="1"></list>
      </van-tab>
    </van-tabs>
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
import { mapGetters } from 'vuex'

export default {
  name: 'neighbours',
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Popup.name]: Popup,
    list
  },
  data () {
    return {
      status: 1,
      current: 0,
      isAll: 1,
      showIsAll: false,
      group: [],
      newestList: [],
      activityList: [],
      articleList: []
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    const { active } = this.$route.query
    if (active) {
      this.current = parseInt(active)
    }
    this.getPostBarCategoryList()
  },
  activated () {},
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
          category
        }
      })
    },
    /* 获取最新列表 */
    getNewestList (params) {
      params.is_all = this.isAll
      return getNewestList(params)
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
    }
  },
  watch: {
    $route (route) {
      const { active } = route.query
      if (active && active !== this.current) {
        this.current = parseInt(active)
      }
    },
    isAll (value) {
      this.$refs.list && this.$refs.list.reload()
      this.$refs.activityList && this.$refs.activityList.reload()
      this.$refs.articleList && this.$refs.articleList.reload()
    }
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
.pt88 {
  padding-top: 88px;
}
.tf-icon-xiaoxi {
  @relative();
  margin-right: 27px;
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
    background: rgba(0, 0, 0, 0.6);
    margin-bottom: 20px;
  }
  .group-img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .group-name {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: @font-size-md;
    font-weight: 500;
    line-height: 168px;
    text-align: center;
    color: #fff;
  }
}
</style>

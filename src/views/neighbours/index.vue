<template>
  <div class="tf-bg">
    <van-nav-bar :border="false" :fixed="true" left-text="和谐邻里" :left-arrow="false">
      <template #right>
        <span class="tf-icon tf-icon-edit" @click="goEdit"></span>
        <span class="tf-icon tf-icon-mail" @click="goMessage">
          <span v-if="status" class="van-info">2</span>
        </span>
      </template>
    </van-nav-bar>
    <van-tabs class="pt88" v-model="current" @click="onClickItem">
      <van-tab title="最新">
        <list key="list" :data.sync="newestList" :load="getNewestList"></list>
      </van-tab>
      <van-tab title="小组">
        <div class="group-box">
          <div class="group-item" v-for="item in group" :key="item.id" @click="goGroupList(item)">
            <img class="group-img" :src="item.icon_images" />
            <div class="group-name">{{item.category}}</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="活动">
        <list key="activityList" :data.sync="activityList" :load="getActivityList" :category="1"></list>
      </van-tab>
      <van-tab title="资讯">
        <list key="articleList" :data.sync="articleList" :load="getArticleList" :category="3"></list>
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
      group: [],
      newestList: [],
      activityList: [],
      articleList: []
    }
  },
  created () {
    const { active } = this.$route.query
    if (active) {
      this.current = parseInt(active)
    }
    this.getList()
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
    /* tab切换 */
    onClickItem (currentIndex) {
      if (this.current !== currentIndex) {
        this.current = currentIndex
      }
      this.getList()
    },
    /* 获取相应列表 */
    getList () {
      switch (this.current) {
        case 0:
          this.getNewestList()
          break
        case 1:
          this.getPostBarCategoryList()
          break
        case 2:
          this.getActivityList()
          break
        case 3:
          this.getArticleList()
          break
      }
    },
    /* 获取最新列表 */
    getNewestList () {
      return getNewestList()
    },
    /* 获取话题小组 */
    getPostBarCategoryList () {
      getPostBarCategoryList().then((res) => {
        this.group = res.data
      })
    },
    /* 获取活动列表 */
    getActivityList () {
      return getActivityList()
    },
    /* 获取资讯列表 */
    getArticleList () {
      return getArticleList()
    }
  },
  watch: {
    $route (route) {
      const { active } = route.query
      if (active !== this.current) {
        this.current = parseInt(active)
        this.getList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pt88 {
  padding-top: 88px;
}
.tf-icon-mail {
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

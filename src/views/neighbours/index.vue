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
      <van-tab v-for="(item, i) in items" :key="i" :title="item"></van-tab>
    </van-tabs>
    <div class="main-container">
      <list v-show="current === 0"></list>
      <div class="group-box" v-show="current === 1">
        <div class="group-item" v-for="item in group" :key="item.id">
          <img class="group-img" :src="item.icon_images" />
          <div class="group-name">{{item.category}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs, Popup } from 'vant'
import list from './components/list'

export default {
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
      items: ['最新', '小组', '活动', '资讯'],
      current: 0,
      group: [
        {
          id: '1',
          category: '爱分享',
          icon_images:
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg'
        },
        {
          id: '2',
          category: '爱分享',
          icon_images:
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg'
        },
        {
          id: '3',
          category: '爱分享',
          icon_images:
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg'
        }
      ]
    }
  },
  methods: {
    goEdit () {
      this.$router.push('/pages/neighbours/publish')
    },
    goMessage () {
      this.$router.push('/pages/personage/message/index')
    },
    onClickItem (currentIndex) {
      if (this.current !== currentIndex) {
        this.current = currentIndex
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
  padding: 10px 30px;
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

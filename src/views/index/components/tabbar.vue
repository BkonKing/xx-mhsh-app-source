<template>
  <van-tabbar v-model="active" @change="onChange" route placeholder safe-area-inset-bottom>
    <van-tabbar-item to="/" replace>
      <template #icon="props">
        <img v-if="props.active" src="@/assets/imgs/tab_home_active.png" />
        <img v-else src="@/assets/imgs/tab_home.png" />
      </template>
      首页
    </van-tabbar-item>
    <van-tabbar-item to="/life" replace>
      <template #icon="props">
        <img v-if="props.active" src="@/assets/imgs/tab_life_active.png" />
        <img v-else src="@/assets/imgs/tab_life.png" />
      </template>
      生活
    </van-tabbar-item>
    <van-tabbar-item to="/butler" replace>
      <template #icon="props">
        <img v-if="props.active" src="@/assets/imgs/tab_butler_active.png" />
        <img v-else src="@/assets/imgs/tab_butler.png" />
      </template>
      管家
    </van-tabbar-item>
    <van-tabbar-item to="/neighbours" replace>
      <template #icon="props">
        <img v-if="props.active" src="@/assets/imgs/tab_neighbours_active.png" />
        <img v-else src="@/assets/imgs/tab_neighbours.png" />
      </template>
      邻里
    </van-tabbar-item>
    <van-tabbar-item to="/personage" replace>
      <template #icon="props">
        <img v-if="props.active" src="@/assets/imgs/tab_personage_active.png" />
        <img v-else src="@/assets/imgs/tab_personage.png" />
      </template>
      我的
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'

export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  props: {
    // tabList: {
    //   /**
    //    * @description: tabItem字段
    //    * @param {title} 标题
    //    * @param {path} 路由路径
    //    * @param {icon} 图标
    //    * @param {icon_press} 选中图片
    //    * @Date: 2019-03-06 15:41:27
    //    */
    //   type: Array,
    //   default () {
    //     return []
    //   },
    //   required: true
    // }
  },
  data () {
    return {
      active: 0,
      tabList: [
        {
          title: '首页',
          path: '/',
          icon: '@/assests/imgs/login_logo.png'
        },
        {
          title: '生活',
          path: '/life',
          icon:
            'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1048926945,1586672807&fm=26&gp=0.jpg'
        },
        {
          title: '管家',
          path: '/butler',
          icon:
            'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1048926945,1586672807&fm=26&gp=0.jpg'
        },
        {
          title: '邻里',
          path: '/neighbours',
          icon:
            'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1048926945,1586672807&fm=26&gp=0.jpg'
        },
        {
          title: '我的',
          path: '/personage',
          icon:
            'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1048926945,1586672807&fm=26&gp=0.jpg'
        }
      ]
    }
  },
  created () {
    this.active = this.tabList.findIndex(
      (item) => item.path === this.$route.path
    )
    // window.addEventListener('popstate', () => {
    //   this.active = this.tabList.findIndex(
    //     item => item.path === this.$route.path
    //   )
    // })
  },
  methods: {
    onChange (value) {
      // console.log(value)
    }
  },
  watch: {
    $route (route) {
      this.active = this.tabList.findIndex((item) => item.path === route.path)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-tabbar--fixed {
  bottom: auto;
  border-top: 1px solid #e5e5e5;
}
</style>

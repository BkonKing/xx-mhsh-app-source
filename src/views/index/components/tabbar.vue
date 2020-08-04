<template>
  <van-tabbar v-model="active" @change="onChange" route>
    <van-tabbar-item
      v-for="(item, index) in tabList"
      :key="index"
      :icon="item.icon"
      :to="item.path"
      replace
    >
      <!-- <span>{{item.title}}</span>
      <template #icon="props">
        <img :src="props.active ? icon.active : icon.inactive" />
      </template>-->
      {{item.title}}
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
    tabList: {
      /**
       * @description: tabItem字段
       * @param {title} 标题
       * @param {path} 路由路径
       * @param {icon} 图标
       * @param {icon_press} 选中图片
       * @Date: 2019-03-06 15:41:27
       */
      type: Array,
      default () {
        return []
      },
      required: true
    }
  },
  data () {
    return {
      active: 0
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
      this.active = this.tabList.findIndex(
        (item) => item.path === route.path
      )
    }
  }
}
</script>

<style lang="less" scoped>
</style>

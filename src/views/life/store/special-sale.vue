<template>
  <div class="app-body special-body">
    <div class="order-bar bar-white">
      <van-nav-bar
        title="特卖"
        :fixed="true"
        :border="false"
        placeholder
        left-arrow
        @click-left="$router.go(-1)"
      ></van-nav-bar>
    </div>
    <div class="special-nav-box">
      <div class="special-nav">
        <scrollBar direction="x" :activeIndex="activeIndex">
          <div
            class="scroll-barItem"
            v-for="(item, index) in navList"
            :key="index"
            @click="changeNav(item, index)"
            :class="index === activeIndex ? 'active' : null"
          >
            <div>{{item.bargain_name}}</div>
          </div>
        </scrollBar>
      </div>
    </div>
    <div id="scroll-body" class="scroll-body">
      <special-page
        ref="special"
        :bargain_id="bargain_id"
      ></special-page>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import scrollBar from '@/components/scroll-bar'
import { getSaleNav } from '@/api/life.js'
import specialPage from './../components/special-page'
export default {
  name: 'specialSale',
  components: {
    [NavBar.name]: NavBar,
    scrollBar,
    specialPage
  },
  data () {
    return {
      activeIndex: 0, // 菜单选中项
      navList: [], // 菜单
      bargain_id: ''
    }
  },
  created () {
    this.getData()
  },
  activated () {
    if (this.scrollTop) {
      document.getElementById('scroll-body').scrollTop = this.scrollTop
    }
  },
  methods: {
    changeNav (item, index) {
      this.activeIndex = index
      this.bargain_id = this.navList[index].id
      this.$nextTick(() => {
        this.$refs.special.listInit()
      })
    },
    getData () {
      getSaleNav().then(res => {
        if (res.success) {
          this.navList = res.data
          this.bargain_id = res.data[0].id
        }
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    console.log(to.name)
    if (to.name == 'life' || to.name == 'home') {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    const el = document.getElementById('scroll-body')
    this.scrollTop = (el && el.scrollTop) || 0
    next()
  }
}
</script>
<style scoped  src="../../../styles/life.css"></style>
<style scoped>
.scroll-body {
  height: calc(100% - 186px);
  overflow-y: auto;
  position: relative;
}
.app-body {
  background-color: #f2f2f4;
  font-size: 28px;
}

.special-nav-box {
  height: 98px;
}
.special-nav {
  height: 98px;
  background-color: #fff;
  padding: 0 30px;
  position: fixed;
  left: 0;
  right: 0;
  top: auto;
}
.scroll-barItem {
  font-size: 30px;
  display: inline-block;
}
.scroll-barItem div {
  height: 98px;
  line-height: 98px;
  padding: 0 30px;
  color: #8f8f94;
  position: relative;
}
.scroll-barItem.active div {
  color: #222;
  font-size: 34px;
  font-weight: bold;
}
.scroll-barItem.active div:after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  margin-left: -33px;
  width: 66px;
  height: 4px;
  border-radius: 2px;
  background-color: #eb5841;
}
</style>

<template>
  <div class="tf-bg tf-body">
    <van-nav-bar title="我的报事报修" :fixed="true" placeholder left-arrow @click-left="$router.go(-1)" />
    <div class="tf-body-container">
      <list id="repairs-list"></list>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import list from './components/list'

export default {
  name: 'repairsList',
  components: {
    [NavBar.name]: NavBar,
    list
  },
  data () {
    return {
      scrollTop: 0
    }
  },
  activated () {
    if (this.scrollTop) {
      document.getElementById('repairs-list').scrollTop = this.scrollTop
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'repairsDetails') {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    } else {
      const el = document.getElementById('repairs-list')
      this.scrollTop = (el && el.scrollTop) || 0
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.list-item--time {
  font-size: 24px;
  text-align: center;
  color: @gray-7;
  margin-top: @padding-md;
  margin-bottom: @padding-md;
}

.tf-card-header__title {
  width: 550px;
}

.tf-card-content {
  color: @text-color;
}
.repair-list {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 20px;
  right: 20px;
}
</style>

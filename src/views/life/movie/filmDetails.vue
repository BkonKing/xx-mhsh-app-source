<template>
  <div class="tf-bg">
    <film-detail v-for="i in layerNumber" :key="i" v-show="i === layerNumber"></film-detail>
  </div>
</template>

<script>
import filmDetail from './filmDetail'
export default {
  name: 'movieFilmDetails',
  data () {
    return {
      layerNumber: 0 // 影片详情 => 选择影院 => 影院详情 => 影片详情，路由嵌套的层数
    }
  },
  components: {
    filmDetail
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 判断from是不是属于以下数组（route名称），是则新增一层嵌套
      const nextLevels = ['movieCast', 'movieSelectCinema'] // 页面上能跳转的下一层级页面
      // 代表当前不是返回，是进入
      if (!nextLevels.includes(from.name)) {
        vm.layerNumber++
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    const nextLevels = ['movieCast', 'movieSelectCinema'] // 页面上能跳转的下一层级页面
    if (!nextLevels.includes(to.name)) {
      // 正常返回的页面数组（则退出一层循环）
      const backNames = ['movieCinemaDetails', 'movieList', 'movieIndex', 'home', 'search']
      backNames.includes(to.name) && this.layerNumber && this.layerNumber--
      // 如果没有显示的页面则销毁
      if (!this.layerNumber) {
        this.$destroy()
        this.$store.commit('deleteKeepAlive', from.name)
      }
    }
    next()
  }
}
</script>

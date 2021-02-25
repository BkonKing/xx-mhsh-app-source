<template>
  <div class="cinema-details">
    <cinema-detail v-for="i in layerNumber" :key="i" v-show="i === layerNumber"></cinema-detail>
  </div>
</template>

<script>
import cinemaDetail from './cinemaDetail'
export default {
  name: 'movieCinemaDetails',
  data () {
    return {
      layerNumber: 0 // 影片详情 => 选择影院 => 影院详情 => 影片详情，路由嵌套的层数
    }
  },
  components: {
    cinemaDetail
  },
  mounted () {
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      const nextLevels = ['movieSeat', 'movieLocation', 'movieFilmDetails'] // 页面上能跳转的下一层级页面
      // 代表当前不是返回，是进入
      if (!nextLevels.includes(from.name)) {
        vm.layerNumber++
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    const nextLevels = ['movieSeat', 'movieLocation', 'movieFilmDetails']
    if (!nextLevels.includes(to.name)) {
      // 正常返回的页面数组（则退出一层循环）
      const backNames = ['movieSelectCinema', 'movieList', 'search']
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

<style scoped>
.cinema-details {
  height: 100%;
}
</style>

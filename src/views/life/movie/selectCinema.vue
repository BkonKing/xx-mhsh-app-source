<template>
  <div class="tf-bg-white">
    <select-cinema-item v-for="i in layerNumber" :key="i" v-show="i === layerNumber"></select-cinema-item>
  </div>
</template>

<script>
import selectCinemaItem from './selectCinemaItem'
export default {
  name: 'movieSelectCinema',
  data () {
    return {
      layerNumber: 0 // 影片详情 => 选择影院 => 影院详情 => 影片详情，路由嵌套的层数
    }
  },
  components: {
    selectCinemaItem
  },
  created () {

  },
  mounted () {

  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 判断不是从原本下一层级返回，是则新增一层嵌套
      // 代表当前不是返回，是进入
      if (from.name !== 'movieCinemaDetails') {
        vm.layerNumber++
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    if (from.name !== 'movieCinemaDetails') {
      // 正常返回的页面数组（则退出一层循环）
      const backNames = ['movieFilmDetails', 'movieList', 'movieIndex', 'home', 'search']
      if (backNames.includes(to.name) && this.layerNumber) {
        // 如果没有显示的页面则销毁
        if (this.layerNumber === 1) {
          this.$destroy()
          this.$store.commit('deleteKeepAlive', from.name)
        } else {
          this.layerNumber--
        }
      }
    }
    next()
  }
}
</script>

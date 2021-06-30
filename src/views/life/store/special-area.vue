<template>
  <div class="app-body scroll-body" id="special-body">
    <area-page
      ref="area"
      :special_id="special_id"
      :navBarShow="navBarShow"
    ></area-page>
  </div>
</template>

<script>
import areaPage from './../components/area-page'
export default {
  name: 'specialArea',
  components: {
    areaPage
  },
  data () {
    return {
      navBarShow: true,
      special_id: '' // 专区id
    }
  },
  created () {
    this.special_id = this.$route.query.id
  },
  mounted () {
    this.$refs.area.listInit()
  },
  activated () {
    if (this.scrollTop) {
      document.getElementById('special-body').scrollTop = this.scrollTop
    }
  },
  methods: {
  },
  beforeRouteLeave (to, from, next) {
    if (to.name == 'life' || to.name == 'home') {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    const el = document.getElementById('special-body')
    this.scrollTop = (el && el.scrollTop) || 0
    next()
  }
}
</script>
<style scoped>
.app-body {
  background-color: #f2f2f4;
  font-size: 28px;
}
</style>

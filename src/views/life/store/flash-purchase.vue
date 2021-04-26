<template>
  <div class="app-body">
    <div class="order-bar bar-flash">
      <van-nav-bar
        title="限时闪购"
        fixed
        :border="false"
        placeholder
        left-arrow
        @click-left="$router.go(-1)"
      ></van-nav-bar>
    </div>
    <flash-page
      ref="flash"
      :swipeable="true"
    ></flash-page>
  </div>
</template>

<script>
import flashPage from './../components/flash-page'
export default {
  name: 'flashPurchase',
  components: {
    flashPage
  },
  data () {
    return {
    }
  },
  created () {
  },
  activated () {
    if (this.scrollLeft) {
      document
        .getElementById('flash-top')
        .getElementsByClassName(
          'scrollBarContent'
        )[0].scrollLeft = this.scrollLeft
    }
    if (this.scrollTop) {
      document
        .getElementById('flash-body')
        .getElementsByClassName(
          'van-tabs__content'
        )[0].scrollTop = this.scrollTop
    }
  },
  methods: {
    // updateOne () {
    //   getFlashGoodsOne({
    //     goods_id: this.tapId,
    //     ollage_id: this.ollage_id
    //   }).then(res => {
    //     if (res.success) {
    //       if (res.data.list_data && res.data.list_data.length) {
    //         var listOne = res.data.list_data[0]
    //         for (var i = 0; i < this.listData.length; i++) {
    //           if (this.listData[i].goods_id == this.tapId) {
    //             this.listData.splice(i, 1, listOne)
    //             break
    //           }
    //         }
    //       }
    //     }
    //   })
    // }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name == 'goodsDetail') {
        vm.$refs.flash.updateOne()
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    if (to.name == 'life' || to.name == 'home') {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    const el = document
      .getElementById('flash-top')
      .getElementsByClassName('scrollBarContent')
    this.scrollLeft = (el.length && el[0].scrollLeft) || 0
    console.log(document.getElementById('flash-body'))
    const el2 = document
      .getElementById('flash-body')
      .getElementsByClassName('van-tabs__content')
    this.scrollTop = (el2.length && el2[0].scrollTop) || 0
    next()
  }
}
</script>

<style scoped src="../../../styles/life.css"></style>
<style scoped>
.app-body {
  background-color: #f2f2f4;
  font-size: 28px;
}
</style>

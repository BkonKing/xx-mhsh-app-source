<template>
  <div class="page">
    <van-swipe class="opening-swipe" :show-indicators="false" :loop="false" @change="onChange">
      <van-swipe-item v-for="(image, index) in images[key]" :key="index">
        <img class="opening-img" :src="image" />
      </van-swipe-item>
    </van-swipe>
    <div v-if="index === 3" :class="`opening-btn-${key}`" @click="goLogin"></div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data () {
    return {
      key: 0,
      images: {
        0: [
          require('./opening/1080_01.png'),
          require('./opening/1080_02.png'),
          require('./opening/1080_03.png'),
          require('./opening/1080_04.png')
        ],
        1: [
          require('./opening/1125_01.png'),
          require('./opening/1125_02.png'),
          require('./opening/1125_03.png'),
          require('./opening/1125_04.png')
        ],
        2: [
          require('./opening/1536_01.png'),
          require('./opening/1536_02.png'),
          require('./opening/1536_03.png'),
          require('./opening/1536_04.png')
        ]
      },
      index: 0
    }
  },
  created () {
    // api.addEventListener({
    //   name: 'swiperight'
    // }, (ret, err) => {})
  },
  mounted () {
    const screenWidth = api.winWidth
    const screenHeight = api.winHeight
    if (screenWidth < 450 && screenHeight <= 756) {
      this.key = 0
    } else if (screenWidth < 450 && screenHeight > 756) {
      this.key = 1
    } else if (screenWidth >= 450) {
      this.key = 2
    }
  },
  methods: {
    goLogin () {
      api.setPrefs({
        key: 'first-open',
        value: 1
      })
      this.$router.replace('/login')
    },
    onChange (index) {
      this.index = index
    }
  }
}
</script>

<style lang='less' scoped>
.page {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.opening-swipe {
  width: 100%;
  height: 100%;
  .opening-img {
    width: 100%;
    height: 100%;
  }
}
.opening-btn-0 {
  position: fixed;
  width: 500px;
  height: 140px;
  left: 125px;
  bottom: 130px;
  z-index: 2;
}
.opening-btn-1 {
  position: fixed;
  width: 500px;
  height: 150px;
  left: 125px;
  bottom: 270px;
  z-index: 2;
}
.opening-btn-2 {
  position: fixed;
  width: 460px;
  height: 120px;
  left: 145px;
  bottom: 110px;
  z-index: 2;
}
</style>

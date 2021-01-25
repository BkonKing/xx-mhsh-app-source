<template>
<div class='tf-bg'>
  <van-nav-bar
    :title="title"
    :fixed="true"
    :border="false"
    left-arrow
    placeholder
    @click-left="$router.go(-1)"
  >
    <template #right>
      <span class="tf-icon tf-icon-dingwei" @click="goLocation"></span>
      <span class="tf-icon tf-icon-zhuanfa"></span>
    </template>
  </van-nav-bar>
  <div class="tf-main-container">
    <van-swipe
      ref="vanSwipe"
      :loop="false"
      :width="108"
      :show-indicators="false"
    >
      <van-swipe-item
        v-for="(item, index) in filmList"
        :key="index"
        @click="swipeTo(index, item)"
        :class="{ active: item.film_no == filmNo }"
      >
        <div class="aaa">{{ item.film_name }}</div>
      </van-swipe-item>
    </van-swipe>
    <van-tabs v-model="activeDate">
      <van-tab v-for="(obj, key) in scheduList" :key="key" :title="key">
        <div v-for="(item, i) in obj" :key="i">{{item.start_time}}</div>
      </van-tab>
    </van-tabs>
  </div>
</div>
</template>

<script>
import { getCinemadetail, getCinemaschedu } from '@/api/movie'
export default {
  name: 'movieCinemaDetails',
  data () {
    return {
      title: '',
      id: '',
      activeDate: 0, // 当前选中排期日期
      filmList: [], // 影片列表
      scheduList: {}, // 影片排期列表
      filmNo: '' // 当前选中影片编码
    }
  },
  created () {
    this.id = this.$route.query.id
    this.title = this.$route.query.name
    this.getCinemadetail()
  },
  methods: {
    // 获取影片详情
    getCinemadetail () {
      getCinemadetail({
        cinema_id: this.id
      }).then(({ data }) => {
        this.filmList = data.cinema_info
        this.swipeTo(0, this.filmList[0])
      })
    },
    // 获取影片排期
    getCinemaschedu () {
      getCinemaschedu({
        cinema_id: this.id,
        film_no: this.filmNo
      }).then(({ data }) => {
        this.scheduList = data
        this.$nextTick(() => {
          this.activeDate = 0
        })
      })
    },
    // 切换影片，为了将当前选中的居中显示，需要将轮播图位置少切换一个位置
    swipeTo (i, item) {
      this.filmNo = item.film_no
      this.$refs.vanSwipe.swipeTo(i - 1)
    },
    // 跳转影院位置
    goLocation () {
      this.$router.push({
        name: 'movieLocation'
      })
    }
  },
  watch: {
    filmNo () {
      this.getCinemaschedu()
    }
  }
}
</script>

<style lang='less' scoped>
/deep/ .van-swipe {
  height: 100%;
}
/deep/ .van-swipe-item {
  padding: 50px 15px;
  height: 360px;
}
.aaa {
  width: 100%;
  height: 100%;
  background: #69d0c6;
}
.active .aaa {
  transform: scale(1.15);
}
</style>

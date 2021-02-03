<template>
  <div class="tf-bg-white">
    <van-nav-bar
      title="演职人员"
      :fixed="true"
      :border="false"
      left-arrow
      placeholder
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="tf-main-container">
      <div class="cast-title" v-if="info.director.count > 0">
        导演（{{ info.director.count }}）
      </div>
      <div class="cast-content">{{ info.director.info }}</div>
      <template v-if="info.cast_type == '0' && info.to_star.info">
        <div class="cast-title">主演（{{info.to_star.count}}）</div>
        <div class="cast-content">{{info.to_star.info}}</div>
      </template>
      <template v-else-if="info.cast_type == '1' && info.dubbing.info">
        <div class="cast-title">配音（{{info.dubbing.count}}）</div>
        <div class="cast-content">{{info.dubbing.info}}</div>
      </template>
    </div>
  </div>
</template>

<script>
import { getActor } from '@/api/movie'
export default {
  name: 'movieCast',
  data () {
    return {
      info: {
        director: {},
        to_star: {},
        dubbing: {}
      }
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getActor()
  },
  methods: {
    getActor () {
      getActor({
        film_id: this.id
      }).then(({ data }) => {
        this.info = data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tf-main-container {
  padding: 40px 30px;
}
.cast-title {
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: 600;
  color: #222;
}
.cast-content {
  margin-bottom: 70px;
  font-size: 30px;
  color: #222;
}
</style>

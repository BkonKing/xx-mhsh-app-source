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
      <template v-if="actorInfo.director.count > 0">
        <div class="cast-title">导演（{{ actorInfo.director.count }}）</div>
        <div class="cast-content">{{ actorInfo.director.info }}</div>
      </template>
      <!-- 可能没有演员或者配音信息，所以需要多层判断 -->
      <template v-if="actorInfo.cast_type == '0' && actorInfo.to_star.info">
        <div class="cast-title">主演（{{ actorInfo.to_star.count }}）</div>
        <div class="cast-content">{{ actorInfo.to_star.info }}</div>
      </template>
      <template
        v-else-if="actorInfo.cast_type == '1' && actorInfo.dubbing.info"
      >
        <div class="cast-title">配音（{{ actorInfo.dubbing.count }}）</div>
        <div class="cast-content">{{ actorInfo.dubbing.info }}</div>
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
      actorInfo: {
        director: {}, // 导演
        to_star: {}, // 演员
        dubbing: {} // 配音演员
      }
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getActor()
  },
  methods: {
    // 获取演职人员列表
    getActor () {
      getActor({
        film_id: this.id
      }).then(({ data }) => {
        this.actorInfo = data
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
  word-break: break-all;
}
</style>

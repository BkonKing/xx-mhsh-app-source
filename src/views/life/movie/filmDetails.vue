<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      :title="title"
      :fixed="true"
      :border="false"
      left-arrow
      placeholder
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-zhuanfa" @click="shareShow = true"></span>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <!-- 影片信息 -->
      <film-details :info="info"></film-details>
      <!-- 影片介绍 -->
      <div
        class="film-introduction"
        :class="[
          { 'film-introduction-collapsed': collapsed },
          { 'film-introduction-able': collapseable }
        ]"
      >
        <div ref="introductionBox" class="introduction-text">
          <div ref="introductionText">{{ info.introduction }}</div>
        </div>
        <!-- 判断是否需要折叠，需要则显示折叠图标 -->
        <div class="tf-flex" v-if="collapseable">
          <span
            class="tf-icon"
            :class="[collapsed ? 'tf-icon-caret-up' : 'tf-icon-caret-down']"
            @click="collapsed = !collapsed"
          ></span>
        </div>
      </div>
      <!-- 演职人员信息 -->
      <div class="film-cast-info" v-if="info.director || info.cast">
        <div class="film-cast-header" @click="goCast">
          <div class="film-cast-title">演职人员</div>
          <div class="tf-text-grey">
            全部 <span class="tf-icon tf-icon-right"></span>
          </div>
        </div>
        <div class="van-ellipsis">
          <span class="tf-text-grey">导演：</span>{{ info.director }}
        </div>
        <div v-if="info.cast" class="van-ellipsis">
          <span class="tf-text-grey"
            >{{ info.cast_type == "0" ? "主演" : "配音" }}：</span
          >{{ info.cast }}
        </div>
      </div>
    </div>
    <div class="tf-padding">
      <van-button
        v-preventReClick
        size="large"
        type="danger"
        @click="goSelectCinema"
        >购票</van-button
      >
    </div>
    <tf-share
      :share-show="shareShow"
      :share-obj="shareObj"
      @closeSwal="closeShare">
    </tf-share>
  </div>
</template>

<script>
import tfShare from '@/components/tf-share'
import filmDetails from './components/FilmDetails'
import { getfilminfo } from '@/api/movie'
export default {
  name: 'movieFilmDetails',
  data () {
    return {
      filmId: '',
      title: '',
      info: {
        score: 0,
        want_view: 0
      },
      introductionBoxHeight: 0, // introductionBox默认高度
      collapseable: false, // 是否需要折叠
      collapsed: false, // 控制折叠
      shareShow: false,
      shareObj: {}
    }
  },
  components: {
    filmDetails,
    tfShare
  },
  methods: {
    // 获取影片详情
    getfilminfo () {
      getfilminfo({
        film_id: this.filmId
      }).then(({ data }) => {
        this.info = data
        this.$nextTick(() => {
          // 描述元素如果高度大于introductionBoxHeight则需要显示折叠按钮
          if (this.$refs.introductionText.clientHeight > this.introductionBoxHeight) {
            this.collapseable = true
          }
        })
        this.shareObj = {
          title: `《${data.film_name}》${data.score && data.score !== '0' ? parseFloat(data.score) / 10 : ''}`,
          description: data.introduction,
          thumb: data.thumb ? 'fs://' + data.thumb + '.png' : '',
          contentUrl: 'http://live.tosolomo.com/wap/#/filmDetails?id=' + data.id,
          pyqHide: true
        }
      })
    },
    // 购票跳转选择影院
    goSelectCinema () {
      this.$router.push({
        name: 'movieSelectCinema',
        query: {
          id: this.filmId,
          code: this.info.film_code
        }
      })
    },
    // 跳转演职人员
    goCast () {
      this.$router.push({
        name: 'movieCast',
        query: {
          id: this.filmId
        }
      })
    },
    closeShare (data) {
      this.shareShow = data == 1
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      const names = ['movieCast', 'movieSelectCinema']
      if (!names.includes(from.name)) {
        vm.filmId = vm.$route.query.id
        vm.getfilminfo()
        vm.introductionBoxHeight = vm.$refs.introductionBox.clientHeight
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    const names = ['movieCast', 'movieSelectCinema']
    if (!names.includes(to.name)) {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar {
  background: #000c;
  .van-icon,
  .tf-icon {
    color: #fff;
  }
}
.film-introduction {
  padding: 50px 30px;
  background: #fff;
  font-size: 30px;
  line-height: 50px;
  color: #222;
  .introduction-text {
    height: 210px;
    overflow: hidden;
  }
}
// 介绍可以折叠
.film-introduction-able {
  padding-bottom: 30px;
  .tf-flex {
    justify-content: center;
    align-items: center;
    padding-top: 30px;
  }
}
// 介绍展开
.film-introduction-collapsed {
  .introduction-text {
    height: auto;
  }
}
.film-cast-info {
  margin-top: 30px;
  padding: 40px 30px;
  background: #fff;
  font-size: 30px;
  color: #222;
  .film-cast-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .film-cast-title {
      font-size: 34px;
      font-weight: 500;
      color: #222222;
    }
    .tf-text-grey {
      font-size: 26px;
    }
  }
  .van-ellipsis {
    margin-top: 10px;
  }
}
</style>

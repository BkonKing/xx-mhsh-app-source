<template>
  <div class="tf-bg-white">
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
      <div class="film-info">
        <div ref="vanSwipe" class="film-swipe-container" @scroll="toSwipe">
          <div
            class="film-swipe"
            :class="{
              'active-film-box':
                filmIndex > 1 && filmIndex < filmList.length - 2
            }"
            :style="{
              'transition-duration': '500ms',
              width: `${filmList.length * 95 + 280}px`,
              padding: '0 140px'
            }"
          >
            <div
              v-for="(item, index) in filmList"
              :key="index"
              @click="handleClickFilm(item, index)"
              class="film-swipe-item"
              :class="{ active: item.film_no == filmNo }"
            >
              <img class="film-cover" :src="item.cover" />
            </div>
          </div>
        </div>
        <div class="film-title" @click="goFilmDetails(filmActive.film_id)">
          {{ filmActive.film_name }}
        </div>
        <div
          v-if="filmActive.total_time"
          class="film-des"
          @click="goFilmDetails(filmActive.film_id)"
        >
          {{ filmActive.total_time }}分钟 | {{ filmActive.copy_type }}
        </div>
        <div class="film-tag"></div>
      </div>
      <van-tabs
        v-if="scheduList"
        v-model="activeDate"
        title-active-color="#EB5841"
        sticky
      >
        <van-tab
          v-for="(obj, key) in scheduList"
          :key="key"
          :title="key"
          :name="key"
        >
          <div
            class="film-schedule"
            v-for="(item, i) in obj"
            :key="i"
            @click="goSeat(item)"
          >
            <div class="tf-flex">
              <div class="film-start">{{ item.start_time }}</div>
              <div class="film-end">{{ item.end_time }}散场</div>
            </div>
            <div class="tf-flex hall-box">
              <div class="film-copy">
                {{ item.copy_language }} {{ item.copy_type }}
              </div>
              <div class="film-hall van-ellipsis">{{ item.hall_name }}</div>
            </div>
            <div class="film-price">
              <span class="tf-text-sm tf-text-primary">￥</span
              >{{ item.ticket_price }}
            </div>
            <van-button class="film-seat" size="small" type="primary" round
              >选座</van-button
            >
          </div>
        </van-tab>
      </van-tabs>
      <van-loading v-else type="spinner" color="#eb5841" size="24px" />
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
      cinemaId: '', // 影院id
      activeDate: '', // 当前选中排期日期
      filmList: [], // 影片列表
      scheduList: null, // 影片排期列表
      filmNo: '', // 当前选中影片编码
      filmIndex: 0, // 当前选中影片序号
      filmActive: {}, // 当前选中影片数据
      swipeStatus: 0 // 是否手动切换
    }
  },
  created () {
    this.cinemaId = this.$route.query.id
    this.filmNo = this.$route.query.filmNo
    this.title = this.$route.query.name
    this.activeDate = this.$route.query.scheduDate
    this.getCinemadetail()
  },
  methods: {
    // 获取影片详情
    getCinemadetail () {
      getCinemadetail({
        cinema_id: this.cinemaId
      }).then(({ data }) => {
        this.filmList = data.cinema_info
        this.swipeTo(0, this.filmList[0])
      })
    },
    // 获取影片排期
    getCinemaschedu () {
      getCinemaschedu({
        cinema_id: this.cinemaId,
        film_no: this.filmNo
      }).then(({ data }) => {
        this.scheduList = data
      })
    },
    // 点击影片，如果是当前选中，则跳转到详情页，否则就选中点击影片
    handleClickFilm (item, index) {
      if (this.filmNo === item.film_no) {
        this.goFilmDetails(item.film_id)
      } else {
        this.swipeTo(index, item)
      }
    },
    // 切换影片，为了将当前选中的居中显示，需要将轮播图位置少切换一个位置
    swipeTo (i, item) {
      this.filmIndex = i
      this.filmNo = item.film_no
      this.filmActive = item
      const left = i * 95
      const timer = setInterval(() => {
        this.swipeStatus = true
        if (this.$refs.vanSwipe.scrollLeft < left) {
          this.$refs.vanSwipe.scrollLeft = this.$refs.vanSwipe.scrollLeft + 1
        } else if (this.$refs.vanSwipe.scrollLeft > left) {
          this.$refs.vanSwipe.scrollLeft = this.$refs.vanSwipe.scrollLeft - 1
        } else {
          clearInterval(timer)
        }
      }, 0.5)
    },
    // 左右滚动切换选中
    toSwipe (e) {
      if (this.swipeStatus) {
        this.swipeStatus = false
        return
      }
      const left = e.target.scrollLeft
      if (left === 0) {
        this.filmIndex = 0
        this.filmNo = this.filmList[0].film_no
        this.filmActive = this.filmList[0]
      } else if (left > 94) {
        const index = Math.floor(left / 95)
        this.filmIndex = index
        this.filmNo = this.filmList[index].film_no
        this.filmActive = this.filmList[index]
      }
    },
    // 跳转选择位置
    goSeat (data) {
      const {
        feature_appno,
        hall_name,
        start_time,
        end_time,
        copy_language,
        copy_type,
        schedu_date
      } = data
      this.$router.push({
        name: 'movieSeat',
        query: {
          cinemaName: this.title,
          hallName: hall_name,
          filmNo: this.filmNo,
          filmName: this.filmActive.film_name,
          date: this.activeDate,
          time: `${start_time}-${end_time}`,
          tag: `${copy_language} ${copy_type}`,
          scheduDate: schedu_date,
          cinemaId: this.cinemaId,
          featureNo: feature_appno
        }
      })
    },
    // 跳转影片详情
    goFilmDetails (id) {
      this.$router.push({
        name: 'movieFilmDetails',
        query: {
          id: id
        }
      })
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
  },
  beforeRouteLeave (to, from, next) {
    const names = ['movieSelectCinema', 'movieList']
    if (names.includes(to.name)) {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.film-cover {
  width: 100%;
  height: 100%;
  background: #69d0c6;
}
.active .film-cover {
  transform: scale(1.15);
}
/deep/ .van-nav-bar {
  background: #000000cc;
  color: #fff;
  .tf-icon,
  .van-icon,
  .van-nav-bar__title {
    color: #fff;
  }
}
.film-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 480px;
  padding: 10px 0 40px;
  position: relative;
  background: #000000cc;
  .film-title {
    font-size: 34px;
    font-weight: 600;
    color: #ffffff;
  }
  .film-des {
    margin-top: 20px;
    font-size: 28px;
    color: #ffffffcc;
  }
  .film-tag {
    width: 0;
    height: 0;
    position: absolute;
    left: 50%;
    bottom: 0;
    margin-left: -20px;
    border: 20px solid;
    border-color: transparent transparent #fff;
  }
}
// 排期表
.film-schedule {
  display: flex;
  align-items: center;
  height: 160px;
  padding: 30px;
  background: #fff;
  border-top: 2px solid #f0f0f0;
  .tf-flex {
    flex-direction: column;
    justify-content: space-between;
  }
  .film-start {
    font-size: 42px;
    font-weight: 600;
    color: #222222;
  }
  .film-end,
  .film-hall {
    font-size: 24px;
    color: #8f8f94;
  }
  .film-copy {
    font-size: 30px;
    line-height: 59px;
    color: #222222;
  }
  .film-price {
    margin-right: 50px;
    font-size: 42px;
    color: #eb5841;
  }
  .hall-box {
    width: 200px;
    margin-left: 50px;
  }
  .film-seat {
    padding: 0 30px;
    font-size: 30px;
    color: #fff;
  }
}
/deep/.van-tab {
  padding: 0 20px;
  flex-basis: 195px !important;
  .van-tab__text {
    font-size: 30px;
  }
}
/deep/ .van-loading--spinner {
  margin-top: 50px;
  text-align: center;
}
.film-swipe-container {
  height: 320px;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  cursor: grab;
  user-select: none;
}
.film-swipe {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  width: 720px;
  height: 100%;
  .film-swipe-item {
    flex: 0 0 190px;
    height: 322px;
    padding: 50px 15px;
  }
}
// .active-film-box /deep/ .van-swipe__track {
//   margin: 0 280px;
// }
</style>

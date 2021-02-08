<template>
  <div class="tf-bg-white">
    <van-nav-bar
      :class="{ 'unfixed-background': !isFixedTabs }"
      :fixed="true"
      :border="false"
      placeholder
    >
      <template #left>
        <i
          class="van-icon van-icon-arrow-left van-nav-bar__arrow"
          @click="$router.go(-1)"
        ></i>
        <!-- tab没吸顶，title显示在左边 -->
        <div v-if="!isFixedTabs" class="nav-title">{{ title }}</div>
      </template>
      <!-- tab没吸顶，title（影片名称）显示在中间 -->
      <template v-if="isFixedTabs" #title>
        {{ filmActive.film_name }}
      </template>
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
            :style="{
              width: `${filmList.length * filmItemWidth + sidePaddingWidth}px`,
              padding: `0 ${sidePaddingWidth / 2}px`
            }"
          >
            <div
              v-for="(item, index) in filmList"
              :key="index"
              @click="handleClickFilm(item, index)"
              class="film-swipe-item"
              :class="{ 'film-swipe-item-active': item.film_no == filmNo }"
              :style="{
                flex: `0 0 ${filmItemWidth}px`
              }"
            >
              <img class="film-cover" :src="item.cover" />
            </div>
          </div>
        </div>
        <!-- 选中的影片信息，点击跳转影片详情页 -->
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
      <van-loading v-if="loading" type="spinner" color="#eb5841" size="24px" />
      <!-- 排期tabs，一次性渲染 -->
      <van-tabs
        v-else-if="scheduList"
        v-model="activeDate"
        title-active-color="#EB5841"
        sticky
        offset-top="1.17333rem"
        @scroll="scrollTabs"
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
      <van-empty v-else-if="!loading" image="error" description="暂无排期" />
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
      scheduList: null, // 影片排期列表 Object
      filmNo: '', // 当前选中影片编码
      filmIndex: 0, // 当前选中影片序号
      filmActive: {}, // 当前选中影片数据
      swipeStatus: 0, // 是否自动切换
      isFixedTabs: false, // tabs是否吸顶
      loading: false,
      filmItemWidth: 96, // 影片轮播film-swipe-item宽度(包含padding)
      sidePaddingWidth: 280, // 影片轮播，film-swipe左右需要添加两个占位item和margin间距的宽度和
      timer: null
    }
  },
  created () {
    this.cinemaId = this.$route.query.id
    this.filmNo = this.$route.query.filmNo
    this.title = this.$route.query.name
    this.activeDate = this.$route.query.scheduDate
    this.getCinemadetail()
  },
  mounted () {
    this.filmItemWidth = (api.winWidth || document.body.clientWidth) / 4
    this.sidePaddingWidth = this.filmItemWidth * 3
  },
  methods: {
    // 获取影片详情
    getCinemadetail () {
      getCinemadetail({
        cinema_id: this.cinemaId
      }).then(({ data }) => {
        this.filmList = data.cinema_info
        if (this.filmList && this.filmList.length) {
          // 从选择影院进入，带有filmNo则选中到当前影片，否则默认选中第一个
          if (this.filmNo) {
            const filmIndex = this.filmList.findIndex(
              obj => obj.film_no === this.filmNo
            )
            this.swipeTo(filmIndex, this.filmList[filmIndex])
          } else {
            this.swipeTo(0, this.filmList[0])
          }
        } else {
          this.$dialog
            .alert({
              title: '该影院暂时没有影片上映'
            })
            .then(() => {
              this.$router.go(-1)
            })
        }
      })
    },
    // 获取影片排期
    getCinemaschedu () {
      this.loading = true
      getCinemaschedu({
        cinema_id: this.cinemaId,
        film_no: this.filmNo
      })
        .then(({ data }) => {
          // 排期没有数据的情况下是[]，scheduList应该为Object，所以需要手动转成null
          this.scheduList = Array.isArray(data) && !data.length ? null : data
        })
        .finally(() => {
          this.loading = false
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
      const speed = Math.abs(this.filmIndex - i)
      const left = i * this.filmItemWidth
      this.filmIndex = i
      this.filmNo = item.film_no
      this.filmActive = item
      // 滚动动画
      const timer = setInterval(() => {
        this.swipeStatus = true
        if (this.$refs.vanSwipe) {
          const scrollLeft = this.$refs.vanSwipe.scrollLeft
          if (Math.abs(scrollLeft - left) < speed) {
            this.$refs.vanSwipe.scrollLeft = left
            clearInterval(timer)
          } else if (scrollLeft < left) {
            this.$refs.vanSwipe.scrollLeft = scrollLeft + speed
          } else if (scrollLeft > left) {
            this.$refs.vanSwipe.scrollLeft = scrollLeft - speed
          } else {
            clearInterval(timer)
          }
        } else {
          clearInterval(timer)
        }
      }, 0.5)
    },
    // 影片列表左右滚动切换选中
    toSwipe (e) {
      // 自动切换则不触发滚动自动选中
      if (this.swipeStatus) {
        this.swipeStatus = false
        return
      }
      // 用来判断是否滚动结束
      clearTimeout(this.timer)
      const scrollLeft = e.target.scrollLeft + this.filmItemWidth / 2
      const index = Math.floor(scrollLeft / this.filmItemWidth)
      this.filmIndex = index
      this.filmNo = this.filmList[index].film_no
      this.filmActive = this.filmList[index]
      // 用来判断是否滚动结束
      this.timer = setTimeout(this.swipeTouchEnd, 100)
    },
    // 滑动停止需要判断当前位置是在哪，然后滚动到当前影片中间
    swipeTouchEnd () {
      const scrollLeft = this.$refs.vanSwipe.scrollLeft + this.filmItemWidth / 2
      const index = Math.floor(scrollLeft / this.filmItemWidth)
      this.$refs.vanSwipe.scrollLeft = index * this.filmItemWidth
    },
    // tabs滚动
    scrollTabs ({ isFixed }) {
      // tab是否固定
      this.isFixedTabs = isFixed
    },
    // 跳转选择座位
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
        name: 'movieLocation',
        query: {
          id: this.cinemaId
        }
      })
    }
  },
  watch: {
    filmNo () {
      this.getCinemaschedu()
    }
  },
  beforeRouteLeave (to, from, next) {
    const names = ['movieSeat', 'movieLocation']
    if (!names.includes(to.name)) {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.tf-bg-white {
  // overflow-y: auto;
  overflow-x: hidden !important;
}
.nav-title {
  width: 450px;
  font-size: 30px;
  text-align: left;
  @text-ellipsis();
}
.unfixed-background /deep/ .van-nav-bar {
  background: #000000cc;
  color: #fff;
  .tf-icon,
  .van-icon,
  .nav-title {
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
// 影片列表
.film-swipe-container {
  width: 100%;
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
  -webkit-overflow-scrolling: touch;
  width: 720px;
  height: 100%;
  .film-swipe-item {
    // flex: 0 0 190px;
    height: 322px;
    padding: 50px 16px;
  }
  .film-cover {
    width: 100%;
    height: 100%;
    background: #69d0c6;
  }
  .film-swipe-item-active .film-cover {
    transform: scale(1.15);
  }
}
</style>

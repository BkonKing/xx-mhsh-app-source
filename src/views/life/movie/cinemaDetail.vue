<template>
  <div class="tf-bg-white">
    <van-nav-bar
      ref="navBar"
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
        <span class="tf-icon tf-icon-zhuanfa" @click="shareShow = true"></span>
      </template>
    </van-nav-bar>
    <div class="tf-main-container">
      <div class="film-info">
        <div
          ref="vanSwipe"
          class="film-swipe-container"
          @scroll="toSwipe"
          @touchstart="touchstart"
          @touchend="touchend"
          @touchcancel="touchend"
        >
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
              :class="{
                'film-swipe-item-active': item.film_no == filmActive.film_no
              }"
              :style="{
                flex: `0 0 ${filmItemWidth}px`
              }"
            >
              <img v-if="item.cover" class="film-cover" :src="item.cover" />
              <img v-else class="film-cover" src="@/assets/imgs/movie_nocover.png" />
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
          {{ filmActive.total_time }}分钟 | {{ (filmActive.type && filmActive.type.replace(/,/g, ' ')) }}
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
        :offset-top="`${offsetTop}px`"
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
            <div class="display-flex">
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
            </div>
            <div class="display-flex">
              <div class="film-price">
                <span class="tf-text-sm tf-text-primary">￥</span
                >{{ item.ticket_price }}
              </div>
              <van-button class="film-seat" size="small" type="primary" round
                >选座</van-button
              >
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <van-empty v-else-if="!loading" image="error" description="暂无排期" />
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
import { getCinemadetail, getCinemaschedu } from '@/api/movie'
export default {
  name: 'movieCinemaDetail',
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
      scrollLeft: 0, // 离开页面保存的滚动位置
      first: true,
      offsetTop: 0, // tab吸顶距离
      shareShow: false,
      shareObj: {}
    }
  },
  components: {
    tfShare
  },
  created () {
    this.pageInit()
  },
  mounted () {
    this.filmItemWidth = (api.winWidth || document.body.clientWidth) / 4
    this.sidePaddingWidth = this.filmItemWidth * 3
    if (process.env.VUE_APP_IS_APP === '1') {
      this.offsetTop = api.safeArea.top + this.$refs.navBar.height
    }
  },
  methods: {
    // 页面初始化
    pageInit () {
      this.cinemaId = this.$route.query.id
      this.filmNo = this.$route.query.filmNo
      this.title = this.$route.query.name
      this.activeDate = this.$route.query.scheduDate
      this.shareObj = {
        title: `去${this.title}看电影，一起吗？`,
        description: '来看下最近有什么好电影吧~',
        thumb: '',
        contentUrl: `http://live.tosolomo.com/wap/#/cinemaDetails?id=${this.cinemaId}&name=${this.title}`,
        pyqHide: false
      }
      this.getCinemadetail()
    },
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
          if (this.first && this.activeDate) {
            this.first = false
            return
          }
          this.activeDate = Object.keys(data)[0]
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
      const speed = Math.abs(this.filmIndex - i) || 1
      const left = i * this.filmItemWidth
      this.filmIndex = i
      this.filmNo = item.film_no
      this.filmActive = item
      this.scrollAnimation(left, speed * 2)
    },
    // 影片列表左右滚动切换选中
    toSwipe (e) {
      // 自动切换则不触发滚动自动选中
      if (this.swipeStatus) {
        this.swipeStatus = false
        return
      }
      const index = this.findSwipeIndex(e.target.scrollLeft)
      this.filmIndex = index
      // this.filmNo = this.filmList[index].film_no
      this.filmActive = this.filmList[index]
    },
    // 滑动停止需要判断当前位置是在哪，然后滚动到当前影片中间
    swipeTouchEnd () {
      const index = this.findSwipeIndex(this.$refs.vanSwipe.scrollLeft)
      this.filmNo = this.filmList[index].film_no
      this.scrollAnimation(index * this.filmItemWidth, 2)
    },
    // 返回当前滚动位置所属的影片index
    findSwipeIndex (left) {
      // 超出则返回最后一个
      if (left > this.filmList.length * this.filmItemWidth) {
        return this.filmList.length - 1
      } else if (left > 0) {
        const scrollLeft = left + this.filmItemWidth / 2
        return Math.floor(scrollLeft / this.filmItemWidth)
      }
      return 0
    },
    // 滚动动画
    scrollAnimation (left, speed) {
      const timer = setInterval(() => {
        this.swipeStatus = true
        if (this.$refs.vanSwipe) {
          const scrollLeft = this.$refs.vanSwipe.scrollLeft
          // 滚动位置到最后位置相差比每次滚动的小，则直接滚动到指定位置
          if (Math.abs(scrollLeft - left) < speed + 6) {
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
    touchstart () {},
    // 滚动结束，这里滚动用css关闭了滚动惯性
    touchend () {
      this.swipeStatus = true
      this.swipeTouchEnd()
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
          id
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
    },
    closeShare (data) {
      this.shareShow = data == 1
    }
  },
  watch: {
    // 当前电影编号
    filmNo () {
      this.getCinemaschedu()
    },
    $route (to, from) {
      // 如果是从以下页面（route名称）返回，则要将左右滚动位置滚动到上一次位置（当前选中的影片）
      const fromNames = ['movieFilmDetails', 'movieSeat', 'movieLocation']
      if (to.name === 'movieCinemaDetails' && fromNames.includes(from.name)) {
        this.$nextTick(() => {
          const left = this.filmIndex * this.filmItemWidth
          this.$refs.vanSwipe && (this.$refs.vanSwipe.scrollLeft = left)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tf-bg-white {
  // overflow-y: auto;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
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
  justify-content: space-between;
  height: 160px;
  padding: 30px;
  background: #fff;
  border-bottom: 2px solid #f0f0f0;
  .display-flex {
    display: flex;
    align-items: center;
  }
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
    margin-right: 40px;
    font-size: 42px;
    color: #eb5841;
  }
  .hall-box {
    width: 200px;
    margin-left: 40px;
  }
  .film-seat {
    padding: 0 30px;
    font-size: 30px;
    color: #fff;
  }
}
/deep/.van-tab {
  padding: 0 18px;
  flex-basis: 187.5px !important;
  flex-shrink: 0;
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
  -webkit-overflow-scrolling: auto;
  cursor: grab;
  user-select: none;
}
.film-swipe {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: auto;
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
/deep/ .van-tabs--line .van-tabs__wrap {
  border-bottom: 2px solid #f0f0f0;
}
</style>

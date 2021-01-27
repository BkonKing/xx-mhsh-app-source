<template>
  <div class="tf-bg">
    <van-nav-bar
      title="我的影票"
      :fixed="true"
      :border="false"
      left-arrow
      placeholder
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-kefu"></span>
      </template>
    </van-nav-bar>
    <div class="tf-main-container">
      <div class="order-box">
        <div class="order-header">
          <div class="order-cinema">{{ info.cinema_name }}</div>
          <div class="order-status">{{ info.order_desc }}</div>
        </div>
        <div class="film-box">
          <img class="film-cover" :src="info.cover" />
          <div class="film-info">
            <div class="film-name">{{ info.film_name }}</div>
            <div class="film-type">
              {{ info.type }}
            </div>
            <div class="film-time">{{ info.total_time }} / {{ info.area }}</div>
            <div class="film-star van-ellipsis">{{ info.to_star }}</div>
          </div>
        </div>
        <div class="order-content">
          <div class="tf-flex">
            <div class="tf-text-grey">
              场次
            </div>
            <div>{{ info.date }} {{ info.week }} {{ info.time }}</div>
          </div>
          <div class="tf-flex">
            <div class="tf-text-grey">
              厅号
            </div>
            <div>
              {{ info.hall_name }}
            </div>
          </div>
          <div class="tf-flex">
            <div class="tf-text-grey">
              座位
            </div>
            <div>
              {{ info.seat_name }}
            </div>
          </div>
        </div>
        <div class="order-footer"></div>
        <div class="border-indent border-indent-left"></div>
        <div class="border-indent border-indent-right"></div>
      </div>
      <div class="order-status-box">
        <div class="border-indent border-indent-left"></div>
        <div class="border-indent border-indent-right"></div>
        <!-- rate表示进度条的目标进度 -->
        <van-circle v-model="currentRate" :rate="100" color="#EB5841" :speed="100"
          ><img class="draw-bill-img" src="@/assets/imgs/movie_draw_bill.png" alt=""
        /></van-circle>
        <div class="tf-text-lg">出票中</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getfilmdetails } from '@/api/movie'
export default {
  name: 'movieTicket',
  data () {
    return {
      orderId: '',
      info: {},
      currentRate: 0 // 动画过程中的实时进度
    }
  },
  created () {
    this.orderId = this.$route.query.id
    this.getfilmdetails()
  },
  methods: {
    // 获取电影票详细信息
    getfilmdetails () {
      getfilmdetails({
        order_id: this.orderId
      }).then(({ data }) => {
        this.info = data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.order-box {
  width: 690px;
  position: relative;
  margin: 40px 30px 0;
  padding: 0 30px;
  background: #ffffff;
  border-radius: 10px;
  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90px;
    border-bottom: 2px solid #f0f0f0;
    .order-cinema {
      font-size: 30px;
      color: #222222;
    }
    .order-status {
      font-size: 28px;
      color: #8f8f94;
    }
  }
  .film-box {
    display: flex;
    padding: 30px 0;
    border-bottom: 2px solid #f0f0f0;
    .film-cover {
      width: 140px;
      height: 196px;
      margin-right: 30px;
      border-radius: 4px;
    }
    .film-info {
      font-size: 26px;
      color: #8f8f94;
    }
  }
  .order-content {
    padding: 30px 0 40px;
    font-size: 30px;
    color: #222;
    .tf-text-grey {
      margin-right: 30px;
    }
    .tf-flex > div {
      line-height: 48px;
    }
  }
}
.border-indent {
  position: absolute;
  bottom: -20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f2f2f4;
}
.border-indent-left {
  left: -20px;
}
.border-indent-right {
  right: -20px;
}
.order-status-box .border-indent {
  top: -20px;
  bottom: initial;
}
.order-status-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 690px;
  position: relative;
  height: 403px;
  margin: 0 30px;
  padding: 0 40px;
  background: #ffffff;
  border-radius: 10px;
  .tf-text-lg {
    margin-top: 36px;
    color: #222;
  }
}
.draw-bill-img {
  width: 200px;
  height: 200px;
}
</style>

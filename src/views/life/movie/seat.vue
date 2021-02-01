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
        <span class="tf-icon tf-icon-time-circle"></span>
      </template>
    </van-nav-bar>
    <div class="seat-price-list">
      <div class="seat-price" v-for="(price, i) in seatPrices" :key="i">
        <div
          class="seat"
          :class="seatPrices.findIndex(e => e === price) | seatColorClass"
        ></div>
        ￥{{ price }}
      </div>
    </div>
    <div class="tf-body-container" :class="{'center-container': seatList && seatList.length && seatList[0].length < 14}">
      <div class="seat-container">
        <div v-if="seatList && seatList.length" class="screen-box">
          <img class="screen" src="@/assets/imgs/movie_screen.png" alt="" />
          <div class="screnn-text">{{ hallName }} 巨幕</div>
        </div>
        <div class="seat-row" v-for="(row, i) in seatList" :key="i">
          <div class="seat-box" v-for="(col, index) in row" :key="index">
            <div
              v-if="col.areaId"
              class="seat"
              :class="[
                ...creatSeatClass(col),
                {
                  'seat-active': selectSeats.hasOwnProperty(col.seatNo)
                }
              ]"
              @click="selectSeat(col, i, index)"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="seat-footer">
      <div class="seat-status-container">
        <div class="seat-status"><span class="seat choosable"></span>可选</div>
        <div class="seat-status">
          <span class="seat selected tf-icon tf-icon-gou"></span>已选
        </div>
        <div class="seat-status"><span class="seat soldout"></span>已售</div>
        <div class="seat-status"><span class="seat unsold"></span>不可售</div>
      </div>
      <div class="film-box">
        <div class="tf-flex">
          <div class="film-title">{{ filmName }}</div>
          <div class="film-switch" @click="isCollapsible = !isCollapsible">
            切换场次 <span class="tf-icon tf-icon-caret-down"></span>
          </div>
        </div>
        <div class="film-info">
          {{ filmDate }} {{ filmTime }}
          <span class="film-tag">{{ filmTag }}</span>
        </div>
        <div v-if="isCollapsible" class="session-container">
          <div
            v-for="(item, i) in sessionList"
            :key="i"
            class="session-item"
            :class="{ 'session-item-active': item.feature_appno == featureNo }"
            @click="switchSession(item)"
          >
            <div class="session-start">{{ item.start_time }}</div>
            <div class="session-tag">
              {{ item.copy_language }} {{ item.copy_type }}
            </div>
            <div class="session-price">￥{{ item.ticket_price }}起</div>
          </div>
        </div>
        <div
          v-if="Object.keys(selectSeats).length"
          class="select-seat-container"
        >
          <div
            v-for="(item, key) in selectSeats"
            :key="key"
            class="select-seat-item"
          >
            <div class="select-seat">
              <div class="select-seat-piece">
                {{ item.seatRow }}排{{ item.seatCol }}座
              </div>
              <div class="select-seat-price">￥{{ item.ticket_price }}</div>
            </div>
            <span
              class="tf-icon tf-icon-guanbi"
              @click="removeSeats(item)"
            ></span>
          </div>
        </div>
      </div>
      <van-button
        type="primary"
        size="large"
        :disabled="!Object.keys(selectSeats).length"
        @click="lockseat"
        >{{
          Object.keys(selectSeats).length
            ? `￥${totalPrice} 确认选座`
            : "请先选座"
        }}</van-button
      >
    </div>
    <tf-dialog v-model="lockseatFailVisiable">
      <div class="lockseat-fail-dialog">
        <img class="lock-fail" src="@/assets/imgs/movie-fail.png" alt="" />
        <div class="tf-text-primary">预定失败，请重新选座</div>
        <van-button
          type="primary"
          size="small"
          @click="lockseatFailVisiable = false"
          >知道了</van-button
        >
      </div>
    </tf-dialog>
    <van-dialog v-model="lockVisiable" :show-confirm-button="false">
      <div class="lock-dialog">
        <van-circle v-model="currentRate" :rate="100" :speed="100" color="#EB5841" layer-color="#eb584166">
          <img class="lock-img" src="@/assets/imgs/movie_lock.png" alt="">
        </van-circle>
        <div class="tf-text-lg">锁座中</div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import tfDialog from '@/components/tf-dialog/index'
import {
  getplanseat,
  unlockorder,
  lockseat,
  getSessions,
  getfilmprice
} from '@/api/movie'
import { makeCount } from '@/utils/util'
import { mapGetters } from 'vuex'
export default {
  name: 'movieSeat',
  components: {
    tfDialog
  },
  data () {
    return {
      title: '',
      filmNo: '', // 影片编码
      filmName: '', // 影片名称
      cinemaId: '', // 影院id
      hallName: '', // 影厅名称
      filmDate: '', // 影片场次日期
      filmTime: '', // 影片场次时间
      filmTag: '', // 影片标签
      featureNo: '', // 排期编码
      scheduDate: '', // 场次日期
      seatList: [], // 座位列表
      seatPrices: [], // 当前排期座位不同价格列表
      isCollapsible: false, // 是否折叠场次列表
      sessionList: [], // 场次列表
      selectSeats: {}, // 选中座位列表
      lockseatFailVisiable: false, // 锁座失败弹窗
      lockVisiable: false, // 锁座中
      currentRate: 0, // 锁座进度
      timer: 0 // 锁座定时器
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    totalPrice () {
      let num = 0
      Object.keys(this.selectSeats).forEach(key => {
        num += makeCount(parseFloat(this.selectSeats[key].ticket_price))
      })
      return num
    }
  },
  created () {
    const {
      cinemaName,
      filmNo,
      cinemaId,
      featureNo,
      hallName,
      filmName,
      date,
      time,
      tag,
      scheduDate
    } = this.$route.query
    this.title = cinemaName
    this.hallName = hallName
    this.filmNo = filmNo
    this.cinemaId = cinemaId
    this.featureNo = featureNo
    this.filmName = filmName
    this.filmDate = date
    this.filmTime = time
    this.filmTag = tag
    this.scheduDate = scheduDate
    this.getplanseat()
    this.getSessions()
    this.getfilmprice()
  },
  methods: {
    // 获取实时座位
    getplanseat () {
      getplanseat({
        cinema_id: this.cinemaId,
        feature_appno: this.featureNo
      }).then(({ data }) => {
        this.seatList = data
      })
    },
    // 获取影片场次列表
    getSessions () {
      getSessions({
        cinema_id: this.cinemaId,
        feature_appno: this.featureNo,
        film_no: this.filmNo,
        date: this.scheduDate
      }).then(({ data }) => {
        this.sessionList = data
      })
    },
    // 获取排期价格
    getfilmprice () {
      getfilmprice({
        cinema_id: this.cinemaId,
        feature_appno: this.featureNo
      }).then(({ data }) => {
        this.seatPrices = data
      })
    },
    // 选中座位
    selectSeat (col, rowIndex, colIndex) {
      if (col.seatState === -1) {
        return
      }
      // 普通座位
      if (col.seatType === 'N') {
        // 如果是选中状态则取消选中
        if (
          Object.prototype.hasOwnProperty.call(this.selectSeats, col.seatNo)
        ) {
          this.deleteSeat(col.seatNo)
          return
        }
        this.$set(this.selectSeats, col.seatNo, col)
      } else {
        this.operateSeatType(col, rowIndex, colIndex)
      }
    },
    // 判断是否情侣座或者三连座,并选中或者删除座位
    operateSeatType (col, rowIndex, colIndex) {
      // 如果是选中状态则取消选中
      if (Object.prototype.hasOwnProperty.call(this.selectSeats, col.seatNo)) {
        this.removeSeats(col, rowIndex, colIndex)
      } else {
        if (col.seatType === 'L') {
          const col1 = this.seatList[rowIndex][colIndex + 1]
          const col2 = this.seatList[rowIndex][colIndex + 2]
          this.$set(this.selectSeats, col.seatNo, col)
          this.$set(this.selectSeats, col1.seatNo, col1)
          if (col2 && col2.seatType === 'R') {
            this.$set(this.selectSeats, col2.seatNo, col2)
          }
        } else if (col.seatType === 'M') {
          const col1 = this.seatList[rowIndex][colIndex + 1]
          const col2 = this.seatList[rowIndex][colIndex - 1]
          this.$set(this.selectSeats, col2.seatNo, col2)
          this.$set(this.selectSeats, col.seatNo, col)
          this.$set(this.selectSeats, col1.seatNo, col1)
        } else if (col.seatType === 'R') {
          const col1 = this.seatList[rowIndex][colIndex - 1]
          const col2 = this.seatList[rowIndex][colIndex - 2]
          if (col2 && col2.seatType === 'L') {
            this.$set(this.selectSeats, col2.seatNo, col2)
          }
          this.$set(this.selectSeats, col1.seatNo, col1)
          this.$set(this.selectSeats, col.seatNo, col)
        }
      }
    },
    // 添加连座
    addSeats (col, rowIndex, colIndex) {},
    // 删除连座
    removeSeats (col, ri, ci) {
      const rowIndex = ri || parseInt(col.seatRow) - 1
      const colIndex = ci || parseInt(col.seatCol) - 1
      if (col.seatType === 'L') {
        if (this.seatList[rowIndex][colIndex + 2].seatType === 'R') {
          this.deleteSeat(this.seatList[rowIndex][colIndex + 2].seatNo)
        }
        this.deleteSeat(this.seatList[rowIndex][colIndex + 1].seatNo)
        this.deleteSeat(col.seatNo)
      } else if (col.seatType === 'M') {
        this.deleteSeat(this.seatList[rowIndex][colIndex + 1].seatNo)
        this.deleteSeat(col.seatNo)
        this.deleteSeat(this.seatList[rowIndex][colIndex - 1].seatNo)
      } else if (col.seatType === 'R') {
        this.deleteSeat(col.seatNo)
        this.deleteSeat(this.seatList[rowIndex][colIndex - 1].seatNo)
        if (this.seatList[rowIndex][colIndex - 2].seatType === 'L') {
          this.deleteSeat(this.seatList[rowIndex][colIndex - 2].seatNo)
        }
      }
    },
    // 删除座位
    deleteSeat (seatNo) {
      this.$delete(this.selectSeats, seatNo)
    },
    // 切换场次
    switchSession ({
      feature_appno,
      start_time,
      end_time,
      copy_language,
      copy_type
    }) {
      this.featureNo = feature_appno
      this.filmTime = `${start_time} ${end_time}`
      this.filmTag = `${copy_language} ${copy_type}`
      this.selectSeats = {}
      this.getplanseat()
    },
    // 锁座生成订单
    lockseat () {
      this.lockVisiable = true
      const seatNo = []
      const seatName = []
      const servicAddfee = []
      Object.keys(this.selectSeats).forEach(key => {
        seatNo.push(this.selectSeats[key].seatNo)
        seatName.push(this.selectSeats[key].seatPieceName)
        servicAddfee.push(this.selectSeats[key].service_addfee)
      })
      lockseat({
        cinema_id: this.cinemaId,
        feature_appno: this.featureNo,
        film_no: this.filmNo,
        uid: this.userInfo.id,
        mobile: this.userInfo.mobile,
        seat_no: seatNo.join(','),
        seat_name: seatName.join(','),
        service_addfee: servicAddfee.join(','),
        ticket_price: this.totalPrice
      })
        .then(({ data }) => {
          this.lockVisiable = false
          this.$router.push({
            name: 'movieConfirmOrder',
            query: {
              orderId: data.order_id
            }
          })
        })
        .catch(err => {
          this.lockVisiable = false
          if (err.code === 201) {
            this.lockseatFailVisiable = true
            const seatArray = err.seat_no.split(',')
            seatArray.forEach(key => {
              this.getplanseat()
              this.deleteSeat(key)
            })
          }
        })
    },
    // 锁座中loading效果
    rateLock () {
      this.timer = setInterval(() => {
        if (this.currentRate < 100) {
          this.currentRate++
        } else {
          this.currentRate = 0
        }
      }, 10)
    },
    // 座位class
    creatSeatClass (col) {
      const className = []

      // 先判断是否不可售
      if (col.seatState === -1) {
        className.push('unsold')
      } else {
        const colorClass = ['seat-bass', 'seat-moderate', 'seat-high']
        const index = this.seatPrices.findIndex(e => e === col.seat_price)
        className.push(colorClass[index])
      }
      return className
    }
  },
  filters: {
    // 根据价格座位显示不同的颜色
    seatColorClass (value) {
      const colorClass = ['seat-bass', 'seat-moderate', 'seat-high']
      return colorClass[value]
    }
  },
  watch: {
    lockVisiable (val) {
      if (val) {
        this.rateLock()
      } else if (this.timer) {
        clearInterval(this.timer)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.seat-price-list {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  padding: 0 100px;
  background: #fff;
  .seat-price {
    display: flex;
    align-items: center;
    font-size: 30px;
    color: #8f8f94;
    .seat {
      margin-right: 10px;
      background: #fff;
    }
  }
  .seat-price + .seat-price {
    margin-left: 50px;
  }
}
.center-container {
  display: flex;
  justify-content: center;
  .seat-container {
    align-items: center;
  }
}
.seat-container {
  display: inline-flex;
  flex-direction: column;
  padding: 40px;
  .seat-row {
    display: flex;
    margin-bottom: 10px;
  }
  .seat-box {
    display: flex;
    min-width: 20px;
  }
  .seat-box + .seat-box {
    margin-left: 10px;
  }
  /* 屏幕 */
  .screen-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 56px;
    margin-bottom: 60px;
    // overflow: hidden;
    .screen {
      width: 594px;
      height: 56px;
      // border: 6px solid #eb5841;
      // border-radius: ~'50% 50% 0 0 / 100% 100% 0 0';
      // border-bottom: none;
      // background: linear-gradient(0deg, #eb58414d, #fff);
    }
    .screnn-text {
      margin-top: -22px;
      font-size: 26px;
      font-weight: 500;
      line-height: 1;
      color: #8f8f94;
      text-align: center;
    }
  }
  .seat-active {
    background: #55b862;
    border-color: #55b862;
    font-size: 0.37333rem;
    line-height: 36px;
    color: #fff;
    text-align: center;
    font-family: "tficonfont" !important;
    &::before {
      content: "\e634";
    }
  }
}
.seat {
  display: inline-block;
  width: 36px;
  height: 36px;
  background: #fff;
  border: 2px solid #aaaaaa;
  border-radius: 6px;
}
.seat-bass {
  border-color: #55b862;
}
.seat-moderate {
  border-color: #ffa110;
}
.seat-high {
  border-color: #eb5841;
}
.choosable {
  background: #ffffff;
}
.selected {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #55b862;
  border-color: #55b862;
  font-size: 28px;
  line-height: 1;
  color: #fff;
}
.soldout {
  background: #aaaaaa80;
  border-color: #aaaaaa80;
}
.unsold {
  background: #f2f2f4;
}
.seat-footer {
  // height: 386px;
  padding: 30px;
  background: #f2f2f4;
  .seat-status-container {
    display: flex;
    height: 36px;
    padding: 0 30px;
    margin-bottom: 30px;
    font-size: 30px;
    color: #8f8f94;
    .seat-status {
      display: flex;
      align-items: center;
      .seat {
        margin-right: 10px;
      }
    }
    .seat-status + .seat-status {
      margin-left: 50px;
    }
  }
  .film-box {
    // height: 142px;
    margin-bottom: 30px;
    padding: 30px 20px;
    background: #ffffff;
    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    .tf-flex {
      justify-content: space-between;
    }
    .film-title {
      font-size: 34px;
      color: #222;
    }
    .film-switch {
      font-size: 24px;
      color: #448fe4;
    }
    .film-info {
      margin-top: 10px;
      font-size: 26px;
      color: #666;
    }
    .film-tag {
      padding: 7px 12px;
      margin-left: 10px;
      background: #f2f2f4cc;
      border-radius: 4px;
      font-size: 24px;
      line-height: 1;
      color: #aaaaaa;
    }
    .session-container {
      display: flex;
      overflow-x: auto;
      overflow-y: hidden;
      margin-top: 24px;
      .session-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        // width: 140px;
        height: 134px;
        padding: 20px;
        background: #eb584208;
        border-radius: 4px;
        .session-start {
          margin-bottom: 10px;
          font-size: 34px;
          line-height: 1;
          color: #222;
        }
        .session-tag {
          margin-bottom: 8px;
          font-size: 24px;
          line-height: 1;
          color: #8f8f94;
        }
        .session-price {
          font-size: 24px;
          line-height: 1;
          color: #222;
        }
      }
      .session-item + .session-item {
        margin-left: 20px;
      }
      .session-item-active {
        border: 2px solid #eb5841;
      }
    }
  }
  .select-seat-container {
    display: flex;
    margin-top: 30px;
    padding-top: 30px;
    overflow-x: auto;
    overflow-y: hidden;
    border-top: 2px solid #f0f0f0;
    .select-seat-item {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      height: 80px;
      padding: 4px 20px;
      background: #f0f0f0;
      border-radius: 4px;
    }
    .select-seat {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-right: 20px;
      font-size: 24px;
      color: #222;
      .select-seat-piece {
        margin-bottom: 6px;
      }
    }
    .tf-icon-guanbi {
      font-size: 24px;
      color: #aaaaaa;
    }
    .select-seat-item + .select-seat-item {
      margin-left: 20px;
    }
  }
  /deep/ .van-button--large {
    border-radius: 44px !important;
  }
}
.lock-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 285px;
  /deep/ .van-circle {
    width: 128px !important;
    height: 128px !important;
    margin-top: 60px;
  }
  .lock-img {
    width: 128px;
    height: 128px;
  }
  .tf-text-lg {
    margin-top: 40px;
    color: #000;
  }
}
.lockseat-fail-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 60px 50px;
  .lock-fail {
    width: 92px;
    height: 82px;
    margin: 26px 0 60px;
  }
  .tf-text-primary {
    font-size: 30px;
    color: #eb5841;
  }
  /deep/ .van-button {
    width: 100%;
    margin-top: 30px;
  }
}
</style>

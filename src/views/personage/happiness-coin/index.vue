<template>
  <div class="tf-bg-white">
    <div class="page-bg">
      <van-nav-bar
        title="幸福币"
        :fixed="true"
        :border="false"
        left-arrow
        right-text="明细"
        @click-left="$router.go(-1)"
        @click-right="goCoinRecord"
      ></van-nav-bar>
      <div class="sign-box tf-row-space-between">
        <div class="tf-row-center tf-flex-item">
          <div class="tf-icon tf-icon-moneycollect coin-icon"></div>
          <div class="coin-number">2333</div>
        </div>
        <div class="sign-tag" :class="{'sign-tag--complete': true}" @click="signIn(true)">{{true ? '已签到' : '签到'}}</div>
      </div>
    </div>
    <div class="coin-main-box">
      <div class="tf-row-space-between tf-padding-lg">
        <div class="function-box">
          <div class="tf-icon tf-icon-scan function-box__icon"></div>
          <div class="function-box__text">扫一扫</div>
        </div>
        <div class="function-box">
          <div class="tf-icon tf-icon-barcode function-box__icon function-box__icon--pay"></div>
          <div class="function-box__text">付款码</div>
        </div>
        <div class="function-box">
          <div
            class="tf-icon tf-icon-moneycollect function-box__icon function-box__icon--payreceipt"
          ></div>
          <div class="function-box__text">收款码</div>
        </div>
      </div>
      <div class="happiness-coin-title">幸福币任务</div>
      <div class="task-box">
        <div class="task-item" v-for="(item, i) in taskList" :key="i">
          <div class="tf-row tf-flex-item">
            <div class="task-item__icon"></div>
            <div class="tf-space-between">
              <div class="task-item__title">{{item.name}}</div>
              <div class="tf-row">
                <div class="task-item__remarks">{{item.content}}获得</div>
                <div class="task-item__remarks--gold">{{item.coin}}幸福币</div>
              </div>
            </div>
          </div>
          <div v-if="item.status" class="task-item__number">+{{item.coin}}</div>
          <div v-else class="task-item__btn">去完成</div>
        </div>
      </div>
      <div class="sale-box">
        <div class="happiness-coin-title">幸福币特卖区</div>
        <div class="purchase-history" @click="goBuyRecord">购买记录</div>
      </div>
      <div class="sale-area">
        <div class="commodity-box" v-for="(item, i) in saleList" :key="i">
          <img class="commodity-image" :src="item.image" />
          <div class="commodity-name">{{item.name}}</div>
          <div class="tf-row" style="align-items: flex-end;">
            <div class="commodity-current-price">￥{{item.specialPrice}}</div>
            <div class="commodity-original-price">￥{{item.originalPrice}}</div>
          </div>
          <div class="commodity-coin">{{item.coin}}幸福币</div>
        </div>
      </div>
    </div>
    <tf-calendar v-model="showCalendar" :data="signArr" :curYear="cur_year" :curMonth="cur_month"></tf-calendar>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import tfCalendar from '@/components/tf-calendar'
export default {
  components: {
    [NavBar.name]: NavBar,
    tfCalendar
  },
  data () {
    return {
      showCalendar: false, // 签到日历是否隐藏
      cur_year: 0, // 签到日历展示年份
      cur_month: 0, // 签到日历展示月份
      signArr: [], // 签到日历展示数据
      taskList: [
        {
          name: '完成房间认证',
          content: '开门认证成功',
          coin: 20,
          status: 1
        },
        {
          name: '完成房间认证2',
          content: '开门认证成功2',
          coin: 20,
          status: 0
        }
      ],
      saleList: [
        {
          image: '/static/app-icon.png',
          name: '雨前西湖龙井',
          specialPrice: '240',
          originalPrice: '260',
          coin: '2400'
        }
      ]
    }
  },
  created () {
    let signArr = []
    signArr = [
      {
        date: 28,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },
      {
        date: 29,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 30,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 1,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 2,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 3,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 4,
        is_prev: '',
        is_next: 1,
        is_start: 1,
        is_end: 1,
        is_sign: 1
      },

      {
        date: 5,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 6,
        is_prev: '',
        is_next: 1,
        is_start: 1,
        is_end: '',
        is_sign: 1
      },

      {
        date: 7,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: 1
      },

      {
        date: 8,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: 1
      },

      {
        date: 9,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: 1,
        is_sign: 1
      },

      {
        date: 10,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 11,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 12,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 13,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 14,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 15,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 16,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 17,
        is_prev: '',
        is_next: 1,
        is_start: 1,
        is_end: 1,
        is_sign: 1
      },

      {
        date: 18,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 19,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 20,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 21,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 22,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 23,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 24,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 25,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 26,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 27,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 28,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 29,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 30,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 31,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      },

      {
        date: 1,
        is_prev: '',
        is_next: 1,
        is_start: '',
        is_end: '',
        is_sign: ''
      }
    ]
    this.signArr = signArr
  },
  methods: {
    /* 签到事件 */
    signIn (status) {
      // 已签到，则打开签到日历
      if (status) {
        this.showCalendar = true
      } else {
        this.signReq()
      }
    },
    /* 签到请求 */
    signReq () {

    },
    goCoinRecord () {
      this.$router.push('/pages/personage/happiness-coin/coin-record')
    },
    goBuyRecord () {
      this.$router.push('/pages/personage/happiness-coin/buy-record')
    }
  }
}
</script>

<style lang="less" scoped>
@gold-color: #ca864e;
.tf-bg-white {
  @flex-column();
  height: 100%;
}
.page-bg {
  width: 750px;
  height: 378px;
  padding-top: 88px;
  background-color: #fbe1ca;
}
.nav-bar {
  flex-direction: row;
  justify-content: space-around;
  height: 44px;
  padding: 0 15px;
}
.navbar-title {
  flex: 1;
  font-size: 17px;
  line-height: 44px;
  text-align: center;
  font-weight: 500;
  color: @gold-color;
}
.navbar-text {
  color: @gold-color;
  line-height: 44px;
  font-size: 26px;
}
.sign-tag {
  width: 240px;
  height: 88px;
  line-height: 88px;
  text-align: center;
  color: #fff;
  font-size: 30px;
  background-image: linear-gradient(to right, @red, @red-dark);
  border-top-left-radius: 44px;
  border-bottom-left-radius: 44px;
}
.sign-tag--complete {
  color: @gray-7;
  background-image: none;
  background-color: @gray-2;
}
.sign-box {
  height: 290px;
  align-items: center;
}
.coin-main-box {
  flex: 1;
  overflow: auto;
}
.coin-number {
  font-size: 72px;
  line-height: 72px;
  font-weight: 500;
  color: @gold-color;
}
.coin-icon {
  @flex-column();
  font-size: 36px;
  color: @gold-color;
  justify-content: flex-end;
  margin-right: 20px;
}
.function-box {
  padding: 0 46px;
}
.function-box__text {
  font-size: 30px;
  text-align: center;
}
.function-box__icon {
  width: 98px;
  height: 98px;
  line-height: 98px;
  background-image: linear-gradient(to bottom right, @orange, @orange-dark);
  border-radius: 49px;
  margin-bottom: 15px;
  color: #fff;
  text-align: center;
  font-size: 50px;
}
.function-box__icon--pay {
  background-image: linear-gradient(to bottom right, @green, @green-dark);
}
.function-box__icon--payreceipt {
  background-image: linear-gradient(to bottom right, @blue, @blue-dark);
}
.happiness-coin-title {
  font-size: 34px;
  font-weight: 500;
  color: @gold-color;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 38px;
}
.task-box {
  padding: 30px;
  margin: 0 30px;
  background-color: #fef8f2;
  border-radius: 10px;
}
.task-item {
  @flex();
  justify-content: space-between;
  align-items: center;
  height: 90px;
}
.task-item + .task-item {
  margin-top: 60px;
}
.task-item__icon {
  width: 90px;
  height: 90px;
  line-height: 90px;
  text-align: center;
  background-color: #ffdec8;
  border-radius: 45px;
  margin-right: 20px;
}
.task-item__title {
  font-size: 30px;
  font-weight: 500;
}
.task-item__remarks {
  font-size: 24px;
  color: @gray-7;
}
.task-item__remarks--gold {
  font-size: 24px;
  color: @gold-color;
}
.task-item__number {
  width: 150px;
  text-align: center;
  font-size: 38px;
  line-height: 90px;
  font-weight: 500;
  color: #eb5841;
}
.task-item__btn {
  width: 150px;
  height: 46px;
  line-height: 46px;
  text-align: center;
  background-image: linear-gradient(to right, @red, @red-dark);
  border-radius: 23px;
  font-size: 24px;
  color: #fff;
}
.purchase-history {
  position: absolute;
  top: 0;
  right: 30px;
  font-size: 24px;
  color: @gray-7;
  line-height: 44px;
}
.sale-area {
  @flex();
  padding: 0 30px;
  justify-content: space-between;
  flex-wrap: wrap;
}
.commodity-box {
  margin-bottom: 30px;
}
.commodity-image {
  width: 330px;
  height: 330px;
}
.commodity-name {
  font-size: 28px;
  margin: 20px 0;
}
.commodity-current-price {
  font-size: 30px;
  margin-right: 10px;
}
.commodity-original-price {
  font-size: 24px;
  color: @gray-7;
  text-decoration: line-through;
}
.commodity-coin {
  margin-top: 15px;
  font-size: 30px;
  color: @red-dark;
}
.sale-box {
  margin-top: 80px;
  @relative();
}
/deep/ .van-nav-bar {
  background: none;
  z-index: 0;
  .van-icon,
  .van-nav-bar__title,
  .van-nav-bar__text {
    color: @gold-color;
  }
}
</style>

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
        <div class="sign-tag sign-tag--complete">签到</div>
      </div>
    </div>
    <div class="coin-main-box">
      <div class="tf-row-space-between tf-padding-lg">
        <div class="function-box">
          <div class="tf-icon function-box__icon">&#xe819;</div>
          <div class="function-box__text">扫一扫</div>
        </div>
        <div class="function-box">
          <div class="tf-icon function-box__icon function-box__icon--pay">&#xe81f;</div>
          <div class="function-box__text">付款码</div>
        </div>
        <div class="function-box">
          <div class="tf-icon function-box__icon function-box__icon--payreceipt">&#xe80b;</div>
          <div class="function-box__text">收款码</div>
        </div>
      </div>
      <div class="happiness-coin-title">幸福币任务</div>
      <div class="task-box">
        <div class="task-item">
          <div class="tf-row tf-flex-item">
            <div class="task-item__icon"></div>
            <div class="tf-space-between">
              <div class="task-item__title">完成房间认证</div>
              <div class="tf-row">
                <div class="task-item__remarks">开门认证成功获得</div>
                <div class="task-item__remarks--gold">20幸福币</div>
              </div>
            </div>
          </div>
          <!-- <text class="task-item__number">+20</text> -->
          <div class="task-item__btn">去完成</div>
        </div>
      </div>
      <div class="sale-box">
        <div class="happiness-coin-title">幸福币特卖区</div>
        <div class="purchase-history" @click="goBuyRecord">购买记录</div>
      </div>
      <div class="sale-area">
        <div class="commodity-box">
          <img class="commodity-image" src="/static/app-icon.png" />
          <div class="commodity-name">雨前西湖龙井</div>
          <div class="tf-row" style="align-items: flex-end;">
            <div class="commodity-current-price">￥240</div>
            <div class="commodity-original-price">￥260</div>
          </div>
          <div class="commodity-coin">1000幸福币</div>
        </div>
        <div class="commodity-box">
          <img class="commodity-image" src="/static/app-icon.png" />
          <div class="commodity-name">雨前西湖龙井</div>
          <div class="tf-row" style="align-items: flex-end;">
            <div class="commodity-current-price">￥240</div>
            <div class="commodity-original-price">￥260</div>
          </div>
          <div class="commodity-coin">1000幸福币</div>
        </div>
        <div class="commodity-box">
          <img class="commodity-image" src="/static/app-icon.png" />
          <div class="commodity-name">雨前西湖龙井</div>
          <div class="tf-row" style="align-items: flex-end;">
            <div class="commodity-current-price">￥240</div>
            <div class="commodity-original-price">￥260</div>
          </div>
          <div class="commodity-coin">1000幸福币</div>
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
      signArr: [] // 签到日历展示数据
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
  color: #ca864e;
}
.navbar-text {
  color: #ca864e;
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
  background-image: linear-gradient(
    to right,
    rgba(249, 134, 107, 1),
    rgba(235, 88, 65, 1)
  );
  border-top-left-radius: 44px;
  border-bottom-left-radius: 44px;
}
.sign-tag--complete {
  color: #8f8f94;
  background-image: none;
  background-color: #f0f0f0;
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
  background-image: linear-gradient(
    to bottom right,
    rgba(255, 192, 23, 1),
    rgba(255, 161, 16, 1)
  );
  border-radius: 49px;
  margin-bottom: 15px;
  color: #fff;
  text-align: center;
  font-size: 50px;
}
.function-box__icon--pay {
  background-image: linear-gradient(
    to bottom right,
    rgba(111, 202, 123, 1),
    rgba(85, 184, 98, 1)
  );
}
.function-box__icon--payreceipt {
  background-image: linear-gradient(
    to bottom right,
    rgba(99, 166, 241, 1),
    rgba(68, 143, 228, 1)
  );
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
  background-image: linear-gradient(
    to bottom,
    rgba(249, 134, 107, 1),
    rgba(235, 88, 65, 1)
  );
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
  color: #eb5841;
}
.sale-box {
  margin-top: 80px;
  @relative();
}
/deep/ .van-nav-bar {
  background: none;
  .van-icon,
  .van-nav-bar__title,
  .van-nav-bar__text {
    color: @gold-color;
  }
}
</style>

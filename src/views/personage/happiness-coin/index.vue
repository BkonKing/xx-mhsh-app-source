<template>
  <div class="tf-bg-white">
    <div class="page-bg">
      <van-nav-bar
        title="幸福币"
        :fixed="true"
        :border="false"
        placeholder
        left-arrow
        right-text="明细"
        @click-left="$router.go(-1)"
        @click-right="goCoinRecord"
      ></van-nav-bar>
      <div class="sign-box tf-row-space-between">
        <div class="tf-row-center tf-flex-item">
          <div class="tf-icon tf-icon-xingfubi coin-icon"></div>
          <div class="coin-number">{{credits}}</div>
        </div>
        <div
          class="sign-tag"
          :class="{'sign-tag--complete': signinToday == '1'}"
          @click="signIn()"
        >{{signinToday == '1' ? '已签到' : '签到'}}</div>
      </div>
    </div>
    <div class="coin-main-box">
      <div class="tf-row-space-between tf-padding-lg">
        <div class="function-box" @click="goScanCode(1)">
          <img class="function-box__icon" src="@/assets/imgs/credits_saoyisao.png">
          <div class="function-box__text">扫一扫</div>
        </div>
        <div class="function-box" @click="goScanCode(2)">
          <img class="function-box__icon" src="@/assets/imgs/credits_shoukuan.png">
          <div class="function-box__text">付款码</div>
        </div>
        <div class="function-box" @click="goScanCode(3)">
          <img class="function-box__icon" src="@/assets/imgs/credits_fukuan.png">
          <div class="function-box__text">收款码</div>
        </div>
      </div>
      <div class="happiness-coin-title">幸福币任务</div>
      <div class="task-box">
        <div class="task-item" v-for="(item, i) in taskList" :key="i">
          <div class="tf-row tf-flex-item">
            <div class="task-item__icon"></div>
            <div class="tf-space-between">
              <div class="task-item__title">{{item.task_name}}</div>
              <div class="tf-row">
                <div class="task-item__remarks">{{item.remarks}}获得</div>
                <div class="task-item__remarks--gold">{{item.credits}}幸福币</div>
              </div>
            </div>
          </div>
          <div v-if="item.complete" class="task-item__number">+{{item.credits}}</div>
          <div v-else class="task-item__btn">去完成</div>
        </div>
      </div>
      <div class="sale-box">
        <div class="happiness-coin-title">幸福币特卖区</div>
        <div class="purchase-history" @click="goBuyRecord">购买记录</div>
      </div>
      <div class="sale-area">
        <div class="commodity-box" v-for="(item, i) in creditsGoods" :key="i">
          <img class="commodity-image" :src="item.thumb" />
          <div class="commodity-name">{{item.goods_name}}</div>
          <div class="tf-row" style="align-items: flex-end;">
            <div class="commodity-current-price">￥{{item.s_price}}</div>
            <div class="commodity-original-price">￥{{item.y_price}}</div>
          </div>
          <div class="commodity-coin">{{item.credits}}幸福币</div>
        </div>
      </div>
    </div>
    <tf-calendar v-model="showCalendar"></tf-calendar>
  </div>
</template>

<script>
import { NavBar, Toast } from 'vant'
import tfCalendar from '@/components/tf-calendar'
import { signin, getCreditsAccount } from '@/api/personage'
import { getCreditsGoodsList } from '@/api/home'
export default {
  components: {
    [NavBar.name]: NavBar,
    tfCalendar
  },
  data () {
    return {
      showCalendar: false, // 签到日历是否隐藏
      signinToday: '1', // 今日是否签到
      credits: 0,
      taskList: [],
      creditsGoods: [],
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
    this.getCreditsAccount()
    this.getCreditsGoodsList()
  },
  methods: {
    /* 获取幸福币信息 */
    getCreditsAccount () {
      getCreditsAccount().then(({ data }) => {
        this.signinToday = data.signin_today
        this.taskList = data.task_list
        this.credits = data.credits
      })
    },
    /* 签到事件 */
    signIn () {
      // 已签到，则打开签到日历
      if (this.signinToday == '1') {
        this.showCalendar = true
      } else {
        this.signin()
      }
    },
    /* 签到请求 */
    signin () {
      signin().then(res => {
        Toast({
          message: '签到成功   幸福币+10'
        })
        this.signinToday = '1'
      })
    },
    /* 幸福币明细 */
    goCoinRecord () {
      this.$router.push('/pages/personage/happiness-coin/coin-record')
    },
    /* 购买详情 */
    goBuyRecord () {
      this.$router.push('/pages/personage/happiness-coin/buy-record')
    },
    /* 扫一扫 */
    goScanCode (current) {
      this.$router.push({
        name: 'scanCodeIndex',
        query: {
          current
        }
      })
    },
    /* 获取幸福币专区 */
    getCreditsGoodsList () {
      getCreditsGoodsList().then(res => {
        this.creditsGoods = res.data
      })
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
  width: 110px;
  height: 110px;
  border-radius: 50%;
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

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
          <div class="coin-number">{{ credits }}</div>
        </div>
        <van-button
          v-preventReClick
          :loading="signLoading"
          class="sign-tag"
          :class="{ 'sign-tag--complete': signinToday !== 0 }"
          @click="signIn()"
          >{{ signinToday === 1 ? "已签到" : "签到" }}</van-button
        >
      </div>
    </div>
    <div class="coin-main-box">
      <div class="tf-row-space-between tf-padding-lg">
        <div class="function-box" @click="goScanCode(1)">
          <img
            class="function-box__icon"
            src="@/assets/imgs/credits_saoyisao.png"
          />
          <div class="function-box__text">扫一扫</div>
        </div>
        <div class="function-box" @click="goScanCode(2)">
          <img
            class="function-box__icon"
            src="@/assets/imgs/credits_shoukuan.png"
          />
          <div class="function-box__text">付款码</div>
        </div>
        <div class="function-box" @click="goScanCode(3)">
          <img
            class="function-box__icon"
            src="@/assets/imgs/credits_fukuan.png"
          />
          <div class="function-box__text">收款码</div>
        </div>
      </div>
      <template v-if="taskList && taskList.length">
        <div class="happiness-coin-title">幸福币任务</div>
        <div class="task-box">
          <div class="task-item" v-for="(item, i) in taskList" :key="i">
            <div class="tf-row tf-flex-item">
              <img
                class="task-item__icon"
                v-if="item.task_type == 1"
                src="@/assets/imgs/credits_sign.png"
              />
              <img
                class="task-item__icon"
                v-else-if="item.task_type == 2"
                src="@/assets/imgs/credits_renzheng.png"
              />
              <img
                class="task-item__icon"
                v-else-if="item.task_type == 3"
                src="@/assets/imgs/credits_yunmenjin.png"
              />
              <img
                class="task-item__icon"
                v-else-if="item.task_type == 4"
                src="@/assets/imgs/credits_wenjuan.png"
              />
              <img
                class="task-item__icon"
                v-else-if="item.task_type == 5"
                src="@/assets/imgs/credits_toupiao.png"
              />
              <img
                class="task-item__icon"
                v-else-if="item.task_type == 7"
                src="@/assets/imgs/credits_goufang.png"
              />
              <div class="tf-space-between">
                <div class="task-item__title">{{ item.task_name }}</div>
                <!-- 朋友到访、购房奖励 -->
                <div v-if="item.task_type == 7">
                  <div class="task-item__remarks">
                    {{ item.task_type | taskText }}
                  </div>
                  <div v-if="yxlpNum" class="tf-row task-item__remarks">
                    获得
                    <div class="task-item__remarks--gold">
                      {{ item.credits }}幸福币起
                    </div>
                  </div>
                </div>
                <!-- 其他 -->
                <div class="tf-row" v-else>
                  <!-- 签到 -->
                  <template v-if="item.task_type === '1'">
                    <div class="task-item__remarks">
                      <!-- 游客 -->
                      <template v-if="userType == 0">
                        每日签到获得
                      </template>
                      <!-- 有认证用户 -->
                      <template v-else>
                        <span
                          class="tf-icon tf-icon-zhushishuoming"
                          @click="signRuledialog = true"
                        ></span>
                        <!-- 签到幸福币已达上限，不可签到 -->
                        <template v-if="signinToday === 2"
                          >明天要早点来哦</template
                        >
                        <template v-else>签到可获得</template>
                      </template>
                    </div>
                    <div
                      v-if="signinToday !== 2"
                      class="task-item__remarks--gold"
                    >
                      {{ item.credits }}幸福币
                    </div>
                  </template>
                  <!-- 其他 -->
                  <template v-else>
                    <div class="task-item__remarks">
                      {{ item.task_type | taskText }}获得
                    </div>
                    <div class="task-item__remarks--gold">
                      {{ item.credits }}幸福币
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div v-if="item.complete" class="task-item__number">
              +{{ item.credits }}
            </div>
            <van-button
              v-else
              v-preventReClick
              :loading="signLoading && item.task_type == 1"
              class="task-item__btn"
              v-txAnalysis="{ eventId: 48 }"
              :disabled="signinToday === 2 && item.task_type == 1"
              @click="complete(item)"
              >{{
                item.task_type == 7
                  ? "去推荐"
                  : signinToday === 2 && item.task_type == 1
                  ? "签到"
                  : "去完成"
              }}</van-button
            >
          </div>
        </div>
      </template>
      <div class="sale-box">
        <div class="happiness-coin-title">幸福币特卖区</div>
        <div class="purchase-history" @click="goBuyRecord">购买记录</div>
      </div>
      <div class="sale-area">
        <div
          class="commodity-box"
          v-for="(item, i) in creditsGoods"
          :key="i"
          @click="goCoinCommodity(item)"
        >
          <img class="commodity-image" :src="item.thumb" />
          <div class="commodity-name">{{ item.goods_name }}</div>
          <div class="tf-row" style="align-items: flex-end;">
            <div class="commodity-current-price">￥{{ item.s_price }}</div>
            <div class="commodity-original-price">￥{{ item.y_price }}</div>
          </div>
          <div class="commodity-coin">{{ item.credits }}幸福币</div>
        </div>
      </div>
    </div>
    <tf-calendar v-model="showCalendar"></tf-calendar>
    <sign-rule-dialog v-model="signRuledialog"></sign-rule-dialog>
  </div>
</template>

<script>
import tfCalendar from '@/components/tf-calendar'
import SignRule from './components/SignRule'
import { signin, getCreditsAccount, getYxlpList } from '@/api/personage'
import { getCreditsGoodsList } from '@/api/home'
import { handlePermission } from '@/utils/permission'
import { mapGetters } from 'vuex'
export default {
  components: {
    tfCalendar,
    [SignRule.name]: SignRule
  },
  data () {
    return {
      showCalendar: false, // 签到日历是否隐藏
      signinToday: 1, // 今日是否签到
      credits: 0, // 当前幸福币
      taskList: [], // 任务列表  task_type： 1: 签到 2：认证成功 3：首次开门 7:朋友到访、购房奖励
      creditsGoods: [], // 幸福币商品列表
      signLoading: false, // 签到按钮loading
      mj_status: true, // 是否有门禁
      yxlpNum: 0, // 推荐购房楼盘列表
      signRuledialog: false
    }
  },
  computed: {
    ...mapGetters(['userType']) // 1业主、2业主成员、3租户、4租户成员
  },
  created () {
    this.getCreditsAccount()
    this.getCreditsGoodsList()
  },
  methods: {
    /* 获取幸福币信息 */
    getCreditsAccount () {
      getCreditsAccount().then(({ data }) => {
        this.signinToday = data.signin_status
        this.taskList = data.task_list
        this.credits = data.credits
        this.mj_status = data.mj_status
        this.getYxlpList()
        // console.log('任务列表', data.task_list)
      })
    },
    /* 签到事件 */
    signIn () {
      if (this.signinToday === 1) {
        // 已签到，则打开签到日历
        this.showCalendar = true
      } else if (this.signinToday === 2) {
        // 不可签到，打开签到规则弹窗
        this.signRuledialog = true
      } else {
        this.signin()
      }
    },
    /* 签到请求 */
    signin () {
      this.signLoading = true
      signin()
        .then(res => {
          this.signLoading = false
          this.$toast({
            message: res.message
          })
          this.getCreditsAccount()
          this.mtjEvent({
            eventId: 4
          })
        })
        .catch(() => {
          this.signLoading = false
        })
      handlePermission({
        name: 'location',
        title: '定位服务未开启',
        message: '为了提供更好服务，需要您开启定位'
      }).then(() => {
        this.signLoading = true
        signin()
          .then(res => {
            this.signLoading = false
            this.$toast({
              message: res.message
            })
            this.getCreditsAccount()
            this.mtjEvent({
              eventId: 4
            })
          })
          .catch(() => {
            this.signLoading = false
          })
      })
    },
    /* 幸福币明细 */
    goCoinRecord () {
      this.$router.push({ name: 'happinessCoinRecord' })
    },
    /* 购买详情 */
    goBuyRecord () {
      this.$router.push({ name: 'happinessCoinBuyRecord' })
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
    },
    /* 幸福币专区商品详情 */
    goCoinCommodity (item) {
      this.$router.push(`/store/goods-detail?id=${item.id}`)
    },
    /* 幸福币任务去完成跳转 */
    complete ({ task_type: type, source_id: id }) {
      switch (type) {
        case '1':
          this.signin()
          break
        case '2':
          this.$router.push(
            '/pages/personage/house/attestation?type=1&mode=0&select=1'
          )
          break
        case '3':
          if (this.mj_status == '0') {
            this.$toast('小区暂未开放此功能')
          } else {
            this.authentication('/pages/butler/entrance/index')
          }
          break
        case '7':
          this.$router.push('/pages/personage/happiness-coin/recomBuyHouse')
          break
        default:
          this.authentication(`/pages/butler/questionnaire/details?id=${id}`)
          break
      }
    },
    /* 认证提醒 */
    authentication (url) {
      if (this.userType == 0) {
        this.$dialog
          .confirm({
            title: '提示',
            message: '您尚未认证房间，是否去认证？',
            confirmButtonText: '去认证'
          })
          .then(res => {
            this.$router.push(
              '/pages/personage/house/attestation?type=1&mode=0&select=1'
            )
          })
      } else {
        this.$router.push(url)
      }
    },
    // 获取推荐购房楼盘
    getYxlpList () {
      getYxlpList().then(({ data }) => {
        this.yxlpNum = (data && data.length) || 0
      })
    }
  },
  filters: {
    taskText (value) {
      let text = '参与'
      switch (parseInt(value)) {
        case 1:
          text = '每日签到'
          break
        case 2:
          text = '认证成功'
          break
        case 3:
          text = '首次开门'
          break
        case 7:
          text = '朋友到访、购房奖励'
          break
      }
      return text
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
  background: url("../../../assets/imgs/credits_header.png") no-repeat;
  background-size: cover;
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
  border-width: 0;
  border-radius: 0;
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
  -webkit-overflow-scrolling: touch;
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
  min-height: 90px;
}
.task-item + .task-item {
  margin-top: 60px;
}
.task-item__icon {
  width: 90px;
  height: 90px;
  background-color: #ffdec8;
  border-radius: 45px;
  margin-right: 20px;
}
.task-item__title {
  margin-bottom: 6px;
  font-size: 30px;
  font-weight: 500;
}
.task-item__remarks {
  font-size: 24px;
  color: @gray-7;
  .tf-icon-zhushishuoming {
    margin-right: 10px;
  }
}
.task-item__remarks--gold {
  margin-left: 6px;
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
  border: none;
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
  padding-left: 30px;
  justify-content: space-between;
  flex-wrap: wrap;
}
.commodity-box {
  margin-bottom: 30px;
  flex: 1;
}
.commodity-image {
  width: 330px;
  height: 330px;
  background: #f4f4f4;
  border-radius: 10px;
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

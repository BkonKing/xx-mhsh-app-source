<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="生活缴费"
      :fixed="true"
      :border="false"
      left-arrow
      placeholder
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-shijian" @click="goLivePayList"></span>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <div class="house-dropdown">
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="selectedHouse"
            :disabled="houseList.length < 2"
            :options="houseList"
            @change="houseChange"
          />
        </van-dropdown-menu>
      </div>
      <van-notice-bar
        v-if="payInfo"
        class="swiper-nav"
        left-icon="warning"
        mode="link"
        background="rgba(249,134,107,0.2)"
        :scrollable="false"
        @click="goPay"
      >
        {{ payInfo }}
      </van-notice-bar>
      <div class="pay-container">
        <template v-if="payList && payList.length > 0">
          <template v-for="(item, index) in payList">
            <tf-picker
              class="date-time-box"
              v-model="item.month_name"
              title="选择时间"
              :key="index"
              :columns="monthList"
              @confirm="queryMonthPay"
            >
              <template v-slot="{ valueText }">
                <div class="tf-text selected-date">
                  {{ valueText
                  }}<span class="tf-icon tf-icon-caret-down"></span>
                </div>
                <div class="pay-info">
                  费用共￥{{ item.common_money }}
                  {{
                    item.already_money
                      ? `&nbsp;已缴费￥${item.already_money}`
                      : ""
                  }}
                  {{
                    item.stay_money ? `&nbsp;待缴费￥${item.stay_money}` : ""
                  }}
                </div>
              </template>
            </tf-picker>
            <ul class="pay-list-container" :key="`ul${index}`">
              <li
                v-for="(li, i) in item.child"
                class="pay-list-item"
                @click="goCostDetail(li)"
                :key="i"
              >
                <div class="pay-list-item-left">
                  <img class="pay-type-icon" :src="li.genre_icon" />
                  <span class="pay-title">{{ li.genre_name }}</span>
                </div>
                <div class="pay-list-item-right">
                  <div
                    class="pay-number"
                    :style="{
                      color: li.order_status == '2' ? '#222' : '#EB5841'
                    }"
                  >
                    ￥{{ li.money }}
                  </div>
                  <div class="pay-status">
                    {{ li.order_status | orderStatusText }}
                  </div>
                </div>
              </li>
            </ul>
          </template>
        </template>
        <template v-else>
          <div class="pay-detail-container">
            <img class="pay-detail-img" src="@/assets/imgs/no-live-pay.png" />
            <div class="pay-detail-text">暂无待缴费用</div>
          </div>
        </template>
      </div>
    </div>
    <div v-if="payInfo" class="tf-padding">
      <van-button v-preventReClick size="large" type="danger" @click="goPay"
        >缴费</van-button
      >
    </div>
  </div>
</template>

<script>
import tfPicker from '@/components/tf-picker/index'
import { getLifePayList } from '@/api/butler'
import filters from './filters'
import { mapGetters } from 'vuex'
export default {
  name: 'livePayIndex',
  components: {
    tfPicker
  },
  data () {
    return {
      selectedHouse: '',
      houseList: [],
      first: true,
      payInfo: '', // 缴费信息
      payList: [], // 待缴费列表
      monthList: [] // 缴费月份列表
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'currentProject'])
  },
  activated () {
    if (this.first) {
      this.getLifePayList({}, true)
      return
    }
    const [project_id, expenses_house_id] = this.selectedHouse.split('-')
    this.getLifePayList({
      expenses_house_id,
      project_id
    })
  },
  methods: {
    // 房屋切换
    houseChange () {
      this.searchLifePayList()
    },
    // 查询时间缴费
    queryMonthPay (value) {
      this.searchLifePayList(value)
    },
    // 条件搜索生活缴费列表
    searchLifePayList (date) {
      const [project_id, expenses_house_id] = this.selectedHouse.split('-')
      this.getLifePayList({
        expenses_house_id,
        project_id,
        setmeal_days: date
      })
    },
    // 获取当前房屋下的生活缴费列表, first是否第一次进入页面刷新
    getLifePayList (params, first) {
      getLifePayList(params).then(
        ({ house_data, table_data, month_data, month_name_text }) => {
          const houseId = this.$route.query.id || this.currentProject.house_id
          let status = false // 是否第一次进入，并且当前房间没有账号
          this.houseList = house_data.map(obj => {
            const {
              project_name,
              fc_info,
              house_id,
              expenses_house_id,
              project_id
            } = obj
            const value = `${project_id}-${expenses_house_id}-${house_id}`
            // 如果是首次渲染，则默认设置选中当前房屋
            if (houseId === house_id && first) {
              this.selectedHouse = value
              this.first = false
            }
            // 如果当前房屋没有账单id
            if (this.selectedHouse === value && !expenses_house_id) {
              status = true
            }
            return {
              text: `${project_name} ${fc_info}`,
              value
            }
          })
          if (status) {
            this.payList = []
            this.monthList = []
            this.payInfo = ''
          } else if (first) {
            this.searchLifePayList()
          } else {
            this.monthList = month_data || []
            this.payInfo = month_name_text
            this.payList = table_data
          }
        }
      )
    },
    // 跳转生活缴费记录页面
    goLivePayList () {
      this.$router.push({
        name: 'livePayRecord'
      })
    },
    // 跳转费用详情
    goCostDetail ({ id: orderId }) {
      const [projectId, id] = this.selectedHouse.split('-')
      this.$router.push({
        name: 'livePayCostDetail',
        query: {
          orderId,
          projectId,
          id
        }
      })
    },
    // 跳转缴费页面
    goPay () {
      const [projectId, id] = this.selectedHouse.split('-')
      this.$router.push({
        name: 'livePayPay',
        query: {
          id,
          projectId
        }
      })
    }
  },
  filters: filters,
  beforeRouteLeave (to, from, next) {
    const names = ['butler']
    if (names.includes(to.name)) {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.tf-body-container {
  margin-bottom: env(safe-area-inset-bottom);
  margin-bottom: constant(safe-area-inset-bottom);
}
/deep/ .van-nav-bar__right {
  padding-right: 0;
}
.swiper-nav {
  height: 66px;
  margin: 30px 20px 0;
  border-radius: 10px;
  /deep/ .van-notice-bar__left-icon {
    margin-right: 10px;
  }
  /deep/ .van-notice-bar__content {
    color: #eb5841;
    font-size: 24px;
  }
  .notice-swipe {
    height: 66px;
    /deep/ .van-swipe-item {
      line-height: 66px;
    }
  }
  /deep/ .van-icon-arrow {
    font-size: 24px !important;
    margin-right: 0;
    &::before {
      font-family: tficonfont;
      content: "\e85d";
    }
  }
}
.house-dropdown {
  padding: 30px 20px;
  background: #fff;
  /deep/ .van-dropdown-menu__bar {
    border-radius: 33px;
    background: #f2f2f4;
    .van-dropdown-menu__item {
      padding-right: 20px;
    }
    .van-dropdown-menu__title {
      color: #222222;
      font-size: 28px;
      &:after {
        margin-top: -10px;
        border-width: 8px;
        border-color: transparent transparent #383838 #383838;
      }
    }
    .van-dropdown-item__option {
      height: 88px;
    }
  }
}
.pay-container {
  padding: 30px 20px;
  .selected-date {
    font-size: 28px;
    color: #222;
  }
  .pay-info {
    font-size: 24px;
    color: #8f8f94;
    margin-top: 10px;
  }
  .pay-list-container {
    width: 100%;
    padding: 10px 30px;
    margin-top: 30px;
    margin-bottom: 30px;
    background: #ffffff;
    border-radius: 10px;
    .pay-list-item {
      display: flex;
      justify-content: space-between;
      height: 135px;
      .pay-list-item-left {
        display: flex;
        align-items: center;
        .pay-type-icon {
          width: 66px;
          height: 66px;
          line-height: 1;
        }
        .pay-title {
          font-size: 30px;
          margin-left: 27px;
        }
      }
      .pay-list-item-right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        .pay-number {
          font-size: 34px;
          font-weight: 600;
        }
        .pay-status {
          font-size: 24px;
          color: #8f8f94;
        }
      }
    }
    .pay-list-item + .pay-list-item {
      border-top: 1px solid #f0f0f0;
    }
  }
  .pay-detail-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    .pay-detail-img {
      width: 483px;
      margin-top: 170px;
      margin-bottom: 120px;
    }
    .pay-detail-text {
      font-size: 28px;
    }
  }
}
/deep/ .van-popup--top {
  width: 650px;
  top: 40px;
  left: 50px;
  padding: 0 30px;
  border-radius: 10px;
  .van-dropdown-item__option {
    height: 110px;
    color: #8f8f94;
    .van-cell__title {
      width: 100%;
    }
  }
  .van-dropdown-item__option + .van-dropdown-item__option {
    border-top: 1px solid #f0f0f0;
  }
  .van-dropdown-item__option--active {
    color: #222;
  }
  .van-cell__value {
    display: none;
  }
}
/deep/ .van-overlay {
  top: 30px;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>

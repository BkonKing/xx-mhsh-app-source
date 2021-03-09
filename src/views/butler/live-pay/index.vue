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
    <div class="house-dropdown">
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="selectedHouse"
          :disabled="houseList.length < 2"
          :options="houseList"
          @change="searchLifePayList"
        />
      </van-dropdown-menu>
    </div>
    <div class="tf-body-container">
      <div class="pay-container" v-if="payList && payList.length > 0">
        <ul class="pay-list-container">
          <template v-for="item in payList">
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
                <span
                  class="pay-number"
                  :style="{
                    color: li.order_status === '2' ? '#222' : '#EB5841'
                  }"
                >
                  {{ li.order_status === "2" ? "" : "-" }}{{ li.money }}</span
                >
                <span class="tf-icon tf-icon-right"></span>
              </div>
            </li>
          </template>
        </ul>
      </div>
      <template v-else>
        <div class="pay-detail-container">
          <img class="pay-detail-img" src="@/assets/imgs/no-live-pay.png" />
          <div class="pay-detail-text">暂无待缴费用</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { getLifePayList } from '@/api/butler'
import { mapGetters } from 'vuex'
export default {
  name: 'livePayIndex',
  data () {
    return {
      selectedHouse: '', // 选中的房间，值为项目ID + 房间账单ID + 房间ID
      houseList: [], // 房间列表
      first: true,
      payInfo: '', // 缴费信息
      payList: [], // 待缴费列表
      monthList: [] // 缴费月份列表
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'currentProject'])
  },
  created () {
    this.getLifePayList({}, true)
  },
  activated () {
    if (this.first) {
      return
    }
    const [project_id, expenses_house_id] = this.selectedHouse.split('-')
    this.getLifePayList({
      expenses_house_id,
      project_id
    })
  },
  methods: {
    // 房屋切换获取生活缴费列表
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
            // 项目ID + 房间账单ID + 房间ID
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
            // 第一次进入获取完房间后，拿到房间账单id需要重新请求一次当前账单数据
            this.searchLifePayList()
          } else {
            // 正常数据赋值
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
    // 跳转生活缴费详情
    goCostDetail ({ id: orderId, money }) {
      const [projectId, id] = this.selectedHouse.split('-')
      // 强制缴费只有其他费用可设置,如果存在强制缴费账单，则需要提醒先缴纳
      var status = false
      var text = '物业费、电梯费' // 需要缴纳的费用
      if (status) {
        this.$dialog
          .alert({
            title: `请先缴清${text}`
          })
          .then(() => {
            this.$router.push({
              name: 'livePayPay',
              query: {
                orderId,
                projectId,
                id
              }
            })
          })
        return
      }
      // 若余额<0，跳转的是缴费，若是余额>=0，跳转是充值页面
      if (money < 0) {
        this.$router.push({
          name: 'livePayTopUp',
          query: {
            orderId,
            projectId,
            id
          }
        })
      } else {
        this.$router.push({
          name: 'livemainPay',
          query: {
            orderId,
            projectId,
            id
          }
        })
      }
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
// 列表
.pay-container {
  padding: 30px 20px;
  .pay-list-container {
    width: 100%;
    padding: 0 30px;
    background: #ffffff;
    border-radius: 10px;
    .pay-list-item {
      display: flex;
      justify-content: space-between;
      height: 148px;
      .pay-list-item-left {
        display: flex;
        align-items: center;
        .pay-type-icon {
          width: 66px;
          height: 66px;
          line-height: 1;
        }
        .pay-title {
          margin-left: 27px;
          font-size: 30px;
          color: #222;
        }
      }
      .pay-list-item-right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .pay-number {
          font-size: 42px;
          font-weight: 600;
        }
        .tf-icon-right {
          margin-left: 28px;
          color: #aaaaaa;
        }
      }
    }
    .pay-list-item + .pay-list-item {
      border-top: 2px solid #f0f0f0;
      border-radius: 1px;
    }
  }
}
// 暂无数据
.pay-detail-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  .pay-detail-img {
    width: 483px;
    margin-bottom: 120px;
  }
  .pay-detail-text {
    font-size: 28px;
    color: #222;
  }
}
// 房屋选择内容
.house-dropdown {
  padding: 30px 20px;
  background: #fff;
  /deep/ .van-dropdown-menu__bar {
    border-radius: 33px;
    background: #f2f2f4;
    box-shadow: initial;
    .van-dropdown-menu__item {
      padding-right: 20px;
    }
    .van-dropdown-menu__title {
      position: initial;
      color: #222222;
      font-size: 28px;
      &:after {
        right: 32px;
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
// 房屋选择窗
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
// 房屋选择遮罩层
/deep/ .van-overlay {
  top: 30px;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>

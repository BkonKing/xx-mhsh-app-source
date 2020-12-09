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
        <van-dropdown-menu @change="houseChange">
          <van-dropdown-item
            v-model="selectedHouse"
            :disabled="houseList.length < 2"
            :options="houseList"
          />
        </van-dropdown-menu>
      </div>
      <van-notice-bar
        v-if="payInfo.total > 0"
        class="swiper-nav"
        left-icon="warning"
        mode="link"
        background="rgba(249,134,107,0.2)"
        :scrollable="false"
        @click="goPay"
      >
        还需缴费￥{{ payInfo.total }}（
        {{ payInfo.current ? `&nbsp;本月￥${payInfo.current}` : "" }}
        {{ payInfo.last ? `&nbsp;往月￥${payInfo.last}` : "" }}
        ）</van-notice-bar
      >
      <div class="pay-container">
        <template v-for="(item, index) in payList">
          <tf-date-time-picker
            class="date-time-box"
            type="year-month"
            v-model="item.date"
            title="选择时间"
            :key="index"
            :max-date="new Date()"
            :formatter="formatterDate"
          >
            <template>
              <div class="selected-date">
                {{ item.date | dateText }}
                <span class="tf-icon tf-icon-caret-down"></span>
              </div>
              <div class="pay-info">
                费用共￥{{ item.total }}
                {{ item.payNum ? `&nbsp;已缴费￥${item.payNum}` : "" }}
                {{ item.unPayNum ? `&nbsp;待缴费￥${item.unPayNum}` : "" }}
              </div>
            </template>
          </tf-date-time-picker>
          <ul class="pay-list-container" :key="`ul${index}`">
            <li
              v-for="(li, index) in item.list"
              class="pay-list-item"
              @click="goCostDetail(li)"
              :key="index"
            >
              <div class="pay-list-item-left">
                <span
                  class="pay-type-icon tf-icon"
                  :class="li.type | payTypeIcon"
                ></span>
                <span class="pay-title">{{ li.type | payTypeText }}</span>
              </div>
              <div class="pay-list-item-right">
                <div class="pay-number" :style="{color: li.payStatus ? '#222' : '#EB5841'}">￥{{ li.number }}</div>
                <div class="pay-status">
                  {{ li.payStatus ? "已缴费" : "待缴费" }}
                </div>
              </div>
            </li>
          </ul>
        </template>
      </div>
    </div>
    <div v-if="payInfo.total > 0" class="tf-padding">
      <van-button v-preventReClick size="large" type="danger" @click="goPay"
        >缴费</van-button
      >
    </div>
  </div>
</template>

<script>
import { NavBar, DropdownMenu, DropdownItem, NoticeBar, Button } from 'vant'
import tfDateTimePicker from '@/components/tf-date-time-picker/index'
import { yzHouse } from '@/api/personage'
import filters from './filters'
import { mapGetters } from 'vuex'
export default {
  name: 'livePayIndex',
  components: {
    [NavBar.name]: NavBar,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [NoticeBar.name]: NoticeBar,
    [Button.name]: Button,
    tfDateTimePicker
  },
  data () {
    return {
      selectedHouse: 0,
      houseList: [],
      payInfo: {},
      payList: [] // 待缴费列表
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'currentProject'])
  },
  created () {
    this.getHouseList()
  },
  methods: {
    // 获取业主房产信息,默认选中当前房屋
    getHouseList () {
      yzHouse().then(res => {
        let data = res.data || []
        data = data.map(obj => {
          const { project_name, fc_info, house_id } = obj
          return {
            text: `${project_name} ${fc_info}`,
            value: house_id
          }
        })
        this.houseList = data
        this.selectedHouse = this.currentProject.house_id
        this.getPayInfo()
      })
    },
    houseChange () {
      this.getPayInfo()
    },
    // 获取当前房屋下的缴费信息
    getPayInfo () {
      this.payInfo = {
        total: 1000,
        current: 200,
        last: 300
      }
      this.payList = [
        {
          date: 1606780800000,
          total: 500,
          payNum: 200,
          unPayNum: 300,
          list: [
            {
              id: 0,
              type: 0,
              payStatus: 1,
              number: 200
            },
            {
              id: 1,
              type: 1,
              payStatus: 0,
              number: 300
            }
          ]
        },
        {
          date: 1604188800000,
          total: 500,
          payNum: 200,
          unPayNum: 300,
          list: [
            {
              id: 2,
              type: 0,
              payStatus: 1,
              number: 200
            },
            {
              id: 3,
              type: 1,
              payStatus: 0,
              number: 300
            }
          ]
        }
      ]
    },
    // 日期选择formatter
    formatterDate (type, val) {
      if (type === 'month') {
        return `${val}月`
      } else if (type === 'year') {
        return `${val}年`
      }
      return val
    },
    // 跳转生活缴费记录页面
    goLivePayList () {
      this.$router.push({
        name: 'livePayRecord'
      })
    },
    // 跳转费用详情
    goCostDetail ({ id }) {
      this.$router.push({
        name: 'livePayCostDetail',
        query: {
          id,
          houseId: this.selectedHouse
        }
      })
    },
    // 跳转缴费页面
    goPay () {
      this.$router.push({
        name: 'livePayPay',
        query: {
          houseId: this.selectedHouse
        }
      })
    }
  },
  filters: filters
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
          font-size: 66px;
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

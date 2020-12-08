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
        <van-dropdown-menu @change="handleChange">
          <van-dropdown-item
            v-model="selectedHouse"
            :disabled="houseList.length < 2"
            :options="houseList"
          />
        </van-dropdown-menu>
      </div>
      <van-notice-bar
        class="swiper-nav"
        left-icon="warning"
        mode="link"
        background="rgba(249,134,107,0.2)"
        :scrollable="false"
        >还需缴费￥300（本月￥200，往月￥100)</van-notice-bar
      >
      <div class="pay-container">
        <tf-date-time-picker
          class="date-time-box"
          type="year-month"
          v-model="date"
          title="选择时间"
          :max-date="new Date()"
        >
          <template>
            <div class="selected-date">
              {{ date || "选择日期" }}
              <span class="tf-icon tf-icon-caret-down"></span>
            </div>
            <div class="pay-info">
              费用共￥300 已缴费￥200 待缴费￥200
            </div>
          </template>
        </tf-date-time-picker>
        <ul class="pay-list-container">
          <li class="pay-list-item" @click="goCostDetail">
            <div class="pay-list-item-left">
              <span class="pay-type-icon tf-icon"></span>
              <span class="pay-title">水费</span>
            </div>
            <div class="pay-list-item-right">
              <div class="pay-number">￥200</div>
              <div class="pay-status">已缴费</div>
            </div>
          </li>
          <li class="pay-list-item">
            <div class="pay-list-item-left">
              <span class="pay-type-icon tf-icon"></span>
              <span class="pay-title">水费</span>
            </div>
            <div class="pay-list-item-right">
              <div class="pay-number">￥200</div>
              <div class="pay-status">已缴费</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="tf-padding">
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
      date: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'currentProject'])
  },
  created () {
    this.getHouseList()
    const date = new Date()
    this.date = `${date.getFullYear()}年${date.getMonth() + 1}月`
  },
  methods: {
    /* 获取业主房产信息 */
    getHouseList () {
      yzHouse().then(res => {
        let data = res.data || []
        data = data.map(obj => {
          const { project_name, fc_info, house_id } = obj
          return {
            text: `${project_name}${fc_info}`,
            value: house_id
          }
        })
        this.houseList = data
        this.selectedHouse = this.currentProject.house_id
      })
    },
    // 跳转生活缴费列表页
    goLivePayList () {
      this.$router.push({
        name: 'livePayRecord'
      })
    },
    // 跳转费用详情
    goCostDetail () {
      this.$router.push({
        name: 'livePayCostDetail'
      })
    },
    // 跳转缴费页面
    goPay () {
      this.$router.push({
        name: 'livePayPay'
      })
    },
    handleChange () {}
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
  margin: 40px 20px 0;
  border-radius: 10px;
  /deep/ .van-notice-bar__left-icon {
    margin-right: 10px;
  }
  /deep/ .van-notice-bar__content {
    color: #eb5841;
  }
  .notice-swipe {
    height: 66px;
    /deep/ .van-swipe-item {
      line-height: 66px;
    }
  }
  /deep/ .van-icon-arrow {
    font-size: 24px !important;
    margin-right: 10px;
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
        border-color: transparent transparent #aaa #aaa;
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
    margin-top: 38px;
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

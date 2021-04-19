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
      <div class="van-dropdown-menu">
        <div
          class="van-dropdown-menu__bar"
          :class="{ 'van-dropdown-menu__bar--opened': housePopup }"
          @click="openHousePopup"
        >
          <div role="button" tabindex="0" class="van-dropdown-menu__item">
            <span
              class="van-dropdown-menu__title"
              :class="{
                'van-dropdown-menu__title--down': housePopup
              }"
              ><div class="van-ellipsis">{{ houseName }}</div></span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="tf-body-container">
      <div class="pay-container" v-if="payList && payList.length > 0">
        <ul class="pay-list-container">
          <li
            v-for="(li, i) in payList"
            class="pay-list-item"
            @click="judgePay(li)"
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
                  color: li.z_balance < 0 ? '#EB5841' : '#222'
                }"
              >
                {{ li.z_balance }}</span
              >
              <span class="tf-icon tf-icon-right"></span>
            </div>
          </li>
        </ul>
      </div>
      <template v-else>
        <div class="pay-detail-container">
          <img class="pay-detail-img" src="@/assets/imgs/no-live-pay.png" />
          <div class="pay-detail-text">暂无待缴费用</div>
        </div>
      </template>
    </div>
    <van-popup
      class="house-popup--top"
      safe-area-inset-bottom
      get-container="body"
      v-model="housePopup"
      :style="{ transform: 'translate3d(-50%, ' + safeArea + 'px, 0)' }"
      :overlay-style="{'background-color': 'rgba(0, 0, 0, 0.3)'}"
    >
      <div
        v-for="(house, index) in houseList"
        :key="index"
        class="house-popup--top__option"
        :class="{
          'house-popup--top__option--active': house.value === selectedHouse
        }"
        @click="selectHouse(house)"
      >
        {{ house.text }}
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getHouseList, getLifePayList } from '@/api/butler/livepay'
import { mapGetters } from 'vuex'
export default {
  name: 'livePayIndex',
  data () {
    return {
      selectedHouse: '', // 选中的房间，值为项目ID + 房间账单ID + 房间ID
      houseName: '', // 选中的房间名称
      houseList: [], // 房间列表
      first: true,
      payList: [], // 待缴费列表
      forceText: '', // 强制缴费名称
      housePopup: false,
      safeArea: 0
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'currentProject'])
  },
  created () {
    this.getHouseList()
  },
  mounted () {
    this.safeArea = api.safeArea.top
  },
  activated () {
    if (this.first) {
      this.first = false
      return
    }
    this.searchLifePayList()
  },
  methods: {
    // 获取房屋列表
    getHouseList () {
      getHouseList().then(({ data }) => {
        let status = true
        const houseId = this.$route.query.id || this.currentProject.house_id
        this.houseList = data.map(obj => {
          const {
            project_name,
            fc_info,
            house_id,
            expenses_house_id,
            project_id
          } = obj
          // 项目ID + 房间账单ID + 房间ID
          const value = `${project_id}-${expenses_house_id}-${house_id}`
          const text = `${project_name} ${fc_info}`
          // 如果是首次渲染，则默认设置选中当前房屋
          if (houseId === house_id) {
            this.selectedHouse = value
            this.houseName = text
          }
          // 如果当前房屋没有账单id
          if (this.selectedHouse === value && !expenses_house_id) {
            status = false
          }
          return {
            text,
            value
          }
        })
        if (status) {
          // 进入页面获取完房间后，请求一次当前账单数据
          this.searchLifePayList()
        }
      })
    },
    // 打开房屋弹窗
    openHousePopup () {
      if (this.houseList && this.houseList.length > 1) {
        this.housePopup = true
      }
    },
    // 选择房屋
    selectHouse ({ value, text }) {
      this.houseName = text
      this.selectedHouse = value
      this.searchLifePayList()
      this.housePopup = false
    },
    // 房屋切换获取生活缴费列表
    searchLifePayList () {
      const [project_id, expenses_house_id] = this.selectedHouse.split('-')
      this.getLifePayList({
        expenses_house_id,
        project_id
      })
    },
    // 获取当前房屋下的生活缴费列表
    getLifePayList (params) {
      getLifePayList(params).then(({ data, force_text }) => {
        this.payList = data || []
        this.forceText = force_text || ''
      })
    },
    // 跳转充缴记录页面
    goLivePayList () {
      const houseId = this.selectedHouse.split('-')[1]
      this.$router.push({
        name: 'livePayRecord',
        query: {
          houseId
        }
      })
    },
    // 判断跳转到充值缴费页面
    judgePay ({ genre_type: genreType, z_balance, balance }) {
      const [projectId, houseId] = this.selectedHouse.split('-')
      const query = {
        genreType,
        projectId,
        houseId
      }
      // 强制缴费只有其他费用可设置,如果存在强制缴费账单，则需要提醒先缴纳
      if (this.forceText && query.genreType !== 4) {
        this.$dialog
          .alert({
            title: `请先缴清${this.forceText}`
          })
          .then(() => {
            query.genreType = 4
            this.goMainPay({
              ...query,
              type: 1
            })
          })
        return
      }
      // 若有待缴费金额，且余额>=0，跳转缴费页面(type = 1)
      // 若没有待缴费金额，且余额>=0,或者余额<0，跳转是充值页面(type = 2)
      // balance 余额 z_balance 总金额
      this.goMainPay({
        ...query,
        type: (balance >= 0 && z_balance < 0) ? 1 : 2
      })
    },
    // 跳转缴费或充值页面
    goMainPay (query) {
      this.$router.push({
        name: 'livemainPay',
        query
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
  padding: 40px 20px;
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
  align-items: center;
  height: 100%;
  .pay-detail-img {
    width: 483px;
    margin-top: 165px;
    margin-bottom: 108px;
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
  .van-dropdown-menu__bar {
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
        margin-top: -12px;
        border-width: 8px;
        border-color: transparent transparent #383838 #383838;
      }
      &.van-dropdown-menu__title--down:after {
        margin-top: -4px;
      }
    }
  }
}
// 房屋选择窗
.house-popup--top {
  width: 650px;
  padding: 0 30px;
  border-radius: 10px;
  top: 218px;
  .house-popup--top__option {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 110px;
    color: #8f8f94;
    font-size: 28px;
    color: #8f8f94;
  }
  .house-popup--top__option + .house-popup--top__option {
    border-top: 1px solid #f0f0f0;
  }
  .house-popup--top__option--active {
    font-weight: 500;
    color: #222;
  }
}
</style>

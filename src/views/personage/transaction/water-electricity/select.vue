<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      :title="title"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>

    <div class="select-header">
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="selectStatus"
          @change="handleChange"
          :options="statusList"
        />
      </van-dropdown-menu>
      <van-dropdown-menu class="unit-dropdown">
        <van-dropdown-item
          v-model="selectedUnit"
          @change="handleChange"
          :options="unitList"
        />
      </van-dropdown-menu>
      <van-field
        v-model="houseString"
        @change="handleChange"
        placeholder="房间"
      />
    </div>
    <refreshList
      ref="list"
      class="house-list tf-flex-item"
      :list.sync="houseList"
      :load="getLiveHouseList"
    >
      <template v-slot="{ item }">
        <div class="house-item" @click="goMeterReading(item)">
          <div class="house-text">{{ item.unit_house_name }}</div>
          <div
            class="house-water"
            :class="{ 'tf-text-primary': item.water > item.accord }"
          >
            <img :src="item.w_icon" class="tf-icon">
            {{ item.is_water_fee  == '0' ? "-" : item.disparity_water }}
          </div>
          <div
            class="house-electricity"
            :class="{ 'tf-text-primary': item.dian > item.accord }"
          >
            <img :src="item.e_icon" class="tf-icon">
            {{ item.is_electric_fee == '0' ? "-" : item.disparity_electric }}
          </div>
        </div>
      </template>
    </refreshList>
  </div>
</template>

<script>
import { getLiveHouseList } from '@/api/personage'
import refreshList from '@/components/tf-refresh-list'
export default {
  name: 'waterElectricitySelect',
  components: {
    refreshList
  },
  data () {
    return {
      id: 0,
      monthId: '',
      title: '',
      selectStatus: '全部',
      statusList: [],
      selectedUnit: 0,
      unitList: [],
      houseString: '',
      houseList: []
    }
  },
  created () {
    this.id = this.$route.query.id
    this.monthId = this.$route.query.monthId
    this.title = this.$route.query.name
  },
  methods: {
    getLiveHouseList () {
      const params = {
        building_id: this.id,
        month_id: this.monthId,
        house_name: this.houseString,
        record_state: this.selectStatus,
        unit_id: this.selectedUnit
        // list_order: 0 // 0 正序 1倒序
      }
      return getLiveHouseList(params).then(
        ({ month_record_list, month_list, record_state, unit_data }) => {
          this.unitList = unit_data
          this.statusList = record_state
          return Promise.resolve({
            data: month_record_list
          })
        }
      )
    },
    handleChange () {
      this.$refs.list.reload()
    },
    // 跳转到抄表
    goMeterReading ({ id, disparity_water, disparity_electric, is_electric_fee, is_water_fee }) {
      const type = disparity_water && !disparity_electric ? 2 : 1
      this.$router.push({
        name: 'waterElectricityMeter',
        query: {
          id,
          type,
          water: is_water_fee,
          electric: is_electric_fee
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.select-header {
  display: flex;
  justify-content: space-between;
  padding: 30px 20px;
  /deep/ .van-dropdown-menu__bar,
  /deep/ .van-field {
    width: 220px;
    background: none;
    border: 2px solid #aaaaaa;
    border-radius: 33px;
  }
  /deep/ .van-dropdown-menu__bar {
    border-color: @primary;
  }
  /deep/ .van-dropdown-menu__item {
    justify-content: flex-start;
    .van-dropdown-menu__title {
      font-size: 24px;
      color: @primary;
      width: 100%;
      &::after {
        margin-top: -8px;
        right: 20px;
        border: 6px solid;
        border-color: transparent transparent @primary @primary;
      }
    }
  }
  /deep/ .van-field {
    padding: 10px 46px;
  }
  .unit-dropdown /deep/ .van-popup--top {
    left: 225px;
  }
}
.house-list {
  padding: 0 20px;
  /deep/ .tf-van-cell {
    padding: 0 30px;
    margin-bottom: 0;
    background: #ffffff;
    &:first-child {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    &:nth-last-child(2) {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
  .house-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120px;
    border-top: 1px solid #f0f0f0;
    .house-text,
    .house-water,
    .house-electricity {
      width: 33%;
      font-size: 28px;
    }
  }
  .tf-van-cell + .tf-van-cell .house-item {
    border-top: 1px solid #f0f0f0;
  }
  .tf-icon-shuibiao {
    margin-right: 22px;
    font-size: 32px;
    color: #599eed;
  }
  .tf-icon-dianbiao {
    margin-right: 18px;
    font-size: 32px;
    color: #ffb915;
  }
}
/deep/ .van-popup--top {
  width: 400px;
  top: 30px;
  margin-left: 50px;
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

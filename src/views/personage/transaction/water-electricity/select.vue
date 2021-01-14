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
      <!-- 筛选，默认全部，样式跟选中不一样 -->
      <van-dropdown-menu
        class="tf-flex-item"
        :class="{ 'default-select': selectStatus === '全部' }"
      >
        <van-dropdown-item
          v-model="selectStatus"
          @change="handleChange"
          :options="statusList"
        />
      </van-dropdown-menu>
      <!-- 单元，默认全部，样式跟选中不一样  -->
      <van-dropdown-menu
        class="unit-dropdown tf-flex-item"
        :class="{ 'default-select': selectedUnit == 0 }"
      >
        <van-dropdown-item
          v-model="selectedUnit"
          @change="handleChange"
          :options="unitList"
        />
      </van-dropdown-menu>
      <!-- 房间名称 -->
      <div class="tf-flex-item house-string">
        <van-field
          v-model="houseString"
          @change="handleChange"
          placeholder="房间"
        />
      </div>
      <!-- 升序 -->
      <img
        v-if="listOrder == 0"
        class="order-image"
        src="@/assets/imgs/transaction-asc.png"
        @click="changeOrder"
      />
      <!-- 降序 -->
      <img
        v-if="listOrder == 1"
        class="order-image"
        src="@/assets/imgs/transaction-des.png"
        @click="changeOrder"
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
          <!-- 开启水费，要判断是否超出提醒数值，超出显示红色 -->
          <div
            v-if="item.is_water_fee == '1'"
            class="house-water"
            :class="{ 'tf-text-primary': item.disparity_water > wErrorsDigit }"
          >
            <span class="tf-icon tf-icon-shuibiao"></span
            >{{ item.disparity_water }}
          </div>
          <!-- 没有开启水费 -->
          <div v-else class="house-water tf-flex">
            <div class="no-open"></div>
          </div>
          <!-- 开启电费，要判断是否超出提醒数值，超出显示红色 -->
          <div
            v-if="item.is_electric_fee == '1'"
            class="house-electricity"
            :class="{
              'tf-text-primary': item.disparity_electric > eErrorsDigit
            }"
          >
            <span class="tf-icon tf-icon-dianbiao"></span
            >{{ item.disparity_electric }}
          </div>
          <!-- 没有开启电费 -->
          <div v-else class="house-electricity tf-flex">
            <div class="no-open"></div>
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
      buildingId: 0, // 楼栋ID
      monthId: '', // 账单月份ID
      title: '',
      selectStatus: '全部',
      statusList: [],
      selectedUnit: 0,
      unitList: [],
      houseString: '',
      houseList: [],
      wErrorsDigit: 0, // 水费超出提醒数值
      eErrorsDigit: 0, // 电费超出提醒数值
      listOrder: 0 // 水电抄表排序 0 正序 1倒序
    }
  },
  created () {
    this.buildingId = this.$route.query.id
    this.monthId = this.$route.query.monthId
    this.title = this.$route.query.name
  },
  methods: {
    // 获取房屋
    getLiveHouseList ({ pages: page }) {
      const params = {
        page,
        building_id: this.buildingId,
        month_id: this.monthId,
        house_name: this.houseString,
        record_state: this.selectStatus,
        unit_id: this.selectedUnit,
        list_order: this.listOrder // 0 正序 1倒序
      }
      return getLiveHouseList(params).then(
        ({
          month_record_list,
          record_state,
          unit_data,
          w_errors_digit,
          e_errors_digit
        }) => {
          this.unitList = unit_data
          this.statusList = record_state
          this.wErrorsDigit = w_errors_digit
          this.eErrorsDigit = e_errors_digit
          return Promise.resolve({
            data: month_record_list
          })
        }
      )
    },
    // 参数更改，重新刷新列表数据
    handleChange () {
      this.$refs.list.reload()
    },
    // 更换水电抄表排序，重新刷新列表数据
    changeOrder () {
      this.listOrder = this.listOrder === 0 ? 1 : 0
      this.$refs.list.reload()
    },
    // 跳转到抄表
    goMeterReading ({
      id,
      disparity_water,
      disparity_electric,
      is_electric_fee,
      is_water_fee,
      subscript
    }) {
      // 跳转后显示哪个表，2：电表，1：水表
      // 如果水表有值，电表没值，或者水表没有开启这跳转电表，否则跳转水表
      const type =
        (disparity_water && !disparity_electric) || is_water_fee === '0'
          ? 2
          : 1
      this.$router.push({
        name: 'waterElectricityMeter',
        query: {
          month_record_id: id,
          type,
          subscript,
          // water: is_water_fee,
          // electric: is_electric_fee,
          building_id: this.buildingId,
          month_id: this.monthId,
          house_name: this.houseString,
          record_state: this.selectStatus,
          unit_id: this.selectedUnit,
          list_order: this.listOrder // 0 正序 1倒序
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
  .order-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 66px;
    height: 66px;
    border-radius: 33px;
  }
  .tf-flex-item {
    margin-right: 20px;
  }
  .house-string {
    width: 0;
  }
  /deep/ .van-dropdown-menu__bar,
  /deep/ .van-field {
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
.default-select {
  /deep/ .van-dropdown-menu__item {
    .van-dropdown-menu__title {
      color: #222;
      &::after {
        border-color: transparent transparent #aaa #aaa;
      }
    }
  }
  /deep/ .van-dropdown-menu__bar {
    border-color: #aaa;
  }
}
.no-open {
  width: 110px;
  height: 2px;
  background: #aaaaaa;
  border-radius: 2px;
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
      font-size: 28px;
    }
    .house-text {
      flex: 5;
    }
    .house-water,
    .house-electricity {
      flex: 4;
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

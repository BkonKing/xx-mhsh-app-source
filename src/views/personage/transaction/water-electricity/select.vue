<template>
  <div class="tf-bg">
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
      <van-dropdown-menu @change="handleChange">
        <van-dropdown-item v-model="selectStatus" :options="statusList" />
      </van-dropdown-menu>
      <van-dropdown-menu class="unit-dropdown" @change="handleChange">
        <van-dropdown-item v-model="selectedUnit" :options="unitList" />
      </van-dropdown-menu>
      <van-field v-model="houseString" placeholder="房间" />
    </div>
    <!-- <refreshList :list.sync="houseList" :load="getHouseList">
      <template v-slot="{ item }"> -->
    <div class="house-list">
      <div class="house-item" @click="goMeterReading">
        <div class="house-text">1单元-1001</div>
        <div class="house-water">
          <span class="tf-icon tf-icon-shuibiao"></span>100
        </div>
        <div class="house-electricity">
          <span class="tf-icon tf-icon-dianbiao"></span>200
        </div>
      </div>
      <div class="house-item">
        <div class="house-text">1单元-1001</div>
        <div class="house-water">100</div>
        <div class="house-electricity">200</div>
      </div>
    </div>

    <!-- </template>
    </refreshList> -->
  </div>
</template>

<script>
import { NavBar, DropdownMenu, DropdownItem, Field } from 'vant'
import refreshList from '@/components/tf-refresh-list'
export default {
  name: 'waterElectricitySelect',
  components: {
    [NavBar.name]: NavBar,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Field.name]: Field,
    refreshList
  },
  data () {
    return {
      title: 'A区2栋',
      selectStatus: 0,
      statusList: [
        {
          text: '全部',
          value: 0
        },
        {
          text: '已完成',
          value: 1
        },
        {
          text: '未完成',
          value: 2
        },
        {
          text: '未抄水表',
          value: 3
        },
        {
          text: '未抄电表',
          value: 4
        }
      ],
      selectedUnit: 0,
      unitList: [
        {
          text: '全部',
          value: 0
        },
        {
          text: '1单元',
          value: 1
        },
        {
          text: '2单元',
          value: 2
        },
        {
          text: '3单元',
          value: 3
        },
        {
          text: '4单元',
          value: 4
        }
      ],
      houseString: '',
      houseList: []
    }
  },
  methods: {
    handleChange () {},
    getHouseList () {},
    goMeterReading () {
      this.$router.push({
        name: 'waterElectricityMeter'
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
  background: #ffffff;
  border-radius: 10px;
  padding: 0 30px;
  margin: 0 20px;
  .house-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120px;
    .house-text,
    .house-water,
    .house-electricity {
      width: 33%;
      font-size: 28px;
    }
  }
  .house-item + .house-item {
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

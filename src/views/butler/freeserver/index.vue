<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="免费服务"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span
          class="tf-icon tf-icon-shijian"
          @click="$router.push('/pages/butler/freeserver/list')"
        ></span>
      </template>
    </van-nav-bar>
    <div class="filter-box">
      <van-dropdown-menu
        v-show="!searchFocused"
        class="filter-menu"
        @change="getFreeServerList"
      >
        <van-dropdown-item
          v-model="checkedStatus"
          :options="bookingStatus"
          :title="checkedStatus ? '' : '预约状态'"
        />
        <van-dropdown-item
          v-model="checkedStatus"
          :options="bookingStatus"
          :title="checkedStatus ? '' : '服务类型'"
        />
      </van-dropdown-menu>
      <van-search
        class="search-box"
        v-model="search"
        @focus="searchFocused = true"
        @blur="searchFocused = false"
        placeholder="搜一搜"
      />
    </div>
    <div class="tf-padding tf-body-container">
      <!-- <div class="tab-btn-box">
        <div
          class="tab-btn"
          :class="{'tab-btn--blue': category_type === 1}"
          @click="changeType(1)"
          style="border-color: #448fe4;"
        >
          <div v-if="category_type !== 1" class="tf-circle-tag--blue"></div>
          <div class="tab-btn__text-box tf-row">
            <div class="tab-btn__text">人工服务</div>
            <div class="tf-text-grey">({{rg_num}})</div>
          </div>
        </div>
        <div
          class="tab-btn"
          :class="{'tf-bg-success': category_type === 2}"
          @click="changeType(2)"
          style="border-color: #55b862;"
        >
          <div v-if="category_type !== 2" class="tf-circle-tag--success"></div>
          <div class="tab-btn__text-box tf-row">
            <div class="tab-btn__text">借用服务</div>
            <div class="tf-text-grey">({{jy_num}})</div>
          </div>
        </div>
      </div> -->
      <service-card
        :active="category_type"
        :search="search"
        :data="serviceList"
        @reload="getFreeServerList"
      ></service-card>
    </div>
  </div>
</template>

<script>
import serviceCard from './components/service-card.vue'
import { getFreeServerList } from '@/api/butler.js'
export default {
  components: {
    serviceCard
  },
  data () {
    return {
      search: '',
      searchFocused: false, // 搜索框聚焦中
      category_type: 0, // 当前类型
      rg_num: 0, // 人工服务数量
      jy_num: 0, // 借用服务数量
      serviceList: [],
      checkedStatus: '',
      bookingStatus: [
        {
          text: '已预约',
          value: 1
        }
      ]
    }
  },
  created () {
    this.getFreeServerList()
  },
  methods: {
    getFreeServerList (searchName) {
      getFreeServerList(/* {
        category_type: this.category_type,
        searchName
      } */).then(
        res => {
          const { rg_num, jy_num, records } = res.data
          this.rg_num = rg_num
          this.jy_num = jy_num
          this.serviceList = records
        }
      )
    },
    /* 搜索服务（暂时弃用） */
    searchList ({ value }) {
      this.getFreeServerList(value)
    },
    /* 选中类型 */
    changeType (type) {
      if (type !== this.category_type) {
        this.category_type = type
      } else {
        this.category_type = 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tf-body-container {
  background: #f7f7f7;
}
.placeholder {
  font-family: iconfont !important;
  color: @gray-7;
}
.filter-box {
  display: flex;
  height: 88px;
  background: #fff;
  .filter-menu {
    width: 390px;
    margin-right: 108px;
    /deep/ .van-dropdown-menu__bar {
      height: 100%;
      box-shadow: none;
    }
  }
  .search-box {
    flex: 1;
    padding: 12px 20px;
    /deep/ .van-search__content {
      height: 64px;
      padding-left: 30px;
      padding-right: 30px;
      border-radius: 32px;
      background: #f7f7f7;
      .van-cell {
        padding: 0;
        line-height: 64px;
        .van-icon-search {
          color: #a6a6a6;
        }
        .van-field__left-icon,
        .van-field__control {
          line-height: 64px;
        }
      }
    }
  }
}

.check-type {
  @flex();
  justify-content: flex-start;
  margin-top: @padding-md;
  margin-bottom: @padding-md;
}

.check-type__box {
  font-size: @font-size-md;
  margin-right: @padding-md;
  height: 30px;
  background-color: #f2f2f2;
  border-radius: 15px;
}

.check-type--checked {
  color: #fff;
  background-color: @blue-dark;
}

.tab-btn-box {
  @flex();
  margin-bottom: @padding-lg;
}

.tab-btn {
  @flex();
  align-items: center;
  min-width: 200px;
  height: 66px;
  padding: 0 20px;
  border: 2px solid #aaa;
  border-radius: 33px;
  margin-right: @padding-md;
  justify-content: center;
  .tf-circle-tag--blue,
  .tf-circle-tag--success {
    margin-right: 10px;
  }
}
.tab-btn--blue {
  background-color: @blue-dark;
  .tab-btn__text-box,
  .tf-text-grey {
    color: #fff;
  }
}
.tf-bg-success {
  .tf-text-grey {
    color: #fff;
  }
}
.tab-btn__text-box {
  font-size: 24px;
  line-height: 66px;
}
.tf-main-container {
  padding-top: 88px !important;
}
</style>

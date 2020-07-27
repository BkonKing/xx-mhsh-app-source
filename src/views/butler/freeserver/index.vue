<template>
  <div class="tf-main-container">
    <van-nav-bar title="免费服务" :fixed="true" :border="false" left-arrow @click-left="$router.go(-1)">
      <template #right>
        <span
          class="tf-icon tf-icon-time-circle"
          @click="$router.push('/pages/butler/freeserver/list')"
        ></span>
      </template>
    </van-nav-bar>
    <van-search v-model="search" @search="searchList" placeholder="请输入关键字搜索" />
    <div class="tf-bg tf-padding">
      <div class="tab-btn-box">
        <div
          class="tab-btn"
          :class="{'tab-btn--blue': category_type === 1}"
          @click="category_type = 1"
          style="border-color: #448fe4;"
        >
          <div v-if="category_type !== 1" class="tf-circle-tag--blue"></div>
          <div class="tab-btn__text-box tf-row">
            <div class="tab-btn__text">人工服务</div>
            <div>({{rg_num}})</div>
          </div>
        </div>
        <div
          class="tab-btn"
          :class="{'tf-bg-success': category_type === 2}"
          @click="category_type = 2"
          style="border-color: #55b862;"
        >
          <div
            v-if="category_type !== 2"
            class="tf-circle-tag--success"
            style="margin-right: 10px;"
          ></div>
          <div class="tab-btn__text-box tf-row">
            <div class="tab-btn__text">借用服务</div>
            <div>({{jy_num}})</div>
          </div>
        </div>
      </div>
      <service-card :data="serviceList"></service-card>
    </div>
  </div>
</template>

<script>
import { NavBar, Search } from 'vant'
import serviceCard from './components/service-card.vue'
import { getFreeServerList } from '@/api/butler/butler.js'
export default {
  components: {
    serviceCard,
    [NavBar.name]: NavBar,
    [Search.name]: Search
  },
  data () {
    return {
      search: '',
      category_type: 0,
      rg_num: 0, // 人工服务数量
      jy_num: 0, // 借用服务数量
      serviceList: [
        {
          id: '1',
          category: '按摩(60岁以上老人)',
          icon_images:
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg',
          category_type: 1,
          status: 1,
          sy_num: '0',
          pd_num: '3'
        },
        {
          id: '2',
          category: '发布二手物品置换信息',
          icon_images:
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg',
          category_type: 1,
          status: 1,
          sy_num: '0',
          pd_num: '6'
        },
        {
          id: '3',
          category: '借用充电宝',
          icon_images:
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg',
          category_type: 2,
          status: 1,
          sy_num: '1',
          pd_num: '0'
        }
      ]
    }
  },
  created () {
    this.getFreeServerList()
  },
  methods: {
    getFreeServerList (searchName) {
      getFreeServerList({
        category_type: this.category_type,
        searchName
      }).then((res) => {
        if (res.success) {
          const { rg_num, jy_num, records } = res.data
          this.rg_num = rg_num
          this.jy_num = jy_num
          this.serviceList = records
        }
      })
    },
    searchList ({ value }) {
      this.getFreeServerList(value)
    }
  },
  watch: {
    category_type () {
      this.getFreeServerList()
    }
  }
}
</script>

<style lang="less" scoped>
.placeholder {
  font-family: iconfont !important;
  color: @gray-7;
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
  height: 66px;
  padding: 0 36px;
  border-width: 2px;
  border-style: solid;
  border-color: #aaa;
  border-radius: 33px;
  margin-right: @padding-md;
  .tf-circle-tag--blue {
    margin-right: 10px;
  }
}
.tab-btn--blue {
  background-color: @blue-dark;
  .tab-btn__text-box {
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

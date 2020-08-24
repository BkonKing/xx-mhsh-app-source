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
    <van-search v-model="search" placeholder="请输入关键字搜索" />
    <div class="tf-padding tf-body-container">
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
            <div class="tf-text-grey">({{rg_num}})</div>
          </div>
        </div>
        <div
          class="tab-btn"
          :class="{'tf-bg-success': category_type === 2}"
          @click="category_type = 2"
          style="border-color: #55b862;"
        >
          <div v-if="category_type !== 2" class="tf-circle-tag--success"></div>
          <div class="tab-btn__text-box tf-row">
            <div class="tab-btn__text">借用服务</div>
            <div class="tf-text-grey">({{jy_num}})</div>
          </div>
        </div>
      </div>
      <service-card :active="category_type" :search="search" :data="serviceList"></service-card>
    </div>
  </div>
</template>

<script>
import { NavBar, Search } from 'vant'
import serviceCard from './components/service-card.vue'
import { getFreeServerList } from '@/api/butler.js'
export default {
  components: {
    serviceCard,
    [NavBar.name]: NavBar,
    [Search.name]: Search
  },
  data () {
    return {
      search: '',
      category_type: 0, // 当前类型
      rg_num: 0, // 人工服务数量
      jy_num: 0, // 借用服务数量
      serviceList: []
    }
  },
  created () {
    this.getFreeServerList()
  },
  methods: {
    /* 获取全部免费服务类型 */
    getFreeServerList (searchName) {
      getFreeServerList(/* {
        category_type: this.category_type,
        searchName
      } */).then(
        (res) => {
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

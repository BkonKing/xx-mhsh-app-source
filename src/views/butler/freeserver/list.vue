<template>
  <div class="tf-bg tf-padding-base">
    <van-nav-bar title="我的免费预约" :fixed="true" left-arrow @click-left="$router.go(-1)" />
    <div class="tf-main-container">
      <refreshList :list.sync="data" @load="onLoad">
        <template v-slot="{item}">
          <div class="tf-card tf-mb-base">
            <div class="tf-card-header">
              <div class="tf-card-header__title">{{ item.category }}</div>
              <div v-if="item.status == 1" class="tf-icon tf-icon-qrcode"></div>
            </div>
            <div class="tf-card-content">
              <template v-if="item.category_type == 1">
                <div class="mb10">排队时间：{{item.stime}}</div>
                <div v-if="item.status == 1">
                  排队中：
                  <span class="tf-text-primary">第 {{item.pd_num}} 位</span>
                </div>
                <div v-else-if="item.status == 2">服务时间：{{item.etime}}</div>
              </template>
              <template v-else>
                <div class="mb10">借用时间：{{item.stime}}</div>
                <div v-if="item.status == 1">
                  归还时间：
                  <span class="tf-text-primary">请于 {{item.etime}} 前归还</span>
                </div>
                <div v-if="item.status == 2">归还时间：{{item.etime}}</div>
              </template>
            </div>
          </div>
        </template>
      </refreshList>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import { getMyFreeServerList } from '@/api/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    refreshList
  },
  data () {
    return {
      data: []
    }
  },
  created () {
    this.getMyFreeServerList()
  },
  methods: {
    onLoad () {
      setTimeout(() => {
        this.data.push({
          id: '2',
          category: '借用充电宝',
          category_type: 2,
          status: 1,
          stime: '2020-06-20 16:12:30',
          etime: '2020-06-20 20:12:36'
        })
      }, 100000)
    },
    getMyFreeServerList () {
      getMyFreeServerList().then((res) => {
        if (res.success) {
          this.data = res.data
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tf-bg {
  height: 100%;
}
.tf-flex-item {
  height: 100%;
  padding-top: 88px;
}
.tf-card-content {
  color: @gray-7;
}
.mb10 {
  margin-bottom: 10px;
}
.tf-icon-qrcode {
  font-size: 42px;
  line-height: 1;
}
</style>

<template>
  <div class="tf-bg tf-padding-base">
    <van-nav-bar title="我的免费预约" :fixed="true" left-arrow @click-left="goBack" />
    <div class="tf-flex-item">
      <refreshList :list.sync="data" @load="onLoad">
        <template v-slot="slotProps">
          <div class="tf-card tf-mb-base">
            <div class="tf-card-header">
              <div class="tf-card-header__title">{{ slotProps.item.category }}</div>
            </div>
            <div class="tf-card-content">{{slotProps.item | contentText}}</div>
          </div>
        </template>
      </refreshList>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import { getMyFreeServerList } from '@/api/butler/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    refreshList
  },
  data () {
    return {
      data: [
        {
          id: '1',
          category: '免费打印复印',
          category_type: 1,
          stime: '2020-06-20 15:12:30',
          etime: '2020-06-20 16:12:36'
        },
        {
          id: '2',
          category: '借用充电宝',
          category_type: 2,
          stime: '2020-06-20 16:12:30',
          etime: '2020-06-20 20:12:36'
        }
      ]
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
          stime: '2020-06-20 16:12:30',
          etime: '2020-06-20 20:12:36'
        })
      }, 3000)
    },
    getMyFreeServerList () {
      getMyFreeServerList().then(res => {
        if (res.success) {
          this.data = res.data
        }
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  filters: {
    contentText (item) {
      if (item.category_type === 1) {
        return `开始时间：${item.stime} \n\r结束时间：${item.etime}`
      } else {
        return `借用时间：${item.stime} \n\r归还时间：${item.etime}`
      }
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
</style>

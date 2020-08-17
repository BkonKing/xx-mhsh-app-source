<template>
  <div class="tf-bg">
    <van-nav-bar title="开门记录" :fixed="true" placeholder left-arrow @click-left="$router.go(-1)" />
    <div class="tf-main-container">
      <refreshList :list.sync="historyList" @load="onLoad">
        <template v-slot="slotProps">
          <div class="history-box">
            <div class="history-title">{{slotProps.item.title}}</div>
            <div class="history-time">{{slotProps.item.ctime}}</div>
          </div>
        </template>
      </refreshList>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import refreshList from '@/components/tf-refresh-list'
export default {
  components: {
    [NavBar.name]: NavBar,
    refreshList
  },
  data () {
    return {
      historyList: [
        {
          id: '1',
          title: '二维码开门',
          ctime: '2020-06-20 15:12:36'
        },
        {
          id: '2',
          title: '二维码开门2',
          ctime: '2020-06-21 15:12:36'
        }
      ]
    }
  },
  methods: {
    onLoad () {}
  }
}
</script>

<style lang="less" scoped>
.history-box {
  display: flex;
  justify-content: space-between;
  height: 120px;
  padding: 30px;
  background-color: #fff;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: @divider-color;
}

.history-title {
  font-size: 30px;
  line-height: 60px;
  color: @text-color;
}

.history-time {
  font-size: 30px;
  line-height: 60px;
  color: @gray-7;
}
.tf-main-container {
  padding-top: 88px !important;
}

/deep/ .tf-van-list {
  padding: 0;
  .tf-van-cell {
    padding: 0;
    margin: 0;
  }
}
</style>

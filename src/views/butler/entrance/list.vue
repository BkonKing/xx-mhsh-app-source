<template>
  <div class="tf-bg tf-body">
    <van-nav-bar title="开门记录" :fixed="true" placeholder left-arrow @click-left="$router.go(-1)" />
    <div class="tf-body-container">
      <refreshList :list.sync="historyList" :load="getMenjinLog">
        <template v-slot="{item}">
          <div class="history-box">
            <div class="history-title">{{item.log_type | logType}}</div>
            <div class="history-time">{{item.ctime}}</div>
          </div>
        </template>
      </refreshList>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import { getMenjinLog } from '@/api/butler'
export default {
  components: {
    [NavBar.name]: NavBar,
    refreshList
  },
  data () {
    return {
      historyList: []
    }
  },
  methods: {
    getMenjinLog (params) {
      return getMenjinLog(params)
    }
  },
  filters: {
    logType (value) {
      const text = {
        1: '二维码',
        2: '远程开门',
        3: '人脸开门'
      }
      return text[value]
    }
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
  /deep/ .tf-van-list {
    padding: 0;
  }
  /deep/ .tf-van-cell {
    padding: 0;
    margin: 0;
  }
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
</style>

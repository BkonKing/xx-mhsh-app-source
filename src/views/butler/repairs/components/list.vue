<template>
  <refreshList :list.sync="repairList" @load="onLoad">
    <template v-slot="{item}">
      <div class="list-item--time">{{item.ctime}}</div>
      <div class="tf-card">
        <div class="repair-list__title" @click="goDetails(item)">
          <div class="font-bold">{{item.category}}</div>
          <div
            :class="{'tf-text-primary': item.status == 1 || item.status == 5}"
          >{{statusText[item.status]}}</div>
        </div>
        <div class="repair-list__content" @click="goDetails(item)">{{item.content}}</div>
        <div class="repair-list__footer">
          <van-button
            v-if="item.status == 6"
            class="repair-list__btn"
            size="small"
            @click="goEvaluate"
          >评价</van-button>
          <van-button
            v-else-if="item.status == 5"
            class="repair-list__btn"
            size="small"
            type="danger"
            @click="goDetails(item, 'finishShow')"
          >确认完成</van-button>
          <van-button
            v-else-if="item.status == 4"
            class="repair-list__btn"
            size="small"
            type="danger"
            @click="goDetails(item, 'negotiateConfirm')"
          >确认协商信息</van-button>
        </div>
      </div>
    </template>
  </refreshList>
</template>

<script>
import { Button } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import { statusText } from '@/const/butler.js'
import { getRepairList } from '@/api/butler.js'
export default {
  components: {
    [Button.name]: Button,
    refreshList
  },
  data () {
    return {
      repairList: [],
      statusText
    }
  },
  created () {
    this.getRepairList()
  },
  methods: {
    onLoad () {},
    // 获取我的报事报修
    getRepairList () {
      getRepairList(/* {
        projectId: '',
        repairId: ''
      } */).then((res) => {
        if (res.success) {
          this.repairList = res.data
        }
      })
    },
    /* 跳转详情页（带参数，报事报修类型名称和id） */
    goDetails (item, type) {
      const url = `/pages/butler/repairs/details?id=${item.id}&title=${item.category}`
      this.$router.push({
        path: url,
        query: {
          type
        }
      })
    },
    /* 跳转评价页面 */
    goEvaluate () {
      this.$router.push('/pages/butler/repairs/evaluate')
    }
  }
}
</script>

<style lang="less" scoped>
.list-item--time {
  font-size: 24px;
  text-align: center;
  color: @gray-7;
  margin-top: @padding-md;
  margin-bottom: @padding-md;
}
.font-bold {
  font-weight: 500;
}
.tf-card {
  padding: 0 30px 30px;
}
.repair-list__title {
  display: flex;
  justify-content: space-between;
  height: 90px;
  line-height: 90px;
  font-size: 30px;
  > div {
    line-height: 90px;
  }
}
.repair-list__content {
  padding: 30px;
  line-height: 46px;
  border: 1px dashed #aaaaaa;
  border-radius: 4px;
  font-size: 30px;
}
.repair-list__footer {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  .repair-list__btn {
    min-width: 300px;
    font-size: 30px;
  }
  .repair-list__btn.van-button--default {
    border-color: #222;
  }
}
</style>

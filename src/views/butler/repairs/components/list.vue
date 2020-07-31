<template>
  <refreshList :list.sync="repairList" @load="onLoad">
    <template v-slot="{item}">
      <div class="list-item--time">{{item.ctime}}</div>
      <div class="tf-card">
        <div class="repair-list__title" @click="jump(item)">
          <div class="font-bold">{{item.category}}</div>
          <div>{{statusText[item.status]}}</div>
        </div>
        <div class="repair-list__content" @click="jump(item)">{{item.content}}</div>
        <div class="repair-list__footer">
          <van-button class="repair-list__btn" size="small" @click="goEvaluate">评价</van-button>
          <!-- <van-button class="repair-list__btn" size="small" type="danger">评价</van-button> -->
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
      repairList: [
        {
          id: '1',
          category: '居家报修',
          content: '厨房下水道堵了',
          images: [
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg',
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg'
          ],
          status: 6,
          ctime: '2020-06-03 16:35:26'
        },
        {
          id: '1',
          category: '居家报修',
          content: '厨房下水道堵了',
          images: [
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg',
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg'
          ],
          status: 6,
          ctime: '2020-06-03 16:35:26'
        },
        {
          id: '1',
          category: '居家报修',
          content: '厨房下水道堵了',
          images: [
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg',
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg'
          ],
          status: 6,
          ctime: '2020-06-03 16:35:26'
        }
      ],
      statusText
    }
  },
  created () {
    // this.getRepairList()
  },
  methods: {
    onLoad () {},
    getRepairList () {
      getRepairList({
        projectId: '',
        repairId: ''
      }).then((res) => {
        if (res.success) {
          this.repairList = res.data
        }
      })
    },
    jump (item) {
      const url = `/pages/butler/repairs/details?id=${item.id}&title=${item.category}`
      this.$router.push(url)
    },
    goEvaluate () {
      this.$router.push('/pages/butler/repairs/evaluate')
    }
  },
  watch: {
    list (value) {
      this.listChild = value
      this.loading = false
      this.refreshing = false
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
  border: 1px dashed #AAAAAA;
  border-radius: 4px;
  font-size: 30px;
}
.repair-list__footer {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  .repair-list__btn {
    min-width: 300px;
  }
}
</style>

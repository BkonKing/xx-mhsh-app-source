<template>
<div class="tf-bg">
    <van-nav-bar title="我的反馈" :fixed="true" left-arrow @click-left="$router.go(-1)" />
    <div class="tf-main-container">
      <refreshList :list.sync="data" @load="onLoad">
        <template v-slot="{item}">
          <div class="list-item--time">{{item.ctime}}</div>
        <div class="tf-card" @click="jump(item)">
          <div class="tf-card-header">
            <div class="tf-card-header__title">{{item.type}}</div>
          </div>
          <div class="tf-card-content">{{ item.content }}</div>
          <div v-if="item.reply" class="reply-box">
            <div class="reply-title">回复:</div>
            <div class="reply-content">{{ item.reply }}</div>
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
          type: '产品建议',
          ctime: '07-03',
          content: '厨房下水道堵了都没有及时来处理',
          info_type: 1,
          ctime: '2020-06-03 16:35:26',
          reply: '已经分派相关工作人员去处理了'
        },
        {
          id: '2',
          type: '其他',
          ctime: '07-03',
          content: '厨房下水道堵了都没有及时来处理2',
          info_type: 2,
          ctime: '2020-06-03 16:35:26',
          reply: '已经分派相关工作人员去处理了'
        }
      ]
    }
  },
  created () {
    // this.getComPraiseList()
  },
  methods: {
    onLoad () {},
    getComPraiseList () {
      // getComPraiseList().then(res => {
      //   if (res.success) {
      //     this.data = res.data
      //   }
      // })
    },
    jump (item) {
      const url = `/pages/personage/feedback/details?id=${item.id}`
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.tf-card {
  margin-bottom: @padding-md;
}
.tf-card-header {
  font-size: 30px;
  color: #333;
  font-weight:500;
}
.tf-card-content {
  color: #666;
}
.list-item--time {
  font-size: 24px;
  text-align: center;
  color: @gray-7;
  margin: 0 @padding-md @padding-md;
}
.reply-box {
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: @divider-color;
  padding-bottom: 40px;
}

.reply-title {
  font-size: 24px;
  margin: 30px 0;
  color: #666;
}

.reply-content {
  padding: 20px 30px;
  background-color: #f0f0f0;
  color: #666;
  font-size: 24px;
  line-height: 52px;
  border-radius:10px;
}

</style>

<template>
  <div class="tf-bg tf-body">
    <van-nav-bar title="我的反馈" :fixed="true" placeholder left-arrow @click-left="$router.go(-1)" />
    <div class="tf-body-container">
      <refreshList :list.sync="data" :load="getFeedbackList">
        <template v-slot="{item}">
          <div class="list-item--time">{{item.ctime}}</div>
          <div class="tf-card" @click="jump(item)">
            <div class="tf-card-header">
              <div class="tf-card-header__title">{{item.info_type}}</div>
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
import { getFeedbackList } from '@/api/personage.js'
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
    // this.getFeedbackList()
  },
  methods: {
    getFeedbackList () {
      return getFeedbackList()
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
  font-weight: 500;
}
.tf-card-content {
  font-size: 24px;
  color: #666;
  padding: 20px 0;
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
  border-radius: 10px;
}
</style>

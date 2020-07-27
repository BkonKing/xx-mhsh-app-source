<template>
  <div class="tf-bg">
    <van-nav-bar
      title="事务处理"
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="transaction-header">
        <div class="transaction-title">报事报修</div>
        <div class="transaction-underline"></div>
      </div>
    <div class="tf-main-container">
      <div class="transaction-tab-box">
        <div
          v-for="(item, i) in typeList"
          :key="i"
          class="transaction-tab"
          :class="{ 'transaction-tab--active': type === item.value }"
          @click="type = item.value"
        >{{ item.name }}()</div>
      </div>
      <refreshList class="transaction-list" :list.sync="transactionList" @load="onLoad">
        <template v-slot="{item}">
          <div class="transaction-list-item--time">提交时间：{{ item.ctime }}</div>
          <div class="tf-card" @click="jump(item)">
            <div class="tf-card-header">
              <div class="tf-card-header__title">{{ item.category }}</div>
              <div
                class="tf-card-header__status"
                :class="{ 'tf-card-header__status--complete': item.status > 5 }"
              >{{ statusText[item.status] }}</div>
            </div>
            <div class="tf-card-content">{{ item.content }}</div>
            <div class="tf-card-footer">{{ item.content }}</div>
          </div>
        </template>
      </refreshList>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import { statusText } from '@/const/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    refreshList
  },
  data () {
    return {
      statusText,
      typeList: [
        {
          name: '待处理',
          value: 1
        },
        {
          name: '待分派',
          value: 2
        },
        {
          name: '待结案',
          value: 3
        },
        {
          name: '已结案',
          value: 4
        }
      ],
      type: undefined,
      transactionList: [
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
      ]
    }
  },
  created () {
    this.type = parseInt(this.$route.query.type)
  },
  methods: {
    onLoad () {},
    jump (item) {
      const url = `/pages/personage/transaction/details?id=${item.id}&title=${item.category}`
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.transaction-header {
  @flex-column();
  align-items: center;
  width: 100%;
  height: 186px;
  padding-top: 88px;
  background-color: #fff;
}
.transaction-title {
  width: 100%;
  line-height: 94px;
  text-align: center;
  font-size: 34px;
  font-weight: 500;
}
.transaction-underline {
  width: 92px;
  height: 4px;
  background-color: @red-dark;
  border-radius: 2px;
}
.transaction-tab-box {
  @flex();
  justify-content: space-between;
  padding: 30px;
}
.transaction-tab {
  width: 155px;
  height: 66px;
  line-height: 66px;
  border-radius: 33px;
  font-size: 24px;
  text-align: center;
  color: @gray-7;
  border-width: 2px;
  border-style: solid;
  border-color: #aaa;
}
.transaction-tab--active {
  color: #fff;
  border-color: @red-dark;
  background-color: @red-dark;
}
.transaction-list-item--time {
  text-align: center;
  font-size: 24px;
  color: @gray-7;
  margin-bottom: 20px;
}
.tf-card-header {
  padding: 20px 0;
}
.tf-card-header__title {
  padding: 7px 12px;
  border:1px solid rgba(56,56,56,1);
  font-weight: 400;
  border-radius:4px;
  font-size: 24px;
}
.tf-card-content {
  @flex();
  align-items: center;
  color: #666;
  min-height: 144px;
}
.tf-main-container {
  padding-top: 0;
}
</style>

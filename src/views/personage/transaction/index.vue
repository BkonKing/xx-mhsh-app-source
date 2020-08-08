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
      <van-sticky offset-top="2.42666rem" @scroll="scrollSticky">
        <div class="transaction-tab-box" :class="{'tf-bg-white': isFixed}">
          <div
            v-for="(item, i) in typeList"
            :key="i"
            class="transaction-tab"
            :class="{ 'transaction-tab--active': type === item.value }"
            @click="type = item.value"
          >{{ item.name }}()</div>
        </div>
      </van-sticky>
      <div class="transaction-list">
        <list v-show="type === 1" :data.sync="transactionList"></list>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Sticky } from 'vant'
import list from './components/list'
import { mapGetters } from 'vuex'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Sticky.name]: Sticky,
    list
  },
  data () {
    return {
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
          status: 1,
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
          status: 1,
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
          status: 1,
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
          status: 1,
          ctime: '2020-06-03 16:35:26'
        }
      ],
      isFixed: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    this.type = parseInt(this.$route.query.type)
  },
  methods: {
    scrollSticky ({ isFixed }) {
      this.isFixed = isFixed
    }
  }
}
</script>

<style lang="less" scoped>
.tf-main-container {
  padding-top: 0;
  height: calc(100% - 186px);
}
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
.transaction-list {
  padding-bottom: 30px;
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
  border: 1px solid rgba(56, 56, 56, 1);
  font-weight: 400;
  border-radius: 4px;
  font-size: 24px;
}
.tf-card-content {
  @flex();
  align-items: center;
  color: #666;
  min-height: 144px;
}
</style>

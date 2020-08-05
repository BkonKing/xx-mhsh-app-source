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
      <refreshList class="transaction-list" :list.sync="transactionList" @load="onLoad">
        <template v-slot="{item}">
          <div class="transaction-box" @click="jump(item)">
            <div class="transaction-item">
              <div class="transaction-item__label">提交时间：{{ item.ctime }}</div>
            </div>
            <div class="transaction-item">
              <div class="transaction-item__label">申报类型：</div>
              <div class="transaction-item__text">{{ item.category }}</div>
            </div>
            <div class="transaction-item">
              <div class="transaction-item__label">内容描述：</div>
              <div
                class="transaction-item__content"
                :class="{'transaction-item__content--manager': item.status > 5}"
              >{{ item.content }}</div>
            </div>
            <div class="transaction-footer">
              <div class="transaction-footer__text">
                等待
                <span class="tf-text-blue">李师傅</span>
                结案
                <span class="tf-text-primary">(剩余3天 00:10:24)</span>
              </div>
              <van-button v-if="item.status == 1">去处理</van-button>
              <van-button v-else-if="item.status == 3" type="danger">去分派</van-button>
              <van-button v-else-if="item.status == 4">接受任务</van-button>
              <van-button v-else-if="item.status == 5" type="danger">确认结案</van-button>
            </div>
            <!-- <div
              class="tf-card-header__status"
              :class="{ 'tf-card-header__status--complete': item.status > 5 }"
            >{{ [item.status] }}</div>-->
          </div>
        </template>
      </refreshList>
    </div>
  </div>
</template>

<script>
import { NavBar, Sticky, Button } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import { mapGetters } from 'vuex'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Sticky.name]: Sticky,
    [Button.name]: Button,
    refreshList
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
          status: 3,
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
    onLoad () {},
    jump (item) {
      const url = `/pages/personage/transaction/details?id=${item.id}&title=${item.category}`
      this.$router.push(url)
    },
    scrollSticky ({ isFixed }) {
      this.isFixed = isFixed
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
.transaction-box {
  padding: 30px 30px 0;
  background: #fff;
  border-radius: 10px;
  & + & {
    margin-top: 30px;
  }
  .transaction-item {
    display: flex;
    margin-bottom: 20px;
    &__label {
      font-size: 26px;
      color: @gray-7;
    }
    &__text {
      font-size: 26px;
    }
    &__content {
      flex: 1;
      padding: 30px 20px;
      border: 1px dashed #aaa;
      font-size: 26px;
      color: #666;
    }
    &__content--manager {
      border: none;
      background: #f2f2f4;
    }
  }
  .transaction-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    padding: 25px 0;
    border-top: 1px solid #f0f0f0;
    &__text {
      font-size: 28px;
      color: #666;
    }
    /deep/ .van-button {
      height: 66px;
    }
  }
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
.tf-main-container {
  padding-top: 0;
}
</style>

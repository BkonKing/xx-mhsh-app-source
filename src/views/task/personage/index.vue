<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="我的任务"
      :fixed="true"
      :border="false"
      left-arrow
      placeholder
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-time-circle"></span>
      </template>
    </van-nav-bar>
    <van-tabs
      class="tf-body-container tf-column"
      v-model="current"
      @change="tabsChange"
    >
      <van-tab title="我接单的" id="neighboursList0">
        <order-list></order-list>
      </van-tab>
      <van-tab title="我发布的" id="neighboursList1">
        <publish-list></publish-list>
      </van-tab>
      <van-tab title="我的投诉" id="neighboursList2">
        <complaint-list></complaint-list>
      </van-tab>
      <van-tab title="我的提问" id="neighboursList3">
        <question-list></question-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// /pages/task/personage/index
import OrderList from './components/order'
import PublishList from './components/publish'
import ComplaintList from './components/complaint'
import QuestionList from './components/question.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'PersonageTaskIndex',
  components: {
    OrderList,
    PublishList,
    ComplaintList,
    QuestionList
  },
  data () {
    return {
      current: 0,
      scrollTop: 0
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {},
  activated () {
    if (this.scrollTop && this.current !== 1) {
      document
        .getElementById(`neighboursList${this.current}`)
        .getElementsByClassName(
          'tf-list-refresh'
        )[0].scrollTop = this.scrollTop
    }
  },
  methods: {
    // 发布
    goEdit () {
      this.$router.push('/pages/neighbours/publish')
    },
    // tab页改变，为最新标签时刷新最新列表
    tabsChange (name) {
      if (name === 0) {
        this.$refs.list && this.$refs.list.reload()
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    const { active } = to.query
    next(vm => {
      if (active && active !== vm.current) {
        vm.scrollTop = 0
        vm.current = parseInt(active)
        vm.$router.push('/neighbours')
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    if (this.current !== 1) {
      const el = document
        .getElementById(`neighboursList${this.current}`)
        .getElementsByClassName('tf-list-refresh')
      this.scrollTop = (el.length && el[0].scrollTop) || 0
    }
    next()
  }
}
</script>

<style lang="less" scoped>
// 页面
.tf-bg {
  @flex-column();
  background: #f7f7f7;
}
/deep/ .tf-list-refresh {
  padding: 30px 20px;
}
// tabs
/deep/ .van-tabs {
  .van-tab__text {
    color: #000000cc;
  }
  .van-tab--active .van-tab__text {
    font-size: 32px;
    font-weight: 600;
    color: #000000;
  }
  .van-tabs__line {
    width: 40px !important;
    height: 6px;
    left: -2px;
    background: #ff6555;
    border-radius: 3px;
  }
  .van-tabs__content {
    flex: 1;
    max-height: calc(100% - 98px);
    .van-tab__pane {
      height: 100%;
    }
  }
}

// 无数据
/deep/ .no-data-box {
  margin-top: 327px;
  .no-data-img {
    width: 204px;
    height: 240px;
  }
  .no-data-text {
    margin-top: 40px;
    font-size: 26px;
    color: #8f8f94;
    line-height: 1;
  }
}
</style>

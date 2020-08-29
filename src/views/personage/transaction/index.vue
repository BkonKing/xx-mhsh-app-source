<template>
  <div ref="container" class="tf-bg tf-body">
    <van-nav-bar
      title="事务处理"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="transaction-header">
      <div class="transaction-title">报事报修</div>
      <div class="transaction-underline"></div>
    </div>
    <div
      class="transaction-tab-box"
      :class="[{'tf-bg-white': isFixed}, {'flex-start': userInfo.role_dep != 1}]"
    >
      <template v-if="userInfo.role_dep == 1">
        <div
          class="transaction-tab"
          :class="{'transaction-tab--active': type === 1 }"
          @click="type = 1"
        >待处理({{list1.length}})</div>
        <div
          class="transaction-tab"
          :class="{'transaction-tab--active': type === 2 }"
          @click="type = 2"
        >待分派({{list2.length}})</div>
      </template>
      <div
        class="transaction-tab"
        :class="{'transaction-tab--active': type === 3 }"
        @click="type = 3"
      >待结案({{list3.length}})</div>
      <div
        class="transaction-tab"
        :class="{'transaction-tab--active': type === 4 }"
        @click="type = 4"
      >已结案({{list4.length}})</div>
    </div>
    <div class="tf-body-container" @scroll.passive="scrollSticky">
      <div class="transaction-list">
        <template v-if="userInfo.role_dep == 1">
          <list
            v-show="type === 1"
            ref="list1"
            key="1"
            :data.sync="list1"
            :load="(params) => listLoad(params, 1)"
          ></list>
          <list
            v-show="type === 2"
            ref="list2"
            key="2"
            :data.sync="list2"
            :load="(params) => listLoad(params, 2)"
          ></list>
        </template>
        <list
          v-show="type === 3"
          ref="list3"
          key="3"
          :data.sync="list3"
          :load="(params) => listLoad(params, 3)"
        ></list>
        <list
          v-show="type === 4"
          ref="list4"
          key="4"
          :data.sync="list4"
          :load="(params) => listLoad(params, 4)"
        ></list>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Sticky } from 'vant'
import list from './components/list'
import { getDbRepairList } from '@/api/personage'
import { mapGetters } from 'vuex'

export default {
  name: 'transactionIndex',
  components: {
    [NavBar.name]: NavBar,
    [Sticky.name]: Sticky,
    list
  },
  data () {
    return {
      type: undefined,
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      isFixed: false,
      container: null,
      backStatus: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    this.type = parseInt(this.$route.query.type)
    if (this.userInfo.role_dep == 1) {
      this.getDbRepairList(1)
      this.getDbRepairList(2)
    }
    this.getDbRepairList(3)
    this.getDbRepairList(4)
  },
  mounted () {
    this.container = this.$refs.container
  },
  activated () {
    if (this.backStatus) {
      this.$refs[`list${this.type}`].reload()
    }
  },
  methods: {
    scrollSticky ({ target }) {
      this.isFixed = target.scrollTop > 0
    },
    listLoad (params, status) {
      params.status = status
      return getDbRepairList(params, this.userInfo.xm_project_id)
    },
    getDbRepairList (status) {
      getDbRepairList(
        {
          status
        },
        this.userInfo.xm_project_id
      ).then((res) => {
        this[`list${status}`] = res.data
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.backStatus = from.name === 'transactionDetails'
    })
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'personage') {
      this.$store.commit('deleteKeepAlive', from.name)
      this.$destroy()
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.tf-body-container {
  @flex-column();
}
.transaction-header {
  @flex-column();
  align-items: center;
  width: 100%;
  height: 98px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 155px;
  height: 66px;
  border-radius: 33px;
  font-size: 24px;
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
  height: 100% !important;
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
.flex-start {
  justify-content: flex-start !important;
  .transaction-tab {
    margin-right: 20px;
  }
}
.padding63 {
  padding-top: 126px;
}
</style>

<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="事务处理"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="tf-body-container">
      <van-tabs
        v-model="active"
        sticky
        :lazy-render="false"
        @click="reloadAllList"
      >
        <!-- 需要有报事报修权限 -->
        <van-tab title="报事报修" v-if="userInfo.swrole == 1" name="0">
          <div
            class="transaction-tab-box"
            :class="{ 'flex-start': !isService }"
          >
            <template v-if="isService">
              <div
                class="transaction-tab"
                :class="{ 'transaction-tab--active': type === 1 }"
                @click="type = 1"
              >
                待处理({{ countObj.dcl_num }})
              </div>
              <div
                class="transaction-tab"
                :class="{ 'transaction-tab--active': type === 2 }"
                @click="type = 2"
              >
                待分派({{ countObj.dfp_num }})
              </div>
            </template>
            <div
              class="transaction-tab"
              :class="{ 'transaction-tab--active': type === 3 }"
              @click="type = 3"
            >
              待结案({{ countObj.dja_num }})
            </div>
            <div
              class="transaction-tab"
              :class="{ 'transaction-tab--active': type === 4 }"
              @click="type = 4"
            >
              已结案({{ countObj.yja_num }})
            </div>
            <template v-if="isService">
              <div
                class="transaction-tab"
                :class="{ 'transaction-tab--active': type === 5 }"
                @click="type = 5"
              >
                已取消({{ countObj.yqx_num }})
              </div>
            </template>
          </div>
          <div class="transaction-list">
            <template v-if="isService">
              <list
                v-show="type === 1"
                ref="list1"
                key="1"
                :data.sync="list1"
                :load="params => listLoad(params, 1)"
              ></list>
              <list
                v-show="type === 2"
                ref="list2"
                key="2"
                :data.sync="list2"
                :load="params => listLoad(params, 2)"
              ></list>
            </template>
            <list
              v-show="type === 3"
              ref="list3"
              key="3"
              :data.sync="list3"
              :load="params => listLoad(params, 3)"
            ></list>
            <list
              v-show="type === 4"
              ref="list4"
              key="4"
              :data.sync="list4"
              :load="params => listLoad(params, 4)"
            ></list>
            <list
              v-show="type === 5"
              ref="list5"
              key="5"
              :data.sync="list5"
              :load="params => listLoad(params, 5)"
            ></list>
          </div>
        </van-tab>
        <!-- 需要有水电抄表权限 -->
        <van-tab title="水电抄表" v-if="userInfo.sdcbrole == 1" name="1">
          <div class="select-header">
            <div class="tf-flex">
              <!-- 账单月份 -->
              <tf-picker
                class="date-time-box"
                v-model="monthId"
                title="选择时间"
                value-key="days_time_name"
                selected-key="id"
                :columns="monthList"
                @confirm="handleChange"
              >
                <template v-slot="{ valueText }">
                  <div class="tf-text">
                    {{ valueText
                    }}<span class="tf-icon tf-icon-caret-down"></span>
                  </div>
                </template>
              </tf-picker>
              <!-- 筛选，默认全部，样式跟选中不一样  -->
              <van-dropdown-menu
                :class="{ 'default-select': selectStatus === '全部' }"
              >
                <van-dropdown-item
                  v-model="selectStatus"
                  @change="handleChange"
                  :options="statusList"
                />
              </van-dropdown-menu>
            </div>
            <!-- 升序 -->
            <img
              v-if="listOrder == 0"
              class="order-image"
              src="@/assets/imgs/transaction-asc.png"
              @click="changeOrder"
            />
            <!-- 降序 -->
            <img
              v-if="listOrder == 1"
              class="order-image"
              src="@/assets/imgs/transaction-des.png"
              @click="changeOrder"
            />
          </div>
          <building-list
            ref="buildList"
            :data.sync="monthRecordList"
            :load="getMeterBuilding"
          ></building-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import list from './components/list'
import buildingList from './components/buildingList'
import tfPicker from '@/components/tf-picker/index'
import {
  getDbRepairList,
  getRepairCount,
  getHydropowerList
} from '@/api/personage'
import { mapGetters } from 'vuex'

export default {
  name: 'transactionIndex',
  components: {
    list,
    tfPicker,
    buildingList
  },
  data () {
    return {
      active: '0', // tab,0:报事报修，1:水电抄表
      backStatus: false, // 是否从详情页返回
      // 报事报修是选中tab，1：待处理，2：待分派，3：待结案，4：已结案，5：已取消；
      // 水电抄表是选中选择器，6：未抄电表 7：未抄水表 8:水电抄表全部
      type: undefined,
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
      countObj: {}, // 报事报修统计对象
      selectStatus: '全部', // 水电抄表筛选条件参数
      statusList: [], // 水电抄表筛选条件列表
      monthId: '', // 选中月份账单ID
      monthList: [], // 水电抄表月份账单参数列表
      listOrder: 0, // 水电抄表排序 0 正序 1倒序
      monthRecordList: [], // 水电抄表楼栋数据
      // 水电抄表参数列表是否赋值过，因为参数列表和楼栋数据是一起返回的
      // 月份参数默认取第一个值，如果每次赋值会覆盖掉原来的值，所以只需要进入页面赋值一次就行
      monthStatus: true
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    // 用户是否是客服部人员
    isService () {
      return this.userInfo.role_dep == 1
    }
  },
  created () {
    this.type = parseInt(this.$route.query.type)
    // 判断是报事报修还是水电抄表，也可以用是否客服人员判断
    this.active = this.type < 6 ? '0' : '1'
    // 水电抄表，根据type给筛选参数赋值
    switch (this.type) {
      case 6:
        this.selectStatus = '未抄电表'
        break
      case 7:
        this.selectStatus = '未抄水表'
        break
    }
  },
  activated () {
    this.reloadAllList()
  },
  methods: {
    // 刷新事务处理列表
    reloadAllList () {
      // 刷新报事报修所有列表
      if (this.active === '0') {
        this.getRepairCount()
        // 客服才有待处理，待分派，已取消
        if (this.isService) {
          this.$refs.list1.reload()
          this.$refs.list2.reload()
          this.$refs.list5.reload()
        }
        this.$refs.list3.reload()
        this.$refs.list4.reload()
      } else {
        // 刷新水电抄表楼栋列表，需要重新给参数列表赋值
        this.$refs.buildList.reload()
      }
    },
    // 报事报修列表请求数据
    listLoad (params, status) {
      params.status = status
      return getDbRepairList(params, this.userInfo.xm_project_id)
    },
    // 报事报修待办列表
    getDbRepairList (status) {
      getDbRepairList(
        {
          status
        },
        this.userInfo.xm_project_id // 服务人员的服务项目id
      ).then(res => {
        this[`list${status}`] = res.data
      })
    },
    // 报事报修各状态数量统计
    getRepairCount (status) {
      getRepairCount(
        this.userInfo.xm_project_id // 服务人员的服务项目id
      ).then(({ data }) => {
        this.countObj = data
      })
    },
    // 获取水电表楼栋
    getMeterBuilding () {
      const params = {
        month_id: this.monthId,
        record_state: this.selectStatus,
        list_order: this.listOrder
      }
      return getHydropowerList(params).then(
        ({ month_record_list, month_list, record_state }) => {
          // 是否需要重新给参数列表赋值，进入页面时需要，进入和返回
          if (this.monthStatus) {
            this.monthStatus = false
            this.monthList = month_list || []
            this.monthId = this.monthList[0].id || ''
          }
          this.statusList = record_state
          return Promise.resolve({
            data: month_record_list || []
          })
        }
      )
    },
    // 变换水电抄表楼栋排序
    changeOrder () {
      this.listOrder = this.listOrder === 0 ? 1 : 0
      this.$refs.buildList.reload()
    },
    // 水电抄表账单月份和筛选参数变换触发楼栋列表刷新
    handleChange () {
      this.$refs.buildList.reload()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 看是否从详情页返回
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
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 98px;
  background-color: #fff;
  .transaction-item {
    @flex-column();
    align-items: center;
  }
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
  overflow-x: auto;
  padding: 30px;
}
.transaction-tab {
  flex-shrink: 0;
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
.transaction-tab + .transaction-tab {
  margin-left: 20px;
}
.transaction-tab--active {
  color: #fff;
  border-color: @red-dark;
  background-color: @red-dark;
}
.transaction-list {
  height: calc(100% - 126px) !important;
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
}
.padding63 {
  padding-top: 126px;
}
/deep/ .van-tabs {
  display: flex;
  flex-direction: column;
  height: 100%;
}
/deep/ .van-tabs__content {
  flex: 1;
  height: 0;
  .van-tab__pane {
    height: 100%;
  }
}
/deep/ .van-tab {
  font-size: 30px;
}
/deep/ .van-tab--active .van-tab__text {
  font-size: 34px !important;
}
/deep/ .van-tabs__line {
  width: 92px !important;
}
.select-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  .tf-flex {
    align-items: center;
  }
  .date-time-box {
    margin-right: 30px;
    .tf-icon-caret-down {
      margin-left: 20px;
    }
  }
  .selected-date {
    font-size: 28px;
    color: #222;
    margin-right: 20px;
  }
  .order-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 66px;
    height: 66px;
    border-radius: 33px;
  }
  /deep/ .van-dropdown-menu__bar {
    width: 220px;
    background: none;
    border: 2px solid #aaaaaa;
    border-radius: 33px;
  }
  /deep/ .van-dropdown-menu__bar {
    border-color: @primary;
  }
  /deep/ .van-dropdown-menu__item {
    justify-content: flex-start;
    .van-dropdown-menu__title {
      font-size: 24px;
      color: @primary;
      width: 100%;
      &::after {
        margin-top: -8px;
        right: 20px;
        border: 6px solid;
        border-color: transparent transparent @primary @primary;
      }
    }
  }
}
.default-select {
  /deep/ .van-dropdown-menu__item {
    .van-dropdown-menu__title {
      color: #222;
      &::after {
        border-color: transparent transparent #aaa #aaa;
      }
    }
  }
  /deep/ .van-dropdown-menu__bar {
    border-color: #aaa;
  }
}
/deep/ .van-popup--top {
  width: 400px;
  left: initial;
  right: 20px;
  top: 30px;
  padding: 0 30px;
  border-radius: 10px;
  .van-dropdown-item__option {
    height: 110px;
    color: #8f8f94;
    .van-cell__title {
      width: 100%;
    }
  }
  .van-dropdown-item__option + .van-dropdown-item__option {
    border-top: 1px solid #f0f0f0;
  }
  .van-dropdown-item__option--active {
    color: #222;
  }
  .van-cell__value {
    display: none;
  }
}
/deep/ .van-sticky--fixed {
  top: 85px;
}
</style>

<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="消息"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      right-text="全部已读"
      @click-left="$router.go(-1)"
      @click-right="messageAllRead"
    ></van-nav-bar>
    <van-tabs class="tf-body-container" v-model="current">
      <van-tab
        id="message-list-0"
        v-if="userInfo.swrole == 1"
        title="工作"
        :badge="badgeList[1]"
      >
        <message-list
          ref="work"
          type="work"
          :load="({ pages }) => getMessageList(pages, 1)"
          @click="onWork"
          @mark="messageRead"
        ></message-list>
      </van-tab>
      <van-tab id="message-list-1" title="交易" :badge="badgeList[2]">
        <message-list
          ref="transaction"
          type="transaction"
          :load="({ pages }) => getMessageList(pages, 2)"
          @click="toTransaction"
          @mark="messageRead"
        ></message-list>
      </van-tab>
      <van-tab id="message-list-2" title="互动" :badge="badgeList[3]">
        <interaction
          ref="interaction"
          @click="toInteraction"
          @mark="messageRead"
        ></interaction>
      </van-tab>
      <van-tab id="message-list-3" title="物业" :badge="badgeList[4]">
        <message-list
          ref="butler"
          type="butler"
          :load="({ pages }) => getMessageList(pages, 4)"
          @click="toButler"
          @mark="messageRead"
        ></message-list>
      </van-tab>
      <van-tab id="message-list-4" title="活动" :badge="badgeList[5]">
        <message-list
          ref="activity"
          type="activity"
          :load="({ pages }) => getMessageList(pages, 5)"
          @click="onActivity"
          @mark="messageRead"
        ></message-list>
      </van-tab>
      <van-tab v-if="isShowTask" id="message-list-5" title="任务" :badge="badgeList[7]">
        <message-list
          ref="task"
          type="task"
          :load="({ pages }) => getMessageList(pages, 7)"
          @click="handleTaskClick"
          @mark="messageRead"
        ></message-list>
      </van-tab>
      <van-tab id="message-list-6" title="系统" :badge="badgeList[6]">
        <message-list
          ref="system"
          type="system"
          :load="({ pages }) => getMessageList(pages, 6)"
          @click="onSystem"
          @mark="messageRead"
        ></message-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from 'vant'
import messageList from './components/message-list.vue'
import interaction from './components/interaction.vue'
import {
  getMessageList,
  getCountMessage,
  messageRead,
  messageAllRead
} from '@/api/personage.js'
import { mapGetters } from 'vuex'
export default {
  name: 'messageIndex',
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    messageList,
    interaction
  },
  data () {
    return {
      badgeList: [],
      isShowTask: false,
      current: 0
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    this.mtjEvent({
      eventId: 7
    })
    this.getMessageList(1, 7).then(({ data }) => {
      this.isShowTask = data && data.length
    })
  },
  activated () {
    this.getCountMessage()
    if (this.scrollTop) {
      let index = this.current
      if (this.userInfo.swrole != 1) {
        index = index + 1
      }
      document
        .getElementById(`message-list-${index}`)
        .getElementsByClassName(
          'tf-list-refresh'
        )[0].scrollTop = this.scrollTop
    }
  },
  methods: {
    // 获取消息列表
    getMessageList (pages, type) {
      return getMessageList({
        remind_type: type,
        pages
      })
    },
    // 获取统计未读消息
    getCountMessage () {
      getCountMessage().then(res => {
        this.badgeList = res.data
      })
    },
    // 设置已读消息
    messageRead (item) {
      messageRead({
        id: item.id
      }).then(res => {
        item.is_read = '1'
        // this.getCountMessage()
      })
    },
    // 设置消息全部已读
    messageAllRead () {
      messageAllRead().then(res => {
        this.getCountMessage()
        Object.keys(this.$refs).forEach(key => {
          this.$refs[key] && this.$refs[key].readAll()
        })
      })
    },
    // 交易操作
    toTransaction (item) {
      if (item.is_read == 0) {
        this.messageRead(item)
      }
      const { sub_type } = item
      switch (sub_type) {
        case '1':
          this.$router.push({
            path: '/order/refund-detail',
            query: {
              type: item.refund_type,
              id: item.source_id
            }
          })
          break
        case '2':
          this.$router.push({
            path:
              item.order_type == '1'
                ? '/order/detail'
                : '/order/special-detail',
            query: {
              id: item.source_id
            }
          })
          break
        case '3':
          this.$router.push({
            path: '/store/goods-detail',
            query: {
              id: item.source_id
            }
          })
          break
        case '4':
          this.$router.push({
            path: '/order/barter-detail',
            query: {
              id: item.source_id
            }
          })
          break
        case '5':
          this.$router.push({
            path: '/order/refund-detail',
            query: {
              type: item.refund_type,
              id: item.source_id
            }
          })
          break
        case '20':
          this.$router.push({
            name: 'livePayRecord',
            query: {
              houseId: item.source_id
            }
          })
          break
        // 观影-电影票订单详情
        case '21':
          this.$router.push({
            name: 'movieTicket',
            query: {
              id: item.source_id
            }
          })
          break
      }
      // 商户提现详情
      if ([26, 29, 30].includes(+sub_type)) {
        this.$router.push({
          name: 'shopWithdrawDetail',
          query: {
            id: item.source_id
          }
        })
      }
      // 幸福币详情
      if (sub_type == 6 || sub_type == 7) {
        this.$router.push(
          `/pages/personage/happiness-coin/details?id=${item.source_id}`
        )
      }
    },
    // 互动操作
    toInteraction (item) {
      if (item.is_read == 0) {
        this.messageRead(item)
      }
      this.$router.push({
        path: '/pages/neighbours/details',
        query: {
          articleType: item.article_type,
          id: item.source_id
        }
      })
    },
    // 活动操作
    onActivity (item) {
      if (item.is_read == 0) {
        this.messageRead(item)
      }
      this.$router.push({
        path: '/pages/neighbours/details',
        query: {
          articleType: '2',
          id: item.source_id
        }
      })
    },
    // 物业操作
    toButler (item) {
      if (item.is_read == 0) {
        this.messageRead(item)
      }
      switch (item.sub_type) {
        // 公告通知-详情
        case '13':
          this.$router.push({
            path: '/pages/butler/notice/details',
            query: {
              id: item.source_id
            }
          })
          break
        // 归还通知-我的免费服务列表
        case '14':
          this.$router.push({
            path: '/pages/butler/freeserver/list'
          })
          break
        // 投诉表扬-详情
        case '15':
          this.$router.push({
            path: '/pages/butler/compraise/details',
            query: {
              id: item.source_id
            }
          })
          break
        // 报事报修-详情
        case '16':
          this.$router.push({
            path: '/pages/butler/repairs/details',
            query: {
              id: item.source_id
            }
          })
          break
        // 报事报修-详情
        case '19':
          this.$router.push({
            name: 'livePayIndex',
            query: {
              id: item.source_id
            }
          })
          break
        // 生活缴费-充值/缴费页面
        case '22':
          this.$router.push({
            name: 'livemainPay',
            query: {
              genreType: item.genre_type,
              projectId: item.project_id,
              houseId: item.expenses_house_id
            }
          })
          break
      }
    },
    // 系统操作
    onSystem (item) {
      if (item.is_read == 0) {
        this.messageRead(item)
      }
      if (item.sub_type == 8) {
        this.$router.push({
          name: 'sysMsgInfo',
          query: {
            id: item.source_id
          }
        })
      }
      if (item.sub_type == 9) {
        this.$router.push({
          path: '/pages/personage/feedback/details',
          query: {
            id: item.source_id
          }
        })
      }
      if ([27, 28].includes(+item.sub_type)) {
        this.$router.push({
          name: 'shopInformation',
          query: {
            shopId: item.source_id,
            type: 1
          }
        })
      }
    },
    // 工作操作 - 处理员报事报修详情
    onWork (item) {
      if (item.is_read == 0) {
        this.messageRead(item)
      }
      this.$router.push({
        path: '/pages/personage/transaction/details',
        query: {
          id: item.source_id
        }
      })
    },
    // 任务操作
    handleTaskClick (item) {
      if (item.is_read == 0) {
        this.messageRead(item)
      }
      const routeName = {
        // 接单方 - 任务进度
        23: 'scheduleReceiver',
        // 任务方 - 我的任务详情
        24: 'PersonageTaskDetails',
        // 任务提问
        25: 'operateQuiz'
      }
      this.$router.push({
        name: routeName[item.sub_type],
        query: {
          taskId: item.source_id
        }
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    const name = ['home', 'butler', 'neighbours', 'personage']
    if (name.includes(to.name)) {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    } else {
      let index = this.current
      if (this.userInfo.swrole != 1) {
        index = index + 1
      }
      const el = document
        .getElementById(`message-list-${index}`)
        .getElementsByClassName('tf-list-refresh')
      this.scrollTop = (el[0] && el[0].scrollTop) || 0
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.tf-body-container {
  @flex-column();
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    > .van-tab__pane {
      height: 100%;
    }
  }
}
.tf-flex-item {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
/deep/ .van-info {
  top: 16px;
  right: -16px;
}
</style>

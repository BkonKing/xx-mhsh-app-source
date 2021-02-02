<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="我的影票"
      :fixed="true"
      :border="false"
      left-arrow
      placeholder
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-kefu"></span>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <van-tabs
        class="list-tabs-nopane"
        v-model="type"
        @change="reloadOrderList"
        sticky
        offset-top="44"
      >
        <van-tab
          v-for="(item, i) in typeOptions"
          :key="i"
          :name="item.value"
          :title="item.text"
        ></van-tab>
        <refreshList
          ref="orderList"
          :pagination="false"
          :list.sync="orderList"
          :load="getticklist"
        >
          <template v-slot="{ item }">
            <div class="order-box" @click="goTicket(item)">
              <div class="order-header">
                <div class="order-cinema">{{ item.cinema_name }}</div>
                <div
                  class="order-status"
                  :class="{ 'tf-text-primary': item.get_status === 0 }"
                >
                  {{ item.order_desc }}
                </div>
              </div>
              <div class="order-content">
                <img class="order-cover" :src="item.cover" />
                <div class="order-content-right">
                  <div class="order-film-name">{{ item.film_name }}</div>
                  <div class="tf-flex">
                    <div class="order-film-time">
                      场次：
                    </div>
                    <div>
                      {{ item.date }} {{ item.week }} <br />
                      {{ item.time }}
                    </div>
                  </div>
                  <div class="order-film-number">数量：{{ item.count }}张</div>
                </div>
              </div>
              <div class="order-footer">
                <span class="tf-text-grey">合计:</span>￥{{ item.pay_price }}
              </div>
            </div>
          </template>
        </refreshList>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import refreshList from '@/components/tf-refresh-list'
import { mapGetters } from 'vuex'
import { getticklist } from '@/api/movie'
export default {
  name: 'movieOrder',
  components: {
    refreshList
  },
  data () {
    return {
      type: 0, // 类型0全部1待取票2已取票3已取消
      typeOptions: [
        {
          text: '全部',
          value: 0
        },
        {
          text: '待取票',
          value: 1
        },
        {
          text: '已取票',
          value: 2
        },
        {
          text: '已取消',
          value: 3
        }
      ],
      orderList: []
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    // 获取订单列表
    getticklist () {
      return getticklist({
        uid: this.userInfo.id,
        type: this.type
      })
    },
    // 切换订单类型重新刷新类别
    reloadOrderList () {
      this.$refs.orderList && this.$refs.orderList.reload()
    },
    // 跳转到电影票详情
    goTicket ({ order_id }) {
      this.$router.push({
        name: 'movieTicket',
        query: {
          id: order_id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.order-box {
  padding: 0 30px;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 10px;
  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90px;
    border-bottom: 2px solid #f0f0f0;
    .order-cinema {
      font-size: 28px;
      color: #222222;
    }
    .order-status {
      font-size: 28px;
      color: #8f8f94;
    }
  }
  .order-content {
    display: flex;
    padding: 30px 0;
    .order-cover {
      width: 140px;
      height: 196px;
      margin-right: 20px;
      border-radius: 4px;
    }
    .order-content-right {
      display: flex;
      flex-direction: column;
      font-size: 30px;
      color: #8f8f94;
    }
    .order-film-name {
      margin-bottom: 16px;
      font-size: 30px;
      font-weight: 600;
      color: #000000;
    }
  }
  .order-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 90px;
    font-size: 34px;
    color: #222222;
    border-top: 2px solid #f0f0f0;
    .tf-text-grey {
      font-size: 24px;
    }
  }
}
/deep/ .tf-list-refresh {
  padding: 30px 20px;
}
</style>

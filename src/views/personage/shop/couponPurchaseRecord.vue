<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="购买优惠券"
      placeholder
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="goBack"
    />
    <div class="tf-body-container" id="buy-coupon-list">
      <refreshList
        class="refresh-box"
        :list.sync="orderList"
        :load="getOrderList"
      >
        <template v-slot="{ item }">
          <div class="card-box" @click="goCouponDetail(item)">
            <div class="card-header">
              <div>
                <span>订单编号：</span>
                <span>{{ item.order_numb }}</span>
              </div>
              <div>{{ item.order_status_name }}</div>
            </div>
            <div class="card-content">
              <img
                class="card-img"
                src="@/assets/personage/shop/coupon.png"
                alt=""
              />
              <div class="coupon-info">
                <div class="card-name">
                  {{ item.order_goods_specs_list[0].goods_name }}
                </div>
                <div class="card-text">1张</div>
                <div class="card-text tf-row-vertical-center">
                  <span>不支持退货</span
                  ><i
                    class="van-icon van-icon-question-o"
                    @click.stop="popoverVisible = true"
                  ></i>
                </div>
              </div>
              <div class="card-content-right">
                <div class="card-money">
                  ￥{{
                    item.pay_type == 1
                      ? item.happiness_price / 100
                      : item.pay_price / 100
                  }}
                </div>
                <div class="card-text">x1</div>
              </div>
            </div>
            <div class="card-footer">
              <div class="card-text">共 {{ item.goods_num }} 件</div>
              <div class="card-text">
                合计：<span class="card-user-money"
                  >￥{{
                    item.pay_type == 1
                      ? item.happiness_price / 100
                      : item.pay_price / 100
                  }}</span
                >
              </div>
            </div>
          </div>
        </template>
      </refreshList>
    </div>
    <explain-popover v-model="popoverVisible"></explain-popover>
  </div>
</template>

<script>
import refreshList from '@/components/tf-refresh-list'
import ExplainPopover from '@/views/personage/shop/components/ExplainPopover'
import { getOrderList } from '@/api/life'

export default {
  name: 'noticeIndex',
  components: {
    ExplainPopover,
    refreshList
  },
  data () {
    return {
      search: '',
      popoverVisible: false,
      orderList: [],
      scrollTop: 0
    }
  },
  created () {},
  activated () {
    if (this.scrollTop) {
      document
        .getElementById('buy-coupon-list')
        .getElementsByClassName(
          'tf-list-refresh'
        )[0].scrollTop = this.scrollTop
    }
  },
  methods: {
    getOrderList ({ pages }) {
      return getOrderList({
        page: pages,
        order_type: 3
      }).then(({ data }) => {
        return {
          data: data.order_project_list
        }
      })
    },
    searchChange () {},
    goCouponDetail ({ id }) {
      this.$router.push({
        name: 'shopCouponDetail',
        query: {
          id
        }
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'butler') {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    } else {
      const el = document
        .getElementById('buy-coupon-list')
        .getElementsByClassName('tf-list-refresh')
      this.scrollTop = (el[0] && el[0].scrollTop) || 0
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.tf-body-container {
  padding: 30px 20px;
  .refresh-box {
    width: 710px;
    padding: 0;
  }
}
.card-box {
  width: 710px;
  min-height: 372px;
  padding: 0 30px;
  margin-bottom: 10px;
  background: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 82px;
    border-bottom: 1px solid #f0f0f0;
    div,
    span {
      font-size: 24px;
      line-height: 1;
      color: #222222;
    }
  }
  .card-content {
    display: flex;
    padding: 30px 0 40px;
    .card-img {
      width: 130px;
      height: 130px;
      margin-right: 22px;
    }
    .coupon-info {
      flex: 1;
      margin-right: 20px;
      .card-name {
        margin-bottom: 20px;
        font-size: 28px;
        font-weight: bold;
        color: #222222;
        line-height: 1;
        + .card-text {
          margin-bottom: 24px;
        }
      }
      .van-icon-question-o {
        margin-left: 12px;
        font-size: 30px;
        color: #aaaaaa;
      }
    }
    .card-content-right {
      min-width: 150px;
      text-align: right;
      .card-money {
        margin-bottom: 72px;
        font-size: 28px;
        font-weight: bold;
        color: #222222;
      }
    }
  }
  .card-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 88px;
    border-top: 1px solid #f0f0f0;
    .card-text + .card-text {
      margin-left: 30px;
    }
    .card-user-money {
      font-size: 34px;
      font-weight: bold;
      color: #222;
    }
  }
  .card-text {
    font-size: 24px;
    color: #8f8f94;
    line-height: 1;
  }
}
</style>

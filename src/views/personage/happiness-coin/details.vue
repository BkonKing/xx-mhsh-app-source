<template>
  <div class="tf-bg">
    <van-nav-bar
      title="幸福币明细"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="tf-padding">
      <userInfo :avatar="info.avatar" :name="info.username"></userInfo>
      <div class="module-box money-box">
        <div class="money-num">{{parseInt(info.credits) > 0 ? '+' : ''}}{{info.credits}}</div>
        <!-- <div class="tf-text-lg tf-text-grey">退款成功</div> -->
      </div>
      <div class="module-box">
        <div class="clist-item">
          <div class="clist-item__label">
            <span class="mr60">类</span>型
          </div>
          <div>{{info.title}}</div>
        </div>
        <div class="clist-item">
          <div class="clist-item__label">
            <span class="mr60">时</span>间
          </div>
          <div>{{info.ctime}}</div>
        </div>
        <div class="clist-item">
          <div class="clist-item__label">对方账户</div>
          <div>{{info.to_username}}</div>
        </div>
        <div class="clist-item">
          <div class="clist-item__label">交易单号</div>
          <div>{{info.log_no}}</div>
        </div>
        <div class="clist-item">
          <div class="clist-item__label">
            <span class="mr60">备</span>注
          </div>
          <div>{{info.source_var}}</div>
        </div>
      </div>
      <div v-if="info.jy_type === '5'" class="module-box">
        <div class="tf-row-space-between" @click="goOrderDefail">
          <div>任务详情</div>
          <span class="tf-icon tf-icon-right"></span>
        </div>
      </div>
      <div v-else-if="info.jy_type != '0'" class="module-box">
        <div class="clist-item">
          <div class="clist-item__label">商品说明</div>
          <div class="van-ellipsis">{{info.sp_description}}</div>
        </div>
        <div class="tf-row-space-between divider-box" @click="goOrderDefail">
          <div>订单详情</div>
          <span class="tf-icon tf-icon-right"></span>
        </div>
      </div>
      <!--<div class="module-box">
        <div class="tf-row-space-between">
          <div>往来记录</div>
          <span class="tf-icon tf-icon-right"></span>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import userInfo from '@/components/user-info/index.vue'
import { getCreditsInfo } from '@/api/personage'
export default {
  components: {
    [NavBar.name]: NavBar,
    userInfo
  },
  data () {
    return {
      id: '',
      info: {}
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getCreditsInfo()
  },
  methods: {
    // 幸福币交易详情
    getCreditsInfo () {
      getCreditsInfo({
        logId: this.id
      }).then(res => {
        this.info = res.data
      })
    },
    goOrderDefail () {
      const { order_id } = this.info
      let path = ''
      switch (this.info.jy_type) {
        case '1':
          path = `/order/refund-detail?type=1&id=${order_id}`
          break
        case '2':
          path = `/order/refund-detail?type=2&id=${order_id}`
          break
        case '3':
          if (this.info.order_type == 1) {
            path = `/order/coin-detail?id=${order_id}`
          } else if (this.info.order_type == 2) {
            path = `/order/special-detail?id=${order_id}`
          } else {
            path = `/personage/shop/couponDetail?id=${order_id}`
          }
          break
        case '4':
          path = `/life/movie/ticket?id=${order_id}`
          break
        case '5':
          path = `/pages/task/detail?taskId=${order_id}`
          break
      }
      this.$router.push({
        path
      })
    }
  }
}
</script>

<style lang='less' scoped>
.module-box {
  border-radius: 10px;
  background: #fff;
  padding: 30px;
  margin-top: 30px;
  .clist-item {
    display: flex;
    font-size: 30px;
    &__label {
      margin-right: 40px;
      color: #8f8f94;
    }
  }
  .clist-item + .clist-item {
    margin-top: 15px;
  }
  .van-ellipsis {
    flex: 1;
  }
}
.money-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  .money-num {
    font-size: 72px;
    font-weight: 500;
  }
}
.mr60 {
  margin-right: 60px;
}
.tf-row-space-between {
  align-items: center;
  font-size: 30px;
}
.divider-box {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 2px solid #f0f0f0;
}
</style>

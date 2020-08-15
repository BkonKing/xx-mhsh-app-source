<template>
  <div class="tf-bg">
    <van-nav-bar
      title="幸福币明细"
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="tf-main-container">
      <userInfo :avatar="avatar" :name="`${nickname}(${realname})`" :time="mobile"></userInfo>
      <div class="module-box money-box">
        <div class="money-num">+200</div>
        <div class="tf-text-lg tf-text-grey">退款成功</div>
      </div>
      <div class="module-box">
        <div class="clist-item">
          <div class="clist-item__label">
            <span class="mr60">类</span>型
          </div>
          <div>获取-购物消费</div>
        </div>
        <div class="clist-item">
          <div class="clist-item__label">
            <span class="mr60">时</span>间
          </div>
          <div>获取-购物消费</div>
        </div>
        <div class="clist-item">
          <div class="clist-item__label">对方账户</div>
          <div>获取-购物消费</div>
        </div>
        <div class="clist-item">
          <div class="clist-item__label">交易单号</div>
          <div>获取-购物消费</div>
        </div>
        <div class="clist-item">
          <div class="clist-item__label">
            <span class="mr60">备</span>注
          </div>
          <div>获取-购物消费</div>
        </div>
      </div>
      <div class="module-box">
        <div class="clist-item">
          <div class="clist-item__label">商品说明</div>
          <div>获取-购物消费</div>
        </div>
        <div class="tf-row-space-between divider-box">
          <div>订单详情</div>
          <span class="tf-icon tf-icon-right"></span>
        </div>
      </div>
      <div class="module-box">
        <div class="tf-row-space-between">
          <div>往来记录</div>
          <span class="tf-icon tf-icon-right"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import userInfo from '@/components/user-info/index.vue'
export default {
  components: {
    [NavBar.name]: NavBar,
    userInfo
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang='less' scoped>
.tf-main-container {
  padding: 118px 20px 0;
}
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
  border-top: 2px solid #F0F0F0;
}
</style>

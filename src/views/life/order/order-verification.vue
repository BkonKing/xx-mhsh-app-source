<template>
  <div class="app-body tf-bg">
    <div class="order-bar bar-white">
      <van-nav-bar
        title="订单核销"
        fixed
        :border="false"
        placeholder
        left-arrow
        @click-left="$router.go(-1)"
      >
        <template slot="left"
          ><div class="nav-goback">
            <img class="img-100" src="@/assets/img/close_03.png" /></div
        ></template>
      </van-nav-bar>
    </div>
    <template v-if="infoData">
      <div class="block-session order-take">
        <div class="take-info flex-column-center">
          <div class="user-info">
            {{ infoData.rece_text }}
          </div>
          <div class="address-info">{{ infoData.rece_address }}</div>
        </div>
        <div class="distribution-info flex-column-center">
          <div class="distribution-item">
            <div>配送方式：</div>
            <div>上门自提</div>
          </div>
          <div class="distribution-item">
            <div>提货地点：</div>
            <div class="text-wrap">{{ infoData.take_address }}</div>
          </div>
          <div class="distribution-item">
            <div>订单备注：</div>
            <div class="text-wrap">
              {{ infoData.user_explain ? infoData.user_explain : "无" }}
            </div>
          </div>
        </div>
      </div>
      <div class="block-session order-goods">
        <div class="order-goods-tit flex-between">
          <div>商品信息</div>
          <div>共 {{ infoData.count }} 件</div>
        </div>
        <div class="goods-list">
          <div
            v-for="(item, index) in infoData.order_goods_specs_list"
            :key="index"
            class="goods-item"
          >
            <div class="goods-index flex-column-center">
              <div>{{ index + 1 }}</div>
            </div>
            <div class="goods-info">
              <img class="goods-img" :src="item.specs_img" />
              <div class="goods-name-des flex-column-center">
                <div class="goods-name p-nowrap">{{ item.goods_name }}</div>
                <div class="goods-des">{{ item.specs_name }}</div>
              </div>
            </div>
            <div class="goods-num flex-align-center">×{{ item.count }}</div>
          </div>
        </div>
      </div>
      <div v-if="infoData.is_verification" class="btn-block">
        <div class="bottom-fixed">
          <van-button
            v-preventReClick
            class="submit-btn"
            :loading="submitLoading"
            @click="sureFunc"
            >确定核销</van-button
          >
        </div>
      </div>
      <div v-else class="status-block">
        <div class="bottom-fixed">已核销</div>
      </div>
    </template>
  </div>
</template>

<script>
import { NavBar, Toast } from 'vant'
import { takeCodeScan } from '@/api/butler'
import { sureVerification } from '@/api/life.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast
  },
  data () {
    return {
      infoData: {},
      submitLoading: false,
      code_info: ''
    }
  },
  created () {
    this.code_info = this.$route.query.code_info
    this.getData()
  },
  methods: {
    getData () {
      takeCodeScan({
        code_info: this.code_info
      }).then(res => {
        if (res.success) {
          this.infoData = res
        }
      })
    },
    sureFunc () {
      this.submitLoading = true
      sureVerification({
        code_info: this.code_info
      }).then(res => {
        if (res.success) {
          Toast({
            message: '核销成功',
            duration: 1500
          })
          this.$router.go(-1)
        }
      }).finally(() => {
        this.submitLoading = false
      })
    }
  }
}
</script>

<style scoped src="../../../styles/life.css"></style>
<style scoped>
.app-body {
  color: #222222;
  font-size: 28px;
}
.nav-goback {
  width: 26px;
  height: 26px;
  margin-left: 10px;
}
.block-session {
  margin-top: 30px;
}
.order-take,
.order-goods {
  padding: 0 30px;
}
.take-info {
  min-height: 152px;
  border-bottom: 1px solid #f2f2f4;
}
.address-info {
  color: #8f8f94;
  font-size: 24px;
  line-height: 1.5;
  margin-top: 8px;
}
.distribution-info {
  min-height: 218px;
  padding: 25px 0;
}
.distribution-item {
  display: flex;
  padding-top: 8px;
  min-height: 56px;
}
.distribution-item div {
  line-height: 40px;
}
.distribution-item div:nth-child(1) {
  white-space: nowrap;
}
.order-goods-tit {
  height: 90px;
  border-bottom: 1px solid #f2f2f4;
}
.goods-list {
  padding: 30px 0 10px;
}
.goods-item {
  height: 88px;
  margin-bottom: 30px;
  display: flex;
}
.goods-index {
  width: 54px;
  flex-shrink: 0;
}
.goods-index div {
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 50%;
  background-color: #383838;
  font-size: 20px;
  color: #fff;
  font-weight: bold;
}
.goods-info {
  flex-grow: 1;
  display: flex;
}
.goods-info img {
  width: 88px;
  height: 88px;
  border-radius: 4px;
  margin-right: 20px;
}
.goods-name-des {
  max-width: 440px;
}
.goods-name {
  line-height: 30px;
  margin-bottom: 16px;
}
.goods-des {
  color: #8f8f94;
  line-height: 26px;
  font-size: 24px;
}
.btn-block {
  height: 148px;
}
.btn-block > div {
  height: 148px;
  padding: 30px 0;
}
.submit-btn {
  width: 710px;
  margin: 0 auto;
  font-size: 30px;
  color: #fff;
  border: none;
}
.status-block {
  height: 128px;
  padding-top: 30px;
}
.status-block div {
  background-color: #383838;
  font-size: 30px;
  color: #fff;
  height: 98px;
  line-height: 98px;
  text-align: center;
  border-radius: 20px 20px 0 0;
}
.text-wrap {
  word-break: break-all;
}
</style>

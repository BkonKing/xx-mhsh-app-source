<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="店铺资料"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-tabs v-model="active">
      <van-tab title="店铺信息">
        <shop-information-tab :shopId="shopId"></shop-information-tab>
      </van-tab>
      <van-tab title="商家认证"
        ><shop-authentication :shopId="shopId"></shop-authentication
      ></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ShopInformationTab from './components/ShopInformationTab.vue'
import ShopAuthentication from './components/ShopAuthentication.vue'
export default {
  name: 'shopInformation',
  components: { ShopInformationTab, ShopAuthentication },
  data () {
    return {
      shopId: '',
      active: 0
    }
  },
  created () {
    this.shopId = this.$route.query.shopId
    const type = this.$route.query.type
    type && (this.active = +type)
  },
  methods: {},
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'addressMap') {
      this.$destroy()
      this.$store.commit('setMap_info', '')
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.tf-body /deep/ .van-tabs__line {
  width: 40px !important;
  height: 6px;
  background: #ff5240;
  border-radius: 3px;
}
.tf-body /deep/ .van-tab--active .van-tab__text {
  font-size: 32px;
}
/deep/ .van-tab__text {
  color: #000000cc;
}
</style>

<template>
  <div class="pay-agreeMent">
    <van-nav-bar
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="goback"
    >
      <template #title>
        <div>
          银行支付服务协议
        </div>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { NavBar } from "vant";
import { payAgreement } from "@/api/personage.js";
export default {
  components: {
    [NavBar.name]: NavBar
  },
  methods: {
    // 回退
    goback() {
      this.$router.go(-1);
    }
  },
  async created() {
    const res = await payAgreement();
    console.log(res);
  }
};
</script>

<style></style>

<template>
  <div class="personInfo">
    <van-nav-bar
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="goback"
    ></van-nav-bar>
  </div>
</template>

<script>
import { NavBar, Field, Button, Popup } from "vant";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Button.name]: Button,
    [Popup.name]: Popup
  },
  methods: {
    // 回退
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style></style>

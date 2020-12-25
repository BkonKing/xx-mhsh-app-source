<template>
  <div class="editInfo">
    <van-nav-bar
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="goback"
    >
      <template #title>
        <div class="title">{{ titleObj[type] }}</div>
      </template>
      <template #right>
        <div class="right">保存</div>
      </template>
    </van-nav-bar>
    <div class="content"></div>
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  components: {
    [NavBar.name]: NavBar
  },
  data() {
    return {
      titleObj: {
        realname: "修改姓名",
        nickname: "修改昵称",
        avatar: "修改头像"
      },
      type: this.$route.query.type
    };
  },
  methods: {
    // 回退
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.editInfo {
  .title {
    font-size: 34px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 44px;
  }
}
</style>

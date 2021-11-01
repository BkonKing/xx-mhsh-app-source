<template>
  <div class="user-info-container">
    <div class="tf-row-space-between">
      <div class="user-info__left-box">
        <img
          v-if="userInfo.be_avatar"
          class="tf-mr-base tf-avatar"
          :src="userInfo.be_avatar"
        />
        <img
          v-else
          class="tf-mr-base tf-avatar"
          src="@/assets/imgs/touxiang.png"
          mode="aspectFit"
        />
        <div class="user-info--name">
          <div>{{ userInfo.be_nickname || "暂无昵称" }}</div>
          <div v-if="type === 0" class="text-info">{{ userInfo.ctime }}</div>
        </div>
      </div>
      <div class="user-info__right-box">
        <template v-if="type === 0">
          <div class="type0-text">+{{ userInfo.credits }}幸福币</div>
          <div class="text-info">{{ userInfo.i_type | awardType }}</div>
        </template>
        <div v-else>{{ userInfo.ctime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: [Number, String],
      default: 0 // 我的奖励
    }
  },
  filters: {
    awardType (type) {
      const awardType = {
        1: '下载登录',
        2: '房间认证'
      }
      return awardType[type]
    }
  }
}
</script>

<style lang="less" scoped>
.user-info-container {
  display: flex;
  width: 100%;
  height: 120px;
  .tf-row-space-between {
    width: 100%;
    border-bottom: 1px solid #ededed;
  }
}
.user-info__left-box {
  flex: 1;
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 20px;
}
.user-info--name {
  flex: 1;
  width: 0;
  font-size: 28px;
  font-weight: 600;
  color: #81531b;
  @text-ellipsis();
  > div {
    line-height: 1;
  }
}
.text-info {
  margin-top: 18px;
  font-size: 24px;
  color: #8f8f94;
}
.user-info__right-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 24px;
  color: #8f8f94;
  text-align: right;
  > div {
    line-height: 1;
  }
  .type0-text {
    font-size: 28px;
    color: #222222;
  }
}
</style>

<template>
  <van-popup v-model="dialog" class="sign-popup">
    <div class="sign-header">
      签到规则<i class="tf-icon tf-icon-guanbi" @click="dialog = false"></i>
    </div>
    <div class="sign-rule-dialog">
      <div class="sign-rule-title">“家庭签到”规则：</div>
      <div class="sign-rule-text">
        1、同个房间号下绑定业主、业主成员、租户、租户成员等，当前每日签到均可得5幸福币；
      </div>
      <div class="sign-rule-text">
        2、每个房间号的“家庭签到”当前每日额度最高为15幸福币；
      </div>
      <div class="sign-rule-text">
        3、成员签到规则如下：按签到先后顺序，A房间下业主张先生签到得5幸福币，业主成员老张，小张签到各得5幸福币，租户小王再签到提示“明天早点来哦”；
      </div>
      <div class="sign-rule-text">
        4、若签到规则调整以新规则说明为准。
      </div>
    </div>
    <van-button class="sign-btn" @click="dialog = false">确定</van-button>
  </van-popup>
</template>

<script>
export default {
  name: 'SignRuleDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialog: this.value
    }
  },
  watch: {
    value (val) {
      this.dialog = val
    },
    dialog (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less">
.sign-popup {
  width: 560px;
  background: #ffffff;
  border-radius: 10px;
  .sign-btn {
    width: 560px;
    height: 80px;
    background: #febf00;
    border-radius: 10px;
    font-size: 28px;
    font-weight: bold;
    color: #ffffff;
    border: none;
    /deep/ .van-button__text {
      line-height: 1;
    }
  }
  .sign-header {
    position: relative;
    padding: 30px;
    font-size: 32px;
    font-weight: bold;
    color: #222222;
    &::before {
      content: "";
      display: block;
      width: 60px;
      height: 12px;
      position: absolute;
      bottom: 34px;
      left: 30px;
      z-index: -1;
      background: #febf00;
      border-radius: 6px;
    }
    .tf-icon-guanbi {
      position: absolute;
      top: 30px;
      right: 30px;
      font-size: 30px;
    }
  }
  .sign-rule-dialog {
    padding: 20px 30px 40px;
    .sign-rule-title {
      font-size: 26px;
      color: #222222;
      line-height: 48px;
    }
    .sign-rule-text {
      font-size: 26px;
      color: #8f8f94;
      line-height: 52px;
    }
  }
}
</style>

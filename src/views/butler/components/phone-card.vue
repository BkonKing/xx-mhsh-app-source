<template>
  <div class="phone-box"  :class="{'have-padding': true}" @click="makePhoneCall(number)">
    <div class="phone-info" :class="{'phone-info__divider': info}">
      <div v-if="tag" class="phone-name-tag">
        <div class="phone-name-tag__text">{{name}}</div>
      </div>
      <div v-else class="phone-name">{{name}}</div>
      <div class="tf-row-vertical-center">
        <div class="tf-icon tf-icon-dianhua"></div>
        <div class="phone-number">{{number}}</div>
      </div>
    </div>
    <div class="tf-card-content" v-if="info" :class="{'have-padding': true}">{{info}}</div>
  </div>
</template>

<script>
const stringProp = {
  type: String,
  default: ''
}
export default {
  name: 'phone-card',
  props: {
    tag: {
      type: [Boolean, String, Number],
      default: false
    },
    name: stringProp,
    number: stringProp,
    info: stringProp
  },
  data () {
    return {

    }
  },
  methods: {
    makePhoneCall (phoneNumber) {
      api.call({
        type: 'tel_prompt',
        number: phoneNumber
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .phone-box {
    margin-bottom: 30px;
    border-radius: 10px;
    background-color: #fff;
  }

  .have-padding {
    padding-left: 20px;
    padding-right: 20px;
  }

  .phone-footer {
    // background-color: @background-color;
    // border-radius: 5px;
    font-size: 24px;
    color: @gray-7;
    margin-top: @padding-lg;
    line-height: 44px;
  }

  .phone-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    line-height: 80px;
  }

  .phone-info__divider {
    border-bottom: 2px solid @divider-color;
  }

  .phone-name {
    font-size: 30px;
    color: @text-color;
  }

  .phone-number {
    font-size: 38px;
    line-height: 80px;
    color: @text-color;
    margin-left: 10px;
  }

  .phone-name-tag {
    margin-left: -20px;
    width: 190px;
    height: 60px;
    padding-left: 30px;
    font-size: 28px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    background-image: linear-gradient(to right, @orange-dark, @orange);
  }

  .phone-name-tag__text {
    font-size: @font-size-md;
    line-height: 60px;
    color: #fff;
  }

  .tf-icon {
    font-size: 40px;
    color: @text-color;
  }
  .tf-card-content {
    padding: 20px 0;
    color: @gray-7;
  }
</style>

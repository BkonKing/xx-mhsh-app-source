<template>
  <van-nav-bar class="tf-nav-bar">
    <template #left>
      <div class="tf-row-vertical-center room_btn" @click="goSelect" v-if="status">
        <span class="tf-icon">{{ iconLocation }}</span>
        <span class="tf-text">{{ name }}</span>
      </div>
      <div class="tf-row-vertical-center room_btn" v-else>
        <span class="tf-icon">{{ iconLocation }}</span>
        <span class="tf-text underline">请认证房间号</span>
      </div>
    </template>
    <template #right>
      <span class="tf-icon" @click="scan">{{ iconScan }}</span>
      <div class="notice-box">
        <span class="tf-icon margin-left">{{ iconMail }}</span>
        <span v-if="status" class="van-info">2</span>
      </div>
    </template>
  </van-nav-bar>
</template>

<script>
import { NavBar } from 'vant'
import { iconLocation, iconScan, iconMail } from '@/const/icon.js'
export default {
  components: {
    [NavBar.name]: NavBar
  },
  props: {
    status: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      iconLocation,
      iconScan,
      iconMail
    }
  },
  methods: {
    goSelect () {
      this.$router.push('/pages/personage/house/select-community')
    },
    scan () {
      this.$router.push('/pages/personage/scanCode/index')
    }
  }
}
</script>

<style lang="less" scoped>
.tf-nav-bar {
  background: none;
  &:after {
    border: none;
  }
}
.tf-icon {
  font-size: 44px;
  color: #fff;
}

.tf-text {
  color: #fff;
}

.notice-box {
  position: relative;
  padding-right: 17px;
}

.van-info {
  height: 24px;
  line-height: 24px;
  top: 10px;
  right: 10px;
  background: #fff;
  color: @red-dark;
}

.underline {
  text-decoration: underline;
}

.margin-left {
  margin-left: 28px;
}
</style>

<template>
  <van-nav-bar class="tf-nav-bar">
    <template #left>
      <div class="tf-row-vertical-center room_btn" @click="goSelect">
        <span class="tf-icon tf-icon-location"></span>
        <span v-if="status" class="tf-text">{{ name }}</span>
        <span v-else class="tf-text underline">请认证房间</span>
      </div>
    </template>
    <template #right>
      <span v-if="search" class="tf-icon tf-icon-search" @click="onSearch"></span>
      <span class="tf-icon tf-icon-scan" @click="scan"></span>
      <div class="notice-box" @click="goMessage">
        <span class="tf-icon tf-icon-mail margin-left"></span>
        <span v-if="status" class="van-info">2</span>
      </div>
    </template>
  </van-nav-bar>
</template>

<script>
import { NavBar } from 'vant'
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
    },
    search: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  methods: {
    goMessage () {
      this.$router.push('/pages/personage/message/index')
    },
    goSelect () {
      const url = this.status
        ? '/pages/personage/house/select-community'
        : '/pages/personage/house/attestation'
      this.$router.push(url)
    },
    scan () {
      this.$router.push('/pages/personage/scanCode/index')
    },
    onSearch () {}
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
  font-size: 18px;
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

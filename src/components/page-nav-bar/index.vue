<template>
  <van-nav-bar class="tf-nav-bar" placeholder>
    <template #left>
      <div class="tf-row-vertical-center room_btn" @click="goAttestation">
        <span class="tf-icon tf-icon-dingwei"></span>
        <span
          v-if="currentProject"
          class="tf-text"
        >{{ currentProject.project_name + currentProject.fc_info }}</span>
        <span v-else class="tf-text underline">请认证房间</span>
      </div>
    </template>
    <template #right>
      <span v-if="search" class="tf-icon tf-icon-search" @click="onSearch"></span>
      <span class="tf-icon tf-icon-saoyisao" @click="scan"></span>
      <span class="tf-icon tf-icon-xiaoxi margin-left" @click="goMessage">
        <span v-if="status" class="van-info">2</span>
      </span>
    </template>
  </van-nav-bar>
</template>

<script>
import { NavBar } from 'vant'
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters(['currentProject'])
  },
  methods: {
    goMessage () {
      this.$router.push('/pages/personage/message/index')
    },
    /* 跳转房屋认证 */
    goAttestation () {
      const url = this.currentProject
        ? '/pages/personage/house/select-house'
        : '/pages/personage/house/attestation?type=1&mode=0&select=1'
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

.tf-icon-dingwei {
  margin-right: 5px;
}

.tf-text {
  color: #fff;
}

.tf-icon-xiaoxi {
  position: relative;
  margin-right: 27px;
}

.van-info {
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

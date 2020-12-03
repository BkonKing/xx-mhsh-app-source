<template>
  <div class="tf-bg">
    <van-nav-bar
      title="设置"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="tf-padding">
      <tf-list>
        <tf-list-item title="个人资料" @click="goInformation"></tf-list-item>
      </tf-list>
      <tf-list class="tf-mt-lg">
        <tf-list-item title="屏蔽设置" @click="goShieldSetting"></tf-list-item>
      </tf-list>
      <tf-list class="tf-mt-lg">
        <tf-list-item title="清除缓存" v-txAnalysis="{eventId: 78}" @click="clearCache">
          <template v-slot:right>
            <div class="right-text">{{sizeText}}</div>
          </template>
        </tf-list-item>
      </tf-list>
      <tf-list class="tf-mt-lg">
        <tf-list-item title="关于我们" @click="goAbout"></tf-list-item>
      </tf-list>
      <button class="btn" @click="goAccount">切换账号</button>
      <button class="btn tf-text-primary" @click="outLogin">退出登录</button>
    </div>
  </div>
</template>

<script>
import { NavBar, Toast } from 'vant'
import tfList from '@/components/tf-list/index.vue'
import tfListItem from '@/components/tf-list/item.vue'
import { updateStatisticsData } from '@/utils/analysis.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    tfList,
    tfListItem
  },
  data () {
    return {
      cacheSize: 0
    }
  },
  computed: {
    sizeText () {
      const b = this.cacheSize
      if (b < 1024) {
        return `${b.toFixed(2)}B`
      }
      const kb = b / 1024
      if (kb < 1024) {
        return `${kb.toFixed(2)}KB`
      }
      const mb = kb / 1024
      if (mb < 1024) {
        return `${mb.toFixed(2)}MB`
      }
      const gb = mb / 1024
      return `${gb.toFixed(2)}GB`
    }
  },
  created () {
    this.getCacheSize()
  },
  methods: {
    /* 获取缓存数据大小 */
    getCacheSize () {
      this.$api.getCacheSize((ret) => {
        this.cacheSize = ret.size
      })
    },
    /* 清除缓存 */
    clearCache () {
      this.$api.clearCache(() => {
        Toast('清除成功')
        this.getCacheSize()
      })
    },
    /* 切换账号 */
    goAccount () {
      this.$router.push('/pages/personage/setting/account')
    },
    /* 跳转我的资料 */
    goInformation () {
      this.$router.push('/pages/personage/information/index')
    },
    /* 跳转关于 */
    goAbout () {
      this.$router.push('/pages/personage/setting/about')
    },
    /* 跳转屏蔽设置 */
    goShieldSetting () {
      this.$router.push('/pages/personage/setting/shield')
    },
    /* 退出登录 */
    outLogin () {
      this.$store.dispatch('outLogin').then(() => {
        this.mtjEvent({
          eventId: 80
        })
        updateStatisticsData(4)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.right-text {
  font-size: 24px;
  text-align: right;
}
.btn {
  width: 100%;
  height: 120px;
  line-height: 120px;
  font-size: 30px;
  margin-top: 30px;
  border: none;
  background-color: #fff;
}
/deep/ .tf-clist-box {
  height: 100px;
}
</style>

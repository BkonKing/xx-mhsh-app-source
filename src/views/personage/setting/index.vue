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
        <tf-list-item title="检查更新" @click="openDialog" border>
          <template v-if="updateStatus" v-slot:right>
            <div class="right-text tf-text-primary">发现更新版本</div>
          </template>
        </tf-list-item>
        <tf-list-item title="清除缓存" @click="clearCache">
          <template v-slot:right>
            <div class="right-text">{{sizeText}}</div>
          </template>
        </tf-list-item>
      </tf-list>
      <tf-list class="tf-mt-lg">
        <tf-list-item title="协议及声明" @click="goAgreementList"></tf-list-item>
      </tf-list>
      <button class="btn" @click="goAccount">切换账号</button>
      <button class="btn tf-text-primary" @click="outLogin">退出登录</button>
    </div>
    <tf-dialog v-model="showDialog" title="版本更新" :showFotter="true" okText="更新">
      <div class="dialog-content">更新能容： 1.修复了FaceID和链接收藏弹窗的兼容性问题； 2.修复了链接收藏微信文章没有标题问题。</div>
    </tf-dialog>
  </div>
</template>

<script>
import { NavBar, Toast } from 'vant'
import tfList from '@/components/tf-list/index.vue'
import tfListItem from '@/components/tf-list/item.vue'
import tfDialog from '@/components/tf-dialog/index.vue'
export default {
  components: {
    [NavBar.name]: NavBar,
    tfList,
    tfListItem,
    tfDialog
  },
  data () {
    return {
      showDialog: false,
      source: '', // 版本下载地址
      updateStatus: false, // 是否有版本更新
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
    this.checkUpdate()
    this.getCacheSize()
  },
  methods: {
    /* 检查版本更新 */
    checkUpdate () {
      var mam = this.$api.require('mam')
      mam.checkUpdate((ret, err) => {
        if (ret) {
          if (ret.status) {
            const data = ret.result
            const { update, source } = data
            this.updateStatus = update
            this.source = source
          }
        } else {
          console.error(err)
        }
      })
    },
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
    /* 跳转协议 */
    goAgreementList () {
      this.$router.push('/pages/personage/agreement/list')
    },
    /* 跳转屏蔽设置 */
    goShieldSetting () {
      this.$router.push('/pages/personage/setting/shield')
    },
    /* 更新说明提醒 */
    openDialog () {
      if (this.updateStatus) {
        this.showDialog = true
      } else {
        Toast('当前已是最新版本')
      }
    },
    /* 退出登录 */
    outLogin () {
      this.$store.dispatch('outLogin')
    }
  }
}
</script>

<style lang="less" scoped>
.right-text {
  font-size: 24px;
  text-align: right;
}
.dialog-content {
  font-size: 24px;
  line-height: 46px;
  color: #666;
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

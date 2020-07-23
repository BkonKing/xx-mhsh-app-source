<template>
  <div class="tf-bg">
    <van-nav-bar title="设置" :fixed="true" :border="false" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="tf-main-container">
      <tf-list>
        <tf-list-item title="个人资料" @click="goInformation"></tf-list-item>
      </tf-list>
      <tf-list class="tf-mt-lg">
        <tf-list-item title="检查更新" @click="openDialog" border>
          <template v-slot:right>
            <div class="right-text tf-text-primary">发现更新版本</div>
          </template>
        </tf-list-item>
        <tf-list-item title="清除缓存">
          <template v-slot:right>
            <div class="right-text">100MB</div>
          </template>
        </tf-list-item>
      </tf-list>
      <button class="btn" @click="goAccount">切换账号</button>
      <button class="btn tf-text-primary">退出登录</button>
    </div>
    <tf-dialog v-model="showDialog" title="版本更新" :showFotter="true" okText="更新">
      <div class="dialog-content">更新能容： 1.修复了FaceID和链接收藏弹窗的兼容性问题； 2.修复了链接收藏微信文章没有标题问题。</div>
    </tf-dialog>
  </div>
</template>

<script>
import { NavBar } from 'vant'
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
      showDialog: false
    }
  },
  methods: {
    goAccount () {
      this.$router.push('/pages/personage/setting/account')
    },
    goInformation () {
      this.$router.push('/pages/personage/information/index')
    },
    openDialog () {
      this.showDialog = true
    }
  }
}
</script>

<style lang="less" scoped>
.tf-bg {
  padding: 30px 20px;
}
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
</style>

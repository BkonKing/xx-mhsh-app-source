<template>
	<view class="tf-bg">
		<tf-list>
      <tf-list-item title="个人资料" @click="goInformation"></tf-list-item>
    </tf-list>
    <tf-list class="tf-mt-lg">
      <tf-list-item title="检查更新" @click="openDialog">
        <template v-slot:right>
          <text class="right-text tf-text-orange">发现更新版本</text>
        </template>
      </tf-list-item>
      <tf-list-item title="清除缓存">
        <template v-slot:right>
          <text class="right-text">100MB</text>
        </template>
      </tf-list-item>
    </tf-list>
    <button class="btn">切换账号</button>
    <button class="btn tf-text-orange">退出登录</button>
    <tf-dialog ref="dialog" title="版本更新" :showFotter="true" okText="更新" @confirm="">
        <text class="dialog-content">更新能容： 1.修复了FaceID和链接收藏弹窗的兼容性问题； 2.修复了链接收藏微信文章没有标题问题。</text>
    </tf-dialog>
	</view>
</template>

<script>
import tfList from '@/pages/components/tf-list/index.nvue'
import tfListItem from '@/pages/components/tf-list/item.nvue'
import tfDialog from '@/pages/components/tf-dialog/index.vue'
export default {
  components: {
    tfList,
    tfListItem,
    tfDialog
  },
  data () {
    return {

    }
  },
  methods: {
    goInformation () {
      uni.navigateTo({
        url: '/pages/personage/information/index'
      })
    },
    openDialog () {
      this.$refs.dialog.open()
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
    // height: 120px;
    // line-height: 120px;
    font-size: 30px;
    margin-top: 30px;
    background-color: #fff;
    &::after {
      border: none;
    }
  }
</style>

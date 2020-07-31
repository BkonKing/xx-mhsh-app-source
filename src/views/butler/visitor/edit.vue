<template>
  <div class="tf-bg tf-padding-base">
    <van-nav-bar :title="title" :fixed="true" left-arrow @click-left="$router.go(-1)" />
    <div class="tf-main-container">
      <tf-list>
        <visitor-form ref="form"></visitor-form>
      </tf-list>
      <van-button class="tf-mt-lg" size="large" type="danger" @click="save">保存</van-button>
    </div>
  </div>
</template>

<script>
import { NavBar, Button } from 'vant'

import tfList from '@/components/tf-list/index.vue'
import visitorForm from './components/form.vue'
import { addMyVisitor, updateMyVisitor } from '@/api/butler.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    tfList,
    visitorForm
  },
  data () {
    return {
      title: '',
      formData: {}
    }
  },
  created () {
    const { type, info } = this.$route.query
    this.title = type === '1' ? '添加访客' : '修改访客信息'
    this.type = type
    if (type === '0') {
      this.formData = JSON.parse(info)
    }
  },
  onReady () {
    if (this.type == 0) {
      this.$refs.form.setData(this.formData)
    }
  },
  methods: {
    save () {
      const params = this.$refs.form.getData()
      console.log(params)
      if (this.type === '1') {
        this.addMyVisitor(params)
      } else {
        this.updateMyVisitor(params)
      }
    },
    addMyVisitor () {
      addMyVisitor().then(res => {
        if (res.success) {
          uni.navigateBack()
        }
      })
    },
    updateMyVisitor () {
      updateMyVisitor().then(res => {
        if (res.success) {
          uni.navigateBack()
        }
      })
    }
  }
}
</script>

<style lang="less"></style>

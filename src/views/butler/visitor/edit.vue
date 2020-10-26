<template>
  <div class="tf-bg">
    <van-nav-bar :title="title" :fixed="true" placeholder left-arrow @click-left="$router.go(-1)" />
    <div class="tf-padding">
      <tf-list>
        <visitor-form ref="form" :formData="formData"></visitor-form>
      </tf-list>
      <van-button v-preventReClick class="tf-mt-lg" size="large" type="danger" @click="save">保存</van-button>
    </div>
  </div>
</template>

<script>
import { NavBar, Button, Dialog } from 'vant'
import tfList from '@/components/tf-list/index.vue'
import visitorForm from './components/form.vue'
import { addMyVisitor, updateMyVisitor } from '@/api/butler.js'
import { validForm } from '@/utils/util'
import { mapGetters } from 'vuex'
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
      id: '',
      formData: {}
    }
  },
  computed: {
    ...mapGetters(['currentProject'])
  },
  created () {
    const { type, info } = this.$route.query
    this.title = type === '1' ? '添加访客' : '修改访客信息'
    this.type = type
    if (type === '0') {
      const data = JSON.parse(info)
      data.gender = parseInt(data.gender)
      this.formData = data
      this.id = data.id
    }
  },
  methods: {
    // 保存
    save () {
      const params = this.$refs.form.getData()
      params.id = this.id
      const validator = [
        {
          value: params.realname,
          message: '请填写访客姓名'
        },
        {
          value: params.gender,
          message: '请选择性别'
        }
      ]
      validForm(validator).then(() => {
        if (this.type === '1') {
          this.addMyVisitor(params)
        } else {
          this.updateMyVisitor(params)
        }
      })
    },
    // 添加访客
    addMyVisitor (params) {
      addMyVisitor(params).then(res => {
        if (res.success) {
          Dialog.alert({
            title: '添加成功'
          }).then(() => {
            this.$router.go(-1)
            this.mtjEvent({
              eventId: 32
            })
          })
        }
      })
    },
    // 更新访客
    updateMyVisitor (params) {
      updateMyVisitor(params).then(res => {
        if (res.success) {
          Dialog.alert({
            title: '更新成功'
          }).then(() => {
            this.$router.go(-1)
          })
        }
      })
    }
  }
}
</script>

<style lang="less"></style>

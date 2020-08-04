<template>
  <div class="tf-bg tf-padding-base tf-main-container">
    <van-nav-bar title="意见反馈" :fixed="true" :border="false" left-arrow @click-left="$router.go(-1)">
      <template #right>
        <span class="tf-icon tf-icon-time-circle" @click="goList"></span>
      </template>
    </van-nav-bar>
    <div class="tf-card">
      <div class="tf-card-header">选择类型</div>
      <div class="tf-card-content" style="padding-bottom: 10px;">
        <tf-radio-btn v-model="info_type" :data="items"></tf-radio-btn>
      </div>
    </div>
    <div class="tf-card">
      <div class="tf-card-header">内容描述</div>
      <div class="tf-card-content">
        <van-field
          class="uni-input"
          v-model="content"
          autosize
          type="textarea"
          :maxlength="300"
          placeholder="请描述具体内容"
          show-word-limit
        />
      </div>
    </div>
    <div class="tf-card">
      <div class="tf-card-header">图片上传</div>
      <div class="tf-card-content">
        <van-uploader :after-read="uploadSuccess" :max-count="6" />
      </div>
    </div>
    <van-button class="tf-mt-lg" color="#EB5841" size="large" @click="formSubmit">提交</van-button>
  </div>
</template>

<script>
import { NavBar, Field, Uploader, Button, Toast, Dialog } from 'vant'
import tfRadioBtn from '@/components/tf-radio-btn/index.vue'
import { addFeedback } from '@/api/personage.js'
import { validForm } from '@/utils/util'
export default {
  components: {
    tfRadioBtn,
    [NavBar.name]: NavBar,
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Field.name]: Field
  },
  data () {
    return {
      info_type: '',
      items: [
        {
          value: 1,
          name: '功能使用'
        },
        {
          value: 2,
          name: '产品建议'
        },
        {
          value: 3,
          name: '其他'
        }
      ],
      content: '',
      length: 140,
      limitNum: 6,
      uploadFileUrl: '', // 替换成你的后端接收文件地址
      name: '', // 上传的名字
      header: {
        // 如果需要header，请上传
      },
      uImgList: []
    }
  },
  methods: {
    formSubmit () {
      const validator = [
        {
          value: this.info_type,
          message: '请选择类型'
        },
        {
          value: this.content,
          message: '请输入反馈内容'
        }
      ]
      validForm(validator).then((res) => {
        this.addFeedback({
          content: this.content,
          images: this.uImgList,
          info_type: this.info_type,
          project_id: '2',
          house_id: '1'
        })
      })
    },
    addFeedback (params) {
      addFeedback(params).then((res) => {
        if (res.success) {
          Dialog.alert({
            title: '感谢您的反馈'
          }).then(() => {
            this.$router.go(-1)
          })
        } else {
          Toast.fail('提交失败')
        }
      })
    },
    uploadSuccess (result) {
      if (result.statusCode === 200) {
        // 上传成功的回调处理
        Toast('上传成功')
      } else {
        Toast('上传失败')
      }
    },
    goList () {
      this.$router.push('/pages/personage/feedback/list')
    }
  }
}
</script>

<style lang="less" scoped>
.tf-card {
  margin-top: @padding-lg;
}
.tf-card-header {
  font-size: @font-size-md !important;
  font-weight: bold;
}
.uni-input {
  flex: 1;
  font-size: @font-size-md !important;
  padding: 0;
}
</style>

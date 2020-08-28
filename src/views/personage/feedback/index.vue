<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="意见反馈"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-shijian" @click="goList"></span>
      </template>
    </van-nav-bar>
    <div class="tf-padding tf-item-auto">
      <div class="tf-card">
        <div class="tf-card-header">选择反馈类型</div>
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
          <tf-uploader v-model="images" max-count="6"></tf-uploader>
        </div>
      </div>
    </div>
    <div class="fixed-placeholder">
      <van-button class="fixed-btn" color="#EB5841" size="large" @click="formSubmit">提交</van-button>
      <div class="fixed-bg"></div>
    </div>
  </div>
</template>

<script>
import { NavBar, Field, Uploader, Button, Toast, Dialog } from 'vant'
import tfRadioBtn from '@/components/tf-radio-btn/index.vue'
import tfUploader from '@/components/tf-uploader/index'
import { addFeedback } from '@/api/personage.js'
import { validForm } from '@/utils/util'
export default {
  components: {
    tfRadioBtn,
    tfUploader,
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
      images: []
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
        this.addFeedback()
      })
    },
    addFeedback () {
      addFeedback({
        content: this.content,
        images: this.images.join(','),
        info_type: this.info_type
      }).then((res) => {
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
    goList () {
      this.$router.push('/pages/personage/feedback/list')
    }
  }
}
</script>

<style lang="less" scoped>
.tf-card {
  margin-bottom: @padding-lg;
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
.fixed-placeholder {
  height: 118px;
}
.fixed-btn {
  position: fixed;
  bottom: 30px;
  left: 20px;
  right: 20px;
  width: calc(100% - 40px);
}
.fixed-bg {
  position: fixed;
  bottom: 0;
  height: 30px;
  width: 100%;
  background: #f2f2f4;
}
/deep/ .van-uploader__upload,
/deep/ .van-uploader__preview {
  width: 114px;
  height: 114px;
}
</style>

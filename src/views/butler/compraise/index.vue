<template>
  <div class="tf-bg">
    <van-nav-bar
      title="投诉表扬"
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
    <div class="tf-padding">
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
          <tf-uploader v-model="images" max-count="6"></tf-uploader>
        </div>
      </div>
      <van-button color="#EB5841" size="large" @click="formSubmit">提交</van-button>
    </div>
  </div>
</template>

<script>
import { NavBar, Field, Uploader, Button, Toast, Dialog } from 'vant'
import tfRadioBtn from '@/components/tf-radio-btn/index.vue'
import tfUploader from '@/components/tf-uploader/index'
import { addComPraise } from '@/api/butler.js'
import { validForm } from '@/utils/util'
import { mapGetters } from 'vuex'
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
          name: '我要投诉'
        },
        {
          value: 2,
          name: '我要表扬'
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
  computed: {
    ...mapGetters(['currentProject'])
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
          message: '请输入内容'
        }
      ]
      validForm(validator).then(res => {
        this.addComPraise()
      })
    },
    addComPraise () {
      addComPraise(
        {
          content: this.content,
          images: this.images.join(','),
          info_type: this.info_type
        },
        this.currentProject.house_id
      ).then(res => {
        if (res.success) {
          Dialog.alert({
            title: '提交成功'
          }).then(() => {
            setTimeout(() => {
              this.goList()
            }, 1500)
          })
        } else {
          Toast.fail('提交失败')
        }
      })
    },
    goList () {
      this.$router.push('/pages/butler/compraise/list')
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-uploader__upload,
/deep/ .van-uploader__preview {
  width: 114px;
  height: 114px;
}
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
</style>

<template>
  <div class="tf-bg tf-padding-base tf-main-container">
    <van-nav-bar
      title="投诉表扬"
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-time-circle" @click="goList"></span>
      </template>
    </van-nav-bar>
    <div class="tf-card">
      <div class="tf-card-header">选择类型</div>
      <div class="tf-card-content" style="padding-bottom: 10px;">
        <tf-radio-btn :data="items" @change="handRadioChange"></tf-radio-btn>
      </div>
    </div>
    <div class="tf-card">
      <div class="tf-card-header">内容描述</div>
      <div class="tf-card-content">
        <van-field
          class="uni-input"
          v-model="content"
          rows="9"
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
        <van-uploader :after-read="uploadSuccess" />
        <!-- <uImg
            ref="upimg"
            :canUploadFile="true"
            :limit="limitNum"
            :uploadFileUrl="uploadFileUrl"
            :heaer="header"
            :fileKeyName="name"
            :uImgList.sync="images"
            @uploadSuccess="uploadSuccess"
        ></uImg>-->
      </div>
    </div>
    <van-button color="#EB5841" size="large" @click="formSubmit">提交</van-button>
  </div>
</template>

<script>
import { NavBar, Field, Uploader, Button, Toast, Dialog } from 'vant'
import tfRadioBtn from '@/components/tf-radio-btn/index.vue'
import { addComPraise } from '@/api/butler/butler.js'
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
          name: '投诉'
        },
        {
          value: 2,
          name: '表扬'
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
    formSubmit (e) {
      const { content } = e.detail.value
      if (!this.info_type) {
        Toast('请选择类型')
        return
      } else if (!this.content) {
        Toast('请输入内容')
        return
      }
      this.addComPraise({
        content: this.content,
        images: this.uImgList,
        info_type: this.info_type,
        project_id: '2',
        house_id: '1'
      })
    },
    addComPraise (params) {
      addComPraise(params).then(res => {
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
    handRadioChange (value) {
      this.info_type = value
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
      this.$router.push('/pages/butler/compraise/list')
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

<template>
  <scroll-view :scroll-y="true" class="tf-bg tf-padding-base" :style="{'padding-bottom': `${keyboardHeight}px`}">
    <form @submit="formSubmit">
      <view class="tf-card">
        <text class="tf-card-header">选择类型</text>
        <view class="tf-card-content" style="padding-bottom: 10px;">
          <tf-radio-btn :data="items" @change="handRadioChange"></tf-radio-btn>
        </view>
      </view>
      <view class="tf-card">
        <text class="tf-card-header">内容描述</text>
        <view class="tf-card-content">
          <textarea
            class="uni-input"
            name="content"
            placeholder="请描述具体内容"
            auto-height
            maxlength="300"
            style="min-height: 150px"
          />
        </view>
      </view>
      <view class="tf-card">
        <text class="tf-card-header">图片上传</text>
        <view class="tf-card-content">
          <uImg
            ref="upimg"
            :canUploadFile="true"
            :limit="8"
            :uploadFileUrl="uploadFileUrl"
            :heaer="header"
            :fileKeyName="name"
            :uImgList.sync="uImgList"
            @uploadSuccess="uploadSuccess"
          ></uImg>
        </view>
      </view>
      <button class="tf-mt-base" type="warn" form-type="submit">提交</button>
    </form>
  </scroll-view>
</template>

<script>
import tfRadioBtn from "../../components/tf-radio-btn/index.nvue";
import uImg from "@/components/uploadImg/uploadImg.vue";
import { addComPraise } from '@/api/butler/butler.js'
const toast = msg => {
  uni.showToast({
    title: msg,
    icon: "none"
  });
};
export default {
  components: {
    alert,
    tfRadioBtn,
    uImg
  },
  data() {
    return {
      info_type: "",
      items: [
        {
          value: 1,
          name: "投诉"
        },
        {
          value: 2,
          name: "表扬"
        }
      ],
      keyboardHeight: 0,
      length: 140,
      limitNum: 6,
      uploadFileUrl: "", //替换成你的后端接收文件地址
      name: "", //上传的名字
      header: {
        // 如果需要header，请上传
      },
      uImgList: []
    };
  },
  //点击导航栏 buttons 时触发
  onNavigationBarButtonTap({index}) {
    if (index === 0) {
      uni.navigateTo({
        url: "/pages/butler/compraise/list"
      });
    }
  },
  onLoad() {
    uni.onKeyboardHeightChange(res => {
      this.keyboardHeight = res.height
    })
  },
  methods: {
    formSubmit(e) {
      const { content } = e.detail.value;
      if (!this.info_type) {
        toast('请选择类型')
        return 
      } else if (!content) {
        toast('请输入内容')
        return
      }
      this.addComPraise({
        content,
        images: this.uImgList,
        info_type: this.info_type,
        project_id: '2',
        house_id: '1'
      });
    },
    addComPraise(params) {
      addComPraise(params).then(res => {
        if (res.success) {
          uni.showToast({
            title: '提交成功',
            success: () => {
              setTimeout(() => {
                uni.navigateTo({
                  url: '/pages/butler/compraise/details'
                })
              }, 1500);
            }
          });
        } else {
          uni.showToast({
            title: '提交失败',
            icon: 'none'
          });
        }
      })
    },
    handRadioChange(value) {
      this.info_type = value;
    },
    uploadSuccess(result) {
      if (result.statusCode == 200) {
        //上传成功的回调处理
        toast("上传成功");
      } else {
        toast("上传失败");
      }
    },
    //上传方法的调用
    upFile() {
      this.$refs.upimg.upload();
    }
  }
};
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

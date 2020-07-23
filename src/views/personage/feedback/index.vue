<template>
  <view class="tf-bg tf-padding-base">
    <form @submit="formSubmit">
      <view class="tf-card">
        <text class="tf-card-header">选择反馈类型</text>
        <view class="tf-card-content" style="padding-bottom: 10px;"><tf-radio-btn :data="items" @change="handRadioChange"></tf-radio-btn></view>
      </view>
      <view class="tf-card">
        <text class="tf-card-header">内容描述</text>
        <view class="tf-card-content"><textarea class="uni-input" name="content" :maxlength="300" placeholder="请描述具体内容" auto-height style="min-height: 150px" /></view>
      </view>
      <view class="tf-card">
        <text class="tf-card-header">上传图片</text>
        <view class="tf-card-content">
          <uImg
            ref="upimg"
            :canUploadFile="true"
            :limit="limitNum"
            :uploadFileUrl="uploadFileUrl"
            :heaer="header"
            :fileKeyName="name"
            :uImgList.sync="images"
            @uploadSuccess="uploadSuccess"
          ></uImg>
        </view>
      </view>
      <button class="tf-btn tf-btn-primary" type="warn" form-type="submit">提交</button>
    </form>
  </view>
</template>

<script>
import tfRadioBtn from '../../components/tf-radio-btn/index.nvue';
import uImg from '@/components/uploadImg/uploadImg.vue';
import { addRepair } from '@/api/butler/butler.js';
const toast = msg => {
  uni.showToast({
    title: msg,
    icon: 'none'
  });
};
export default {
  components: {
    tfRadioBtn,
    uImg
  },
  data() {
    return {
      progressList: [
        {
          id: 1
        }
      ], // 进行中的报事报修数量
      category_id: '',
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
      images: [],
      msg: '',
      length: 140,
      placeholder: '欢迎反馈任何意见和问题,您的反馈也是我们产品的动力哦',
      limitNum: 6,
      uploadFileUrl: '', //替换成你的后端接收文件地址
      name: '', //上传的名字
      header: {
        // 如果需要header，请上传
      }
    };
  },
  //点击导航栏 buttons 时触发
  onNavigationBarButtonTap(e) {
    const index = e.index;
    if (index === 0) {
      this.goList();
    }
  },
  methods: {
    formSubmit: function(e) {
      const { content } = e.detail.value;
      if (!this.category_id) {
        toast('请输入内容')
        return 
      } else if (!content) {
        toast('请选择类型')
        return
      }
      this.addRepair({
        content,
        images: this.images,
        category_id: this.category_id,
        project_id: '2',
        house_id: '1'
      });
    },
    // 新增报事报修
    addRepair(data) {
      addRepair(data).then(res => {
        if (res.success) {
          uni.showToast({
            title: '提交成功',
            success: () => {
              setTimeout(() => {
                this.goList();
              }, 1500);
            }
          });
        } else {
          uni.showToast({
            title: '提交失败',
            icon: 'none'
          });
        }
      });
    },
    // 选择类型
    handRadioChange(value) {
      this.category_id = value;
    },
    // 跳转到列表页
    goList() {
      uni.navigateTo({
        url: '/pages/personage/feedback/list'
      });
    },
    // 图片上传回调
    uploadSuccess(result) {
      if (result.statusCode == 200) {
        //上传成功的回调处理
        toast('上传成功');
      } else {
        toast('上传失败');
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
  font-size: @font-size-md !important;
  padding: 0;
}
.tf-btn-primary {
  margin-top: 60px;
}
</style>

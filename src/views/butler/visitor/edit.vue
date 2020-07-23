<template>
  <view class="tf-bg tf-padding-base">
    <tf-list><visitor-form ref="form"></visitor-form></tf-list>
    <button class="tf-mt-base" type="warn" @click="save">保存</button>
  </view>
</template>

<script>
import tfList from '@/pages/components/tf-list/index.nvue';
import visitorForm from './components/form.nvue';
import { addMyVisitor, updateMyVisitor } from '@/api/butler/butler.js';
export default {
  components: {
    tfList,
    visitorForm
  },
  data() {
    return {
      formData: {}
    };
  },
  onLoad({ type, info }) {
    uni.setNavigationBarTitle({
      title: type === '1' ? '添加访客' : '修改访客信息'
    });
    this.type = type;
    if (type === '0') {
      this.formData = JSON.parse(info)
    }
  },
  onReady() {
    if (this.type == 0) {
      this.$refs.form.setData(this.formData);
    }
  },
  methods: {
    save() {
      const params = this.$refs.form.getData();
      console.log(params);
      if (this.type === '1') {
        this.addMyVisitor(params);
      } else {
        this.updateMyVisitor(params);
      }
    },
    addMyVisitor() {
      addMyVisitor().then(res => {
        if (res.success) {
          uni.navigateBack();
        }
      });
    },
    updateMyVisitor() {
      updateMyVisitor().then(res => {
        if (res.success) {
          uni.navigateBack();
        }
      });
    }
  }
};
</script>

<style lang="less"></style>

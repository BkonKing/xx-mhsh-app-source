<template>
  <van-uploader
    v-model="fileList"
    :after-read="afterRead"
    @delete="onDelete"
    v-bind="$attrs"
    upload-icon="plus"
    multiple
  ></van-uploader>
</template>

<script>
import { Uploader } from 'vant'
import { uImages } from '@/api/user'
export default {
  name: 'tf-uploader',
  components: {
    [Uploader.name]: Uploader
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      fileList: [],
      images: this.value
    }
  },
  methods: {
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('imgFile', file.file)
      uImages(formData)
        .then(res => {
          file.status = 'done'
          this.images.push(res.data)
        })
        .catch(() => {
          file.status = 'failed'
          file.message = '上传失败'
        })
    },
    onDelete (value, { index }) {
      this.images.splice(index, 1)
    }
  },
  watch: {
    data (value) {
      this.images = value
    },
    images (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-uploader__preview-delete {
  position: absolute;
  top: -17px;
  right: -17px;
  width: 34px;
  height: 34px;
  background-color: #eb5841;
  border-radius: 50%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .van-uploader__preview-delete-icon {
    position: relative;
    top: 0;
    right: 0;
    font-size: 44px;
  }
}
</style>

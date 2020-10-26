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
import { selectFileImage } from '@/utils/util'
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
      if (Array.isArray(file)) {
        file.forEach(obj => {
          this.uImages(obj)
        })
      } else {
        this.uImages(file)
      }
    },
    // 上传图片
    async uImages (file) {
      const formData = new FormData()
      const newFile = await selectFileImage(file.file)
      formData.append('imgFile', newFile)
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
    // 删除上传图片
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

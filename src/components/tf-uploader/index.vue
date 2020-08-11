<template>
  <van-uploader
    v-model="fileList"
    :after-read="afterRead"
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
  methods: {
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('imgFile', file.file)
      uImages(formData)
        .then((res) => {
          file.status = 'done'
        })
        .catch(() => {
          file.status = 'failed'
          file.message = '上传失败'
        })
    }
  },
  data () {
    return {
      fileList: []
    }
  }
}
</script>

<style lang="less" scoped>
</style>

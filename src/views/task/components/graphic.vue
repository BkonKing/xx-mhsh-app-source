<template>
  <task-card :cardTit="cardTit" :required="true">
    <div slot="content">
      <slot name="header"></slot>
      <div class="text-block">
        <van-field
          v-model.trim="formData.content"
          autosize
          rows="3"
          :border="false"
          type="textarea"
          :maxlength="maxNum"
          :placeholder="phTxt"
        />
        <div class="text-num tf-row">
          <div><span :class="{'red': formData.content.length>maxNum}">{{ formData.content.length }}</span>/{{ maxNum }}</div>
        </div>
      </div>
      <div class="divider-line"></div>
      <div class="pic-block">
        <tf-uploader ref="uploader" v-model="formData.images" max-count="9" @getUpload="(value) => $emit('getUpload', value)"></tf-uploader>
      </div>
    </div>
  </task-card>
</template>

<script>
import taskCard from './task-card'
import tfUploader from '@/components/tf-uploader/index'
export default {
  components: {
    taskCard,
    tfUploader
  },
  props: {
    cardTit: {
      type: String,
      default: ''
    },
    phTxt: {
      type: String,
      default: ''
    },
    maxNum: {
      type: Number,
      default: 500
    }
  },
  data () {
    return {
      formData: {
        content: '',
        images: []
      }
    }
  },
  created () {
  },
  methods: {
    // 设置初始值
    setVal (obj) {
      this.formData = obj
      this.formData.images = this.formData.images || []
    }
  },
  watch: {
    formData: {
      deep: true,
      handler: function (newV) {
        this.$emit('getForm', this.formData)
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-field {
  padding: 6px 47px 36px 30px;
  textarea {
    min-height: 414px;
    font-size: 30px;
    color: #333333;
    line-height: 48px;
    word-break: break-all;
  }
}
.text-num {
  align-items: center;
  justify-content: flex-end;
  padding-right: 30px;
  font-size: 26px;
  color: #8F8F94;
  margin-bottom: 14px;
  div {
    line-height: 36px;
  }
  span.red {
    color: #FF6555;
  }
}
.divider-line {
  margin: 0 30px 30px;
}
.pic-block {
  padding: 0 0 10px 30px;
}
/deep/ .van-uploader__upload,
/deep/ .van-uploader__preview {
  width: 150px;
  height: 150px;
  margin: 0 16px 20px 0;
  .van-uploader__preview-delete {
    right: 0;
    top: 0;
    width: 36px;
    height: 36px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 0px 0px 0px 14px;
    .van-uploader__preview-delete-icon {
      font-size: 36px;
    }
  }
}
/deep/ .van-uploader__upload {
  background-color: #fff;
  border: 2px dashed #8F8F94;
  .van-uploader__upload-icon {
    color: #8F8F94;
    font-size: 40px;
  }
}
</style>

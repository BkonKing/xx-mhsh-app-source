<template>
  <div class="task-card">
    <div class="card-tit" v-if="cardTit">{{ cardTit }}<span v-if="required" class="tit-icon">*</span></div>
    <slot name="content"></slot>
  </div>
</template>

<script>
import {
  Popup
} from 'vant'
export default {
  components: {
    [Popup.name]: Popup
  },
  props: {
    cardTit: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  created () {
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.tit-icon {
  color: #FF6555;
}
.task-card {
  width: 710px;
  background: #FFFFFF;
  border-radius: 10px;
  margin: 0 auto 20px;
  overflow: hidden;
  & > .card-tit{
    padding-left: 30px;
  }
  .card-tit {
    font-size: 28px;
    line-height: 36px;
    padding-top: 32px;
    color: #8F8F94;
  }
}
</style>

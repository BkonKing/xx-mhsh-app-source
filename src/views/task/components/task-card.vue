<template>
  <div class="task-card">
    <div class="card-tit">{{ cardTit }}<slot name="titIcon"></slot></div>
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
    }
  },
  data () {
    return {}
  },
  created () {
    console.log(21212)
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.task-card {
  width: 710px;
  background: #FFFFFF;
  border-radius: 10px;
  margin: 0 auto 20px;
  overflow: hidden;
  .card-tit {
    font-size: 24px;
    line-height: 36px;
    padding: 32px 0 0 30px;
    color: #8F8F94;
  }
}
</style>

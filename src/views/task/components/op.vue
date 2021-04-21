<template>
  <div class="op-block">
    <div class="bottom-fiex tf-row">
      <div class="op-left tf-row">
        <div class="tf-column">
          <img src="@/assets/img/task_05.png" />
          <div>提问</div>
        </div>
        <div class="tf-column">
          <img src="@/assets/img/task_06.png" />
          <div>联系</div>
        </div>
        <div class="tf-column">
          <img src="@/assets/img/task_07.png" />
          <div>分享</div>
        </div>
        <div class="tf-column">
          <img src="@/assets/img/task_08.png" />
          <div>进度</div>
        </div>
      </div>
      <div class="op-right">编辑</div>
    </div>
  </div>
</template>

<script>

export default {

  props: {

  },
  data () {
    return {
      selectIndex: this.value
    }
  },
  created () {
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.op-block {
  height: 98px;
  .bottom-fiex {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 98px;
    background: #FFFFFF;
    z-index: 12;
  }
  .op-left {
    height: 100%;
    padding-left: 10px;
    & > div {
      height: 100%;
      width: 116px;
      align-items: center;
      padding-top: 20px;
      img {
        height: 36px;
        width: 36px;
      }
      div {
        text-align: center;
        color: #8F8F94;
        font-size: 24px;
        line-height: 40px;
      }
    }
  }
  .op-right {
    width: 300px;
    height: 100%;
    background: #FF5240;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 98px;
    text-align: center;
  }
}
</style>

<template>
  <div v-show="showSwal" class="mask-bg" @click="calcel(0)">
    <div class="mask-block" @click.stop="calcel(1)">
      <div class="mask-close">
        <img class="img-100" src="@/assets/img/close.png" @click.stop="calcel(0)" />
      </div>
      <slot name="body">
        <div class="mask-body">
          <div class="mask-tit flex-center">
            {{remindTit}}
          </div>
          <div v-if="showFotter" class="mask-btn flex-between">
            <div class="mask-cancel-btn flex-center" @click.stop="calcel(0)">取消</div>
            <div class="mask-sure-btn flex-center" @click.stop="sureSwal">确定</div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'remind-swal',
  props: {
    showSwal: {
      type: Boolean,
      default: false
    },
    remindTit: {
      type: String,
      default: ''
    },
    showFotter: {
      type: Boolean,
      default: true
    }
    // mode: {
    //   type: String,
    //   default: ''
    // },
    // src: {
    //   type: String,
    //   default: ''
    // },
    // name: {
    //   type: String,
    //   default: ''
    // },
    // status: {
    //   type: Number || String,
    //   default: 1
    // }
  },
  methods: {
    calcel (val) {
      this.$emit('closeSwal', val)
      if (val == 0) {
        this.$emit('update:showSwal', false)
      }
    },
    sureSwal () {
      this.$emit('sureSwal', '0')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/life.css';
/*弹窗*/
.mask-block {
  min-height: 3.64rem;
  height: auto;
  padding: 0;
  .mask-body {
    padding: 0 50px;
  }
}
.mask-tit {
  height: 147px;
  font-size: 30px;
  color: #000;
  border-bottom: none;
}
.mask-btn div.mask-sure-btn {
  width: 215px;
}
</style>

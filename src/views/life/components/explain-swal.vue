<template>
  <div v-show="showSwal" class="mask-bg" @click="calcel(0)">
    <div class="mask-block" @click.stop="calcel(1)">
      <div class="mask-close" @click.stop="calcel(0)">
        <img class="img-100" src="@/assets/img/close.png" />
      </div>
      <div class="mask-tit">
        <div class="mask-tit-text font-30 color-000">不支持退换说明</div>
      </div>
      <div class="mask-cont">
        <div class="mask-cont-text font-24 color-666">{{swalCont}}</div>
      </div>
      <div class="mask-btn flex-between">
        <div class="mask-sure-btn flex-center" @click.stop="calcel(0)">知道了</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'explain-swal',
  props: {
    showSwal: {
      type: Boolean,
      default: false
    },
    swalCont: {
      type: String,
      default: ''
    }
  },
  methods: {
    calcel(val) {
      this.$emit('closeSwal',val);
      // var isShow = val==1 ? true : false;
      // this.$emit('update:showSwal',isShow);
    },
  }
}
</script>

<style scoped>
@import '../../../styles/life.css';
</style>

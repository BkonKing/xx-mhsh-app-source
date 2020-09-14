<template>
  <div>
    <div v-show="showSwal" class="public-mask reason-mask bottom-fixed">
      <div class="public-dclose" @click="calcel(0)"><img class="img-100" src="@/assets/img/close.png" /></div>
      <div class="public-header">{{swalInfo.tit}}</div>
      <div v-if="swalInfo.tip" class="action-block">{{swalInfo.tip}}</div>
      <div class="common-list">
        <div v-for="(item,index) in swalList" :class="[index == 0 ? 'common-item-first' : '' , 'common-item']" @click.stop="sureSwal(index)">
          <div class="common-item-left">{{item.text}}</div>
        </div>
      </div>
    </div>
    <div v-show="showSwal" class="mask-bg" @click="calcel(0)"></div>
  </div>
</template>

<script>
export default {
  name: 'reason-swal',
  props: {
    showSwal: {
      type: Boolean,
      default: false
    },
    swalList: {
      type: Array,
      default: []
    },
    swalInfo: {
      type: Object,
      default: {}
    }
  },
  methods: {
    calcel(val) {
      this.$emit('closeSwal',val);
    },
    sureSwal(index) {
      this.$emit('sureSwal',index);
    }
  }
}
</script>

<style scoped>
@import '../../../styles/life.css';
@import '../../../styles/apply.css';
</style>

<template>
  <div>
    <div v-show="showSwal" class="public-mask reason-mask bottom-fixed">
      <div class="public-dclose" @click="calcel(0)"><img class="img-100" src="@/assets/img/close.png" /></div>
      <div class="public-header">{{swalInfo.tit}}</div>
      <div class="action-block">请选择实际原因，以便我们更好地为您提供服务</div>
      <div class="common-list">
        <div v-for="(item,index) in swalList" :class="[index == 0 ? 'common-item-first' : '' , 'common-item']" @click.stop="sureSwal(index)">
          <div class="common-item-left">{{item.text}}</div>
        </div>
        <!-- <div class="common-item common-item-first" @click.stop="sureSwal(0)">
          <div class="common-item-left">拍错/不喜欢</div>
        </div>
        <div class="common-item" @click.stop="sureSwal(1)">
          <div class="common-item-left">发错规格</div>
        </div>
        <div class="common-item" @click.stop="sureSwal(2)">
          <div class="common-item-left">少件/破损/变形等</div>
        </div>
        <div class="common-item" @click.stop="sureSwal(3)">
          <div class="common-item-left">拍错尺码/规格/型号</div>
        </div> -->
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

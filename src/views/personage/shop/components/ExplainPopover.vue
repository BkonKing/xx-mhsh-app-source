<template>
  <div v-show="value" class="mask-bg" @click="calcel(0)">
    <div class="mask-block" @click.stop="calcel(1)">
      <div class="mask-close" @click.stop="calcel(0)">
        <img class="img-100" src="@/assets/img/close.png" />
      </div>
      <div class="mask-tit">
        <div class="mask-tit-text font-30 color-000">不支持退换说明</div>
      </div>
      <div class="mask-cont">
        <div class="mask-cont-text font-24 color-666">{{ content }}</div>
      </div>
      <div class="mask-btn flex-between">
        <div class="mask-sure-btn flex-center" @click.stop="calcel(0)">
          知道了
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'explain-swal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default:
        '贵重物品、贴身衣物、肉类果蔬生鲜商品、定制商品、虚拟商品、报纸期刊等，处于信息安全或者卫生考虑，不支持无理由退货。跨境商品不支持换货。'
    }
  },
  methods: {
    calcel (val) {
      this.$emit('input', !!val)
    }
  }
}
</script>

<style src="../../../../styles/life.css" scoped></style>

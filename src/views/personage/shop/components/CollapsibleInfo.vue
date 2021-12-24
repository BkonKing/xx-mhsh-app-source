<template>
  <div class="collapsible-info-container">
    <div
      ref="textCont"
      class="collapsible-info"
      :class="{ 'text-hidden': isOver && !expanded }"
    >
      <div
        v-show="isOver"
        class="expanded"
        :class="{ 'down-up': expanded }"
        @click="showToggle"
      ></div>
      <div
        v-html="valueHtml.replace(/\r\n|\n/g, '<br/>')"
        class="collapsible-info-value"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollapsibleInfo',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    valueHtml () {
      return '<i class="tf-icon tf-icon-shuoming tf-mr-base"></i>' + this.value
    }
  },
  data () {
    return {
      isOver: false,
      expanded: false
    }
  },
  mounted () {
    this.getTextOver()
  },
  methods: {
    showToggle () {
      this.expanded = !this.expanded
    },
    getTextOver () {
      setTimeout(() => {
        const textCont = this.$refs.textCont
        const textHeight =
          (textCont.clientHeight * 750) / document.documentElement.clientWidth
        if (textHeight > 42 * 2) {
          this.isOver = true
        }
      }, 100)
    }
  }
}
</script>

<style lang="less" scoped>
.collapsible-info-container {
  display: flex;
  width: 650px;
  min-height: 82px;
  padding: 20px 24px;
  background: #ff68570d;
  border-radius: 10px;
}
.collapsible-info {
  width: 100%;
  position: relative;
  &.text-hidden {
    height: 84px;
    overflow: hidden;
  }
  &::before {
    content: "";
    float: right;
    height: calc(100% - 42px); /*先随便设置一个高度*/
  }
}
.collapsible-info-value {
  width: 100%;
  line-height: 42px;
  font-size: 24px;
  color: #ff6555;
}
// .text-hidden .expanded::before {
//   display: block;
// }
.expanded {
  width: 42px;
  height: 42px;
  position: relative;
  font-size: 24px;
  line-height: 42px;
  color: #ff6555;
  font-family: "vant-icon";
  float: right;
  clear: both;
  &::after {
    content: "\F00A";
    position: absolute;
    top: 0;
    right: 6px;
    display: inline-block;
    transform: rotate(90deg) translateZ(0);
    transition: transform 0.3s;
  }
  &.down-up::after {
    transform: rotate(-90deg);
  }
}
</style>

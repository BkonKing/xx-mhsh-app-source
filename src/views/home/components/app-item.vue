<template>
  <div class="app-box" :class="{'app-box--edit': editMode}" @click.stop="operate">
    <img class="app-icon" :src="src" />
    <div class="app-name">{{name}}</div>
    <template v-if="editMode && status !== 1">
      <span
        v-if="mode == 'remove' && status == 2"
        class="tf-icon tf-icon-close-circle-fill"
      ></span>
      <span v-else-if="status == 0" class="tf-icon tf-icon-plus-circle-fill"></span>
      <span v-else-if="status == 2" class="tf-icon tf-icon-gouxuan"></span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'app-item',
  props: {
    // 是否编辑状态
    editMode: {
      type: Boolean,
      default: false
    },
    // 是否删除操作
    mode: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    // 当前应用状态 0可添加，1常用，2已添加
    status: {
      type: Number || String,
      default: 1
    }
  },
  methods: {
    operate () {
      if (this.editMode && this.status !== 1) {
        if (this.mode == 'remove' && this.status == 2) {
          this.remove()
        } else if (this.status == 0) {
          this.add()
        }
      }
    },
    add () {
      this.$emit('add')
    },
    remove () {
      this.$emit('remove')
    }
  }
}
</script>

<style lang="less" scoped>
.app-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  padding: 30px 0;
  .app-icon {
    width: 60px;
    height: 60px;
    margin-bottom: 20px;
  }
  .app-name {
    font-size: 24px;
  }
}
.app-box--edit {
  position: relative;
  &::after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border: 0 solid #c8c7cc;
    transform: scale(0.5);
    border-width: 0 1px 1px 0;
  }
  .tf-icon {
    position: absolute;
    top: 11px;
    right: 11px;
    font-size: 32px;
    line-height: 1;
    color: #ffa110;
  }
  .tf-icon-guanbi-circle-fill {
    color: #aaa;
  }
}
</style>

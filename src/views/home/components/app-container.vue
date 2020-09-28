<template>
  <div class="app-container">
    <app-item
      v-for="(item,i) in data"
      :key="i"
      v-show="!search || item.application.indexOf(search) > -1"
      :class="{'noborder': data.length - data.length % 5 <= i}"
      :src="item.icon_image"
      :name="item.application"
      :status="item.status"
      :url="item.url"
      :mjStatus="item.mj_status"
      :editMode="editMode"
      @add="add(item)"
    ></app-item>
  </div>
</template>

<script>
import appItem from './app-item'
export default {
  name: 'app-container',
  components: {
    appItem
  },
  props: {
    editMode: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    },
    search: {
      type: String,
      default: ''
    }
  },
  methods: {
    add (item) {
      this.$emit('add', item)
    }
  }
}
</script>

<style lang="less" scoped>
.app-container {
  display: flex;
  flex-wrap: wrap;
}
/deep/ .noborder.app-box--edit::after {
  border-bottom-width: 0;
}
</style>

<template>
  <refreshList class="cinema-list" ref="list" :disabled="disabled" :list.sync="list" :load="load" @refresh="refresh">
    <template v-slot="{ item }">
      <cinema-box :tag="tag" :data="item"></cinema-box>
    </template>
  </refreshList>
</template>

<script>
import refreshList from '@/components/tf-refresh-list'
import CinemaBox from './CinemaBox'
export default {
  components: {
    refreshList,
    CinemaBox
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    load: Function,
    tag: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      list: this.value
    }
  },
  methods: {
    reload () {
      this.$refs.list.reload()
    },
    refresh () {
      this.$emit('refresh')
    }
  },
  watch: {
    list (value) {
      this.$emit('input', value)
    },
    value (value) {
      this.list = value
    }
  }
}
</script>

<style lang="less" scoped>
.cinema-list {
  padding: 0;
}
</style>

<template>
  <dropdown-menu class="tf-select">
    <dropdown-item v-model="value" :list="options" icon="&#xe7a5;">
    </dropdown-item>
  </dropdown-menu>
</template>

<script>
import dropdownMenu from '@/components/dropdown/dropdown-menu.vue'
import dropdownItem from '@/components/dropdown/dropdown-item.vue'
export default {
  components: {
    dropdownMenu,
    dropdownItem
  },
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      value: 1
    }
  },
  methods: {
    choose () {
      const obj = {
        value: 'test'
      }
      this.$refs.dropdownItem.choose(obj)
    },
    close () {
      this.$refs.dropdownItem.closePopup()
    }
  }
}
</script>

<style lang="less" scoped>
  .tf-select {
    flex-direction: row;

    /deep/ .dropdown-item__selected {
      color: #fff;
      background-color: rgba(255, 255, 255, 0.3);
    }

    /deep/ .list {
        background-color: rgba(255, 255, 255, 0.3);
      .list__option {
        flex-direction: row;
        color: #fff;
      }
    }
  }
</style>

<template>
  <div>
    <tf-map></tf-map>
  </div>
</template>

<script>
import tfMap from '@/components/tf-map'
export default {
  components: {
    tfMap
  },
  props: {
    listData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      images: []
    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>

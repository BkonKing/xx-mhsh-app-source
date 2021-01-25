<template>
<div class='tf-bg'>
  <van-nav-bar
    title=""
    :fixed="true"
    :border="false"
    left-arrow
    placeholder
    @click-left="$router.go(-1)"
  >
    <template #right>
      <span class="tf-icon tf-icon-time-circle"></span>
    </template>
  </van-nav-bar>
  <div class="tf-main-container">
  </div>
</div>
</template>

<script>
export default {
  name: 'movieSelectCinema',
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang='less' scoped>

</style>

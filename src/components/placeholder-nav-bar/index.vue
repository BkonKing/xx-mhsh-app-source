<template>
  <view :style="[{ height: iStatusBarHeight + 'px'}, {backgroundColor: backgroundColor}]"></view>
</template>

<script>
  export default {
	props: {
		backgroundColor: {
			type: String,
			default: '#fff'
		}
	},
    data() {
      return {
        iStatusBarHeight: 0
      }
    },
    created() {
      this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
    }
  }
</script>

<style>

</style>

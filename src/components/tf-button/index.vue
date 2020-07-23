<template>
	<button class="tf-btn" type="default">
    <text class="tf-btn__text">
      <slot></slot>
    </text>
  </button>
</template>

<script>
	export default {
		props: {
      type: {
        type: String,
        default: 'default'
      }
    }
	}
</script>

<style lang="less" scoped>
.tf-btn {
  background-color: #007AFF;
}
.tf-btn__text {
  color: #fff !important;
}
</style>

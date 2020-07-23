<template>
	<view>
		<uni-search-bar placeholder="请输入关键字搜索" @confirm="search" @input="input" style="background-color: #fff;"></uni-search-bar>
    <uni-list style="background-color: #fff;">
      <uni-list-item title="新乡美好生活家园" @click="jumpSelectHouse"></uni-list-item>
    </uni-list>
	</view>
</template>

<script>
  import uniList from "@/components/uni-list/uni-list.vue"
  import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
  import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	export default {
    components: {
      uniList,
      uniListItem,
      uniSearchBar
    },
		data() {
			return {
				
			};
		},
    methods: {
      jumpSelectHouse() {
        uni.navigateTo({
          url: '/pages/personage/house/select-house'
        })
      }
    }
	}
</script>

<style lang="less">

</style>

<template>
	<view class="tf-bg">
		<recycle-list for="(item, i) in historyList">
			<cell-slot :key="i">
				<!-- <view v-for="(item, i) in historyList" :key="i"> -->
				<view class="history-box">
					<text class="history-title">{{item.title}}</text>
					<text class="history-time">{{item.ctime}}</text>
				</view>
				<!-- </view> -->
			</cell-slot>
		</recycle-list>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
		components: {
			uniList,
			uniListItem,
		},
		data() {
			return {
				historyList: [{
					"id": "1",
					"title": "二维码开门",
					"ctime": "2020-06-20 15:12:36"
				}, {
					"id": "2",
					"title": "二维码开门2",
					"ctime": "2020-06-21 15:12:36"
				}]
			};
		},
		onLoad() {},
		methods: {}
	}
</script>

<style lang="less" scoped>
	.history-box {
		flex-direction: row;
		justify-content: space-between;
		height: 120px;
		padding: 30px;
		background-color: #fff;
		border-bottom-width: 2px;
		border-bottom-style: solid;
		border-bottom-color: @divider-color;
	}

	.history-title {
		font-size: 30px;
		line-height: 60px;
		color: @text-color;
	}

	.history-time {
		font-size: 30px;
		line-height: 60px;
		color: @gray-7;
	}
</style>

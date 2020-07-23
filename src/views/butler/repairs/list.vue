<template>
	<view class="tf-bg tf-screen">
    <view class="tf-flex-item">
      <list class="repair-list" :scrollable="true">
        <cell v-for="item in repairList" :key="item.id" @click="jump(item)">
          <!-- <view class="tf-padding-base" v-for="(item, i) in repairList" :key="i" @click="jump(item)"> -->
          <text class="list-item--time">{{item.ctime}}</text>
          <view class="tf-card" style="padding-right: 0 !important;">
            <view class="tf-card-header">
              <text class="tf-card-header__title">{{item.category}}</text>
              <text class="tf-card-header__status" :class="{'tf-card-header__status--complete': item.status > 5}">{{statusText[item.status]}}</text>
            </view>
            <text class="tf-card-content">{{item.content}}</text>
          </view>
          <!-- </view> -->
        </cell>
      </list>
    </view>
	</view>
</template>

<script>
	import {
		statusText
	} from '../../const/butler.js'
	import {
		getRepairList
	} from '@/api/butler/butler.js'
	export default {
		data() {
			return {
				repairList: [{
					"id": "1",
					"category": "居家报修",
					"content": "厨房下水道堵了",
					"images": [
						"https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg",
						"https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg"
					],
					"status": 6,
					"ctime": "2020-06-03 16:35:26"
				}],
				statusText
			};
		},
		onLoad() {
			this.getRepairList()
		},
		methods: {
			getRepairList() {
				getRepairList({
					projectId: '',
					repairId: ''
				}).then(res => {
					if (res.success) {
						this.repairList = res.data
					}
				})
			},
      jump(item) {
      	const url = `/pages/butler/repairs/details?id=${item.id}&title=${item.category}`
      	uni.navigateTo({
      		url
      	})
      },
		}
	}
</script>

<style lang="less" scoped>
	.list-item--time {
		font-size: 24px;
		text-align: center;
		color: @gray-7;
		margin-top: @padding-md;
		margin-bottom: @padding-md;
	}

	.tf-card-header__title {
		width: 550px;
	}

	.tf-card-content {
		color: @text-color;
	}
  .repair-list {
  	position: absolute;
  	top: 0;
  	bottom: 0;
  	left: 20px;
  	right: 20px;
  }
</style>

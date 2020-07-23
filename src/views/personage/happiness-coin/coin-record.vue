<template>
	<view class="tf-bg">
   <uni-segmented-control style="background-color: #fff;" :current="current" :values="items" @clickItem="onClickItem"
      style-type="text" active-color="#EB5841"></uni-segmented-control>
		<list class="coin-list" :scrollable="true">
      <cell v-for="item in list" :key="item.id">
        <view class="coin-list-item">
          <view class="coin-list-item-left">
            <text class="coin-list-item__name">{{item.name}}</text>
            <text class="coin-list-item__time">{{item.time}}</text>
          </view>
          <text class="coin-list-item__number">{{item.number}}</text>
        </view>
      </cell>
    </list>
	</view>
</template>

<script>
  import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	export default {
    components: {
      uniSegmentedControl
    },
		data() {
			return {
				items: ['全部', '获得', '使用'],
				current: 0,
        list: [
          {
            id: 1,
            name: '签到送积分',
            time: '2020-07-07 12:00:00',
            number: '+1'
          },
          {
            id: 1,
            name: '签到送积分',
            time: '2020-07-07 12:00:00',
            number: '+1'
          }
        ]
			};
		}
	}
</script>

<style lang="less" scoped>
  .coin-list {
    width:710px;
    padding: 0 30px;
    margin: 30px 20px;
    background-color: #fff;
    border-radius:10px;
  }
  .coin-list-item {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 144px;
    padding: 40px 0;
    border-bottom-width: 1px;
    border-bottom-solid: solid;
    border-bottom-color: @divider-color;
  }
  .coin-list-item-left {
    height: 84px;
    justify-content: space-between;
  }
  .coin-list-item__name {
    font-size: 30px;
  }
  .coin-list-item__time {
    font-size: 24px;
    color: @gray-7;
  }
  .coin-list-item__number {
    font-size:38px;
    font-weight: 500;
    color: @gray-7;
  }
  .coin-list-item__number--add {
    color: @red-dark;
  }
</style>

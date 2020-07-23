<template>
	<view>
		<list class="buy-list" :scrollable="true">
      <cell v-for="item in list" :key="item.id">
        <view class="buy-list-item">
          <image class="buy-list-item__image" src="/static/app-icon.png"></image>
          <view class="buy-list-item-right">
            <text class="buy-list-item__name">{{item.name}}</text>
            <text class="buy-list-item__specification">规格：{{item.specification}}</text>
            <view class="tf-row">
              <text class="tf-icon buy-list-item__price">{{item.time}}</text>
              <text class="buy-list-item__price">{{item.number}}</text>
            </view>
          </view>
        </view>
      </cell>
    </list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        list: [
          {
            id: 1,
            name: '签到送积分',
            specification: '白色',
            number: '1'
          },
          {
            id: 1,
            name: '签到送积分',
            specification: '白色',
            number: '1'
          }
        ]
			};
		}
	}
</script>

<style lang="less" scoped>
  .buy-list {
    width:750px;
    padding: 30px 20px;
    background-color: @background-color;
  }
  .buy-list-item {
    width: 710px;
    flex-direction: row;
    align-items: center;
    padding:30px;
    background-color: #fff;
    margin-bottom: 30px;
    border-radius:10px;
  }
  .buy-list-item-right {
    flex: 1;
    height: 130px;
    justify-content: space-around;
  }
  .buy-list-item__image {
    width: 130px;
    height: 130px;
    margin-right: 20px;
  }
  .buy-list-item__specification {
    font-size: 24px;
    color: @gray-7;
  }
  .buy-list-item__name {
    font-size: 30px;
  }
  .buy-list-item__price {
    font-size: 28px;
  }
</style>

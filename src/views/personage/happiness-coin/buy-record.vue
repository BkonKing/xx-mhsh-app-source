<template>
  <div class="tf-bg">
    <van-nav-bar title="购买记录" :fixed="true" placeholder left-arrow @click-left="$router.go(-1)" />
    <div class="tf-main-container">
      <refreshList :list.sync="list" :load="getCreditsOrderList">
        <template v-slot="{item}">
          <div class="buy-list-item" @click="goDetails(item)">
            <img class="buy-list-item__image" :src="item.specs_img" />
            <div class="buy-list-item-right">
              <div class="buy-list-item__name">{{item.goods_name}}</div>
              <div class="buy-list-item__specification">规格：{{item.specs_name}}</div>
              <div class="tf-row-vertical-center">
                <div class="tf-icon tf-icon-xingfubi1"></div>
                <div class="buy-list-item__price">{{item.happiness_price}}</div>
              </div>
            </div>
          </div>
        </template>
      </refreshList>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import { getCreditsOrderList } from '@/api/personage'
export default {
  components: {
    [NavBar.name]: NavBar,
    refreshList
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    getCreditsOrderList (params) {
      return getCreditsOrderList(params)
    },
    goDetails ({ order_project_id }) {
      this.$router.push(`/order/detail?id=${order_project_id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.buy-list {
  width: 750px;
  padding: 30px 20px;
  background-color: @background-color;
}
.buy-list-item {
  width: 100%;
  @flex();
  align-items: center;
  padding: 30px;
  background-color: #fff;
  margin-bottom: 20px;
  border-radius: 10px;
}
.buy-list-item-right {
  flex: 1;
  height: 130px;
  @flex-column();
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
.tf-icon-xingfubi1 {
  font-size: 28px;
  color: #ffa110;
  margin-right: 6px;
}
</style>

<template>
<div class='tf-bg'>
  <van-nav-bar
    title='我的影票'
    :fixed='true'
    :border='false'
    left-arrow
    placeholder
    @click-left='$router.go(-1)'
  >
    <template #right>
      <span class='tf-icon tf-icon-kefu'></span>
    </template>
  </van-nav-bar>
  <div class='tf-main-container'>
    <van-tabs v-model="type" @change="reloadOrderList">
      <van-tab v-for="(item, i) in typeOptions" :key="i" :name="item.value" :title="item.text"></van-tab>
    </van-tabs>
    <refreshList ref="orderList" :list.sync="orderList" :load="getticklist">
      <template v-slot="{item}">
        <div @click="goTicket(item)">{{item}}</div>
      </template>
    </refreshList>
  </div>
</div>
</template>

<script>
import refreshList from '@/components/tf-refresh-list'
import { mapGetters } from 'vuex'
import { getticklist } from '@/api/movie'
export default {
  name: 'movieOrder',
  components: {
    refreshList
  },
  data () {
    return {
      type: 0, // 类型0全部1待取票2已取票3已取消
      typeOptions: [
        {
          text: '全部',
          value: 0
        },
        {
          text: '待取票',
          value: 1
        },
        {
          text: '已取票',
          value: 2
        },
        {
          text: '已取消',
          value: 3
        }
      ],
      orderList: []
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    // 获取订单列表
    getticklist () {
      return getticklist({
        uid: this.userInfo.id,
        type: this.type
      })
    },
    // 切换订单类型重新刷新类别
    reloadOrderList () {
      this.$refs.orderList && this.$refs.orderList.reload()
    },
    // 跳转到电影票详情
    goTicket ({ id }) {
      this.$router.push({
        name: 'movieTicket',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>

</style>

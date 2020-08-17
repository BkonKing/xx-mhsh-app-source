<template>
  <div class="tf-bg tf-main-container">
    <van-nav-bar
      title="便民电话"
      :fixed="true"
      :border="false"
       placeholder
      left-arrow
      @click-left="$router.go(-1)"
    />
    <phone-card v-for="(item, i) in phoneList" :key="i" :name="item.title" :info="item.remarks" :number="item.telephone"></phone-card>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import phoneCard from '../components/phone-card.vue'
import { getYellowPagesList } from '@/api/butler.js'
export default {
  components: {
    phoneCard,
    [NavBar.name]: NavBar
  },
  data () {
    return {
      phoneList: []
    }
  },
  created () {
    this.getYellowPagesList()
  },
  methods: {
    getYellowPagesList () {
      getYellowPagesList().then(res => {
        if (res.success) {
          this.phoneList = res.data
        }
      })
    }
  }
}
</script>

<style scoped>
.tf-main-container {
  padding: 118px 20px 20px;
}
</style>

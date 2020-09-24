<template>
  <div class="tf-bg">
    <van-nav-bar
      title="便民电话"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="tf-padding">
      <refreshList :list.sync="phoneList" :load="getYellowPagesList">
        <template v-slot="{ item }">
          <phone-card
            :name="item.title"
            :info="item.remarks"
            :number="item.telephone"
          ></phone-card>
        </template>
      </refreshList>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import phoneCard from '../components/phone-card.vue'
import { getYellowPagesList } from '@/api/butler.js'
export default {
  components: {
    refreshList,
    phoneCard,
    [NavBar.name]: NavBar
  },
  data () {
    return {
      phoneList: []
    }
  },
  methods: {
    getYellowPagesList (params) {
      const len = this.phoneList.length
      const phoneId = len && params.pages !== 1 ? this.phoneList[len - 1].id : ''
      return getYellowPagesList({
        phoneId
      })
    }
  }
}
</script>

<style scoped></style>

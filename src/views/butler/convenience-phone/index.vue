<template>
  <div class="tf-screen tf-flex-column tf-bg">
    <van-nav-bar
      title="便民电话"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    />
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
      const phoneId =
        len && params.pages !== 1 ? this.phoneList[len - 1].id : ''
      return getYellowPagesList({
        phoneId
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .tf-list-refresh {
  margin: 10px 0;
  flex: 1;
}
/deep/ .tf-van-cell {
  margin-bottom: 0;
}
</style>

<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="选择房产"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="tf-padding tf-body-container">
      <house
        :mode="mode"
        :addStatus="!mode"
        :entranceStatus="entranceStatus"
        :selectId="id"
        @change="selectHouse"
      ></house>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import house from './components/house'
export default {
  components: {
    [NavBar.name]: NavBar,
    house
  },
  data () {
    return {
      entranceStatus: false,
      mode: 0,
      id: 0
    }
  },
  created () {
    if (this.$route.query.status === '1') {
      this.entranceStatus = true
    }
    if (this.$route.query.mode == '2') {
      this.mode = 2
    }
    this.id = this.$route.query.id || ''
  },
  methods: {
    selectHouse (id, item) {
      if (this.mode === 2) {
        const obj = {
          project_id: item.project_id,
          project_name: item.project_name,
          building_id: '',
          unit_id: '',
          house_id: item.house_id,
          house_name: item.fc_info
        }
        this.$store.commit('setHouseSelected', obj)
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>

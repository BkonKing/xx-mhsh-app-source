<template>
  <div class="tf-bg">
    <van-nav-bar
      title="协议及声明"
      :fixed="true"
      :border="false"
      left-arrow
      placeholder
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-time-circle"></span>
      </template>
    </van-nav-bar>
    <div class="tf-padding">
      <tf-list>
        <tf-list-item
          v-for="(item, index) in agreementList"
          :key="index"
          :title="item.title"
          @click="goAgreement(item.article_type)"
          border
        >
          <template v-slot:right>
            <div class="right-text"></div>
          </template>
        </tf-list-item>
      </tf-list>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import tfList from '@/components/tf-list/index.vue'
import tfListItem from '@/components/tf-list/item.vue'
import { getAllAgreement } from '@/api/home'
export default {
  components: {
    [NavBar.name]: NavBar,
    tfList,
    tfListItem
  },
  data () {
    return {
      agreementList: []
    }
  },
  created () {
    this.getAllAgreement()
  },
  methods: {
    getAllAgreement () {
      getAllAgreement().then(({ data }) => {
        this.agreementList = data
      })
    },
    goAgreement (articleType) {
      this.$router.push({
        path: '/agreement',
        query: {
          articleType
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>

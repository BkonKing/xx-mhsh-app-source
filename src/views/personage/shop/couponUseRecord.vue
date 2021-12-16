<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="使用记录"
      placeholder
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="goBack"
    />
    <van-search
      v-model="search"
      class="coupon-search-box"
      placeholder="搜索券名称、券编号"
      @input="searchChange"
    />
    <div class="tf-body-container">
      <refreshList
        ref="list"
        class="refresh-box"
        :list.sync="records"
        :load="getCouponRecords"
      >
        <template v-slot="{ item }">
          <div class="info-box">
            <div class="info-left">
              <template v-if="item.coupon_type == 1"
                ><span>￥</span>{{ item.denomination }}</template
              >
              <template v-else>{{ item.denomination }}<span>折</span></template>
            </div>
            <div class="info-center">
              <div class="tf-row">
                <span class="info-view">{{ item.coupon_explain }}</span>
              </div>
              <div class="info-text">{{ item.mobile }}</div>
            </div>
            <div class="info-right">
              <div class="info-tag">{{ item.coupon_scene_name }}</div>
              <div class="info-text">{{ item.u_time }}</div>
            </div>
          </div>
        </template>
      </refreshList>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import refreshList from '@/components/tf-refresh-list'
import { debounce } from '@/utils/util'
import { getCouponRecords } from '@/api/personage/shop'
export default {
  name: 'noticeIndex',
  components: {
    refreshList
  },
  data () {
    return {
      search: '',
      records: []
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    shopId () {
      return this.userInfo.shops_id
    }
  },
  created () {},
  methods: {
    getCouponRecords (params) {
      return getCouponRecords({
        page: params.pages,
        search_text: this.search,
        shops_id: this.shopId
      })
    },
    searchChange: debounce(function () {
      this.$refs.list.reload()
    }, 500),
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
* {
  line-height: 1;
}
.coupon-search-box {
  padding: 30px 20px;
  /deep/ .van-search__content {
    height: 64px;
    background: #f7f7f7;
    border-radius: 32px;
    .van-field__left-icon {
      line-height: 64px !important;
      color: #aaa;
    }
    .van-field__control {
      font-size: 24px;
      line-height: 68px !important;
    }
  }
}
.tf-body-container {
  padding: 30px 20px;
}
.refresh-box {
  width: 710px;
  padding: 0;
  border-radius: 10px;
  /deep/ .tf-van-cell {
    padding: 0 30px;
    margin-bottom: 0;
    background: #ffffff;
  }
  /deep/ .tf-van-cell + .tf-van-cell {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: 30px;
      right: 30px;
      height: 1px;
      background: #eee;
    }
  }
}
.info-box {
  display: flex;
  padding: 40px 0;
  .info-left {
    width: 100px;
    font-size: 36px;
    font-weight: bold;
    color: #222222;
    span {
      font-size: 24px;
    }
  }
  .info-center {
    flex: 1;
    .tf-row {
      margin-bottom: 20px;
    }
    .info-view {
      position: relative;
      font-size: 28px;
      color: #222222;
      line-height: 40px;
    }
    .info-view + .info-view {
      margin-left: 40px;
      &::before {
        content: "";
        display: block;
        position: absolute;
        width: 1px;
        height: 28px;
        top: 4px;
        left: -20px;
        background: #8f8f94;
      }
    }
  }
  .info-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex: 1;
    .info-tag {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 120px;
      height: 40px;
      margin-bottom: 20px;
      background: #ff65551a;
      border-radius: 4px;
      font-size: 24px;
      color: #ff6555;
      line-height: 1;
    }
  }
  .info-text {
    font-size: 24px;
    color: #8f8f94;
  }
}
</style>

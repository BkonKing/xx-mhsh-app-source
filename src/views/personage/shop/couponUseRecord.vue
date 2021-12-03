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
    <div class="tf-body-container" id="notice-list-container">
      <refreshList
        class="refresh-box"
        :list.sync="noticeList"
        :load="getNoticeList"
      >
        <template v-slot="{ item }">
          <div class="info-box">
            <div class="info-left"><span>￥</span>5</div>
            <div class="info-center">
              <div class="tf-row">
                <span class="info-view">满10减5</span>
                <span class="info-view">分类</span>
              </div>
              <div class="info-text">150600000000</div>
            </div>
            <div class="info-right">
              <div class="info-tag">线下使用</div>
              <div class="info-text">2021-11-11</div>
            </div>
          </div>
        </template>
      </refreshList>
    </div>
  </div>
</template>

<script>
import refreshList from '@/components/tf-refresh-list'
import { getNoticeList } from '@/api/butler.js'
export default {
  name: 'noticeIndex',
  components: {
    refreshList
  },
  data () {
    return {
      search: '',
      noticeList: [],
      scrollTop: 0
    }
  },
  created () {},
  activated () {
    if (this.scrollTop) {
      document
        .getElementById('notice-list-container')
        .getElementsByClassName(
          'tf-list-refresh'
        )[0].scrollTop = this.scrollTop
    }
  },
  methods: {
    // 获取公告通知列表
    getNoticeList (params) {
      return getNoticeList(params)
    },
    searchChange () {},
    goBack () {
      this.$router.go(-1)
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'butler') {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    } else {
      const el = document
        .getElementById('notice-list-container')
        .getElementsByClassName('tf-list-refresh')
      this.scrollTop = (el[0] && el[0].scrollTop) || 0
    }
    next()
  }
}
</script>

<style lang="less" scoped>
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
      line-height: 64px !important;
    }
  }
}
.tf-body-container {
  padding: 30px 20px;
}
.refresh-box {
  width: 710px;
  padding: 0 30px;
  background: #ffffff;
  border-radius: 10px;
  /deep/ .tf-van-cell {
    margin-bottom: 0;
  }
  /deep/ .tf-van-cell + .tf-van-cell {
    border-top: 1px solid #eeeeee;
  }
}
.info-box {
  display: flex;
  padding: 40px 0 30px;
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
    }
  }
  .info-text {
    font-size: 24px;
    color: #8f8f94;
  }
}
</style>

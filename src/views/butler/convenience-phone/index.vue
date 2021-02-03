<template>
  <div class="tf-body tf-bg">
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
        <div class="phone-box">
          <div class="phone-info" @click="makePhoneCall(item.telephone)">
            <div class="phone-name">{{ item.title }}</div>
            <div class="tf-row-vertical-center">
              <div class="phone-number">{{ item.telephone }}</div>
              <div class="tf-icon tf-icon-dianhua"></div>
            </div>
          </div>
          <div v-if="item.remarks" class="tf-card-content">
            <div class="phone-remarks" v-collapsed>{{ item.remarks }}</div>
          </div>
        </div>
      </template>
    </refreshList>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import { getYellowPagesList } from '@/api/butler.js'
export default {
  components: {
    refreshList,
    [NavBar.name]: NavBar
  },
  data () {
    return {
      phoneList: []
    }
  },
  directives: {
    collapsed: {
      inserted (el, binding, vNode) {
        const height = el.clientHeight
        if (height > 40) {
          el.classList.add('collapse-able')
          const handleClick = () => {
            el.classList.toggle('collapsed')
          }
          el.addEventListener('click', handleClick)
        }
      }
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
    },
    makePhoneCall (phoneNumber) {
      api.call({
        type: 'tel_prompt',
        number: phoneNumber
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .tf-list-refresh {
  flex: 1;
  padding: 0;
  .van-loading__text,
  .van-list__error-text {
    color: #fff;
  }
  // margin: 10px 0;
}
.page-banner {
  // position: absolute;
  // top: 0;
  width: 100%;
  height: 340px;
  // background: url('~@/assets/imgs/butler_phone_banner.png');
}
/deep/ .tf-van-list {
  padding: 280px 20px 0;
  background: url("~@/assets/imgs/butler_phone_banner.png");
  background-repeat: no-repeat;
  background-size: 100% 428px;
  background-position-y: -88px;
}
.phone-box {
  padding: 0 30px;
  background: #ffffff;
  border-radius: 10px;
  .phone-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120px;
    .phone-name {
      font-size: 30px;
      color: #222;
    }
    .phone-number {
      font-size: 38px;
      font-weight: 500;
      color: #222;
    }
    .tf-icon-dianhua {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 66px;
      margin-left: 20px;
      border: 2px solid #448fe4;
      border-radius: 50%;
      font-size: 30px;
      line-height: 1;
      color: #448fe4;
    }
  }
  .tf-card-content {
    padding: 20px 0;
    font-size: 24px;
    border-top: 2px solid #f0f0f0;
  }
  .phone-remarks {
    line-height: 50px;
  }
  .collapse-able {
    height: 50px;
    position: relative;
    padding-right: 40px;
    overflow: hidden;
    &::after {
      content: "\e999";
      position: absolute;
      top: 0;
      right: 0;
      font-family: "tficonfont" !important;
      font-size: 24px;
      color: #AAAAAA;
    }
  }
  .collapsed {
    height: auto;
    &::after {
      content: "\e99b";
    }
  }
}
</style>

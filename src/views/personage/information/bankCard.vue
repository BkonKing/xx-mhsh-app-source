<template>
  <div class="bankCard">
    <van-nav-bar :fixed="true"
                 :border="false"
                 placeholder
                 left-arrow
                 @click-left="goback">
      <template #title>
        <div class="title">
          银行卡
        </div>
      </template>
    </van-nav-bar>
    <div class="content">
      <div class="item"
           :style="{background:'url( '+ item.bank_bj +') no-repeat',backgroundSize:'100% 100%'}"
           v-for="(item, index) in bankCardArr"
           :key="index"
           @touchstart.prevent="touchinUk(item,index)"
           @touchend.prevent="cleartime">
        <div class="top">
          <div class="img">
            <img :src="item.bank_ico"
                 alt="" />
          </div>
          <div class="right">
            <div class="t1">{{item.bank_name}}</div>
            <div class="t2">储蓄卡</div>
          </div>
        </div>
        <div class="bottom">
          ****&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;
          {{item.bank_card}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Dialog, Toast } from 'vant'
import { getBankList, unbindBankCard } from '@/api/personage.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast
  },
  data () {
    return {
      bankCardArr: [],
      isShow: false
    }
  },
  methods: {
    // 回退
    goback () {
      this.$router.go(-1)
    },
    touchinUk (item, index) {
      clearInterval(this.Loop) // 再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(
        function () {
          Dialog.confirm({
            message: '是否删除该银行卡'
          })
            .then(async () => {
              this.bankCardArr.splice(index, 1)
              await unbindBankCard({ bank_id: +item.id })
              Toast.success('删除成功')
            })
            .catch(() => {
              // on cancel
              console.log('不删')
            })
        }.bind(this),
        1000
      )
    },
    cleartime () {
      // 这个方法主要是用来将每次手指移出之后将计时器清零
      clearInterval(this.Loop)
    }
  },
  async created () {
    const res = await getBankList()
    this.bankCardArr = res.data
  }
}
</script>

<style lang="less" scoped>
.bankCard {
  height: 100%;
  overflow: auto;
  .title {
    font-size: 34px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 44px;
  }
  .content {
    padding: 20px;

    .item {
      position: relative;
      width: 710px;
      height: 232px;
      // background: url(~@/assets/imgs/zgyhdb.png);
      background-color: #fff;
      margin-bottom: 30px;
      .top {
        display: flex;
        align-items: center;
        padding: 30px 30px 0;
        .img {
          padding: 12px;
          background-color: #fff;
          width: 66px;
          height: 66px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 22px;
          img {
            width: 42px;
            height: 42px;
          }
        }

        .right {
          .t1 {
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
            line-height: 38px;
          }
          .t2 {
            font-size: 22px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 38px;
            opacity: 0.6;
          }
        }
      }
      .bottom {
        margin-top: 50px;
        margin-left: 116px;

        font-size: 48px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 38px;
      }
      .box {
        position: absolute;
        top: 0;
        left: 0;
        width: 710px;
        height: 232px;
        background: #000000;
        opacity: 0.5;
        border-radius: 10px;
      }
    }
  }
}
</style>

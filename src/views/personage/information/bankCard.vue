<template>
  <div class="bankCard">
    <van-nav-bar
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="goback"
    >
      <template #title>
        <div class="title">
          银行卡
        </div>
      </template>
    </van-nav-bar>
    <div class="content">
      <div
        class="item"
        v-for="(item, index) in arr"
        :key="index"
        @touchstart.prevent="touchinUk(index)"
        @touchend.prevent="cleartime(index)"
      >
        <div class="top">
          <img src="@/assets/img/zgyh.png" alt="" />
          <div class="right">
            <div class="t1">中国银行</div>
            <div class="t2">储蓄卡</div>
          </div>
        </div>
        <div class="bottom">
          ****&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;
          0505
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Dialog } from "vant";
import { getBankList } from "@/api/personage.js";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      arr: [0, 1, 2, 3],
      isShow: false
    };
  },
  methods: {
    // 回退
    goback() {
      this.$router.go(-1);
    },
    touchinUk(index) {
      console.log(index);
      clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(
        function() {
          Dialog.confirm({
            message: "是否删除该银行卡"
          })
            .then(() => {
              console.log("删除");
              this.arr.splice(index, 1);
            })
            .catch(() => {
              // on cancel
              console.log("不删");
            });
        }.bind(this),
        1000
      );
    },
    cleartime(index) {
      // 这个方法主要是用来将每次手指移出之后将计时器清零
      clearInterval(this.Loop);
    }
  },
  async created() {
    const res = await getBankList();
    console.log("银行卡", res);
  }
};
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
      background: url(~@/assets/imgs/zgyhdb.png);
      background-size: 100% 100%;
      margin-bottom: 30px;
      .top {
        display: flex;
        align-items: center;
        padding: 30px 30px 0;
        img {
          width: 66px;
          height: 66px;
          margin-right: 22px;
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

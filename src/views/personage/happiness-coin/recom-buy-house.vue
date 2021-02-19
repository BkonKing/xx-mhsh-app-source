<template>
  <div class="recom-buy-house">
    <div class="top">
      <van-nav-bar :fixed="true"
                   :border="false"
                   placeholder
                   left-arrow
                   right-text="记录"
                   @click-left="$router.go(-1)"
                   @click-right="$router.push('/pages/personage/happiness-coin/recomRecord')" />
      <h2>推荐赚幸福币</h2>
      <div class="title">
        <div class="left">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>
        <div class="mid">三步流程轻松赚</div>
        <div class="right">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>
      </div>
      <div class="step">
        <div class="c1">
          1
        </div>
        <div class="line1"></div>
        <div class="c2">2</div>
        <div class="line2"></div>
        <div class="c3">3</div>
        <div class="poiter"></div>
      </div>
      <div class="titleItem">
        <div class="t1">推荐小伙伴</div>
        <div class="t2">小伙伴购房</div>
        <div class="t3">获得奖励</div>
      </div>
      <div class="midCon">
        <van-form ref="form">
          <van-field v-model="friedName"
                     maxlength="10">
            <template #label>
              <div>
                <span>朋友姓名</span> <span style="color:red">*</span>
              </div>
            </template>
          </van-field>
          <van-field v-model="phone"
                     type="number"
                     maxlength="11">
            <template #label>
              <div>
                <span>手机号</span> <span style="color:red">*</span>
              </div>
            </template>
          </van-field>
          <van-cell is-link
                    @click="show=true">
            <template #title>
              <div class="title2">
                楼盘名称 <span style="color:red">*</span>
                <span class="houseName">{{ houseName }}</span>
              </div>
            </template>
          </van-cell>
        </van-form>
      </div>
    </div>
    <div v-if="bol"
         class="awardInfo">
      奖励：30000幸福币 (朋友到访100,购房29900)
    </div>
    <!-- 楼盘名称弹出层1 -->
    <van-popup v-model="show"
               position="bottom"
               :style="{ height: '80%' }">
      <van-search v-model="value"
                  placeholder="请输入搜索关键词" />
      <div class="con">
        <van-cell v-for="(item,index) in 10"
                  :key="index"
                  class="cell"
                  @click="selectHome(item,index)">
          <template #title>
            <div>
              {{item}}
            </div>
          </template>
          <template>
            <i class="tf-icon"
               :class="{'tf-icon-gou':currentIndex===index}"></i>
          </template>
        </van-cell>
      </div>
      <div class="btn"
           v-if="show===true">
        <van-button block
                    color="#eb5841"
                    @click="show=false">确定</van-button>
      </div>
    </van-popup>

    <i v-if="show===true"
       @click="show=false"
       class="tf-icon tf-icon-guanbi1 guanbi"></i>
    <div class="confirm">
      <van-button block
                  :disabled="!bol"
                  :color="!bol?'#aaaaaa':'#eb5841'"
                  @click="submit">确认提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      currentIndex: undefined,
      houseName: '',
      value: '',
      friedName: '',
      phone: ''
    }
  },
  computed: {
    bol () {
      return this.houseName !== '' && this.friedName !== '' && this.phone !== ''
    }
  },
  methods: {
    // 选择家园
    selectHome (item, index) {
      this.currentIndex = index
      console.log(item)
      this.houseName = item
    },
    // 确认提交
    submit () {
      this.$toast('提交成功')
    }
  }
}
</script>

<style lang='less' scoped>
.recom-buy-house {
  background-color: #f2f2f4;
  height: 100%;
  .top {
    position: relative;
    padding-bottom: 170px;
    background-color: #fadbbe;
    /deep/ .van-nav-bar {
      background-color: #fadbbe;
      /deep/ .van-icon-arrow-left {
        color: #ca864e;
      }
      .van-nav-bar__text {
        color: #ca864e;
      }
    }
    h2 {
      color: #ca864e;
      text-align: center;
      font-size: 66px;
      font-weight: 600;
    }
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      .line {
        width: 60px;
        height: 1px;
        background-color: #ca864e;
        &:nth-child(2) {
          margin: 5px 0;
        }
      }
      .mid {
        margin: 0 60px;
        font-size: 26px;
        font-family: PingFangSC;
        font-weight: 400;
        color: #ca864e;
        line-height: 52px;
      }
    }
    .step {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .c1 {
        left: 90px;
        width: 66px;
        height: 66px;
        background: linear-gradient(180deg, #fec98b, #fe8a44);
        border-radius: 50%;
        border: 10px solid #fff;

        font-size: 34px;
        font-family: PingFangSC;
        font-weight: 600;
        color: #ffffff;
        text-align: center;
        line-height: 52px;
      }
      .poiter {
        position: absolute;
        top: 80px;
        left: 130px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #fe8a45;
      }
      .c2,
      .c3 {
        width: 66px;
        height: 66px;
        border-radius: 50%;
        background-color: #fff;
        border: 10px solid #fff;

        font-size: 34px;
        font-family: PingFangSC;
        font-weight: 600;
        color: #fadbbe;
        text-align: center;
        line-height: 52px;
      }
      .c2 {
        margin: 0 170px;
      }
      .line1 {
        position: absolute;
        top: 20px;
        left: 170px;
        width: 180px;
        height: 25px;
        background-color: #fff;
      }
      .line2 {
        position: absolute;
        top: 20px;
        left: 400px;
        width: 180px;
        height: 25px;
        background-color: #fff;
      }
    }
    .titleItem {
      display: flex;
      align-items: center;
      margin-top: 44px;
      .t1 {
        flex: 1;
        text-align: center;
        font-size: 34px;
        font-family: PingFangSC;
        font-weight: 500;
        color: #7f532f;
        line-height: 52px;
      }
      .t2,
      .t3 {
        flex: 1;
        text-align: center;
        font-size: 26px;
        font-family: PingFangSC;
        font-weight: 400;
        color: #ca864e;
        line-height: 52px;
      }
    }
    .midCon {
      position: absolute;
      top: 450px;
      left: 50%;
      transform: translateX(-50%);
      width: 670px;
      height: 358px;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      padding: 0 30px;
      .van-cell {
        padding: 40px 0;
        border-bottom: 1px solid #f0f0f0;
      }
      .title2 {
        color: #8f8f94;
        .houseName {
          margin-left: 20px;
        }
      }
    }
  }
  .awardInfo {
    margin: 0 auto;
    margin-top: 250px;
    width: 670px;
    height: 88px;
    background: #f1e2e2;
    border-radius: 10px;

    font-size: 28px;
    font-family: PingFangSC;
    font-weight: 400;
    color: #eb5841;
    line-height: 88px;
    text-align: center;
  }
  .van-popup {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding-top: 20px;
    .con {
      padding: 0 20px;
      position: absolute;
      top: 150px;
      bottom: 150px;
      left: 0;
      overflow: auto;
      width: 100%;
      padding-bottom: 50px;
      .cell.van-cell {
        padding: 34px 0;
        border-bottom: 1px solid #f0f0f0;
      }
      .tf-icon-gou {
        font-size: 30px;
        color: black;
      }
    }
  }
  .guanbi {
    font-size: 50px;
    position: absolute;
    top: 168px;
    right: 30px;
    color: white;
    z-index: 99999;
  }
  .btn {
    position: absolute;
    left: 0;
    bottom: 20px;
    padding: 20px;
    width: 100%;
  }
  .confirm {
    position: absolute;
    top: 1200px;
    left: 0;
    padding: 0 20px;
    width: 100%;
  }
}
</style>

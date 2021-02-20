<template>
  <div class="recom-record">
    <div class="top">
      <van-nav-bar :fixed="true"
                   :border="false"
                   placeholder
                   left-arrow
                   @click-left="$router.go(-1)">
        <template #title>
          <div class="title">
            推荐记录
          </div>
        </template>
      </van-nav-bar>
      <div class="count">
        <div class="left">
          <div class="t1">22</div>
          <div class="t2">累计推荐人数</div>
        </div>
        <div class="line"></div>
        <div class="right">
          <div class="t1">10000</div>
          <div class="t2">已奖励幸福币</div>
        </div>
      </div>
      <div class="content">
        <van-cell v-for="(item,index) in 20"
                  :key="index"
                  @click="isShow=true">
          <template #title>
            <div class="item">
              <div class="left">
                <div class="t1">蔡文姬</div>
                <div class="t2">新乡美好生活家园</div>
              </div>
              <div class="right">
                <div class="t1"
                     v-if="index %2 ===0">已到访 <span>+100</span></div>
                <div class="t2"
                     v-if="index %2 ===0">已购房 <span>+10000</span></div>
              </div>
            </div>
          </template>
        </van-cell>
      </div>
    </div>
    <!-- 详情弹出层1 -->
    <van-popup class="popup"
               v-model="isShow">
      <div class="title">
        详情
      </div>
      <div class="info">
        <div class="t1">
          <div class="left">
            客户姓名：</div> <span>鲁班</span>
        </div>
        <div class="t2">
          <div class="left">
            手机号：</div><span>15020203030</span>
        </div>
        <div class="t3">
          <div class="left">
            楼盘：</div><span>美好生活家园</span>
        </div>
        <div class="t4">
          <div class="left">
            预计奖励：
          </div>
          <div class="right">
            <div class="t4-top">10010幸福币</div>
            <div class="t4-bottom">(到访100，购房10000）</div>
          </div>
        </div>
        <div class="t5">
          <div class="left">
            实际奖励：
          </div>
          <div class="right">
            <div class="t5-top"
                 style="color:red">10010幸福币</div>
            <div class="t5-bottom">(到访100，购房10000）</div>
          </div>
        </div>
      </div>
      <!-- <div class="steps">
        <van-steps direction="vertical"
                   :active="active"
                   active-color='#ffa110'
                   active-icon='checked'>
          <van-step>
            <div class="stepItem">
              <p>2016.07.12 </p>
              <div class="txt">推荐客户</div>

            </div>
          </van-step>
          <van-step>
            <div class="stepItem">
              <p>2016.07.11 </p>
              <div class="txt">客户到访 <span style="color:red">+100</span> </div>

            </div>
          </van-step>
          <van-step>
            <div class="stepItem">
              <p>2016.07.10 </p>
              <div class="txt">客户购房 <span style="color:red">+1000</span> </div>
            </div>
          </van-step>
        </van-steps>
      </div> -->
      <div class="steps">
        <!-- <van-steps direction="vertical"
                   :active="0"
                   active-color='#ffa110'
                   active-icon='checked'>
          <van-step>
            <div class="stepItem">
              <p>2016.07.12 </p>
              <div class="txt">推荐客户</div>

            </div>
          </van-step>
          <van-step>
            <div class="stepItem">
              <p>客户购房</p>
            </div>
          </van-step>
        </van-steps> -->
        <div class="left">
          <div class="item">
            <van-icon class="gouxuan active"
                      name="checked" />
          </div>
          <div class="line activeBg"></div>
          <div class="item2">
            <van-icon class="gouxuan active"
                      name="checked" />
            <div class="cir"
                 v-if="false">
            </div>
          </div>
          <div class="line2 activeBg"></div>
          <div class="item">
            <van-icon class="gouxuan active"
                      name="checked" />
            <div class="cir"
                 v-if="false">
            </div>
          </div>
        </div>
        <div class="right">
          <div class="t1">
            <span>2021.01.01</span>
            <span>推荐客户</span>
          </div>
          <div class="t2">
            <span>2020.02.02</span>
            <span>客户到访</span>
            <span>+100</span>
          </div>
          <div class="t2">
            <span>2020.02.02</span>
            <span>客户购房</span>
            <span>+10000</span>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 详情弹出层2 -->
    <van-popup class="popup2"
               v-model="isShow2">
      <div class="title">
        详情
      </div>
      <div class="info">
        <div class="t1">
          <div class="left">
            客户姓名：</div> <span>鲁班</span>
        </div>
        <div class="t2">
          <div class="left">
            手机号：</div><span>15020203030</span>
        </div>
        <div class="t3">
          <div class="left">
            楼盘：</div><span>美好生活家园</span>
        </div>
        <div class="t5">
          <div class="left">
            实际奖励：
          </div>
          <div class="right">
            <div class="t5-top">10010幸福币(购房10000)</div>
          </div>
        </div>
      </div>
      <div class="steps">
        <!-- <van-steps direction="vertical"
                   :active="0"
                   active-color='#ffa110'
                   active-icon='checked'>
          <van-step>
            <div class="stepItem">
              <p>2016.07.12 </p>
              <div class="txt">推荐客户</div>

            </div>
          </van-step>
          <van-step>
            <div class="stepItem">
              <p>客户购房</p>
            </div>
          </van-step>
        </van-steps> -->
        <div class="left">
          <div class="item">
            <van-icon class="gouxuan active"
                      name="checked" />
          </div>
          <div class="line activeBg"></div>
          <div class="item">
            <van-icon class="gouxuan active"
                      name="checked" />
            <div class="cir"
                 v-if="false">
            </div>
          </div>
        </div>
        <div class="right">
          <div class="t1">
            <span>2021.01.01</span>
            <span>推荐客户</span>
          </div>
          <div class="t2">
            客户购房
          </div>
        </div>

      </div>
    </van-popup>
    <i class="tf-icon tf-icon-guanbi1 guanbi1"
       @click="isShow=false"
       v-if="isShow"></i>
    <i class="tf-icon tf-icon-guanbi1 guanbi2"
       @click="isShow2=false"
       v-if="isShow2"></i>
  </div>
</template>

<script>
import Vue from 'vue'
import { Step, Steps } from 'vant'
Vue.use(Step)
Vue.use(Steps)
export default {
  data () {
    return {
      isShow: false,
      active: 2,
      isShow2: false
    }
  }
}
</script>

<style lang='less' scoped>
.recom-record {
  background-color: #f2f2f4;
  height: 100%;
  .top {
    background-color: #fadbbe;
    position: relative;
    padding-bottom: 100px;
    .title {
      font-size: 34px;
      font-family: PingFangSC;
      font-weight: 500;
      color: #ca864e;
      line-height: 44px;
    }
    /deep/ .van-icon-arrow-left {
      color: #ca864e;
    }
    /deep/ .van-nav-bar {
      background-color: #fadbbe;
    }
    .count {
      display: flex;
      align-items: center;
      text-align: center;
      margin-top: 50px;
      .left {
        flex: 1;
        .t1 {
          font-size: 72px;
          font-family: PingFangSC;
          font-weight: 500;
          color: #ca864e;
          line-height: 72px;
        }
        .t2 {
          font-size: 26px;
          font-family: PingFangSC;
          font-weight: 400;
          color: #ca864e;
          line-height: 72px;
          opacity: 0.8;
        }
      }
      .line {
        width: 2px;
        height: 80px;
        background: #ca864e;
        border-radius: 1px;
      }
      .right {
        flex: 1;
        .t1 {
          font-size: 72px;
          font-family: PingFangSC;
          font-weight: 500;
          color: #ca864e;
          line-height: 72px;
        }
        .t2 {
          font-size: 26px;
          font-family: PingFangSC;
          font-weight: 400;
          color: #ca864e;
          line-height: 72px;
          opacity: 0.8;
        }
      }
    }
    .content {
      position: absolute;
      top: 300px;
      left: 50%;
      transform: translateX(-50%);
      width: 710px;
      height: 767px;
      background: #ffffff;
      border-radius: 10px;
      padding: 0 20px;
      overflow: auto;
      /deep/ .van-cell {
        padding: 30px 0;
        border-bottom: 1px solid #f0f0f0;
      }
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          .t1 {
            font-size: 34px;
            font-weight: 600;
          }
          .t2 {
            margin-top: 5px;
            color: #8f8f94;
            font-size: 24px;
          }
        }
        .right {
          color: #8f8f94;
          font-size: 26px;
          span {
            color: #eb5841;
          }
          .t2 {
            margin-top: 5px;
          }
        }
      }
    }
  }
  /deep/ .van-popup {
    width: 620px;
    height: 850px;
    background: #ffffff;
    border-radius: 10px;
  }
  /deep/ .van-popup.popup2 {
    width: 620px;
    height: 600px;
    background: #ffffff;
    border-radius: 10px;
  }
  .popup {
    padding: 0 50px;
    padding-bottom: 20px;
    .title {
      height: 117px;
      font-size: 30px;
      font-family: PingFangSC;
      font-weight: 500;
      color: #000000;
      line-height: 117px;
      text-align: center;
      font-weight: 600;
      border-bottom: 1px solid #f0f0f0;
    }
    .info {
      margin-top: 38px;
      font-size: 26px;
      color: #8f8f94;

      span {
        color: #222222;
      }
      .right {
        display: flex;
        flex-direction: column;
        .t4-top,
        .t4-bottom,
        .t5-top,
        .t5-bottom {
          color: #222222;
        }
      }
      .t1,
      .t2,
      .t3,
      .t4,
      .t5 {
        display: flex;
        margin-bottom: 15px;
        .left {
          width: 150px;
        }
      }
    }
    .steps {
      margin-top: 25px;
      padding: 20px;
      background-color: #f0f0f0;
      font-size: 26px;
      border-radius: 10px;
      position: relative;
      overflow: hidden;
      .stepItem {
        display: flex;
        align-items: center;
        p {
          color: #8f8f94;
          font-size: 26px;
        }
        .txt {
          margin-left: 20px;
          color: #222222;
        }
      }
      .left {
        margin-right: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;

        float: left;
        position: relative;
        .item2 {
          margin: 55px 0;
        }
        .cir {
          width: 36px;
          height: 36px;
          background: #aaaaaa;
          border-radius: 50%;
        }
        .active {
          color: #ffa110;
        }
        .activeBg {
          background-color: #ffa110 !important;
        }
        .line {
          width: 4px;
          height: 78px;
          background: #aaaaaa;
          border-radius: 2px;
          position: absolute;
          top: 30px;
          left: 20px;
        }
        .line2 {
          width: 4px;
          height: 78px;
          background: #aaaaaa;
          border-radius: 2px;
          position: absolute;
          top: 135px;
          left: 20px;
        }
      }
      .right {
        color: #8f8f94;
        .t1 {
          margin-top: 5px;
          span:last-child {
            margin-left: 20px;
            color: #222222;
          }
        }
        .t2 {
          margin-top: 70px;
          span:nth-child(2) {
            margin-left: 20px;
            color: #222222;
          }
          span:nth-child(3) {
            margin-left: 10px;
            color: #eb5841;
          }
        }
      }
    }

    /deep/ .van-steps {
      background-color: #f0f0f0;
    }
    /deep/ .van-icon-checked {
      // color: #ffa110;
      font-size: 40px;
    }
    /deep/ .van-step__circle {
      width: 36px;
      height: 36px;
    }
    /deep/ .van-step {
      padding-bottom: 40px;
      padding-top: 0;
      line-height: 0px;
      padding-left: 20px;
    }
    /deep/ .van-step:last-child {
      padding-bottom: 0;
    }
  }
  .popup2 {
    padding: 0 50px;
    padding-bottom: 0px;
    .title {
      height: 117px;
      font-size: 30px;
      font-family: PingFangSC;
      font-weight: 500;
      color: #000000;
      line-height: 117px;
      text-align: center;
      font-weight: 600;
      border-bottom: 1px solid #f0f0f0;
    }
    .info {
      margin-top: 38px;
      font-size: 26px;
      color: #8f8f94;

      span {
        color: #222222;
      }
      .right {
        display: flex;
        flex-direction: column;
        .t4-top,
        .t4-bottom,
        .t5-top,
        .t5-bottom {
          color: #222222;
        }
      }
      .t1,
      .t2,
      .t3,
      .t4,
      .t5 {
        display: flex;
        margin-bottom: 15px;
        .left {
          width: 150px;
        }
      }
    }
    .steps {
      margin-top: 25px;
      padding: 20px;
      background-color: #f0f0f0;
      font-size: 26px;
      border-radius: 10px;
      position: relative;
      overflow: hidden;
      .stepItem {
        display: flex;
        align-items: center;
        p {
          color: #8f8f94;
          font-size: 26px;
        }
        .txt {
          margin-left: 20px;
          color: #222222;
        }
      }
      .left {
        margin-right: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;

        float: left;
        position: relative;
        .item:first-child {
          margin-bottom: 55px;
        }
        .cir {
          width: 36px;
          height: 36px;
          background: #aaaaaa;
          border-radius: 50%;
        }
        .active {
          color: #ffa110;
        }
        .activeBg {
          background-color: #ffa110 !important;
        }
        .line {
          width: 4px;
          height: 78px;
          background: #aaaaaa;
          border-radius: 2px;
          position: absolute;
          top: 30px;
          left: 20px;
        }
      }
      .right {
        color: #8f8f94;
        .t1 {
          margin-top: 5px;
          span:last-child {
            margin-left: 20px;
            color: #222222;
          }
        }
        .t2 {
          margin-top: 70px;
        }
      }
    }

    /deep/ .van-steps {
      background-color: #f0f0f0;
    }
    /deep/ .van-icon-checked {
      // color: #ffa110;
      font-size: 40px;
    }
    /deep/ .van-step__circle {
      width: 36px;
      height: 36px;
    }
    /deep/ .van-step {
      padding-bottom: 40px;
      padding-top: 0;
      line-height: 0px;
      padding-left: 20px;
    }
    /deep/ .van-step:last-child {
      padding-bottom: 0;
    }
  }
  /deep/ .van-step--vertical:not(:last-child)::after {
    border: none;
  }
  .guanbi1 {
    font-size: 50px;
    position: absolute;
    right: 95px;
    top: 150px;
    z-index: 9999;
    color: #ffffff;
  }
  .guanbi2 {
    font-size: 50px;
    position: absolute;
    right: 95px;
    top: 280px;
    z-index: 9999;
    color: #ffffff;
  }
}
</style>

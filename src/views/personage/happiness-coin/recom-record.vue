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
          <div class="t1">{{clientInfo.ljtjNum}}</div>
          <div class="t2">累计推荐人数</div>
        </div>
        <div class="line"></div>
        <div class="right">
          <div class="t1">{{clientInfo.ljjlCredits}}</div>
          <div class="t2">已奖励幸福币</div>
        </div>
      </div>
    </div>
    <div class="content">
      <van-list v-model="loading"
                :finished="finished"
                @load="onLoad">
        <van-cell v-for="(item,index) in list"
                  :key="index"
                  @click="openDetail(item)"
                  :class="{'cellActive':index===list.length-1}">
          <template #title>
            <div class="item"
                 :class="{'itemActive':list.length=== 2 && index===1}">
              <div class="left">
                <div class="t1">{{item.clientName}}</div>
                <div class="t2">{{item.yxlpName}}</div>
              </div>
              <div class="right">
                <div class="t1"
                     v-if="item.ydfCredits!==0">已到访 <span>+{{item.ydfCredits}}</span></div>
                <div class="t2"
                     v-if="item.ygfCredits !==0">已购房 <span>+{{item.ygfCredits}}</span></div>
              </div>
            </div>
          </template>
        </van-cell>
      </van-list>

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
            客户姓名：</div> <span>{{currentClient.clientName}}</span>
        </div>
        <div class="t2">
          <div class="left">
            手机号：</div><span>{{currentClient.clientMobile}}</span>
        </div>
        <div class="t3">
          <div class="left">
            楼盘：</div><span>{{currentClient.yxlpName}}</span>
        </div>
        <div class="t4">
          <div class="left">
            预计奖励：
          </div>
          <div class="right">
            <div class="t4-top">{{currentClient.yjjlCredits}}幸福币</div>
            <div class="t4-bottom">(到访{{currentClient.yjdfjlCredits}}，购房{{currentClient.yjgfjlCredits}}）</div>
          </div>
        </div>
        <div class="t5"
             v-if="currentClient.ydfCredits !==0 || currentClient.ygfCredits !==0">
          <div class="left">
            实际奖励：
          </div>
          <div class="right">
            <div class="t5-top"
                 style="color:#EB5841">{{currentClient.ydfCredits+currentClient.ygfCredits}}幸福币</div>
            <div class="t5-bottom">(到访{{currentClient.ydfCredits}}<span v-if="currentClient.ygfCredits!==0">，购房{{currentClient.ygfCredits}}</span>）</div>
          </div>
        </div>
      </div>

      <div class="steps">

        <div class="left">
          <div class="item">
            <van-icon class="gouxuan active"
                      name="checked" />
          </div>
          <div class="line"
               :class="{'activeBg':currentClient.ydfCredits !==0}"></div>
          <div class="item2">
            <van-icon class="gouxuan active"
                      name="checked"
                      v-if="currentClient.ydfCredits !==0" />
            <div class="cir"
                 v-else>
            </div>
          </div>
          <div class="line2"
               :class="{'activeBg':currentClient.ygfCredits !==0}"></div>
          <div class="item">
            <van-icon class="gouxuan active"
                      name="checked"
                      v-if="currentClient.ygfCredits !==0" />
            <div class="cir"
                 v-else>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="t1">
            <span>{{currentClient.tjTime}}</span>
            <span>推荐客户</span>
          </div>
          <div class="t2">
            <span v-if="currentClient.dfTime!==''">{{currentClient.dfTime}}</span>
            <span>客户到访</span>
            <span v-if="currentClient.ydfCredits!==0">+{{currentClient.ydfCredits}}</span>
          </div>
          <div class="t2">
            <span v-if="currentClient.gfjl_time !==''">{{currentClient.gfjl_time}}</span>
            <span>客户购房</span>
            <span v-if="currentClient.ygfCredits!==0">+{{currentClient.ygfCredits}}</span>
          </div>
        </div>
      </div>
      <i class="tf-icon tf-icon-guanbi1 guanbi1"
         @click="isShow=false"
         v-if="isShow"></i>
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
            客户姓名：</div> <span>{{currentClient.clientName}}</span>
        </div>
        <div class="t2">
          <div class="left">
            手机号：</div><span>{{currentClient.clientMobile}}</span>
        </div>
        <div class="t3">
          <div class="left">
            楼盘：</div><span>{{currentClient.yxlpName}}</span>
        </div>
        <div class="t4">
          <div class="left">
            预计奖励：
          </div>
          <div class="right">
            <div class="t5-top">{{currentClient.yjgfjlCredits}}幸福币<br>(购房{{currentClient.yjgfjlCredits}})</div>
          </div>
        </div>
        <div class="t5"
             v-if=" currentClient.ygfCredits !==0">
          <div class="left">
            实际奖励：
          </div>
          <div class="right">
            <div class="t5-top"
                 style="color:#EB5841">{{currentClient.ygfCredits}}幸福币</div>
            <div class="t5-bottom">(购房{{currentClient.ygfCredits}}）</div>
          </div>
        </div>
      </div>
      <div class="steps">

        <div class="left">
          <div class="item">
            <van-icon class="gouxuan active"
                      name="checked" />
          </div>
          <div class="line"
               :class="{'activeBg':currentClient.ygfCredits!==0}"></div>
          <div class="item">
            <van-icon v-if="currentClient.ygfCredits!==0"
                      class="gouxuan"
                      name="checked"
                      :class="{'active':currentClient.ygfCredits!==0}" />
            <div class="cir"
                 v-else>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="t1">
            <span>{{currentClient.tjTime}}</span>
            <span>推荐客户</span>
          </div>
          <div class="t2">
            <span v-if="currentClient.gfjl_time!==''">{{currentClient.gfjl_time}}</span>
            <span>客户购房</span>
            <span style="color:#EB5841"
                  v-if="currentClient.ygfCredits!==0">+{{currentClient.ygfCredits}}</span>
          </div>
        </div>

      </div>
      <i class="tf-icon tf-icon-guanbi1 guanbi2"
         @click="isShow2=false"
         v-if="isShow2"></i>
    </van-popup>

  </div>
</template>

<script>
import Vue from 'vue'
import { Step, Steps } from 'vant'
import { clientList, clientCount } from '@/api/personage.js'
Vue.use(Step)
Vue.use(Steps)
export default {
  data () {
    return {
      isShow: false,
      isShow2: false,
      currentPage: 1, // 页码
      loading: false,
      finished: false,
      list: [], // 推荐客户列表
      clientInfo: '', // 客户统计信息
      currentClient: '', // 当前点击的推荐客户
      ajaxBol: false
    }
  },
  methods: {
    // 打开详情窗口
    openDetail (item) {
      // console.log(item)
      //  到访+购房
      if (+item.yjdfjlCredits !== 0) {
        this.isShow = true
        this.currentClient = item
      } else {
        // 直接购房
        this.isShow2 = true
        this.currentClient = item
      }
    },
    // 获取推荐客户列表
    async onLoad () {
      if (this.ajaxBol) {
        return
      }
      this.ajaxBol = true
      const res = await clientList({
        pages: this.currentPage
      })
      this.loading = false
      this.ajaxBol = false
      this.list = [...this.list, ...res.data]
      this.currentPage++

      // console.log('客户列表', res)
      if (res.data.length === 0) {
        this.finished = true
      }
    }
  },
  beforeDestroy () {
    this.list = []
    // console.log('销毁')
  },
  async created () {
    const res = await clientCount()
    this.clientInfo = res
    this.onLoad()
    // console.log('统计客户', res)
  }
}
</script>

<style lang='less' scoped>
.recom-record {
  background-color: #f2f2f4;
  height: 100%;
  display: flex;
  flex-direction: column;
  .top {
    background-color: #fadbbe;
    // position: relative;
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
  }
  .content {
    margin: 0 auto;
    margin-top: -70px;
    width: 710px;
    // height: calc(100%-70px);
    flex: 1;
    border-radius: 10px;
    overflow: auto;
    /deep/ .van-cell {
      padding-top: 0;
      padding-left: 20px;
      background: #ffffff;
    }
    /deep/ .van-cell:first-child {
      padding-left: 20px;
      background: #ffffff;
    }
    .cellActive {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      padding-bottom: 0;
    }
    .item {
      // padding: 30px 0;
      padding-bottom: 15px;
      padding-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f0f0f0;
      .left {
        .t1 {
          color: #222222;
          font-size: 34px;
        }
        .t2 {
          margin-top: 5px;
          color: #8f8f94;
          font-size: 24px;
        }
      }

      .right {
        padding-left: 20px;
        color: #8f8f94;
        font-size: 26px;
        width: 200px;
        span {
          color: #eb5841;
        }
        .t2 {
          margin-top: 5px;
        }
      }
    }
    .itemActive {
      border-bottom: none !important;
    }
  }

  /deep/ .van-popup {
    width: 620px;
    height: auto;
    background: #ffffff;
    border-radius: 10px;
    overflow: inherit;
  }
  /deep/ .van-popup.popup2 {
    width: 620px;
    height: auto;
    background: #ffffff;
    border-radius: 10px;
    padding-bottom: 35px;
  }
  .popup {
    .guanbi1 {
      font-size: 50px;
      position: absolute;
      right: 40px;
      top: -100px;
      z-index: 999999999999999999999999;
      color: #fff;
    }
    padding: 0 50px;
    padding-bottom: 35px;
    .title {
      height: 117px;
      font-size: 30px;
      font-family: PingFangSC;
      font-weight: 500;
      color: #000000;
      line-height: 117px;
      text-align: center;
      font-weight: 600;
      border-bottom: 3px solid #f0f0f0;
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
      padding: 30px;
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
          height: 70px;
          background: #aaaaaa;
          border-radius: 2px;
          position: absolute;
          top: 37px;
          left: 20px;
        }
        .line2 {
          width: 4px;
          height: 78px;
          background: #aaaaaa;
          border-radius: 2px;
          position: absolute;
          top: 141px;
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
          margin-top: 63px;
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
    .guanbi2 {
      font-size: 50px;
      position: absolute;
      right: 40px;
      top: -100px;
      z-index: 999999999999999999999999;
      color: #fff;
    }
    padding: 0 50px;

    .title {
      height: 117px;
      font-size: 30px;
      font-family: PingFangSC;
      font-weight: 500;
      color: #000000;
      line-height: 117px;
      text-align: center;
      font-weight: 600;
      border-bottom: 3px solid #f0f0f0;
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
      padding: 30px;
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
          height: 70px;
          background: #aaaaaa;
          border-radius: 2px;
          position: absolute;
          top: 37px;
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
          span:first-child {
            color: #8f8f94;
          }
          span:nth-child(2) {
            color: #222222;
          }
          span:nth-child(-n + 2) {
            margin-right: 20px;
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
  /deep/ .van-step--vertical:not(:last-child)::after {
    border: none;
  }
}
</style>

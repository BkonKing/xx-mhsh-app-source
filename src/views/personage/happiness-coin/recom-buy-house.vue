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
      <img class="recom-img"
           src="@/assets/imgs/recom-happyicon.png"
           alt="">
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
        <div class="t2">看房、购房</div>
        <div class="t3">获得奖励</div>
      </div>
      <div class="midCon">
        <van-form ref="form">
          <van-field v-model="friedName"
                     maxlength="10"
                     onkeyup="value=value.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5\ ]/g,'')"
                     onpaste="value=value.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5\ ]/g,'')"
                     oncontextmenu="value=value.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5\ ]/g,'')">
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
                    @click="show=true"
                    center>
            <template #title>
              <div class="title2">
                楼盘名称 <span style="color:red">*</span>
                <span class="houseName">{{ houseInfo.project }}</span>
              </div>
            </template>
          </van-cell>
        </van-form>
      </div>
    </div>
    <div v-if="houseInfo !==''"
         class="awardInfo">
      奖励：{{houseInfo.credits}}幸福币 (朋友到访{{houseInfo.credits_df}},购房{{houseInfo.credits_gf}})
    </div>
    <!-- 楼盘名称弹出层1 -->
    <van-popup v-model="show"
               position="bottom"
               :style="{ height: '80%' }">
      <template v-if="yxlpList && yxlpList.length">
        <van-search v-model="value"
                    @input="onSearch"
                    v-if="yxlpList.length >=10">
          <template #left-icon>
            <i class="tf-icon tf-icon-sousuo1 sousuo1"></i>
          </template>
        </van-search>
        <div class="con">
          <van-cell v-for="(item,index) in yxlpList"
                    :key="index"
                    class="cell"
                    @click="selectHome(item,index)"
                    v-show="searchBol">
            <template #title>
              <div class="title">
                <div>
                  {{item.project}}
                </div>
                <i class="tf-icon"
                   :class="{'tf-icon-gou':currentIndex===index}"></i>
              </div>
            </template>

          </van-cell>

          <van-cell v-for="(item,index) in searchList"
                    :key="index"
                    class="cell"
                    @click="selectHome(item,index)"
                    v-show="!searchBol">
            <template #title>
              <div class="title">
                <div> {{item.project}}</div>
                <i class="tf-icon"
                   :class="{'tf-icon-gou':currentIndex===index}"></i>
              </div>
            </template>
          </van-cell>
        </div>
        <div class="btn"
             v-if="show===true">
          <van-button block
                      color="#eb5841"
                      @click="confirm">确定</van-button>
        </div>
      </template>
      <van-empty v-else
                 image="search"
                 description="暂无楼盘"
                 style="margin-top: 30%;"></van-empty>
      <i v-if="show===true"
         @click="show=false"
         class="tf-icon tf-icon-guanbi1 guanbi"></i>
    </van-popup>

    <div class="confirm">
      <van-button block
                  :disabled="!bol"
                  :color="!bol?'#aaaaaa':'#eb5841'"
                  @click="submit">确认提交</van-button>
    </div>
  </div>
</template>

<script>
import { getYxlpList, recommendClient } from '@/api/personage.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      show: false,
      currentIndex: undefined,
      houseInfo: '', // 楼盘信息
      houseItem: '',
      value: '',
      friedName: '',
      phone: '',
      yxlpList: [], // 意向楼盘列表
      yxlpIndex: 0, // 意向楼盘索引
      searchList: [], // 搜索数据
      searchBol: true // 控制是否显示搜索数据
    }
  },
  computed: {
    bol () {
      return this.houseInfo !== '' && this.friedName !== '' && this.phone !== ''
    }
  },
  watch: {
    value (newVal) {
      if (newVal === '') {
        this.searchBol = true
      }
    },
    show (newVal) {
      if (newVal === false) {
        this.searchBol = true
        this.value = ''
      }
    }
  },
  methods: {

    // 确定
    confirm () {
      this.houseInfo = this.houseItem
      this.show = false
    },
    // 搜索
    onSearch () {
      this.searchBol = false
      this.searchList = this.yxlpList.filter(item => {
        return item.project.includes(this.value)
      })
    },
    // 选择楼盘
    selectHome (item, index) {
      this.currentIndex = index
      this.yxlpIndex = index
      // console.log(item)
      this.houseItem = item
    },
    // 确认提交
    async submit () {
      const res = await recommendClient({
        alias: this.yxlpList[this.yxlpIndex].alias,
        clientName: this.friedName,
        clientMobile: this.phone,
        yxlpId: +this.yxlpList[this.yxlpIndex].yxlpId,
        project: this.yxlpList[this.yxlpIndex].project
      })
      // console.log('推荐客户', res)
      // 提交成功
      if (res.success) {
        Toast('提交成功')
        this.$router.push('/pages/personage/happiness-coin/index')
      } else {
        // 提交失败
        Toast('提交失败，请重试')
      }
    }
  },
  async created () {
    const res = await getYxlpList()
    this.yxlpList = res.data
    // console.log('楼盘列表', res)
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

    .recom-img {
      display: block;
      width: 423px;
      height: 66px;
      margin: 40px auto;
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
        width: 88px;
        height: 88px;
        background: linear-gradient(180deg, #fec98b, #fe8a44);
        border-radius: 50%;
        border: 10px solid #fff;

        font-size: 34px;
        font-family: PingFangSC;
        font-weight: 600;
        color: #ffffff;
        text-align: center;
        line-height: 65px;
      }
      .poiter {
        position: absolute;
        top: 100px;
        left: 110px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #fe8a45;
      }
      .c2,
      .c3 {
        width: 88px;
        height: 88px;
        border-radius: 50%;
        background-color: #fff;
        border: 10px solid #fff;

        font-size: 34px;
        font-family: PingFangSC;
        font-weight: 600;
        color: #fadbbe;
        text-align: center;
        line-height: 65px;
      }
      .c2 {
        margin: 0 170px;
      }
      .line1 {
        position: absolute;
        top: 30px;
        left: 160px;
        width: 180px;
        height: 25px;
        background-color: #fff;
      }
      .line2 {
        position: absolute;
        top: 30px;
        left: 400px;
        width: 190px;
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
        // margin-left: 20px;
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
      top: 510px;
      left: 50%;
      transform: translateX(-50%);
      width: 670px;
      height: 358px;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      padding: 0 30px;
      /deep/ .van-cell {
        padding: 40px 0;
        border-bottom: 1px solid #f0f0f0;
      }
      .van-icon-arrow {
        font-size: 30px;
      }
      .title2 {
        color: #8f8f94;
        .houseName {
          color: #222222;
          padding-left: 60px;
        }
      }
    }
  }
  .awardInfo {
    margin: 0 auto;
    margin-top: 255px;
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
    overflow: inherit;
    // padding-bottom: 200px;
    .con {
      // padding: 0 20px;
      padding-left: 30px;
      padding-right: 20px;
      position: absolute;
      top: 150px;
      bottom: 150px;
      left: 0;
      // height: 100%;
      overflow: auto;
      width: 100%;
      /deep/ .cell.van-cell {
        padding: 34px 0;
        border-bottom: 1px solid #f0f0f0;
      }
      .cell {
        .title {
          height: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .tf-icon-gou {
            font-size: 40px;
            font-weight: 600;
            color: black;
          }
        }
      }
    }
    .btn {
      position: absolute;
      left: 0;
      bottom: 15px;
      padding: 20px;
      width: 100%;
      button {
        border-radius: 10px;
        font-size: 34px;
      }
    }
  }
  .guanbi {
    font-size: 50px;
    position: absolute;
    top: -90px;
    right: 30px;
    color: white;
    z-index: 999999999;
  }

  .confirm {
    position: fixed;
    bottom: 30px;
    left: 0;
    // padding: 0 20px;
    width: 100%;
    button {
      display: block;
      width: 8.93333rem;
      margin: 0 auto;
    }
  }
  .sousuo1 {
    line-height: 40px;
    font-size: 36px !important;
    color: #8f8f94;
  }

  /deep/ .van-search__content {
    border-radius: 10px !important;
  }
}
</style>

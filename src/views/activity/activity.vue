<template>
  <div class="activity">
    <div class="content" ref="content">
      <van-nav-bar
        :fixed="true"
        :border="false"
        left-arrow
        title="参与活动领积分"
        @click-left="$router.go(-1)"
      />
      <img class="img1" src="@/assets/img/activite_bg.png" alt="" />

      <div class="userBox">
        <div class="userInfo">
          <img
            class="avatar"
            src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=154868208,3694122303&fm=15&gp=0.jpg"
            alt=""
          />
          <div class="username">
            <div class="t1">
              <span>昵称昵称</span
              ><van-tag plain class="tag" type="primary">业主</van-tag
              ><van-tag class="tag" plain type="success">管理员</van-tag>
            </div>
            <div class="t2">5栋-1单元-1101</div>
          </div>
          <div class="ma">
            <img src="@/assets/img/activite_ma.png" alt="" />
          </div>
        </div>
        <div class="projectBox">
          <div
            class="projectItem"
            :class="{ active: projectArr.length === 1 }"
            v-for="(item, index) in projectArr"
            :key="index"
          >
            <div class="num">1000</div>
            <div class="txt">当前积分</div>
            <div class="projectname">三明美好生活家园</div>
          </div>
        </div>
        <div class="effectTime">
          积分有效时间：2021-03-01 00:00 ~ 2021-03-10 00:00
        </div>
      </div>
      <div class="dropdown">
        <van-dropdown-menu>
          <van-dropdown-item disabled>
            <template #title>
              <div class="dropdownTitle">
                积分记录
              </div>
            </template>
          </van-dropdown-item>
          <van-dropdown-item
            v-model="value2"
            :options="option2"
            @open="openItem"
            @close="coloseItem"
            @change="dropdownChange"
          >
            <template #title>
              <div class="dropdownTitle2">
                {{ dropdownObj.text }}
                <i
                  class="tf-icon tf-icon-caret-down"
                  v-if="iconBol"
                  style="color:#8f8f94"
                ></i>
                <i
                  class="tf-icon tf-icon-caret-up"
                  v-if="!iconBol"
                  style="color:#8f8f94"
                ></i>
              </div>
            </template>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
    </div>
    <div class="recodContent" ref="recodContent">
      <div class="item" v-for="item in 20" :key="item">
        <div class="cellBox">
          <div class="left">
            <div class="t1">获得</div>
            <div class="t2">2021-03-01 12:12:12</div>
          </div>
          <div class="right">
            <div class="t1">+50</div>
            <div class="t2">剩余50</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      projectArr: [
        {
          num: 1000,
          txt: '当前积分',
          projectname: 'XX美好生活家园'
        }
      ],
      value2: 'a',
      option2: [
        { text: '全部(7)', value: 'a' },
        { text: '获得(1)', value: 'b' },
        { text: '使用()', value: 'c' }
      ],
      dropdownObj: {},
      iconBol: true
    }
  },
  methods: {
    dropdownChange (value) {
      // console.log(value)
      const obj = this.option2.find(item => {
        return item.value === value
      })
      // console.log('obj', obj)
      this.dropdownObj = obj
    },
    openItem () {
      this.iconBol = false
    },
    coloseItem () {
      this.iconBol = true
    }
  },
  mounted () {
    this.$refs.recodContent.style.height =
      document.body.offsetHeight - this.$refs.content.offsetHeight + 'px'
  },
  created () {
    this.dropdownChange(this.value2)
    // for (let i = 0; i < 20; i++) {
    //   this.projectArr.push({
    //     num: 1000,
    //     txt: '当前积分',
    //     projectname: 'XX美好生活家园'
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
.activity {
  .content {
    position: relative;
    /deep/ .van-nav-bar {
      background-color: transparent;
    }
    /deep/ .van-nav-bar__title {
      font-size: 34px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #222222;
      line-height: 44px;
    }
    .img1 {
      width: 100%;
      height: 500px;
    }
    // padding: 0 20px;
    .userBox {
      width: 710px;
      height: 470px;
      background: #ffffff;
      box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
      border-radius: 20px;
      position: absolute;
      top: 286px;
      left: 50%;
      transform: translateX(-50%);
      padding: 20px;
      .userInfo {
        display: flex;
        align-items: center;
        .avatar {
          margin-right: 20px;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          vertical-align: middle;
        }
        .username {
          flex: 1;
          .t1 {
            line-height: 30px;
            span {
              font-size: 32px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #222222;
              margin-right: 20px;
            }
          }
          .t2 {
            font-size: 22px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #8f8f94;
            line-height: 52px;
          }
          .tag {
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffa110;
          }
        }
        .ma {
          width: 56px;
          height: 56px;
          line-height: 56px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .projectBox {
        margin-top: 30px;
        display: flex;
        align-items: center;
        overflow: scroll;
        .projectItem {
          flex-shrink: 0;
          width: 250px;
          height: 200px;
          text-align: center;
          // border: 1px solid red;
          .num {
            margin-top: 30px;
            font-size: 48px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #febf00;
          }
          .txt {
            margin-top: 5px;
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            opacity: 0.3;
          }
          .projectname {
            margin-top: 15px;
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
          }
        }
        .active {
          width: 100% !important;
          height: 224px;
          background: url("~@/assets/img/activite_mid.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .effectTime {
        margin-top: 30px;
        text-align: center;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #8f8f94;
      }
    }
    .dropdown {
      margin-top: 280px;
      padding: 0 20px;
    }
    /deep/ .van-dropdown-menu__title::after {
      display: none;
    }
    .dropdownTitle {
      margin-right: 500px;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 337px;
    }
    /deep/ .van-dropdown-menu__title {
      padding: 0;
    }
    .dropdownTitle2 {
      margin-left: 200px;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #000000;
    }
  }
  .recodContent {
    overflow: auto;
    width: 710px;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 20px;
    .item {
      overflow: hidden;
      padding: 0 20px;
      background-color: #f7f7f7;
    }
    .cellBox {
      height: 134px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #dddddd;
    }
    .left {
      .t1 {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #000000;
      }
      .t2 {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #8f8f94;
      }
    }
    .right {
      text-align: right;
      .t1 {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
      }
      .more0 {
        color: #ff5240;
      }
      .less0 {
        color: #000000;
      }
      .t2 {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #8f8f94;
      }
    }
  }
}
</style>

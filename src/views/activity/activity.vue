<template>
  <div class="activity">
    <div class="content" ref="content" >
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
          <img class="avatar" :src="userActiveInfo.user_data.avatar" alt="" />
          <div class="username">
            <div class="t1">
              <span>{{ userActiveInfo.user_data.realname }}</span
              ><van-tag plain class="tag" type="primary">{{
                userActiveInfo.user_data.user_role
              }}</van-tag>
              <!-- <van-tag class="tag" plain type="success">管理员</van-tag> -->
            </div>
            <div class="t2">{{ userActiveInfo.user_data.fc_info }}</div>
          </div>
          <div class="ma" @click="openMa">
            <img src="@/assets/img/activite_ma.png" alt="" />
          </div>
        </div>
        <div class="projectBox">
          <div
            class="projectItem"
            :class="{
              active: userActiveInfo.integral_balance_list.length === 1,
              active2: userActiveInfo.integral_balance_list.length > 1,
              projectActive: index === currentIndex
            }"
            v-for="(item, index) in userActiveInfo.integral_balance_list"
            :key="index"
            @click="selectProject(index)"
          >
            <div class="num">{{item.balance}}</div>
            <div class="txt">当前积分</div>
            <div class="projectname">{{item.project_name}}</div>
          </div>
        </div>
        <div class="effectTime">
          积分有效时间：2021-03-01 00:00 ~ 2021-03-10 00:00
        </div>
      </div>
      <!-- 下拉菜单 -->
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
            ref="dropdown2"
            @open="openItem"
            @close="coloseItem"
          >
            <template #title>
              <div class="dropdownTitle2">
                {{ typeTitle ? typeTitle : "类型" }}
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
            <template>
              <div class="itemBox">
                <div
                  class="item"
                  :class="{ typeActive: typeIndex === index }"
                  @click="selectType(index)"
                  v-for="(item, index) in typeArr"
                  :key="index"
                >
                  <span>{{ item }}</span>
                  <i
                    class="tf-icon tf-icon-gou gou"
                    v-if="typeIndex === index"
                  ></i>
                </div>
              </div>
            </template>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
    </div>
    <!-- 积分记录 -->
    <div class="recodContent" v-if="false" ref="recodContent">
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
    <!-- 空状态 -->
    <div v-else class="recodContent2" ref="recodContent2">
      <img class="nothing_bg" src="@/assets/img/nothing_bg.png" alt="" />
      <div class="txt">暂无记录</div>
    </div>
    <van-popup v-model="isShow" class="popup">
      <div class="top">
        <div class="title">二维码</div>
        <i class="tf-icon tf-icon-guanbi guanbi" @click="isShow = false"></i>
      </div>
      <div class="txt">请出示二维码给工作人员，以便发放或核销积分</div>
      <div class="ma">
        <img :src="userActiveInfo.user_data.qrCode" alt="" />
      </div>
    </van-popup>
  </div>
</template>

<script>
import { integralActivity, integralActivityLog } from '@/api/activity.js'
export default {
  data () {
    return {
      iconBol: true,
      integralList: [],
      isShow: false,
      userActiveInfo: {}, // 用户活动信息
      currentIndex: 0,
      typeTitle: '',
      typeArr: ['发放', '核销'],
      typeIndex: 0,
      projectID: '' // 项目ID
    }
  },
  methods: {
    // 选择类型
    selectType (index) {
      this.typeIndex = index
      this.typeTitle = this.typeArr[index]
      this.$refs.dropdown2.toggle(false)
    },
    // 选择项目
    selectProject (index) {
      this.currentIndex = index
    },
    // 获取账户信息 列表
    async getData () {
      const res = await integralActivityLog({
        project_id: this.projectID
      })
      console.log('账户信息 列表', res)
    },
    // 打开二维码
    openMa () {
      this.isShow = true
    },
    // 下拉菜单改变事件
    // dropdownChange (value) {
    //   // console.log(value)
    //   const obj = this.option2.find(item => {
    //     return item.value === value
    //   })
    //   // console.log('obj', obj)
    //   this.dropdownObj = obj
    // },
    openItem () {
      this.iconBol = false
    },
    coloseItem () {
      this.iconBol = true
    }
  },
  watch: {
    userActiveInfo () {
      this.$nextTick(() => {
        if (this.$refs.recodContent) {
          this.$refs.recodContent.style.height =
        document.body.offsetHeight - this.$refs.content.offsetHeight + 'px'
        }
      })
    }
  },
  mounted () {
    // this.$refs.recodContent.style.height =
    //     document.body.offsetHeight - this.$refs.content.offsetHeight + 'px'

    if (this.$refs.recodContent2) {
      this.$refs.recodContent2.style.height =
        document.body.offsetHeight - this.$refs.content.offsetHeight + 'px'
    }
  },
  async created () {
    const res = await integralActivity()
    this.userActiveInfo = res.data
    if (res.data.integral_balance_list.length === 1) {
      this.projectID = res.data.integral_balance_list[0].project_id
    }
    console.log('用户活动信息', res)
    this.projectID = this.$route.query.projectId ? this.$route.query.projectId : ''
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
      height: 442px;
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
         border-radius: 20px;
          width: 100% !important;
          height: 224px;
          background: url("~@/assets/img/activite_mid.png") no-repeat;
          background-size: 100% 100%;
        }
        .active2 {
          width: 250px;
          height: 224px;
          background: #f7f7f7;
          border-radius: 20px;
          margin-right: 25px;
          .num {
            margin-top: 50;
            font-size: 48px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;
          }
          .txt {
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
            opacity: 0.3;
          }
          .projectname {
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
          }
        }
        .projectActive {
          background-color: #2a334a;
          .num {
            font-size: 48px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #febf00;
          }
          .txt {
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            opacity: 0.3;
          }
          .projectname {
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
          }
        }
      }
      .effectTime {
        margin-top: 15px;
        text-align: center;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #8f8f94;
      }
    }
    .dropdown {
      margin-top: 250px;
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
    .itemBox {
      padding: 0 50px;
      .item {
        height: 86px;
        line-height: 86px;
        border-bottom: 1px solid #eeeeee;
        span {
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #8f8f94;
        }
        display: flex;
        align-items: center;
        justify-content: space-between;
        .gou {
          font-size: 28px;
          font-weight: 500;
        }
      }
      .typeActive {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 500;
        span {
          color: #000000 !important;
        }
      }
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
  .recodContent2 {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .nothing_bg {
      width: 200px;
      height: 240px;
      display: block;
      margin: 0 auto;
      margin-top: 150px;
    }
    .txt {
      text-align: center;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #aaaaaa;
      margin-top: 15px;
    }
  }
  .popup {
    width: 650px;
    height: 746px;
    background: #ffffff;
    border-radius: 20px;
    .top {
      display: flex;
      align-items: center;
      margin-top: 50px;
      .title {
        flex: 1;
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 44px;
        text-align: center;
      }
      .guanbi {
        margin-right: 50px;
        font-size: 30px;
      }
    }
    .txt {
      margin-top: 40px;
      text-align: center;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #8f8f94;
      line-height: 44px;
    }
    .ma {
      width: 450px;
      height: 450px;
      margin: 60px auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

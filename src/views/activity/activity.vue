<template>
  <div class="activity">
    <div class="content" ref="content">
      <van-nav-bar
        :fixed="true"
        :border="false"
        left-arrow
        :title="pageTitle ? pageTitle : '参与活动领积分'"
        @click-left="$router.go(-1)"
      />
      <img class="img1" src="@/assets/img/activite_bg.png" alt="" />

      <div class="userBox">
        <div class="userInfo" v-if="userActiveInfo.user_data">
          <img
            class="avatar"
            v-if="userActiveInfo.user_data.avatar"
            :src="userActiveInfo.user_data.avatar"
            alt=""
          />
          <img class="avatar" v-else src="@/assets/imgs/touxiang.png" alt="" />
          <div class="username">
            <div class="t1">
              <span>{{ userActiveInfo.user_data.nickname }}</span
              ><van-tag v-if="userInfo.user_type != '0'" plain class="tag" type="warning">{{
                userActiveInfo.user_data.user_role
              }}</van-tag>
              <van-tag v-if="userInfo.position" class="position-tag" plain type="success">{{userInfo.position}}</van-tag>
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
              projectActive: !$route.query.projectId && index === currentIndex,
              projectActive2:
                $route.query.projectId &&
                $route.query.projectId === item.project_id
            }"
            v-for="(item, index) in userActiveInfo.integral_balance_list"
            :key="index"
            @click="selectProject(index, item)"
          >
            <div class="num">{{ item.balance }}</div>
            <div class="txt">当前积分</div>
            <div class="projectname">{{ item.project_name }}</div>
          </div>
        </div>
        <div class="effectTime" :class="{effectTime2:userActiveInfo.integral_balance_list.length===1}">
          积分有效时间：{{ integralObj.activity_time }}
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
              <div class="itemBox" v-if="integralObj.count_data">
                <div
                  class="item"
                  @click="selectType(0)"
                  :class="{ typeActive: typeIndex === 0 }"
                >
                  <span>全部({{ integralObj.count_data.qb_count }})</span>
                  <i class="tf-icon tf-icon-gou gou" v-if="typeIndex === 0"></i>
                </div>
                <div
                  class="item"
                  @click="selectType(1)"
                  :class="{ typeActive: typeIndex === 1 }"
                >
                  <span>获得({{ integralObj.count_data.hq_count }})</span>
                  <i class="tf-icon tf-icon-gou gou" v-if="typeIndex === 1"></i>
                </div>
                <div
                  class="item"
                  @click="selectType(2)"
                  :class="{ typeActive: typeIndex === 2 }"
                >
                  <span>使用({{ integralObj.count_data.sy_count }})</span>
                  <i class="tf-icon tf-icon-gou gou" v-if="typeIndex === 2"></i>
                </div>
              </div>
            </template>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
    </div>
    <!-- 积分记录 -->
    <div
      class="recodContent"
      v-show="integralList.length > 0"
      ref="recodContent"
    >
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <div
          class="item"
          :class="{
            itemLast: index === integralList.length - 1
          }"
          v-for="(item, index) in integralList"
          :key="index"
        >
          <div
            class="cellBox"
            :class="{ borderNone: index === integralList.length - 1 }"
          >
            <div class="left">
              <div class="t1" v-if="item.type === '1'">获得</div>
              <div class="t1" v-else>使用</div>
              <div class="t2">{{ item.ctime }}</div>
            </div>
            <div class="right">
              <div class="t1 more0" v-if="item.type === '1'">
                +{{ item.points }}
              </div>
              <div class="t1 less0" v-else>-{{ item.points }}</div>
              <div class="t2">剩余{{ item.balance }}</div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <!-- 空状态 -->
    <div
      v-show="integralList.length === 0"
      class="recodContent2"
      ref="recodContent2"
    >
      <img class="nothing_bg" src="@/assets/img/nothing_bg.png" alt="" />
      <div class="txt">暂无记录</div>
    </div>
    <van-popup v-model="isShow" class="popup" @closed="closedMa">
      <div class="top">
        <div class="title">二维码</div>
        <i class="tf-icon tf-icon-guanbi guanbi" @click="closeMa"></i>
      </div>
      <div class="txt">请出示二维码给工作人员，以便发放或核销积分</div>
      <div class="ma">
        <img
          v-if="userActiveInfo.user_data"
          :src="userActiveInfo.user_data.qrCode"
          alt=""
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  integralActivity,
  integralActivityLog,
  surplusIntegralActivity,
  getUserActivity,
  enterBannerActivity
} from '@/api/activity.js'
export default {
  data () {
    return {
      iconBol: true,
      integralObj: '', // 账户信息数据
      integralList: [], // 积分记录列表
      isShow: false,
      userActiveInfo: {
        user_data: {}
      }, // 用户活动信息
      currentIndex: 0,
      typeTitle: '', // 类型标题
      typeIndex: 0, // 类型下标
      projectID: '', // 项目ID
      pageTitle: '', // 页面标题
      finished: false,
      loading: false,
      currentPage: 1, // 页码
      isLoad: false, // 是否加载下一次数据
      timeID: null,
      totalIntegral: '' // 总积分
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    // 判断是否有参与中的项目
    async getUserActivity () {
      const { is_flag: isFlag } = await getUserActivity({
        uid: this.userInfo.id
      })
      return isFlag
    },
    async enterBannerActivity () {
      const { success } = await enterBannerActivity({
        project_id: this.projectID,
        uid: this.userInfo.id
      })
      return success
    },
    // 选择类型
    selectType (index) {
      this.typeIndex = index
      if (index === 0) {
        this.typeTitle = '全部'
      } else if (index === 1) {
        this.typeTitle = '获得'
      } else {
        this.typeTitle = '使用'
      }
      this.$refs.recodContent.scrollTop = '0px'
      this.currentPage = 1
      this.loading = false
      this.finished = false
      this.integralList = []
      this.onLoad()
      this.$refs.dropdown2.toggle(false)
    },

    // 切换项目
    selectProject (index, item) {
      this.$route.query.projectId = null
      this.typeIndex = 0
      this.typeTitle = ''
      this.currentPage = 1
      this.loading = false
      this.finished = false
      this.integralList = []
      this.$refs.recodContent.scrollTop = '0px'
      this.currentIndex = index
      this.pageTitle = item.activity_name
      this.projectID = item.project_id
      this.onLoad()
    },
    // 获取账户信息 列表
    async onLoad () {
      if (this.isLoad) {
        return
      }
      this.isLoad = true
      const res = await integralActivityLog({
        project_id: this.projectID,
        type: this.typeIndex,
        page: this.currentPage
      })
      this.isLoad = false
      this.integralObj = res.data
      this.integralList = [...this.integralList, ...res.data.activity_log_list]
      this.loading = false
      this.currentPage++
      if (res.data.activity_log_list.length === 0) {
        this.finished = true
      }
      console.log('账户信息 列表', res)
    },
    // 获取用户活动信息
    async getUserActive () {
      const res = await integralActivity()
      this.userActiveInfo = res.data
      console.log('this.userActiveInfo', this.userActiveInfo)
      // 如果只有一个数据，就加载第一条记录
      if (res.data.integral_balance_list.length === 1) {
        this.projectID = res.data.integral_balance_list[0].project_id
        this.pageTitle = res.data.integral_balance_list[0].activity_name
      }
      if (this.$route.query.projectId) {
        const index = res.data.integral_balance_list.findIndex(item => {
          return item.project_id === this.projectID
        })
        this.pageTitle = res.data.integral_balance_list[index].activity_name
        this.onLoad()
      } else {
        this.projectID = res.data.integral_balance_list[0].project_id
        this.pageTitle = res.data.integral_balance_list[0].activity_name
        this.onLoad()
      }
    },
    // 打开二维码
    openMa () {
      this.isShow = true
      this.timeID = setInterval(async () => {
        const res2 = await surplusIntegralActivity()
        if (this.totalIntegral !== '') {
          if (res2.z_balance !== this.totalIntegral) {
            this.getUserActive()
            this.onLoad()
            this.isShow = false
            clearInterval(this.timeID)
          }
        }
        this.totalIntegral = res2.z_balance
        // console.log('surplusIntegralActivity', res2.z_balance)
      }, 2000)
    },
    // 关闭二维码
    closeMa () {
      this.isShow = false
    },
    // 二维码关闭
    closedMa () {
      clearInterval(this.timeID)
    },
    // 打开下拉菜单
    openItem () {
      this.iconBol = false
    },
    // 关闭下拉菜单
    coloseItem () {
      this.iconBol = true
    }
  },
  watch: {
    // 设置积分记录的高度
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
    if (this.$refs.recodContent2) {
      this.$refs.recodContent2.style.height =
        document.body.offsetHeight - this.$refs.content.offsetHeight + 'px'
    }
  },
  async created () {
    const projectId = this.$route.query.projectId
    if (projectId) {
      // 如果有项目id，则判断是否有加入该项目，没有加入则会自动加入
      this.projectID = projectId
      const success = await this.enterBannerActivity()
      if (!success) {
        this.$toast('活动未开始')
        return
      }
    } else {
      // 判断是否有参与的项目
      const isFlag = await this.getUserActivity()
      if (!isFlag) {
        this.$toast('活动未开始')
        this.$router.go(-1)
        return
      }
    }
    // 获取用户活动信息
    this.getUserActive()

    const res2 = await surplusIntegralActivity()
    this.totalIntegral = res2.z_balance
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
      padding:20px 30px;
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
            color: #ffa110 !important;
          }
          .position-tag {
            font-size: 20px;
            border-color: #55B862;
            color: #55B862 !important;
          }
        }
        .ma {
          width: 56px;
          height: 56px;
          margin-right: 30px;
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
        .projectActive2 {
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
        margin-top: 20px;
        text-align: center;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #8f8f94;
      }
       .effectTime2 {
        margin-top: 28px;
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
    /deep/ .van-dropdown-menu__bar {
      box-shadow: none;
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
      margin-left: 260px;
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
    padding-bottom: 120px;
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
    .itemLast {
      overflow: hidden;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
    }
    .borderNone {
      border-bottom: none;
    }
    .left {
      .t1 {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #000000;
      }
      .t2 {
        margin-top: 20px;
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
        margin-top: 20px;
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
        margin-left: 80px;
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

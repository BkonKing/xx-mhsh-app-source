<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar
      :title="infoData.type_name"
      :fixed="true"
      placeholder
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span
          class="van-icon van-icon-ellipsis"
          @click="isUp ? (selectShow = true) : (opShow = true)"
        ></span>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <div class="header-block">
        <div
          class="task-status bg-FEBF00"
          :class="{
            'bg-FE8900': infoData.task_status < 3,
            'bg-FF6555': infoData.task_status == 4,
            'bg-ccc': infoData.task_status > 4
          }"
        >
          {{ infoData.task_status_name }}
        </div>
        <img class="header-bg" src="@/assets/img/task_01.png" />
        <div class="task-tit">{{ infoData.task_title }}</div>
        <div class="task-coin tf-row-vertical-center">
          <img src="@/assets/img/task_02.png" />
          <div class="coin-num">{{ infoData.reward_happiness }}</div>
          <div class="coin-unit">幸福币/人</div>
        </div>
        <div class="task-label tf-row">
          <div
            v-for="(item, index) in infoData.task_tag"
            :key="index"
            class="lable-item"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="body-cont">
        <div class="task-session">
          <div class="session-tit">任务来源</div>
          <div class="release-user tf-row">
            <img v-if="infoData.rwf_avatar" :src="infoData.rwf_avatar" />
            <img v-else src="@/assets/imgs/touxiang.png" />
            <div class="tf-row-space-between">
              <div class="release-name van-ellipsis">
                {{ infoData.rwf_nickname }}
              </div>
              <div class="release-time">{{ infoData.task_ctime }}</div>
            </div>
          </div>
          <div
            v-if="!isUp && +receiverInfo.is_already"
            class="complain-tip tf-row-space-between"
          >
            <div>
              凡涉及到内容有违法信息传播。收费不合理，
              请您警惕并手机关联证据向我们举报。
            </div>
            <div @click="complaint">投诉</div>
          </div>
        </div>
        <div
          v-if="!isUp && receiverInfo && receiverInfo.is_already == 1"
          class="task-session"
        >
          <div class="session-tit tf-row-space-between">
            接单用户
            <div class="tit-right tf-row-vertical-center" @click="goSchedule">
              查看<img src="@/assets/img/task_09.png" />
            </div>
          </div>
          <div class="release-user tf-row">
            <img
              v-if="receiverInfo.jdf_avatar"
              :src="receiverInfo.jdf_avatar"
            />
            <img v-else src="@/assets/imgs/touxiang.png" />
            <div class="tf-row-space-between">
              <div class="release-name van-ellipsis">
                {{ receiverInfo.jdf_nickname }}
              </div>
              <div
                class="release-time"
                :class="{ 'color-FF5240': receiverInfo.progress_status != 2 }"
              >
                {{ receiverInfo.progress_status_name }}
              </div>
            </div>
            <div
              @click="deliverTask"
              v-if="receiverInfo.is_deliver == 1"
              class="finish-btn"
            >
              交付任务
            </div>
          </div>
          <div
            @click="goSchedule"
            v-if="receiverInfo.taskflow_list.length"
            class="progress-step"
          >
            <div
              v-for="(item, index) in receiverInfo.taskflow_list.slice(0, 2)"
              :key="index"
            >
              {{ item.ctime + " " + item.progress_title }}
            </div>
            <!-- <div>03-21 12:00 接单成功，任务进行中</div> -->
          </div>
        </div>
        <div class="task-session">
          <div class="session-tit">任务要求</div>
          <div class="ask-list">
            <div class="ask-item">
              需要人数：{{ infoData.need_people_text }}
            </div>
            <div class="ask-item">完成时间：{{ infoData.task_time }}</div>
            <div v-if="isUp" class="ask-item">
              可见范围：{{ infoData.range_type_name }}
            </div>
          </div>
        </div>
        <div v-if="infoData.address" class="task-session">
          <div class="session-tit">完成地点</div>
          <div @click="openMap" class="task-address">
            <div class="task-address-left">
              <div>
                {{ infoData.udpate_address || infoData.address }}
              </div>
              <div class="van-ellipsis">
                {{
                  infoData.address_province +
                    " " +
                    infoData.address_city +
                    " " +
                    infoData.address_area
                }}
              </div>
            </div>
            <div class="task-address-right">
              <img class="address-arrow" src="@/assets/img/task_04.png" />
            </div>
            <img class="address-bg" src="@/assets/img/task_03.png" />
          </div>
        </div>
        <div class="task-session">
          <div class="session-tit tf-row-space-between">
            任务说明<span class="tit-right" v-if="infoData.renew_day"
              >更新：{{ infoData.renew_day }}</span
            >
          </div>
          <div class="detai-cont">
            <div class="text-block">
              <div
                class="cont-text"
                :class="{ 'text-hidden': isOver && !isDown }"
                ref="textCont"
              >
                <div
                  @click="showToggle"
                  v-show="isOver"
                  class="more-down"
                  :class="{ 'down-up': isDown }"
                >
                  {{ isDown ? "收起" : "展开" }}
                </div>
                <div
                  class="task-desc-box"
                  v-html="infoData.task_desc.replace(/\r\n|\n/g, '<br/>')"
                ></div>
              </div>
            </div>
            <div
              v-if="infoData.task_image && infoData.task_image.length"
              class="cont-pic tf-row-wrap"
            >
              <img
                @click="previewPic(index)"
                v-for="(item, index) in infoData.task_image"
                :key="index"
                :src="item"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="!isUp" class="op-block">
        <div class="bottom-fiex tf-row">
          <div class="op-left tf-row">
            <div @click="quiz" class="tf-column">
              <img src="@/assets/img/task_05.png" />
              <div>提问</div>
            </div>
            <a
              v-if="infoData.mobile_open == 1 || receiverInfo.is_already == 1"
              :href="'tel: ' + infoData.mobile"
              class="tf-column"
            >
              <img src="@/assets/img/task_06.png" />
              <div>联系</div>
            </a>
            <div
              @click="share"
              v-if="receiverInfo.is_can_share == 1"
              class="tf-column"
            >
              <img src="@/assets/img/task_07.png" />
              <div>分享</div>
            </div>
            <div
              v-if="infoData.is_schedule == 1"
              @click="goSchedule"
              class="tf-column"
            >
              <img src="@/assets/img/task_08.png" />
              <div>进度</div>
            </div>
          </div>
          <div
            v-preventReClick
            v-if="receiverInfo.is_can == 1"
            class="op-right"
            @click="opCall()"
          >
            立即接单
          </div>
        </div>
      </div>
      <template v-else>
        <div
          v-if="
            infoData.task_status != 0 &&
              infoData.task_status != 4 &&
              infoData.task_status != 6
          "
          class="op-block"
        >
          <div class="bottom-fiex tf-row">
            <div class="op-left tf-row">
              <template
                v-if="
                  (infoData.task_status > 0 && infoData.task_status < 4) ||
                    infoData.task_status == 5
                "
              >
                <div @click="quiz" class="tf-column">
                  <span
                    v-if="infoData.question_num > 0"
                    class="num tf-flex-center"
                    ><i>{{ infoData.question_num }}</i></span
                  >
                  <img src="@/assets/img/task_05.png" />
                  <div>提问</div>
                </div>
                <a :href="'tel: ' + infoData.mobile" class="tf-column">
                  <img src="@/assets/img/task_06.png" />
                  <div>联系</div>
                </a>
              </template>
              <div
                @click="share"
                v-if="infoData.task_status == 1"
                class="tf-column"
              >
                <img src="@/assets/img/task_07.png" />
                <div>分享</div>
              </div>
              <div
                v-if="infoData.is_schedule == 1"
                @click="goSchedule"
                class="tf-column"
              >
                <img src="@/assets/img/task_08.png" />
                <div>进度</div>
              </div>
            </div>
            <div
              v-if="receiverInfo.is_can == 1"
              class="op-right"
              @click="opCall()"
            >
              编辑
            </div>
          </div>
        </div>
      </template>
      <template v-if="infoData.task_image && infoData.task_image.length">
        <van-image-preview
          v-model="picShow"
          :images="infoData.task_image"
          :startPosition="picIndex"
        >
        </van-image-preview>
      </template>
      <task-op
        ref="taskop"
        v-model="selectShow"
        :taskId="taskId"
        :shareObj="shareObj"
        @updateTask="updateTask"
      ></task-op>
      <confirm-model
        v-model="confirmShow"
        :modelTit="confirm.modelTit"
        :modelSubTit="confirm.modelSubTit"
        :cancelTxt="confirm.cancelTxt"
        :yesTxt="confirm.yesTxt"
        :cancel="confirm.cancel"
        @sure="receiveOrder"
      ></confirm-model>
      <receiver-op
        v-model="opShow"
        :canShare="canShare"
        :item="shieldInfo"
        :shareObj="shareObj"
        @selectCall="complaint"
      ></receiver-op>
    </div>
  </div>
</template>

<script>
import { NavBar, ImagePreview, Toast } from 'vant'
import receiverOp from './receiver-op'
import { getTaskInfo, receivingMask } from '@/api/task'
import taskOp from '../components/task-op'
import confirmModel from '../components/confirm-model'
import { bMapGetLocationInfo } from '@/utils/util'
export default {
  components: {
    [NavBar.name]: NavBar,
    [ImagePreview.name]: ImagePreview,
    [Toast.name]: Toast,
    receiverOp,
    taskOp,
    confirmModel
  },
  data () {
    return {
      taskId: '',
      isOver: false, // 内容是否超出行数
      isDown: false,
      infoData: {
        task_desc: ''
      },
      receiverInfo: '',
      isUp: false, // 是否是发布者
      selectShow: false, // 操作选择弹窗
      confirmShow: false,
      confirm: {
        modelTit: '是否确定接单？',
        modelSubTit: '',
        cancelTxt: '取消',
        yesTxt: '接单',
        cancel: true
      },
      isBack: false,
      opShow: false,
      canShare: false,
      shareObj: {},
      shieldInfo: {}, // 屏蔽信息
      picIndex: 0, // 图片预览起始位置索引
      picShow: false, // 查看大图
      province: '', // 省
      city: '', // 市
      area: '', // 县
      toast: null
    }
  },
  created () {
    this.taskId = this.$route.query.taskId
    this.getLocationInfo()
  },
  methods: {
    getData () {
      this.toast = Toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: true
      })
      getTaskInfo({
        linli_task_id: this.taskId,
        province: this.province,
        city: this.city,
        area: this.area
      }).then(res => {
        this.shieldInfo = {
          uid: res.data.uid,
          nickname: res.data.rwf_nickname,
          content: res.data.task_title,
          task_id: res.data.task_id
        }
        this.infoData = res.data
        this.getShareInfo()
        this.isUp = res.data.is_task_party
        if (!this.isUp) {
          this.receiverInfo = res.data.user_task_data
          this.canShare = this.receiverInfo.is_can_share == 1
        }
        if (res.popup_data.is_popup == 1) {
          this.isBack = true
          this.confirmShow = true
          this.confirm.modelTit = res.popup_data.popup_text
          this.confirm.modelSubTit = res.popup_data.popup_text2
          this.confirm.yesTxt = '我知道了'
          this.confirm.cancel = false
        }
        this.$nextTick(() => {
          this.getTextOver()
        })
        this.toast.clear()
      })
    },
    getTextOver () {
      const textCont = this.$refs.textCont
      const textHeight =
        (textCont.clientHeight * 750) / document.documentElement.clientWidth
      if (textHeight > 48 * 6) {
        this.isOver = true
      }
    },
    showToggle () {
      this.isDown = !this.isDown
    },
    getShareInfo () {
      this.shareObj = {
        title: this.infoData.task_title,
        description: this.infoData.task_desc,
        pyqTitle: this.infoData.task_title
      }
    },
    // 获取当前地址信息
    getLocationInfo () {
      // adCode:行政区编码
      return bMapGetLocationInfo()
        .then(data => {
          const { province, city, district } = data
          this.province = province
          this.city = city
          this.area = district
          this.getData()
        })
        .catch(() => {
          this.getData()
        })
    },
    // 操作选择回调
    updateTask (opType) {
      if (opType === 'delete') {
        this.$router.go(-1)
      } else {
        this.getData()
      }
    },
    // 预览大图
    previewPic (index) {
      this.picIndex = index
      this.picShow = true
    },
    // 底部按钮
    opCall () {
      if (this.isUp) {
        this.editTask()
      } else {
        this.confirmShow = true
      }
    },
    // 立即接单
    receiveOrder () {
      if (this.isBack) return
      bMapGetLocationInfo(1)
        .then(res => {
          const obj = {
            province: res.province,
            city: res.city,
            area: res.district
          }
          this.receivingMask(obj)
        })
        .catch(res => {
          this.receivingMask({})
        })
    },
    receivingMask (obj) {
      const params = Object.assign(obj, { linli_task_id: this.taskId })
      receivingMask(params).then(res => {
        this.getData()
      })
    },
    // 分享
    share () {
      this.$refs.taskop.share()
    },
    // 编辑
    editTask () {
      this.$router.push({
        name: 'releaseEdit',
        query: {
          taskId: this.infoData.task_id
        }
      })
    },
    // 提问
    quiz () {
      this.$router.push({
        name: 'operateQuiz',
        query: {
          isUp: this.isUp,
          taskId: this.taskId
        }
      })
    },
    // 任务进度
    goSchedule () {
      const routerName = this.isUp ? 'scheduleInitiator' : 'scheduleReceiver'
      this.$router.push({
        name: routerName,
        query: {
          taskId: this.infoData.task_id
        }
      })
    },
    // 交付任务
    deliverTask () {
      this.$router.push({
        name: 'operateDeliver',
        query: {
          taskId: this.taskId,
          userTaskId: this.receiverInfo.user_task_id
        }
      })
    },
    // 打开地图
    openMap () {
      this.$router.push({
        name: 'taskMap',
        query: {
          name: this.infoData.address,
          address:
            this.infoData.address_province +
            this.infoData.address_city +
            this.infoData.address_area +
            this.infoData.address,
          lon: this.infoData.longitude,
          lat: this.infoData.latitude
        }
      })
    },
    // 投诉
    complaint () {
      this.$router.push({
        name: 'operateComplaint',
        query: {
          taskId: this.taskId,
          complaintUid: this.infoData.uid
        }
      })
    }
  },
  watch: {
    confirmShow (val) {
      if (!val) {
        if (this.isBack) {
          this.$router.go(-1)
        }
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this.toast && this.toast.clear()
    next()
  }
}
</script>

<style lang="less" scoped>
@import url(../../../styles/task.less);
.tf-body-container {
  font-size: 28px;
  color: #333;
  background-color: #f7f7f7;
}
/deep/.van-nav-bar {
  background-color: #ffd34d;
  .van-nav-bar__right .van-icon {
    font-size: 44px;
  }
}
.header-block {
  background-color: #f7f7f7;
  padding: 38px 0 20px 50px;
  background: linear-gradient(0deg, #febf00 0%, #ffd34d 100%);
  position: relative;
  margin-bottom: 30px;
  .task-tit {
    font-size: 44px;
    font-weight: bold;
    color: #2a334a;
    line-height: 60px;
    width: 486px;
    margin-bottom: 10px;
  }
  .task-coin {
    height: 56px;
    line-height: 56px;
    color: #2a334a;
    margin-bottom: 30px;
    img {
      width: 36px;
      height: 36px;
      margin-right: 10px;
    }
    .coin-num {
      font-size: 40px;
      font-weight: bold;
      margin-right: 10px;
    }
    .coin-unit {
      font-size: 24px;
    }
  }
  .task-label {
    position: relative;
    z-index: 5;
    flex-wrap: wrap;
    .lable-item {
      background-color: #fcd86e;
      height: 48px;
      line-height: 48px;
      border-radius: 10px;
      padding: 0 18px;
      font-size: 24px;
      color: #a46400;
      margin: 0 10px 20px 0;
    }
  }
  .header-bg {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 250px;
    height: 241px;
  }
  .task-status {
    position: absolute;
    right: 0;
    top: 38px;
    width: 140px;
    height: 64px;
    line-height: 64px;
    text-align: center;
    border-radius: 32px 0px 0px 32px;
    font-size: 26px;
    font-weight: bold;
    color: #ffffff;
    z-index: 3;
    &.bg-ccc {
      background: #cccccc;
    }
    &.bg-FF6555 {
      background: #ff6555;
    }
    &.bg-FEBF00 {
      background: #febf00;
    }
    &.bg-FE8900 {
      background: #fe8900;
    }
  }
}
.task-session {
  width: 710px;
  margin: 0 auto 30px;
  background-color: #fff;
  overflow: hidden;
  padding: 0 30px;
  border-radius: 10px;
  .session-tit {
    font-size: 32px;
    font-weight: bold;
    color: #000000;
    height: 100px;
    padding-top: 10px;
    line-height: 90px;
    .tit-right {
      font-size: 24px;
      color: #8f8f94;
      line-height: 90px;
      img {
        width: 36px;
        height: 36px;
        margin-left: 8px;
      }
    }
  }
}
.release-user {
  height: 80px;
  margin: 10px 0 40px;
  align-items: stretch;
  img {
    width: 80px;
    height: 100%;
    border-radius: 50%;
    margin-right: 30px;
  }
  & > div.tf-row-space-between {
    max-width: 398px;
    flex-grow: 1;
    flex-direction: column;
  }
  .release-name {
    font-weight: bold;
    color: #000000;
    line-height: 36px;
  }
  .release-time {
    font-size: 24px;
    color: #8f8f94;
    line-height: 30px;
    &.color-FF5240 {
      color: #ff5240;
    }
  }
  .finish-btn {
    width: 143px;
    text-align: center;
    height: 64px;
    line-height: 64px;
    background: #ff6555;
    border-radius: 10px;
    font-size: 24px;
    color: #ffffff;
    justify-content: flex-start;
    flex-shrink: 0;
  }
}
.ask-list {
  margin-bottom: 30px;
  div {
    line-height: 44px;
    font-size: 26px;
    color: #000000;
  }
}
.task-address {
  display: flex;
  justify-content: space-between;
  min-height: 128px;
  background: linear-gradient(90deg, #f7f7f7 0%, #ffffff 100%);
  border-radius: 10px;
  margin-bottom: 40px;
  position: relative;
  padding: 20px 30px;
  .task-address-left {
    div {
      position: relative;
      z-index: 5;
      line-height: 44px;
      max-width: 530px;
    }
    div:nth-child(1) {
      font-size: 26px;
      color: #000000;
    }
    div:nth-child(2) {
      font-size: 24px;
      color: #8f8f94;
    }
  }
  .task-address-right {
    display: flex;
    align-items: center;
    position: relative;
    .address-arrow {
      width: 48px;
      height: 48px;
      z-index: 1;
    }
  }
  .address-bg {
    position: absolute;
    right: 0;
    top: 0;
    width: 314px;
    height: 100%;
  }
}
.detai-cont {
  .text-block {
    display: flex;
  }
  .cont-text {
    color: #8f8f94;
    line-height: 48px;
    font-size: 30px;
    position: relative;
    margin-bottom: 30px;
    &.text-hidden {
      height: 288px;
      overflow: hidden;
      // .text-multiple-ellipsis(6);
    }
    &::before {
      content: "";
      float: right;
      height: calc(100% - 48px); /*先随便设置一个高度*/
    }
  }
  .cont-pic {
    img {
      width: 150px;
      height: 150px;
      margin: 0 16px 16px 0;
      object-fit: cover;
    }
    img:nth-child(4n) {
      margin-right: 0;
    }
    margin-bottom: 24px;
  }
}
.complain-tip {
  min-height: 112px;
  align-items: center;
  background: #f7f7f7;
  margin: -10px 0 40px;
  padding: 20px 16px 20px 28px;
  font-size: 24px;
  div:nth-child(1) {
    width: 480px;
    color: #8f8f94;
  }
  div:nth-child(2) {
    width: 100px;
    height: 48px;
    text-align: center;
    line-height: 44px;
    border: 1px solid #ff6555;
    border-radius: 10px;
    color: #ff6555;
  }
}
.progress-step {
  background: #fff6f5;
  border-radius: 10px;
  padding: 28px 20px 28px 0;
  font-size: 24px;
  color: #8f8f94;
  margin-bottom: 40px;
  div {
    width: 100%;
    line-height: 48px;
    position: relative;
    padding-left: 60px;
    @text-ellipsis();
    &::before {
      content: "";
      position: absolute;
      left: 30px;
      top: 19px;
      width: 10px;
      height: 10px;
      background: #8f8f94;
      border-radius: 50%;
    }
    &:first-child {
      color: #000000;
      &::before {
        background: #000000;
      }
    }
  }
}
.task-desc-box {
  width: 650px;
  line-height: 48px;
}
</style>

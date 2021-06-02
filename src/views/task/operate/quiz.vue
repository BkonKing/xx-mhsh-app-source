<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #title>
        <div class="title">任务提问</div>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <div v-if="!listData.length" class="empty-session">
        <img src="@/assets/img/empty_quiz.png" />
        <div>暂无内容</div>
      </div>
      <div
        v-else
        class="quiz-list"
        :class="{ 'quiz-list-pd': replyType === 'quiz' }"
      >
        <div v-for="(item, index) in listData" :key="index" class="quiz-item">
          <div @click="operate(item.id)" class="operate-ellipsis">
            <more-btn
              v-if="userInfo.id !== item.uid"
              :item="item"
              type="7"
              contentKey="content"
              :types="typeList"
            ></more-btn>
            <!-- <img class="img-100" src="@/assets/neighbours/more.png" /> -->
          </div>
          <div class="item-header">
            <img v-if="item.avatar" :src="item.avatar" />
            <img v-else src="@/assets/imgs/touxiang.png" />
            <div class="name-time tf-column">
              <div class="user-name van-ellipsis">{{ item.nickname }}</div>
              <div class="itme-time">{{ item.ctime }}</div>
            </div>
          </div>
          <div class="item-cont">{{ item.content }}</div>
          <div
            v-if="item.is_reply == 1 && item.reply_text"
            class="reply-cont"
            @click="openReplyMore(item)"
          >
            <div
              class="cont-text"
              :class="{ 'text-hidden': item.isOver && !item.isDown }"
              :ref="`text_${index}`"
            >
              <div
                @click.stop="showToggle(index)"
                v-show="item.isOver"
                class="more-down"
                :class="{ 'down-up': item.isDown }"
              >
                {{ item.isDown ? "收起" : "展开" }}
              </div>
              <span class="cont-span">任务方：</span>{{ item.reply_text }}
            </div>
            <div
              v-if="item.postMoreShow"
              v-click-out-side="
                () => {
                  item.postMoreShow = false;
                }
              "
              class="more-popup"
            >
              <div class="more__arrow"></div>
              <span class="more-btn" @click="shieldShow = true">屏蔽</span>
              <span class="more-btn" @click="complainShow = true">投诉</span>
            </div>
          </div>
          <div
            v-if="item.is_reply == 0 && isUp == 1"
            @click="replyQuiz(index)"
            class="reply-btn tf-row-center"
          >
            回复TA
          </div>
        </div>
      </div>
    </div>
    <comment
      ref="comment"
      v-model="commentShow"
      :parentId="parentId"
      :replyType="replyType"
      @quizCall="quizCall"
    ></comment>
    <!-- 投诉 -->
    <complain-popup
      v-model="complainShow"
      :complainInfo="activeReply"
      :complainType="7"
      :types="typeList"
      labelKey="complaint_type"
      valueKey="id"
    ></complain-popup>
    <!-- 屏蔽 -->
    <shield-popup
      v-model="shieldShow"
      :shieldInfo="activeReply"
      :shieldType="7"
    ></shield-popup>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import { mapGetters } from 'vuex'
import comment from '../components/comment'
import moreBtn from '../../neighbours/components/moreBtn'
import ComplainPopup from '../../neighbours/components/complainPopup'
import ShieldPopup from '../../neighbours/components/shieldPopup'
import { getQuizList, getTaskComplaint } from '@/api/task'
import ClickOutSide from '@/directive/ClickOutSide'
export default {
  components: {
    [NavBar.name]: NavBar,
    comment,
    moreBtn,
    ComplainPopup,
    ShieldPopup
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  directives: {
    ClickOutSide
  },
  data () {
    return {
      taskId: '',
      isUp: 0,
      listData: [],
      parentId: '', // 提交的id
      replyType: '', // 提问、回复
      commentShow: false,
      text: '',
      isOver: false,
      complainShow: false,
      shieldShow: false,
      rwfNickname: '',
      rwfUid: '',
      activeReply: {},
      typeList: []
    }
  },
  created () {
    this.isUp = this.$route.query.isUp
    this.taskId = this.$route.query.taskId
    this.getData()
    this.getTaskComplaint()
  },
  mounted () {},
  methods: {
    getData () {
      getQuizList({ linli_task_id: this.taskId }).then(res => {
        this.isUp = res.is_task
        this.rwfNickname = res.rwf_nickname
        this.rwfUid = res.rwf_uid
        if (this.isUp == 0) {
          this.parentId = this.taskId
          this.replyType = 'quiz'
        } else {
          this.replyType = 'reply'
        }
        this.listData = res.data
        if (this.listData.length) {
          this.$nextTick(() => {
            this.listData.forEach((item, index) => {
              if (item.is_reply == 1) {
                const ref = 'text_' + index
                this.$set(item, 'postMoreShow', false)
                this.$set(item, 'isOver', this.getTextOver(ref))
                this.$set(item, 'isDown', false)
              }
            })
          })
          console.log(this.listData)
        }
      })
    },
    // 获取提问投诉类型
    getTaskComplaint () {
      getTaskComplaint({
        type: 2,
        task_id: this.taskId
      }).then(({ data }) => {
        const { type_list } = data
        this.typeList = type_list
      })
    },
    showToggle (index) {
      this.listData[index].isDown = !this.listData[index].isDown
    },
    // 判断文字是否超过3行
    getTextOver (ref) {
      const textCont = this.$refs[ref][0]
      const textHeight =
        (textCont.clientHeight * 750) / document.documentElement.clientWidth
      if (textHeight > 44 * 3) {
        return true
      } else {
        return false
      }
    },
    // 回复ta
    replyQuiz (index) {
      this.parentId = this.listData[index].id
      this.commentShow = true
    },
    // 回复、问题提交回调
    quizCall () {
      this.getData()
    },
    // 屏蔽投诉
    operate (id) {},
    // 设置屏蔽投诉内容
    openReplyMore (item) {
      if (!this.isUp) {
        this.activeReply = {
          task_id: item.task_id,
          id: item.reply_id,
          nickname: this.rwfNickname,
          content: item.reply_text,
          uid: this.rwfUid
        }
        item.postMoreShow = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tf-body-container {
  padding: 20px;
  font-size: 28px;
  color: #333;
  background-color: #f7f7f7;
}
.empty-session {
  padding-top: 382px;
  align-items: center;
  img {
    width: 209px;
    height: 240px;
  }
  div {
    font-size: 26px;
    color: #8f8f94;
    line-height: 36px;
    margin-top: 44px;
  }
}
.quiz-item {
  width: 710px;
  background: #ffffff;
  border-radius: 10px;
  padding: 30px;
  position: relative;
  .item-header {
    @flex();
    height: 80px;
    margin-bottom: 30px;
    img {
      width: 80px;
      height: 100%;
      border-radius: 50%;
      margin-right: 20px;
    }
    .name-time {
      max-width: 480px;
      justify-content: center;
    }
    .user-name {
      font-weight: 500;
      color: #000000;
      line-height: 36px;
      margin-bottom: 4px;
    }
    .itme-time {
      font-size: 22px;
      color: #aaaaaa;
      line-height: 36px;
    }
  }
  .operate-ellipsis {
    position: absolute;
    right: 30px;
    top: 54px;
    width: 36px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    color: #8f8f94;
  }
  .item-cont {
    font-size: 28px;
    color: #333333;
    line-height: 44px;
    // margin-bottom: 22px;
    & + div {
      margin-top: 22px;
    }
  }
  .reply-btn {
    width: 650px;
    height: 88px;
    background: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 44px;
    align-items: center;
  }
  .reply-cont {
    padding: 22px 30px;
    background: #f7f7f7;
    border-radius: 10px;
    color: #8f8f94;
    display: flex;
    position: relative;
    .cont-text {
      line-height: 44px;
      overflow: hidden;
      &.text-hidden {
        height: 132px;
      }
      &::before {
        content: "";
        float: right;
        height: calc(100% - 42px);
      }
    }
    .cont-span {
      color: #e98400;
    }
    .more-down {
      font-size: 24px;
      line-height: 44px;
      background-color: #f7f7f7;
      margin-right: 0;
    }
  }
}
.quiz-item + .quiz-item {
  margin-top: 30px;
}
.quiz-list-pd {
  padding-bottom: 104px;
}
.more-popup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -166px;
  right: 0;
  z-index: 2;
  width: 235px;
  height: 140px;
  padding: 0 30px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px #3232331f;
  .more__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    border-width: 14px;
    color: #fff;
    bottom: -13px;
    right: 10px;
    border-top-color: currentColor;
    border-bottom-width: 0;
  }
  .more-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    font-size: 28px;
    color: #222;
    line-height: 1;
  }
  .more-btn + .more-btn {
    border-top: 1px solid #ebedf0;
  }
}
</style>

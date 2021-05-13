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
      <div v-else class="quiz-list">
        <div v-for="(item, index) in listData" :key="index" class="quiz-item">
          <div @click="operate(item.id)" class="operate-ellipsis">
            <more-btn :item="item"></more-btn>
            <!-- <img class="img-100" src="@/assets/neighbours/more.png" /> -->
          </div>
          <div class="item-header">
            <img :src="item.avatar" />
            <div class="name-time tf-column">
              <div class="user-name van-ellipsis">{{ item.nickname }}</div>
              <div class="itme-time">{{ item.ctime }}</div>
            </div>
          </div>
          <div class="item-cont">{{ item.content }}</div>
          <div v-if="item.is_reply == 1 && item.reply_text" class="reply-cont">
            <div :class="{'test-hidden': item.isOver&&!item.isDown}" :ref="'text_'+index">
              <span>任务方：</span>{{ item.reply_text }}
            </div>
            <div @click="showToggle(index)" v-show="item.isOver" class="more-down" :class="{'down-up' : item.isDown}">{{ item.isDown ? '收起' : '展开' }}</div>
          </div>
          <div v-if="item.is_reply == 0 && isUp == 1" @click="replyQuiz(index)" class="reply-btn tf-row-center">回复TA</div>
        </div>
      </div>
    </div>
    <comment
      ref="comment"
      v-model="commentShow"
      :parentId="parentId"
      :replyType="replyType"
      :shieldType="6"
      @quizCall="quizCall"
    ></comment>
  </div>
</template>

<script>
import {
  NavBar
} from 'vant'
import comment from '../components/comment'
import moreBtn from '../../neighbours/components/moreBtn'
import { getQuizList } from '@/api/task'
export default {
  components: {
    [NavBar.name]: NavBar,
    comment,
    moreBtn
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
      isOver: false
    }
  },
  created () {
    this.isUp = this.$route.query.isUp
    this.taskId = this.$route.query.taskId
    this.getData()
  },
  mounted () {
  },
  methods: {
    getData () {
      getQuizList({ linli_task_id: this.taskId }).then((res) => {
        this.isUp = res.is_task
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
              const ref = 'text_' + index
              this.$set(item, 'isOver', this.getTextOver(ref))
              this.$set(item, 'isDown', false)
            })
          })
          console.log(this.listData)
        }
      })
    },
    showToggle (index) {
      this.listData[index].isDown = !this.listData[index].isDown
    },
    // 判断文字是否超过3行
    getTextOver (ref) {
      const textCont = this.$refs[ref][0]
      // console.log(this.$refs, ref, textCont)
      const textHeight = textCont.clientHeight * 750 / document.documentElement.clientWidth
      console.log(textCont, textCont.clientHeight)
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
    operate (id) {}
  }
}
</script>

<style lang="less" scoped>

.tf-body-container{
  padding: 20px;
  font-size: 28px;
  color: #333;
  background-color: #F7F7F7;
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
    color: #8F8F94;
    line-height: 36px;
    margin-top: 44px;
  }
}
.quiz-item {
  width: 710px;
  background: #FFFFFF;
  border-radius: 10px;
  margin: 0 auto 30px;
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
      color: #AAAAAA;
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
    color: #8F8F94;
    // .operate-btn {
    //   position: absolute;
    //   top: 50%;
    //   left: -255px;
    //   margin-top: -36px;
    //   width: 225px;
    //   height: 72px;
    //   line-height: 72px;
    //   background-color: #333333;
    //   border-radius: 10px;
    //   @flex();
    //   align-items: center;
    //   color: #FFFFFF;
    //   &::after {
    //     content: '';
    //     position: absolute;
    //     top: 50%;
    //     right: -10px;
    //     margin-top: -5px;
    //     width: 0;
    //     height: 0;
    //     border-style: solid;
    //     border-width: 5px 0 5px 10px;
    //     border-color: transparent transparent transparent #333333;
    //   }
    //   & > div {
    //     flex-grow: 1;
    //     text-align: center;
    //   }
    //   .line {
    //     width: 2pX;
    //     flex-grow: 0;
    //     height: 30px;
    //     background: #8F8F94;
    //   }
    // }
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
    background: #FFFFFF;
    border: 1PX solid #CCCCCC;
    border-radius: 44px;
    align-items: center;
  }
  .reply-cont {
    padding: 22px 30px;
    background: #F7F7F7;
    border-radius: 10px;
    color: #8F8F94;

    position: relative;
    & > div {
      line-height: 44px;
      overflow: hidden;
    }
    & > div.test-hidden {
      height: 132px;
    }
    span {
      color: #E98400;
    }
    .more-down {
      right: 30px;
      bottom: 20px;
      font-size: 24px;
      line-height: 44px;
      background-color: #F7F7F7;
    }
  }
}
</style>

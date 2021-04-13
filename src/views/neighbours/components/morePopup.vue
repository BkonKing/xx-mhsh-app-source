<template>
  <div>
    <van-popup
      safe-area-inset-bottom
      get-container="body"
      class="more-dialog"
      v-model="valueChild"
    >
      <div v-if="comment" class="more-btn" @click="clickComment">回复</div>
      <div v-if="share" class="more-btn" @click="clickShare">分享</div>
      <div v-if="shield" class="more-btn" @click="clickShield">屏蔽</div>
      <div v-if="complain" class="more-btn" @click="clickComplain">投诉</div>
      <div v-preventReClick v-if="deleteProp" class="more-btn tf-text-primary" @click="onDelete">
        删除
      </div>
    </van-popup>
    <!-- 投诉 -->
    <van-popup
      class="complain-dialog"
      safe-area-inset-bottom
      get-container="body"
      v-model="complainShow"
      position="bottom"
      @closed="com_type = ''"
      style="-webkit-overflow-scrolling: auto;overflow: initial;"
    >
      <i
        class="tf-icon tf-icon-guanbi van-popup__close-icon van-popup__close-icon--top-right"
        @click="complainShow = false"
      ></i>
      <div class="complain-title">投诉</div>
      <div class="complain-content">
        <div class="van-multi-ellipsis--l2">
          投诉
          <span class="tf-text-blue">@{{ complainInfo.nickname }}</span>
          ：{{ complainInfo.content && complainInfo.content.replace(/<.*?>/ig,"") }}
        </div>
      </div>
      <tf-radio-btn
        class="complain-radio"
        v-model="com_type"
        :data="types"
        :radius="2"
      ></tf-radio-btn>
      <div
        v-preventReClick
        class="task-btn"
        :class="{ 'unable-btn': !com_type }"
        @click="submitComplain"
      >
        投诉
      </div>
    </van-popup>
    <!-- 屏蔽选择 -->
    <van-popup
      v-model="shieldShow"
      safe-area-inset-bottom
      get-container="body"
      class="more-dialog"
    >
      <div
        class="more-btn van-ellipsis"
        @click="shieldShow = false;userShieldDialog = true"
      >
        屏蔽 @{{ complainInfo.nickname }}
      </div>
      <div
        class="more-btn"
        @click="shieldShow = false;contentShieldDialog = true"
      >
        屏蔽 此条内容
      </div>
    </van-popup>
    <!-- 屏蔽人选项 -->
    <van-popup
      safe-area-inset-bottom
      get-container="body"
      class="shield-confirm"
      v-model="userShieldDialog"
    >
      <div class="shield-confirm-title">@{{ complainInfo.nickname }}</div>
      <div class="shield-confirm-content">
        <div class="tf-text">不看他的动态</div>
        <div class="tf-text tf-text-grey">信息流里不在显示他的动态</div>
        <div class="tf-text">禁止他与我互动</div>
        <div class="tf-text tf-text-grey">他无法对我评论、点赞</div>
      </div>
      <div class="shield-confirm-footer">
        <van-button
          class="shield-confirm-footer__btn"
          size="small"
          @click="shieldShow = false;userShieldDialog = false"
          >暂不屏蔽</van-button
        >
        <van-button
          v-preventReClick
          class="shield-confirm-footer__btn"
          size="small"
          type="danger"
          @click="shieldUser"
          >确定</van-button
        >
      </div>
    </van-popup>
    <!-- 屏蔽内容确认 -->
    <van-popup
      safe-area-inset-bottom
      get-container="body"
      class="shield-confirm"
      v-model="contentShieldDialog"
    >
      <div class="tf-text van-multi-ellipsis--l2">
        <span class="tf-text-blue">@{{ complainInfo.nickname }}</span>
        ：{{ complainInfo.content && complainInfo.content.replace(/<.*?>/ig,"") }}
      </div>
      <div class="shield-confirm-footer">
        <van-button
          class="shield-confirm-footer__btn"
          size="small"
          @click="shieldShow = false;contentShieldDialog = false"
          >取消</van-button
        >
        <van-button
          v-preventReClick
          class="shield-confirm-footer__btn"
          size="small"
          type="danger"
          @click="shieldContent"
          >确定</van-button
        >
      </div>
    </van-popup>
    <!-- <van-share-sheet
      v-model="showShare"
      :options="options"
      @select="onSelect"
    /> -->
    <tf-share
      :share-show="showShare"
      :share-obj="shareObj"
      @closeSwal="onSelect"></tf-share >
  </div>
</template>

<script>
import { Popup, Toast, Dialog, Button } from 'vant'
import tfRadioBtn from '@/components/tf-radio-btn/index.vue'
import { addComplaint, addShielding } from '@/api/neighbours'
import tfShare from '@/components/tf-share'
export default {
  components: {
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    tfRadioBtn,
    tfShare
  },
  props: {
    value: {
      type: [Boolean],
      default: false
    },
    // 是否开启分享
    share: {
      type: [Boolean, Number],
      default: false
    },
    // 是否开启删除
    deleteProp: {
      type: [Boolean, Number],
      default: false
    },
    // 是否开启投诉
    complain: {
      type: [Boolean, Number],
      default: true
    },
    // 如果是投诉，类型 1贴子、2评论、3回复
    complainType: {
      type: Number,
      default: 0
    },
    // 当前需要投诉的信息
    complainInfo: {
      type: Object,
      default: () => ({})
    },
    // 是否开启评论
    comment: {
      type: [Boolean, Number],
      default: false
    },
    // 是否开启屏蔽
    shield: {
      type: [Boolean, Number],
      default: false
    },
    shareObj: {
      type: Object,
      default: () => ({
        title: '',
        description: '',
        pyqTitle: '',
        thumb: '',
        contentUrl: ''
      })
    }
  },
  data () {
    return {
      valueChild: this.value,
      complainShow: false,
      showShare: false,
      // 投诉类型
      types: [
        {
          value: '1',
          name: '垃圾营销'
        },
        {
          value: '2',
          name: '涉黄信息'
        },
        {
          value: '3',
          name: '不实信息'
        },
        {
          value: '4',
          name: '有害信息'
        },
        {
          value: '5',
          name: '人身攻击'
        },
        {
          value: '6',
          name: '违法信息'
        },
        {
          value: '7',
          name: '诈骗信息'
        },
        {
          value: '8',
          name: '泄露隐私'
        }
      ],
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '朋友圈', icon: 'weibo' }
      ],
      com_type: '',
      shieldShow: false,
      userShieldDialog: false,
      contentShieldDialog: false
    }
  },
  methods: {
    clickShare () {
      this.valueChild = false
      this.showShare = true
    },
    onSelect (data) {
      this.showShare = data == 1
    },
    clickComment () {
      this.valueChild = false
      this.$emit('comment')
    },
    /* 删除 */
    onDelete () {
      this.$emit('delete')
    },
    /* 打开投诉 */
    clickComplain () {
      this.valueChild = false
      this.complainShow = true
    },
    /* 提交投诉 */
    submitComplain () {
      if (this.com_type) {
        const complainType = {
          1: '4',
          2: '5',
          3: '1'
        }
        addComplaint({
          com_type: this.com_type,
          info_type: this.complainType == '1' ? complainType[this.complainInfo.article_type] : this.complainType,
          info_id: this.complainInfo.id
        }).then((resr) => {
          Toast.success('投诉成功')
          this.complainShow = false
          this.valueChild = false
          this.mtjEvent({
            eventId: 43
          })
        })
      } else {
        Toast('请选择类型')
      }
    },
    /* 打开屏蔽 */
    clickShield () {
      this.valueChild = false
      this.shieldShow = true
    },
    /* 屏蔽用户 */
    shieldUser () {
      this.addShielding({
        shielding_type: 2,
        shielding_uid: this.complainInfo.uid
      })
    },
    /* 屏蔽内容 */
    shieldContent () {
      const sub_type = {
        1: '4',
        2: '5',
        3: '1'
      }
      this.addShielding({
        shielding_type: 1,
        sub_type: this.complainType > 2 ? 2 : this.complainType == 1 ? sub_type[this.complainInfo.article_type] : this.complainType,
        shielding_infoid: this.complainInfo.id
      })
    },
    /* 提交屏蔽设置 */
    addShielding (params) {
      addShielding(params).then(() => {
        this.valueChild = false
        this.shieldShow = false
        this.userShieldDialog = false
        this.contentShieldDialog = false
        Toast.success('屏蔽成功')
        this.$emit('shielding')
      })
    }
  },
  watch: {
    valueChild (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.valueChild = val
    }
  }
}
</script>

<style lang="less" scoped>
/* 更多弹窗 */
.more-dialog {
  width: 500px;
  padding: 0 30px;
  border-radius: 10px;
  .more-btn {
    height: 120px;
    line-height: 120px;
    text-align: center;
    font-size: 30px;
  }
  .van-ellipsis {
    width: 100%;
  }
  .more-btn + .more-btn {
    border-top: 1px solid @divider-color;
  }
}

/* 投诉弹窗 */
.complain-dialog {
  .complain-title {
    height: 90px;
    line-height: 90px;
    font-size: 32px;
    text-align: center;
    font-weight: 500;
    color: #000;
  }
  .complain-content {
    padding: 27px 35px 27px 26px;
    font-size: 26px;
    color: #8F8F94;
    background: #F7F7F7;
    margin-bottom: 40px;
  }
  .task-btn {
    margin: 30px auto;
  }
  .primary-btn {
    color: @red-dark;
  }
  /deep/ .radio-btn-group {
    padding-left: 25px;
    margin-right: -4px;
    .radio-btn__item {
      height: 64px;
      line-height: 64px;
      padding: 0 26px;
      margin: 0 34px 30px 0;
      border: 0;
      .radio-btn__text {
        color: #333333;
      }
    }
    .radio-btn--active {
      background: #FFEDEB;
      .radio-btn__text {
        color: #FF5240;
      }
    }
    .radio-btn__text {
      font-size: 24px;
      line-height: 60px;
    }
  }
}

/* 屏蔽弹窗 */
.shield-confirm {
  width: 80%;
  padding: 30px;
  border-radius: 10px;
  &-title {
    font-size: 30px;
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
  }
  &-content {
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    margin-top: 30px;
    // .tf-text {
    //   width: 360px;
    // }
    .tf-text-grey {
      margin-bottom: 20px;
    }
  }
  &-footer {
    @flex();
    margin-top: 30px;
    &__btn {
      flex: 1;
    }
    &__btn + &__btn {
      margin-left: 30px;
    }
  }
}

/deep/ .van-share-sheet__options {
  @flex();
  justify-content: center;
  align-items: center;
  height: 327px;
  .van-share-sheet__option {
    .van-share-sheet__icon {
      width: 120px;
      height: 120px;
      border-radius: 20px;
    }
    .van-share-sheet__name {
      font-size: 28px;
      color: #666;
    }
  }
}

.complain-dialog {
  .tf-icon-guanbi {
    margin-top: 0;
    color: #aaa;
    font-size: 30px;
    padding: 20px;
    top: 6px;
    right: 10px;
  }
}
</style>

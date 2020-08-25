<template>
  <div>
    <van-popup class="more-dialog" v-model="moreShowChild">
      <div v-if="comment" class="more-btn" @click="clickComment">回复</div>
      <div v-if="share" class="more-btn" @click="clickShare">分享</div>
      <div v-if="complain" class="more-btn" @click="clickComplain">投诉</div>
      <div v-if="deleteProp" class="more-btn tf-text-primary" @click="onDelete">删除</div>
    </van-popup>
    <van-popup
      class="complain-dialog"
      v-model="complainShow"
      position="bottom"
      @closed="com_type = ''"
    >
      <i
        class="van-icon van-icon-close van-popup__close-icon van-popup__close-icon--top-right"
        @click="complainShow = false"
      ></i>
      <div class="complain-title">投诉</div>
      <div class="complain-content van-multi-ellipsis--l2">
        投诉
        <span class="tf-text-blue">@{{complainInfo.nickname}}</span>
        ：{{complainInfo.content}}
      </div>
      <tf-radio-btn class="complain-radio" v-model="com_type" :data="types" :radius="2"></tf-radio-btn>
      <div class="complain-footer" :class="{'primary-btn': com_type}" @click="submitComplain">提交</div>
    </van-popup>
    <van-share-sheet v-model="showShare" :options="options" @select="onSelect" />
  </div>
</template>

<script>
import { Popup, ShareSheet, Toast } from 'vant'
import tfRadioBtn from '@/components/tf-radio-btn/index.vue'
import { addComplaint } from '@/api/neighbours'

export default {
  components: {
    [Popup.name]: Popup,
    [ShareSheet.name]: ShareSheet,
    tfRadioBtn
  },
  props: {
    moreShow: {
      type: [Boolean],
      default: false
    },
    share: {
      type: [Boolean, Number],
      default: false
    },
    deleteProp: {
      type: [Boolean, Number],
      default: false
    },
    complain: {
      type: [Boolean, Number],
      default: true
    },
    complainType: {
      type: Number,
      default: 0
    },
    complainInfo: {
      type: Object,
      default: () => ({})
    },
    comment: {
      type: [Boolean, Number],
      default: false
    }
  },
  data () {
    return {
      moreShowChild: this.moreShow,
      complainShow: false,
      showShare: false,
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
      com_type: ''
    }
  },
  methods: {
    clickShare () {
      this.showShare = true
    },
    onSelect (option) {
      this.showShare = false
    },
    clickComment () {
      this.$emit('comment')
    },
    /* 删除 */
    onDelete () {
      this.$emit('delete')
    },
    /* 打开投诉 */
    clickComplain () {
      // this.moreShowChild = false
      this.complainShow = true
    },
    /* 提交投诉 */
    submitComplain () {
      if (this.com_type) {
        addComplaint({
          com_type: this.com_type,
          info_type: this.complainType,
          info_id: this.complainInfo.id
        }).then((resr) => {
          Toast.success('投诉成功')
          this.complainShow = false
          this.moreShowChild = false
        })
      } else {
        Toast('请选择类型')
      }
    }
  },
  watch: {
    moreShowChild (val) {
      this.$emit('update:moreShow', val)
    },
    moreShow (val) {
      this.moreShowChild = val
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
  .more-btn + .more-btn {
    border-top: 1px solid @divider-color;
  }
}

/* 投诉弹窗 */
.complain-dialog {
  padding: 0 30px;
  .complain-title {
    height: 90px;
    line-height: 90px;
    font-size: @font-size-md;
    text-align: center;
    border-bottom: 1px solid @divider-color;
  }
  .complain-content {
    padding: 30px 0;
    font-size: 28px;
  }
  .complain-footer {
    padding: 30px 0;
    margin-top: 10px;
    border-top: 1px solid @divider-color;
    font-size: 28px;
    color: @gray-7;
    text-align: center;
  }
  .primary-btn {
    color: @red-dark;
  }
  /deep/ .radio-btn-group {
    .radio-btn__item {
      height: 66px;
    }
    .radio-btn--active {
      border-color: #222;
      background: #222;
      .radio-btn__text {
        color: #fff;
      }
    }
    .radio-btn__text {
      font-size: 24px;
      line-height: 60px;
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
</style>

<template>
  <div>
    <van-popup class="more-dialog" v-model="moreShowChild">
      <div v-if="share" class="more-btn" @click="clickShare">分享</div>
      <div class="more-btn" @click="complain">投诉</div>
      <div class="more-btn tf-text-primary">删除</div>
    </van-popup>
    <van-popup class="complain-dialog" v-model="complainShow" position="bottom">
      <i
        class="van-icon van-icon-close van-popup__close-icon van-popup__close-icon--top-right"
        @click="complainShow = false"
      ></i>
      <div class="complain-title">投诉</div>
      <div class="complain-content van-multi-ellipsis--l2">
        投诉
        <span class="tf-text-blue">@{{'鲁班'}}</span>
        ：{{'加入微信群，无需缴费即可获得至尊D站年
        度VIP，每天免费领取金豆豆...'}}
      </div>
      <tf-radio-btn :data="types" @change="handRadioChange"></tf-radio-btn>
      <div class="complain-footer">提交</div>
    </van-popup>
    <van-share-sheet v-model="showShare" :options="options" @select="onSelect" />
  </div>
</template>

<script>
import { Popup, ShareSheet } from 'vant'
import tfRadioBtn from '@/components/tf-radio-btn/index.vue'

export default {
  components: {
    [Popup.name]: Popup,
    [ShareSheet.name]: ShareSheet,
    tfRadioBtn
  },
  props: {
    moreShow: {
      type: Boolean,
      default: false
    },
    share: {
      type: Boolean,
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
          value: 1,
          name: '垃圾营销'
        },
        {
          value: 2,
          name: '涉黄信息'
        },
        {
          value: 3,
          name: '不实信息'
        },
        {
          value: 4,
          name: '不实信息'
        },
        {
          value: 5,
          name: '人身攻击'
        },
        {
          value: 6,
          name: '违法信息'
        },
        {
          value: 7,
          name: '诈骗信息'
        },
        {
          value: 8,
          name: '泄露隐私'
        }
      ],
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '朋友圈', icon: 'weibo' }
      ]
    }
  },
  methods: {
    clickShare () {
      this.showShare = true
    },
    complain () {
      // this.moreShowChild = false
      this.complainShow = true
    },
    // 选择类型
    handRadioChange (value) {
      this.category_id = value
    },
    onSelect (option) {
      console.log(option.name)
      this.showShare = false
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
  height: 572px;
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
    color: @red-dark;
    text-align: center;
  }
  /deep/ .radio-btn-group {
    .radio-btn--active {
      border-color: #222;
      background: #222;
    }
    .radio-btn__text--active {
      color: #fff;
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

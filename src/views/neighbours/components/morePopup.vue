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
      <div
        v-preventReClick
        v-if="deleteProp"
        class="more-btn tf-text-primary"
        @click="onDelete"
      >
        删除
      </div>
    </van-popup>
    <!-- 投诉 -->
    <complain-popup
      v-model="complainShow"
      :complainInfo="complainInfo"
      :complainType="complainType"
    ></complain-popup>
    <!-- 屏蔽 -->
    <shield-popup
      v-model="shieldShow"
      :shieldInfo="complainInfo"
      :shieldType="complainType"
      @shielding="onShielding"
    ></shield-popup>
    <tf-share
      :share-show="showShare"
      :share-obj="shareObj"
      @closeSwal="onSelect"
    ></tf-share>
  </div>
</template>

<script>
import tfShare from '@/components/tf-share'
import ComplainPopup from './complainPopup'
import ShieldPopup from './shieldPopup'
export default {
  components: {
    tfShare,
    ComplainPopup,
    ShieldPopup
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
      shieldShow: false
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
    // 评论
    clickComment () {
      this.valueChild = false
      this.$emit('comment')
    },
    // 删除
    onDelete () {
      this.$emit('delete')
    },
    // 打开投诉
    clickComplain () {
      this.valueChild = false
      this.complainShow = true
    },
    // 打开屏蔽
    clickShield () {
      this.valueChild = false
      this.shieldShow = true
    },
    // 屏蔽成功事件监听
    onShielding () {
      this.$emit('shielding')
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

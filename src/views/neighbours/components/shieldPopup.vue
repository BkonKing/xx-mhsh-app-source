<template>
  <div class="shield-popup">
    <!-- 屏蔽选择 -->
    <van-popup
      v-model="shieldShow"
      safe-area-inset-bottom
      get-container="body"
      class="more-dialog"
    >
      <div
        class="more-btn van-ellipsis"
        @click="closeOpen('userShieldDialog')"
      >
        屏蔽 @{{ shieldInfo.nickname }}
      </div>
      <div class="more-btn" @click="closeOpen('contentShieldDialog')">
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
      <div class="shield-confirm-title">@{{ shieldInfo.nickname }}</div>
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
          @click="closePopup('userShieldDialog')"
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
        <span class="tf-text-blue">@{{ shieldInfo.nickname }}</span>
        ：{{ shieldInfo.content && shieldInfo.content.replace(/<.*?>/gi, "") }}
      </div>
      <div class="shield-confirm-footer">
        <van-button
          class="shield-confirm-footer__btn"
          size="small"
          @click="closePopup('contentShieldDialog')"
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
  </div>
</template>

<script>
import { addShielding } from '@/api/neighbours'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    // 当前需要投诉的信息
    shieldInfo: {
      type: Object,
      default: () => ({})
    },
    // 如果是投诉，类型 1贴子、2评论、3回复
    shieldType: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      shieldShow: this.value,
      userShieldDialog: false,
      contentShieldDialog: false
    }
  },
  methods: {
    // 关闭屏蔽选择，打开选择的屏幕项弹窗
    closeOpen (key) {
      this.shieldShow = false
      this[key] = true
    },
    // 暂不屏蔽
    closePopup (key) {
      this.shieldShow = false
      this[key] = false
    },
    /* 屏蔽用户 */
    shieldUser () {
      this.addShielding({
        shielding_type: 2,
        shielding_uid: this.shieldInfo.uid
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
        sub_type:
          this.shieldType > 2
            ? 2
            : this.shieldType == 1
              ? sub_type[this.shieldInfo.article_type]
              : this.shieldType,
        shielding_infoid: this.shieldInfo.id
      })
    },
    /* 提交屏蔽设置 */
    addShielding (params) {
      addShielding(params).then(() => {
        this.valueChild = false
        this.shieldShow = false
        this.userShieldDialog = false
        this.contentShieldDialog = false
        this.$toast.success('屏蔽成功')
        this.$emit('shielding')
      })
    }
  },
  watch: {
    shieldShow (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.shieldShow = val
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>

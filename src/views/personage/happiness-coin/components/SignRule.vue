<template>
  <tfDialog
    v-model="dialog"
    title="签到规则"
    :showFotter="true"
    :hiddenOff="true"
    @confirm="dialog = false"
  >
    <div class="sign-rule-dialog">
      <div class="tf-text-lg">“家庭签到”规则：</div>
      <div class="tf-text tf-text-grey">
        1、同个房间号下绑定业主、业主成员、租户、租户成员等，当前每日签到均可得5幸福币；
      </div>
      <div class="tf-text tf-text-grey">
        2、每个房间号的“家庭签到”当前每日额度最高为15幸福币；
      </div>
      <div class="tf-text tf-text-grey">
        3、成员签到规则如下：按签到先后顺序，A房间下业主张先生签到得5幸福币，业主成员老张，小张签到各得5幸福币，租户小王再签到提示“明天早点来哦”；
      </div>
      <div class="tf-text tf-text-grey">
        4、若签到规则调整以新规则说明为准。
      </div>
    </div>
  </tfDialog>
</template>

<script>
import tfDialog from '@/components/tf-dialog/index'
export default {
  name: 'SignRuleDialog',
  components: {
    tfDialog
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialog: this.value
    }
  },
  watch: {
    value (val) {
      this.dialog = val
    },
    dialog (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less">
.sign-rule-dialog {
  .tf-text-lg {
    margin-bottom: 20px;
  }
  .tf-text-grey {
    margin-bottom: 10px;
  }
}
</style>

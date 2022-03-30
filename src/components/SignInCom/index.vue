<template>
  <div class="sign-in-container">
    <slot></slot>
    <sign-alert
      v-model="signAlertVisible"
      :message="signMessage"
      :credits="signOwnerCredits"
    ></sign-alert>
  </div>
</template>

<script>
import SignAlert from '@/views/home/components/SignAlert'
import { handlePermission } from '@/utils/permission'
import { signin } from '@/api/personage'
export default {
  name: 'SignInCom',
  components: {
    SignAlert
  },
  props: {
    showLoading: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      signAlertVisible: false, // 游客认证提醒弹窗
      signMessage: '', // 签到成功提醒
      signOwnerCredits: '' // 业主签到幸福币
    }
  },
  methods: {
    async signIn () {
      handlePermission({
        name: 'location',
        title: '定位服务未开启',
        message: '为了提供更好服务，需要您开启定位'
      }).then(async () => {
        if (this.showLoading) {
          var loading = this.$toast.loading({
            duration: 30000,
            forbidClick: true,
            message: '签到中'
          })
        }
        const res = await signin().catch(() => {
          this.showLoading && loading.clear()
        })
        this.showLoading && loading.clear()
        if (+res.open_box) {
          this.signMessage = res.message
          this.signOwnerCredits = res.owner_credits
          this.signAlertVisible = true
        } else {
          this.$toast({
            message: res.message
          })
        }
        this.mtjEvent({
          eventId: 4
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>

<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="常见问题"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="tf-body-container">
      <FAQ :data="questionList"></FAQ>
    </div>
    <div v-if="hotline" class="question-footer-placeholder" @click="makePhoneCall(hotline)">
      <div class="question-footer">
        <div class="tf-text">客服热线</div>
        <div class="tf-text-sm tf-text-grey">{{hotline}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import FAQ from '@/views/butler/call-property/components/FAQ'
import { getEqList } from '@/api/personage'
export default {
  components: {
    [NavBar.name]: NavBar,
    FAQ
  },
  data () {
    return {
      questionList: [],
      hotline: ''
    }
  },
  created () {
    this.getEqList()
  },
  methods: {
    getEqList () {
      getEqList().then((res) => {
        this.questionList = res.data.eq
        this.hotline = res.data.hotline
      })
    },
    makePhoneCall (phoneNumber) {
      api.call({
        type: 'tel_prompt',
        number: phoneNumber
      })
    }
  }
}
</script>

<style lang='less' scoped>
.tf-body-container {
  position: relative;
}
.question-footer-placeholder {
  height: 130px;
}
.question-footer {
  position: absolute;
  bottom: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

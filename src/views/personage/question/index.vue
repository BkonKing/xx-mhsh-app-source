<template>
<div class='tf-bg'>
  <van-nav-bar
    title='常见问题'
    :fixed='true'
    :border='false'
    left-arrow
    @click-left='$router.go(-1)'
  >
  </van-nav-bar>
  <div class='tf-main-container'>
    <FAQ :data="questionList"></FAQ>
    <div class="question-footer">
      <div class="tf-text">客服热线</div>
      <div class="tf-text-sm tf-text-grey">0591-00000000</div>
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
      questionList: [{
        id: '1',
        question: '业主与物管企业是否为“主仆”关系？',
        answer: '物业管理企业为最大程度地方便广大业主和使用人的生活'
      }]
    }
  },
  created () {
    this.getEqList()
  },
  methods: {
    getEqList () {
      getEqList().then(res => {
        this.questionList = res.data
      })
    }
  }
}
</script>

<style lang='less' scoped>
.tf-main-container {
  position: relative;
  padding-bottom: 100px;
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

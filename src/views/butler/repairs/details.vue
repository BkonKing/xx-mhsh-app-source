<template>
  <div class="tf-padding-base tf-bg tf-main-container">
    <van-nav-bar
      :title="title"
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="tf-flex-item">
      <div class="tf-card">
        <div class="tf-card-header">
          <div class="tf-card-header__title">内容描述</div>
          <div class="tf-card-header__status" :class="{'tf-card-header__status--complete': status > 5}">{{statusText[status]}}</div>
        </div>
        <div class="tf-card-content">{{content}}</div>
        <div class="tf-image-box">
          <img class="tf-image" v-for="(item, i) in images" :src="item.src" :key="i" mode="widthFix">
        </div>
      </div>
      <tfTimeline class="tf-bg-white tf-mt-base tf-padding-base" :options="timelineList">
      </tfTimeline>
    </div>
    <button v-if="status < 6" class="tf-mt-base" type="warn" :plain="true" @click="cancelRepair">撤销提报</button>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import tfTimeline from '@/components/tf-timeline/index.vue'
import {
  statusText
} from '@/const/butler.js'
import {
  getRepairInfo,
  cancelRepair
} from '@/api/butler/butler.js'
export default {
  components: {
    tfTimeline,
    [NavBar.name]: NavBar
  },
  data () {
    return {
      statusText,
      title: '报事报修',
      content: '厨房下水道堵了',
      images: [
        'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg'],
      status: 6,
      ctime: '2020-06-03 16:35:26',
      timelineList: [{
        id: '1',
        remark: '已提交，等待物业人员受理。',
        designee: '',
        mobile: '',
        ctime: '2020-06-03 16:35:26'
      }]
    }
  },
  onLoad () {
    const { id, title } = this.$route.query
    this.getRepairInfo(id)
    this.title = title
  },
  methods: {
    getRepairInfo (repairId) {
      getRepairInfo({
        projectId: '',
        repairId
      }).then(res => {
        if (res.success) {
          const {
            category,
            content,
            images,
            status,
            records
          } = res.data
          this.status = status
          this.imgList = images
          this.timelineList = records
          this.content = content
        }
      })
    },
    // 撤销提报
    cancelRepair () {
      uni.showModal({
        title: '确定撤销吗',
        success: () => {
          cancelRepair().then((res) => {
            if (res.success) {

            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .tf-card {
    padding-right: 0 !important;
  }

  .tf-card-content {
    color: @text-color;
    padding-right: 30px;
  }

  .tf-image-box {
    padding: 20px 30px 20px 0;
  }
</style>

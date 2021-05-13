<template>
  <div class="tf-bg">
    <van-nav-bar
      title="任务投诉"
      :fixed="true"
      :border="false"
      left-arrow
      placeholder
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="tf-main-container">
      <van-cell-group class="complaint-container">
        <van-cell
          title="投诉用户"
          center
          :value="`${info.nickname}（${info.mobile}）`"
        />
        <van-cell title="任务名称" center :value="info.task_title" is-link @click="goTask" />
        <van-cell title="投诉类型" center :value="info.complaint_type_name" />
        <div class="content">
          {{ info.complaint_desc }}
        </div>
        <tf-image-list
          class="image-list"
          v-if="info.complaint_image_data && info.complaint_image_data.length"
          :data="info.complaint_image_data"
          :column="4"
          mode="show"
        ></tf-image-list>
      </van-cell-group>
      <div v-if="info.handle_content" class="complaint-group-2">
        <span class="complaint-text">处理回复：</span>{{info.handle_content}}
      </div>
    </div>
  </div>
</template>

<script>
// pages/task/personage/complaint
import tfImageList from '@/components/tf-image-list'
import { getComplaintInfo } from '@/api/task'

export default {
  components: {
    tfImageList
  },
  data () {
    return {
      taskId: '',
      complaintId: '',
      info: {}
    }
  },
  created () {
    this.taskId = this.$route.query.taskId
    this.complaintId = this.$route.query.complaintId
    this.getComplaintInfo()
  },
  methods: {
    getComplaintInfo () {
      getComplaintInfo({
        complaint_id: this.complaintId
      }).then(({ data }) => {
        this.info = data
      })
    },
    goTask () {
      this.$router.push({
        name: 'taskDetail',
        query: {
          taskId: this.taskId
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tf-main-container {
  padding: 30px 20px;
}

.complaint-container {
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  border-radius: 10px;
  /deep/ .van-cell {
    height: 104px;
    padding: 10px 0;
    border-bottom: 1px solid #eeeeee;
    .van-cell__title {
      flex: initial;
      width: 200px;
      font-size: 28px;
      color: #7a7a7e;
      line-height: 1;
    }
    .van-cell__value {
      font-size: 28px;
      font-weight: 500;
      color: #000000;
      line-height: 1;
      @text-ellipsis();
    }
  }
}

.content {
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 28px;
  color: #000000;
  line-height: 48px;
  word-break: break-all;
}

.image-list {
  padding-top: 10px;
  padding-bottom: 10px;
}

.complaint-group-2 {
  width: 100%;
  padding: 20px 30px;
  margin-top: 30px;
  border-radius: 10px;
  background-color: #fff;
  line-height: 48px;
  color: #8f8f94;
  font-size: 26px;
  word-break: break-all;
}

.complaint-text {
  font-weight: 500;
  color: #000000;
}
</style>

<template>
  <refreshList :list.sync="list" :load="getList">
    <template v-slot="{ item }">
      <div class="complaint-wrapper" @click="goTask(item)">
        <div class="complaint-header">
          <span class="complaint-title">投诉时间：{{ item.ctime }}</span>
          <span
            class="complaint-caption"
            :class="{ 'complaint-caption-ing': !+item.is_handle }"
            >{{item.is_handle_name}}</span
          >
        </div>
        <div class="complaint-body">
          <span class="complaint-title-1"
            >投诉类型：{{ item.complaint_type_name }}</span
          >
          <span class="complaint-summary">{{ item.complaint_desc }}</span>
          <div class="complaint-group-1" @click.stop="goTaskDetails(item)">
            <div class="complaint-view">
              <img class="complaint-large-icon" :src="item.avatar" />
            </div>
            <div class="complaint-view-1">
              <span class="complaint-nick-name">{{item.nickname}}</span>
              <span class="complaint-caption-1"
                >{{item.complaint_content}}</span
              >
            </div>
          </div>
          <div v-if="item.content" class="complaint-group-2">
            <span class="complaint-text">处理回复：</span>{{ item.content }}
          </div>
        </div>
      </div>
    </template>
    <template v-slot:nodata>
      <div class="no-data-box">
        <img class="no-data-img" src="@/assets/neighbours/notask.png" />
        <div class="no-data-text">暂无内容</div>
      </div>
    </template>
  </refreshList>
</template>

<script>
// /pages/task/personage/index
import refreshList from '@/components/tf-refresh-list'
import { getMyComplaintList } from '@/api/task'
export default {
  components: {
    refreshList
  },
  data () {
    return {
      list: []
    }
  },
  created () {},
  methods: {
    // 获取我的投诉
    getList (params) {
      return getMyComplaintList(params)
    },
    // 跳转任务详情
    goTaskDetails ({ task_id }) {
      this.$router.push({
        name: 'taskDetail',
        query: {
          taskId: task_id
        }
      })
    },
    // 任务投诉详情
    goTask ({ task_id, complaint_id }) {
      this.$router.push({
        name: 'TaskComplaintDetails',
        query: {
          taskId: task_id,
          complaintId: complaint_id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url("./complaint.less");

.complaint-caption {
  font-size: 26px;
  line-height: 1;
}

.complaint-caption-ing {
  color: #ff6555;
}
</style>

<template>
    <refreshList :list.sync="data" @load="onLoad">
        <template v-slot="slotProps">
          <div class="question-box" @click="jump(slotProps.item)">
          <div class="question-status-box">
            <div class="question-type">{{ slotProps.item.wjtp_type }}</div>
          </div>
          <div class="question-box__right">
            <div class="question-title">{{ slotProps.item.title }}</div>
            <div class="question-info">
              <div class="tf-row-vertical-center">
                <div
                  class="tf-gradient-tag--warning"
                  v-if="slotProps.item.virtual_coin > 0"
                >+{{ slotProps.item.virtual_coin }}</div>
                <div
                  class="participate-status"
                  :class="slotProps.item.status ? 'participate-status--proceed' : 'participate-status--end'"
                >{{ slotProps.item.joins }}人参加</div>
              </div>
              <div class="question-info__time">{{ slotProps.item.stime }}</div>
            </div>
          </div>
        </div>
        </template>
      </refreshList>
</template>

<script>
import refreshList from '@/components/tf-refresh-list'
export default {
  components: {
    refreshList
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    jump (item) {
      const url = `/pages/butler/questionnaire/details?id=${item.id}`
      this.$router.push(url)
    },
    onLoad () {

    }
  }
}
</script>

<style lang="less" scoped>
.question-box {
  width: 710px;
  @flex();
  background-color: #fff;
  border-radius: @border-radius-md;
}

.question-status-box {
  width: 170px;
  // height: 170px;
  background-color: @gray-1;
  border-top-left-radius: @border-radius-md;
  border-bottom-left-radius: @border-radius-md;
}
.question-type {
  text-align: center;
  line-height: 170px;
}
.question-box__right {
  @flex-column();
  flex: 1;
  padding: 40px 20px;
}
.question-title {
  margin-bottom: @padding-lg;
  line-height: 1;
  font-size: 30px;
  font-weight: 500;
  @text-ellipsis();
}
.question-info {
  @flex();
  justify-content: space-between;
  align-items: center;
}
.participate-status {
  font-size: 24px;
}
.participate-status--proceed {
  color: @red-dark;
}
.participate-status--end {
  color: @gray-7;
}
.tf-gradient-tag--warning {
  margin-right: 30px;
}
.question-info__time {
  font-size: 24px;
  color: @gray-7;
}
</style>

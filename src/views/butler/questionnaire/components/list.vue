<template>
  <refreshList :list.sync="list" @load="onLoad">
    <template v-slot="{item}">
      <div class="question-box" :class="{'question-finish-box': !item.status}" @click="jump(item)">
        <div
          class="question-status-box"
          :style="{'background': item.wjtp_type == 1 ? '#448FE4' : '#55B862'}"
        >
          <span class="question-type">{{ item.wjtp_type }}</span>
        </div>
        <div class="question-box__right">
          <div class="question-title">{{ item.title }}</div>
          <div class="question-info">
            <div class="tf-row-vertical-center">
              <div
                class="tf-gradient-tag--warning"
                v-if="item.virtual_coin > 0"
              ><span class="tf-icon tf-icon-moneycollect"></span>+{{ item.virtual_coin }}</div>
              <div class="participate-status participate-status--proceed">{{ item.joins }}人参加</div>
            </div>
            <div class="question-info__time">{{ item.stime }}</div>
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
  data () {
    return {
      list: this.data
    }
  },
  methods: {
    jump (item) {
      const url = `/pages/butler/questionnaire/details?id=${item.id}`
      this.$router.push(url)
    },
    onLoad () {
      this.$emit('load')
    }
  },
  watch: {
    list (value) {
      this.$emit('update:data', value)
    },
    data (value) {
      this.list = value
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

.question-finish-box {
  .question-status-box {
    background: #aaa !important;
  }
  .participate-status--proceed {
    color: @gray-7;
  }
  .tf-gradient-tag--warning {
    background: #aaaaaa;
  }
}

.question-status-box {
  width: 170px;
  // height: 170px;
  background-color: @gray-1;
  border-top-left-radius: @border-radius-md;
  border-bottom-left-radius: @border-radius-md;
  text-align: center;
}
.question-type {
  line-height: 170px;
  font-size: 100px;
  color: #fff;
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
  color: @red-dark;
}
.tf-gradient-tag--warning {
  margin-right: 30px;
}
.question-info__time {
  font-size: 24px;
  color: @gray-7;
}
</style>

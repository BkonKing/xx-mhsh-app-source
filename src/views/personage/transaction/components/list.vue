<template>
  <refreshList :list.sync="list" @load="onLoad">
    <template v-slot="{item}">
      <div class="transaction-box" @click="jump(item)">
        <div class="transaction-item">
          <div class="transaction-item__label">提交时间：{{ item.ctime }}</div>
        </div>
        <div class="transaction-item">
          <div class="transaction-item__label">申报类型：</div>
          <div class="transaction-item__text">{{ item.category }}</div>
        </div>
        <div class="transaction-item">
          <div class="transaction-item__label">内容描述：</div>
          <div
            class="transaction-item__content"
            :class="{'transaction-item__content--manager': item.status > 5}"
          >{{ item.content }}</div>
        </div>
        <div class="transaction-footer">
          <div class="transaction-footer__text">
            等待
            <span class="tf-text-blue">李师傅</span>
            {{item.status | statusText}}
            <span class="tf-text-primary">(剩余3天 00:10:24)</span>
          </div>
          <van-button v-if="item.status == 1" type="warning">去处理</van-button>
          <van-button v-else-if="item.status == 3" type="danger">去分派</van-button>
          <van-button v-else-if="item.status == 4">接受任务</van-button>
          <van-button v-else-if="item.status == 5" type="danger">确认结案</van-button>
        </div>
        <!-- <div
              class="tf-card-header__status"
              :class="{ 'tf-card-header__status--complete': item.status > 5 }"
        >{{ [item.status] }}</div>-->
      </div>
    </template>
  </refreshList>
</template>

<script>
import { Button } from 'vant'
import refreshList from '@/components/tf-refresh-list'
export default {
  components: {
    [Button.name]: Button,
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
    onLoad () {
      this.$emit('load')
    },
    jump (item) {
      const url = `/pages/personage/transaction/details?id=${item.id}&title=${item.category}`
      this.$router.push(url)
    }
  },
  watch: {
    list (value) {
      this.$emit('update:data', value)
    },
    data (value) {
      this.list = value
    }
  },
  filters: {
    statusText (value) {
      const text = {
        1: '处理',
        3: '分派',
        4: '接受任务',
        5: '结案'
      }
      return text[value]
    }
  }
}
</script>

<style lang="less" scoped>
.transaction-box {
  padding: 30px 30px 0;
  background: #fff;
  border-radius: 10px;
  & + & {
    margin-top: 30px;
  }
  .transaction-item {
    display: flex;
    margin-bottom: 20px;
    &__label {
      font-size: 26px;
      color: @gray-7;
    }
    &__text {
      font-size: 26px;
    }
    &__content {
      flex: 1;
      padding: 30px 20px;
      border: 1px dashed #aaa;
      font-size: 26px;
      color: #666;
    }
    &__content--manager {
      border: none;
      background: #f2f2f4;
    }
  }
  .transaction-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    padding: 25px 0;
    border-top: 1px solid #f0f0f0;
    &__text {
      font-size: 28px;
      color: #666;
    }
    /deep/ .van-button {
      height: 66px;
    }
  }
}
</style>

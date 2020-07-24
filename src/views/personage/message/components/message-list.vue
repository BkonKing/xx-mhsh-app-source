<template>
  <refreshList :list.sync="list" @load="onLoad">
    <template v-slot="{item}">
      <div class="tf-list-content tf-mb-base tf-center">{{item.ctime}}</div>
          <div class="tf-list" @click="jump(item)">
            <img
              v-if="type !== 'system'"
              class="tf-list-image"
              :src="item.image"
              :class="[`list-image__${type}`]"
              mode="aspectFit"
            />
            <div class="tf-vertical-center">
              <div class="tf-row-vertical-center">
                <div class="tf-list-title">{{item.title}}</div>
                <div class="tf-circle-tag--warning"></div>
              </div>
              <div class="tf-list-content">{{item.content}}</div>
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
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [
        {
          title: '交易退款成功',
          content: '您的订单已成功退款，点击查看详情',
          image: '/static/app-icon.png',
          ctime: '07-06 12:00'
        }
      ]
    }
  },
  methods: {
    onLoad () {

    }
  }
}
</script>

<style lang="less" scoped>
.list-image__butler,
.list-image__activity,
.list-image__work {
  width: 80px;
}
.tf-circle-tag--warning {
  width: 14px;
  height: 14px;
  margin-left: 8px;
}
.tf-list-content {
  lines: 1;
  text-overflow: ellipsis;
}
</style>

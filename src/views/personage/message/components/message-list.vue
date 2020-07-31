<template>
  <div style="width:100%">
    <refreshList :list.sync="list" @load="onLoad">
      <template v-slot="{item}">
        <div class="tf-list-content tf-mb-base tf-center">{{item.ctime}}</div>
        <div class="tf-list" @click="jump(item)" v-longtap="{tap: operate, params: item}">
          <img
            v-if="type !== 'system'"
            class="tf-list-image"
            :src="item.image"
            :class="[`list-image__${type}`]"
            mode="aspectFit"
          />
          <div class="tf-space-around">
            <div class="tf-row-vertical-center" :class="{'tf-mb-base': type === 'system'}">
              <div class="tf-list-title">{{item.title}}</div>
              <div v-if="item.status" class="tf-circle-tag--warning"></div>
            </div>
            <div class="tf-list-content">{{item.content}}</div>
          </div>
        </div>
      </template>
    </refreshList>
    <van-popup class="more-dialog" v-model="moreShowChild">
      <div v-if="isRead" class="more-btn" @click="mark">标记已读</div>
      <div class="more-btn tf-text-primary">删除</div>
    </van-popup>
  </div>
</template>

<script>
import { Popup } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import longtap from '@/directive/tap/index.js'
export default {
  components: {
    refreshList,
    [Popup.name]: Popup
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  directives: {
    longtap
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
      ],
      moreShowChild: false,
      isRead: false // 是否已读，判断是否需要显示标记已读
    }
  },
  methods: {
    onLoad () {},
    operate ({ status }) {
      this.isRead = status
      this.moreShowChild = true
    },
    mark () {

    }
  }
}
</script>

<style lang="less" scoped>
.list-image__butler,
.list-image__activity,
.list-image__work {
  width: 80px;
  height: 80px;
}
.tf-list-title,
.tf-list-content {
  line-height: 1;
}
.tf-circle-tag--warning {
  width: 14px;
  height: 14px;
  margin-left: 8px;
}
.tf-list-content {
  @text-ellipsis();
}
/* 更多弹窗 */
.more-dialog {
  width: 500px;
  padding: 0 30px;
  border-radius: 10px;
  .more-btn {
    height: 120px;
    line-height: 120px;
    text-align: center;
    font-size: 30px;
  }
  .more-btn + .more-btn {
    border-top: 1px solid @divider-color;
  }
}
</style>

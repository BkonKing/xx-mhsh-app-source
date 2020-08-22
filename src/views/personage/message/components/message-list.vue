<template>
  <div style="width:100%;height:100%;">
    <refreshList :list.sync="list" :load="load">
      <template v-slot="{item}">
        <div class="tf-list-content tf-mb-base tf-center">{{item.ctime}}</div>
        <div class="tf-list" @click="jump(item)" v-longtap="{tap: operate, params: item}">
          <img
            v-if="type == 'transaction'"
            class="tf-list-image"
            :src="item.image"
            mode="aspectFit"
          />
          <template v-else-if="type !== 'system'">
            <div class="list-icon-box"></div>
          </template>
          <div class="tf-space-around">
            <div class="tf-row-vertical-center" :class="{'tf-mb-base': type === 'system'}">
              <div class="tf-list-title" :class="{'tf-read-after-tag': item.status}">{{item.title}}</div>
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
    },
    data: {
      type: Array,
      default: () => []
    },
    load: {
      type: Function
    }
  },
  directives: {
    longtap
  },
  data () {
    return {
      list: this.data,
      moreShowChild: false,
      isRead: false // 是否已读，判断是否需要显示标记已读
    }
  },
  methods: {
    operate ({ status }) {
      this.isRead = status
      this.moreShowChild = true
    },
    jump (item) {
      this.$emit('click', item)
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
.list-icon-box {
  width: 80px;
  height: 80px;
  border-radius:10px;
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

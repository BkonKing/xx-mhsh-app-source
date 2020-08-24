<template>
  <div style="width:100%;height:100%;">
    <refreshList :list.sync="list" :load="load" finished-text>
      <template v-slot="{item}">
        <div class="tf-list-content tf-mb-base tf-center">{{item.ctime}}</div>
        <div class="tf-list" @click="jump(item)" v-longtap="{tap: operate, params: item}">
          <img
            v-if="type == 'transaction'"
            class="tf-list-image"
            :src="item.image"
          />
          <template v-else-if="type == 'butler'">
            <div class="list-icon-box tf-icon" :class="item.sub_type | butlerIcon"></div>
          </template>
          <template v-else-if="type == 'activity'">
            <div class="list-icon-box tf-icon" :class="item.sub_type | activityIcon"></div>
          </template>
          <template v-else-if="item.sub_type == '16'">
            <div class="list-icon-box tf-icon" :class="item.repairs_status | repairIcon"></div>
          </template>
          <div class="tf-space-around">
            <div class="tf-row-vertical-center" :class="{'tf-mb-base': type === 'system'}">
              <div class="tf-list-title" :class="{'tf-read-after-tag': item.status}">{{item.title}}</div>
              <div v-if="item.is_read == '0'" class="tf-circle-tag--warning"></div>
            </div>
            <div class="tf-list-content">{{item.content}}</div>
          </div>
        </div>
      </template>
      <template v-slot:nodata>
        <div class="empty-session">
          <img class="empty-session__img" src="@/assets/imgs/message_xiaoxi.png" />
          <div class="empty-session__text">暂无消息</div>
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
    },
    readAll () {
      this.list.forEach(obj => {
        obj.is_read = '1'
      })
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
    activityIcon (value) {
      const icon = {
        17: 'tf-icon-huodongbaoming',
        18: 'tf-icon-huodongkaishi'
      }
      return icon[value]
    },
    butlerIcon (value) {
      const icon = {
        13: 'tf-icon-gonggao1',
        14: 'tf-icon-guihuan',
        15: 'tf-icon-biaoyangtousu',
        16: 'if-icon-baoshibaoxiu'
      }
      return icon[value]
    },
    repairIcon (value) {
      const icon = {
        1: 'tf-icon-daichuli',
        2: 'tf-icon-daifenpai',
        3: 'tf-icon-daijiean',
        4: 'tf-icon-yijiean'
      }
      return icon[value]
    }
  }
}
</script>

<style lang="less" scoped>
.list-icon-box {
  width: 80px;
  height: 80px;
  line-height: 80px;
  border-radius: 10px;
  font-size: 44px;
  color: #fff;
  text-align: center;
  margin-right: 20px;
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
.empty-session {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200px;
  &__img {
    width: 483px;
    height: 335px;
  }
  &__text {
    font-size: 28px;
    text-align: center;
    line-height: 96px;
    color: #222;
  }
}
.tf-circle-tag--warning {
  width: 14px;
  height: 14px;
  margin-left: 8px;
}
.tf-icon-daichuli,
.tf-icon-gonggao1,
.tf-icon-huodongbaoming {
  background: #ffa110;
}
.tf-icon-daifenpai,
.if-icon-baoshibaoxiu {
  background: #5c76d8;
}
.tf-icon-yijiean,
.tf-icon-biaoyangtousu {
  background: #4bb192;
}
.tf-icon-daijiean,
.tf-icon-tf-icon-guihuan,
.tf-icon-huodongkaishi {
  background: #fd7d6f;
}
</style>

<template>
  <div class="container-box">
    <refreshList ref="messageList" :list.sync="list" :load="getMessageList">
      <template v-slot="{item}">
        <div class="tf-list-content tf-mb-base tf-center">{{item.ctime}}</div>
        <div class="tf-list" @click="handleClick(item)">
          <template v-if="item.sub_type == 11 || item.sub_type == 12">
            <div class="tf-row-space-between">
              <div class="tf-row-vertical-center">
                <img class="tf-avatar-sm tf-mr-base" :src="item.avatar" mode="aspectFit" />
                <div class="tf-text-sm">{{item.nickname}}</div>
                <div v-if="item.is_read == '0'" class="tf-circle-tag--warning"></div>
              </div>
              <div class="tf-row-vertical-center">
                <div class="tf-icon tf-icon-comment reply-icon"></div>
                <div class="tf-text-sm tf-text-grey">回复</div>
              </div>
            </div>
            <div class="content-box van-multi-ellipsis--l2">{{item.pl_content}}</div>
            <div class="tf-row message-box">
              <div class="tf-text-sm tf-text-blue">{{item.my_nickname}}</div>
              <div class="tf-text-sm tf-text-grey van-ellipsis">：{{item.wd_content}}</div>
            </div>
          </template>
          <template v-else-if="item.sub_type == 10">
            <div class="tf-row-vertical-center tf-mb-lg">
              <div class="tf-icon tf-icon-dianzan like-icon"></div>
              <div class="tf-text-sm">{{item.title}}</div>
              <div v-if="item.is_read == '0'" class="tf-circle-tag--warning"></div>
            </div>
            <div class="tf-row-vertical-center message-box">
              <div class="tf-icon tf-icon-dianzan tf-text-orange"></div>
              <div class="tf-text-sm tf-text-grey like-number">{{item.thumbsups}}</div>
              <div class="tf-text-sm tf-text-grey">{{item.content}}</div>
            </div>
          </template>
        </div>
      </template>
    </refreshList>
    <van-popup class="more-dialog" v-model="operateDialog">
      <div v-if="active.is_read == '0'" class="more-btn" @click="markRead">标记已读</div>
      <div class="more-btn tf-text-primary">删除</div>
    </van-popup>
  </div>
</template>

<script>
import refreshList from '@/components/tf-refresh-list'
import { Popup } from 'vant'
import { getMessageList } from '@/api/personage.js'
import longtap from '@/directive/tap/index.js'

export default {
  components: {
    refreshList,
    [Popup.name]: Popup
  },
  data () {
    return {
      list: [],
      operateDialog: false,
      active: {}
    }
  },
  directives: {
    longtap
  },
  methods: {
    // 打开操作栏
    openOperateDialog (item) {
      this.active = item
      this.operateDialog = true
    },
    // 获取互动消息
    getMessageList (params) {
      params.remind_type = 3
      return getMessageList(params)
    },
    // 触发当前实例点击事件
    handleClick (item) {
      this.$emit('click', item)
    },
    // 全部已读，手动修改为已读状态
    readAll () {
      this.list.forEach((obj) => {
        obj.is_read = '1'
      })
    },
    // 触发标记已读事件
    markRead () {
      this.$emit('mark', this.active)
      this.operateDialog = false
    }
  }
}
</script>

<style lang="less" scoped>
.container-box {
  width: 100%;
  height: 100%;
}
.tf-list {
  @flex-column();
  margin-bottom: 0;
}
.tf-circle-tag--warning {
  width: 14px;
  height: 14px;
  margin-left: 8px;
}
.message-box {
  align-items: center;
  padding: 20px;
  border-radius: 4px;
  background-color: #f0f0f0;
}
.tf-text-orange {
  margin-right: 10px;
}
.like-icon {
  width: 48px;
  height: 48px;
  line-height: 48px;
  margin-right: 20px;
  font-size: 28px;
  text-align: center;
  border-radius: 50%;
  background-color: @background-color;
  color: #aaaaaa;
}
.like-number {
  padding-right: 10px;
  margin-right: 10px;
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: #aaaaaa;
}
.content-box {
  margin: 20px 0;
  font-size: 26px;
}
.reply-icon {
  color: @orange-dark;
  margin-right: 9px;
}
.tf-icon-dianzan.tf-text-orange,
.tf-icon-comment {
  font-size: 34px;
}
.more-dialog {
  width: 500px;
  padding: 0 30px;
  border-radius: 10px;
  .more-btn {
    height: 120px;
    line-height: 120px;
    font-size: 30px;
    text-align: center;
  }
  .more-btn + .more-btn {
    border-top: 1px solid @divider-color;
  }
}
</style>

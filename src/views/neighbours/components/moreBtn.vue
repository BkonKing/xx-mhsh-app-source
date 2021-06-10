<template>
  <div class="more-container">
    <img
      class="operation-icon"
      src="@/assets/neighbours/more.png"
      @click="onPostOperation"
    />
    <div
      v-if="postMoreShow"
      v-click-out-side="closeOperation"
      class="more-popup"
    >
      <template v-if="status">
        <span class="more-btn" @click="deleteArticle">删除</span>
      </template>
      <template v-else>
        <span class="more-btn" @click="shieldShow = true">屏蔽</span>
        <span class="more-btn" @click="handleComplain">投诉</span>
      </template>
    </div>
    <!-- 投诉 -->
    <!-- 提问投诉 -->
    <complain-popup
      v-if="+type === 7"
      v-model="complainShow"
      :complainInfo="item"
      :complainType="type"
      :types="types"
      labelKey="complaint_type"
      valueKey="id"
    ></complain-popup>
    <!-- 列表投诉 -->
    <complain-popup
      v-else
      v-model="complainShow"
      :complainInfo="item"
      :complainType="1"
    ></complain-popup>
    <!-- 屏蔽 -->
    <shield-popup
      v-model="shieldShow"
      :shieldInfo="item"
      :shieldType="+type < 4 ? 1 : type"
      :contentKey="contentKey"
    ></shield-popup>
  </div>
</template>

<script>
import ClickOutSide from '@/directive/ClickOutSide'
import ComplainPopup from './complainPopup'
import ShieldPopup from './shieldPopup'
export default {
  components: {
    ComplainPopup,
    ShieldPopup
  },
  directives: {
    ClickOutSide
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    type: {
      default: ''
    },
    types: {
      type: Array,
      default: () => []
    },
    contentKey: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      postMoreShow: false,
      complainShow: false,
      shieldShow: false,
      status: this.item.is_mine // 是否是本人发的帖
    }
  },
  methods: {
    // 帖子操作
    onPostOperation () {
      this.postMoreShow = !this.postMoreShow
    },
    // 关闭更多操作
    closeOperation () {
      this.postMoreShow = false
    },
    // 投诉
    handleComplain () {
      if (this.type == 6) {
        this.$router.push({
          name: 'operateComplaint',
          query: {
            taskId: this.item.task_id,
            complaintUid: this.item.uid
          }
        })
      } else {
        this.complainShow = true
      }
    },
    // 删除
    deleteArticle () {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否确认删除？'
        })
        .then(() => {
          this.$emit('delete')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.more-container {
  position: relative;
}
.more-popup {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: -256px;
  top: -16px;
  z-index: 2;
  width: 235px;
  height: 72px;
  padding-right: 10px;
  background: url("~@/assets/neighbours/dialog.png");
  background-size: contain;
  background-repeat: no-repeat;
  .more-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    font-size: 28px;
    color: #ffffff;
    line-height: 1;
  }
  .more-btn + .more-btn {
    border-left: 1px solid #8f8f94;
  }
}
.operation-icon {
  width: 36px;
  height: 36px;
}
</style>

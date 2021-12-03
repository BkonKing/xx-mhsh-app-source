<template>
  <div class="task-box">
    <div class="task-item" v-for="(item, i) in data" :key="i">
      <div class="tf-row tf-flex-item">
        <img
          class="task-item__icon"
          v-if="item.task_type == 1"
          src="@/assets/personage/credits_sign.png"
        />
        <img
          class="task-item__icon"
          v-else-if="item.task_type == 2"
          src="@/assets/personage/credits_renzheng.png"
        />
        <img
          class="task-item__icon"
          v-else-if="item.task_type == 3"
          src="@/assets/personage/credits_yunmenjin.png"
        />
        <img
          class="task-item__icon"
          v-else-if="item.task_type == 4"
          src="@/assets/personage/credits_wenjuan.png"
        />
        <img
          class="task-item__icon"
          v-else-if="item.task_type == 5"
          src="@/assets/personage/credits_toupiao.png"
        />
        <img
          class="task-item__icon"
          v-else-if="item.task_type == 7"
          src="@/assets/personage/credits_goufang.png"
        />
        <div class="tf-space-between">
          <div class="task-item__title">{{ item.task_name }}</div>
          <!-- 朋友到访、购房奖励 -->
          <div v-if="item.task_type == 7">
            <div class="task-item__remarks">
              {{ item.task_type | taskText }}
            </div>
            <div v-if="yxlpNum" class="tf-row task-item__remarks">
              获得
              <div class="task-item__remarks--gold">
                {{ item.credits }}幸福币起
              </div>
            </div>
          </div>
          <!-- 其他 -->
          <div class="tf-row" v-else>
            <!-- 签到 -->
            <template v-if="item.task_type === '1'">
              <div class="task-item__remarks">
                <!-- 游客 -->
                <template v-if="userType == 0">
                  每日签到获得
                </template>
                <!-- 有认证用户 -->
                <template v-else>
                  <span
                    class="tf-icon tf-icon-zhushishuoming"
                    @click="signRuledialog = true"
                  ></span>
                  <!-- 签到幸福币已达上限，不可签到 -->
                  <template v-if="signinToday === 2">明天要早点来哦</template>
                  <template v-else>签到可获得</template>
                </template>
              </div>
              <div v-if="signinToday !== 2" class="task-item__remarks--gold">
                +{{ item.credits }}
              </div>
            </template>
            <!-- 其他 -->
            <template v-else>
              <div class="task-item__remarks">
                {{ item.task_type | taskText }}获得
              </div>
              <div class="task-item__remarks--gold">
                +{{ item.credits }}
              </div>
            </template>
          </div>
        </div>
      </div>
      <div v-if="item.complete" class="task-item__number">
        +{{ item.credits }}
      </div>
      <van-button
        v-else
        v-preventReClick
        :loading="signLoading && item.task_type == 1"
        class="task-item__btn"
        v-txAnalysis="{ eventId: 48 }"
        :disabled="signinToday === 2 && item.task_type == 1"
        @click="complete(item)"
        >{{
          item.task_type == 7
            ? "去推荐"
            : signinToday === 2 && item.task_type == 1
            ? "签到"
            : "去完成"
        }}</van-button
      >
    </div>
    <sign-rule-dialog v-model="signRuledialog"></sign-rule-dialog>
  </div>
</template>

<script>
import SignRule from './SignRule'
export default {
  name: 'TaskList',
  components: {
    [SignRule.name]: SignRule
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    signinToday: {
      type: [Number, String],
      default: 1
    },
    userType: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      signLoading: false,
      signRuledialog: false
    }
  },
  filters: {
    taskText (value) {
      let text = '参与'
      switch (parseInt(value)) {
        case 1:
          text = '每日签到'
          break
        case 2:
          text = '认证成功'
          break
        case 3:
          text = '首次开门'
          break
        case 7:
          text = '朋友到访、购房奖励'
          break
      }
      return text
    }
  }
}
</script>

<style lang="less" scoped>
* {
  line-height: 1;
}
.task-box {
  padding: 0 30px;
  background: #ffffff;
  border-radius: 10px;
}
.task-item {
  @flex();
  justify-content: space-between;
  align-items: center;
  min-height: 148px;
}
.task-item + .task-item {
  border-top: 1px solid #EEEEEE;
}
.task-item__icon {
  width: 48px;
  height: 48px;
  margin-right: 30px;
}
.task-item__title {
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: bold;
  color: #000000;
}
.task-item__remarks {
  font-size: 24px;
  color: #bbbbbb;
  .tf-icon-zhushishuoming {
    margin-right: 10px;
  }
}
.task-item__remarks--gold {
  margin-left: 22px;
  font-size: 26px;
  color: #febf00;
}
.task-item__number {
  width: 150px;
  text-align: center;
  font-size: 38px;
  line-height: 90px;
  font-weight: 500;
  color: #febf00;
}
.task-item__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 164px;
  height: 64px;
  background: #febf00;
  border: none;
  border-radius: 32px;
  font-size: 26px;
  font-weight: bold;
  color: #fff;
}
</style>

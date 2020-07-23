<template>
  <view class="tf-bg tf-padding-base" :style="{ 'padding-bottom': `${keyboardHeight}px` }">
    <tf-list>
      <text class="list-title">邀约设置</text>
      <tf-list-item title="来访日期">
        <template v-slot:right>
          <picker mode="date" :value="form.stime" :start="startDate" :end="endDate" @change="bindDateChange">
            <text class="tf-text text-right">{{ form.stime }}</text>
          </picker>
        </template>
      </tf-list-item>
      <tf-list-item title="进出次数">
        <template v-slot:right>
          <picker mode="selector" :range="array" range-key="label" :value="form.vtimes" @change="bindNumChange">
            <text class="tf-text text-right">{{ vtimes }}</text>
          </picker>
        </template>
      </tf-list-item>
      <tf-list-item title="同行人数" :showArrow="false">
        <template v-slot:right>
          <input v-model="form.num" type="number" class="tf-input" />
        </template>
      </tf-list-item>
      <tf-list-item title="来访目的" :showArrow="false">
        <template v-slot:right>
          <input v-model="form.remark" class="tf-input" />
        </template>
      </tf-list-item>
    </tf-list>
    <view class="visitor-btn">
      <text class="tf-icon visitor-btn__text">{{ icon_contacts }} 选择访客</text>
    </view>
    <tf-list>
      <text class="list-title">访客信息</text>
      <visitor-form v-if="1" ref="form"></visitor-form>
      <view v-else class="visitor-info">
        <view class="tf-row">
          <text class="visitor-info__text tf-mr-base">鲁班七号 男</text>
          <text class="visitor-info__text tf-text-grey">15066668888 闽A23333</text>
        </view>
        <text class="tf-icon">{{ icon_delete }}</text>
      </view>
    </tf-list>
    <button class="tf-mt-base" @click="addVisitorLog" type="warn">发起邀约</button>
  </view>
</template>

<script>
import visitorForm from './components/form.nvue';
import tfList from '@/pages/components/tf-list/index.nvue';
import tfListItem from '@/pages/components/tf-list/item.nvue';
import { icon_contacts, icon_delete } from '@/pages/const/icon.js';
import { addVisitorLog } from '@/api/butler/butler.js';
import { getDate } from '@/utils/util.js';
export default {
  components: {
    tfList,
    tfListItem,
    visitorForm
  },
  data() {
    const currentDate = getDate({
      format: true
    });
    return {
      icon_contacts,
      icon_delete,
      keyboardHeight: 0,
      title: 'picker',
      array: [
        {
          label: '当日一次',
          value: 1
        },
        {
          label: '当日二次',
          value: 2
        },
        {
          label: '当日三次及以上',
          value: 3
        }
      ],
      form: {
        stime: currentDate,
        time: '12:01',
        vtimes: 0,
        num: '',
        remark: ''
      }
    };
  },
  computed: {
    startDate() {
      return getDate('start');
    },
    endDate() {
      return getDate('end');
    },
    vtimes() {
      return this.array[this.form.vtimes].label;
    }
  },
  //点击导航栏 buttons 时触发
  onNavigationBarButtonTap({ index }) {
    if (index === 0) {
      this.goInviteList();
    } else if (index === 1) {
      this.goVisitorList();
    }
  },
  onLoad() {
    uni.onKeyboardHeightChange(res => {
      this.keyboardHeight = res.height;
    });
  },
  methods: {
    addVisitorLog() {
      const visitorData = this.$refs.form.getData();
      const params = Object.assign({}, visitorData, this.form)
      if (!this.form.stime) {
        uni.showToast({
          title: '请选择来访日期',
          icon: 'none'
        })
      } else if (!visitorData.realname) {
        uni.showToast({
          title: '请填写访客姓名',
          icon: 'none'
        })
      } else if (!visitorData.gender) {
        uni.showToast({
          title: '请选择访客性别',
          icon: 'none'
        })
      }
      addVisitorLog().then(res => {
        if (res.success) {
          this.sendInvite();
        }
      });
    },
    goVisitorList() {
      uni.navigateTo({
        url: '/pages/butler/visitor/visitor-list'
      });
    },
    goInviteList() {
      uni.navigateTo({
        url: '/pages/butler/visitor/invite-list'
      });
    },
    sendInvite() {
      uni.navigateTo({
        url: '/pages/butler/visitor/invite'
      });
    },
    bindNumChange(e) {
      this.form.vtimes = parseInt(e.detail.value);
    },
    bindDateChange(e) {
      this.form.stime = e.detail.value;
    },
    bindTimeChange(e) {
      this.time = e.target.value;
    }
  }
};
</script>

<style lang="less" scoped>
.tf-input {
  flex: 1;
  font-size: 30px;
  text-align: right;
}

.visitor-btn {
  margin: 30px 0;
}

.visitor-btn__text {
  text-align: right;
  height: 44px;
  line-height: 44px;
  font-size: 26px;
}

.list-title {
  font-size: 30px;
  padding: 30px;
  font-weight: bold;
  text-align: center;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: @divider-color;
}

.visitor-info {
  flex-direction: row;
  justify-content: space-between;
  padding: 35px 30px;
}

.visitor-info__text {
  font-size: 30px;
}

.text-right {
  text-align: right;
}
</style>

<template>
  <view class="tf-bg">
    <view class="tf-bg-white">
      <userInfo avatar="/static/app-icon.png" name="用户昵称" time="2020.05.30"></userInfo>
      <text class="tf-article-title">{{wjtp_info.title}}</text>
      <view class="tf-row-space-between">
        <text class="tf-gradient-tag--warning" v-if="wjtp_info.virtual_coin > 0">参与得{{wjtp_info.virtual_coin}}幸福币</text>
        <text class="people-number">2333人参加</text>
      </view>
    </view>
    <view class="vote-padding">
      <text class="tf-text-grey tf-center">投票选项(单选)</text>
      <view class="vote-box tf-row-space-between" v-for="(item, i) in voteList" :key="i" :class="{ 'vote-active': answer.indexOf(item.id) > -1 }">
        <!--  投票统计进度条-->
        <view v-if="wjtp_info.is_answer" class="vote-progress"></view>
        <text class="vote-title">{{ item.name }}</text>
        <!-- 已答-->
        <text class="vote-result" v-if="wjtp_info.is_answer">{{ item.number }}票</text>
        <!-- 未答-->
        <template v-else>
          <!-- 单选 -->
          <button v-if="item.item_type === 1" class="vote-btn" @click="changeValue(item.id)"><text class="tf-text-white">投票</text></button>
          <!-- 多选 -->
          <button v-else class="tf-icon vote-btn vote-btn--multiple" @click="changeValue(item.id)">
            <text class="tf-text-white">{{ answer.indexOf(item.id) > -1 ? icon_check : '投票' }}</text>
          </button>
        </template>
      </view>
      <!-- <text class="tf-auxiliary-content" v-if="wjtp_info.is_answer">投票已结束</text> -->
      <button v-if="!wjtp_info.is_answer" type="warn" @click="confirm">确定</button>
    </view>
  </view>
</template>

<script>
import { icon_check } from '@/pages/const/icon.js';
import userInfo from '../../components/user-info/index.nvue';
import { addWjtp, getWjtpInfo } from '@/api/butler/butler.js';
export default {
  components: {
    userInfo
  },
  data() {
    return {
      icon_check,
      wjtpId: '',
      wjtp_info: {
        id: 2,
        title: '疫情防范问卷调查',
        remarks: '小区开展疫情防范问卷调查',
        wjtp_type: 2, // 	类型：1问卷，2投票
        virtual_coin: 10, // 幸福币
        item_num: 4, // 总题数
        is_answer: 0 // 是否已答：1是、0否
      },
      voteList: [
        // {
        //   id: '1',
        //   wjtp_id: '2',
        //   question: '您的性别是',
        //   option: [{ A: '男' }, { B: '女' }],
        //   item_type: '1',
        //   answer: 'A',
        //   answer_count: '',
        //   is_required: '1'
        // },
        // {
        //   id: '2',
        //   wjtp_id: '2',
        //   question: '您小区的防疫措施有',
        //   option: [{ A: '对小区定期实行消毒' }, { B: '为业主提供口罩' }, { C: '为业主提供生活必需品' }, { D: '禁止业主随意出入' }],
        //   item_type: '2',
        //   answer: 'A,C',
        //   answer_count: '',
        //   is_required: '1'
        // },
        // {
        //   id: '3',
        //   wjtp_id: '2',
        //   question: '您对小区的防疫措施满意吗',
        //   option: [{ A: '满意' }, { B: '较为满意' }, { C: '不满意' }],
        //   item_type: '1',
        //   answer: 'A',
        //   answer_count: '',
        //   is_required: '0'
        // },
        {
          id: '3',
          wjtp_id: '2',
          question: '请留下您宝贵的建议',
          option: '',
          item_type: 2,
          answer: '非常好',
          answer_count: '',
          is_required: '0'
        }
      ],
      answer: []
    };
  },
  onLoad({id}) {
    this.wjtpId = id
    this.getWjtpInfo()
  },
  methods: {
    getWjtpInfo() {
      getWjtpInfo({
        wjtpId: this.wjtpId
      }).then(res => {
        if (res.success) {
          const { wjtp_infom, item} = res.data
          this.wjtp_infom = wjtp_infom
          this.voteList = item
        }
      })
    },
    confirm() {
      if (this.answer.length > 0) {
        this.addWjtp(this.answer)
      } else {
        uni.showToast({
          title: '请选择要投票的选项',
          icon: 'none'
        })
      }
    },
    addWjtp(answer) {
      addWjtp({
        wjtp_id: this.wjtpId,
        answer
      }).then(res => {
        if (res.success) {
          uni.showToast({
            title: '投票成功'
          });
          this.wjtp_info.is_answer = 1;
        } else {
          uni.showToast({
            title: '提交失败',
            icon: 'none'
          });
        }
      })
    },
    changeValue(value) {
      if (this.type) {
        this.addWjtp([value])
      } else {
        const index = this.answer.indexOf(value);
        if (index == -1) {
          this.answer.push(value);
        } else {
          this.answer.splice(index, 1);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.tf-bg-white {
  padding: 30px;
}

.tf-article-title {
  margin-top: 60px;
  margin-bottom: 30px;
  padding-bottom: 40px;
  border-bottom-width: 2px;
  border-bottom-style: dashed;
  border-bottom-color: #aaa;
}

.people-number {
  font-size: 24px;
  color: @red-dark;
}

.tf-text-grey {
  font-size: 24px;
  margin-bottom: 30px;
}

.vote-box {
  z-index: 1;
  margin-bottom: 30px;
  background-color: #fff;
  border-radius: @border-radius-md;
}

.vote-progress {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 0;
  width: 40px;
  // height: 120px;
  background-color: @red;
  opacity: 0.2;
}

.vote-title {
  flex: 1;
  justify-content: center;
  font-size: @font-size-lg;
  padding: 31px 30px;
  // height: 120px;
  line-height: 58px;
}

.vote-result {
  font-size: 30px;
  padding-right: 30px;
  color: @gray-7;
  justify-content: center;
  text-align: center;
}

.vote-btn {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 120px;
  justify-content: center;
  text-align: center;
  margin: 0;
  border-radius: 10px;
  border-width: 0px !important;
  font-size: 30px;
  color: #fff;
  background-image: linear-gradient(to bottom right, @red, @red-dark);
}

.vote-btn--multiple {
  background-image: linear-gradient(to bottom right, @orange, @orange-dark);
}

.vote-active {
  border-width: 2px;
  border-style: solid;
  border-color: @orange;
}

.vote-padding {
  padding: 30px 20px;
}
</style>

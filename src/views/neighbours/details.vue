<template>
  <div class="tf-bg">
    <van-nav-bar title="正文" :fixed="true" :border="false" left-arrow @click-left="$router.go(-1)">
      <template #right>
        <span class="tf-icon tf-icon-ellipsis" @click="moreShow = true"></span>
      </template>
    </van-nav-bar>
    <div class="tf-main-container">
      <div class="tf-card">
        <div class="tf-card-header" :class="{'border-none': category === 1 || category === 3}">
          <userInfo :avatar="info.avatar" :name="info.account" :time="info.ctime">
            <template v-slot:right>
              <div class="group-tag">公告小组</div>
            </template>
          </userInfo>
        </div>
        <template v-if="category === 1">
          <div class="article-title">聊一聊买手最爱的小众设计手表——跟买手聊一聊她们私藏的小众设计表单</div>
          <div class="article-content"></div>
        </template>
        <template v-else-if="category === 2">
          <tf-alert type="warning" content="该内容含有违规信息。" :showRight="false" :showIcon="false" size="sm"></tf-alert>
          <div class="tf-card-content">{{ info.content }}</div>
          <tf-image-list :data="info.images" mode="show"></tf-image-list>
        </template>
        <template v-else>
          <div class="article-title">高考100天抢跑冲刺计划 助力高考抢分好课限时特惠</div>
          <div class="activity-content">
            <div class="apply-box">
              <div class="apply-title">
                报名人员
                <span class="tf-text-grey">(123人)</span>
                <span class="tf-status-tag">我已报名</span>
              </div>
              <div class="apply-user">
                <img class="apply-user__avatar" src="/src/assets/app-icon.png" />
              </div>
            </div>
            <div class="apply-btn">报名</div>
          </div>
        </template>
        <div class="activity-footer">
          <div class="tf-icon tf-icon-like">{{info.thumbsups}}</div>
          <div class="tf-icon tf-icon-message">{{info.comments}}</div>
        </div>
      </div>
      <reply class="tf-mt-lg"></reply>
      <comment></comment>
    </div>
    <more-popup :moreShow.sync="moreShow" :share="true"></more-popup>
  </div>
</template>

<script>
import { NavBar, Popup } from 'vant'
import UserInfo from '@/components/user-info/index.vue'
import TfAlert from '@/components/tf-alert'
import reply from './components/reply'
import comment from './components/comment'
import morePopup from './components/morePopup'
import tfImageList from '@/components/tf-image-list'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Popup.name]: Popup,
    UserInfo,
    TfAlert,
    reply,
    comment,
    morePopup,
    tfImageList
  },
  data () {
    return {
      category: 3,
      moreShow: false,
      info: {
        id: '2',
        content:
          '在宏观调控不断深入与加强的背景下，房地产行业已经从过去的资源竞争，进入到产品竞争的阶段。对于房企而言，形成产品标准化管理体系，是快速提升房地产企业管理水平的有效捷径。',
        images: [
          'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg',
          'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg'
        ],
        category: 2,
        account: '小雪',
        avatar: 'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg',
        thumbsups: '5',
        comments: '3',
        ctime: '2020-06-03 16:35:26'
      }
    }
  }
}
</script>

<style lang='less' scoped>
.tf-main-container {
  padding-bottom: 98px;
  .tf-icon {
    color: #8F8F94;
  }
}
.tf-image-box {
  justify-content: flex-start;
  .details-image {
    width: 200px;
    height: 200px;
    margin-right: 10px;
  }
}
.activity-footer {
  margin-top: 30px;
  @flex();
  padding: 20px 0;
  border-top: 1px solid @divider-color;
  .tf-icon {
    flex: 1;
    text-align: center;
    font-size: 36px;
  }
}
.border-none {
  border-bottom: none;
}
.article-title {
  font-size: 34px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 40px;
}
.article-content {
  padding: 40px 0 10px;
  border-top: 1px solid @divider-color;
  font-size: 28px;
  color: #666;
}
.activity-content {
  @flex-column();
  align-items: center;
  .apply-box {
    width: 100%;
    background: #ffffff;
    padding: 0 20px;
    box-shadow: 0px 6px 18px 0px rgba(201, 28, 0, 0.25);
    border-radius: 4px;
    .apply-title {
      @relative();
      height: 100px;
      line-height: 100px;
      font-size: 30px;
      border-bottom: 3px solid @red;
      .tf-status-tag {
        width: auto;
        top: 20px;
        height: 60px;
        line-height: 60px;
        padding: 0 20px;
        font-size:30px;
      }
    }
    .apply-user {
      padding: 38px 0 50px;
      line-height: 1;
      &__avatar {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: @gray-7;
        margin-right: 10px;
      }
    }
  }
  .apply-btn {
    width: 150px;
    height: 150px;
    line-height: 150px;
    background-image: linear-gradient(to bottom right, @red, @red-dark);
    border: 6px solid #ffdbd9;
    border-radius: 50%;
    margin-top: 45px;
    font-size: 30px;
    color: #fff;
    text-align: center;
  }
}
.group-tag {
  height:34px;
  line-height: 34px;
  padding: 0 13px;
  text-align: center;
  border:2px solid @orange-dark;
  border-radius:10px 0px 10px 10px;
  color: @orange-dark;
  font-size: 22px;
}
</style>

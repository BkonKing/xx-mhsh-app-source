<template>
  <div class="tf-bg">
    <van-nav-bar :border="false" :fixed="true" left-text="和谐邻里" :left-arrow="false">
      <template #right>
        <span class="tf-icon tf-icon-edit" @click="goEdit"></span>
        <span class="tf-icon tf-icon-mail" @click="goMessage">
          <span v-if="status" class="van-info">2</span>
        </span>
      </template>
    </van-nav-bar>
    <van-tabs class="pt88" v-model="current" @click="onClickItem">
      <van-tab v-for="(item, i) in items" :key="i" :title="item"></van-tab>
    </van-tabs>
    <div class="main-container">
      <refreshList v-show="current === 0" :list.sync="list" @load="onLoad">
        <template v-slot="{item}">
          <div v-if="item.category === 1" class="activity-cell">
            <img class="activity-image" :src="item.images && item.images[0]" />
            <div class="tf-status-tag">活动</div>
            <div class="activity-title">{{item.content}}</div>
            <div class="activity-time">{{item.ctime}}</div>
            <div class="activity-footer">
              <div class="tf-icon tf-icon-like">{{item.thumbsups}}</div>
              <div class="tf-icon tf-icon-message">{{item.comments}}</div>
            </div>
          </div>
          <div v-else-if="item.category === 2">
            <div class="tf-card">
              <div class="tf-card-header">
                <userInfo :avatar="item.avatar" :name="item.account" :time="item.ctime">
                  <template v-slot:right>
                    <div class="tf-icon">2</div>
                  </template>
                </userInfo>
              </div>
              <div class="tf-card-content">{{ item.content }}</div>
              <div class="tf-image-box">
                <img
                  class="details-image"
                  mode="aspectFill"
                  v-for="(item, i) in item.images"
                  :key="i"
                  :src="item.src"
                  v-if="i < 3"
                />
                <div
                  class="details-image--shade"
                  v-if="item.images.length > 3"
                >+{{ item.images.length - 3 }}</div>
              </div>
              <div class="activity-footer">
                <div class="tf-icon tf-icon-like">{{item.thumbsups}}</div>
                <div class="tf-icon tf-icon-message">{{item.comments}}</div>
                <div class="tf-icon tf-icon-ellipsis" @click="moreShow = true"></div>
              </div>
            </div>
          </div>
          <div class="activity-cell" v-else>
            <img class="activity-image" :src="item.images && item.images[0]" />
            <div class="tf-status-tag">资讯</div>
            <div class="activity-title">{{item.content}}</div>
            <div class="activity-footer">
              <div class="tf-icon tf-icon-like">{{item.thumbsups}}</div>
              <div class="tf-icon tf-icon-message">{{item.comments}}</div>
            </div>
          </div>
        </template>
      </refreshList>
      <div class="group-box" v-show="current === 1">
        <div class="group-item" v-for="item in group" :key="item.id">
          <img class="group-img" :src="item.icon_images" />
          <div class="group-name">{{item.category}}</div>
        </div>
      </div>
    </div>
    <van-popup class="more-dialog" v-model="moreShow">
      <div class="more-btn" @click="complain">投诉</div>
      <div class="more-btn tf-text-primary">删除</div>
    </van-popup>
    <van-popup
      class="complain-dialog"
      v-model="complainShow"
      closeable
      close-icon="close"
      position="bottom"
    >
      <div class="complain-title">投诉</div>
      <div class="complain-content"></div>
      <tf-radio-btn :data="types" @change="handRadioChange"></tf-radio-btn>
    </van-popup>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs, Popup } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import UserInfo from '@/components/user-info/index.vue'
import tfRadioBtn from '@/components/tf-radio-btn/index.vue'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Popup.name]: Popup,
    refreshList,
    tfRadioBtn,
    UserInfo
  },
  data () {
    return {
      status: 1,
      items: ['最新', '小组', '活动', '资讯'],
      current: 0,
      list: [
        {
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
        },
        {
          id: '3',
          content:
            '在宏观调控不断深入与加强的背景下，房地产行业已经从过去的资源竞争，进入到产品竞争的阶段。对于房企而言，形成产品标准化管理体系，是快速提升房地产企业管理水平的有效捷径。',
          images: [
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg',
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg'
          ],
          category: 3,
          account: '小雪',
          avatar: 'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg',
          thumbsups: '5',
          comments: '3',
          ctime: '2020-06-03 16:35:26'
        }
      ],
      group: [
        {
          id: '1',
          category: '爱分享',
          icon_images:
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg'
        },
        {
          id: '2',
          category: '爱分享',
          icon_images:
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg'
        },
        {
          id: '3',
          category: '爱分享',
          icon_images:
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg'
        }
      ],
      moreShow: false,
      complainShow: false,
      types: [
        {
          value: 1,
          name: '垃圾营销'
        },
        {
          value: 2,
          name: '涉黄信息'
        },
        {
          value: 3,
          name: '不实信息'
        },
        {
          value: 4,
          name: '不实信息'
        },
        {
          value: 5,
          name: '人身攻击'
        },
        {
          value: 6,
          name: '违法信息'
        },
        {
          value: 7,
          name: '诈骗信息'
        },
        {
          value: 8,
          name: '泄露隐私'
        }
      ]
    }
  },
  methods: {
    onLoad () {},
    goEdit () {
      this.$router.push('/pages/personage/message/index')
    },
    goMessage () {
      this.$router.push('/pages/personage/message/index')
    },
    onClickItem (currentIndex) {
      if (this.current !== currentIndex) {
        this.current = currentIndex
      }
    },
    moreOperation () {},
    complain () {
      this.moreShow = false
      this.complainShow = true
    },
    // 选择类型
    handRadioChange (value) {
      this.category_id = value
    }
  }
}
</script>

<style lang="less" scoped>
.pt88 {
  padding-top: 88px;
}
.tf-icon-mail {
  @relative();
  margin-right: 27px;
}
.tf-bg {
  @flex-column();
}
.main-container {
  flex: 1;
  padding: 20px 0;
  overflow: hidden;
}
/deep/ .van-nav-bar__text {
  font-size: 34px;
  font-weight: bold;
}
.tf-card-header {
  border-bottom: none;
  padding-bottom: 0;
}
.activity-cell {
  width: 100%;
  background: #fff;
  border-radius: 10px;
  padding: 30px 30px 0;
  .activity-image {
    width: 100%;
    height: 365px;
    margin-bottom: 10px;
  }
  .activity-title {
    font-size: 30px;
    font-weight: 500;
    @text-ellipsis();
    margin-bottom: 10px;
  }
  .activity-time {
    font-size: 24px;
    color: @gray-7;
    margin-bottom: 10px;
  }
}
.activity-footer {
  margin-top: 20px;
  @flex();
  padding: 20px 0;
  border-top: 1px solid @divider-color;
  .tf-icon {
    text-align: center;
    width: 33.3%;
    font-size: 36px;
  }
}
.tf-status-tag {
  top: 50px;
  right: 20px;
  width: 120px;
  background-image: linear-gradient(
    to right,
    rgba(249, 134, 107, 1),
    rgba(235, 88, 65, 1)
  );
}
.details-image {
  width: 200px;
  height: 200px;
}

.details-image--shade {
  position: absolute;
  width: 200px;
  height: 200px;
  line-height: 200px;
  z-index: 1;
  background-color: #000000;
  opacity: 0.6;
  top: 0;
  right: 0;
  text-align: center;
  color: #fff;
  font-size: 54px;
}

/* 小组 */
.group-box {
  @flex();
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px 30px;
  .group-item {
    position: relative;
    width: 335px;
    height: 168px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.6);
    margin-bottom: 20px;
  }
  .group-img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .group-name {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: @font-size-md;
    font-weight: 500;
    line-height: 168px;
    text-align: center;
    color: #fff;
  }
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
  .tf-text-primary {
    border-top: 1px solid @divider-color;
  }
}

/* 投诉弹窗 */
.complain-dialog {
  padding: 0 30px;
  height: 30%;
  .complain-title {
    height: 90px;
    line-height: 90px;
    font-size: @font-size-md;
    text-align: center;
    border-bottom: 1px solid @divider-color;
  }
  /deep/ .radio-btn-group {
    .radio-btn__item {
    }
  }
}
</style>

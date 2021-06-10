<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="屏蔽设置"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-time-circle"></span>
      </template>
    </van-nav-bar>
    <van-tabs class="tf-body-container tf-flex-column" v-model="current">
      <van-tab class="user-tab" title="用户">
        <refreshList
          ref="list"
          :list.sync="shieldingUserList"
          :load="getShieldingUserList"
        >
          <template v-slot="{ item, index }">
            <div class="tf-card" @click="openRemove(item, index)">
              <userInfo
                :avatar="item.avatar"
                :name="item.nickname"
                :time="item.ctime"
              ></userInfo>
            </div>
          </template>
        </refreshList>
      </van-tab>
      <van-tab title="动态">
        <refreshList
          class="reply-list"
          :list.sync="shieldingInfoList"
          :load="getShieldingInfoList"
        >
          <template v-slot="{ item, index }">
            <!-- 帖子 -->
            <div
              class="tf-card"
              v-if="item.sub_type == 1 || item.sub_type == 6 || item.sub_type == 7"
              @click="openRemove(item, index)"
            >
              <div class="tf-card-header">
                <userInfo
                  :avatar="item.avatar"
                  :name="item.nickname"
                  :time="item.ctime"
                >
                  <template v-slot:right>
                    <div v-if="item.article_type == 3" class="group-tag">
                      {{ item.category }}
                    </div>
                  </template>
                </userInfo>
              </div>
              <img
                class="thumbnail-image"
                v-if="item.thumbnail"
                :src="item.thumbnail"
              />
              <div
                v-if="item.content"
                class="tf-card-content"
                v-html="item.content"
              ></div>
              <template v-if="item.images">
                <img
                  width="33%"
                  :src="item.images[0]"
                  v-if="item.images.length === 1"
                />
                <tf-image-list
                  class="tf-mt-base"
                  mode="shadeShow"
                  v-else-if="item.images.length > 1"
                  :data="item.images"
                ></tf-image-list>
              </template>
            </div>
            <!-- 评论回复 -->
            <div
              v-else
              class="reply-cell-content"
              @click="openRemove(item, index)"
            >
              <userInfo
                :avatar="item.avatar || ''"
                :name="item.nickname"
                :time="item.ctime"
                size="m"
              ></userInfo>
              <div class="reply-cell-content__text">{{ item.content }}</div>
              <div
                v-if="item.images && item.images.length > 0"
                class="reply-cell-content__img-box"
              >
                <img class="reply-cell-content__img" :src="item.images[0]" />
              </div>
              <div class="reply-cell-content__reply">
                <span class="tf-text">
                  <strong style="color: #222">{{ item.yh_nickname }}</strong
                  >：
                </span>
                {{ item.yh_content }}
              </div>
            </div>
          </template>
        </refreshList>
      </van-tab>
    </van-tabs>
    <van-popup class="operate-dialog" v-model="shieldPopup">
      <div class="operate-text van-ellipsis">
        <template v-if="active.uid">@{{ active.nickname }}</template>
        <template v-else
          >@{{ active.nickname }}：{{
            active.content && active.content.replace(/<.*?>/gi, "")
          }}</template
        >
      </div>
      <div class="operate-text operate-btn" @click="removeShielding">
        解除屏蔽
      </div>
    </van-popup>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs, Popup, Toast } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import tfImageList from '@/components/tf-image-list'
import userInfo from '@/components/user-info'
import {
  getShieldingInfoList,
  getShieldingUserList,
  removeShielding
} from '@/api/neighbours'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Popup.name]: Popup,
    refreshList,
    tfImageList,
    userInfo
  },
  data () {
    return {
      shieldingInfoList: [],
      shieldingUserList: [],
      current: 0,
      shieldPopup: false,
      active: {},
      activeIndex: 0
    }
  },
  created () {},
  methods: {
    getShieldingInfoList (params) {
      return getShieldingInfoList(params)
    },
    getShieldingUserList (params) {
      return getShieldingUserList(params)
    },
    openRemove (item, index) {
      this.active = item
      this.activeIndex = index
      this.shieldPopup = true
    },
    removeShielding () {
      removeShielding({
        shielding_id: this.active.shielding_id
      }).then(res => {
        Toast.success('解除屏蔽成功')
        if (this.current) {
          this.shieldingInfoList.splice(this.activeIndex, 1)
        } else {
          this.shieldingUserList.splice(this.activeIndex, 1)
        }
        this.shieldPopup = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tf-card-header {
  border-bottom: none;
  padding-bottom: 0;
}
.group-tag {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  padding: 0 14px;
  text-align: center;
  font-size: 24px;
  color: #ff6555;
  background: #ffedeb;
  border-radius: 4px;
}
.reply-cell-content {
  padding: 30px;
  background: #fff;
  &__text {
    margin-top: 30px;
    margin-left: 86px;
    font-size: 26px;
    line-height: 1.8;
  }
  &__reply {
    margin-top: 30px;
    margin-left: 86px;
    font-size: 26px;
    line-height: 1.8;
    background: #f2f2f4;
    padding: 25px 20px;
    border-radius: 4px;
    @text-ellipsis();
  }
  &__img-box {
    margin-top: 30px;
    padding-left: 86px;
    line-height: 1;
  }
  &__img {
    width: 203px;
    height: 203px;
  }
}
/deep/ .van-tabs__content {
  flex: 1;
  max-height: calc(100% - 98px);
  .van-tab__pane {
    height: 100%;
  }
}
.user-tab {
  .tf-card {
    padding: 20px;
  }
}
.operate-dialog {
  width: 500px;
  padding: 0 30px;
  border-radius: 10px;
  .operate-text {
    height: 120px;
    line-height: 120px;
    text-align: center;
    font-size: 30px;
  }
  .operate-btn {
    color: @red-dark;
  }
  .van-ellipsis {
    width: 100%;
  }
  .operate-text + .operate-text {
    border-top: 1px solid @divider-color;
  }
}
.tf-card {
  padding-bottom: 30px;
}
.tf-card-content {
  padding: 0;
  margin-top: 30px;
  .text-multiple-ellipsis(3);
}
.thumbnail-image {
  display: block;
  width: 100%;
  height: 365px;
  margin-top: 30px;
  object-fit: cover;
}
</style>

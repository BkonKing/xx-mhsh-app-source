<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar
      title="任务可见群"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <van-button
          @click="sure"
          class="sure-btn"
          :class="{'able': groupIndex !== -1}"
          :disabled="groupIndex === -1"
          >确定</van-button
        >
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <div class="group-list">
        <div v-for="(item, index) in listData" :key="index" class="group-item">
          <div @click="selectGroup(index)" class="check-block tf-row-center">
            <div :class="{ cur: groupIndex == index }">
              <span class="tf-icon tf-icon-gou"></span>
            </div>
          </div>
          <div class="group-cont">
            <div class="group-name van-ellipsis">{{ item.group_name }}</div>
            <div class="group-user tf-row-vertical-center">
              <div
                v-for="(item2, index2) in item.user_list"
                :key="index2"
                class="user-pic tf-row"
              >
                <van-image :src="item2.avatar">
                  <template v-slot:error>
                    <img
                      class="avatar-img"
                      src="@/assets/imgs/touxiang.png"
                      alt=""
                    />
                  </template>
                </van-image>
              </div>
              <div class="group-num">({{ item.member_num }}人)</div>
            </div>
          </div>
        </div>
        <!-- <div class="group-item">
          <div class="check-block tf-row-center">
            <div><span class="tf-icon tf-icon-gou"></span></div>
          </div>
          <div class="group-cont">
            <div class="group-name van-ellipsis">天福家园</div>
            <div class="group-user tf-row-vertical-center">
              <div class="user-pic tf-row">
                <div><img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" /></div>
                <div><img src="https://test.tosolomo.com/upload/images/202103/18/1616052619_590334.jpg" /></div>
                <div><img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" /></div>
                <div><img src="https://test.tosolomo.com/upload/images/202009/14/1600052648_479689.jpg" /></div>
              </div>
              <div class="group-num">(20人)</div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="test" :class="{ 'test-over': isOver }" ref="test">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import { getGroupList } from '@/api/task.js'
export default {
  components: {
    [NavBar.name]: NavBar
  },
  data () {
    return {
      listData: [],
      groupIndex: -1, // 选中项
      text: '',
      isOver: false
    }
  },
  created () {
    this.getData()
  },
  mounted () {},
  methods: {
    getData () {
      getGroupList().then(res => {
        this.listData = res.data
        const groupInfo = this.$store.state.groupInfo
        if (groupInfo) {
          if (this.listData.length) {
            for (let i = 0; i < this.listData.length; i++) {
              if (this.listData[i].id == groupInfo.id) {
                this.groupIndex = i
                break
              }
            }
          } else {
            this.$store.commit('setGroupInfo', '')
          }
        }
      })
      // this.text = '天福家园天福家园天福家园天福家园天福家园天福家园天福家园天福家园天福家园天福家园天福家园天福家园天福家园天福家园天福家园天福家园天福家园'
      // this.$nextTick(() => {
      //   this.test = this.$refs.test
      //   console.log(this.test.clientHeight)
      //   const textHeight = this.test.clientHeight * 750 / document.documentElement.clientWidth
      //   console.log(textHeight)
      //   if (textHeight > 60) {
      //     this.isOver = true
      //   }
      // this.showDetailBtn = this.detailDom.clientHeight < this.detailDom.scrollHeight;
      // })
    },
    // 选择群组
    selectGroup (index) {
      this.groupIndex = index
    },
    // 确认
    sure () {
      this.$store.commit('setGroupInfo', this.listData[this.groupIndex])
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.tf-body-container {
  padding: 0 20px 20px;
  font-size: 28px;
  color: #333;
  background-color: #f7f7f7;
}
.sure-btn {
  width: 100px;
  height: 56px;
  line-height: 56px;
  text-align: center;
  background: #cccccc;
  border-radius: 10px;
  border: none;
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
  opacity: 1;
  &.able {
    background: #ff6555;
  }
}
.group-list {
  padding-top: 32px;
  .group-item {
    width: 710px;
    margin: 0 auto 30px;
    padding: 40px 0;
    height: 189px;
    background: #ffffff;
    border-radius: 10px;
    @flex();
    .check-block {
      align-items: center;
      height: 100%;
      width: 96px;
      div {
        width: 36px;
        height: 36px;
        border: 1px solid #8f8f94;
        border-radius: 50%;
        span {
          display: none;
        }
        &.cur {
          background-color: #ff6555;
          border: 0;
          color: #fff;
          text-align: center;
          line-height: 36px;
          font-weight: bold;
          span {
            display: inline;
          }
        }
      }
    }
    .group-cont {
      flex-grow: 1;
      max-width: 584px;
    }
    .group-name {
      font-size: 32px;
      line-height: 32px;
      margin-bottom: 28px;
      font-weight: bold;
      color: #222222;
    }
    .group-user {
      height: 48px;
    }
    .user-pic {
      // margin-right: 30px;
      /deep/ .van-image__error {
        position: initial;
        background: initial;
      }
      .avatar-img,
      & > div {
        height: 48px;
        width: 48px;
        border-radius: 50%;
        position: relative;
      }
      & > div + div {
        margin-left: -10px;
      }
      div:nth-child(5)::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0%,
          #ffffff 100%
        );
      }
    }
    .user-pic + .user-pic {
      margin-left: -10px;
    }
    .group-num {
      margin-left: 30px;
      font-size: 24px;
      color: @gray-7;
    }
  }
}

.test {
  // height: 60px;
  width: 500px;
  background-color: #ccc;
  line-height: 30px;
  font-size: 24px;
  &.test-over {
    height: 60px;
    overflow: hidden;
  }
}
</style>

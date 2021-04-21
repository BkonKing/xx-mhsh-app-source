<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar
      title="任务进度"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <div class="tel-btn"><img src="@/assets/img/task_10.png" /></div>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <div class="status-block tf-row-space-between">
        <div class="status-list tf-row-vertical-center">
          <div class="status-item">待交付(2)</div>
          <div class="status-item">暂停中(1)</div>
          <div class="status-item">已完成(1)</div>
        </div>
        <!-- <div class="status-select">已接单 (3)</div><img src="" /> -->
        <van-dropdown-menu active-color="#8F8F94">
          <van-dropdown-item :title="statusName" ref="item">
            <div class="status-option">
              <div @click="statusChange(index)" v-for="(item, index) in statusList" :key="index" class="option-item" :class="{ 'active': statusIndex==index }">
                <div>{{ item.value }}</div>
                <div>{{ item.text }}</div>
              </div>
            </div>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
      <div class="user-list">
        <div class="user-item tf-column active">
          <img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" />
          <div class="van-ellipsis user-name">我我我我我我我我我我</div>
          <div class="user-status color-FF5240">已接单</div>
        </div>
        <div class="user-item tf-column">
          <img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" />
          <div class="van-ellipsis user-name">我我我我我我我我我我</div>
          <div class="user-status">已接单</div>
        </div>
        <div class="user-item tf-column">
          <img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" />
          <div class="van-ellipsis user-name">我我我我我我我我我我</div>
          <div class="user-status">已接单</div>
        </div>
        <div class="user-item tf-column">
          <img src="http://develop.mhshjy.com/library/bootstrap/img/user/user-13.jpg" />
          <div class="van-ellipsis user-name">我我我我我我我我我我</div>
          <div class="user-status">已接单</div>
        </div>
      </div>
      <op></op>
    </div>
    <task-popup v-model="popupShow" :titName="overTit" :subTitName="overSubTit">
      <div slot="content" class="popup-cont">
        <div class="form-label">是否延长期限<span>*</span></div>
        <div class="radio-block tf-row">
          <div v-for="(item, index) in overList" :key="index" @click="overIndex=index" class="popup-radio tf-row-vertical-center" :class="{'active': index == overIndex}">
            <div></div>
            <div>{{ item }}</div>
          </div>
        </div>
        <div v-show="overIndex == 1">
          <div class="form-label">是否奖励幸福币<span>*</span></div>
          <div class="radio-block tf-row">
            <div v-for="(item, index) in coinList" :key="index" @click="coinIndex=index" class="popup-radio tf-row-vertical-center" :class="{'active': index == coinIndex}">
              <div></div>
              <div>{{ item }}</div>
            </div>
          </div>
          <div class="coin-tip">
            <div v-show="coinIndex == 0" class="all-tip">奖励每人1000幸福币</div>
            <van-field v-show="coinIndex == 1" v-model="digit" type="digit" placeholder="奖励每人数量，需小于1000幸福币">
              <div slot="extra" class="coin-unit">币</div>
            </van-field>
          </div>
        </div>
        <div v-show="overIndex == 0" class="select-block tf-row">
          <div class="popup-select tf-row-space-between">
            请选择
            <img src="@/assets/img/task_14.png" />
          </div>
          <div class="select-lable">天</div>
          <div class="popup-select tf-row-space-between">
            请选择
            <img src="@/assets/img/task_14.png" />
          </div>
          <div class="select-lable">小时</div>
        </div>
        <div class="task-btn">确定</div>
      </div>
    </task-popup>
    <task-picker v-model="pcikerShow" :list="[1,23,4]"></task-picker>
    <task-popup v-model="endShow" :titName="endTit" :subTitName="endSubTit">
      <div slot="content" class="popup-cont end-cont">
        <div class="form-label">淘汰原因<span>*</span></div>
        <div class="select-block tf-row">
          <div class="popup-select tf-row-space-between">
            请选择
            <img src="@/assets/img/task_09.png" />
          </div>
        </div>
        <div class="form-label">补充说明</div>
        <graphic
          phTxt="请输入"
          :maxNum="200"
          @getForm="getForm"
        ></graphic>
        <div class="task-btn">确定</div>
      </div>
    </task-popup>
  </div>
</template>

<script>
import {
  NavBar,
  DropdownMenu,
  DropdownItem,
  Picker
} from 'vant'
import op from '../components/op'
import taskPopup from '../components/task-popup'
import taskPicker from '../components/task-picker'
import graphic from '../components/graphic'
export default {
  components: {
    [NavBar.name]: NavBar,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Picker.name]: Picker,
    op,
    taskPopup,
    taskPicker,
    graphic
  },
  data () {
    return {
      endShow: false, // 淘汰弹窗
      endTit: '淘汰接单者', // 淘汰标题
      endSubTit: '请先与对方沟通协商', // 淘汰标题
      popupShow: true, // 超时弹窗
      status: 0,
      statusName: '状态',
      statusIndex: -1,
      statusList: [
        { text: '全部', value: 0 },
        { text: '已接单', value: 1 },
        { text: '进行中', value: 2 },
        { text: '暂停中', value: 0 },
        { text: '已完成', value: 1 },
        { text: '已终止', value: 2 },
        { text: '已放弃', value: 0 },
        { text: '已淘汰', value: 1 }
      ],
      overTit: '任务超时', // 超时标题
      overSubTit: '超时1小时10分钟 剩余3人未交付', // 超时标题
      pcikerShow: false, // 超时延迟时间选择
      overList: ['延期', '终止任务'],
      overIndex: 0, // 0延期 1终止任务
      coinList: ['奖励全部', '奖励部分', '不奖励'],
      coinIndex: 0 // 0奖励全部 1奖励部分 2不奖励
    }
  },
  created () {
    this.getData()
  },
  mounted () {

  },
  methods: {
    getData () {

    },
    statusChange (index) {
      this.statusIndex = index
      this.statusName = `${this.statusList[this.statusIndex].text} (${this.statusList[this.statusIndex].value})`
    }
  }
}
</script>
<style lang="less" scoped>
.tf-body-container{
  font-size: 28px;
  color: #333;
  background-color: #F7F7F7;
}
/deep/ .van-nav-bar__right {
  padding: 0;
  .tel-btn {
    padding: 16px 20px;
    display: flex;
    img {
      width: 36px;
      height: 36px;
    }
  }
}
.status-block {
  height: 88px;
  align-items: center;
  background-color: #fff;
  padding: 0 20px;
  margin-bottom: 30px;
  .status-list {
    .status-item {
      font-size: 26px;
      color: #000000;
      margin-right: 40px;
    }
  }
  .status-select {
    width: 200px;
    height: 64px;
    background: #F7F7F7;
    border-radius: 32px;
    position: relative;
    padding-right: 64px;
    text-align: right;
    line-height: 64px;
    color: #8F8F94;
    font-size: 24px;
  }
  /deep/.van-dropdown-menu {
    .van-dropdown-menu__bar {
      width: 200px;
      height: 64px;
      background: #F7F7F7;
      border-radius: 32px;
    }
    .van-dropdown-menu__title {
      width: 100%;
      padding: 0 34px 0 0;
      text-align: center;
      font-size: 24px;
      &.van-dropdown-menu__title--active::after {
        border-width: 0 7px 12px 7px;
        border-color: transparent transparent #8F8F94 transparent;
      }
      &::after {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 12px 7px 0 7px;
        border-color: #8F8F94 transparent transparent transparent;
        margin-top: 0;
        transform: translate(0, -50%);
        right: 20px;
      }
    }
    .status-option {
      height: 351px;
      padding: 40px 20px 10px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .option-item {
        width: 155px;
        height: 120px;
        background: #F7F7F7;
        border: 1PX solid #F7F7F7;
        border-radius: 10px;
        margin-bottom: 30px;
        display: flex;
        @flex-column();
        justify-content: center;
        align-items: center;
        &.active {
          border: 1PX solid #000000;
        }
        div {
          line-height: 44px;
        }
        div:nth-child(1) {
          font-size: 32px;
          font-weight: 500;
          color: #000000;
        }
        div:nth-child(2) {
          font-size: 24px;
          font-weight: 500;
          color: #8F8F94;
        }
      }
    }
  }
}
.user-list {
  padding-left: 20px;
  margin-bottom: 30px;
  @flex();
  overflow-x: auto;
  .user-item {
    width: 200px;
    height: 240px;
    background: #FFFFFF;
    border-radius: 10px;
    margin-right: 20px;
    align-items: center;
    flex-shrink: 0;
    &.active {
      background: linear-gradient(45deg, #FFD34D 0%, #FEBF00 100%);
      box-shadow: 0px 10px 20px 0px rgba(232, 174, 0, 0.3);
    }
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: fill;
      margin: 30px 0 10px;
    }
    .user-name,.user-status {
      color: #000000;
      line-height: 44px;
      font-size: 24px;
      max-width: 152px;
      margin-bottom: 10px;
    }
    .user-status {
      &.color-FF5240 {
        color: #FF5240;
      }
    }
  }
}
.radio-block {
  // margin-bottom: 40px;
}
.popup-radio {
  height: 50px;
  font-size: 28px;
  div:first-child {
    width: 30px;
    height: 30px;
    border: 1PX solid #000000;
    border-radius: 15px;
    margin-right: 10px;
    position: relative;
  }
  div:nth-child(2) {
    line-height: 50px;
  }
  &:nth-child(1) {
    width: 180px;
  }
  &:nth-child(2) {
    width: 194px;
  }
  &.active div:first-child {
    border-color: #FF5240;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 12px;
      height: 12px;
      background: #FF6555;
      border-radius: 50%;
    }
  }
}
.select-block {
  margin: 40px 0 60px;
  .popup-select {
    width: 180px;
    height: 80px;
    border: 1PX solid #CCCCCC;
    border-radius: 10px;
    color: #8F8F94;
    padding-left: 20px;
    line-height: 76px;
    align-items: center;
    img {
      width: 21px;
      height: 12px;
      margin-right: 15px;
    }
  }
  .select-lable {
    padding-left: 20px;
    min-width: 73px;
    line-height: 80px;
  }
}
.coin-tip {
  margin: 20px 0 60px;
  .all-tip {
    color: #8F8F94;
    padding-left: 39px;
    line-height: 24px;
  }
  /deep/.van-cell {
    padding: 0 0 0 20px;
    height: 80px;
    background: #FFFFFF;
    border: 1PX solid #CCCCCC;
    border-radius: 10px;
    .van-field__body {
      height: 100%;
      input {
        font-size: 24px;
      }
    }
  }
  .coin-unit {
    line-height: 76px;
    font-weight: 500;
    font-size: 28px;
    padding-right: 30px;
    color: #000000;
  }
}

.end-cont {
  .select-block {
    margin: 0;
    .popup-select {
      flex: 1;
      img {
        width: 36px;
        height: 36px;
        margin-right: 18px;
      }
    }
  }
  /deep/.task-card {
    width: 100%;
    margin-bottom: 10px;
    .text-block {
      width: 500px;
      min-height: 260px;
      border: 1PX solid #CCCCCC;
      border-radius: 10px;
      margin-bottom: 30px;
      overflow: hidden;
      textarea {
        min-height: 200px;
      }
    }
    .van-cell {
      height: 210px;
      padding: 16px 20px 0 30px;
    }
    .text-num {
      margin-bottom: 0;
      padding-right: 20px;
    }
    .divider-line {
      display: none;
    }
    .pic-block {
      padding-left: 0;
      padding-bottom: 0;
      .van-uploader__upload,
      .van-uploader__preview {
        width: 112px;
        height: 112px;
        margin: 0 16px 20px 0;
      }
    }
  }
}
</style>

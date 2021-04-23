<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar :fixed="true" placeholder :border="false">
      <template #left>
        <span class="tf-icon tf-icon-guanbi" @click="closePage"></span>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <type-select></type-select>
      <task-card cardTit="任务标题" :required="true">
        <div class="card-cont" slot="content">
          <div class="area-block bottom-line tf-row-space-between">
            <van-field
              v-model.trim="formData.title"
              autosize
              rows="1"
              :border="false"
              type="textarea"
            />
            <div class="text-num tf-row">
              <div><span :class="{'red': formData.title.length > 10}">{{ formData.title.length }}</span>/20</div>
            </div>
          </div>
          <div class="reward-block bottom-line">
            <div class="card-tit">奖励幸福币(每人)<span class="tit-icon">*</span></div>
            <van-field v-model="formData.coin" type="number" />
          </div>
          <div class="card-tip">同类型任务参考价<span>500~1000</span>幸福币，请参考此价格设置奖励</div>
        </div>
      </task-card>
      <task-card cardTit="任务标签">
        <div class="card-cont" slot="content">
          <div class="label-block tf-row-space-between">
            <div class="area-block bottom-line tf-row-space-between">
              <van-field v-model="labelVal" type="text" />
              <div class="text-num tf-row">
                <div><span :class="{'red': labelVal.length > 10}">{{ labelVal.length }}</span>/10</div>
              </div>
            </div>
            <div @click="labelAdd" class="task-btn label-add" :class="{'label-unable': !addStatus}">添加</div>
          </div>
          <div v-if="labelList.length" class="label-list tf-row">
            <div class="label-item tf-row" v-for="(item, index) in labelList" :key="index">{{ item.value }}<img @click="labelDel(index)" src="@/assets/img/close_04.png" /></div>
          </div>
          <div class="card-tip">最多可添加5个标签</div>
        </div>
      </task-card>
      <task-card>
        <div class="card-cont" slot="content">
          <div class="cell-item tf-row">
            <div class="item-left">需要人数</div>
            <div class="item-cont num-step">
              <van-stepper v-model="value" />
            </div>
          </div>
          <div @click="dateShow=true" class="cell-item tf-row">
            <div class="item-left">完成时间<span class="tit-icon">*</span></div>
            <div class="item-cont">{{ completeTime }}</div>
            <div class="item-arrow"><i class="van-icon van-icon-arrow"></i></div>
          </div>
          <div class="cell-item tf-row">
            <div class="item-left">完成地点</div>
            <div class="item-cont p-30">
              <div>三盛滨江国际1号楼 线下科技</div>
              <div>福建省 福州市 仓山区</div>
            </div>
            <div class="item-arrow"><i class="van-icon van-icon-location"></i></div>
          </div>
          <div class="cell-item">
            <div @click="selectShow=true" class="tf-row cell-limit">
              <div class="item-left">可见范围</div>
              <div class="item-cont">{{ ableLookVal }}</div>
              <div class="item-arrow"><i class="van-icon van-icon-arrow"></i></div>
            </div>
            <div class="limit-tip card-tip">可针对指定地区或用户进行可见，其他用户将无法看到和接单</div>
          </div>
        </div>
      </task-card>
      <task-card :required="true">
        <div class="card-cont" slot="content">
          <div @click="telShow=true" class="cell-item cell-tel tf-row">
            <div class="item-left">联系电话<span class="tit-icon">*</span></div>
            <div class="item-cont">{{ telLimt }}</div>
            <div class="item-arrow"><i class="van-icon van-icon-arrow"></i></div>
          </div>
          <div class="area-block bottom-line tf-row-space-between">
            <van-field v-model="formData.tel" type="tel" />
          </div>
          <div class="card-tip">请填写有效的手机号码，以便联系</div>
        </div>
      </task-card>
      <graphic
        :cardTit="cardTit"
        :phTxt="phTxt"
        :maxNum="maxNum"
        @getForm="getForm"
      ></graphic>
      <div class="task-btn-block">
        <div @click="submit" :class="[ radioIndex > -1 && formData.content ? '' : 'unable-btn', 'task-btn']">发布</div>
      </div>
      <!-- <div @click="selectShow=true">xuanz</div> -->
    </div>
    <date-picker :dateShow="dateShow"></date-picker>
    <area-picker v-model="areaShow" @areaSure="areaSure"></area-picker>
    <list-select v-model="selectShow" @selectCall="selectCall" :selectList="selectList"></list-select>
    <list-select v-model="telShow" @selectCall="telCall" :selectList="telList"></list-select>
    <project v-model="projectShow"></project>
  </div>
</template>

<script>
import taskCard from '../components/task-card'
import typeSelect from '../components/type-select'
import graphic from '../components/graphic'
import datePicker from '../components/date-picker'
import areaPicker from '../components/area-picker'
import listSelect from '../components/list-select'
import project from '../components/project'
import {
  NavBar,
  Stepper
} from 'vant'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Stepper.name]: Stepper,
    taskCard,
    typeSelect,
    graphic,
    datePicker,
    areaPicker,
    listSelect,
    project
  },
  data () {
    return {
      radioIndex: 0, // 类型选中项
      userNum: 1, // 人数
      labelVal: '', // 标签
      labelList: [], // 标签列表
      cardTit: '任务说明',
      phTxt: '请输入任务说明',
      maxNum: 1000, // 任务说明最大长度
      formData: {
        title: ''
      },
      telList: [
        {
          value: 0,
          text: '公开',
          detail: '所有任务可见人都可见'
        },
        {
          value: 1,
          text: '隐藏',
          detail: '仅已接单用户可见'
        }
      ], // 电话设置
      telShow: false, // 电话设置
      selectList: [
        {
          value: 0,
          text: '不限'
        },
        {
          value: 1,
          text: '指定地区'
        },
        {
          value: 2,
          text: '指定小区'
        },
        {
          value: 3,
          text: '指定人群'
        }
      ],
      dateShow: false, // 时间筛选
      completeTime: '', // 完成时间
      ableLookVal: '不限',
      selectShow: false, // 可见范围
      areaShow: false, // 可见范围-指定地区
      projectShow: false, // 小区
      telLimt: '公开'
    }
  },
  computed: {
    addStatus () {
      return (this.labelVal.length > 0 && this.labelVal.length < 11 && this.labelList.length < 5)
    }
  },
  created () {
    // this.category_id = this.$route.query.category_id || ''
    // this.getPostBarCategoryList()
  },
  methods: {
    // 图文信息
    getForm (val) {
      this.formData = Object.assign(this.formData, val)
      this.textNum = val.content.length
    },
    // 添加标签
    labelAdd () {
      if (this.labelVal.length > 0 && this.labelVal.length < 11 && this.labelList.length < 5) {
        this.labelList.push({ value: this.labelVal })
        this.labelVal = ''
      }
    },
    // 删除标签
    labelDel (index) {
      this.labelList.splice(index, 1)
    },
    // 弹窗选择-可见范围
    selectCall (callData) {
      if (callData.value == 1) { // 指定地区
        this.areaShow = true
      } else if (callData.value == 2) {
        this.projectShow = true
      }
    },
    // 地区选择
    areaSure (callData) {
      console.log(callData)
      let value = '不限'
      if (callData[0] && callData[0].name) {
        value = callData[0].name
        if (callData[1] && callData[1].name) {
          value += ('-' + callData[1].name)
          if (callData[2] && callData[2].name) {
            value += ('-' + callData[2].name)
          }
        }
      }
      console.log(value)
      this.ableLookVal = value
    },
    // 弹窗选择-可见范围
    telCall (callData) {
      this.telLimt = callData.text
    },
    // 提交
    submit () {
      // const typeId = this.radioIndex
      // const validator = [
      //   {
      //     value: typeId,
      //     message: '请选择发布类型'
      //   },
      //   {
      //     value: this.formData.content,
      //     message: '请输入要发布的内容'
      //   }
      // ]
      // validForm(validator).then((res) => {
      //   if (this.textNum > 500) {
      //     Toast('字数太多啦，分享的内容最多500字')
      //   } else {
      //   }
      // })
    },
    closePage () {
      // console.log(this.radioIndex > -1, this.formData.content, this.images.length)
      // if (this.radioIndex > -1 || this.formData.content || this.images.length) {
      //   this.confirmShow = true
      // } else {
      //   this.$router.go(-1)
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.tf-body-container{
  padding: 20px;
  background-color: #F7F7F7;
}
/deep/ .van-nav-bar {
  .van-nav-bar__left  {
    padding-left: 20px;
    .tf-icon{
      color: #000;
      font-size: 30px;
    }
  }
}
.card-cont {
  padding: 0 30px;
}
.area-block {
  padding-top: 26px;
  min-height: 76px;
  position: relative;
  .text-num {
    flex-shrink: 0;
    font-size: 24px;
    line-height: 36px;
    color: #7A7A7E;
    position: absolute;
    bottom: 14px;
    right: 0;
    background-color: #fff;
  }
}
.bottom-line {
  border-bottom: 1PX solid #EEEEEE;
}
.reward-block {
  height: 146px;
  /deep/.van-field__body {
    padding-top: 26px;
  }
}
.area-block,.reward-block {
  .van-cell {
    padding: 0;
    width: 560px;
    .van-field__control {
      font-size: 30px;
      font-weight: 500;
      color: #000000;
      line-height: 36px;
    }
  }
}
.card-tip {
  font-size: 24px;
  color: #BBBBBB;
  height: 82px;
  line-height: 64px;
  white-space: nowrap;
  span {
    color: #FEBF00;
    padding: 6px;
  }
}
.label-block {
  align-items: flex-end;
  .area-block {
    width: 534px;
  }
  .label-add {
    width: 96px;
    height: 56px;
    line-height: 56px;
    border-radius: 10px;
    &.label-unable {
      background-color: #ccc;
    }
  }
}
.label-list {
  margin: 30px -10px -10px 0;
  flex-wrap: wrap;
}
.label-item {
  height: 48px;
  line-height: 48px;
  background: #F7F7F7;
  border-radius: 10px;
  padding: 0 10px 0 16px;
  font-size: 24px;
  color: #000000;
  align-items: center;
  margin: 0 10px 20px 0;
  img {
    width: 24px;
    height: 24px;
    margin-left: 24px;
  }
}
.cell-item {
  min-height: 106px;
  border-bottom: 1PX solid #EEEEEE;
  font-size: 28px;
  .item-left {
    flex-shrink: 0;
    color: #7A7A7E;
    line-height: 106px;
  }
  .item-cont {
    flex: 1;
    font-weight: 500;
    color: #333333;
    text-align: right;
    flex-direction: column;
    display: flex;
    justify-content: center;
    width: 480px;
    &.p-30 {
      padding: 30px 0;
    }
    div:nth-child(1) {
      line-height: 28px;
      margin-bottom: 20px;
      padding-top: 10px;
    }
    div:nth-child(2) {
      line-height: 24px;
      font-size: 24px;
      color: #8F8F94;
      padding-bottom: 10px;
    }
  }
  &.cell-tel {
    border-bottom: 0;
    margin-bottom: -20px;
  }
  .item-arrow {
    color: #AAAAAA;
    align-items: center;
    display: flex;
    margin-left: 18px;
    line-height: 106px;
    height: 106px;
    .van-icon-location {
      color: #333333;
    }
  }
  .cell-group {
    min-height: 106px;
  }
  .limit-tip {
    margin-top: -30px;
  }
}
.num-step {
  /deep/ button {
    width: 56px;
    height: 56px;
    background: #F7F7F7;
    border-radius: 4px;
  }
  /deep/ input {
    width: 80px;
    height: 56px;
    background-color: #fff;
    margin: 0;
  }
  /deep/.van-stepper__minus::before,
  /deep/.van-stepper__plus::before {
    width: 20px;
    height: 1PX;
    background-color: #8F8F94;
  }
  /deep/.van-stepper__plus::after {
    width: 1PX;
    height: 20px;
    background-color: #8F8F94;
  }
}
span.red {
  color: #FF6555;
}
</style>

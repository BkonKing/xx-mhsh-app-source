<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar :fixed="true" placeholder :border="false">
      <template #left>
        <span class="tf-icon tf-icon-guanbi" @click="confirmShow = true"></span>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <type-select cardTit="任务类型" ref="typeRadio" :radioList="typeList" @selectCall="typeCall"></type-select>
      <div id="task_title"></div>
      <task-card cardTit="任务标题" :required="true">
        <div class="card-cont" slot="content">
          <div class="area-block bottom-line tf-row-space-between">
            <van-field
              v-model.trim="formData.task_title"
              autosize
              rows="1"
              :border="false"
              type="textarea"
            />
            <div class="text-num tf-row">
              <div><span :class="{'red': formData.task_title.length > 20}">{{ formData.task_title.length }}</span>/20</div>
            </div>
          </div>
          <div id="reward_happiness" class="reward-block bottom-line">
            <div class="card-tit">奖励幸福币(每人)<span class="tit-icon">*</span></div>
            <van-field v-model="formData.reward_happiness" type="number" />
          </div>
          <div v-if="typeIndex > -1" class="card-tip">同类型任务参考价<span>{{ typeList[typeIndex].start_price }}~{{ typeList[typeIndex].close_price }}</span>幸福币，请参考此价格设置奖励</div>
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
          <div v-if="formData.task_tag.length" class="label-list tf-row">
            <div class="label-item tf-row" v-for="(item, index) in formData.task_tag" :key="index">{{ item }}<img @click="labelDel(index)" src="@/assets/img/close_04.png" /></div>
          </div>
          <div class="card-tip">最多可添加5个标签</div>
        </div>
      </task-card>
      <task-card>
        <div class="card-cont" slot="content">
          <div class="cell-item tf-row">
            <div class="item-left">需要人数</div>
            <div class="item-cont num-step">
              <van-stepper v-model="formData.need_people" max="100" />
            </div>
          </div>
          <div id="task_etime" @click="dateShow=true" class="cell-item tf-row">
            <div class="item-left">完成时间<span class="tit-icon">*</span></div>
            <div class="item-cont">{{ completeTime }}</div>
            <div class="item-arrow"><i class="van-icon van-icon-arrow"></i></div>
          </div>
          <div class="cell-item tf-row">
            <div class="item-left">完成地点</div>
            <div class="item-cont p-30">
              <template v-if="!formData.udpate_address">不限{{formData.udpate_address}}</template>
              <template v-else>
                <div class="address-name"><van-field v-model="formData.udpate_address" type="text" /></div>
                <div>{{ formData.address_province + ' ' + formData.address_city + ' ' + formData.address_area + ' '}}</div>
              </template>
            </div>
            <div @click="goMap" class="item-arrow"><i class="van-icon van-icon-location"></i></div>
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
            <div id="mobile" class="item-left">联系电话<span class="tit-icon">*</span></div>
            <div class="item-cont">{{ telLimt }}</div>
            <div class="item-arrow"><i class="van-icon van-icon-arrow"></i></div>
          </div>
          <div class="area-block bottom-line tf-row-space-between">
            <van-field v-model="formData.mobile" type="tel" />
          </div>
          <div class="card-tip">请填写有效的手机号码，以便联系</div>
        </div>
      </task-card>
      <div id="task_desc"></div>
      <graphic
        ref="graphic"
        :cardTit="cardTit"
        :phTxt="phTxt"
        :maxNum="maxNum"
        @getForm="getForm"
      ></graphic>
      <div id="isAgree" class="agree-rule tf-flex-center">
        <div class="tf-flex-center agree-check" @click="agreeToggle">
          <div :class="{'active': isAgree}"><span class="tf-icon tf-icon-gou"></span></div>我已阅读并同意
        </div>
        <div @click="releaseRule" class="color-0E80E1">《交易规则》</div>
      </div>
      <div class="task-btn-block">
        <div v-preventReClick @click="submit" :class="[ ableSubmit ? '' : 'unable-btn', 'task-btn']">发布</div>
      </div>
      <!-- <div @click="selectShow=true">xuanz</div> -->
    </div>
    <date-picker v-model="dateShow" @dateSure="dateSure"></date-picker>
    <area-picker v-model="areaShow" @areaSure="areaSure"></area-picker>
    <list-select v-model="selectShow" @selectCall="selectCall" :selectList="selectList"></list-select>
    <list-select v-model="telShow" @selectCall="telCall" :selectList="telList"></list-select>
    <project v-model="projectShow" @projectSure="projectCall"></project>
    <confirm-model v-model="confirmShow" modelTit="确定放弃编辑内容？" cancelTxt="放弃" yesTxt="保存草稿" @cancel="cancel" @sure="sure"></confirm-model>
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
import confirmModel from '../components/confirm-model'
import { getTaskTypeList, submitTask, saveTask, editTaskInfo } from '@/api/task'
import { mapGetters } from 'vuex'
import { taskValidForm, ValidNumForm } from '@/utils/util'
import {
  NavBar,
  Stepper,
  Toast
} from 'vant'

export default {
  name: 'releaseEdit',
  components: {
    [NavBar.name]: NavBar,
    [Stepper.name]: Stepper,
    [Toast.name]: Toast,
    taskCard,
    typeSelect,
    graphic,
    datePicker,
    areaPicker,
    listSelect,
    project,
    confirmModel
  },
  data () {
    return {
      taskId: '', // 任务id
      editType: '', // edit修改 publish发布 anew重新发布
      radioIndex: 0, // 类型选中项
      userNum: 1, // 人数
      labelVal: '', // 标签
      cardTit: '任务说明',
      phTxt: '请输入任务说明',
      maxNum: 1000, // 任务说明最大长度
      formData: {
        task_title: '',
        task_tag: [],
        location_limit: 0,
        task_etime: '',
        mobile: '',
        province: '不限',
        city: '不限',
        area: '不限',
        // udpate_address: '',
        task_desc: ''
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
      ableIndex: 0, // 0不限 1指定地区 2指定小区 3指定人群（临时）
      sureAbleIndex: 0, // 0不限 1指定地区 2指定小区 3指定人群（确认）
      ableLookVal: '不限',
      groupInfo: '', // 选中群信息
      selectShow: false, // 可见范围
      areaShow: false, // 可见范围-指定地区
      projectShow: false, // 可见范围-小区
      projectInfo: '', // 选中的小区信息
      telLimt: '公开',
      typeList: [], // 类型
      typeIndex: -1, // 选中项
      typeName: '', // 类型选择项内容
      typeId: '', // 类型选择项id
      confirmShow: false, // 关闭提示弹窗
      isAgree: false // 同意规则
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    addStatus () {
      return (this.labelVal.length > 0 && this.labelVal.length < 11 && this.formData.task_tag.length < 5)
    },
    ableSubmit () {
      if (!this.formData.task_title || !this.formData.reward_happiness || !this.formData.task_etime || !this.formData.mobile || !this.formData.task_desc || !this.isAgree) {
        return false
      } else {
        return true
      }
    }
  },
  activated () {
    const groupInfo = this.$store.state.groupInfo
    this.groupInfo = groupInfo
    if (this.ableIndex == 3 && groupInfo) {
      this.sureAbleIndex = this.ableIndex
      this.formData.range_type = this.ableIndex
      this.formData.group_id = groupInfo.id
      this.ableLookVal = `${groupInfo.group_name}(${groupInfo.member_num}人)`
      // console.log(groupInfo)
    }
    this.getMap()
  },
  created () {
    this.typeId = this.$route.query.typeId
    this.taskId = this.$route.query.taskId
    this.editType = this.$route.query.type
    this.formData.task_type = this.typeId
    if (this.taskId) {
      this.formData.linli_task_id = this.taskId
      this.getData()
    } else {
      if (!this.formData.mobile) {
        this.formData.mobile = this.userInfo.mobile
      }
      this.getTaskType()
    }
  },
  methods: {
    // 获取任务详情
    getData () {
      editTaskInfo({ linli_task_id: this.taskId }).then((res) => {
        this.typeId = res.data.task_type
        const info = res.data
        this.ableIndex = info.range_type
        this.sureAbleIndex = info.range_type
        this.ableLookVal = info.range_type_name
        this.telLimt = info.mobile_open == 0 ? '隐藏' : '公开'
        // const obj = {
        //   task_title: info.task_title,
        //   task_type: info.task_type,
        //   reward_happiness: info.reward_happiness,
        //   task_tag: info.task_tag,
        //   need_people: info.need_people,
        //   task_stime: info.task_stime,
        //   task_etime: info.task_etime,
        //   address: info.task_etime,
        //   project_id: info.project_id,
        //   location_limit: 0,
        //   province: '不限',
        //   city: '不限',
        //   area: '不限'
        // }
        if (this.editType === 'anew') {
          info.task_stime = ''
          info.task_etime = ''
        }
        info.task_stime = info.task_stime == '0' ? '' : info.task_stime
        this.dateSure({ startTime: info.task_stime, endTime: info.task_etime })
        console.log(info.task_image)
        this.$refs.graphic.setVal({ content: info.task_desc, images: info.task_image })
        this.formData = Object.assign({}, this.formData, info)
        // this.formData = Object.assign({}, this.formData, info, this.addressObj)
        this.getTaskType()
      })
    },
    // 任务类型
    getTaskType () {
      getTaskTypeList().then(res => {
        let flag = false
        this.typeList = res.data.map((item, key) => {
          console.log('typeId', item.id, this.typeId)
          if (item.id == this.typeId) {
            this.typeIndex = key
            this.typeName = item.category
            flag = true
          }
          return {
            id: item.id,
            text: item.type_name,
            start_price: item.start_price,
            close_price: item.close_price
          }
        })
        if (flag == true) {
          this.$refs.typeRadio.setType(this.typeIndex)
        } else {
          this.$refs.typeRadio.setType(0)
        }
      })
    },
    // 选择任务类型
    typeCall (index) {
      this.typeIndex = index
      this.typeId = this.typeList[index].id
      this.typeName = this.typeList[index].text
      this.formData.task_type = this.typeId
    },
    // 图文信息
    getForm (val) {
      console.log(val)
      this.formData.task_desc = val.content
      this.formData.task_image = val.images
      this.textNum = val.content.length
    },
    // 添加标签
    labelAdd () {
      if (this.labelVal.length > 0 && this.labelVal.length < 11 && this.formData.task_tag.length < 5) {
        this.formData.task_tag.push(this.labelVal)
        this.labelVal = ''
      }
    },
    // 删除标签
    labelDel (index) {
      this.formData.task_tag.splice(index, 1)
    },
    // 时间选择
    dateSure (obj) {
      this.formData.task_stime = obj.startTime
      this.formData.task_etime = obj.endTime
      if (!obj.startTime && !obj.endTime) {
        this.completeTime = ''
      } else {
        if (obj.startTime && obj.endTime) {
          this.completeTime = obj.startTime + ' ~ ' + obj.endTime
        } else {
          this.completeTime = '截止 ' + obj.endTime
        }
      }
    },
    // 完成地点
    getMap () {
      const that = this
      const addressData = this.$store.state.map_info || ''
      if (addressData) {
        const bMap = api.require('bMap')
        bMap.getNameFromCoords({
          lon: addressData.lon,
          lat: addressData.lat
        }, function (ret, err) {
          if (ret.status) {
            const obj = {
              location_limit: 1,
              longitude: addressData.lon,
              latitude: addressData.lat,
              address: addressData.name,
              udpate_address: addressData.name,
              address_province: ret.province,
              address_city: ret.city,
              address_area: ret.district
            }
            that.formData = Object.assign({}, that.formData, obj)
          }
        })
      }
      // const addressData = {
      //   name: '三盛滨江',
      //   address: '福州市产生器刘泽想与南江滨溪大道顶顶顶顶',
      //   lon: '119.340659',
      //   lat: '26.052951'
      // }
      // const obj = {
      //   location_limit: 1,
      //   longitude: addressData.lon,
      //   latitude: addressData.lat,
      //   address: addressData.name,
      //   udpate_address: addressData.name,
      //   address_province: '福建省',
      //   address_city: '福州市',
      //   address_area: '仓山区'
      // }
      // Object.assign(this.formData, obj)
      // this.addressObj = obj
      // console.log(111, this.formData)
    },
    // 弹窗选择-可见范围
    selectCall (callData) {
      console.log(callData.value)
      this.ableIndex = callData.value
      if (callData.value == 0) { // 不限
        this.formData.range_type = 0
        this.ableLookVal = '不限'
        this.ableIndex = 0
        this.sureAbleIndex = 0
      } else if (callData.value == 1) { // 指定地区
        this.areaShow = true
      } else if (callData.value == 2) { // 指定小区
        this.projectShow = true
      } else if (callData.value == 3) { // 指定人群
        this.selectShow = false
        this.$nextTick(() => {
          this.$router.push({
            name: 'releaseGroup'
          })
        })
      }
    },
    // 项目选择(小区)
    projectCall (callData) {
      this.projectInfo = callData
      this.ableLookVal = callData.project_name
      this.formData.project_id = callData.id
      this.ableLookSure()
    },
    // 地区选择
    areaSure (callData) {
      console.log(callData)
      let value = '不限'
      this.formData.province = '不限'
      this.formData.city = '不限'
      this.formData.area = '不限'
      if (callData[0] && callData[0].name) {
        value = callData[0].name
        this.formData.province = callData[0].name
        if (callData[1] && callData[1].name) {
          value += ('-' + callData[1].name)
          this.formData.city = callData[1].name
          if (callData[2] && callData[2].name) {
            value += ('-' + callData[2].name)
            this.formData.area = callData[2].name
          }
        }
      }
      this.ableLookVal = value
      this.ableLookSure()
    },
    ableLookSure () {
      this.$store.commit('setGroupInfo', '')
      this.sureAbleIndex = this.ableIndex
      this.formData.range_type = this.ableIndex
    },
    // 弹窗选择-可见范围
    telCall (callData) {
      this.formData.mobile_open = callData.value == 1 ? 0 : 1
      this.telLimt = callData.text
    },
    // 同意规则
    agreeToggle () {
      this.isAgree = !this.isAgree
    },
    // 提交
    submit () {
      console.log(this.formData)
      const validator = [
        {
          value: this.formData.task_title,
          id: 'task_title',
          message: '请填写任务标题'
        },
        {
          value: this.formData.reward_happiness,
          id: 'reward_happiness',
          message: '请填写奖励幸福币数量'
        },
        {
          value: this.formData.task_etime,
          id: 'task_etime',
          message: '请选择任务完成时间'
        },
        {
          value: this.formData.mobile,
          id: 'mobile',
          message: '请填写联系电话'
        },
        {
          value: this.formData.task_desc,
          id: 'task_desc',
          message: '请填写任务说明'
        },
        {
          value: this.isAgree ? '1' : '',
          id: 'isAgree',
          message: '请同意《交易规则》'
        }
      ]
      taskValidForm(validator).then((res) => {
        const validatorNum = [
          {
            min: 0,
            max: 20,
            value: this.formData.task_title.length,
            id: 'task_title',
            message: '任务标题 最多输入20字'
          },
          {
            min: parseInt(this.typeList[this.typeIndex].start_price),
            max: parseInt(this.typeList[this.typeIndex].close_price),
            value: parseInt(this.formData.reward_happiness),
            id: 'reward_happiness',
            message: '奖励幸福币数量需在参考价内'
          },
          {
            min: 0,
            max: 1000,
            value: this.formData.task_desc.length,
            id: 'task_desc',
            message: '任务说明 最多输入1000字'
          }
        ]
        ValidNumForm(validatorNum).then((res) => {
          this.formData.linli_task_id = this.taskId
          // this.formData.location_limit = this.formData.address ? 0 : 1
          if (this.editType === 'edit' || this.editType === 'publish') {
            this.formData.is_modify = this.editType === 'edit' ? 1 : 0
          } else if (this.editType === 'anew') {
            this.formData.id = 0
            this.formData.linli_task_id = 0
          }
          submitTask(this.formData).then((res) => {
            Toast({
              message: '提交成功',
              onClose: () => {
                this.taskOrder(res.task_id)
              }
            })
          }).catch((res) => {
            Toast('提交失败 请重试')
          })
        }).catch((res) => {
          this.goScroll(res)
        })
      }).catch((res) => {
        this.goScroll(res)
      })
    },
    // 放弃
    cancel () {
      if (this.taskId) {
        this.$router.go(-1)
      } else {
        this.$router.push({
          name: 'neighbours'
        })
      }
    },
    // 保存草稿
    sure () {
      if (this.editType === 'anew') {
        this.formData.id = 0
        this.formData.linli_task_id = 0
      }
      saveTask(this.formData).then((res) => {
        this.myTask()
        // Toast('提交成功')
      }).catch((res) => {
        Toast('提交失败 请重试')
      })
    },
    // 锚点滚动
    goScroll (selector) {
      document.getElementById(selector).scrollIntoView()
    },
    // 我的任务
    myTask () {
      this.$router.replace({
        name: 'PersonageTaskIndex'
      })
    },
    // 任务订单
    taskOrder (id) {
      this.$router.replace({
        name: 'PersonageTaskDetails',
        query: {
          taskId: id
        }
      })
    },
    // 地址选择
    goMap () {
      this.$router.push({
        name: 'addressMap'
      })
    },
    // 交易规则
    releaseRule () {
      this.$router.push({
        name: 'releaseRule'
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    const names = ['releaseGroup', 'addressMap', 'releaseRule']
    if (!names.includes(to.name)) {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.tf-body-container{
  padding: 20px 20px 30px;
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
    .address-name {
      /deep/.van-cell {
        padding: 0;
        input {
          text-align: right;
        }
      }
    }
    & > div:nth-child(1) {
      line-height: 28px;
      margin-bottom: 20px;
      padding-top: 10px;
    }
    & > div:nth-child(2) {
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
/deep/.num-step {
  button {
    width: 56px;
    height: 56px;
    background: #F7F7F7;
    border-radius: 4px;
  }
  input {
    width: 80px;
    height: 56px;
    background-color: #fff;
    margin: 0;
  }
  button.van-stepper__minus--disabled,
  button.van-stepper__plus--disabled {
    &::before,&::after {
      background-color: #ccc;
    }
  }
  .van-stepper__minus::before,
  .van-stepper__plus::before {
    width: 20px;
    height: 1PX;
    background-color: #000;
  }
  .van-stepper__plus::after {
    width: 1PX;
    height: 20px;
    background-color: #000;
  }
}
span.red {
  color: #FF6555;
}
.agree-rule {
  height: 100px;
  margin-bottom: 30px;
  font-size: 26px;
  .color-0E80E1 {
    color: #0E80E1;
  }
  .agree-check div {
    width: 40px;
    height: 40px;
    background: #EEEEEE;
    border: 1px solid #CCCCCC;
    border-radius: 20px;
    margin-right: 20px;
    span {
      display: none;
    }
    &.active {
      border: 0;
      line-height: 40px;
      background: #FF5240;
      color: #fff;
      text-align: center;
      span {
        display: inline;
      }
    }
  }
}
</style>

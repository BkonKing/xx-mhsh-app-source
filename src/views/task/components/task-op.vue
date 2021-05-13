<template>
  <div class="body">
    <list-select
      v-model="opShow"
      @selectCall="selectCall"
      :selectList="selectList"
    ></list-select>
    <confirm-model
      v-model="confirmShow"
      :modelTit="modelTit"
      :modelSubTit="modelSubTit"
      :cancelTxt="cancelTxt"
      :yesTxt="yesTxt"
      @cancel="cancel"
      @sure="sure"
    ></confirm-model>
    <tf-share
      :share-show="showShare"
      :share-obj="shareObj"
      @closeSwal="closeShare"
    ></tf-share>
  </div>
</template>

<script>
import listSelect from '../components/list-select'
import confirmModel from '../components/confirm-model'
import tfShare from '@/components/tf-share'
import clonedeep from 'lodash.clonedeep'
import { getOpStatus, deleteTask, stopTask, closeTask } from '@/api/task'
export default {
  components: {
    listSelect,
    confirmModel,
    tfShare
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    taskId: {
      type: [Number, String],
      default: ''
    },
    shareObj: {
      type: Object,
      default: () => ({
        title: '',
        description: '',
        pyqTitle: '',
        thumb: '',
        contentUrl: ''
      })
    }
  },
  data () {
    return {
      opShow: this.value,
      showShare: false, // 分享弹窗
      selectList: [
        {
          value: 0,
          text: '分享',
          name: 'share'
        },
        {
          value: 1,
          text: '修改',
          name: 'edit'
        },
        {
          value: 2,
          text: '发布',
          name: 'publish'
        },
        {
          value: 3,
          text: '停止接单',
          name: 'stop'
        },
        {
          value: 4,
          text: '下架',
          name: 'close'
        },
        {
          value: 5,
          text: '重新发布',
          name: 'anewPublish'
        },
        {
          value: 6,
          text: '删除',
          name: 'delete'
        }
      ],
      copyList: [],
      statusName: '', // 选中操作的name
      confirmShow: false,
      modelTit: '你确定？',
      modelSubTit: '下架后其他用户将看不见',
      cancelTxt: '取消',
      yesTxt: '确定'
    }
  },
  created () {
    this.copyList = clonedeep(this.selectList)
    this.getData()
  },
  methods: {
    getData () {
      getOpStatus({ linli_task_id: this.taskId }).then((res) => {
        const statusInfo = res.data
        const list = []
        this.copyList.forEach((item, index) => {
          switch (index) {
            case 0:
              if (statusInfo.is_can_share) {
                list.push(item)
              }
              break
            case 1:
              if (statusInfo.is_can_modify) {
                list.push(item)
              }
              break
            case 2:
              if (statusInfo.is_can_release) {
                list.push(item)
              }
              break
            case 3:
              if (statusInfo.is_can_stop) {
                list.push(item)
              }
              break
            case 4:
              if (statusInfo.is_can_close) {
                list.push(item)
              }
              break
            case 5:
              if (statusInfo.is_can_anewrelease) {
                list.push(item)
              }
              break
            case 6:
              if (statusInfo.is_can_delete) {
                list.push(item)
              }
              break
          }
        })
        this.selectList = list
        console.log(this.selectList)
      })
    },
    // 操作选择
    selectCall (callData) {
      console.log('callData', callData)
      this.opShow = false
      this.statusName = callData.name
      const nameArr = ['stop', 'close', 'anewPublish', 'delete']
      const obj = {
        stop: {
          modelTit: '确定停止接单？',
          modelSubTit: '停止后将不再允许接单',
          cancelTxt: '取消',
          yesTxt: '停止'
        },
        close: {
          modelTit: '确定下架？',
          modelSubTit: '下架后其他用户将看不见',
          cancelTxt: '取消',
          yesTxt: '下架'
        },
        anewPublish: {
          modelTit: '重新发布？',
          modelSubTit: '将为您重新生成一个新的任务',
          cancelTxt: '取消',
          yesTxt: '确定'
        },
        delete: {
          modelTit: '确定删除？',
          modelSubTit: '',
          cancelTxt: '删除',
          yesTxt: '取消'
        }
      }
      if (nameArr.includes(callData.name)) {
        const confirmObj = obj[callData.name]
        this.modelTit = confirmObj.modelTit
        this.modelSubTit = confirmObj.modelSubTit
        this.cancelTxt = confirmObj.cancelTxt
        this.yesTxt = confirmObj.yesTxt
        this.confirmShow = true
      } else {
        switch (this.statusName) {
          case 'share':
            this.share()
            break
          case 'edit':
            this.edit()
            break
          case 'publish':
            this.publish()
            break
        }
      }
    },
    // 分享
    share () {
      console.log('share')
      this.showShare = true
    },
    // 修改
    edit () {
      this.$router.push({
        name: 'releaseEdit',
        query: {
          taskId: this.taskId,
          type: 'edit'
        }
      })
    },
    // 发布
    publish () {
      this.$router.push({
        name: 'releaseEdit',
        query: {
          taskId: this.taskId,
          type: 'publish'
        }
      })
    },
    // 停止接单
    stop () {
      stopTask({ linli_task_id: this.taskId }).then((res) => {
        this.getData()
        this.$emit('updateTask', this.statusName)
      })
    },
    // 下架
    close () {
      closeTask({ linli_task_id: this.taskId }).then((res) => {
        this.getData()
        this.$emit('updateTask', this.statusName)
      })
    },
    // 重新发布
    anewPublish () {
      this.$router.push({
        name: 'releaseEdit',
        query: {
          taskId: this.taskId,
          type: 'anew'
        }
      })
    },
    // 删除
    delete () {
      deleteTask({ linli_task_id: this.taskId }).then((res) => {
        this.$router.go(-1)
      })
    },
    cancel () {
      if (this.statusName === 'delete') {
        this.delete()
      }
    },
    sure () {
      switch (this.statusName) {
        case 'stop':
          this.stop()
          break
        case 'close':
          this.close()
          break
        case 'anewPublish':
          this.anewPublish()
          break
      }
    },
    // 关闭分享
    closeShare (data) {
      this.showShare = data == 1
    }
  },
  watch: {
    value (val) {
      this.opShow = val
    },
    opShow (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>

</style>

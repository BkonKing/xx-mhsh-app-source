<template>
  <div class="body">
    <list-select
      v-model="opShow"
      @selectCall="selectCall"
      :selectList="selectList"
    ></list-select>
    <tf-share
      :share-show="showShare"
      :share-obj="shareObj"
      @closeSwal="closeShare"
    ></tf-share>
    <shield-popup
      v-model="shieldShow"
      :shieldInfo="item"
      :shieldType="type"
    ></shield-popup>
  </div>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
import listSelect from '../components/list-select'
import tfShare from '@/components/tf-share'
import ShieldPopup from '../../neighbours/components/shieldPopup'
export default {
  components: {
    listSelect,
    tfShare,
    ShieldPopup
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    canShare: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => ({})
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
          text: '屏蔽',
          name: 'shield'
        },
        {
          value: 2,
          text: '投诉',
          name: 'complaint'
        }
      ],
      list: [],
      shieldShow: false,
      type: 6
    }
  },
  created () {
    this.list = clonedeep(this.selectList)
    const arr = clonedeep(this.selectList)
    if (!this.canShare) {
      arr.splice(0, 1)
      this.selectList = arr
    }
  },
  methods: {
    selectCall (callData) {
      this.opShow = false
      switch (callData.name) {
        case 'share':
          this.showShare = true
          break
        case 'shield':
          this.shieldShow = true
          break
        case 'complaint':
          this.$emit('selectCall')
          break
      }
    },
    getData () {

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
    },
    canShare (val) {
      const list = clonedeep(this.list)
      if (!val) {
        list.splice(0, 1)
        this.selectList = list
      } else {
        this.selectList = list
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>

<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'tf-input',
  props: {
    inputInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      UIInput: '',
      inputId: ''
    }
  },
  mounted () {
    this.UIInput = api.require('UIInput')
  },
  beforeDestroy () {
    this.closeSeach()
  },
  methods: {
    openInput (val) {
      // alert('initOpen22')
      const that = this
      return new Promise((resolve) => {
        that.UIInput.open({
          rect: {
            x: that.inputInfo.x,
            y: that.inputInfo.y,
            w: that.inputInfo.w,
            h: that.inputInfo.h
          },
          styles: {
            bgColor: '#fff',
            size: that.inputInfo.size ? that.inputInfo.size : 14,
            color: that.inputInfo.color ? that.inputInfo.color : '#000',
            placeholder: {
              color: that.inputInfo.phcolor ? that.inputInfo.phcolor : '#ccc'
            }
          },
          autoFocus: that.inputInfo.autoFocus ? that.inputInfo.autoFocus : false,
          maxRows: 1,
          placeholder: that.inputInfo.phtext ? that.inputInfo.phtext : '请输入',
          keyboardType: that.inputInfo.keyboardType ? that.inputInfo.keyboardType : 'number',
          inputType: that.inputInfo.inputType ? that.inputInfo.inputType : 'text',
          // fixedOn: api.frameName,
          fixed: that.inputInfo.fixed ? that.inputInfo.fixed : false
        }, function (ret, err) {
          if (ret) {
            // alert(JSON.stringify(ret))
            // console.log(JSON.stringify(ret))
            that.inputId = ret.id
            // 点击了搜索按钮
            if (ret.eventType == 'search' || ret.eventType == 'change') {
              that.goSeach(ret.id)
            }
            that.UIInput.addEventListener({
              id: ret.id,
              name: 'resignFirstResponder'
            }, function () {
              // alert('输入框失去焦点')
            })
            that.UIInput.addEventListener({
              id: ret.id,
              name: 'becomeFirstResponder'
            }, function (ret) {
              that.$emit('inputFocus')
              // alert('输入框获得焦点')
              // console.log("输入框获得焦点！" + api.winHeight + ret.keyboardHeight);
              if (ret.keyboardHeight) {
                if (api.systemType == 'android' || api.systemType == 'Android') {
                  // fnscoll(ret.keyboardHeight)
                }
              }
            })
            resolve()
          }
        })
      })
      // alert('val==' + val)
      // if (val) {
      //   setTimeout(() => {
      //     that.setValue(val)
      //   }, 2000)
      // }
    },
    // 隐藏搜索框
    hideSeach () {
      this.UIInput.hide({
        id: this.inputId
      })
    },
    // 显示搜索框
    showSeach () {
      this.UIInput.show({
        id: this.inputId
      })
    },
    // 关闭搜索框
    closeSeach () {
      // alert('this.inputId' + this.inputId)
      if (this.inputId !== '') {
        this.UIInput.close({
          id: this.inputId
        })
      }
    },
    // 设置value
    setValue (val) {
      // alert('setValue', this.inputId)
      this.UIInput.value({
        id: this.inputId,
        msg: val
      })
    },
    initOpen (val) {
      const that = this
      this.UIInput.close({
        id: this.inputId
      })
      // alert('initOpen')
      this.openInput().then(() => {
        that.setValue(val)
      })
    },
    // 输入框变化/点击确定
    goSeach (inputId) {
      const that = this
      this.UIInput.value({
        id: inputId
      }, function (ret, err) {
        if (ret) {
          // alert(ret.msg)
          that.$emit('inputCall', ret.msg)
        }
      })
    }
  },
  watch: {
    // 'inputInfo.y' (newValue, oldValue) {
    //   if (this.inputInfo.x > 0 && this.inputInfo.y > 0 && this.inputInfo.w > 0 && this.inputInfo.h > 0) {
    //     this.UIInput = api.require('UIInput')
    //     this.openInput('')
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
/*弹窗*/
.mask-block {
  height: 273px;
  padding: 0 50px;
}
.mask-tit {
  height: 147px;
  font-size: 30px;
  color: #000;
  border-bottom: none;
}
.mask-btn div.mask-sure-btn {
  width: 215px;
}
</style>

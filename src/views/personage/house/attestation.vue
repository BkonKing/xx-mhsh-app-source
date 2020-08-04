<template>
  <div class="tf-bg tf-padding-base">
    <van-nav-bar
      :title="title"
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span v-if="mode && !editMode" class="tf-icon tf-icon-edit-square" @click="goEdit"></span>
      </template>
    </van-nav-bar>
    <div class="tf-main-container">
      <tf-list class="tf-mb-lg">
        <tf-list-item title="房屋">
          <template v-slot:right>
            <div v-if="mode === 1 && !editMode" class="tf-text">{{houseName}}</div>
            <div v-else class="tf-text" @click="goCheckHouse">{{ houseName || '请选择'}}</div>
          </template>
        </tf-list-item>
      </tf-list>
      <div v-if="mode === 0 || editMode" class="tf-card tf-mb-lg">
        <div class="tf-card-header" style="font-weight: normal;">认证类型</div>
        <div class="tf-card-content" style="padding-bottom: 10px;">
          <tf-radio-btn v-model="house_role" :data="items"></tf-radio-btn>
        </div>
      </div>
      <tf-list>
        <tf-list-item v-if="mode === 1 && !editMode" title="认证类型" :showArrow="false">
          <template v-slot:right>
            <div class="tf-text">{{house_role}}</div>
          </template>
        </tf-list-item>
        <tf-list-item title="真实姓名" :showArrow="false">
          <template v-slot:right>
            <div v-if="mode === 1 && !editMode" class="tf-text">{{realname}}</div>
            <input v-else class="tf-input" v-model="realname" />
          </template>
        </tf-list-item>
        <tf-list-item title="手机号" :showArrow="false">
          <template v-slot:right>
            <div v-if="mode === 1 && !editMode" class="tf-text">{{mobile}}</div>
            <input v-else type="number" class="tf-input" v-model="mobile" />
          </template>
        </tf-list-item>
      </tf-list>
      <tf-list v-if="type === 1 && mode === 1 && !editMode">
        <tf-list-item title="设置当前房屋" :showArrow="false">
          <template v-slot:right>
            <van-switch v-model="checked" size="24" @change="bindingDefault" active-color="#EB5841" />
          </template>
        </tf-list-item>
      </tf-list>
      <div class="page-footer">
        <template v-if="!mode || editMode">
          <van-checkbox
            v-if="type === 0"
            class="agreement-checkbox"
            v-model="agreeValue"
            shape="square"
          >
            阅读并同意
            <router-link class="tf-text-blue" to>《XXX协议》</router-link>
          </van-checkbox>
          <van-button class="tf-mt-lg" type="danger" size="large" @click="submit">提交</van-button>
        </template>
        <van-button
          v-else
          class="tf-mt-lg tf-text-primary"
          type="default"
          size="large"
          @click="deleteMember"
        >删除</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Switch, Button, Checkbox, Toast, Dialog } from 'vant'
import tfRadioBtn from '@/components/tf-radio-btn/index'
import tfList from '@/components/tf-list/index'
import tfListItem from '@/components/tf-list/item'
import { addMember, updateMember, roomAttest, bindingRoomInfo, bindingDefault, unBinding } from '@/api/personage'
import { validForm } from '@/utils/util'

export default {
  components: {
    tfRadioBtn,
    tfList,
    tfListItem,
    [NavBar.name]: NavBar,
    [Checkbox.name]: Checkbox,
    [Switch.name]: Switch,
    [Button.name]: Button
  },
  data () {
    return {
      title: '',
      type: 0, // 0：成员 1：房屋
      mode: 0, // 0：新增 1：修改
      editMode: false,
      checked: false,
      agreeValue: false,
      id: '',
      house_id: '1',
      project_id: '',
      building_id: '',
      unit_id: '',
      houseName: '',
      house_role: '',
      realname: '',
      mobile: '',
      items: [
        {
          value: '1',
          name: '业主'
        },
        {
          value: '2',
          name: '业主成员'
        },
        {
          value: '3',
          name: '租户'
        },
        {
          value: '4',
          name: '租户成员'
        }
      ]
    }
  },
  created () {
    this.type = parseInt(this.$route.query.type)
    this.mode = parseInt(this.$route.query.mode)
    if (this.type === 0 && this.mode === 1) {
      const { realname, mobile, house_role, houseName, id } = JSON.parse(this.$route.query.info)
      this.id = id
      this.realname = realname
      this.mobile = mobile
      this.house_role = house_role
      this.houseName = houseName
    } else if (this.type === 1 && this.mode === 1) {
      this.house_id = this.$route.query.id
      this.bindingRoomInfo()
    }
    this.title = this.type ? '房屋认证' : this.mode ? '成员' : '添加成员'
  },
  methods: {
    submit () {
      if (!this.agreeValue && this.type === 0) {
        Toast('请先阅读并同意会员协议')
        return
      }
      const validator = [
        {
          value: this.house_id,
          message: '请选择房屋'
        },
        {
          value: this.house_role,
          message: '请选择成员类型'
        },
        {
          value: this.realname,
          message: '请填写姓名'
        },
        {
          value: this.mobile,
          message: '请填写手机号'
        }
      ]
      validForm(validator).then((res) => {
        this.submitType()
      })
    },
    /* 提交判断 */
    submitType () {
      if (this.type) {
        this.roomAttest()
      } else {
        this.mode ? this.updateMember() : this.addMember()
      }
    },
    /* 新增成员 */
    addMember () {
      addMember({
        house_id: this.house_id,
        realname: this.realname,
        mobile: this.mobile,
        house_role: this.house_role
      }).then((res) => {
        if (res.success) {
          Toast.success('保存成功')
        } else {
          Toast.fail('保存失败')
        }
      })
    },
    /* 更新成员 */
    updateMember () {
      updateMember({
        id: this.id,
        house_id: this.house_id,
        realname: this.realname,
        mobile: this.mobile,
        house_role: this.house_role
      }).then((res) => {
        if (res.success) {
          Toast.success('修改成功')
        } else {
          Toast.fail('保存失败')
        }
      })
    },
    /* 删除 */
    deleteMember () {
      Dialog.confirm({
        title: '是否确定删除',
        confirmButtonText: '删除'
      })
        .then(() => {
          this.type ? this.unBinding() : console.log('删除成员')
        })
        .catch(() => {
          // on cancel
        })
    },
    /* 房屋认证 */
    roomAttest () {
      roomAttest({
        house_id: this.house_id,
        realname: this.realname,
        mobile: this.mobile,
        house_role: this.house_role
      }).then((res) => {
        if (res.success) {
          Toast.success('审核成功')
        } else {
          Toast.fail('提交失败')
        }
      })
    },
    /* 认证房间详情 */
    bindingRoomInfo () {
      bindingRoomInfo({
        binding_id: this.house_id
      }).then(res => {
        const { realname, mobile, house_role, houseName } = res.data
        this.realname = realname
        this.mobile = mobile
        this.house_role = house_role
        this.houseName = houseName
      })
    },
    /* 设置当前房间 */
    bindingDefault () {
      bindingDefault({
        binding_id: this.binding_id
      }).then(res => {

      })
    },
    /* 解除绑定房间 */
    unBinding () {
      unBinding({
        binding_id: this.binding_id
      }).then(res => {

      })
    },
    goCheckHouse () {
      this.$router.push('/pages/personage/house/select-community')
    },
    goEdit () {
      this.agreeValue = true
      this.editMode = true
    }
  }
}
</script>

<style lang="less" scoped>
.tf-card {
  margin-top: @padding-lg;
}

.tf-card-header {
  font-size: @font-size-md !important;
  font-weight: bold;
}

.tf-input {
  text-align: right;
  font-size: @font-size-md !important;
  padding: 0;
}
.tf-text-primary {
  border: none;
}

.page-footer {
  position: fixed;
  left: 20px;
  right: 20px;
  bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  .agreement-checkbox {
    font-size: 24px;
    color: #8f8f94;
    /deep/ .van-checkbox__icon--checked .van-icon {
      color: @red-dark;
      background: none;
      border-color: @red-dark;
    }
    /deep/ .van-checkbox__icon {
      height: 28px;
      line-height: 28px;
      .van-icon {
        width: 28px;
        height: 28px;
        line-height: 28px;
      }
    }
  }
}
</style>

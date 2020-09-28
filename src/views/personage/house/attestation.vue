<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      :title="title"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="goback"
    >
      <template #right>
        <span
          v-if="mode && !editMode"
          class="tf-icon tf-icon-bianji"
          @click="goEdit"
        ></span>
      </template>
    </van-nav-bar>
    <div class="tf-padding tf-flex-item tf-flex-column">
      <div class="tf-body-container">
        <tf-list class="tf-mb-lg">
          <tf-list-item title="房屋" @click="goCheckHouse">
            <template v-slot:right>
              <div v-if="mode === 1 && !editMode" class="tf-text">
                {{ house_name }}
              </div>
              <div v-else class="tf-text">{{ house_name || '请选择' }}</div>
            </template>
          </tf-list-item>
        </tf-list>
        <div v-if="mode === 0 || editMode" class="tf-card tf-mb-lg">
          <div class="tf-card-header" style="font-weight: normal;">
            认证类型
          </div>
          <div class="tf-card-content" style="padding-bottom: 10px;">
            <tf-radio-btn v-model="house_role" :data="items"></tf-radio-btn>
          </div>
        </div>
        <tf-list>
          <tf-list-item
            v-if="mode === 1 && !editMode"
            title="认证类型"
            :showArrow="false"
          >
            <template v-slot:right>
              <div class="tf-text">{{ userText[house_role] }}</div>
            </template>
          </tf-list-item>
          <tf-list-item title="真实姓名" :showArrow="false">
            <template v-slot:right>
              <div v-if="mode === 1 && !editMode" class="tf-text">
                {{ realname }}
              </div>
              <input v-else class="tf-input" v-model="realname" />
            </template>
          </tf-list-item>
          <tf-list-item title="手机号" :showArrow="false">
            <template v-slot:right>
              <input
                v-if="type === 0 && ((mode === 1 && editMode) || mode === 0)"
                type="number"
                class="tf-input"
                v-model="mobile"
              />
              <div v-else class="tf-text">{{ mobile }}</div>
            </template>
          </tf-list-item>
        </tf-list>
        <tf-list v-if="type === 1 && mode === 1 && !editMode">
          <tf-list-item title="设置当前房屋" :showArrow="false">
            <template v-slot:right>
              <van-switch
                v-model="checked"
                size="24"
                @change="bindingDefault"
                :disabled="checked"
                active-color="#EB5841"
              />
            </template>
          </tf-list-item>
        </tf-list>
      </div>
      <div class="page-footer-placeholder">
        <div class="page-footer">
          <template v-if="!mode || editMode">
            <van-checkbox
              v-if="type === 0"
              class="agreement-checkbox"
              v-model="agreeValue"
              shape="square"
            >
              阅读并同意
              <span
                class="tf-text-blue"
                @click.stop="$router.push('/agreement?type=1')"
                >《{{ otherAgreement.title }}》</span
              >
            </van-checkbox>
            <van-button type="danger" size="large" @click="submit"
              >提交</van-button
            >
          </template>
          <van-button
            v-else
            class="tf-mt-lg tf-text-primary"
            type="default"
            size="large"
            @click="onDelete"
            >删除</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Switch, Button, Checkbox, Toast, Dialog } from 'vant'
import tfRadioBtn from '@/components/tf-radio-btn/index'
import tfList from '@/components/tf-list/index'
import tfListItem from '@/components/tf-list/item'
import {
  addMember,
  updateMember,
  roomAttest,
  bindingRoomInfo,
  bindingDefault,
  unBinding,
  deleteMember
} from '@/api/personage'
import { validForm } from '@/utils/util'
import { userText } from '@/const/user'
import { mapGetters } from 'vuex'

export default {
  name: 'houseAttestation',
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
      select: undefined, // 是否认证完自动选中当前房屋
      editMode: false,
      checked: false,
      agreeValue: false,
      id: '',
      bindingId: '', // 绑定id
      house_id: '1',
      project_id: '',
      building_id: '',
      unit_id: '',
      house_name: '',
      project_name: '',
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
      ],
      userText
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'otherAgreement'])
  },
  created () {
    this.type = parseInt(this.$route.query.type)
    this.mode = parseInt(this.$route.query.mode)
    this.select = parseInt(this.$route.query.select)
    if (this.type === 0 && this.mode === 1) {
      const {
        realname,
        mobile,
        house_role,
        fc_info,
        project_name,
        id
      } = JSON.parse(this.$route.query.info)
      this.id = id
      this.realname = realname
      this.mobile = mobile
      this.house_role = house_role
      this.house_name = this.house_name = project_name + fc_info
    } else if (this.type === 1) {
      if (this.mode === 1) {
        this.bindingId = this.$route.query.id
        this.bindingRoomInfo()
      } else {
        this.mobile = this.userInfo.mobile
      }
    }
    this.title = this.type ? '房屋认证' : this.mode ? '成员' : '添加成员'
  },
  activated () {
    const { houseSelected } = this.$store.state
    if (houseSelected) {
      const {
        house_name,
        house_id,
        project_id,
        building_id,
        unit_id,
        project_name
      } = houseSelected
      this.house_name = house_name
      this.project_name = project_name
      this.house_id = house_id
      this.project_id = project_id
      this.building_id = building_id
      this.unit_id = unit_id
      this.$store.commit('setHouseSelected', null)
    }
  },
  methods: {
    /* 提交验证 */
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
        project_id: this.project_id,
        house_id: this.house_id,
        realname: this.realname,
        mobile: this.mobile,
        house_role: this.house_role
      }).then((res) => {
        if (res.success) {
          Dialog.alert({
            title: '添加成功'
          }).then(() => {
            this.$router.go(-1)
          })
          this.mtjEvent({
            eventId: 72
          })
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
    onDelete () {
      Dialog.confirm({
        title: '是否确定删除',
        confirmButtonText: '删除'
      })
        .then(() => {
          this.type ? this.unBinding() : this.deleteMember()
        })
        .catch(() => {
          // on cancel
        })
    },
    /* 房屋认证 */
    roomAttest () {
      const params = {
        house_id: this.house_id,
        project_id: this.project_id,
        building_id: this.building_id,
        unit_id: this.unit_id,
        house_name: this.house_name,
        realname: this.realname,
        mobile: this.mobile,
        house_role: this.house_role,
        is_default: this.checked ? 1 : 0
      }
      roomAttest(params).then((res) => {
        if (res.success) {
          Toast.success('审核成功')
          if (this.userInfo.user_type == 0) {
            this.$store.dispatch('getMyAccount')
          }
          if (this.select == '1') {
            this.$store.dispatch('getHouse')
          }
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
          this.mtjEvent({
            eventId: 24
          })
        } else {
          Toast.fail('提交失败')
        }
      })
    },
    /* 获取认证房间详情 */
    bindingRoomInfo () {
      bindingRoomInfo({
        bindingId: this.bindingId
      }).then((res) => {
        const {
          realname,
          mobile,
          house_role,
          house_name,
          project_name,
          building_name,
          unit_name,
          house_id,
          project_id,
          building_id,
          unit_id,
          is_default
        } = res.data
        this.house_id = house_id
        this.project_id = project_id
        this.unit_id = unit_id
        this.building_id = building_id
        this.realname = realname
        this.mobile = mobile
        this.house_role = house_role
        this.house_name = project_name + building_name + unit_name + house_name
        this.checked = is_default === '1'
      })
    },
    /* 设置当前房间 */
    bindingDefault () {
      bindingDefault({
        binding_id: this.bindingId
      }).then((res) => {
        Toast.success('当前房间设置成功!')
        this.$store.dispatch('getHouse')
      })
    },
    /* 解除绑定房间 */
    unBinding () {
      unBinding({
        binding_id: this.bindingId
      }).then((res) => {
        Dialog.alert({
          title: '解绑成功！'
        }).then(() => {
          this.$store.dispatch('getHouse')
          this.$router.go(-1)
        })
      })
    },
    /* 删除报备成员 */
    deleteMember () {
      deleteMember({
        id: this.id
      }).then((res) => {
        Dialog.alert({
          title: '成员删除成功'
        }).then(() => {
          this.$router.go(-1)
        })
      })
    },
    /* 选择房屋跳转 */
    goCheckHouse () {
      if (this.mode === 1 && !this.editMode) {
        return
      }
      this.$router.push('/pages/personage/house/select-community')
    },
    /* 查看转编辑 */
    goEdit () {
      this.agreeValue = true
      this.editMode = true
    },
    /* 返回并销毁当前实例 */
    goback () {
      this.$router.go(-1)
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'houSelectCommunity') {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
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

/deep/ .tf-clist-cell-left {
  flex: initial;
  width: 150px;
}

/deep/ .tf-clist-cell-right {
  .tf-text {
    // line-height: 90px;
    width: 100%;
    max-width: 100%;
    overflow: initial;
    white-space: initial;
  }
}

.tf-input {
  text-align: right;
  font-size: @font-size-md !important;
  padding: 0;
}
.tf-text-primary {
  border: none;
}

.page-footer-placeholder {
  margin-bottom: env(safe-area-inset-bottom);
  margin-bottom: constant(safe-area-inset-bottom);
  .page-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .agreement-checkbox {
      font-size: 24px;
      color: #8f8f94;
      margin-bottom: 30px;
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
}
</style>

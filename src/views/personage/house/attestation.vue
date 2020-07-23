<template>
  <div class="tf-bg tf-padding-base">
    <van-nav-bar title="房屋认证" :fixed="true" :border="false" left-arrow @click-left="$router.go(-1)">
      <template #right>
        <span class="tf-icon tf-icon-edit-square" @click="goMyList"></span>
      </template>
    </van-nav-bar>
    <div class="tf-main-container">
      <form @submit="formSubmit">
        <tf-list>
          <tf-list-item title="房屋">
            <template v-slot:right>
              <div class="tf-text" @click="goCheckHouse">{{ houseName || '请选择'}}</div>
            </template>
          </tf-list-item>
        </tf-list>
        <div class="tf-card tf-mb-base">
          <div class="tf-card-header" style="font-weight: normal;">认证类型</div>
          <div class="tf-card-content" style="padding-bottom: 10px;">
            <tf-radio-btn :data="items" @change="radioChange"></tf-radio-btn>
          </div>
        </div>
        <tf-list>
          <tf-list-item title="真实姓名" :showArrow="false">
            <template v-slot:right>
              <input class="tf-input" />
            </template>
          </tf-list-item>
          <tf-list-item title="手机号" :showArrow="false">
            <template v-slot:right>
              <input type="number" class="tf-input" />
            </template>
          </tf-list-item>
        </tf-list>
        <tf-list>
          <tf-list-item title="设置当前房屋" :showArrow="false">
            <template v-slot:right>
              <van-switch v-model="checked" size="24" active-color="#EB5841" />
            </template>
          </tf-list-item>
        </tf-list>
        <van-button class="tf-mt-base" type="danger" size="large" form-type="submit">提交</van-button>
      </form>
    <van-button class="tf-text-primary" type="default" size="large">删除</van-button>
    </div>
  </div>
</template>

<script>
import { NavBar, Switch, Button } from 'vant'
import tfRadioBtn from '@/components/tf-radio-btn/index'
import tfList from '@/components/tf-list/index'
import tfListItem from '@/components/tf-list/item'
export default {
  components: {
    tfRadioBtn,
    tfList,
    tfListItem,
    [NavBar.name]: NavBar,
    [Switch.name]: Switch,
    [Button.name]: Button
  },
  data () {
    return {
      checked: false,
      houseName: '',
      category_id: '',
      items: [
        {
          value: 'USA',
          name: '业主'
        },
        {
          value: 'CHN',
          name: '业主成员'
        },
        {
          value: 'BRA',
          name: '租户'
        },
        {
          value: 'JPN',
          name: '租户成员'
        }
      ]
    }
  },

  methods: {
    formSubmit: function (e) {
      const { content } = e.detail.value
    },
    radioChange (value) {
      this.category_id = value
    },
    goCheckHouse () {
      this.$router.push('/pages/personage/house/select-community')
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
</style>

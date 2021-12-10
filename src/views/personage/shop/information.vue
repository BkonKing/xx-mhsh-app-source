<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="店铺资料"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="tf-body-container">
      <div class="form-card">
        <div class="form-card-label">
          店铺名称<span class="form-card-label-required">*</span>
        </div>
        <div
          class="area-block bottom-line tf-row-space-between uniline-textarea"
        >
          <van-field
            v-model.trim="formData.shops_name"
            rows="1"
            maxlength="20"
            show-word-limit
            type="textarea"
            :border="false"
          />
        </div>
      </div>
      <div class="form-card" style="padding-top: 0;padding-bottom: 0;">
        <div class="cell-item" @click="!formData.address_name && goMap()">
          <div class="item-left align-top" style="align-items: flex-start;">
            店铺地址
          </div>
          <div class="item-cont address-box">
            <template v-if="!formData.address_name">不限</template>
            <template v-else>
              <div class="address-name">
                <van-field
                  v-model="formData.address_name"
                  type="text"
                  @input="updateAddressInput"
                />
              </div>
              <div class="address-area">
                {{
                  formData.address_province +
                    " " +
                    formData.address_city +
                    " " +
                    formData.address_area +
                    " "
                }}
              </div>
            </template>
          </div>
          <div @click="formData.address_name && goMap()" class="item-arrow">
            <i class="van-icon van-icon-location"></i>
          </div>
        </div>
        <div class="cell-item">
          <div class="item-left">营业时间</div>
          <div class="item-cont">
            <van-field
              v-model="formData.business_hours"
              maxlength="20"
              type="text"
            />
          </div>
        </div>
        <div class="cell-item">
          <div class="item-left">联系方式</div>
          <div class="item-cont">
            <van-field v-model="formData.phone" maxlength="20" type="number" />
          </div>
        </div>
        <div class="cell-item" @click="projectShow = true">
          <div class="item-left">店铺归属</div>
          <div class="item-cont p-30">{{ formData.projectName }}</div>
          <div class="item-arrow">
            <i class="van-icon van-icon-arrow"></i>
          </div>
        </div>
      </div>
      <div class="form-card">
        <div class="form-card-label">
          店铺公告
        </div>
        <div class="area-block bottom-line tf-row-space-between">
          <van-field
            v-model.trim="formData.shops_notice"
            type="textarea"
            autosize
            rows="1"
            maxlength="50"
            show-word-limit
            :border="false"
          />
        </div>
      </div>
    </div>
    <van-button
      class="submit-btn"
      :disabled="!formData.shops_name"
      @click="submit"
      >提交</van-button
    >
    <select-project
      v-model="projectShow"
      title="店铺隶属"
      @projectSure="projectCall"
    ></select-project>
  </div>
</template>

<script>
import SelectProject from './components/SelectProject'
import { getShopInformation, saveShopInformation } from '@/api/personage/shop'

export default {
  name: 'shopInformation',
  components: {
    SelectProject
  },
  data () {
    return {
      id: '',
      projectShow: false,
      formData: {
        shops_name: '',
        bbb: '',
        address_name: '',
        business_hours: '',
        phone: '',
        project_id: '',
        projectName: '',
        shops_notice: ''
      }
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getData()
  },
  activated () {
    this.getMap()
  },
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'addressMap') {
      this.$destroy()
      this.$store.commit('setMap_info', '')
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
  },
  methods: {
    async getData () {
      // TODO:需要将项目名称也返回
      const { shops_info: data } = await getShopInformation({
        shops_id: this.id
      })
      this.formData = data
    },
    // 地址选择
    goMap () {
      this.$router.push({
        name: 'addressMap'
      })
    },
    // 完成地点
    getMap () {
      const that = this
      const addressData = this.$store.state.map_info || ''
      if (addressData) {
        const bMap = api.require('bMap')
        bMap.getNameFromCoords(
          {
            lon: addressData.lon,
            lat: addressData.lat
          },
          function (ret, err) {
            if (ret.status) {
              const obj = {
                location_limit: 1,
                longitude: addressData.lon,
                latitude: addressData.lat,
                address: addressData.name,
                address_name: addressData.name,
                address_province: ret.province,
                address_city: ret.city,
                address_area: ret.district
              }
              that.formData = Object.assign({}, that.formData, obj)
            }
          }
        )
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
      //   address_name: addressData.name,
      //   address_province: '福建省',
      //   address_city: '福州市',
      //   address_area: '仓山区'
      // }
      // Object.assign(this.formData, obj)
      // this.addressObj = obj
      // console.log(111, this.formData)
    },
    // 选完地址后的完成地点更改
    updateAddressInput (val) {
      if (!val) {
        this.formData.location_limit = 0
        this.formData.longitude = ''
        this.formData.latitude = ''
        this.formData.address = ''
        this.formData.address_province = ''
        this.formData.address_city = ''
        this.formData.address_area = ''
        this.formData.address_detail = ''
      }
    },
    // 项目选择(小区)
    projectCall (projectData) {
      const { id, project_name: projectName } = projectData
      this.formData.projectName = projectName
      this.formData.project_id = id
    },
    async submit () {
      if (!this.formData.shops_name) {
        this.$toast('请填写店铺名称')
      }
      console.log(this.formData)
      // TODO：地址保存还需要保存经纬度等
      const { success } = await saveShopInformation(this.formData)
      success && this.$toast('提交成功')
      // this.$toast('提交失败   请重试')
    }
  }
}
</script>

<style src="./style/form.less" lang="less" scoped></style>

<style lang="less" scoped>
.address-box {
  padding-left: 20px;
}
.align-top {
  display: flex;
  padding-top: 34px;
  line-height: initial !important;
}
.address-name {
  padding-top: 36px !important;
  /deep/.van-cell {
    padding: 0;
    input {
      text-align: right;
    }
  }
}
.address-area {
  padding-top: 14px;
}
.submit-btn {
  width: 710px;
  height: 80px;
  margin: 30px 20px;
  background: #ff5240;
  border-radius: 40px;
  border: none;
  font-size: 28px;
  color: #ffffff;
  /deep/ .van-button__text {
    line-height: 1;
  }
}
/deep/ .van-button--disabled {
  opacity: 0.3;
}
</style>

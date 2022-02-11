<template>
  <div>
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
            :class="{ 'max-word-limit': formData.shops_name.length === 20 }"
            rows="1"
            maxlength="20"
            show-word-limit
            type="textarea"
            :border="false"
          />
        </div>
      </div>
      <div class="form-card" style="padding-top: 0;padding-bottom: 0;">
        <div class="cell-item" @click="!formData.address && goMap()">
          <div class="item-left align-top" style="align-items: flex-start;">
            店铺地址
          </div>
          <div class="item-cont address-box">
            <template v-if="formData.address">
              <div class="address-name">
                <van-field
                  v-model="formData.address"
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
          <div @click="formData.address && goMap()" class="item-arrow">
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
          <div class="item-left">店铺电话</div>
          <div class="item-cont">
            <van-field v-model="formData.phone" maxlength="15" type="number" />
          </div>
        </div>
        <div class="cell-item" @click="projectShow = true">
          <div class="item-left">店铺归属</div>
          <div class="item-cont p-30">{{ formData.project_name }}</div>
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
            :class="{ 'max-word-limit': formData.shops_notice.length === 50 }"
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
      >保存</van-button
    >
    <select-project
      v-model="projectShow"
      :selected="formData.project_id"
      :haveParent="true"
      title="店铺隶属"
      @projectSure="projectCall"
    ></select-project>
  </div>
</template>

<script>
import { getShopInformation, saveShopInformation } from '@/api/personage/shop'
import SelectProject from './SelectProject'
export default {
  name: 'ShopInformationTab',
  components: {
    SelectProject
  },
  props: {
    shopId: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      projectShow: false,
      formData: {
        shops_name: '',
        address: '',
        business_hours: '',
        phone: '',
        project_id: '',
        project_name: '',
        shops_notice: ''
      }
    }
  },
  created () {
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
        shops_id: this.shopId
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
      const addressData = this.$store.state.map_info || ''
      if (addressData) {
        const bMap = api.require('bMap')
        bMap.getNameFromCoords(
          {
            lon: addressData.lon,
            lat: addressData.lat
          },
          (ret, err) => {
            if (ret.status) {
              const addressInfo = {
                longitude: addressData.lon,
                latitude: addressData.lat,
                address: addressData.name,
                address_province: ret.province,
                address_city: ret.city,
                address_area: ret.district
              }
              this.formData = { ...this.formData, ...addressInfo }
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
      //   longitude: addressData.lon,
      //   latitude: addressData.lat,
      //   address: addressData.name,
      //   address_province: '福建省',
      //   address_city: '福州市',
      //   address_area: '仓山区'
      // }
      // this.addressObj = Object.assign(this.formData, obj)
    },
    // 选完地址后的完成地点更改
    updateAddressInput (val) {
      if (!val) {
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
      this.formData.project_name = projectName
      this.formData.project_id = id
    },
    async submit () {
      if (!this.formData.shops_name) {
        this.$toast('请填写店铺名称')
      }
      // TODO：地址保存还需要保存经纬度等
      const { success } = await saveShopInformation({ ...this.formData, shops_id: this.shopId })
      if (success) {
        this.$toast('提交成功')
        this.$router.go(-1)
      }
      // this.$toast('提交失败   请重试')
    }
  }
}
</script>

<style src="../style/form.less" lang="less" scoped></style>

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
  padding-top: 40px !important;
  /deep/.van-cell {
    padding: 0;
    input {
      text-align: right;
    }
  }
}
.address-area {
  padding-top: 20px;
  padding-bottom: 40px !important;
}
.submit-btn {
  width: 710px;
  height: 80px;
  margin: 30px 20px;
  position: fixed;
  bottom: 0;
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

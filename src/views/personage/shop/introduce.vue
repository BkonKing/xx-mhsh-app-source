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
          店铺名称
        </div>
        <div class="area-block">
          <strong>{{ formData.shops_name }}</strong>
        </div>
      </div>
      <div class="form-card" style="padding-top: 0;padding-bottom: 0;">
        <div class="cell-item" @click="formData.address && goLocation()">
          <div class="item-left align-top" style="align-items: flex-start;">
            店铺地址
          </div>
          <div class="item-cont address-box">
            <template v-if="formData.address">
              <div class="address-name">
                {{ formData.address }}
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
            <template v-else>--</template>
          </div>
          <div v-if="formData.address" class="item-arrow">
            <i class="van-icon van-icon-location"></i>
          </div>
        </div>
        <div class="cell-item">
          <div class="item-left">营业时间</div>
          <div class="item-cont">
            {{ formData.business_hours || "--" }}
          </div>
        </div>
        <div class="cell-item" @click="makePhoneCall">
          <div class="item-left">店铺电话</div>
          <div class="item-cont">
            {{ formData.phone || "--" }}
          </div>
          <div v-if="formData.phone" class="item-arrow">
            <i class="van-icon van-icon-phone"></i>
          </div>
        </div>
        <div class="cell-item">
          <div class="item-left">店铺归属</div>
          <div class="item-cont p-30">{{ formData.project_name || "--" }}</div>
        </div>
      </div>
      <div v-if="formData.shops_notice" class="form-card">
        <div class="form-card-label">
          店铺公告
        </div>
        <div class="area-block">
          {{ formData.shops_notice }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getShopInformation } from '@/api/personage/shop'

export default {
  name: 'shopIntroduce',
  data () {
    return {
      shopId: '',
      formData: {}
    }
  },
  created () {
    this.shopId = this.$route.query.shopId
    this.getData()
  },
  activated () {},
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'addressMap') {
      this.$destroy()
    }
    next()
  },
  methods: {
    async getData () {
      const { shops_info: data } = await getShopInformation({
        shops_id: this.shopId
      })
      this.formData = data
    },
    makePhoneCall () {
      const phoneNumber = this.formData.phone
      if (!phoneNumber) return
      api.call({
        type: 'tel_prompt',
        number: this.formData.phone
      })
    },
    goLocation () {
      this.$router.push({
        name: 'shopLocation',
        query: {
          name: this.formData.address,
          address: `${this.formData.address_province}${this.formData.address_city}${this.formData.address_area}${this.formData.address}`,
          lon: this.formData.longitude,
          lat: this.formData.latitude
        }
      })
    }
  }
}
</script>

<style src="./style/form.less" lang="less" scoped></style>

<style lang="less" scoped>
.form-card-label,
.cell-item .item-left {
  color: #7a7a7e;
}
.cell-item .item-cont {
  color: #222;
  line-height: 1;
}
.form-card-label {
  margin-top: 10px;
  line-height: 1;
}
.area-block {
  min-height: 42px;
  font-size: 28px;
  strong {
    font-weight: bold;
  }
}
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
}
.address-area {
  padding-top: 20px;
  padding-bottom: 40px !important;
}
.van-icon-phone {
  font-weight: bold;
  color: #222;
  transform: rotateY(180deg);
}
</style>

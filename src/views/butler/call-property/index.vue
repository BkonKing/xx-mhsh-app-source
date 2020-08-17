<template>
  <div class="tf-bg">
    <van-nav-bar
      title="呼叫物业"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="tf-main-container">
      <div class="introduce-box">
        <div class="logo-badge">
          <img src="@/assets/app-icon.png" mode="aspectFit" class="logo-image" />
        </div>
        <div class="property-title">{{ projectName }}</div>
        <div class="property-content">{{ remarks }}</div>
      </div>
      <div class="tf-bg tf-padding-base">
        <phone-card
          v-for="(item, i) in phoneList"
          :key="i"
          :name="item.title"
          :info="item.remarks"
          :tag="true"
          :number="item.telephone"
          :avatar="item.icon_images"
        ></phone-card>
      </div>
      <div class="tf-bg-white">
        <div class="module-title">常见问题</div>
        <FAQ :data="eqList"></FAQ>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import FAQ from './components/FAQ'
import phoneCard from '../components/phone-card.vue'
import { getCallWYList } from '@/api/butler.js'
export default {
  components: {
    phoneCard,
    FAQ,
    [NavBar.name]: NavBar
  },
  data () {
    return {
      projectName: '',
      remarks: '',
      phoneList: [],
      eqList: []
    }
  },
  created () {
    this.getCallWYList()
  },
  methods: {
    getCallWYList () {
      getCallWYList().then((res) => {
        if (res.success) {
          const { project_name, remarks, records, eq } = res.data
          this.projectName = project_name
          this.remarks = remarks
          this.phoneList = records
          this.eqList = eq
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.introduce-box {
  @relative();
  width: 100%;
  // height: 350px;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
  margin-bottom: 10px;
  background: url("../../../assets/app-icon.png");
}

.logo-badge {
  @flex();
  justify-content: center;
  align-items: center;
  margin: 0 auto 30px;
  width: 120px;
  height: 120px;
  border-width: 3px;
  border-style: solid;
  border-color: @red-dark;
  border-radius: 50%;
}

.logo-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.property-title {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  margin-bottom: @padding-lg;
}

.property-content {
  width: 490px;
  margin: 0 auto;
  text-align: center;
  font-size: 24px;
  line-height: 44px;
  color: #fff;
}

.bg-image {
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 350px;
}
.module-title {
  font-size: @font-size-lg;
  font-weight: bold;
  color: @text-color;
  padding: 40px 30px;
}
</style>

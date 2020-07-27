<template>
  <div class="tf-bg">
    <van-nav-bar title="呼叫物业" :fixed="true" :border="false" left-arrow @click-left="$router.go(-1)">
    </van-nav-bar>
    <div class="tf-main-container">
      <div class="introduce-box">
        <img class="bg-image" src="@/assets/app-icon.png" mode="aspectFit" />
        <div class="logo-badge">
          <img src="@/assets/app-icon.png" mode="aspectFit" class="logo-image" />
        </div>
        <div class="property-title">{{ project_name }}</div>
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
        <text class="module-title">常见问题</text>
        <van-collapse v-model="activeNames">
          <van-collapse-item v-for="(item, i) in eqList" :key="i" :name="i">
            <template #title>
              <div class="tf-van-collapse-item__title tf-row">
                <div class="question-index-box">Q{{i + 1}}</div>
                {{item.question}}
              </div>
            </template>
            <div class="question-content">{{item.answer}}</div>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Collapse, CollapseItem } from 'vant'
import phoneCard from '../components/phone-card.vue'
import { getCallWYList } from '@/api/butler/butler.js'
export default {
  components: {
    phoneCard,
    [NavBar.name]: NavBar,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  },
  data () {
    return {
      activeNames: [],
      project_name: '郑州美好生活家园',
      remarks:
        '郑州美好生活家园郑州美好生活家园郑州美好生活家园郑州美好生活家园',
      phoneList: [
        {
          id: '1',
          icon_images:
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg',
          title: '物业热线1',
          telephone: '15050505050',
          remarks: '24小时在线'
        },
        {
          id: '2',
          icon_images:
            'https://mmm.cc/libaray/upload/images/2020/05/01/ssss.jpg',
          title: '物业热线2',
          telephone: '15050505050',
          remarks: '24小时在线'
        }
      ],
      eqList: [
        {
          id: '1',
          question: '门禁二维码打不开门？',
          answer:
            '智能门禁摄像头需要读到二维码信息后才能发送开幕指令给门禁，正确的使用方法是将二维码对准摄像头'
        },
        {
          id: '2',
          question: '门禁二维码打不开门？',
          answer:
            '智能门禁摄像头需要读到二维码信息后才能发送开幕指令给门禁，正确的使用方法是将二维码对准摄像头'
        }
      ]
    }
  },
  created () {
    // this.getCallWYList()
  },
  methods: {
    getCallWYList () {
      getCallWYList().then((res) => {
        if (res.success) {
          const { project_name, remarks, records, eq } = res.data
          this.project_name = project_name
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
  height: 350px;
  align-items: center;
  margin-bottom: 20px;
}

.logo-badge {
  @flex();
  justify-content: center;
  align-items: center;
  margin: 30px auto;
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
  z-index: -1;
  width: 100%;
  height: 350px;
}
.module-title {
  font-size: @font-size-lg;
  font-weight: bold;
  color: @text-color;
  padding: @padding-md;
}
.question-index-box {
  width: 72px;
  height: 45px;
  line-height: 45px;
  font-size: 24px;
  margin-right: @padding-md;
  color: #fff;
  background-color: @gray-8;
  text-align: center;
}
.question-content {
  font-size: 26px;
  color: #666;
  line-height: 54px;
  padding: 0 30px 50px;
}

/deep/ .van-collapse-item__title {
  display: flex;
  align-items: center;
}
.tf-van-collapse-item__title {
  padding: 30px;
  align-items: center;
}
</style>

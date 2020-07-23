<template>
  <view class="tf-bg tf-padding-base">
    <form @submit="formSubmit">
      <tf-list>
        <tf-list-item title="房屋">
          <template v-slot:right>
            <input class="tf-input" />
          </template>
        </tf-list-item>
      </tf-list>
      <view class="tf-card tf-mb-base">
        <text class="tf-card-header" style="font-weight: normal;">认证类型</text>
        <view class="tf-card-content" style="padding-bottom: 10px;">
          <tf-radio-btn :data="items" @change="radioChange"></tf-radio-btn>
        </view>
      </view>
      <tf-list>
        <tf-list-item title="真实姓名" :showArrow="false">
          <template v-slot:right>
            <input class="tf-input"/>
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
            <switch color="#EB5841" checked/>
          </template>
        </tf-list-item>
      </tf-list>
      <button class="tf-mt-base" type="warn" form-type="submit">提交</button>
    </form>
    <button type="default">删除</button>
  </view>
</template>

<script>
  import tfRadioBtn from "../../components/tf-radio-btn/index.nvue";
  import tfList from "../../components/tf-list/index.nvue"
  import tfListItem from "../../components/tf-list/item.nvue"
  export default {
    components: {
      tfRadioBtn,
      tfList,
      tfListItem
    },
    data() {
      return {
        category_id: "",
        items: [{
            value: "USA",
            name: "业主"
          },
          {
            value: "CHN",
            name: "业主成员"
          },
          {
            value: "BRA",
            name: "租户"
          },
          {
            value: "JPN",
            name: "租户成员"
          }
        ],
      };
    },

    methods: {
      formSubmit: function(e) {
        const {
          content
        } = e.detail.value;
      },
      radioChange(value) {
        this.category_id = value;
      },
      addRepair(data) {
        addRepair(data).then(res => {
          if (res.success) {

          }
        })
      }
    }
  };
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
</style>

<template>
  <div class="personInfo">
    <van-nav-bar
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="goback"
    >
      <template #title>
        <div class="title">个人信息</div>
      </template>
    </van-nav-bar>
    <div class="content">
      <div class="info">
        <van-uploader :after-read="afterRead" style="width: 100%;">
          <mycell class="cell" title="头像" value="头像" type="img"></mycell>
        </van-uploader>
        <mycell
          class="cell"
          title="昵称"
          value="这是一个默认昵称"
          @click.native="
            $router.push('/pages/personage/information/editInfo?type=nickname')
          "
          :isShow="false"
        ></mycell>
        <mycell
          class="cell"
          @click.native="
            $router.push('/pages/personage/information/editInfo?type=realname')
          "
          title="姓名"
          value="鲁班"
          :isShow="false"
        ></mycell>
        <mycell
          @click.native="genderShow = true"
          class="cell"
          title="性别"
          value="男"
          type="iconfont"
        ></mycell>
        <!-- <mycell
          class="cell"
          @click.native="ShowBirthday"
          title="生日"
          :value="birthday"
        ></mycell> -->
        <tf-list-item title="生日">
          <template v-slot:right>
            <tf-date-time-picker
              class="tf-date-time-picker"
              v-model="birthday"
              type="date"
              title="生日"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="setBirthday"
            >
              <template>
                <div class="tf-text text-right">
                  {{ birthday || "选择日期" }}
                </div>
              </template>
            </tf-date-time-picker>
          </template>
        </tf-list-item>
      </div>
    </div>
    <!-- 修改性别 -->
    <van-popup v-model="genderShow" position="bottom">
      <van-picker
        title="选择性别"
        show-toolbar
        :default-index="userInfo.gender - 1"
        :columns="Object.values(genderObj)"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
    <!-- 修改生日 -->
  </div>
</template>

<script>
import {
  NavBar,
  Field,
  Button,
  Popup,
  Picker,
  DatetimePicker,
  Toast,
  uploader
} from "vant";
import mycell from "./mycell";
import { editGender, editBirthday } from "@/api/personage.js";
import { mapGetters } from "vuex";
import { getDate, selectFileImage } from "@/utils/util";
import tfListItem from "@/components/tf-list/item.vue";
import tfDateTimePicker from "@/components/tf-date-time-picker/index";
import { uImages } from "@/api/user";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Button.name]: Button,
    [Popup.name]: Popup,
    mycell,
    [Picker.name]: Picker,
    [DatetimePicker.name]: DatetimePicker,
    tfListItem,
    tfDateTimePicker,
    Toast,
    [uploader.name]: uploader
  },
  data() {
    return {
      genderShow: false,
      genderObj: {
        1: "男",
        2: "女"
      },
      maxDate: new Date(getDate()),
      minDate: new Date("1900/1/1"),
      birthday: "",
      birthdayShow: false
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    /* 图片上传 */
    async afterRead(file) {
      Toast.loading({
        message: "头像上传中"
      });
      const formData = new FormData();
      const newFile = await selectFileImage(file.file);
      formData.append("imgFile", newFile);
      uImages(formData)
        .then(res => {
          console.log("上传图片", res);
          // Toast.success("上传成功");
          this.editAvatar(res.data);
          this.$store.dispatch("getMyAccount");
        })
        .catch(message => {
          Toast.clear();
          // Toast.fail(message);
        });
    },
    /* 头像上传 */
    editAvatar(avatar) {
      editAvatar({
        avatar
      })
        .then(res => {
          // Toast.clear()
          Toast.success("头像上传成功");
          this.avatar = avatar;
          this.$store.dispatch("getMyAccount");
        })
        .catch(() => {
          Toast.clear();
        });
    },
    /* 设置生日 */
    setBirthday() {
      editBirthday({
        birthday: this.birthday
      }).then(res => {
        Toast.success("生日设置成功");
      });
    },

    // 回退
    goback() {
      this.$router.go(-1);
    },
    // 修改性别确定
    async onConfirm(value, index) {
      // console.log(value, index);
      const res = await editGender({ gender: index + 1 });
      console.log(res);
      this.$toast.success("修改成功");
      this.genderShow = false;
      this.$store.dispatch("getMyAccount");
    },
    // 修改性别取消
    onCancel() {
      this.genderShow = false;
    }
  },
  watch: {},
  created() {
    this.$store.dispatch("getMyAccount").then(() => {
      this.birthday = this.userInfo.birthday;
    });
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.personInfo {
  background-color: #f2f2f4;
  height: 100%;
  .title {
    font-size: 34px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 44px;
  }
  .content {
    padding: 30px 20px;
    .info {
      padding: 0 30px;
      background-color: #fff;
      border-radius: 10px;
      .cell {
        width: 100%;
        &:nth-child(-n + 4) {
          border-bottom: 1px solid #f0f0f0;
        }
      }
    }
    /deep/ .van-uploader__input {
      width: 100% !important;
    }
    /deep/ .van-uploader__wrapper {
      width: 100% !important;
      /deep/ .van-uploader__input-wrapper {
        width: 100% !important;
      }
    }
  }
}
</style>

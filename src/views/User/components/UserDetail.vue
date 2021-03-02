<template>
  <v-row>
    <!-- 头像 -->
    <v-col cols="auto">
      <v-img
        :src="detail.profile.avatarUrl"
        height="140"
        width="140"
        transition="fade-transition"
        style="border-radius: 12px"
      ></v-img>
    </v-col>
    <v-col class="10" v-show="detail.profile">
      <v-row class="text-subtitle-2">
        <v-col cols="12">
          <v-row class="d-flex align-end">
            <v-col cols="9">
              <span class="text-h3">{{ detail.profile.nickname }}</span>
              <v-chip
                small
                class="mx-3 text-subtitle-1 font-weight-bold font-italic"
                color="red"
                outlined
              >
                {{ "Lv." + detail.level }}
              </v-chip>
              <v-icon :color="theGenderColor()">{{ theGender() }}</v-icon>
            </v-col>
            <v-col cols="3">
              <span class="mr-3">关注：{{ detail.profile.follows }}</span>
              <span>粉丝：{{ detail.profile.followeds }}</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-divider class="mb-3"></v-divider>
          <v-row>
            <v-col cols="9">
              <span
                >所在地区：{{ detail.profile.province }} -
                {{ detail.profile.city }}
              </span>
              <span class="ml-5">生日：{{ detail.profile.birthday }}</span>
              <div>个人介绍：{{ detail.profile.signature }}</div>
            </v-col>
            <v-col cols="3" class="flex-column">
              <div>注册时间：{{ detail.createDays }} 天</div>
              <div>累计听歌：{{ detail.listenSongs }} 首</div>
            </v-col>
          </v-row>
          <v-divider class="mt-3"></v-divider>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    uid: { type: String, required: true },
  },
  data: () => ({
    detail: { profile: "" },
  }),
  created() {
    this.getDetail();
  },
  watch: {
    uid(newValue) {
      this.uid = newValue;
      this.getDetail();
    },
  },
  methods: {
    // 获取数据
    getDetail() {
      this.$http.user.detail(this.uid).then((res) => {
        this.detail = res;
      });
    },
    // 返回性别图标
    theGender() {
      switch (this.detail.profile.gender) {
        case 1:
          return "mdi-gender-male";
        case 2:
          return "mdi-gender-female";
        default:
          return "mdi-gender-male-female";
      }
    },
    // 返回性别颜色
    theGenderColor() {
      switch (this.detail.profile.gender) {
        case 2:
          return "#FFB5D3";
        default:
          return "#29A7E4";
      }
    },
  },
};
</script>

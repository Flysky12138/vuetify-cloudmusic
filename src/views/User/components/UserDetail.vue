<template>
  <v-row>
    <!-- 左侧头像 -->
    <v-col cols="auto">
      <image-cover :src="detail.profile.avatarUrl" />
    </v-col>
    <!-- 右侧信息 -->
    <v-col>
      <v-row class="text-subtitle-2">
        <!-- 昵称 行 -->
        <v-col cols="12">
          <v-row align="end">
            <!-- 左侧 -->
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
            <!-- 右侧 -->
            <v-col cols="3">
              <span class="mr-3">关注：{{ detail.profile.follows }}</span>
              <span>粉丝：{{ detail.profile.followeds }}</span>
            </v-col>
          </v-row>
        </v-col>
        <!-- 信息 行 -->
        <v-col cols="12" class="py-0">
          <v-divider class="mb-3"></v-divider>
          <v-row>
            <!-- 左侧 -->
            <v-col cols="9">
              <span
                >所在地区：{{ detail.profile.province }} -
                {{ detail.profile.city }}
              </span>
              <span class="ml-5">生日：{{ detail.profile.birthday }}</span>
              <div class="mt-1">个人介绍：{{ detail.profile.signature }}</div>
            </v-col>
            <!-- 右侧 -->
            <v-col cols="3" class="flex-column">
              <div>注册时间：{{ detail.createDays }} 天</div>
              <div class="mt-1">累计听歌：{{ detail.listenSongs }} 首</div>
            </v-col>
          </v-row>
          <v-divider class="mt-3"></v-divider>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import ImageCover from "components/Image/ImageCover.vue";
export default {
  components: { ImageCover },
  props: {
    detail: { type: Object, required: true },
  },
  methods: {
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

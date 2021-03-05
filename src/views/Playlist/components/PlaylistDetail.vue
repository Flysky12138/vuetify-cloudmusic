<template>
  <v-row class="pa-3">
    <!-- 专辑封面 -->
    <v-col cols="auto">
      <image-cover :src="detail.coverImgUrl" :size="180" />
    </v-col>
    <!-- 专辑信息 -->
    <v-col>
      <v-row>
        <!-- 标题 行 -->
        <v-col cols="12">
          <span class="text-h4">{{ detail.name }}</span>
        </v-col>
        <!-- 头像 行 -->
        <v-col cols="12" class="py-0">
          <image-avatar :uid="detail.userId" :src="detail.avatarUrl" />
          <span class="ml-2 text-subtitle-1">{{ detail.nickname }}</span>
          <span class="mx-10 text-subtitle-2 text--secondary">
            创建于：{{ detail.createTime }}
          </span>
          <span class="text-subtitle-2 text--secondary">
            <span> 播放：{{ detail.playCount }} </span>
            <span class="mx-2"> 分享：{{ detail.shareCount }} </span>
            <span> 收藏：{{ detail.subscribedCount }} </span>
          </span>
        </v-col>
        <!-- 标签 行 -->
        <v-col cols="12" class="pb-0">
          <span class="text-subtitle-2">标签：</span>
          <v-chip
            v-for="item in detail.tags"
            :key="item.id"
            small
            class="mr-2"
            v-text="item"
          ></v-chip>
        </v-col>
        <!-- 介绍 行 -->
        <v-col cols="12" class="pb-0 text-subtitle-2">
          <div style="white-space: pre-wrap; height: 300px; overflow: auto">
            <span>介绍：</span>
            {{ getDescription() }}
            <v-btn
              v-if="isShowBtn"
              text
              x-small
              color="success"
              class="ml-4 mt-n1"
              @click="showAllDescription = !showAllDescription"
            >
              {{ showAllDescription ? "收起" : "展开" }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import ImageAvatar from "components/Image/ImageAvatar.vue";
import ImageCover from "components/Image/ImageCover.vue";
export default {
  components: { ImageAvatar, ImageCover },
  props: {
    detail: { type: Object, required: true },
  },
  data: () => ({
    showAllDescription: false,
    isShowBtn: false,
  }),
  methods: {
    // 根据介绍文字长度返回文字
    getDescription() {
      if (this.detail.description.length > 50) {
        this.isShowBtn = true;
        return this.showAllDescription
          ? "\n" + this.detail.description
          : this.detail.description.substring(0, 50) + "...";
      } else {
        return this.detail.description;
      }
    },
  },
};
</script>

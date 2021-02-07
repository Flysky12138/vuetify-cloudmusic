<template>
  <v-container class="d-flex justify-center py-16">
    <v-card width="80vw" max-width="600px" rounded="lg" elevation="4">
      <!-- 标题 -->
      <v-card-title class="justify-center font-weight-bold text-h4 blue--text">
        {{ title }}
      </v-card-title>
      <v-divider></v-divider>
      <!-- 切换选项卡 -->
      <v-tabs v-model="tab" color="basil" grow>
        <v-tab v-for="item in items" :key="item" class="font-weight-bold">
          {{ item }}
        </v-tab>
      </v-tabs>
      <!-- 手机号、二维码 -->
      <v-tabs-items v-model="tab" vertical reverse>
        <v-tab-item v-for="(item, index) in items" :key="index" class="py-8">
          <component :is="whichComp(index)"></component>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import Message from "components/Views/Login/Message.vue";
import QRcode from "components/Views/Login/QRcode.vue";
export default {
  components: { Message, QRcode },
  data: () => ({
    tab: null,
    title: "登录",
    items: ["短信", "二维码"],
  }),
  methods: {
    whichComp(value) {
      return value === 0 ? Message : QRcode;
    },
  },
};
</script>

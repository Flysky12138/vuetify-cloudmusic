<template>
  <v-dialog width="80vw" max-width="600px" overlay-opacity="0.8">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" :width="width" :height="height">
        <!-- 默认插槽位置 -->
        <slot></slot>
      </v-btn>
    </template>
    <v-card :loading="qrLoading">
      <template slot="progress">
        <v-progress-linear
          color="green"
          height="8"
          indeterminate
        ></v-progress-linear>
      </template>
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
      <v-tabs-items v-model="tab" vertical>
        <v-tab-item
          v-for="(item, index) in items"
          :key="index"
          :class="index === 0 ? 'py-12' : 'py-8'"
        >
          <component
            :is="index === 0 ? 'Phone' : 'QRcode'"
            @isLogin="
              $emit('is');
              overlay = true;
            "
            @isQrWait="(res) => (qrLoading = res)"
          ></component>
        </v-tab-item>
      </v-tabs-items>
      <!-- 加载提示圈 -->
      <v-overlay :value="overlay">
        <v-progress-circular
          indeterminate
          size="64"
          width="10"
        ></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-dialog>
</template>

<script>
import Phone from "./Phone.vue";
import QRcode from "./QRcode.vue";
export default {
  components: { Phone, QRcode },
  props: {
    width: Number,
    height: Number,
  },
  data: () => ({
    tab: null,
    title: "登录",
    items: ["手机号", "二维码"],
    qrLoading: false,
    overlay: false,
  }),
};
</script>

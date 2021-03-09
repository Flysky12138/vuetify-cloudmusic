<template>
  <v-container>
    <v-alert
      border="left"
      colored-border
      elevation="2"
      dense
      type="info"
      colored-border
    >
      <span>提供的默认接口搭建在</span>
      <a href="https://vercel.com" target="_blank" class="text-decoration-none">
        Vercel
      </a>
      <span>上，访问速度不理想，建议本地运行接口Api</span>
    </v-alert>
    <v-alert border="left" colored-border color="cyan" elevation="2" dense>
      <span>接口下载地址：</span>
      <a
        href="https://github.com/Binaryify/NeteaseCloudMusicApi"
        target="_blank"
        class="text-decoration-none"
      >
        NeteaseCloudMusicApi
      </a>
    </v-alert>
    <v-text-field
      class="pt-5"
      label="接口地址"
      placeholder="http://xxx or https://xxx"
      outlined
      dense
      hide-details
      append-icon="mdi-refresh"
      v-model="api"
      @click:append="reset"
      @blur="save"
      @keyup.13="save"
      @focus="colseTopText"
    ></v-text-field>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    api: "",
  }),
  created() {
    this.api = localStorage.getItem("api");
  },
  computed: {
    ...mapState({
      defaultApi: (state) => state.defaultApi,
    }),
  },
  methods: {
    ...mapMutations(["topText"]),
    reset() {
      this.api = this.defaultApi;
      this.save();
    },
    save() {
      localStorage.setItem("api", this.api);
      this.topText({
        text: "保存成功！",
        color: "success",
      });
    },
    colseTopText() {
      this.topText("");
    },
  },
};
</script>

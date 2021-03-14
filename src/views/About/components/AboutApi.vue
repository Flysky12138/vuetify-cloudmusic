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
      class="pt-3"
      label="接口地址"
      placeholder="https://xxx or http://localhost:port"
      outlined
      dense
      hide-details
      append-icon="mdi-refresh"
      v-model="api"
      @click:append="reset"
      @blur="save"
      @keyup.13="save"
    ></v-text-field>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
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
    reset() {
      this.api = this.defaultApi;
      this.save();
    },
    save() {
      localStorage.setItem("api", this.api);
      this.$message({
        text: "保存成功！",
        color: "success",
      });
    },
  },
};
</script>

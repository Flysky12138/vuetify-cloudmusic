<template>
  <v-container>
    <v-alert
      border="left"
      colored-border
      elevation="1"
      dense
      color="cyan"
      colored-border
      icon="mdi-api"
    >
      <span>提供的默认接口搭建在</span>
      <a href="https://vercel.com" target="_blank" class="text-decoration-none">
        Vercel
      </a>
      <span>上，访问速度不理想，建议本地运行接口Api</span>
      <br />
      <div class="pt-1">
        <span>接口下载地址：</span>
        <a
          href="https://github.com/Binaryify/NeteaseCloudMusicApi"
          target="_blank"
          class="text-decoration-none"
        >
          NeteaseCloudMusicApi
        </a>
      </div>
    </v-alert>
    <v-text-field
      label="自定义接口地址"
      placeholder="https://xxx or http://localhost:port"
      outlined
      dense
      hide-details
      append-icon="mdi-refresh"
      v-model="api"
      @click:append="reset"
      @blur="save"
      @keyup.13="save"
      ref="AboutApi"
    ></v-text-field>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    api: "",
  }),
  created() {
    this.api = localStorage.getItem("api");
  },
  methods: {
    reset() {
      this.api = "";
      this.save();
    },
    save() {
      this.$refs.AboutApi.blur();
      localStorage.setItem("api", this.api);
      this.$message({
        text: "保存成功！",
        color: "success",
      });
    },
  },
};
</script>

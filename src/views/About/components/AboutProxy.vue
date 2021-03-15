<template>
  <v-container>
    <v-alert
      border="left"
      colored-border
      color="cyan"
      elevation="1"
      dense
      icon="mdi-vpn"
    >
      <span>
        支持的代理是
        <code>SS</code>&nbsp;<code>v2ray</code>
        等提供的http代理，不支持
      </span>
      <a
        href="https://github.com/nondanee/UnblockNeteaseMusic"
        target="_blank"
        class="text-decoration-none"
      >
        UnblockNeteaseMusic
      </a>
      <span>那种代理</span>
    </v-alert>
    <v-text-field
      label="代理地址"
      placeholder="http://localhost:port or http://xxxx/proxy.pac"
      outlined
      dense
      hide-details
      v-model="proxy"
      @blur="save"
      @keyup.13="save"
      ref="AboutProxy"
    ></v-text-field>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    proxy: "",
  }),
  created() {
    this.proxy = localStorage.getItem("proxy");
  },
  methods: {
    save() {
      this.$refs.AboutProxy.blur();
      localStorage.setItem("proxy", this.proxy);
      this.$message({
        text: "保存成功！",
        color: "success",
      });
    },
  },
};
</script>

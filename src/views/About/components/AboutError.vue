<template>
  <v-alert border="left" colored-border elevation="1" dense color="error" icon="mdi-alert-circle-outline">
    <span>
      Chrome登录不成功：访问
      <code>chrome://flags</code> 修改
      <code>SameSite by default cookies</code> 为
      <code>Disabled</code>
    </span>
  </v-alert>
</template>

<script>
export default {
  data: () => ({})
};
</script>

<template>
  <v-row justify="center" align="center" style="height: 80vh">
    <v-card width="50%" min-width="500px" rounded="lg" elevation="4">
      <v-card-title class="text-center justify-center">
        <h1 class="font-weight-bold display-1">登录</h1>
      </v-card-title>
      <v-tabs v-model="tab" color="basil" grow>
        <v-tab v-for="item in items" :key="item" class="font-weight-bold">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item">
          <v-card-text>{{ item }}</v-card-text>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    tab: null,
    items: ["短信", "二维码"],
  }),
};
</script>

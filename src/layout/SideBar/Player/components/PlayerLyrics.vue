<template>
  <v-row class="red overflow-y-auto scroll" style="height: 80vh">
    <v-col cols="12" class="text-center">
      <v-responsive height="40vh" class="blue"></v-responsive>
      <div v-for="item in 30" :key="item">{{ item }}</div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({}),
};
</script>

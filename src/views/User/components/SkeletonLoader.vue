<template>
  <div>
    <v-row class="py-8">
      <v-col cols="auto">
        <v-skeleton-loader width="140" height="140" class="ml-3 mt-2" type="image"></v-skeleton-loader>
      </v-col>
      <v-col cols="5">
        <v-skeleton-loader type="card-heading"></v-skeleton-loader>
        <v-skeleton-loader width="300" type="list-item@2"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-for="item in 2" :key="item">
      <v-col cols="12" class="px-6">
        <v-skeleton-loader type="image"></v-skeleton-loader>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({})
}
</script>

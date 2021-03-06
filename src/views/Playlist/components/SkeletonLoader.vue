<template>
  <div>
    <v-row>
      <v-col cols="auto">
        <v-skeleton-loader
          width="180"
          height="180"
          class="ma-2"
          type="image"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="5">
        <v-skeleton-loader
          width="400"
          type="card-heading,list-item-avatar"
        ></v-skeleton-loader>
        <v-skeleton-loader width="200" type="list-item@2"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col cols="12" class="d-flex">
        <v-skeleton-loader width="400" type="card-heading"></v-skeleton-loader>
        <v-spacer></v-spacer>
        <v-skeleton-loader width="200" type="card-heading"></v-skeleton-loader>
      </v-col>
      <v-col cols="12" class="px-5">
        <v-skeleton-loader
          width="100%"
          height="60vh"
          type="image@3"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({}),
};
</script>

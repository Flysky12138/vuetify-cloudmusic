<template>
  <div>
    <v-row>
      <v-col cols='auto'>
        <v-skeleton-loader width='180' height='180' class='ma-2' type='image'></v-skeleton-loader>
      </v-col>
      <v-col cols='5'>
        <v-skeleton-loader type='card-heading,list-item-avatar'></v-skeleton-loader>
        <v-skeleton-loader width='200' type='list-item@2'></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row class='mt-8'>
      <v-col cols='4'>
        <v-skeleton-loader type='card-heading'></v-skeleton-loader>
      </v-col>
      <v-col cols='12' class='px-5'>
        <v-skeleton-loader type='image'></v-skeleton-loader>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({})
}
</script>

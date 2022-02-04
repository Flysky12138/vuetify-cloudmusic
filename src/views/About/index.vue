<template>
  <v-container class='pa-12'>
    <v-row>
      <v-col cols='12' v-for='item in components' :key='item.id'>
        <component :is='item'></component>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {
    AboutGithub: () => import('./components/AboutGithub.vue'),
    AboutApi: () => import('./components/AboutApi.vue')
  },
  data: () => ({
    components: ['AboutGithub', 'AboutApi']
  })
}
</script>

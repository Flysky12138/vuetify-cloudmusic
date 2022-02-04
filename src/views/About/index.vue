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
import AboutGithub from './components/AboutGithub.vue'
import AboutApi from './components/AboutApi.vue'
export default {
  components: { AboutGithub, AboutApi },
  data: () => ({
    components: ['AboutGithub', 'AboutApi']
  })
}
</script>

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
import AboutApi from './components/AboutApi.vue'
import AboutGithub from './components/AboutGithub.vue'
import Tools from './components/Tools'
export default {
  components: { AboutApi, Tools, AboutGithub },
  data: () => ({
    components: ['AboutGithub', 'AboutApi', 'Tools']
  })
}
</script>

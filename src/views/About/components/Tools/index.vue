<template>
  <v-alert border='left' colored-border elevation='1' dense color='cyan' icon='mdi-tools'>
    <v-row>
      <v-col cols='4' v-for='item in components' :key='item.id' class='d-flex align-center'>
        <component :is='item'></component>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
import BtnCloud from './BtnCloud.vue'
import Theme from './Theme.vue'
export default {
  components: { Theme, BtnCloud },
  data: () => ({
    components: ['Theme', 'BtnCloud']
  })
}
</script>

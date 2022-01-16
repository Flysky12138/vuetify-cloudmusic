<template>
  <v-dialog max-width='80vmin' overlay-opacity='0.9'>
    <template v-slot:activator='{ on, attrs }'>
      <v-img
        v-bind='attrs'
        v-on='on'
        :src='src'
        :width='size'
        :height='size'
        transition='fade-transition'
        style='box-shadow: #80d8ff 0 0 5px'
        class='rounded-xl overflow-hidden'
      ></v-img>
    </template>
    <v-img :src='src'></v-img>
  </v-dialog>
</template>

<script>
export default {
  props: {
    src: { type: String, required: true },
    size: { type: Number, default: 140 }
  },
  data: () => ({})
}
</script>

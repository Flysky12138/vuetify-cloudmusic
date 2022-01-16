<template>
  <v-dialog v-model='dialog' max-width='350'>
    <template v-slot:activator='{ on, attrs }'>
      <v-btn v-bind='attrs' v-on='on' icon style='color: inherit'>
        <v-icon>mdi-close-circle-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title v-text='name'></v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color='green darken-1' text @click='$emit("click");dialog=false'>确定删除</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true }
  },
  data: () => ({
    dialog: false
  })
}
</script>

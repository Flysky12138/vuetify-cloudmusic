<template>
  <v-dialog max-width="350" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon style="color: inherit" v-bind="attrs" v-on="on">
        <v-icon>mdi-close-circle-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="
            $emit('click')
            dialog = false
          "
          color="green darken-1"
          text
          >确定删除</v-btn
        >
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

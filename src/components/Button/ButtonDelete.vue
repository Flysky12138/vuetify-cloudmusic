<template>
  <v-dialog v-model="dialog" max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" icon>
        <v-icon>mdi-close-circle-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="delSong">确定删除</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    id: { type: Number, required: true },
    name: { type: String, required: true }
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    // 从歌单删除歌曲
    delSong() {
      this.$http.playlist
        .tracks(this.$route.query.id, this.id, false)
        .then(res => {
          this.$emit("success", this.id);
          this.dialog = false;
        });
    }
  }
};
</script>

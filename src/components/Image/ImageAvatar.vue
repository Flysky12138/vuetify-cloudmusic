<template>
  <v-avatar size="38">
    <v-btn icon :to="{ path: 'user', query: { uid: uid } }">
      <v-img :src="src" max-width="38"></v-img>
    </v-btn>
  </v-avatar>
</template>

<script>
export default {
  props: {
    uid: { type: Number, required: true },
    src: { type: String, required: true },
  },
  data: () => ({}),
};
</script>

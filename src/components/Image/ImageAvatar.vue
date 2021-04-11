<template>
  <v-avatar size='38'>
    <v-btn icon :to='{ path: "/user", query: { uid: uid } }'>
      <v-img :src='src' max-width='38'>
        <!-- 图片加载前显示 -->
        <template v-slot:placeholder>
          <v-row class='fill-height ma-0' align='center' justify='center'>
            <v-progress-circular indeterminate color='grey lighten-5' size='25'></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-btn>
  </v-avatar>
</template>

<script>
export default {
  props: {
    uid: { type: Number, required: true },
    src: { type: String, default: '', required: true }
  },
  data: () => ({})
}
</script>

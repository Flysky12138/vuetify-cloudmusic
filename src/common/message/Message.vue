<template>
  <v-snackbar
    :light='!$vuetify.theme.isDark'
    v-model='isShow'
    transition='slide-x-reverse-transition'
    vertical
    right
    bottom
    class='mb-8 mr-8'
    elevation='12'
    :timeout='timeout'
    id='message'
  >
    {{ text }}
    <template v-slot:action='{ attrs }'>
      <v-btn v-bind='attrs' color='primary' class='mr-5' @click='isShow = false' v-if='button.text !== "Close"' elevation='0'>Close</v-btn>
      <v-btn v-bind='attrs' :color='color' @click='onClick()' elevation='0'>{{ button.text }}</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    text: { type: String, default: '', required: true },
    color: { type: String, default: 'error' },
    timeout: { type: Number, default: 3000 },
    button: {
      type: Object,
      default: () => ({
        text: 'Close',
        f: () => {}
      })
    }
  },
  data: () => ({
    isShow: false
  }),
  // 写在 created 中没有动画
  mounted() {
    this.isShow = true
  },
  methods: {
    onClick() {
      this.button.f()
      this.isShow = false
    }
  }
}
</script>

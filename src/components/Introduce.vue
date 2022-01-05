<template>
  <div style='white-space: pre-wrap;position: relative'>
    <v-divider class='my-3'></v-divider>
    <div :style='spanHeight()' ref='content'>{{ head + (showAllDescription && head ? '\n' : '') + value.trim() }}</div>
    <v-btn
      style='position: absolute;bottom: 0;right: 0'
      v-if='isShowBtn'
      text
      x-small
      color='success'
      class='ml-4 mt-n1'
      @click='btnClick'
    >{{ showAllDescription ? '收起' : '展开' }}</v-btn>
  </div>
</template>

<script>
export default {
  props: {
    head: { type: String, default: '' },
    value: { type: String, default: '', required: true },
    line: { type: Number, default: 5 }
  },
  data: () => ({
    showAllDescription: false,
    isShowBtn: false
  }),
  mounted() {
    setTimeout(() => {
      this.isShowBtn = this.$refs.content.clientHeight < this.$refs.content.scrollHeight
    }, 300)
  },
  methods: {
    spanHeight() {
      if (!this.showAllDescription) {
        return {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-line-clamp': this.line,
          '-webkit-box-orient': 'vertical'
        }
      }
    },
    btnClick() {
      if (this.showAllDescription) {
        this.$vuetify.goTo(0, {
          duration: 600,
          easing: 'easeOutQuad'
        })
      }
      this.showAllDescription = !this.showAllDescription
    }
  }
}
</script>

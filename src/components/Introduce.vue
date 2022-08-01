<template>
  <div class="content" v-if="value">
    <v-divider class="my-3"></v-divider>
    <div :style="spanHeight()" ref="text" v-text="textContent()"></div>
    <v-btn v-if="isShowBtn" small color="cyan lighten-3" class="ml-4 mt-n1" @click="btnClick" icon>
      <v-icon>{{ showAllDescription ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
    </v-btn>
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
  watch: {
    value: 'showBtn'
  },
  mounted() {
    this.value && this.showBtn()
  },
  methods: {
    textContent() {
      let text = this.head
      if (this.showAllDescription) {
        text += (text ? '\n' : '') + this.value.trim()
      } else {
        text += this.value.trim().replace(/\s*\n+/g, '')
      }
      return text
    },
    showBtn() {
      this.$nextTick(() => {
        this.isShowBtn = this.$refs.text.clientHeight < this.$refs.text.scrollHeight
      })
    },
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

<style lang="scss" scoped>
.content {
  white-space: pre-wrap;
  position: relative;
  button {
    position: absolute;
    bottom: -25px;
    left: 45%;
  }
}
</style>

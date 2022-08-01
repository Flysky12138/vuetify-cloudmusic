<template>
  <v-container style="position: relative" class="py-6">
    <prism-editor v-model="css" :highlight="highlighter" line-numbers :tabSize="4" ref="prismEditor"></prism-editor>
    <v-btn color="success" icon absolute right top @click="onClick">
      <v-icon>mdi-content-save-check</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { styleStore } from '@/plugins/store/style'
import { mapWritableState } from 'pinia'
// prism
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-css' // 高亮目标代码
import 'prismjs/themes/prism-tomorrow.css' // 主题
// vue-prism-editor
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'
// js-beautify
import jsBeautify from 'js-beautify'
export default {
  components: { PrismEditor },
  data: () => ({}),
  mounted() {
    this.$refs.prismEditor.$el.querySelector('textarea').focus() // 聚焦
  },
  computed: {
    ...mapWritableState(styleStore, ['css'])
  },
  methods: {
    // 高亮
    highlighter(code) {
      return highlight(code, languages.css)
    },
    // 美化代码格式
    onClick() {
      this.css = jsBeautify.css(this.css, {
        end_with_newline: !/^\s*$/.test(this.css) // 以空行结束
      })
      document.querySelector('style[id=user-css]').innerHTML = this.css // 修改样式
    }
  }
}
</script>

<style lang="scss">
.prism-editor-wrapper .prism-editor__line-numbers {
  margin-right: 20px;
}
</style>

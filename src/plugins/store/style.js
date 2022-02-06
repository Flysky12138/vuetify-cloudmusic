import { defineStore } from 'pinia'

export const styleStore = defineStore('style', {
  state: () => ({
    css: '',
    isDark: true,
    blur: 70,
    miniDrawer: false
  }),
  persist: true,
  actions: {
    setMiniDrawer(param) {
      this.miniDrawer = param
    },
    setIsDark(param) {
      this.isDark = param
    },
    // 设置背景模糊程度 [10,100]
    setBlur(param) {
      this.blur = Math.min(Math.max(10, this.blur + param), 100)
    }
  }
})

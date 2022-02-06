import pinia from '@/plugins/store'
import { styleStore } from '@/plugins/store/style'
import vuetify from '@/plugins/vuetify'

const style = styleStore(pinia)

const theme = {
  get isDark() {
    return style.isDark
  },
  set isDark(boolean) {
    vuetify.framework.theme.isDark = boolean
    style.setIsDark(boolean)
    setTitleColor(boolean)
  }
}

function setTitleColor(boolean) {
  document.querySelector('meta[name="theme-color"]').setAttribute('content', boolean ? '#272727' : '#ffffff')
}
setTitleColor(theme.isDark)

export default theme

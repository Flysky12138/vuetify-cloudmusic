import vuetify from 'plugins/vuetify'

const theme = {
  get isDark() {
    return JSON.parse(localStorage.getItem('isDark'))
  },
  set isDark(boolean) {
    vuetify.framework.theme.isDark = boolean
    localStorage.setItem('isDark', boolean)
    setTitleColor(boolean)
  }
}

function setTitleColor(boolean) {
  document.querySelector('meta[name="theme-color"]').setAttribute('content', boolean ? '#272727' : '#ffffff')
}
setTitleColor(theme.isDark)

export default theme

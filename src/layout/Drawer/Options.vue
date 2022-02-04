<template>
  <v-list dense nav>
    <v-subheader v-text='name'></v-subheader>
    <v-list-item v-for='(item,index) in filterItems' :key='item.id' link @click='onClick(index)'>
      <v-list-item-icon>
        <v-icon color='purple lighten-3' v-text='item.icon'></v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text='item.name'></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import download from '@/common/download'
import theme from '@/common/theme'
export default {
  data: () => ({
    name: '设置',
    items: [
      { name: '夜间模式', icon: 'mdi-brightness-6' },
      { name: '导出设置', icon: 'mdi-database-export-outline' },
      { name: '导入设置', icon: 'mdi-database-import-outline' },
      { name: '退出登录', icon: 'mdi-logout' }
    ]
  }),
  computed: {
    ...mapState({
      islogin: state => state.islogin
    }),
    filterItems() {
      const _items = [...this.items]
      this.islogin || _items.pop()
      return _items
    }
  },
  methods: {
    ...mapMutations(['logout']),
    onClick(index) {
      switch (index) {
        case 0:
          theme.isDark = !theme.isDark
          break
        case 1:
          download(localStorage, 'vuetify-cloudmusic-settings.json', true)
          break
        case 2:
          const input = document.createElement('input')
          input.type = 'file'
          input.accept = 'application/json'
          input.onchange = function () {
            const reader = new FileReader()
            reader.readAsText(this.files[0], 'UTF-8')
            reader.onload = function (event) {
              const obj = JSON.parse(event.target.result)
              Object.keys(obj).forEach(key => localStorage.setItem(key, obj[key]))
            }
          }
          input.click()
          break
        default:
          // 登出
          this.$http.logout().then(() => {
            this.logout()
            this.$message({ text: '退出登录成功！', color: 'primary' })
            this.$route.path !== '/' && this.$router.replace('/')
          })
      }
    }
  }
}
</script>

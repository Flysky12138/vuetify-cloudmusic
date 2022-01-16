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
export default {
  data: () => ({
    name: '设置',
    items: [
      { name: '夜间模式', icon: 'mdi-brightness-6' },
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
  created() {
    this.setThemeDark(JSON.parse(localStorage.getItem('isDark')))
  },
  methods: {
    ...mapMutations(['logout']),
    onClick(index) {
      switch (index) {
        case 0:
          this.setThemeDark(!JSON.parse(localStorage.getItem('isDark')))
          break
        default:
          this.userLogout()
      }
    },
    // 设置主题色
    setThemeDark(boolean) {
      localStorage.setItem('isDark', boolean)
      this.$vuetify.theme.isDark = boolean
      document.querySelector('meta[name="theme-color"]').setAttribute('content', boolean ? '#272727' : '#ffffff')
    },
    // 登出
    userLogout() {
      this.$http.logout().then(() => {
        this.logout()
        this.$message({ text: '退出登录成功！', color: 'primary' })
        this.$route.path !== '/' && this.$router.replace('/')
      })
    }
  }
}
</script>

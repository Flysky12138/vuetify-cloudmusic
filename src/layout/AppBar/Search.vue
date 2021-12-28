<template>
  <v-sheet width='230' color='transparent' style='position: relative'>
    <v-text-field
      solo
      flat
      dense
      hide-details
      placeholder='search'
      :background-color='$vuetify.theme.isDark ? "" : "grey lighten-2"'
      :flat='!isFocus'
      @focus='isFocus = true'
      @blur='isFocus = false'
      v-model='value'
      @keyup.13='search(value)'
      clearable
      :items='items'
      :rounded='!items.length'
    ></v-text-field>
    <v-slide-y-transition hide-on-leave>
      <v-list class='list elevation-2 rounded-b-lg' dense v-show='!!items.length'>
        <v-list-item v-for='item in items' :key='item.id'>
          <v-list-item-content>
            <v-list-item-title v-text='item' @click='search(item)'></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-slide-y-transition>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    isFocus: false,
    value: '',
    items: [],
    settimeout: null
  }),
  watch: {
    value(newValue) {
      if (newValue) {
        this.suggest(newValue)
      } else {
        this.items = []
      }
    }
  },
  methods: {
    // 跳转到搜索界面
    search(keywords) {
      if (keywords !== '') {
        this.$router
          .push({
            path: '/search',
            query: { keywords }
          })
          .then(() => {
            this.value = ''
            this.items = []
          })
      }
    },
    // 搜索关键字
    suggest() {
      if (this.settimeout) {
        clearTimeout(this.settimeout)
      }
      this.settimeout = setTimeout(() => {
        this.$http.search.suggest(this.value).then(res => {
          this.items = this.value ? [...res] : []
        })
      }, 100)
    }
  }
}
</script>


<style lang="scss" scoped>
.list {
  position: absolute;
  width: 100%;
  overflow: hidden;
  z-index: -1;
  user-select: none;
}
</style>

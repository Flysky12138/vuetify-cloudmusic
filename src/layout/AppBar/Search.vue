<template>
  <v-sheet width='230' color='transparent' style='position: relative'>
    <v-text-field
      solo
      flat
      dense
      hide-details
      placeholder='search'
      :background-color='$vuetify.theme.isDark ? "" : "grey lighten-2"'
      @focus='isFocus = true'
      @blur='isFocus = false'
      v-model='value'
      @keyup.13='search(value)'
      clearable
      :items='items'
      :rounded='!items.length'
    ></v-text-field>
    <v-slide-y-transition hide-on-leave>
      <v-list class='elevation-1 py-0 mt-1' dense v-show='!!items.length'>
        <v-list-item v-for='item in items' :key='item.id' @click='search(item)'>
          <v-list-item-content>
            <v-list-item-title v-text='item'></v-list-item-title>
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
      if (newValue && newValue.trim()) {
        this.suggest(newValue)
      } else {
        this.items = []
      }
    }
  },
  methods: {
    // 跳转到搜索界面
    search(keywords) {
      if (keywords.trim()) {
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
.v-list {
  position: absolute;
  width: 100%;
  overflow: hidden;
  user-select: none;
  border-radius: 4px !important;
}
.v-list-item {
  border-bottom: 1px solid rgba(128, 128, 128, 0.466);
  &:last-child {
    border-bottom: none;
  }
}
</style>

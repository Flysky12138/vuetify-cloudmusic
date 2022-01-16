<template>
  <v-list dense nav>
    <v-subheader v-text='name'></v-subheader>
    <v-list-item v-for='item in items' :key='item.id' link :to='item.link'>
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
export default {
  data: () => ({
    name: '路由',
    items: [
      { name: '云盘', icon: 'mdi-cloud-outline', link: '/cloud' },
      { name: '暂存', icon: 'mdi-clipboard-text-play-outline', link: '/temporary' },
      { name: '样式', icon: 'mdi-language-css3', link: '/css' }
    ]
  })
}
</script>

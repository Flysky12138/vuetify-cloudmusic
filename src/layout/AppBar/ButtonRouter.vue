<template>
  <v-row align='center' no-gutters>
    <v-col cols='2' v-for='item in items' :key='item.id'>
      <v-btn text rounded class='text-subtitle-1 font-weight-bold' width='5vw' :to='item.link' v-text='item.name'></v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    items: [
      { name: '首页', link: '/' },
      { name: '歌单', link: '/discover/playlist?cat=全部&page=1' },
      { name: '日推', link: '/recommend' },
      { name: '关于', link: '/about' }
    ]
  })
}
</script>

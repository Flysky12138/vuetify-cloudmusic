<template>
  <v-alert border='left' colored-border elevation='1' dense color='cyan' icon='mdi-api'>
    <v-row align='center'>
      <v-col cols='12'>
        <span>提供的默认接口搭建在</span>
        <a href='https://vercel.com' target='_blank' class='text-decoration-none'>&nbsp;Vercel&nbsp;</a>
        <span>上，访问速度不理想，建议本地运行接口 Api。</span>
        <a href='https://github.com/Binaryify/NeteaseCloudMusicApi' target='_blank' class='text-decoration-none'>NeteaseCloudMusicApi</a>
      </v-col>
      <!-- NeteaseCloudMusicApi -->
      <v-col>
        <v-combobox
          label='自定义接口地址'
          placeholder='http(s)://xxx[:port]'
          outlined
          dense
          hide-details
          hide-no-data
          clearable
          v-model='api'
          :search-input.sync='api'
          :items='items'
          @blur='save'
        >
          <template v-slot:item='{ item }'>
            <v-list-item-content v-text='item'></v-list-item-content>
          </template>
        </v-combobox>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  data: () => ({
    api: '',
    items: ['http://localhost:3000']
  }),
  created() {
    this.api = JSON.parse(localStorage.getItem('api'))
  },
  methods: {
    save() {
      localStorage.setItem('api', JSON.stringify(this.api))
      this.$message({
        text: '保存成功！刷新页面后生效',
        color: 'success',
        button: {
          text: '刷新',
          f: () => {
            window.location.reload()
          }
        }
      })
    }
  }
}
</script>

<template>
  <v-alert border='left' colored-border elevation='1' dense color='cyan' icon='mdi-api'>
    <v-row align='center'>
      <v-col cols='12'>
        <span>1、提供的默认接口搭建在</span>
        <a href='https://vercel.com' target='_blank' class='text-decoration-none'>&nbsp;Vercel&nbsp;</a>
        <span>上，访问速度不理想，建议本地运行接口&nbsp;</span>
        <a href='https://github.com/Binaryify/NeteaseCloudMusicApi' target='_blank' class='text-decoration-none'>NeteaseCloudMusicApi</a>
        <br />
        <span>2、已内置解锁VIP和无版权歌曲功能（由于跨域问题，只有在本地运行该项目才生效，默认3001端口），接口&nbsp;</span>
        <a href='https://github.com/Flysky12138/UnblockNeteaseMusicApi' target='_blank' class='text-decoration-none'>UnblockNeteaseMusicApi</a>
      </v-col>
      <v-col>
        <v-combobox
          label='自定义 NeteaseCloudMusicApi 接口地址'
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

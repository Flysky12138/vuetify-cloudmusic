<template>
  <v-alert border='left' colored-border elevation='1' dense color='cyan' icon='mdi-api'>
    <v-row align='center'>
      <v-col cols='12' class='pb-0'>
        <span>1、提供的默认接口搭建在</span>
        <a href='https://vercel.com' target='_blank' class='text-decoration-none'>&nbsp;Vercel&nbsp;</a>
        <span>上，访问速度不理想，建议本地运行接口&nbsp;</span>
        <a href='https://github.com/Binaryify/NeteaseCloudMusicApi' target='_blank' class='text-decoration-none'>NeteaseCloudMusicApi</a>
        <br />
        <span>2、已内置解锁VIP和无版权歌曲功能（由于技术问题，只有在本地运行该项目才生效，默认3001端口），接口&nbsp;</span>
        <a href='https://github.com/Flysky12138/UnblockNeteaseMusicApi' target='_blank' class='text-decoration-none'>UnblockNeteaseMusicApi</a>
        <p class='text-caption red--text text--lighten-2 ma-0' style='text-indent: 26px'>
          UnblockNeteaseMusicApi 获取到的歌曲链接不能跨域，由于 Vercel 不能反代理单次超过5M的数据，而歌曲基本都超过5M，所以我提供不了线上接口。
          若像 NeteaseCloudMusicApi 一样使用本地加载方式，会因为&nbsp;MIXED CONTENT&nbsp;原因造成跨域。
          你能自己搭建接口时，只需修改本项目 vue.config.js 文件中的 devServer.proxy.target 的值为你的接口值，再启动项目即可。
        </p>
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
    this.api = this.get('api')
  },
  methods: {
    save() {
      if (this.get('api') !== this.api) {
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
    },
    get(item) {
      return JSON.parse(localStorage.getItem(item))
    }
  }
}
</script>

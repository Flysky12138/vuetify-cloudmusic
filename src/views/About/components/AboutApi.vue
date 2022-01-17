<template>
  <v-alert border='left' colored-border elevation='1' dense color='cyan' icon='mdi-api'>
    <v-row align='center'>
      <v-col cols='12' class='pb-0'>
        <span>1、提供的默认接口搭建在</span>
        <a href='https://vercel.com' target='_blank' class='text-decoration-none'>&nbsp;Vercel&nbsp;</a>
        <span>上，访问速度很慢，建议本地运行接口&nbsp;↪&nbsp;</span>
        <a class='text-decoration-none' href='https://github.com/Binaryify/NeteaseCloudMusicApi' target='_blank'>&nbsp;NeteaseCloudMusicApi&nbsp;</a>
        <br />
        <span>2、已内置解锁VIP和无版权歌曲功能（由于技术原因，不提供默认接口）↪&nbsp;</span>
        <a href='https://github.com/Flysky12138/UnblockNeteaseMusicApi' target='_blank' class='text-decoration-none'>UnblockNeteaseMusicApi</a>
        <p class='text-caption red--text text--lighten-2 ma-0' style='text-indent: 25px'>
          UnblockNeteaseMusicApi 获取到的歌曲链接不能跨域，由于 Vercel 不能反代理单次超过5M的数据，而歌曲基本都超过5M，所以我提供不了线上接口。
          若像 NeteaseCloudMusicApi 一样使用本地接口方式，会因为&nbsp;MIXED CONTENT&nbsp;原因造成&nbsp;HTTP&nbsp;强转&nbsp;HTTPS&nbsp;而获取不到资源。
          因此你需要更改网站的设置：地址栏左侧的锁按键&nbsp;>&nbsp;网站设置&nbsp;>&nbsp;不安全内容（允许）
        </p>
      </v-col>
      <v-col cols='6'>
        <v-combobox
          label='NeteaseCloudMusicApi'
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
          :error='!/^https?:\/\/[^\s/]+$/.test(api) && api'
        >
          <template v-slot:item='{ item }'>
            <v-list-item-content v-text='item'></v-list-item-content>
          </template>
        </v-combobox>
      </v-col>
      <v-col cols='6'>
        <v-combobox
          label='UnblockNeteaseMusicApi'
          placeholder='http(s)://xxx[:port]'
          outlined
          dense
          hide-details
          hide-no-data
          clearable
          v-model='unApi'
          :search-input.sync='unApi'
          :items='unItems'
          @blur='save'
          :error='!/^https?:\/\/[^\s/]+$/.test(unApi) && unApi'
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
    items: ['http://localhost:3000'],
    unApi: '',
    unItems: ['http://localhost:3001']
  }),
  created() {
    this.api = this.get('api')
    this.unApi = this.get('unApi')
  },
  methods: {
    save() {
      localStorage.setItem('unApi', this.unApi)
      if (this.get('api') !== this.api) {
        localStorage.setItem('api', this.api)
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
      return localStorage.getItem(item)
    }
  }
}
</script>

<template>
  <v-alert border="left" colored-border elevation="1" dense color="cyan" icon="mdi-api">
    <v-row align="center">
      <v-col cols="12" class="pb-0">
        <span>1、提供的默认接口搭建在</span>
        <a href="https://vercel.com" target="_blank" class="text-decoration-none">&nbsp;Vercel&nbsp;</a>
        <span>上，访问速度很慢，建议本地运行接口&nbsp;↪&nbsp;</span>
        <a class="text-decoration-none" href="https://github.com/Binaryify/NeteaseCloudMusicApi" target="_blank">&nbsp;NeteaseCloudMusicApi&nbsp;</a>
        <br />
        <span>2、已内置解锁VIP和无版权歌曲功能（由于技术原因，不提供默认接口）↪&nbsp;</span>
        <a href="https://github.com/Flysky12138/UnblockNeteaseMusicApi" target="_blank" class="text-decoration-none">UnblockNeteaseMusicApi</a>
        <p class="text-caption red--text text--lighten-2 ma-0" style="text-indent: 25px">
          UnblockNeteaseMusicApi 获取到的歌曲链接不能跨域，由于 Vercel 不能反代理单次超过5M的数据，而歌曲基本都超过5M，所以我提供不了线上接口。 若像
          NeteaseCloudMusicApi 一样使用本地接口方式，会因为&nbsp;MIXED CONTENT&nbsp;原因造成&nbsp;HTTP&nbsp;强转&nbsp;HTTPS&nbsp;而获取不到资源。
          因此你需要更改网站的设置：地址栏左侧的锁按键&nbsp;>&nbsp;网站设置&nbsp;>&nbsp;不安全内容（允许）
        </p>
      </v-col>
      <v-col cols="6">
        <v-combobox
          label="NeteaseCloudMusicApi"
          placeholder="http(s)://xxx[:port]"
          outlined
          dense
          hide-details
          hide-no-data
          clearable
          v-model="api1"
          :search-input.sync="api1"
          :items="['http://localhost:3000']"
          @blur="save"
          :error="!/^https?:\/\/[^\s/]+$/.test(api1) && api1"
        >
          <template v-slot:item="{ item }">
            <v-list-item-content>{{ item }}</v-list-item-content>
          </template>
        </v-combobox>
      </v-col>
      <v-col cols="6">
        <v-combobox
          label="UnblockNeteaseMusicApi"
          placeholder="http(s)://xxx[:port]"
          outlined
          dense
          hide-details
          hide-no-data
          clearable
          v-model="api2"
          :search-input.sync="api2"
          :items="['http://localhost:3001']"
          :error="!/^https?:\/\/[^\s/]+$/.test(api2) && api2"
        >
          <template v-slot:item="{ item }">
            <v-list-item-content>{{ item }}</v-list-item-content>
          </template>
        </v-combobox>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
import { apiStore } from '@/plugins/store/api'
import { mapWritableState } from 'pinia'
export default {
  data: () => ({}),
  computed: {
    ...mapWritableState(apiStore, ['api1', 'api2'])
  },
  methods: {
    save() {
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

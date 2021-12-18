<template>
  <v-alert border='left' colored-border elevation='1' dense color='cyan' icon='mdi-api'>
    <v-row align='center'>
      <v-col cols='12'>
        <span>提供的默认接口搭建在</span>
        <a href='https://vercel.com' target='_blank' class='text-decoration-none'>&nbsp;Vercel&nbsp;</a>
        <span>上，访问速度不理想，建议本地运行接口 Api</span>
      </v-col>
      <!-- NeteaseCloudMusicApi -->
      <v-col cols='6'>
        <div class='mt-n3 pb-3'>
          <a href='https://github.com/Binaryify/NeteaseCloudMusicApi' target='_blank' class='text-decoration-none'>NeteaseCloudMusicApi</a>
        </div>
        <v-autocomplete
          label='自定义接口地址'
          placeholder='http(s)://xxx[:port]'
          outlined
          dense
          hide-details
          hide-no-data
          clearable
          v-model='a.api'
          :items='a.items'
          @blur='save'
          @keyup.13='save'
          ref='AboutApi'
        >
          <template v-slot:item='{ item }'>
            <v-list-item-content v-text='item'></v-list-item-content>
          </template>
        </v-autocomplete>
      </v-col>
      <!-- UnblockNeteaseMusicApi -->
      <v-col cols='6'>
        <div class='mt-n3 pb-3'>
          <a href='https://github.com/Flysky12138/UnblockNeteaseMusicApi' target='_blank' class='text-decoration-none'>UnblockNeteaseMusicApi</a>
        </div>
        <v-autocomplete
          label='自定义接口地址'
          placeholder='http(s)://xxx[:port]'
          outlined
          dense
          hide-details
          hide-no-data
          clearable
          v-model='b.api'
          :items='b.items'
          @blur='save'
          @keyup.13='save'
          ref='AboutApi'
        >
          <template v-slot:item='{ item }'>
            <v-list-item-content v-text='item'></v-list-item-content>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  data: () => ({
    a: {
      api: '',
      items: ['http://localhost:3000']
    },
    b: {
      api: '',
      items: ['http://localhost:3001']
    }
  }),
  created() {
    this.a.api = JSON.parse(localStorage.getItem('api'))
    this.b.api = JSON.parse(localStorage.getItem('_api'))
  },
  methods: {
    save() {
      this.$refs.AboutApi.blur()
      localStorage.setItem('api', JSON.stringify(this.a.api))
      localStorage.setItem('_api', JSON.stringify(this.b.api))
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

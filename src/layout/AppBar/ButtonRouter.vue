<template>
  <v-row align='center' no-gutters>
    <v-col cols='2' v-for='item in items' :key='item.id'>
      <!-- 普通按键 -->
      <template v-if='item.link'>
        <v-btn text rounded class='text-subtitle-1 font-weight-bold' width='5vw' :to='item.link' v-text='item.name'></v-btn>
      </template>
      <!-- 菜单按键 -->
      <template v-else>
        <v-menu rounded='lg' transition='slide-y-transition' offset-y nudge-bottom='10' open-on-hover close-delay='100'>
          <!-- 按键 -->
          <template v-slot:activator='{ on, attrs }'>
            <v-btn v-bind='attrs' v-on='on' text rounded class='text-subtitle-1 font-weight-bold pl-7' width='5vw'>
              {{ item.name }}
              <v-icon x-small class='pt-1'>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <!-- 展开菜单 -->
          <v-list>
            <v-list-item v-for='item in item.links' :key='item.id' class='d-flex justify-center px-0'>
              <v-list-item-action class='ma-0'>
                <v-btn text class='text-subtitle-2 font-weight-bold' width='5vw' :to='item.link' tile v-text='item.name'></v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    items: [
      { name: '首页', link: '/' },
      { name: '歌单', link: '/discover/playlist' },
      { name: '日推', link: '/recommend' },
      // {
      //   name: "个性",
      //   links: [
      //     { name: "日推", link: "/recommend" },
      //     { name: "F M", link: "" },
      //   ],
      // },
      { name: '关于', link: '/about' }
    ]
  })
}
</script>

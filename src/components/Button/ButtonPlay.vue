<template>
  <v-tooltip left open-delay='1000' color='blue-grey' :disabled='tip === ""' transition='slide-x-reverse-transition'>
    <template v-slot:activator='{ on }'>
      <v-btn
        icon
        v-on='on'
        @click='addIDs(id);saveRoute($route.fullPath)'
        @contextmenu.prevent='rClick && isShow && addID(id) & hint()'
        :disabled='disable'
        style='color: inherit'
      >
        <v-icon>mdi-motion-play-outline</v-icon>
      </v-btn>
    </template>
    {{ tip }}
  </v-tooltip>
</template>

<script>
import { playerStore } from '@/plugins/store/player'
import { mapState, mapActions } from 'pinia'
export default {
  props: {
    id: { type: Array, required: true },
    name: { type: String, default: '' },
    tip: { type: String, default: '' },
    disable: { type: Boolean, default: false },
    rClick: { type: Boolean, default: false }
  },
  data: () => ({}),
  computed: {
    ...mapState(playerStore, ['isShow'])
  },
  methods: {
    ...mapActions(playerStore, ['addID', 'addIDs', 'saveRoute']),
    hint() {
      this.$message({
        text: '〖 ' + this.name + ' 〗 添加到下一首播放',
        color: 'primary'
      })
    }
  }
}
</script>

<template>
  <v-tooltip left open-delay='500' :disabled='tip === ""'>
    <template v-slot:activator='{ on }'>
      <v-btn
        icon
        v-on='on'
        @click='addIDs(id);saveRoute($route.fullPath)'
        @contextmenu.prevent='tip === "" && addID(id) & hint()'
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
import { mapMutations, mapActions } from 'vuex'
export default {
  props: {
    id: { type: Array, required: true },
    name: { type: String, default: '' },
    tip: { type: String, default: '' },
    disable: { type: Boolean, default: false }
  },
  data: () => ({}),
  methods: {
    ...mapActions(['addID', 'addIDs']),
    ...mapMutations(['saveRoute']),
    hint() {
      this.$message({
        text: '〖 ' + this.name + ' 〗 添加到下一首播放',
        color: 'primary'
      })
    }
  }
}
</script>

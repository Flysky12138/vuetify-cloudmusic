<template>
  <v-dialog v-model="dialog" width="clamp(800px, 60vw, 1000px)" overlay-opacity="0.9" autofocus>
    <template #activator="{ on, attrs }">
      <v-btn style="color: inherit" v-bind="attrs" v-on="on" icon>
        <v-icon>mdi-swap-horizontal-circle-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="py-3 px-5">
        <v-text-field
          autofocus
          :value="name"
          outlined
          dense
          v-model="value"
          label="输入欲匹配歌曲名"
          clearable
          hide-details="auto"
          @keyup.enter="search"
        ></v-text-field>
      </v-card-title>
      <v-card-text style="max-height: 400px; overflow-y: scroll">
        <song-list :value="songs" :disColumn="[4]" :itemsPerPage="songs.length" :loading="loading">
          <template #top><i></i></template>
          <template #[`item.btns`]="{ item }">
            <v-btn color="success" icon @click="match(item.id)">
              <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
            </v-btn>
          </template>
          <template #[`header.btns`]>
            <v-btn icon disabled>
              <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
            </v-btn>
          </template>
        </song-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { userStore } from '@/plugins/store/user'
import SongList from '@/components/Song/SongList.vue'
import { mapState } from 'pinia'
export default {
  components: { SongList },
  props: {
    sid: { type: Number, required: true },
    name: { type: String, required: true }
  },
  data: () => ({
    dialog: false,
    value: '',
    songs: [],
    loading: false
  }),
  created() {
    this.value = this.name
  },
  computed: {
    ...mapState(userStore, {
      uid: state => state.info.uid
    })
  },
  methods: {
    search() {
      this.loading = true
      this.$http.search.search(this.value).then(res => {
        this.songs = [...res.songs]
        this.loading = false
      })
    },
    // 歌曲信息匹配纠正
    match(asid) {
      this.$http.cloud.match(this.uid, this.sid, asid).then(res => {
        this.dialog = false
        if (res.data) {
          this.$emit('success')
        } else {
          this.$message({ text: res.message })
        }
      })
    }
  }
}
</script>

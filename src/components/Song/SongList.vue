<template>
  <v-data-table
    id='dataTable'
    ref='dataTable'
    class='elevation-0'
    :headers='filterHeaders'
    :items='value'
    :item-class='playItemStyle'
    hide-default-footer
    disable-sort
    :search='search'
    no-results-text='没有找到匹配项'
    :items-per-page='itemsPerPage'
    :page.sync='page'
    @page-count='pageCount = $event'
    :loading='loading'
    fixed-header
    @current-items='getFilteredItems'
    :custom-filter='customFilter'
  >
    <!-- top插槽 -->
    <template v-slot:top>
      <slot name='top'>
        <div class='d-flex align-end pb-4 px-3'>
          <span class='light-blue--text text--accent-4 text-h5'>{{ '"' + title + '"' }}</span>
          <span class='teal--text text--accent-4 font-italic text-caption mx-4'>
            <span v-text='value.length'></span>
            <span v-show='filteredItems.length !== value.length'>{{ ' • ' + filteredItems.length }}</span>
          </span>
          <slot />
          <v-spacer></v-spacer>
          <v-sheet width='200'>
            <v-text-field v-model='search' clearable append-icon='mdi-magnify' single-line hide-details></v-text-field>
          </v-sheet>
        </div>
      </slot>
    </template>
    <!-- header.btns插槽 -->
    <template v-slot:header.btns>
      <button-play :id='filteredItems.map((res) => res.id)' :disable='loading || !filteredItems.length' tip='播放所有' />
    </template>
    <!-- item.count插槽 -->
    <template v-slot:item.count='{ item }'>
      <!-- 听歌排行的听歌数 -->
      <span v-if='item.hasOwnProperty("count")'>{{ item.count }}</span>
      <span v-else-if='[1, 4].includes(item.privilege.fee)' class='text-caption red--text'>vip</span>
      <span v-else>{{ value.indexOf(item) + 1 }}</span>
    </template>
    <!-- item.name插槽 -->
    <template v-slot:item.name='{ item }'>
      <v-dialog overlay-opacity='0.9' content-class='dialog' @click:outside='$refs[`mv${item.id}`].pause()'>
        <template v-slot:activator='{ on, attrs }'>
          <span v-on='on' v-bind='attrs' @click='$refs[`mv${item.id}`] && $refs[`mv${item.id}`].play()'>{{ item.name }}</span>
        </template>
        <mv :songid='item.id' :mvid='item.mv' :ref='`mv${item.id}`' />
      </v-dialog>
    </template>
    <!-- item.artists插槽 -->
    <template v-slot:item.artists='{ item }'>
      <span v-for='(_item, index) in item.artists' :key='index'>
        <span v-if='index !== 0'>&nbsp;/&nbsp;</span>
        <button @click='lookArtists(_item.id)'>{{ _item.name }}</button>
      </span>
    </template>
    <!-- item.album插槽 -->
    <template v-slot:item.album='{ item: { album } }'>
      <button @click='lookAlbum(album.id)' v-if='album.id' style='text-indent: -5px;text-align: start'>{{ '《' + album.name + '》' }}</button>
    </template>
    <!-- item.dt插槽 -->
    <template v-slot:item.dt='{ item }'>
      <span>{{ $time.song(item.dt) }}</span>
    </template>
    <!-- item.btns插槽 -->
    <template v-slot:item.btns='{ item }'>
      <div class='d-flex justify-end'>
        <slot name='item.btn.before' v-bind='item' />
        <slot name='item.btn.one' v-bind='item'>
          <button-add :id='item.id' :notHave='item.privilege.st < 0 && !item.privilege.cs' />
        </slot>
        <button-play :id='[item.id]' :name='item.name' :disable='item.id === id' rClick tip='右键添加到下一首播放' />
      </div>
    </template>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <v-pagination v-if='pageCount > 1' v-model='page' :length='pageCount' :total-visible='11' circle color='blue lighten-2' class='my-3'></v-pagination>
    </template>
  </v-data-table>
</template>

<script>
import { playerStore } from '@/plugins/store/player'
import { mapState } from 'pinia'
import { EventBus } from '@/common/eventBus.js'
import ButtonPlay from '@/components/Button/ButtonPlay.vue'
import ButtonAdd from '@/components/Button/ButtonAdd.vue'
import Mv from '@/components/Mv.vue'
export default {
  components: { ButtonPlay, ButtonAdd, Mv },
  props: {
    // 标题
    title: { type: String, default: '' },
    // 每一项包含歌曲详情
    value: { type: Array, required: true },
    // 单页显示列表数
    itemsPerPage: { type: Number, default: 30 },
    // 是否正在加载
    loading: { type: Boolean, default: false },
    // 隐藏的项
    disColumn: { type: Array, default: () => [] }
  },
  data: () => ({
    search: '', // 过滤
    page: 1, // 当前浏览页
    pageCount: 0, // 分页数
    // 表头
    headers: [
      { text: '#', align: 'center', value: 'count' },
      { text: '歌曲标题', value: 'name' },
      { text: '歌手', value: 'artists' },
      { text: '专辑', value: 'album' },
      { text: '时长', value: 'dt' },
      { text: '', align: 'end', value: 'btns' }
    ],
    filteredItems: [], // 过滤后的列表数据
    autoPage: false // 是否是为了定位歌曲而自动换页
  }),
  computed: {
    ...mapState(playerStore, {
      id: state => state.music.id
    }),
    // 过滤表头
    filterHeaders() {
      return this.headers.filter((res, index) => !this.disColumn.includes(index))
    }
  },
  watch: {
    /**
     * 到达最后一页时回调事件
     * 由于过滤搜索时会减少分页，因此当过滤后数据减少，可能会到最后一页，所以和oldValue比较大小，以便排除该事件
     * 效果：从数值小的一页跳转到数值更大的最后一页才会执行
     */
    page(newValue, oldValue) {
      if (newValue > oldValue && newValue === this.pageCount) {
        this.$emit('pageEnd', this.pageCount)
      }
      // 换页滚动到表格顶部
      if (!this.autoPage) {
        this.$vuetify.goTo('#dataTable', {
          duration: 600, // 动画时长
          offset: 0, // 偏移
          easing: 'easeOutQuad' // 动画
        })
      }
      this.autoPage = false
    }
  },
  methods: {
    // 获取过滤后的列表数据
    getFilteredItems() {
      this.$nextTick(() => {
        this.filteredItems = this.$refs.dataTable.$children[0].filteredItems
      })
    },
    // 自定义过滤器
    customFilter(value, search, item) {
      return [item.name, ...item.artists.map(_res => _res.name), item.album.name, this.$time.song(item.dt)].some(res =>
        res.toLowerCase().includes(search.toLowerCase())
      )
    },
    // 设置正在播放歌曲项的类
    playItemStyle(params) {
      let _class = ''
      if (params.id === this.id) {
        _class = 'playItem'
      } else if (params.privilege) {
        if (params.privilege.st < 0 && !params.privilege.cs) {
          _class += ' text--disabled'
        }
      }
      return _class
    },
    // 查看歌手
    lookArtists(params) {
      if (this.$route.query.id !== params && !!params) {
        this.$router.push({
          path: '/artists',
          query: {
            id: params
          }
        })
      }
    },
    // 查看专辑
    lookAlbum(params) {
      if (this.$route.query.id !== params && !!params) {
        this.$router.push({
          path: '/album',
          query: {
            id: params
          }
        })
      }
    },
    // 为了定位播放歌曲而换页
    locate() {
      return {
        start: () => {
          EventBus.$on('locateMusicEvent', () => {
            this.autoPage = true
            const index = this.value.findIndex(res => res.id === this.id)
            if (index !== -1) {
              this.page = Math.ceil((index + 1) / this.itemsPerPage)
            }
          })
        },
        stop: () => {
          EventBus.$off('locateMusicEvent')
        }
      }
    }
  },
  created() {
    this.locate().start()
  },
  beforeDestroy() {
    this.locate().stop()
  },
  activated() {
    this.locate().start()
  },
  deactivated() {
    this.locate().stop()
  }
}
</script>

<style lang="scss">
.dialog {
  width: auto;
}
</style>

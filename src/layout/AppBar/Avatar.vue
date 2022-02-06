<template>
  <div v-if='islogin' class='d-flex'>
    <image-avatar :uid='info.uid' :src='info.avatarUrl'></image-avatar>
    <!-- 等级显示 -->
    <span class='mb-n1 align-self-end green--text text-caption font-weight-black font-italic'>{{ "Lv." + info.level }}</span>
  </div>
  <v-avatar v-else color='grey lighten-2' size='38'>
    <v-btn icon to='/login'>
      <v-icon>mdi-account-outline</v-icon>
    </v-btn>
  </v-avatar>
</template>

<script>
import { userStore } from '@/plugins/store/user'
import { mapState } from 'pinia'
import ImageAvatar from '@/components/Image/ImageAvatar.vue'
export default {
  components: { ImageAvatar },
  data: () => ({}),
  computed: {
    ...mapState(userStore, ['islogin', 'info'])
  }
}
</script>

<template>
  <div v-if='islogin' class='d-flex'>
    <image-avatar :uid='user.uid' :src='user.avatarUrl'></image-avatar>
    <!-- 等级显示 -->
    <span class='mb-n1 align-self-end green--text text-caption font-weight-black font-italic'>{{ "Lv." + user.level }}</span>
  </div>
  <v-avatar v-else color='grey lighten-2' size='38'>
    <v-btn icon to='/login'>
      <v-icon>mdi-account-outline</v-icon>
    </v-btn>
  </v-avatar>
</template>

<script>
import { mapState } from 'vuex'
import ImageAvatar from 'components/Image/ImageAvatar.vue'
export default {
  components: { ImageAvatar },
  data: () => ({}),
  computed: {
    ...mapState({
      islogin: state => state.islogin,
      user: state => state.user
    })
  }
}
</script>

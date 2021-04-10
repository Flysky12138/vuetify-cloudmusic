<template>
  <v-btn icon @click="love" :disabled="!islogin">
    <v-icon v-if="islove" color="red">mdi-heart</v-icon>
    <v-icon v-else>mdi-heart-plus</v-icon>
  </v-btn>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    id: { type: Number, required: true }
  },
  data: () => ({
    islove: false
  }),
  created() {
    this.isLove();
  },
  watch: {
    id: "isLove"
  },
  computed: {
    ...mapState({
      islogin: state => state.islogin,
      uid: state => state.user.uid
    })
  },
  methods: {
    // 是否已添加喜欢音乐列表
    isLove() {
      this.islove = false;
      this.$http.song.likelist(this.uid).then(res => {
        this.islove = res.indexOf(this.id) === -1 ? false : true;
      });
    },
    // 从喜欢音乐列表添加、移除
    love() {
      this.$http.song.like(this.id, !this.islove).then(() => {
        this.islove = !this.islove;
      });
    }
  }
};
</script>

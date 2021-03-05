<template>
  <div class="d-flex align-center">
    <!-- 按键 -->
    <button-router />
    <!-- 搜索框 -->
    <search />
    <!-- 头像 -->
    <avatar class="ml-6" />
    <!-- 等级显示 -->
    <v-scroll-x-reverse-transition>
      <span
        v-show="islogin"
        class="mb-n1 align-self-end green--text text-caption font-weight-black font-italic"
      >
        {{ "Lv." + level }}
      </span>
    </v-scroll-x-reverse-transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ButtonRouter from "./ButtonRouter.vue";
import Search from "./Search.vue";
import Avatar from "./Avatar.vue";
export default {
  components: { ButtonRouter, Search, Avatar },
  data: () => ({}),
  computed: {
    ...mapState({
      islogin: (state) => state.islogin,
      level: (state) => state.user.level,
    }),
  },
};
</script>

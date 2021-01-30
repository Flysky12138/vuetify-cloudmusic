<template>
    <v-menu
      rounded="lg"
      transition="slide-y-transition"
      :open-on-hover="OpenOnHover"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          text
          rounded
          class="text-subtitle-1 font-weight-bold"
          width="5vw"
        >
          <!-- icon宽12px,空div用来使文字居中 -->
          <div class="ml-3"></div>
          {{ value.name }}
          <v-icon x-small class="pt-1">{{ icon }}</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in value.links"
          :key="index"
          class="d-flex justify-center px-0"
        >
          <v-list-item-action class="ma-0">
            <v-btn text rounded class="text-subtitle-2 font-weight-bold">
              {{ item.name }}
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
export default {
  props: {
    value: { type: Object, required: true },
    OpenOnHover: { type: Boolean, default: false },
  },
  data: () => ({
    icon: "mdi-chevron-down",
  }),
};
</script>

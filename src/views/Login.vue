<template>
  <v-row justify="center" align="center" style="height: 80vh">
    <v-card width="50%" min-width="500px" rounded="lg" elevation="4">
      <v-card-title
        class="justify-center text-center font-weight-bold text-h4 blue--text"
      >
        {{ title }}
      </v-card-title>
      <v-divider></v-divider>
      <v-tabs v-model="tab" color="basil" grow>
        <v-tab v-for="item in items" :key="item" class="font-weight-bold">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, index) in items" :key="index">
          <v-row justify="center" class="py-4">
            <v-col cols="5">
              <v-text-field
                :label="label[0]"
                prefix="+86"
                counter="11"
                maxlength="11"
                clearable
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="1"></v-col>
            <v-col cols="3">
              <v-text-field :label="label[1]" maxlength="5" counter="5">
                <template v-slot:append-outer>
                  <v-progress-circular
                    indeterminate
                    color="blue"
                    size="20"
                  ></v-progress-circular>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    tab: null,
    title: "登录",
    label: ["手机号", "验证码"],
    items: ["短信", "二维码"],
    rules: {
      required: (value) => {
        const pattern = new RegExp(
          "^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$"
        );
        return value.length <= 10 || pattern.test(value) || "这是手机号？";
      },
    },
  }),
};
</script>

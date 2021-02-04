<template>
  <v-row justify="center">
    <v-col cols="7" sm="5">
      <v-text-field
        :label="label[0]"
        prefix="+86"
        counter="11"
        maxlength="11"
        clearable
        autofocus
        v-model="value.message"
        :success="inputTrue"
      ></v-text-field>
    </v-col>

    <v-col sm="1" class="hidden-xs-only"></v-col>

    <v-col cols="7" sm="3">
      <v-text-field
        :label="label[1]"
        maxlength="5"
        counter="5"
        :disabled="!inputTrue"
        ref="Code"
        v-model="value.code"
      >
        <template v-slot:append-outer>
          <v-progress-circular
            indeterminate
            color="blue"
            size="25"
            width="2"
            v-show="time.isShowTime"
          >
            <span class="caption">{{ time.value }}</span>
          </v-progress-circular>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    label: ["手机号", "验证码"],
    value: {
      message: "",
      code: "",
    },
    inputTrue: false,
    time: {
      value: 60,
      isShowTime: false,
      interval: {},
    },
    rules: new RegExp(
      "^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$"
    ),
  }),
  watch: {
    "value.message"(newValue) {
      if (this.rules.test(newValue)) {
        this.inputTrue = true;
        setTimeout(() => {
          this.getCode();
          this.countDown();
          this.time.isShowTime = true;
          this.$refs.Code.focus();
        }, 500);
      } else {
        this.inputTrue = false;
      }
    },
    inputTrue(newValue, oldValue) {
      if (!newValue && oldValue) {
        this.value.code = "";
        this.time.isShowTime = false;
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.time.interval);
  },
  methods: {
    getCode() {},
    countDown() {
      clearInterval(this.time.interval);
      this.time.value = 60;
      this.time.interval = setInterval(() => {
        this.time.value--;
        if (this.time.value === 0) {
          clearInterval(this.time.interval);
          this.time.isShowTime = false;
        }
      }, 1000);
    },
  },
};
</script>

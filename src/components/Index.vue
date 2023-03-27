<template>
  <div class="main" :style="iStyle.main">
    <clock />
    <search-box />
    <website-bar :style="iStyle.wb" />
    <options :show-option="showOption" />

    <i-ep-setting class="setting" @click="ctrlOption" v-show="!showOption" />
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref } from "vue";
import Clock from "./Index/Clock.vue";
import SearchBox from "./Index/SearchBox.vue";
import WebsiteBar from "./Index/WebsiteBar.vue";
import Options from "./Options.vue";

import emitter from "@/js/bus";
import optionStore from "@/store/optionStore";
import { iWatch } from "../js/watch";

// Data
const showOption = ref(false);
const store = optionStore().other.options;
const iStyle = ref({ main: "", wb: "" });

// Methods
const ctrlOption = function () {
  showOption.value = !showOption.value;
};

// Mitt emits
emitter.on("ctrlOption", ctrlOption);
onBeforeUnmount(() => emitter.off("ctrlOption"));

// Watch
watch(
  store,
  (obj) => {
    iWatch(obj, (a, b) => (iStyle.value = { main: a, wb: b }));
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped>
.main {
  max-width: 1200px;
  margin: auto;
  box-sizing: border-box;
  padding: 150px 0;
  @include transition-5;
  .setting {
    @include position(fixed, auto, 1rem, 2rem, auto, auto);
    font-size: 24px;
    color: rgba(244, 244, 245, 0.8);
    stroke: rgb(244, 244, 245);
    stroke-width: 15;
    cursor: pointer;
  }
}
</style>

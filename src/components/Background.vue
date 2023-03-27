<template>
  <div class="background">
    <div class="bg-warp" :style="bgStyle.warp"></div>
    <div class="bg-mask" :style="bgStyle.mask"></div>
  </div>
  <bg-setting />
</template>

<script setup>
import { ref } from "vue";
import BgSetting from "./BgSetting.vue";
import optionStore from "@/store/optionStore";
import { bgWatch } from "@/js/watch";
import emitter from "@/js/bus";

// Data
const store = optionStore().background.options;
const bgStyle = ref({ warp: "", mask: "" });

const bgImg = function (val) {
  store.img.value = val;
};

emitter.on("bgImg", bgImg);
onBeforeUnmount(() => emitter.off("bgImg"));

// Watch
watch(
  store,
  (obj) => {
    bgWatch(obj, (a, b) => (bgStyle.value = { warp: a, mask: b }));
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped>
.background {
  .bg-warp {
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
  }
  .bg-mask {
    background-color: black;
  }
  .bg-warp,
  .bg-mask {
    @include fixed-full;
    z-index: -1;
    @include transition-5;
  }
}
</style>

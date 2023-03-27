<template>
  <div
    style="min-height: 100px; margin-bottom: 30px"
    v-if="!cStyle.cDisplay"
  ></div>
  <div class="clock" :style="cStyle.clock" v-show="cStyle.cDisplay">
    <div class="time">
      <i>{{ dateTime.time }}</i>
      <i v-if="cStyle.sDisplay">{{ dateTime.secondTime }}</i>
    </div>
    <div class="date">
      {{ dateTime.date }} {{ dateTime.week }} {{ dateTime.lunar }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { getTime } from "@/js/time";
import optionStore from "@/store/optionStore";
import { cWatch } from "../../js/watch";

// Data
const store = optionStore().clock.options;
const dateTime = ref("");
const cStyle = ref({ clock: "", cDisplay: true, sDisplay: true });

onMounted(() => {
  dateTime.value = getTime();
  const timer = setInterval(() => {
    dateTime.value = getTime();
  }, 100);
});
onUnmounted(() => {
  if (timer) clearInterval(timer);
});

// Watch
watch(
  store,
  (obj) => {
    cWatch(
      obj,
      (a, b, c) => (cStyle.value = { clock: a, cDisplay: b, sDisplay: c })
    );
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped>
.clock {
  margin-bottom: 60px;
  color: white;
  text-shadow: rgb(0 0 0 / 10%) 0.2rem 0.2rem;
  user-select: none;
  .time {
    font-size: 4.5rem;
    line-height: 1;
    font-weight: bolder;
  }
  .date {
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin-top: 8px;
  }
}
</style>

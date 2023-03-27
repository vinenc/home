<template>
  <div class="result">
    <div
      class="item"
      :style="
        listIndex == index ? 'padding: 0 2rem;background-color: white;' : ''
      "
      v-for="(item, index) in resultList"
      :key="index"
      @click="$emit('doSearch')"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup>
defineProps(["resultList", "listIndex"]);
defineEmits(["doSearch"]);
</script>

<style lang="scss" scoped>
.result {
  background-color: rgba(244, 244, 245, 1);
  border-radius: 5px;
  .item {
    height: 2.5rem;
    line-height: 2.5rem;
    padding: 0 1rem;
    text-align: left;
    cursor: pointer;
    transition-property: padding;
    transition-duration: 0.5s;
    &:hover {
      background-color: white;
      padding: 0 2rem;
    }
  }
}
</style>

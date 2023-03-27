<template>
  <div class="option-bar">
    <div class="button" @click="$emit('changeSetting', 'layout')">
      <i-ep-setting />
      <i>设置</i>
    </div>
    <div class="button" @click="$emit('changeSetting', 'user')">
      <i-ep-user />
      <i>我的</i>
    </div>
  </div>
</template>

<script setup>
defineEmits(["changeSetting"]);
</script>

<style lang="scss" scoped>
.option-bar {
  display: flex;
  height: 32px;
  margin: 0 16px;
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
    line-height: 32px;
    font-size: 18px;
    cursor: pointer;
    i {
      margin-left: 3px;
    }
  }
}
</style>

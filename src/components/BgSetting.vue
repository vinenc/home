<template>
  <el-dialog
    class="add-site"
    :model-value="bgSetting"
    title="更换背景连接"
    width="500px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <el-input v-model="input"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="ctrlBgSetting">取消</el-button>
        <el-button type="primary" @click="changeBgImg"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { onBeforeUnmount, ref } from "vue";
import emitter from "@/js/bus";
const input = ref("");
const bgSetting = ref(false);
const ctrlBgSetting = function () {
  bgSetting.value = !bgSetting.value;
};
const changeBgImg = function () {
  if (input) {
    emitter.emit("bgImg", input.value);
    ctrlBgSetting();
  }
};

emitter.on("ctrlBgSetting", ctrlBgSetting);
onBeforeUnmount(() => emitter.off("ctrlBgSetting"));
</script>

<style lang="scss" scoped></style>

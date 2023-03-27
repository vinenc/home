<template>
  <div class="options" :class="showOption ? 'translate-0' : 'translate-h1'">
    <div class="action">
      <el-button class="save" size="small" @click="saveOptions" v-if="saveBtn">
        保存
      </el-button>
      <el-button class="close" @click="closeOption" plain circle text>
        <i-ep-close />
      </el-button>
    </div>

    <!-- OptionBar -->
    <option-bar @change-setting="changeSetting" />
    <div class="line" :class="showUser ? 'translate-h1' : 'translate-0'"></div>

    <div class="setting" :class="showUser ? 'translate-h-05' : 'translate-0'">
      <!-- Setting -->
      <layout :reset-data="resetData" />
      <!-- User -->
      <user />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import OptionBar from "./Options/OptionBar.vue";
import Layout from "./Options/Layout.vue";
import User from "./Options/User.vue";

import emitter from "@/js/bus";
import optionStore from "@/store/optionStore";
import { resetFun } from "@/js/watch";

// Data
defineProps(["showOption"]);
const saveBtn = ref(false);
const showUser = ref(false);
const store = optionStore().$state;
const resetData = ref(JSON.parse(JSON.stringify(store)));

// Methods
const closeOption = function () {
  emitter.emit("ctrlOption");
  resetFun(store, resetData.value);
  setTimeout(() => {
    saveBtn.value = false;
  }, 500);
};
const saveOptions = function () {
  const newOptionData = JSON.stringify(store);
  localStorage.setItem("Option", newOptionData);
  resetData.value = JSON.parse(newOptionData);
  saveBtn.value = false;
  closeOption();
};
const changeSetting = function (val) {
  if (val == "user") showUser.value = true;
  else showUser.value = false;
};

// Watch
watch(store, () => (saveBtn.value = true), { deep: true });
</script>

<style lang="scss" scoped>
.options {
  width: 350px;
  padding: 16px 0;
  @include position(fixed, 0, 0, 0, auto, 10);
  color: #3c3c3cb3;
  background-color: #fff;
  opacity: 0.95;
  user-select: none;
  @include scrollbar-small;
  .action {
    display: flex;
    align-items: center;
    position: relative;
    height: 1.5rem;
    margin: 0 16px 16px;
    .close {
      position: absolute;
      right: 0;
      cursor: pointer;
    }
  }
  .line {
    margin: 3px 0;
    width: 50%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .setting {
    width: 200%;
    @include flex-center;
  }
}
.options,
.action,
.line,
.setting {
  @include transition-5;
}
</style>

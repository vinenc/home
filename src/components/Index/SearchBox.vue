<template>
  <div class="search-box">
    <div class="search-mask" @click="closeMask" v-if="maskActive"></div>
    <div class="search" :style="sbStyle.search" id="search">
      <el-input
        class="input"
        v-model="input"
        @focus="inputFocus"
        @blur="inputBlur"
        @input="inputChange"
        @keydown.enter="doSearch"
        @keydown.down.prevent="inputUpDown('down')"
        @keydown.up.prevent="inputUpDown('up')"
        autofocus
      >
        <template #suffix>
          <div class="button" v-show="input">
            <i-ep-close @click="clearInput" />
            <i-ep-search @click="doSearch" />
          </div>
        </template>
      </el-input>
    </div>
    <Engine-Box
      class="engine-box change-width"
      :style="sbStyle.eR"
      v-show="engineActive"
      :engine="engine"
      :engine-list="engineList"
      @change-engine="changeEngine"
    />
    <Result-Box
      class="result-box change-width"
      :style="sbStyle.eR"
      v-show="engineActive"
      :result-list="resultList"
      :engine-list="engineList"
      :list-index="listIndex"
      :engine="engine"
      @do-search="doSearch"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import EngineBox from "./Engine.vue";
import ResultBox from "./Result.vue";

import { getRequest } from "@/api/search";
import { engineData } from "@/js/data";
import optionStore from "@/store/optionStore";
import { sbWatch } from "@/js/watch";

// Data
const input = ref("");
const resultList = ref([]);
const engine = ref("baidu");
const engineList = ref(engineData);
const engineActive = ref(false);
const maskActive = ref(true);

const store = optionStore().searchBox.options;
const sbStyle = ref({ search: "", eR: "" });
let listIndex = -1;

// Methods

// 获取焦点事件。激活Mask遮罩，透明度改为1，如果input有内容则激活引擎
const inputFocus = function () {
  if (input.value) {
    engineActive.value = true;
  }
  maskActive.value = true;
  document.getElementById("search").style.opacity = 1;
};
// 失去焦点事件。如果引擎处于激活状态，则返回。否则执行closeMask()。作为遮罩的补充，使点击介于搜索框和遮罩的其他地方，也能够使搜索框处于未激活状态
const inputBlur = function () {
  if (engineActive.value) return;
  else {
    closeMask();
  }
};
// input值改变时触发
const inputChange = function () {
  // 如果值在结果数组中存在，则返回。目的是选择结果时不会重新进行词条联想
  resultList.value.forEach((el) => {
    if (el == input.value) return;
  });
  // 如果有值，则激活引擎，进行词条联想。无值则关闭引擎，清空结果
  if (input.value) {
    engineActive.value = true;
    const callback = (val) => (resultList.value = val);
    getRequest(input.value, engine.value, callback);
    listIndex = -1;
  } else {
    engineActive.value = false;
    resultList.value = [];
  }
};
// 关闭Mask遮罩，关闭引擎，恢复透明度设置。使搜索框处于未激活状态
const closeMask = function () {
  maskActive.value = false;
  engineActive.value = false;
  document.getElementById("search").style.opacity = store.opacity.value / 100;
};
// 清除input内容，关闭引擎
const clearInput = function () {
  input.value = "";
  engineActive.value = false;
};
// 点击或enter，跳转搜索
const doSearch = function () {
  if (!input.value) return;
  window.open(engineList.value[engine.value].url + input.value);
};
// 更换搜索引擎
const changeEngine = function (val) {
  engine.value = val;
  inputChange();
};
// 上下按键选择结果，写入input
const inputUpDown = function (type) {
  const a = resultList.value;
  // 如果引擎没有激活，或者结果数组为0，则返回
  if (!engineActive.value || a.length == 0) return;
  if (type == "down") {
    listIndex++;
    // 下移，超出数组范围，则回到头部
    if (listIndex == a.length) listIndex = 0;
  } else if (type == "up") {
    listIndex--;
    // 上移，超出数组范围，则回到尾部
    if (listIndex < 0) listIndex = a.length - 1;
  }
  // 将选择的词条写入input
  input.value = a[listIndex];
};

// Watch
watch(
  store,
  (obj) => {
    sbWatch(obj, (a, b) => (sbStyle.value = { search: a, eR: b }));
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped>
.search-box {
  position: relative;
  .search-mask {
    @include fixed-full;
    background-color: rgba(0, 0, 0, 0);
  }
  .search {
    height: 48px;
    width: 80%;
    margin: auto;
    @include transition-5;
    .input {
      height: 100%;
      font-size: 1.2rem;
      color: #000;
      box-shadow: rgb(0 0 0 / 10%) 0px 0px 15px 3px;
    }
    .button {
      @include flex-center;
      font-size: 1rem;
      svg {
        margin-left: 8px;
        cursor: pointer;
        &:hover {
          color: cornflowerblue;
        }
      }
    }
  }
  .engine-box,
  .result-box {
    position: absolute;
    right: 0;
    left: 0;
    margin: auto;
    @include transition-5;
  }
  .engine-box {
    bottom: 100%;
    height: 96px;
  }
  .result-box {
    top: 100%;
    margin-top: 8px;
    z-index: 1;
  }
}
</style>

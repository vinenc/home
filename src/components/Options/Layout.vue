<template>
  <div class="layout">
    <el-collapse class="item-box" accordion style="border: none">
      <el-collapse-item
        v-for="list in optionsData"
        :title="list.name"
        :name="list.value"
        :key="list.value"
      >
        <!-- Item -->
        <div
          class="item"
          v-for="(item, itemKey) in list.options"
          :key="itemKey"
        >
          <!-- Slider -->
          <div class="slider" v-if="item.type == 'slider'">
            <i style="float: left">{{ item.name }}</i>
            <i style="float: right">{{ item.value + item.unit }}</i>
            <el-slider
              v-model="item.value"
              size="small"
              :min="item.min"
              :max="item.max"
              :show-tooltip="false"
              style="--el-slider-button-size: 8px"
            />
          </div>

          <!-- Switch -->
          <div class="switch" v-if="item.type == 'switch'">
            <i>{{ item.name }}</i>
            <el-switch
              v-model="item.value"
              size="small"
              width="40"
              style="--el-switch-on-color: #13ce66"
            />
          </div>

          <!-- Button -->
          <div class="button" v-if="item.type == 'button'">
            <i>{{ item.name }}</i>
            <el-button
              type="primary"
              size="small"
              width="200"
              @click="clickButton(itemKey)"
              plain
            >
              {{ item.text }}
            </el-button>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import optionStore from "@/store/optionStore";
import { resetFun } from "@/js/watch";
import emitter from "@/js/bus";

// Data
const props = defineProps(["resetData"]);
const store = optionStore();
const optionsData = store.$state;

// Methods
const clickButton = function (key) {
  // Reset Button
  if (key == "reset") {
    resetFun(optionsData, props.resetData);
  }
  if (key == "edit") {
    emitter.emit("editStart");
  }
  if (key == "img") {
    emitter.emit("ctrlBgSetting");
  }
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  .item-box {
    margin: 0 16px;
    padding: 16px;
    .item {
      padding: 5px 10px;
      .switch,
      .button {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>

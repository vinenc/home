<template>
  <div class="edit-btn" :class="siteEdit ? 'translate-0' : 'translate-v-1'">
    <p>你正在编辑导航，请确认修改</p>
    <div class="add" @click="ctrlDialog">
      <i-ep-plus class="plus" />
    </div>
    <div class="btn-box">
      <el-button @click="editCancel">取消</el-button>
      <el-button @click="editComplete">完成</el-button>
    </div>
  </div>
  <add-site @ctrl-dialog="ctrlDialog" :dialog-visible="dialogVisible" />
</template>

<script setup>
import AddSite from "./AddSite.vue";
import emitter from "@/js/bus";
import { recover, complete } from "@/js/drag";

const props = defineProps(["siteEdit", "websiteList"]);
const dialogVisible = ref(false);

const ctrlDialog = function () {
  dialogVisible.value = !dialogVisible.value;
};
const editComplete = function () {
  const list = props.websiteList;
  complete(list.item, list.del);
  emitter.emit("editEnd");
};
const editCancel = function () {
  const list = props.websiteList;
  recover(list.origin, list.del, list.add);
  emitter.emit("editEnd");
};
</script>

<style lang="scss" scoped>
.edit-btn {
  width: 300px;
  position: fixed;
  top: 0;
  border-radius: 0 0 25% 25%;
  background-color: rgb(244, 244, 245, 0.98);
  @include transition-5;
  p {
    padding: 0;
  }
  .add {
    width: 72px;
    height: 72px;
    margin: 0 auto;
    @include flex-center;
    border-radius: 24px;
    background-color: rgba(127, 127, 127, 0.2);
    border-color: 1px solid rgba(70, 70, 70, 0.2);
    cursor: pointer;
    .plus {
      font-size: 1.5rem;
      color: rgb(236, 236, 236);
    }
  }
  .btn-box {
    @include display(flex, space-around, center);
    margin: 16px 48px;
  }
}
</style>

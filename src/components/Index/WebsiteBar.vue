<template>
  <div class="website-bar" :style="siteEdit ? '--transV:0' : ''">
    <ul class="item-box" :style="wbStyle.box" id="websiteBar">
      <web-item
        :wb-style="wbStyle"
        :website-list="websiteList"
        :site-edit="siteEdit"
      />
    </ul>
    <edit-dialog :website-list="websiteList" :site-edit="siteEdit" />
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref } from "vue";
import WebItem from "./websiteBar/WebItem.vue";
import EditDialog from "./WebsiteBar/EditDialog.vue";
import optionStore from "@/store/optionStore";
import websiteStore from "@/store/websiteStore";
import emitter from "@/js/bus";
import { wbWatch } from "@/js/watch";
import { onDragStart, onDragOver } from "@/js/drag";

// Data
const websiteList = websiteStore().$state;
const siteEdit = ref(false);
const store = optionStore().websiteBar.options;
const wbStyle = ref({ box: "", item: "", icon: "" });

// Methods
const editStart = function () {
  siteEdit.value = true;
  const node = document.querySelector("#websiteBar");
  const list = node.getElementsByTagName("li");
  for (let i = 0; i < list.length; i++) {
    websiteList.origin.push(list[i]);
  }
  node.ondragstart = (event) => onDragStart(event);
  node.ondragover = (event) => onDragOver(event);
  emitter.emit("ctrlOption");
};
const editEnd = function () {
  websiteList.del = [];
  websiteList.origin = [];
  websiteList.add = [];
  siteEdit.value = false;
};

emitter.on("editStart", editStart);
emitter.on("editEnd", editEnd);

onBeforeUnmount(() => {
  emitter.off("editStart");
  emitter.off("editEnd");
});

// Watch
watch(
  store,
  (obj) => {
    wbWatch(obj, (a, b, c) => (wbStyle.value = { box: a, item: b, icon: c }));
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped>
.website-bar {
  @include flex-center;
  user-select: none;
  --transV: -0.5rem;
  .item-box {
    @include flex-center;
    flex-wrap: wrap;
    padding-top: 15px;
    @include scrollbar-none;
  }
}
.website-bar,
.item-box {
  @include transition-5;
}
</style>

<template>
  <li
    class="item"
    v-for="(item, index) in websiteList.item"
    :key="index"
    :draggable="siteEdit"
    :id="index"
    @click="goWebsite(item.url)"
  >
    <div v-if="item" :style="wbStyle.item">
      <div class="logo-box">
        <img
          class="logo"
          :style="wbStyle.icon"
          :src="`https://cos.waowaowao.cn/home/website_icon/${item.icon}`"
          :alt="item.icon"
        />
        <i-ep-CircleClose
          class="delete"
          @click.self="deleteItem($event)"
          v-if="siteEdit"
        />
      </div>
      <p class="name">{{ item.name }}</p>
    </div>
  </li>
</template>

<script setup>
import { deleteSite } from "@/js/drag";
const props = defineProps(["websiteList", "wbStyle", "siteEdit"]);

const goWebsite = function (url) {
  if (props.siteEdit) return;
  window.open(url);
};
const deleteItem = function (el) {
  deleteSite(el, props.websiteList.del);
};
</script>

<style lang="scss" scoped>
.item {
  cursor: pointer;
  &:hover {
    transform: translate(0, var(--transV));
  }
  .logo-box {
    @include flex-center;
    position: relative;
    .logo {
      width: 64px;
      border-radius: 1rem;
      pointer-events: none;
    }
    .delete {
      position: absolute;
      top: -0.5rem;
      right: -0.5rem;
      border-radius: 50%;
      color: white;
      background-color: rgba(0, 0, 0, 0.2);
      cursor: pointer;
      &:hover {
        color: deepskyblue;
        background-color: rgba(0, 0, 0, 0.32);
      }
    }
  }
  .name {
    font-size: 0.75rem;
    line-height: 1rem;
    margin: 7px 0 0;
    color: white;
  }
}
.item,
.logo {
  @include transition-5;
}
</style>

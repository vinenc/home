<template>
  <div class="engine">
    <div class="item" v-for="(item, key) in engineList" :key="key">
      <div class="arrows" v-show="item.engine == engine">
        <i-ep-caret-bottom />
      </div>
      <el-tooltip effect="dark" :content="item.name" placement="top">
        <div
          class="logo"
          @click="$emit('changeEngine', item.engine)"
          :style="item.engine == engine ? 'opacity:1;' : ''"
        >
          <img
            :src="`https://cos.waowaowao.cn/home/engine_icon/${item.icon}`"
            :alt="item.engine"
          />
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
defineProps(["engine", "engineList"]);
defineEmits(["changeEngine"]);
</script>

<style lang="scss" scoped>
.engine {
  display: flex;
  align-items: flex-end;
  padding-bottom: 8px;
  .item {
    margin-right: 1rem;
    .arrows {
      color: #222222;
      font-size: 16px;
    }
    .logo {
      @include flex-center;
      width: 3.5rem;
      height: 1.75rem;
      border-radius: 5px;
      background-color: rgb(255, 255, 255);
      opacity: 0.6;
      filter: blur(0.1px);
      cursor: pointer;
      &:hover {
        opacity: 0.4;
      }
      img {
        height: 60%;
      }
    }
  }
}
</style>

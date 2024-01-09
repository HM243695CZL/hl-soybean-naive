<script setup lang="ts">
interface Emits {
  (e: 'click-add'): void;
  (e: 'click-search'): void;
}
const emits = defineEmits<Emits>();
const clickAddEmit = () => {
  emits('click-add');
};
const clickSearchEmit = () => {
  emits('click-search');
};
</script>

<template>
  <div class="flex justify-between mb4">
    <n-space>
      <n-button type="primary" @click="clickAddEmit">新增</n-button>
      <slot name="left"></slot>
    </n-space>
    <n-space justify="space-between">
      <slot name="right"></slot>
      <n-button type="default" @click="clickSearchEmit">查询</n-button>
    </n-space>
  </div>
</template>

<style scoped></style>

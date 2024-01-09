<script setup lang="ts">
interface Emits {
  (e: 'click-edit'): void;
  (e: 'click-delete'): void;
}
const emit = defineEmits<Emits>();
const clickEditEmit = () => {
  emit('click-edit');
};
const clickDeleteEmit = () => {
  emit('click-delete');
};
</script>

<template>
  <n-space>
    <slot name="left"></slot>
    <n-button type="info" text @click="clickEditEmit">编辑</n-button>
    <n-popconfirm @positive-click="clickDeleteEmit">
      <template #trigger>
        <n-button type="error" text>删除</n-button>
      </template>
      确定删除当前数据吗？
    </n-popconfirm>
    <slot name="right"></slot>
  </n-space>
</template>

<style scoped></style>

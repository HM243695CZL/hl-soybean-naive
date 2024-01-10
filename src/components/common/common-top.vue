<script setup lang="ts">
interface Props {
  btnAuth?: string['addBtn' | 'searchBtn'];
}
interface Emits {
  (e: 'click-add'): void;
  (e: 'click-search'): void;
}
const props = withDefaults(defineProps<Props>(), {
  btnAuth: ['addBtn', 'searchBtn']
});

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
      <n-button v-if="props.btnAuth.includes('addBtn')" type="primary" @click="clickAddEmit">新增</n-button>
      <slot name="left"></slot>
    </n-space>
    <n-space justify="space-between">
      <slot name="right"></slot>
      <n-button v-if="props.btnAuth.includes('searchBtn')" type="default" @click="clickSearchEmit">查询</n-button>
    </n-space>
  </div>
</template>

<style scoped></style>

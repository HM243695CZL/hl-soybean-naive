<script setup lang="ts">
import { reactive } from 'vue';
import IconHoverShine from '@/views/special-effects/component/normal-effects/icon-hover-shine.vue';
interface SpecialItem {
  text: string;
  compKey: string;
}

const state = reactive({
  specialList: [
    {
      text: '图标hover发光',
      compKey: IconHoverShine
    }
  ] as Array<SpecialItem>
});
</script>

<template>
  <div class="normal-effects-container">
    <div class="comp-list">
      <div v-for="item in state.specialList" :key="item.text" class="comp-item">
        <div class="name">{{ item.text }}</div>
        <div class="comp-box">
          <component :is="item.compKey" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

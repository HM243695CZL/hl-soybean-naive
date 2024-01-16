<script setup lang="ts">
import { markRaw, reactive } from 'vue';
import IconHoverShine from '@/views/special-effects/component/normal-effects/icon-hover-shine.vue';
import GlassButton from '@/views/special-effects/component/normal-effects/glass-button.vue';
interface SpecialItem {
  text: string;
  compKey: string;
}

const state = reactive({
  specialList: [
    {
      text: '图标hover发光',
      compKey: markRaw(IconHoverShine)
    },
    {
      text: '玻璃按钮',
      compKey: markRaw(GlassButton)
    }
  ] as Array<SpecialItem>
});
</script>

<template>
  <div class="normal-effects-container">
    <div class="comp-list">
      <div v-for="item in state.specialList" :key="item.text" class="comp-item">
        <div class="name fw700 font-size-28px mb2">{{ item.text }}</div>
        <div class="comp-box mb4">
          <component :is="item.compKey" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

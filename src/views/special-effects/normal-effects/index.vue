<script setup lang="ts">
import { markRaw, reactive } from 'vue';
import IconHoverShine from '@/views/special-effects/component/normal-effects/icon-hover-shine.vue';
import GlassButton from '@/views/special-effects/component/normal-effects/glass-button.vue';
import SvgTextDrawing from '@/views/special-effects/component/normal-effects/svg-text-drawing.vue';
import ButtonHoverBorder from '@/views/special-effects/component/normal-effects/button-hover-border.vue';
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
    },
    {
      text: 'svg文字绘制',
      compKey: markRaw(SvgTextDrawing)
    },
    {
      text: '按钮hover边框',
      compKey: markRaw(ButtonHoverBorder)
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

<style scoped lang="scss">
.name {
  position: relative;
  &::before {
    content: '';
    width: 4px;
    height: 20px;
    background: #126ac6;
    position: absolute;
    top: 12px;
    left: -10px;
  }
}
</style>

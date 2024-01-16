<script setup lang="ts"></script>

<template>
  <div class="bg-#2c3a47 p4">
    <div class="button-box">
      <svg width="100%" height="100%">
        <rect class="rectangle" width="100%" height="100%"></rect>
      </svg>
      <div class="btn">button-hover-border</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.button-box {
  width: 240px;
  height: 60px;
  text-align: center;
  &:hover {
    .rectangle {
      animation: 0.5s extend linear forwards;
    }
  }
  .rectangle {
    stroke-width: 8px;
    stroke: #25ccf7;
    fill: transparent;
    stroke-dasharray: 100 500;
    stroke-dashoffset: -372;
  }
  .btn {
    margin-top: -40px;
    color: #fff;
  }
}
@keyframes extend {
  to {
    stroke-dasharray: 600;
    stroke-dashoffset: 0;
    stroke-width: 2;
  }
}
</style>

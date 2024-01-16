<script setup lang="ts"></script>

<template>
  <div class="bg-#2c3a47 p4">
    <svg width="750" height="150">
      <!-- 定义渐变颜色 -->
      <defs>
        <linearGradient id="geekColor" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="#91bd3a">
            <!-- 渐变动画 -->
            <animate
              attributeName="stop-color"
              values="#91bd3a;#12cad6;#91bd3a"
              dur="10s"
              begin="3s"
              repeatCount="indefinite"
            ></animate>
          </stop>

          <stop offset="100%" stop-color="#12cad6">
            <animate
              attributeName="stop-color"
              values="#12cad6;#91bd3a;#12cad6"
              dur="10s"
              begin="3s"
              repeatCount="indefinite"
            ></animate>
          </stop>
        </linearGradient>
      </defs>
      <text class="svg-text" x="0" y="100">hl243695czyn</text>
    </svg>
  </div>
</template>

<style scoped>
.svg-text {
  fill: none;
  font-size: 84px;
  stroke: url(#geekColor);
  stroke-width: 1;
  stroke-dasharray: 10 800;
  stroke-dashoffset: 10;
  animation: 3s linear 0s drawing infinite;
}
@keyframes drawing {
  to {
    stroke-dasharray: 800;
    stroke-dashoffset: 0;
  }
}
</style>

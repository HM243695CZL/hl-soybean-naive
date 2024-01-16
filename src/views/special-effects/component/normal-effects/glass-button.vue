<script setup lang="ts"></script>

<template>
  <div class="glass-button">
    <button>glass-button</button>
  </div>
</template>

<style scoped lang="scss">
.glass-button {
  button {
    width: 200px;
    background: rgba(57, 88, 64, 0.4);
    color: white;
    transition: 0.4s;
    text-align: center;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      background: rgba(12, 80, 38, 0.67);
      &::before {
        transform: translateX(320px);
        transition: 1s;
        opacity: 0.7;
      }
      &::after {
        transform: translateX(320px);
        transition: 1s;
        opacity: 1;
      }
    }
    &::before,
    &::after {
      content: '';
      display: block;
      width: 80px;
      height: 100%;
      background: rgba(179, 255, 210, 0.5);
      opacity: 0.5;
      position: absolute;
      top: 0;
      left: 0;
      filter: blur(30px);
      transform: translateX(-100px);
    }
    &::after {
      width: 40px;
      background: rgba(179, 255, 210, 0.5);
      left: 60px;
      opacity: 0;
      filter: blur(5px);
    }
  }
}
</style>

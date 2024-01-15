<script setup lang="ts"></script>

<template>
  <div class="bg-#2c3a47 h-full font-size-10 flex justify-start p4 box">
    <div class="icon">
      <SvgIcon class="cursor-pointer" icon="mdi:emoticon"></SvgIcon>
    </div>
    <div class="icon ml10">
      <SvgIcon class="cursor-pointer" icon="mdi:arm-flex-outline"></SvgIcon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  position: relative;
  z-index: 25;
  .icon {
    position: relative;
    color: #fff;
    transition: 0.6s;
    width: 60px;
    height: 60px;
    background: #2c3a47;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      &::before {
        box-shadow: 0 0 14px 2px #25ccf7;
        transform: scale(1.05);
      }
    }
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: 50%;
      transition: 0.6s;
      z-index: -1;
    }
  }
}
</style>

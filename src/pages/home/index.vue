<script setup lang="ts">

</script>

<template>
  <div vstack text="white 40px">
    Home
  </div>
</template>

<style scoped lang="less">
.scale {
    animation: scale 5s infinite ease-in-out;
}
@keyframes scale {
  0% {
    transform: scale(.8);
  }
  50% {
      transform: scale(1);
  }
  100% {
      transform: scale(.8);
  }
}
</style>

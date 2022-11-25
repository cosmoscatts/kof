<script setup lang="ts">

</script>

<template>
  <div wfull hfull vstack text="white 40px">
    <Transition name="fade-slide" mode="out-in" appear>
      <div class="menu" />
    </Transition>
  </div>
</template>

<style scoped lang="less">
.menu {
  position: absolute;
  left: calc(50% - 100px);
  top: calc(50% - 100px);
  width: 200px;
  height: 200px;
  border: 1px solid #FF972F;
  background-color: rgba(255, 151, 47, .3);
  border-radius: 10px;
  box-shadow: rgba(177, 115, 80, 0.4) 0px 0px 0px 3px,
    rgba(177, 115, 80, 0.3) 0px 0px 0px 6px,
    rgba(177, 115, 80, 0.2) 0px 0px 0px 9px,
    rgba(177, 115, 80, 0.1) 0px 0px 0px 12px;
}
</style>

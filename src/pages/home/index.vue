<script setup lang="ts">
const router = useRouter()
function onClick() {
  return router.push('/game')
}
</script>

<template>
  <div wfull hfull vstack text="white 40px">
    <div class="menu animate__animated animate__fadeInDown">
      <div mt="[-10px]" text="white 24px">
        Just Have Fun!
      </div>
      <button class="btn" @click="onClick">
        Start Game
      </button>
    </div>
  </div>
</template>

<style scoped lang="less">
.menu {
  position: absolute;
  left: calc(50% - 100px);
  top: calc(50% - 50px);
  width: 200px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #FF972F;
  background-color: rgba(255, 151, 47, .3);
  border-radius: 10px;
  box-shadow: rgba(177, 115, 80, 0.4) 0px 0px 0px 3px,
    rgba(177, 115, 80, 0.3) 0px 0px 0px 6px,
    rgba(177, 115, 80, 0.2) 0px 0px 0px 9px,
    rgba(177, 115, 80, 0.1) 0px 0px 0px 12px;

  .btn {
    width: auto;
    height: 40px;
    padding: 0 10px;
    font-size: 20px;
    font-weight: 800;
    color: white;
    background-color: rgba(80, 124, 89, .5);
    border: 1px solid #507C59;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 0px 4px #eee inset;
      border-color: rgba(80, 124, 89, .5);
    }
  }
}
</style>

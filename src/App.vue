<script setup lang="ts">
const refContainer = ref<HTMLElement>()
const { width, height } = useElementSize(refContainer)

const ui = reactive({
  scale: 1,
})
const DEFAULT_HEIGHT = 500
const setPosition = () => ui.scale = (height.value - 60) / DEFAULT_HEIGHT

window.onresize = setPosition
watch(height, setPosition)
onMounted(setPosition)
</script>

<template>
  <div wfull hfull m0 of-hidden p30px>
    <div
      id="container"
      ref="refContainer"
      flex-center
    >
      <div
        v-if="width >= 1080"
        id="main"
        w830px h500px relative
        z-100
        :style="{
          transform: `scale(${ui.scale}) translateZ(1px)`,
        }"
      >
        <RouterView />
      </div>
      <div
        v-else
        wfull hfull
        flex justify-center items-center
        text="white 40px" font-bold z-10
      >
        {  当前屏幕尺寸过小 :). }
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
#container {
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  box-sizing: border-box;
  position: relative;
  border: 2px solid rgba(255, 255, 255, .5);
  border-radius: 15px;
  &::after {
    position: absolute;
        content: "";
        background-image: url('https://images.unsplash.com/photo-1440688807730-73e4e2169fb8?dpr=1&auto=format&fit=crop&w=1500&h=1001&q=80&cs=tinysrgb&crop=');
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        background-position: top;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        filter: blur(10px);
        z-index: 0;
    }
}

#main {
  background-image: url('~/assets/background/0.gif');
  background-size: 200% 100%;
  background-position: top;
  box-sizing: border-box;
  z-index: 10;
}
</style>

<script setup lang="ts">
const refContainer = ref<HTMLElement>()
const { width, height } = useElementSize(refContainer)

const ui = reactive({
  scale: 1,
})
const DEFAULT_WIDTH = 830
const DEFAULT_HEIGHT = 500
const setPosition = () => ui.scale = Math.min((width.value - 60) / DEFAULT_WIDTH, (height.value - 60) / DEFAULT_HEIGHT)

window.onresize = setPosition
watch(height, setPosition)
onMounted(setPosition)

const route = useRoute()
const showReturnBtn = computed(() => !['/home'].includes(route.path))
</script>

<template>
  <div wfull hfull m0 of-hidden p60px relative>
    <div
      absolute top-10px
      text="24px white"
      w400px h40px font-800 lh-40px
      cursor-pointer outline-none
      :style="{ left: 'calc(50% - 200px)' }"
    >
      KING OF FIGHTERS - 拳皇
    </div>
    <div
      v-if="showReturnBtn && width >= 1180"
      class="btn" @click="$router.push('/home')"
    >
      返回
    </div>
    <div
      absolute right-180px top-10px
      w60px h40px flex justify-center items-center
      border="1 solid primary" bg-primary rounded-5px
      cursor-pointer outline-none hover:shadow-nav_item
    >
      <a
        i-ri:github-fill text-22px bg-white
        href="https://github.com/cosmoscatts/kof"
        target="_blank" title="GitHub"
      />
    </div>
    <div
      id="container"
      ref="refContainer"
      flex-center
    >
      <div
        v-if="width >= 1180" id="main"
        :style="{
          transform: `scale(${ui.scale}) translateZ(1px)`,
        }"
      >
        <RouterView v-slot="{ Component, route }">
          <Transition name="fade-slide" mode="out-in" appear>
            <component :is="Component" :key="route.path" />
          </Transition>
        </RouterView>
      </div>
      <div
        v-else
        wfull hfull
        flex justify-center items-center
        text="white 2rem" font-bold z-10
      >
        {  当前屏幕尺寸过小 :). }
      </div>
    </div>
    <div
      absolute
      text="24px white center"
      h40px font-800 lh-40px
      cursor-pointer outline-none
      :style="{
        width: 'calc(100vw - 120px)',
        left: '60px',
        top: 'calc(100vh - 50px)',
      }"
    >
      @COSMOSCATTS
    </div>
  </div>
</template>

<style scoped lang="less">
#container {
  width: calc(100% - 120px);
  height: calc(100% - 120px);
  box-sizing: border-box;
  position: relative;
  border: 2px solid rgba(255, 255, 255, .5);
  border-radius: 15px;
  &::after {
    position: absolute;
        content: "";
        background-image: url('~/assets/images/background/bg.jpg');
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
  position: relative;
  width: 830px;
  height: 500px;
  background-image: url('~/assets/images/background/0.gif');
  background-size: 200% 100%;
  background-position: top;
  box-sizing: border-box;
  z-index: 10;
}

.btn {
  position: absolute;
  top: 10px;
  right: 250px;
  width: 60px;
  height: 40px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  border: 2px solid #906B40;
  outline: 2px solid transparent;
  outline-offset: 2px;

  &:hover {
    background-color: #B17326;
    border-color: #B17326;
  }
}
</style>

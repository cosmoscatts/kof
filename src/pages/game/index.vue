<script setup lang="ts">
import { KOF } from '~/scripts/KOF'

const gameStore = useGameStore()
onMounted(() => new KOF('kof', gameStore))

const hpWidthStyle = computed(() => {
  const { playerA, playerB } = gameStore
  if (!playerA || !playerB)
    return ['100%', '100%']
  return [
    `${playerA.hp}%`,
    `${playerB.hp}%`,
  ]
})

const restart = () => {
  // eslint-disable-next-line no-new
  new KOF('kof', gameStore)
  gameStore.updateResultVisible(false)
}
</script>

<template>
  <div id="kof">
    <canvas id="kof-canvas" width="830" height="500" tabindex="0" />
    <div class="kof-head">
      <div class="kof-head-hp-0">
        <div>
          <div />
        </div>
      </div>
      <div class="kof-head-timer">
        {{ gameStore.timer }}
      </div>
      <div class="kof-head-hp-1">
        <div>
          <div />
        </div>
      </div>
    </div>
    <ResultBoard :visible="gameStore.resultVisible" @restart="restart" />
  </div>
</template>

<style scoped lang="less">
#kof>.kof-head {
  width: 100%;
  height: 80px;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
}

#kof>.kof-head>.kof-head-hp-0 {
  height: 40px;
  width: calc(50% - 60px);
  margin-left: 20px;
  border: white 5px solid;
  border-right: none;
  box-sizing: border-box;
}

#kof>.kof-head>.kof-head-timer {
  height: 60px;
  width: 80px;
  background-color: orange;
  border: white 5px solid;
  box-sizing: border-box;
  color: white;
  font-size: 30px;
  font-weight: 800;
  text-align: center;
  line-height: 50px;
  user-select: none;
}

#kof>.kof-head>.kof-head-hp-1 {
  height: 40px;
  width: calc(50% - 60px);
  border: white 5px solid;
  border-left: none;
  box-sizing: border-box;
}

#kof>.kof-head>.kof-head-hp-0>div {
  background-color: red;
  height: 100%;
  width: v-bind('hpWidthStyle[0]');
  float: right;
  transition: all .6s;
  position: relative;
}

#kof>.kof-head>.kof-head-hp-1>div {
  background-color: red;
  height: 100%;
  width: v-bind('hpWidthStyle[1]');
  transition: all .6s;
}

#kof>.kof-head>.kof-head-hp-0>div>div {
  background-color: lightgreen;
  height: 100%;
  width: v-bind('hpWidthStyle[0]');
  float: right;
  transition: all .3s;
}

#kof>.kof-head>.kof-head-hp-1>div>div {
  background-color: lightgreen;
  height: 100%;
  width: v-bind('hpWidthStyle[1]');
  transition: all .3s;
}
</style>

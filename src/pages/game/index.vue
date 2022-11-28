<script setup lang="ts">
import { KOF } from '~/scripts/KOF'

// eslint-disable-next-line no-new
onMounted(() => new KOF('kof'))
</script>

<template>
  <div id="kof">
    <canvas id="kof-canvas" width="830" height="500" tabindex="0" />
    <div class="kof-head">
      <div class="kof-head-hp-0">
        <div><div /></div>
      </div>
      <div class="kof-head-timer">
        60
      </div>
      <div class="kof-head-hp-1">
        <div><div /></div>
      </div>
    </div>
  </div>
</template>

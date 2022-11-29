interface PlayerStats {
  id: number
  hp: number
}

const DEFAULT_PLAYER_STATS: Omit<PlayerStats, 'id'> = { hp: 100 }

export const useGameStore = defineStore(
  'gameStore',
  () => {
    const timer = ref(60)
    const hasStarted = ref(false)
    const playerA = ref<PlayerStats>()
    const playerB = ref<PlayerStats>()
    const updateTimer = (_timer: number) => timer.value = _timer
    const updateHasStarted = (state: boolean) => hasStarted.value = state
    function initGame(idA: number, idB: number) {
      updateTimer(60)
      useTimeoutFn(() => updateHasStarted(true), 1000)
      playerA.value = { ...DEFAULT_PLAYER_STATS, id: idA }
      playerB.value = { ...DEFAULT_PLAYER_STATS, id: idB }
    }
    function updatePlayer(stats: PlayerStats) {
      if (![0, 1].includes(stats.id))
        return
      const player = [playerA, playerB][Number(playerB.value?.id === stats.id)]
      player.value = { ...stats }
    }
    return {
      timer,
      hasStarted,
      playerA,
      playerB,
      initGame,
      updateTimer,
      updateHasStarted,
      updatePlayer,
    }
  },
)

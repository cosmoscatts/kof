interface PlayerStats {
  id: number
  hp: number
  attack: number // 收到的攻击值
}

const DEFAULT_PLAYER_STATS: Omit<PlayerStats, 'id'> = { hp: 100, attack: 0 }

export const useGameStore = defineStore(
  'gameStore',
  () => {
    const timer = ref(60)
    const playerA = ref<PlayerStats>()
    const playerB = ref<PlayerStats>()
    const updateTimer = (_timer: number) => timer.value = _timer
    function initGame(idA: number, idB: number) {
      updateTimer(60)
      playerA.value = { ...DEFAULT_PLAYER_STATS, id: idA }
      playerB.value = { ...DEFAULT_PLAYER_STATS, id: idB }
    }
    function updatePlayer(stats: PlayerStats) {
      if (!stats.id)
        return
      const player = [playerA, playerB][Number(playerB.value?.id === stats.id)]
      player.value = { ...stats }
    }
    return {
      timer,
      playerA,
      playerB,
      initGame,
      updateTimer,
      updatePlayer,
    }
  },
)

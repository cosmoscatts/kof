const GAME_OBJECTS: GameObject[] = []

export class GameObject {
  timeDelta = 0
  hasCalledStart = false

  constructor() {
    GAME_OBJECTS.push(this)
  }

  start() {}

  update() {}

  beforeDestory() {}

  destory() {
    this.beforeDestory()
    const index = GAME_OBJECTS.findIndex(i => i === toRaw(this))
    if (~index) {
      GAME_OBJECTS.splice(index)
    }
  }
}

let lastTimestamp = 0
const step = (timestamp: number) => {
  GAME_OBJECTS.forEach((game) => {
    if (!game.hasCalledStart) {
      game.start()
      game.hasCalledStart = true
    } else {
      game.timeDelta = timestamp - lastTimestamp
      game.update()
    }
  })
  lastTimestamp = timestamp
  requestAnimationFrame(step)
}
requestAnimationFrame(step)

const GAME_OBJECTS: GameObject[] = []

/*
  游戏对象基类：
    定义一些基本参数和通用方法
*/
export class GameObject {
  timeDelta: number // 间隔
  hasCalledStart: boolean // 是否执行了 start 方法

  constructor() {
    this.timeDelta = 0
    this.hasCalledStart = false
    GAME_OBJECTS.push(this)
  }

  start() {

  }

  update() {

  }

  beforeDestory() {

  }

  destory() {
    this.beforeDestory()
    for (let i = 0; i < GAME_OBJECTS.length; i++) {
      const obj = GAME_OBJECTS[i]
      if (this === obj) {
        GAME_OBJECTS.splice(i)
        break
      }
    }
  }
}

let lastTimestamp = 0
const step = (timestamp: number) => {
  for (const obj of GAME_OBJECTS) {
    if (!obj.hasCalledStart) { // 第一次执行 start 方法
      obj.hasCalledStart = true
      obj.start()
    }
    else {
      obj.timeDelta = timestamp - lastTimestamp
      obj.update()
    }
  }
  lastTimestamp = timestamp
  requestAnimationFrame(step)
}
requestAnimationFrame(step)

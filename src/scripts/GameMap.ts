import { GameObject } from './GameObject'
import type { KOF } from './KOF'
import { Controller } from './Controller'

export class GameMap extends GameObject {
  root: KOF
  $canvas: HTMLCanvasElement
  controller: Controller
  ctx: CanvasRenderingContext2D
  timeLeft: number

  constructor(root: KOF, $canvas: HTMLCanvasElement) {
    super()

    this.root = root
    this.$canvas = $canvas
    this.ctx = this.$canvas.getContext('2d')!
    this.$canvas.focus()
    this.controller = new Controller(this.$canvas)
    this.timeLeft = 60000 // ms
  }

  start() {

  }

  updateTime(fn: Function) {
    this.timeLeft -= this.timeDelta
    if (this.timeLeft < 0) {
      this.timeLeft = 0

      const [a, b] = this.root.players
      if (a.status !== 6 && b.status !== 6) {
        a.status = b.status = 6
        a.frameCurrentCnt = b.frameCurrentCnt = 0
        a.vx = b.vx = 0
      }
    }

    fn(~~(this.timeLeft / 1000))
  }

  update() {
    const gameStore = useGameStore()
    if (gameStore.hasStarted)
      this.updateTime(gameStore.updateTimer)
    this.render()
  }

  render() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }
}

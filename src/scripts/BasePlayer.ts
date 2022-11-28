/*
  角色的抽象基类，所有的角色都需要继承此类
*/
import { GameObject } from './GameObject'
import type { KOF } from './KOF'
import type { PlayerAnimation, PlayerInfo } from '~/types'

export class BasePlayer extends GameObject {
  root: KOF
  id: number
  x: number
  y: number
  width: number
  height: number
  color: string

  direction: number

  vx: number
  vy: number

  speedx: number // 水平方向速度
  speedy: number // 跳起的初始速度

  gravity: number // 重力

  ctx: CanvasRenderingContext2D
  pressedKeys: Set<string>

  status: number // 0: idle; 1: 向前; 2: 向后; 3: 跳跃; 4: 攻击; 5: 被打; 6: 死亡;
  animations: Map<number, PlayerAnimation>

  frameCurrentCnt: number

  hp: number
  // $hp: number
  // $hp_div: HTMLElement

  constructor(root: KOF, { id, x, y, width, height, color }: PlayerInfo) {
    super()

    this.root = root
    this.id = id
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color

    this.direction = 1

    this.vx = 0
    this.vy = 0

    this.speedx = 400 // 水平方向速度
    this.speedy = -1000 // 跳起的初始速度

    this.gravity = 50 // 重力

    this.ctx = this.root.gameMap.ctx
    this.pressedKeys = this.root.gameMap.controller.pressedKeys

    this.status = 3 // 0: idle; 1: 向前; 2: 向后; 3: 跳跃; 4: 攻击; 5: 被打; 6: 死亡;
    this.animations = new Map()

    this.frameCurrentCnt = 0

    this.hp = 100
    // this.$hp = this.root.$kof.find(`.kof-head-hp-${this.id}>div`)
    // this.$hp_div = this.$hp.find('div')
  }

  start() {

  }

  updateMove() {
    this.vy += this.gravity

    this.x += this.vx * this.timeDelta / 1000
    this.y += this.vy * this.timeDelta / 1000

    if (this.y > 250) {
      this.y = 250
      this.vy = 0
      if (this.status === 3)
        this.status = 0
    }

    if (this.x < 0)
      this.x = 0

    else if (this.x + this.width > this.root.gameMap.$canvas.width)
      this.x = this.root.gameMap.$canvas.width - this.width
  }

  updateControl() {
    let w, a, d, space
    if (this.id === 0) {
      w = this.pressedKeys.has('w')
      a = this.pressedKeys.has('a')
      d = this.pressedKeys.has('d')
      space = this.pressedKeys.has(' ')
    }
    else {
      w = this.pressedKeys.has('ArrowUp')
      a = this.pressedKeys.has('ArrowLeft')
      d = this.pressedKeys.has('ArrowRight')
      space = this.pressedKeys.has('Enter')
    }

    if ([0, 1].includes(this.status)) {
      if (space) {
        this.status = 4
        this.vx = 0
        this.frameCurrentCnt = 0
      }
      else if (w) {
        if (d)
          this.vx = this.speedx

        else if (a)
          this.vx = -this.speedx

        else
          this.vx = 0

        this.vy = this.speedy
        this.status = 3
        this.frameCurrentCnt = 0
      }
      else if (d) {
        this.vx = this.speedx
        this.status = 1
      }
      else if (a) {
        this.vx = -this.speedx
        this.status = 1
      }
      else {
        this.vx = 0
        this.status = 0
      }
    }
  }

  updateDirection() {
    if (this.status === 6)
      return

    const players = this.root.players
    if (players[0] && players[1]) {
      const you = players[1 - this.id]
      this.direction = [-1, 1][Number(this.x < you.x)]
    }
  }

  update() {
    this.updateControl()
    this.updateMove()
    this.updateDirection()
    this.updateAttack()
    this.render()
  }

  updateAttack() {
    if (this.status === 4 && this.frameCurrentCnt === 18) {
      const you = this.root.players[1 - this.id]
      let r1
      if (this.direction > 0) {
        r1 = {
          x1: this.x + 120,
          y1: this.y + 40,
          x2: this.x + 120 + 100,
          y2: this.y + 40 + 20,
        }
      }
      else {
        r1 = {
          x1: this.x + this.width - 120 - 100,
          y1: this.y + 40,
          x2: this.x + this.width - 120 - 100 + 100,
          y2: this.y + 40 + 20,
        }
      }
      const r2 = {
        x1: you.x,
        y1: you.y,
        x2: you.x + you.width,
        y2: you.y + you.height,
      }
      if (this.isCollision(r1, r2))
        you.isAttack()
    }
  }

  isAttack() {
    if (this.status === 6)
      return

    this.status = 5
    this.frameCurrentCnt = 0

    this.hp = Math.max(this.hp - 10, 0)

    // this.$hp_div.animate({
    //   width: this.$hp.parent().width() * this.hp / 100,
    // }, 300)

    // this.$hp.animate({
    //   width: this.$hp.parent().width() * this.hp / 100,
    // }, 600)

    if (this.hp <= 0) {
      this.status = 6
      this.frameCurrentCnt = 0
      this.vx = 0
    }
  }

  /**
   * 两个矩形是否碰撞
   */
  isCollision(r1: { x1: number;x2: number;y1: number; y2: number },
    r2: { x1: number;x2: number;y1: number; y2: number }) {
    if (Math.max(r1.x1, r2.x1) > Math.min(r1.x2, r2.x2))
      return false
    if (Math.max(r1.y1, r2.y1) > Math.min(r1.y2, r2.y2))
      return false
    return true
  }

  render() {
    // this.ctx.fillStyle = 'blue'
    // this.ctx.fillRect(this.x, this.y, this.width, this.height)

    // if (this.direction > 0) {
    //   this.ctx.fillStyle = 'red'
    //   this.ctx.fillRect(this.x + 120, this.y + 40, 100, 20)
    // } else {
    //   this.ctx.fillStyle = 'red'
    //   this.ctx.fillRect(this.x + this.width - 120 - 100, this.y + 40, 100, 20)
    // }

    let status = this.status

    if (status === 1 && this.direction * this.vx < 0)
      status = 2

    const obj = this.animations.get(status)!
    if (obj?.loaded) {
      if (this.direction > 0) {
        const k = ~~(this.frameCurrentCnt / obj.frameRate) % obj.frameCnt
        const image = obj.gif.frames[k].image
        this.ctx.drawImage(image, this.x, this.y + obj.offsetY, image.width * obj.scale, image.height * obj.scale)
      }
      else {
        this.ctx.save()
        this.ctx.scale(-1, 1)
        this.ctx.translate(-this.root.gameMap.$canvas.width, 0)

        const k = ~~(this.frameCurrentCnt / obj.frameRate) % obj.frameCnt
        const image = obj.gif.frames[k].image
        this.ctx.drawImage(image, this.root.gameMap.$canvas.width - this.x - this.width, this.y + obj.offsetY, image.width * obj.scale, image.height * obj.scale)

        this.ctx.restore()
      }
    }

    if ([4, 5, 6].includes(this.status) && this.frameCurrentCnt === obj.frameRate * (obj.frameCnt - 1)) {
      if (this.status === 6)
        this.frameCurrentCnt--
      else
        this.status = 0
    }

    this.frameCurrentCnt++
  }
}

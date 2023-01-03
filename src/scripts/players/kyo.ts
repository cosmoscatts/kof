/*
  草薙京角色
 */
import gif0 from '/images/player/kyo/0.gif'
import gif1 from '/images/player/kyo/1.gif'
import gif2 from '/images/player/kyo/2.gif'
import gif3 from '/images/player/kyo/3.gif'
import gif4 from '/images/player/kyo/4.gif'
import gif5 from '/images/player/kyo/5.gif'
import gif6 from '/images/player/kyo/6.gif'
import { BasePlayer } from '../BasePlayer'
import type { KOF } from '../KOF'
import type { PlayerInfo } from '~/types'

const gifs = [
  gif0,
  gif1,
  gif2,
  gif3,
  gif4,
  gif5,
  gif6,
]

export class Kyo extends BasePlayer {
  constructor(root: KOF, info: PlayerInfo) {
    super(root, info)

    this.initAnimations()
  }

  initAnimations() {
    const { animations } = this
    const offsets = [0, -22, -22, -140, 0, 0, 0]
    for (let i = 0; i < 7; i++) {
      const gif = useGif()
      gif.load(gifs[i])
      this.animations.set(i, {
        gif,
        frameCnt: 0, // 总图片数
        frameRate: 5, // 每 5 帧过渡一次
        offsetY: offsets[i],
        loaded: false,
        scale: 2,
      })

      gif.onload = () => {
        const obj = animations.get(i)!
        obj.frameCnt = gif.frames.length
        obj.loaded = true

        if (i === 3) obj.frameRate = 4
      }
    }
  }
}

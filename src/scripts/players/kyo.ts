/*
  草薙京角色
 */
import { BasePlayer } from '../BasePlayer'
import type { KOF } from '../KOF'
import type { PlayerInfo } from '~/types'

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
      gif.load(`/src/assets/images/player/kyo/${i}.gif`)
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

        if (i === 3)
          obj.frameRate = 4
      }
    }
  }
}


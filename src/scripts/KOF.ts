import type { Store } from 'pinia'
import { GameMap } from './GameMap'
import type { BasePlayer } from './BasePlayer'
import { Kyo, Mai } from './players/'

export class KOF {
  $kof: HTMLElement | null
  gameMap: GameMap
  players: BasePlayer[]

  constructor(id: string, gameStore: Store<'gameStore', any>) {
    this.$kof = document.getElementById(id)
    this.gameMap = new GameMap(this, document.getElementById('kof-canvas') as HTMLCanvasElement)

    this.players = [
      new Kyo(
        this,
        {
          id: 0,
          x: 80,
          y: 0,
          width: 120,
          height: 200,
          color: 'blue',
        },
      ),
      new Mai(
        this,
        {
          id: 1,
          x: 630,
          y: 0,
          width: 120,
          height: 200,
          color: 'red',
        },
      ),
    ]
    gameStore.initGame(0, 1)
  }
}

import { GameMap } from './GameMap'
import type { AbstractPlayer } from './AbstractPlayer'
import { Kyo } from './players/kyo'

export class KOF {
  $kof: HTMLElement | null
  gameMap: GameMap
  players: AbstractPlayer[]

  constructor(id: string) {
    this.$kof = document.getElementById(`#${id}`)

    this.gameMap = new GameMap(this)

    this.players = [
      new Kyo(
        this,
        {
          id: 0,
          x: 200,
          y: 0,
          width: 120,
          height: 200,
          color: 'blue',
        },
      ),
      new Kyo(
        this,
        {
          id: 1,
          x: 900,
          y: 0,
          width: 120,
          height: 200,
          color: 'red',
        },
      ),
    ]
  }
}

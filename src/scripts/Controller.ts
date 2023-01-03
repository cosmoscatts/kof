export class Controller {
  $canvas: HTMLCanvasElement
  pressedKeys: Set<string>

  constructor($canvas: HTMLCanvasElement) {
    this.$canvas = $canvas

    this.pressedKeys = new Set()
    this.start()
  }

  start() {
    const { pressedKeys } = this
    this.$canvas.addEventListener('keydown', e => pressedKeys.add(e.key))
    this.$canvas.addEventListener('keyup', e => pressedKeys.delete(e.key))
  }
}

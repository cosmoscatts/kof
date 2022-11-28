export interface PlayerInfo {
  id: number
  x: number
  y: number
  width: number
  height: number
  color: string
}

export interface PlayerAnimation {
  gif: any
  frameCnt: number // 总图片数
  frameRate: number // 每 5 帧过渡一次
  offsetY: number
  loaded: boolean
  scale: number
}

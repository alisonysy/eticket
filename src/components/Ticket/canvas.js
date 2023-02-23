import TicketBackground from '@/asset/ticket-first.png'

const BASE_WIDTH = 309
const BASE_HEIGHT = 465
const NAME_POS = {
  x: 30,
  y: 80,
}

let canvasEl = null
let ctx = null
let config = null

const CNAVASID = '__poster__canvas__'

function _init() {
  const canvasDOM = document.getElementById(CNAVASID)
  if (canvasDOM) {
    canvasDOM.parentNode.removeChild(canvasDOM)
  }
  canvasEl = document.createElement('canvas')
  canvasEl.id = CNAVASID
  canvasEl.width = BASE_WIDTH
  canvasEl.height = BASE_HEIGHT
  canvasEl.style.display = 'none'
  document.body.appendChild(canvasEl)
  ctx = canvasEl.getContext('2d')
}

function _drawBg() {
  const posterBgImg = document.createElement('img')
  return new Promise((resolve, reject) => {
    posterBgImg.onload = () => {
      ctx.drawImage(posterBgImg, 0, 0, BASE_WIDTH, BASE_HEIGHT)
      resolve()
    }
    posterBgImg.onerror = () => {
      reject(new Error('生成海报背景失败'))
    }
    posterBgImg.src = `${location.protocol}//${location.host}${TicketBackground}`
  })
}

function _drawName() {
  ctx.save()
  ctx.fillStyle = '#222326'
  // ctx.textAlign = 'center'
  // ctx.textBaseline = 'middle'
  ctx.font = '16px Roboto'
  const { x, y } = NAME_POS
  const width = ctx.measureText(config.name).width
  let startX = x
  // if (width) {
  //   startX = centerX - width / 2
  // }
  ctx.fillText(`${config.name}`, startX, y)
  ctx.restore()
}
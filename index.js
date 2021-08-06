class Canvas {
  constructor(width, height) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height
    this.canvas.style.border = '1px solid #000'
    return this.canvas
  }
}
class Star {
  constructor(centerX, centerY, rays, smallRadius, bigRadius, ctx, color) {
    this.ctx = ctx
    this.cx = centerX
    this.cy = centerY
    this.rays = rays
    this.smallRadius = smallRadius
    this.bigRadius = bigRadius
    this.color = color
  }
  drawStar() {
    let rot = (Math.PI / 2) * 3
    const step = Math.PI / this.rays
    this.ctx.beginPath()
    this.ctx.moveTo(this.cx, this.cy - this.bigRadius)
    for (let i = 0; i < this.rays; i++) {
      let x = this.cx + Math.cos(rot) * this.bigRadius
      let y = this.cy + Math.sin(rot) * this.bigRadius
      this.ctx.lineTo(x, y)
      rot += step
      x = this.cx + Math.cos(rot) * this.smallRadius
      y = this.cy + Math.sin(rot) * this.smallRadius
      this.ctx.lineTo(x, y)
      rot += step
    }
    this.ctx.lineTo(this.cx, this.cy - this.bigRadius)
    this.ctx.closePath()
    this.ctx.lineWidth = 3
    this.strokeStyle = this.color
    this.ctx.stroke()
    this.ctx.fillStyle = this.color
    this.ctx.fill()
  }
}

const root = document.querySelector('.root')
const canvasBig = new Canvas(600, 600)
const canvasSmall = new Canvas(600, 50)
canvasBig.setAttribute('id', 'canvas-big')
canvasBig.style.marginBottom = '10px'
canvasSmall.setAttribute('id', 'canvas-small')

root.appendChild(canvasBig)
root.appendChild(canvasSmall)

const ctxBig = canvasBig.getContext('2d')

const star1 = new Star(270, 300, 5, 70, 20, ctxBig, 'red')
star1.drawStar()
const star2 = new Star(150, 100, 5, 70, 20, ctxBig, 'blue')
star2.drawStar()
const star3 = new Star(100, 400, 5, 70, 20, ctxBig, 'green')
star3.drawStar()
const star4 = new Star(420, 150, 5, 70, 20, ctxBig, 'yellow')
star4.drawStar()
const star5 = new Star(470, 400, 5, 70, 20, ctxBig, 'black')
star5.drawStar()

const canvBig = document.getElementById('canvas-big')

canvBig.addEventListener('click', (event) => {
  let colorData = ctxBig.getImageData(event.offsetX, event.offsetY, 1, 1).data
  let hexColor
  if (colorData.reduce((el, sum) => sum + el) === 0) {
    hexColor = '#ffffff'
  } else {
    hexColor =
      '#' +
      `${
        '000000' + getHexColor(colorData[0], colorData[1], colorData[2])
      }`.slice(-6)
  }

  canvasSmall.style.backgroundColor = hexColor
})

function getHexColor(r, g, b) {
  if (r > 255 || g > 255 || b > 255) throw 'Invalid Color component'
  return ((r << 16) | (g << 8) | b).toString(16)
}

UI = require './src/ui'

TAU = Math.PI * 2
emojiSize = 64
emojiHalf = emojiSize/2
emojiIndex = 0
pressedX = null
pressedY = null
lastX = null
lastY = null

window.setup = ->
  console.log 'setup'
  createCanvas 640, 480
  UI.setup()

window.mousePressed = ->
  lastX = pressedX = mouseX
  lastY = pressedY = mouseY

window.mouseReleased = ->
  return unless mouseX is pressedX and mouseY is pressedY
  emojiIndex = (emojiIndex+1) % UI.emoji.length
  emoji = UI.emoji[emojiIndex]
  image emoji, mouseX-emojiHalf, mouseY-emojiHalf

window.mouseDragged = (event) ->
  return unless calcDistance(mouseX, mouseY, lastX, lastY) > 10
  emoji = UI.emoji[emojiIndex]
  angle = Math.atan2(mouseY-lastY, mouseX-lastX) + TAU/4
  drawOne emoji, mouseX, mouseY, angle
  lastX = mouseX
  lastY = mouseY

drawOne = (emoji, x, y, angle) ->
  translate x, y
  rotate angle
  image emoji, -emojiHalf, -emojiHalf
  rotate -angle
  translate -x, -y

calcDistance = (x1, y1, x2, y2) ->
  dx = x2-x1
  dy = y2-y1
  Math.sqrt dx*dx + dy*dy


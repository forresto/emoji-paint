UI = require './src/ui'

TAU = Math.PI * 2
emojiSize = 64
emojiHalf = emojiSize/2
emojiIndex = 0
pressedX = null
pressedY = null
lastX = null
lastY = null
firstInStroke = false

window.setup = ->
  console.log 'setup'
  createCanvas 640, 480
  UI.setup()

window.mousePressed = ->
  firstInStroke = true
  lastX = pressedX = mouseX
  lastY = pressedY = mouseY

window.mouseReleased = ->
  return unless mouseX is pressedX and mouseY is pressedY
  emoji = UI.emoji[emojiIndex]
  drawOne emoji, mouseX, mouseY

window.mouseDragged = (event) ->
  {spacing} = UI
  distanceFromLast = calcDistance(mouseX, mouseY, lastX, lastY)
  return unless (firstInStroke and distanceFromLast > 5) or (distanceFromLast > spacing)
  firstInStroke = false
  emoji = UI.emoji[emojiIndex]
  drawOne emoji, mouseX, mouseY, lastX, lastY
  lastX = mouseX
  lastY = mouseY

drawOne = (emoji, x1, y1, x2, y2) ->
  x2 ?= x1
  y2 ?= y1 - 1
  angle = Math.atan2(y2-y1, x2-x1) + TAU/4
  translate x1, y1
  rotate angle
  image emoji, -emojiHalf, -emojiHalf
  rotate -angle
  translate -x1, -y1

calcDistance = (x1, y1, x2, y2) ->
  dx = x2-x1
  dy = y2-y1
  Math.sqrt dx*dx + dy*dy


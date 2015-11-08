UI = require './src/ui'

TAU = Math.PI * 2
emojiSize = 64
emojiHalf = emojiSize/2
emojiIndex = 0
pressedX = null
pressedY = null
lastX = null
lastY = null
wiggle = 5
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
  return unless (calcDistance(mouseX, mouseY, pressedX, pressedY) <= wiggle)
  emoji = UI.emoji[emojiIndex]
  drawOne emoji, mouseX, mouseY, mouseX, mouseY-1

window.mouseDragged = (event) ->
  {spacing} = UI
  distanceFromLast = calcDistance(mouseX, mouseY, lastX, lastY)
  return unless (firstInStroke and distanceFromLast > wiggle) or (distanceFromLast > spacing)
  firstInStroke = false
  emoji = UI.emoji[emojiIndex]
  drawOne emoji, mouseX, mouseY, lastX, lastY
  lastX = mouseX
  lastY = mouseY

drawOne = (emoji, x1, y1, x2, y2) ->
  {size} = UI
  half = size/2
  angle = Math.atan2(y2-y1, x2-x1) + TAU/4
  translate x1, y1
  rotate angle
  image emoji, 0, 0, emojiSize, emojiSize, -half, -half, size, size
  rotate -angle
  translate -x1, -y1

calcDistance = (x1, y1, x2, y2) ->
  dx = x2-x1
  dy = y2-y1
  Math.sqrt dx*dx + dy*dy


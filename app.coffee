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
  canvas = createCanvas 640, 480
  canvas.elt.addEventListener 'mousedown', mouseDown
  canvas.elt.addEventListener 'touchstart', touchStart
  canvas.elt.addEventListener 'mousemove', mouseMove
  canvas.elt.addEventListener 'touchmove', touchMove
  window.addEventListener 'mouseup', mouseUp
  window.addEventListener 'touchend', mouseUp
  UI.setup()

mouseDown = (event) ->
  firstInStroke = true
  lastX = pressedX = mouseX
  lastY = pressedY = mouseY

touchStart = (event) ->
  lastX = pressedX = event.touches[0].clientX
  lastY = pressedY = event.touches[0].clientY

mouseUp = (event) ->
  return if event.button? and (event.button isnt 0)
  x = mouseX or touchX
  y = mouseY or touchY
  return unless (calcDistance(x, y, pressedX, pressedY) <= wiggle)
  emoji = UI.emoji[emojiIndex]
  drawOne emoji, x, y, x, y-1

touchMove = (event) ->
  return unless touchIsDown
  event.preventDefault()
  move touchX, touchY

mouseMove = (event) ->
  return unless mouseIsPressed
  event.preventDefault()
  move mouseX, mouseY

move = (x, y) ->
  {spacing} = UI
  distanceFromLast = calcDistance(x, y, lastX, lastY)
  return unless (firstInStroke and distanceFromLast > wiggle) or (distanceFromLast > spacing)
  firstInStroke = false
  emoji = UI.emoji[emojiIndex]
  drawOne emoji, x, y, lastX, lastY
  lastX = x
  lastY = y

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


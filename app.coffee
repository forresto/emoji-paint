UI = require './src/ui'

TAU = Math.PI * 2
width = 640
height = 480
emojiSize = 64
emojiHalf = emojiSize/2
emojiIndex = 0
pressedX = null
pressedY = null
lastX = null
lastY = null
wiggle = 5
firstInStroke = false
autoX = width/2
autoY = height/2
autoAngle = TAU/4
autoAngleDelta = TAU/360
autoAngleDeltaDelta = TAU/360/10

window.setup = ->
  canvas = createCanvas width, height
  canvas.elt.addEventListener 'mousedown', mouseDown
  canvas.elt.addEventListener 'touchstart', touchStart
  canvas.elt.addEventListener 'mousemove', mouseMove
  canvas.elt.addEventListener 'touchmove', touchMove
  window.addEventListener 'mouseup', mouseUp
  window.addEventListener 'touchend', mouseUp
  UI.setup()

window.draw = ->
  {auto, spacing, emoji} = UI
  return unless auto and emoji
  x = autoX + spacing * Math.cos autoAngle
  y = autoY + spacing * Math.sin autoAngle
  drawAndWrap emoji, x, y, autoX, autoY
  autoX = x % width
  autoY = y % height
  autoAngle += autoAngleDelta
  autoAngleDelta += autoAngleDeltaDelta
  if Math.random() < 0.01
    autoAngleDelta = 2*Math.random() - 1
    autoAngleDeltaDelta = 0.2*Math.random() - 0.1
    emoji = UI.palette[Math.floor(Math.random()*UI.palette.length)]
    console.log emoji
    UI.emoji = emoji


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
  emoji = UI.emoji
  drawAndWrap emoji, x, y, x, y-1

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
  emoji = UI.emoji
  drawAndWrap emoji, x, y, lastX, lastY
  lastX = x
  lastY = y

drawAndWrap = (emoji, x, y, px, py) ->
  {size, wrap} = UI
  half = size/2
  angle = Math.atan2(py-y, px-x) + TAU/4
  drawOne emoji, x, y, size, angle

  return unless wrap
  if x < half
    drawOne emoji, x+width, y, size, angle
    if y < half
      drawOne emoji, x+width, y+height, size, angle
  if x > width - half
    drawOne emoji, x-width, y, size, angle
    if y > height - half
      drawOne emoji, x-width, y-height, size, angle
  if y < half
    drawOne emoji, x, y+height, size, angle
    if x > width - half
      drawOne emoji, x-width, y+height, size, angle
  if y > height - half
    drawOne emoji, x, y-height, size, angle
    if x < half
      drawOne emoji, x+width, y-height, size, angle

drawOne = (emoji, x, y, size, angle) ->
  half = size/2
  translate x, y
  rotate angle
  image emoji, 0, 0, emojiSize, emojiSize, -half, -half, size, size
  rotate -angle
  translate -x, -y


calcDistance = (x1, y1, x2, y2) ->
  dx = x2-x1
  dy = y2-y1
  Math.sqrt dx*dx + dy*dy


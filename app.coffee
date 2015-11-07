UI = require './src/ui'

emojiSize = 64
emojiHalf = emojiSize/2
emojiIndex = 0

setup = ->
  console.log 'setup'
  createCanvas 640, 480
  UI.setup()

draw = ->
  # console.log 'draw'
  if mouseIsPressed
    emojiIndex = (emojiIndex+1) % UI.emoji.length
    emoji = UI.emoji[emojiIndex]
    image emoji, mouseX-emojiHalf, mouseY-emojiHalf

window.setup = setup
window.draw = draw

# module.exports = {setup, draw}
# if module.hot
#   module.hot.accept '', () ->
#     console.log arguments
#     debugger

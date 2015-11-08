EmojiOne = require 'emojione'
# EmojiOne.imagePathPNG = './node_modules/emojione/assets/png/'

defaultInput = ':rose: :fire: :star2: :green_heart: :ghost: :smiling_imp:'

emojiPreview = null
emojiInput = null

mod =
  spacing: 48
  emoji: []
  setup: () ->
    div = createDiv('')

    div.child createDiv 'canvas'
    div.child createButton('save image').mouseClicked ->
      saveCanvas 'emoji-paint', 'png'

    div.child createButton('clear canvas').mouseClicked ->
      resizeCanvas width, height

    div.child createDiv 'chose emoji'
    emojiInput = createInput( defaultInput )
      .input( changeEmoji )
    emojiInput.size 640
    div.child emojiInput

    emojiPreview = createDiv ''
    div.child emojiPreview
    changeEmoji()

    div.child createDiv 'change spacing'
    spacingSlider = createSlider( 0, 100, mod.spacing )
      .input( changeSpacing )
    spacingSlider.size 640
    div.child spacingSlider

    # Waiting on https://github.com/processing/p5.js/issues/1085
    # div.child createDiv 'load a background image'
    # div.child createFileInput loadBg

loadBg = (file) ->
  return unless file.type is 'image'
  loadImage file.data, (img) ->
    resizeCanvas img.width, img.height
    image img, 0, 0

changeSpacing = (event) ->
  mod.spacing = parseInt(event.target.value)

changeEmoji = ->
  input = emojiInput.value()
  emoji = EmojiOne.toImage EmojiOne.toShort input
  emojiPreview.html emoji

  for child in emojiPreview.elt.children
    if child.nodeName is 'IMG'
      unless mod.emoji[0]
        mod.emoji = [loadImage child.src]
      child.addEventListener 'click', clickImage

clickImage = (event) ->
  img = event.target
  mod.emoji = [loadImage img.src]
  for child in emojiPreview.elt.children
    if child.nodeName is 'IMG'
      child.className = if (img is child) then 'selected' else ''

module.exports = mod



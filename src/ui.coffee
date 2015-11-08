EmojiOne = require 'emojione'
# EmojiOne.imagePathPNG = './node_modules/emojione/assets/png/'

defaultInput = ':rose: :hot_pepper: :sunflower: :star2: :green_heart: :ghost: :smiling_imp:'

emojiPreview = null
emojiInput = null

mod =
  size: 48
  spacing: 32
  emoji: []
  auto: false
  wrap: true
  setup: () ->
    div = createDiv('')

    div.child createDiv 'canvas'

    div.child createSpan 'auto draw'
    div.child createCheckbox('auto draw', mod.auto).changed ->
      mod.auto = @checked()

    div.child createSpan 'wrap around'
    div.child createCheckbox('wrap around', mod.wrap).changed ->
      mod.wrap = @checked()

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
    div.child createSpan 'size '
    spacingSlider = createSlider( 1, 64, mod.size ).input( changeSize )
    div.child spacingSlider
    div.child createSpan 'spacing '
    spacingSlider = createSlider( 1, 100, mod.spacing ).input( changeSpacing )
    div.child spacingSlider

    # Waiting on https://github.com/processing/p5.js/issues/1085
    # div.child createDiv 'load a background image'
    # div.child createFileInput loadBg

loadBg = (file) ->
  return unless file.type is 'image'
  loadImage file.data, (img) ->
    resizeCanvas img.width, img.height
    image img, 0, 0

changeSize = (event) ->
  mod.size = parseInt(event.target.value)

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



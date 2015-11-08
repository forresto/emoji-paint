EmojiOne = require 'emojione'
# EmojiOne.imagePathPNG = './node_modules/emojione/assets/png/'

emojiPreview = null
emojiInput = null

mod =
  spacing: 100
  emoji: []
  setup: () ->
    div = createDiv('')

    div.child createDiv 'chose emoji'
    emojiInput = createInput( ':heart: :princess: :pineapple: :apple: :goat: :cow:' )
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

  emoji = []
  for child in emojiPreview.elt.children
    if child.nodeName is 'IMG'
      emoji.push loadImage child.src

  mod.emoji = emoji


module.exports = mod



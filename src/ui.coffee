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
    emojiInput = createInput( ':heart: :princess: :pineapple: :apple: :goat: :cow:' ).input( changeEmoji )
    div.child emojiInput
    emojiPreview = createSpan ''
    div.child emojiPreview
    changeEmoji()

    div.child createDiv 'change spacing'
    div.child createSlider( 0, 100, mod.spacing ).input( changeSpacing )

    div.child createDiv 'load a background image'
    div.child createFileInput loadBg

loadBg = (file) ->
  return unless file.type is 'image'
  reader = new FileReader()
  reader.onload = (event) ->
    loadImage event.target.result, (img) ->
      resizeCanvas img.width, img.height
      image img, 0, 0
  reader.readAsDataURL file.file

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



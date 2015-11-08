EmojiOne = require 'emojione'
# EmojiOne.imagePathPNG = './node_modules/emojione/assets/png/'

defaultInput = ':rose: :hot_pepper: :sunflower: :star2: :evergreen_tree: :ghost: :smiling_imp: :umbrella:'

emojiPalette = null
emojiInput = null

module.exports = UI =
  size: 48
  spacing: 32
  emoji: null
  palette: []
  auto: true 
  wrap: true
  setup: () ->
    createDiv 'canvas'

    createCheckbox('auto draw', UI.auto).changed ->
      UI.auto = @checked()

    createCheckbox('wrap around', UI.wrap).changed ->
      UI.wrap = @checked()

    createButton('save image').mouseClicked ->
      saveCanvas 'emoji-paint', 'png'

    createButton('clear canvas').mouseClicked ->
      resizeCanvas width, height

    createDiv 'chose emoji'
    emojiInput = createInput( defaultInput )
      .input( changeEmoji )
    emojiInput.size 640
    emojiInput

    emojiPalette = createDiv ''
    changeEmoji()

    createDiv 'change spacing'
    createSpan 'size '
    createSlider( 1, 64, UI.size ).input( changeSize )
    createSpan 'spacing '
    createSlider( 1, 100, UI.spacing ).input( changeSpacing )

    # Waiting on https://github.com/processing/p5.js/issues/1085
    # div.child createDiv 'load a background image'
    # div.child createFileInput loadBg

loadBg = (file) ->
  return unless file.type is 'image'
  loadImage file.data, (img) ->
    resizeCanvas img.width, img.height
    image img, 0, 0

changeSize = (event) ->
  UI.size = parseInt(event.target.value)

changeSpacing = (event) ->
  UI.spacing = parseInt(event.target.value)

changeEmoji = ->
  input = emojiInput.value()
  emoji = EmojiOne.toImage EmojiOne.toShort input
  dummy = document.createElement 'div'
  dummy.innerHTML = emoji
  emojiPalette.html ''
  UI.palette = []

  for child in dummy.children
    if child.nodeName is 'IMG'
      img = createImg( child.src, child.alt ).mouseClicked( clickImage )
      emojiPalette.child img
      UI.palette.push img

  emojiPalette.elt.firstChild.click()

clickImage = (event) ->
  img = event.target
  UI.emoji = loadImage img.src
  for child in emojiPalette.elt.children
    if child.nodeName is 'IMG'
      child.className = if (img is child) then 'selected' else ''




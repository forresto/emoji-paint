EmojiOne = require 'emojione'
# EmojiOne.imagePathPNG = './node_modules/emojione/assets/png/'

defaultInput = ':rose: :hot_pepper: :sunflower: :star2: 😃 :evergreen_tree: :ghost: :umbrella:'

emojiPalette = null
emojiInput = null

module.exports = UI =
  size: 48
  spacing: 32
  emoji: null
  palette: []
  auto: false 
  wrap: true
  symmetry: 2
  setup: () ->
    createDiv 'canvas'
    # Waiting on https://github.com/processing/p5.js/issues/1085
    # div.child createDiv 'load a background image'
    # div.child createFileInput loadBg
    createButton('save image').mouseClicked ->
      saveCanvas 'emoji-paint', 'png'
    createButton('clear canvas').mouseClicked ->
      resizeCanvas width, height

    createDiv 'chose emoji palette'
    emojiInput = createInput( defaultInput )
      .input( changeEmoji )
    emojiInput.size 640
    emojiInput

    emojiPalette = createDiv ''
    changeEmoji()

    createDiv 'drawing'
    createCheckbox('auto draw ', UI.auto).changed ->
      UI.auto = @checked()
    createCheckbox('wrap around ', UI.wrap).changed ->
      UI.wrap = @checked()
    createSlider( 1, 17, UI.symmetry ).input ->
      UI.symmetry = @value()
    createSpan 'symmetry '
    createSlider( 1, 64, UI.size ).input ->
      UI.size = @value()
    createSpan 'size '
    createSlider( 1, 100, UI.spacing ).input ->
      UI.spacing = @value()
    createSpan 'spacing '

loadBg = (file) ->
  return unless file.type is 'image'
  loadImage file.data, (img) ->
    resizeCanvas img.width, img.height
    image img, 0, 0

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




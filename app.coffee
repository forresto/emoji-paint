setup = ->
  console.log 'setup'
  createCanvas 640, 480

  # UI
  fileInput = createFileInput loadBg
  spacing = createSlider 0, 100, 0
  console.log spacing

loadBg = (file) ->
  return unless file.type is 'image'
  reader = new FileReader()
  reader.onload = (event) ->
    loadImage event.target.result, (img) ->
      resizeCanvas img.width, img.height
      image img, 0, 0
  reader.readAsDataURL file.file

draw = ->
  # console.log 'draw'
  if mouseIsPressed
    ellipse mouseX, mouseY, 10, 10

window.setup = setup
window.draw = draw

# module.exports = {setup, draw}
# if module.hot
#   module.hot.accept '', () ->
#     console.log arguments
#     debugger

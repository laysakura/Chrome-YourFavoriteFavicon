// Drawing functions

function yffCanvasDrawSimple(canvas, bg_color) {
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = bg_color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function yffCanvasDrawImageDataUrl(canvas, data_url) {
  var ctx = canvas.getContext('2d');
  var image = new Image();
  image.src = data_url;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

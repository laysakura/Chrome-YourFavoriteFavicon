// Drawing functions

function yffCanvasDraw(canvas, bg_color) {
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = bg_color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

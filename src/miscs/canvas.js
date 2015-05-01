(function(global) {
  "use strict";

  // --- dependency modules ----------------------------------
  // --- define / local variables ----------------------------
  // --- class / interfaces ----------------------------------
  function YffCanvas(canvas) {
    this.canvas = canvas;
  }

  YffCanvas["prototype"]["drawSimple"] = drawSimple; // drawSimple(canvas:Object, bgColor:String):void
  YffCanvas["prototype"]["drawImageDataUrl"] = drawImageDataUrl; // drawImageDataUrl(canvas:Object, dataUrl:String):void

  // --- implements ------------------------------------------
  function drawSimple(bgColor) {
    var ctx = this.canvas.getContext('2d');
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  function drawImageDataUrl(canvas, dataUrl) {
    var ctx = this.canvas.getContext('2d');
    var image = new Image();
    image.src = dataUrl;
    ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
  }

  // --- exports ---------------------------------------------
  if (typeof module !== "undefined") {
    module["exports"] = YffCanvas;
  }
  global["YffCanvas"] = YffCanvas;

})((this || 0).self || global);

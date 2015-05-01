(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
(function(global) {
  "use strict";

  // --- dependency modules ----------------------------------
  // --- define / local variables ----------------------------
  const YFF_CONST = {
    iconSize: 16,
    iconDataUrlFormat: 'image_png',
    iconLinkType: 'image/png',
    uploadImgTypePattern: /^image\/(png|jpeg|gif)$/,
  };

  // --- class / interfaces ----------------------------------
  // --- implements ------------------------------------------
  // --- exports ---------------------------------------------
  if (typeof module !== "undefined") {
    module["exports"] = YFF_CONST;
  }
  global["YFF_CONST"] = YFF_CONST;

})((this || 0).self || global);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function() {
  "use strict";

  var YffValidator = require('./viewModels/validator');
  var popupMain = require('./viewModels/popup');

  $(window).load(popupMain);
}());

},{"./viewModels/popup":4,"./viewModels/validator":5}],4:[function(require,module,exports){
(function (global){
(function(global) {
  "use strict";

  // --- dependency modules ----------------------------------
  var YFF_CONST = require('../miscs/consts')
  var YffCanvas = require('../miscs/canvas');

  // --- define / local variables ----------------------------

  // --- class / interfaces ----------------------------------

  // --- implements ------------------------------------------
  function popupMain() {
    var yffValidator = new YffValidator();

    var canvas = $('#yff_editing_icon_canvas')[0];
    canvas.width = YFF_CONST.iconSize;
    canvas.height = YFF_CONST.iconSize;

    var yffCanvas = new YffCanvas(canvas);

    registerDataBindings(yffCanvas, yffValidator);
    registerInteractiveValidations(yffValidator);


    // 初期値はlocalStorageから(modelから)とる
    // これをform element操作でメモリ上で変更していく
    var icon_setting = {
      iconFrom: 'simple',
      simple: {
        bg_color: '#0af',
        character: 'W',
      },
      localImg: {
        data_url: null,
      },
    }

    //
    // Event listners (Controllers)
    $('#yff_localImg').change(function() {
      var file = this.files[0];
      if (!yffIsValidLocalImg(file)) return;

      console.log('Valid image file set:');

      var reader = new FileReader();
      reader.onload = function(e) {
        var data_url = e.target.result;
        console.log(data_url);

        // checks localStorage's limitation
        if (data_url.length > chrome.storage.sync.QUOTA_BYTES_PER_ITEM) {
          console.log('[FATAL] data_url too large');
          return;
        }

        icon_setting.iconFrom = 'localImg';
        icon_setting.localImg.data_url = data_url;

        yffCanvas.drawImageDataUrl(canvas, data_url);
      }
      reader.readAsDataURL(file);
    });

    $('#yff_register_btn').click(function() {
      // var iconFrom = ;

      chrome.storage.local.set(icon_setting, function() {
        console.log('setting has been saved.');
        console.log(icon_setting);
      });
    });
  }


  // Methods
  function registerInteractiveValidations(yffValidator) {
    jQuery.validator.addMethod("htmlColorCode", function(value, element) {
      return this.optional(element) || yffValidator.isValidHtmlColorCode(value);
    }, "HTMLカラーコードとして適切な値を入力してください");

    $(document).ready(function() {
      $('#yffForm').validate({
        debug: true,
        onkeyup: function(element) { $(element).valid(); },  // `onkeyup: true` does not work... see https://github.com/jzaefferer/jquery-validation/issues/428
        rules: {
          yffBgColor: {
            htmlColorCode: true
          }
        }
      });
    });
  }

  function registerDataBindings(yffCanvas, yffValidator) {
    var ViewModel = function() {
      var self = this;

      self.iconFrom = ko.observable("simple");
      self.iconFrom.subscribe(function(newIconFrom) {
        $('.yff_fieldset').attr("disabled", true);
        $('#yff_fieldset_' + newIconFrom).attr("disabled", false);
      });

      self.bgColor = ko.observable("#abcdef");
      self.bgColor.subscribe(function(newBgColor) {
        if (!yffValidator.isValidHtmlColorCode(newBgColor)) return;
        drawPreviewSimple(yffCanvas, newBgColor);
        // [TODO] - modelのオブジェクトにsimpleの値をセットする
      });
    };
    ko.applyBindings(new ViewModel());
  }

  function drawPreviewSimple(yffCanvas, bgColor) {
    yffCanvas.drawSimple(bgColor);
  }

  // --- exports ---------------------------------------------
  if (typeof module !== "undefined") {
    module["exports"] = popupMain;
  }
  global["popupMain"] = popupMain;

})((this || 0).self || global);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../miscs/canvas":1,"../miscs/consts":2}],5:[function(require,module,exports){
(function (global){
(function(global) {
  "use strict";

  // --- dependency modules ----------------------------------
  // --- define / local variables ----------------------------

  // --- class / interfaces ----------------------------------
  function YffValidator() {}

  YffValidator["prototype"]["isValidHtmlColorCode"] = isValidHtmlColorCode; // isValidHtmlColorCode(color:String):Boolean

  // --- implements ------------------------------------------
  function isValidHtmlColorCode(color) {
    return /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(color);
  }

  // --- exports ---------------------------------------------
  if (typeof module !== "undefined") {
    module["exports"] = YffValidator;
  }
  global["YffValidator"] = YffValidator;

})((this || 0).self || global);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[3]);

(function(global) {
  "use strict";

  // --- dependency modules ----------------------------------
  var YFF_CONST = require('../miscs/consts')
  var YffCanvas = require('../miscs/canvas');
  var YffValidator = require('../viewModels/validator');

  // --- define / local variables ----------------------------

  // --- class / interfaces ----------------------------------

  // --- implements ------------------------------------------
  function optionsMain() {
    var yffValidator = new YffValidator();

    var canvas = $('#yff_editing_icon_canvas')[0];
    canvas.width = YFF_CONST.iconSize;
    canvas.height = YFF_CONST.iconSize;

    var yffCanvas = new YffCanvas(canvas);

    registerDataBindings(yffCanvas, yffValidator);
    registerInteractiveValidations(yffValidator);
    registerEventListners(yffCanvas, yffValidator);


    // 初期値はlocalStorageから(modelから)とる
    // これをform element操作でメモリ上で変更していく
    // var icon_setting = {
    //   iconFrom: 'simple',
    //   simple: {
    //     bg_color: '#0af',
    //     character: 'W',
    //   },
    //   localImg: {
    //     data_url: null,
    //   },
    // }

    //
    // Event listners (Controllers)
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

  function registerEventListners(yffCanvas, yffValidator) {
    $('#yffLocalImg').change(function() {
      var file = this.files[0];
      if (!yffValidator.isValidLocalImg(file)) return;

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

        // icon_setting.iconFrom = 'localImg';
        // icon_setting.localImg.data_url = data_url;

        yffCanvas.drawImageDataUrl(data_url);
      }
      reader.readAsDataURL(file);
    });
  }

  function drawPreviewSimple(yffCanvas, bgColor) {
    yffCanvas.drawSimple(bgColor);
  }

  // --- exports ---------------------------------------------
  if (typeof module !== "undefined") {
    module["exports"] = optionsMain;
  }
  global["optionsMain"] = optionsMain;

})((this || 0).self || global);

(function(global) {
  "use strict";

  // --- dependency modules ----------------------------------
  var YFF_CONST = require('../miscs/consts');
  var YffCanvas = require('../miscs/canvas');
  var YffValidator = require('../viewModels/validator');
  var YffSiteIcon = require('../models/siteIcon');
  var YffSimpleIcon = require('../models/simpleIcon');

  // --- define / local variables ----------------------------

  // --- class / interfaces ----------------------------------

  // --- implements ------------------------------------------
  function optionsMain() {
    var yffValidator = new YffValidator();

    var canvas = $('#yff_editing_icon_canvas')[0];
    canvas.width = YFF_CONST.iconSize;
    canvas.height = YFF_CONST.iconSize;

    var yffCanvas = new YffCanvas(canvas);

    registerDataBindings(yffCanvas);
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

  function registerDataBindings(yffCanvas) {
    var ViewModel = function() {
      var self = this;

      self.urlPattern = ko.observable("www.example.com");
      self.urlPatternValidationError = ko.observable();
      self.iconFrom = ko.observable("simple");
      self.bgColor = ko.observable("#abcdef");
      self.bgColorValidationError = ko.observable();

      self.urlPattern.subscribe(function(newUrlPattern) {
        var errorMessage = YffSiteIcon.prototype.validateUrlPattern(newUrlPattern);
        self.urlPatternValidationError(errorMessage);
      });

      self.iconFrom.subscribe(function(newIconFrom) {
        $('.yff_fieldset').attr("disabled", true);
        $('#yff_fieldset_' + newIconFrom).attr("disabled", false);
      });

      self.bgColor.subscribe(function(newBgColor) {
        var errorMessage = YffSimpleIcon.prototype.validateBgColor(newBgColor);
        self.bgColorValidationError(errorMessage);
        if (errorMessage) { return; }

        drawPreviewSimple(yffCanvas, newBgColor);
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
      };
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

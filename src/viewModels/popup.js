(function() {
  "use strict";

  main();

  function main() {
    var validator = new YffValidator();

    var canvas = $('#yff_editing_icon_canvas')[0];
    canvas.width = YFF_ICON_SIZE;
    canvas.height = YFF_ICON_SIZE;

    registerDataBindings(canvas, validator);
    registerInteractiveValidations(validator);


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

        yffCanvasDrawImageDataUrl(canvas, data_url);
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
  function registerInteractiveValidations(validator) {
    jQuery.validator.addMethod("htmlColorCode", function(value, element) {
      return this.optional(element) || validator.isValidHtmlColorCode(value);
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

  function registerDataBindings(canvas, validator) {
    var ViewModel = function() {
      var self = this;

      self.iconFrom = ko.observable("simple");
      self.iconFrom.subscribe(function(newValue) {
        $('.yff_fieldset').attr("disabled", true);
        $('#yff_fieldset_' + self.iconFrom()).attr("disabled", false);
      });

      self.bgColor = ko.observable("#ffffff");
      self.handleBgColor = function() {
        if (!validator.isValidHtmlColorCode(self.bgColor())) return;

        drawPreviewSimple(canvas, self.bgColor());
        // [TODO] - modelのオブジェクトにsimpleの値をセットする
      }

    };
    ko.applyBindings(new ViewModel());
  }

  function drawPreviewSimple(canvas, bgColor) {
    yffCanvasDrawSimple(canvas, bgColor);
  }

})();

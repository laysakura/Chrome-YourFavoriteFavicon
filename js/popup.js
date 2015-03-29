(function() {

  var canvas = $('#yff_editing_icon_canvas')[0];
  canvas.width = YFF_ICON_SIZE;
  canvas.height = YFF_ICON_SIZE;

  // 初期値はlocalStorageから(modelから)とる
  // これをform element操作でメモリ上で変更していく
  var icon_setting = {
    icon_from: 'simple',
    simple: {
      bg_color: '#0af',
      character: 'W',
    },
    local_img: {
      data_url: null,
    },
  }

  //
  // Event listners (Controllers)
  $('input[name="icon_from"]:radio').change(function() {
    console.log('radio button changed:');
    var icon_from = $(this).val();
    console.log(icon_from);

    $('.yff_fieldset').attr("disabled", true);
    $('#yff_fieldset_' + icon_from).attr("disabled", false);
  });

  $('#yff_bg_color').keyup(function() {
    var bg_color = $(this).val();
    if (!yffIsValidBgColor(bg_color)) return;

    console.log('Background color set:');
    console.log(bg_color);

    icon_setting.icon_from = 'simple';
    icon_setting.simple.bg_color = bg_color;

    yffCanvasDrawSimple(canvas, bg_color);
  });

  $('#yff_local_img').change(function() {
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

      icon_setting.icon_from = 'local_img';
      icon_setting.local_img.data_url = data_url;

      yffCanvasDrawImageDataUrl(canvas, data_url);
    }
    reader.readAsDataURL(file);
  });

  $('#yff_register_btn').click(function() {
    // var icon_from = ;

    chrome.storage.local.set(icon_setting, function() {
      console.log('setting has been saved.');
      console.log(icon_setting);
    });
  });

})();

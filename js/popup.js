(function() {

  var canvas = $('#yff_editing_icon_canvas')[0];
  canvas.width = YFF_ICON_SIZE;
  canvas.height = YFF_ICON_SIZE;

  // 初期値はlocalStorageから(modelから)とる
  var registered_settings = {
    'bg_color': '#0af',
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

    yffCanvasDrawSimple(canvas, bg_color);
  });

  $('#yff_local_img').change(function() {
    var file = this.files[0];
    if (!file.type.match(YFF_UPLOAD_IMG_TYPE_PATTERN)) return;

    console.log('Valid image file set:');

    var reader = new FileReader();
    reader.onload = function(e) {
      var data_url = e.target.result;
      console.log(data_url);
      yffCanvasDrawImageDataUrl(canvas, data_url);
    }
    reader.readAsDataURL(file);
  });

  $('#yff_register_btn').click(function() {
    chrome.storage.sync.set(registered_settings, function() {
      console.log('setting has been saved.');
    });
  });

})();

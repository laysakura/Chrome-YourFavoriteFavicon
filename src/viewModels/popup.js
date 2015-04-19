var ViewModel = function() {
  this.bgColor = ko.observable("#ffffff");
};
ko.applyBindings(new ViewModel());

(function() {

  var canvas = $('#yff_editing_icon_canvas')[0];
  canvas.width = YFF_ICON_SIZE;
  canvas.height = YFF_ICON_SIZE;

  // Retrieve settings from localStorage (async).
  var db_loaded = false;
  var settings = yffGetInitialSettings();
  chrome.storage.local.get(null, function(settings_from_db) {
    db_loaded = true;
    console.log('Raw current Db object:');
    console.log(settings_from_db);
    if (yffIsValidSettings(settings_from_db)) settings = settings_from_db;
  });


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
    if (!db_loaded) return;
    chrome.storage.local.set(icon_setting, function() {
      console.log('setting has been saved.');
      console.log(icon_setting);
    });
  });

  $('#yff_reset_all_btn').click(function() {
    chrome.storage.local.clear(function() {
      console.log('All setting has been reset.');
    });
  });

})();

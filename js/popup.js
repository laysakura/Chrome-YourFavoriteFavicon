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
  $('#yff_bg_color').keyup(function() {
    var bg_color = $(this).val();
    if (!yff_is_valid_bg_color(bg_color)) return;

    console.log('Background color set:');
    console.log(bg_color);

    yffCanvasDraw(canvas, bg_color);
  });

  $('#yff_register_btn').click(function() {
    chrome.storage.sync.set(registered_settings, function() {
      console.log('setting has been saved.');
    });
  });

})();

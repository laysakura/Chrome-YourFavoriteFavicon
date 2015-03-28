(function() {

  var canvas = $('#yff_editing_icon_canvas')[0];
  canvas.width = YFF_ICON_SIZE;
  canvas.height = YFF_ICON_SIZE;


  //
  // Event listners (Controllers)
  $('#yff_register_btn').click(function() {
    console.log('click!');

    registered_settings = {
      'bg_color': $('#yff_bg_color').val(),
    }

    yffCanvasDraw(canvas, registered_settings.bg_color);

    chrome.storage.sync.set(registered_settings, function() {
      console.log('setting has been saved.');
    });
  });

})();

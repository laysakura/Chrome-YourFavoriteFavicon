(function() {

  console.log('loaded!');

  //
  // Event listners (Controllers)
  $('#yff_register_btn').click(function() {
    console.log('click!');

    registered_settings = {
      'bg_color': $('#yff_bg_color').val(),
    }

    chrome.storage.sync.set(registered_settings, function() {
      console.log('setting has been saved.');
    });
  });

})();

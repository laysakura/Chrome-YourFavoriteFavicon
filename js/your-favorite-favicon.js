(function() {

  chrome.storage.sync.get(null, function(settings) {

    console.log('Current localStorage contents:');
    console.log(settings);

    // var icon_settings = settings.icon_settings;
    var icon_settings = {
      icon_settings: [
        {
          url_pattern: 'http://example\.com/',
          updated_at: 12345,
        },
        {
          url_pattern: 'http://example\.com/',
          updated_at: 23456,
          icon_from: 'simple',
          simple: {
            bg_color: '#a0f',
          },
        },
        {
          url_pattern: 'http://example\..*/',
          updated_at: 23456,
        },
      ]
    }.icon_settings;

    // Find matched_icon_settings from icon_settings whose url_pattern matches to current URL.
    // Elements in matched_icon_settings are ordered by priority.
    var url = location.href;
    var matched_icon_settings = yffMatchedIconSettingsInOrder(icon_settings, url);
    console.log('matched_icon_settings:');
    console.log(matched_icon_settings);
    if (matched_icon_settings.length == 0) return;

    // Found icon_setting to apply in this page.
    var icon_setting = matched_icon_settings[0];

    var canvas = document.createElement('canvas');
    canvas.width = YFF_ICON_SIZE;
    canvas.height = YFF_ICON_SIZE;

    switch (icon_setting.icon_from) {
    case 'simple':
      yffCanvasDrawSimple(canvas, icon_setting.simple.bg_color);
      break;
    case 'local_img':
      yffCanvasDrawImageDataUrl(canvas, icon_setting.local_img.data_url);
      break;
    }

    var img_data_url = canvas.toDataURL(YFF_ICON_DATA_URL_FORMAT);
    updateIcon(img_data_url);
  });


  //
  // Functions
  function updateIcon(img_data_url) {
    var link = document.createElement('link');
    link.setAttribute('rel', 'icon');
    link.setAttribute('type', YFF_ICON_LINK_TYPE);
    link.setAttribute('sizes', [YFF_ICON_SIZE, YFF_ICON_SIZE].join(' '));
    link.setAttribute('href', img_data_url);
    document.querySelector('head').appendChild(link);
  }

})();

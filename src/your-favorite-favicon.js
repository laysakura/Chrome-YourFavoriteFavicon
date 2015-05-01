(function() {
  "use strict";

  var YFF_CONST = require('./miscs/consts');
  var YffCanvas = require('./miscs/canvas');

  chrome.storage.local.get(null, function(settings) {

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
          iconFrom: 'simple',
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
    canvas.width = YFF_CONST.iconSize;
    canvas.height = YFF_CONST.iconSize;

    var yffCanvas = new YffCanvas();

    switch (icon_setting.iconFrom) {
    case 'simple':
      yffCanvas.drawSimple(canvas, icon_setting.simple.bg_color);
      break;
    case 'localImg':
      yffCanvas.drawImageDataUrl(canvas, icon_setting.localImg.data_url);
      break;
    }

    var img_data_url = canvas.toDataURL(YFF_CONST.iconDataUrlFormat);
    updateIcon(img_data_url);
  });


  //
  // Functions
  function updateIcon(img_data_url) {
    var link = document.createElement('link');
    link.setAttribute('rel', 'icon');
    link.setAttribute('type', YFF_CONST.iconLinkType);
    link.setAttribute('sizes', [YFF_CONST.iconSize, YFF_CONST.iconSize].join(' '));
    link.setAttribute('href', img_data_url);
    document.querySelector('head').appendChild(link);
  }

})();

(function() {

  chrome.storage.sync.get(null, function(settings) {

    console.log('Current localStorage contents:');
    console.log(settings);

    var canvas = document.createElement('canvas');
    canvas.width = YFF_ICON_SIZE;
    canvas.height = YFF_ICON_SIZE;

    // ラジオボタンの選択結果から、描画方法を選択
    yffCanvasDrawSimple(canvas, settings.bg_color);

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

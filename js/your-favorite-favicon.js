(function() {
  const ICON_SIZE = 16;
  const ICON_DATA_URL_FORMAT = 'image_png';
  const ICON_LINK_TYPE = 'image/png';

  chrome.storage.sync.get(null, function(settings) {

    console.log('Current localStorage contents:');
    console.log(settings);

    var canvas = document.createElement('canvas');
    canvas.width = ICON_SIZE;
    canvas.height = ICON_SIZE;

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = settings.bg_color;
    ctx.fillRect(0, 0, ICON_SIZE, ICON_SIZE);

    var img_data_url = canvas.toDataURL(ICON_DATA_URL_FORMAT);

    updateIcon(img_data_url);

  });


  //
  // Functions
  function updateIcon(img_data_url) {
    var link = document.createElement('link');
    link.setAttribute('rel', 'icon');
    link.setAttribute('type', ICON_LINK_TYPE);
    link.setAttribute('sizes', [ICON_SIZE, ICON_SIZE].join(' '));
    link.setAttribute('href', img_data_url);
    document.querySelector('head').appendChild(link);
  }

})();

(function() {
  const ICON_SIZE = 16;
  const ICON_BG_COLOR = '#00FF00';
  const ICON_DATA_URL_FORMAT = 'image_png';
  const ICON_LINK_TYPE = 'image/png';

  var canvas = document.createElement('canvas');
  canvas.width = ICON_SIZE;
  canvas.height = ICON_SIZE;

  var ctx = canvas.getContext('2d');
  ctx.fillStyle = ICON_BG_COLOR;
  ctx.fillRect(0, 0, ICON_SIZE, ICON_SIZE);

  var img_data_url = canvas.toDataURL(ICON_DATA_URL_FORMAT);

  var link = document.createElement('link');
  link.setAttribute('rel', 'icon');
  link.setAttribute('type', ICON_LINK_TYPE);
  link.setAttribute('sizes', [ICON_SIZE, ICON_SIZE].join(' '));
  link.setAttribute('href', img_data_url);

  document.querySelector('head').appendChild(link);

})();

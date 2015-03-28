// Model functions

function yffIsValidBgColor(bg_color) {
  return /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(bg_color);
}

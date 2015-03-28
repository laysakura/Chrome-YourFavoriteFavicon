// Model functions

function yff_is_valid_bg_color(bg_color) {
  return /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(bg_color);
}

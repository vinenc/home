// Index
export const iWatch = function (obj, callback) {
  const a = `max-width:${obj.width.value}px;`;
  const b = `margin-top:${obj.spacing.value}px;`;
  callback(a, b);
};
// Background
export const bgWatch = function (obj, callback) {
  const a = `filter:blur(${obj.blur.value / 4}px); background-image:url(${
    obj.img.value
  });`;
  const b = `opacity:${obj.mask.value / 100};`;
  callback(a, b);
};
// WebsiteBar
export const wbWatch = function (obj, callback) {
  const a = `opacity:${obj.opacity.value / 100}; width:${obj.width.value}%;`;
  const b = `margin:${obj.vSpacing.value / 4}px ${
    obj.hSpacing.value / 4
  }px; padding:${obj.vSpacing.value / 4}px ${obj.hSpacing.value / 4}px;`;
  const c = `width:${obj.size.value}px; height:${obj.size.value}px; border-radius:${obj.radius.value}%;`;
  callback(a, b, c);
};
// SearchBox
export const sbWatch = function (obj, callback) {
  const a = `opacity:${obj.opacity.value / 100}; width:${
    obj.width.value
  }%; height:${obj.height.value}px; --el-border-radius-base:${
    obj.radius.value / 1.6
  }px`;
  const b = `width:${obj.width.value}%;`;
  callback(a, b);
};
// Clock
export const cWatch = function (obj, callback) {
  let b, c;
  let a = `opacity:${obj.opacity.value / 100};`;
  if (obj.display.value) {
    b = true;
    a += `height:auto;`;
  } else {
    b = false;
    a += `height:0;`;
  }
  if (obj.second.value) {
    c = true;
  } else {
    c = false;
  }
  callback(a, b, c);
};
// Layout
export const resetFun = function (obj, reset) {
  for (let item in obj) {
    for (let item2 in obj[item].options) {
      obj[item].options[item2].value = reset[item].options[item2].value;
    }
  }
};

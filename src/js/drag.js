let draging = null;

export const onDragStart = function (event) {
  event.dataTransfer.setData("te", event.target.innerText);
  // 获取选中的li元素(可能会选中li中的子元素，因此需要此步骤)
  if (event.target.nodeName === "LI") draging = event.target;
  else draging = event.target.parentNode;
};

export const onDragOver = function (event) {
  event.preventDefault();
  let target;
  // 获取目标位置指向的li元素(可能会指向li中的子元素，因此需要此步骤)
  if (event.target.nodeName === "LI") target = event.target;
  else target = event.target.parentNode;

  if (target !== draging) {
    if (target.nodeName === "LI") {
      if (target.animated) return;
      _active("move", target, draging);
    }
  }
};

export const deleteSite = function (event, del) {
  // 获取目标位置指向的li元素(可能会指向li中的子元素，因此需要此步骤)
  let target = event.target.parentNode.parentNode.parentNode;

  _animateGone(target);
  del.push({ li: target, next: target.nextSibling, id: target.id });
  setTimeout(() => {
    _active("delete", target);
  }, 500);
};

export const addSite = function (add) {
  _active("add", add);
};

export const recover = function (origin, del, add) {
  if (del) _active("recover", del);
  _active("sort", origin);
};

export const complete = function (item, del) {
  del.forEach((el) => {
    item[el.id] = "";
  });
  const result = [];
  const a1 = [];
  _push(a1);
  a1.forEach((el) => {
    for (let i = 0; i < item.length; i++) {
      if (el.id == i) result.push(item[el.id]);
    }
  });
  localStorage.setItem("Website", JSON.stringify(result));
};

const _active = function (type, arg1, arg2) {
  // 改变前的排序数组
  let a1 = [];
  _push(a1);

  // DOM_li列表操作
  _type(type, arg1, arg2);

  // 改变后的排序数组
  let a2 = [];
  if (type === "move") _push(a2);

  // 根据前后对比的位置变化，添加动画
  for (let i = 0; i < a1.length; i++) {
    if (type === "move") {
      if (!a1[i].li.isEqualNode(a2[i].li)) {
        // _animateMove接收(原始坐标DOMrect，目标对象)
        _animateMove(a1[i].rect, a1[i].li);
      }
    } else _animateMove(a1[i].rect, a1[i].li);
  }
};
// 根据type分别进行li元素操作
const _type = function (type, arg1, arg2) {
  const _ul = document.getElementById("websiteBar");
  // 移动item时触发，参数：'move',target,draging
  if (type === "move") {
    if (_index(arg2) < _index(arg1)) _ul.insertBefore(arg2, arg1.nextSibling);
    else _ul.insertBefore(arg2, arg1);
  }
  // 删除时触发，参数：'delete',target
  else if (type === "delete") _ul.removeChild(arg1);
  // 复原第一步，恢复被删除元素，参数：'recover',del
  else if (type === "recover") {
    for (let i = arg1.length - 1; i > -1; i--) {
      _ul.insertBefore(arg1[i].li, arg1[i].next);
      setTimeout(() => {
        _animateCome(arg1[i].li);
      }, 500);
    }
  }
  // 复原第二步，恢复排序顺序，参数：'sort',origin
  else if (type === "sort") {
    for (let i = arg1.length - 1; i > 0; i--) {
      _ul.insertBefore(arg1[i - 1], arg1[i]);
    }
  } else if (type === "add") {
    const target = _ul.lastChild;
    _ul.insertBefore(arg1, target);
  }
};
// 遍历获取li元素数组数据
const _push = function (arr) {
  // 获取ul中的li列表数组
  const list = document.getElementById("websiteBar").getElementsByTagName("li");

  for (let i = 0; i < list.length; i++) {
    arr.push({
      li: list[i],
      rect: list[i].getBoundingClientRect(),
      id: list[i].id,
    });
  }
};
// 获取元素在父元素中的index
const _index = function (el) {
  let index = 0;
  if (!el || !el.parentNode) return -1;
  while (el && (el = el.previousElementSibling)) index++;
  return index;
};
// 动画
const _animateMove = function (prevRect, target) {
  // 原始坐标
  let currentRect = target.getBoundingClientRect();
  // 新坐标
  if (prevRect.nodeType === 1) prevRect = prevRect.getBoundingClientRect();

  _animate(
    target,
    "transform",
    "translate3d(" +
      (prevRect.left - currentRect.left) +
      "px," +
      (prevRect.top - currentRect.top) +
      "px,0)",
    "translate3d(0,0,0)"
  );
};
const _animateGone = function (target) {
  _animate(target, "opacity", "1", "0");
};
const _animateCome = function (target) {
  _animate(target, "opacity", "0", "1");
};
const _animate = function (target, attr, start, end) {
  let ms = 500;
  _css(target, "transition", "none");
  _css(target, attr, start);
  // 触发重绘
  target.offsetWidth;
  // 变换开始，translate设置为0，即返回新坐标位置
  _css(target, "transition", "all " + ms + "ms");
  _css(target, attr, end);

  // 变换结束后清除style；如果上一个变换仍在进行，则清除上一个定时器，防止新变换中途被清除，而引起动画闪现
  clearTimeout(target.animated);
  target.animated = setTimeout(function () {
    _css(target, "transition", "");
    if (attr !== "opacity") _css(target, attr, "");
    target.animated = false;
  }, ms);
};
// 元素添加style
const _css = function (el, prop, val) {
  let style = el && el.style;
  if (style) {
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, "");
      } else if (el.currentStyle) {
        val = el.currentStyle;
      }

      return prop === void 0 ? val : val[prop];
    } else {
      if (!(prop in style)) {
        prop = "-webkit-" + prop;
      }
      style[prop] = val + (typeof val === "string" ? "" : "px");
    }
  }
};

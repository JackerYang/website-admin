/**
 * @description 绑定事件 on(ele, event, handler)
 * @param {Object} ele 元素
 * @param {String} event 事件
 * @param {Function} handler 事件
 * @return {null}
 */
export const on = (ele, event, handler) => {
  if (ele && event && handler) {
    if (document.addEventListener) {
      ele.addEventListener(event, handler, false);
    } else {
      ele.attachEvent("on" + event, handler);
    }
  }
};

/**
 * @description 解绑事件 off(ele, event, handler)
 * @param {Object} ele 元素
 * @param {String} event 事件
 * @param {Function} handler 事件
 * @return {null}
 */
export const off = (ele, event, handler) => {
  if (ele && event && handler) {
    if (document.removeEventListener) {
      ele.removeEventListener(event, handler, false);
    } else {
      ele.detachEvent("on" + event, handler);
    }
  }
};

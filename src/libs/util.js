/**
 * @description 通过路由列表得到菜单列表
 * @param {Array} list 路由列表
 * @return {Array} 菜单列表
 */
export const getMenuByRoutes = list => {
  let res = list
    .filter(item => item.meta && !item.meta.hideInMenu)
    .map(item => {
      if (item.meta && item.meta.hideInMenu) return;
      let { title, icon } = item.meta;
      let { name, path } = item;
      let children = [];

      if (item.children && item.children.length) {
        children = getMenuByRoutes(item.children);
      }
      return {
        title,
        icon,
        pathname: name,
        path,
        children
      };
    });
  return res;
};

/**
 * @description 生成连续数字的数组
 * @param {Number} start 开始数字
 * @param {Number} end 结束数字
 * @return {Array} 连续数字的数组
 */
export const generateContinuousArray = (start, end) => {
  let arr = [];
  for (let n = start; n <= end; n++) {
    arr.push(n);
  }
  return arr;
};

/**
 * @description 判断第一个字符串是否包含第二个字符串
 * @param {String} str1 第一个字符串
 * @param {String} str2 第二个字符串
 * @return {Boolean}
 */
export const hasOf = (str1, str2) => {
  return str1.indexOf(str2) > -1;
};

/**
 * @description 获取一个元素在数组中的下标（均为基本类型，数组不重复）
 * @param {Array} arr 存放基本类型数据的不重复的数组
 * @param {String | Number} item
 * @return {Number} index
 */
export const getIndexForBase = (arr, item) => {
  let index = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      index = i;
      break;
    }
  }
  return index;
};

/**
 * @description 设置表单验证
 * @param {String} sign 标识字段 输入还是选择 (输入)
 * @param {String} key 字段key (required)
 * @param {String} title 字段名称 (required)
 * @param {Number} min 最少字符 (undefined)
 * @param {Number} max 最多字符 (undefined)
 * @param {Regular} customPattern 自定义正则验证 (undefined)
 * @param {Function} customValidator 自定义函数验证 (undefined)
 * @return {Array}
 */
export const setDecorator = ({
  required = true,
  initialValue = undefined,
  sign = "input",
  key = null,
  title = null,
  min = undefined,
  max = undefined,
  customPattern = undefined,
  customValidator = undefined
}) => {
  if (!key || !title) {
    throw "key or title is required!";
  }

  // 非空
  let tipObj = {
    input: "输入",
    select: "选择",
    upload: "上传"
  };
  let rules = [
    {
      required,
      message: tipObj[sign] ? `请${tipObj[sign]}${title}` : `${title}有误`
    }
  ];

  // 最少字数
  min !== undefined &&
    rules.push({
      min: min,
      message: `${title}不能少于${min}个字符`
    });

  // 最多字数
  max !== undefined &&
    rules.push({
      max: max,
      message: `${title}不能多于${max}个字符`
    });

  // 自定义正则验证
  customPattern !== undefined &&
    rules.push({
      pattern: customPattern,
      message: `${title}格式有误`
    });

  // 自定义函数验证
  customValidator !== undefined &&
    rules.push({
      validator: customValidator
    });

  // return
  return [
    key,
    {
      rules,
      initialValue
    }
  ];
};

/**
 * @description 下载文件
 * @param {String} url
 * @param {String} fileName
 * @return {null}
 */
export const downloadFile = (url, fileName = "") => {
  let ele = document.createElement("a");
  ele.download = fileName;
  ele.style.display = "none";
  ele.href = url;
  // 受浏览器安全策略的因素，动态创建的元素必须添加到浏览器后才能实施点击
  document.body.appendChild(ele);
  // 触发点击
  ele.click();
  // 然后移除
  document.body.removeChild(ele);
};

/**
 * @description 判断字符串是否是ip
 * @param {String} str
 * @return {Boolean}
 */
export const isIp = str => {
  let ipReg = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/; //正则表达式
  return ipReg.test(str);
};

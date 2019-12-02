import axios from "../axios";

/**
 * @description 登录接口
 * @param {String} loginName
 * @param {String} loginPwd
 * @return {String} token
 */
export const login = params => {
  return axios.post("/login", params);
};

/**
 * @description 修改密码
 * @param {String} oldLoginPwd
 * @param {String} newLoginPwd
 * @return {null}
 */
export const pwdChange = params => {
  return axios.post("/updatePassword", params);
};

/**
 * @description 登出接口
 */
export const logout = () => {
  return axios.get("/logout");
};

/**
 * @description 获取当前登录用户
 * @return {Object}
 */
export const getLoginUser = () => {
  return axios.get("/loginUser");
};

/**
 * @description 获取组织机构结构树
 * @param {Number} id id (not required)
 * @return {Array}
 */
export const getOrgTree = id => {
  return axios.get("/sysOrgs/tree", {
    params: {
      id
    }
  });
};

/**
 * @description 上传图片
 * @param {Object} file 图片文件
 * @return {Object}
 */
export const uploadImg = file => {
  let formData = new FormData();
  if (Object.prototype.toString.call(file) === "[object Array]") {
    file.forEach(item => {
      formData.append("image", item, item.name);
    });
  } else {
    formData.append("image", file, file.name);
  }
  return axios.post("/image/upload", formData);
};

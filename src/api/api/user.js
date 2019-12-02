import axios from "../axios";

/**
 * @description 获取用户列表
 * @param {Number} id 左侧数id
 * @param {Number} page 页码
 * @param {Number} pageSize 每页多少条
 * @param {Object} obj 自定义搜索
 * @return {Array}
 */
export const getUserList = params => {
  return axios.get("/sysUsers", {
    params
  });
};

/**
 * @description 获取用户排序列表
 * @param {Number} orgId 左侧树id
 * @return {Array}
 */
export const getUserSortList = orgId => {
  return axios.get("/sysUsers/sort", {
    params: {
      orgId
    }
  });
};

/**
 * @description 获取一个用户
 * @param {Number} id id
 * @return {Object}
 */
export const getUser = id => {
  return axios.get(`/sysUsers/${id}`);
};

/**
 * @description 添加 / 修改组用户
 * @param {Number} id id 没有就是添加，有就是修改
 * @param {Number} orgId 所属机构
 * @param {String} userName 姓名
 * @param {String} userSex 性别
 * @param {String} loginName 登录名
 * @param {String} loginPwd 密码
 * @param {String} phone 手机号
 * @param {Number} haveAuthority 权限
 * @return {Null}
 */
export const editUser = params => {
  return axios.post("/sysUsers", params);
};

/**
 * @description 修改用户顺序
 * @param {Array} oldSortList 排序前的数据
 * @param {Array} newSortList 排序后的数据
 * @return {Null}
 */
export const editUserSort = params => {
  return axios.post("/sysUsers/sort", params);
};

/**
 * @description 删除用户
 * @param {Array} ids 用户id
 * @return {Null}
 */
export const delUser = ids => {
  return axios.delete(`/sysUsers/${ids.toString()}`);
};

import axios from "../axios";

/**
 * @description 获取组织机构列表
 * @param {Number} id 左侧数id
 * @param {Number} page 页码
 * @param {Number} pageSize 每页多少条
 * @param {Object} obj 自定义搜索
 * @return {Array}
 */
export const getOrgList = params => {
  return axios.get("/sysOrgs", {
    params
  });
};

/**
 * @description 获取组织机构排序列表
 * @param {Number} id 左侧数id
 * @return {Array}
 */
export const getOrgSortList = id => {
  return axios.get("/sysOrgs/sort", {
    params: {
      id
    }
  });
};

/**
 * @description 获取一个组织机构
 * @param {Number} id id
 * @return {Object}
 */
export const getOrg = id => {
  return axios.get(`/sysOrgs/${id}`);
};

/**
 * @description 添加 / 修改组织机构
 * @param {Number} id id 没有就是添加，有就是修改
 * @param {String} orgName 机构名称
 * @param {Number} pId 上级机构(id)
 * @param {String} remark 机构简介
 * @return {Null}
 */
export const editOrg = params => {
  return axios.post("/sysOrgs", params);
};

/**
 * @description 修改组织机构顺序
 * @param {Array} oldSortList 排序前的数据
 * @param {Array} newSortList 排序后的数据
 * @return {Null}
 */
export const editOrgSort = params => {
  return axios.post("/sysOrgs/sort", params);
};

/**
 * @description 删除组织机构
 * @param {Array} ids 组织机构id
 * @return {Null}
 */
export const delOrg = ids => {
  return axios.delete(`/sysOrgs/${ids.toString()}`);
};

import axios from "../axios";

/**
 * @description 获取板块管理列表
 * @param {Number} page 页码
 * @param {Number} pageSize 每页多少条
 * @param {Object} obj 自定义搜索
 * @return {Array}
 */
export const getPlateList = params => {
  return axios.get("/plates", {
    params
  });
};

/**
 * @description 获取板块管理排序列表
 * @return {Array}
 */
export const getPlateSortList = () => {
  return axios.get("/plates/sort");
};

/**
 * @description 获取一个板块管理
 * @param {Number} id id
 * @return {Object}
 */
export const getPlate = id => {
  return axios.get(`/plates/${id}`);
};

/**
 * @description 添加/修改板块管理
 * @param {Number} id id 有就修改没有就添加
 * @param {String} plateName 模块名称
 * @param {Boolean} isUse 是否启用
 * @param {String} plateIcon 板块图标
 * @param {String} plateImg 板块背景
 * @return {Null}
 */
export const editPlate = params => {
  return axios.post("/plates", params);
};

/**
 * @description 修改板块顺序
 * @param {Array} oldSortList 排序前的数据
 * @param {Array} newSortList 排序后的数据
 * @return {Null}
 */
export const editPlateSort = params => {
  return axios.post("/plates/sort", params);
};

/**
 * @description 发布板块
 * @param {Array} ids ids
 * @return {Null}
 */
export const platePublish = ids => {
  return axios.get(`/plates/publish/${ids.toString()}`);
};

/**
 * @description 撤销板块
 * @param {Array} ids ids
 * @return {Null}
 */
export const plateCancel = ids => {
  return axios.delete(`/plates/publish/${ids.toString()}`);
};

/**
 * @description 删除企业印象
 * @param {Array} ids 企业风光id
 * @return {Null}
 */
export const delPlate = ids => {
  return axios.delete(`/plates/${ids.toString()}`);
};

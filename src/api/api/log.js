import axios from "../axios";

/**
 * @description 获取日志管理
 * @param {Number} page 页码
 * @param {Number} pageSize 每页个数
 * @param {Object} obj 自定义搜索
 * @return {Array}
 */
export const getLog = params => {
  return axios.get("/sysLogs", {
    params
  });
};

/**
 * @description 获取日志详情
 * @param {Number} id id
 * @return {Object}
 */
export const getLogDetail = id => {
  return axios.get(`/sysLogs/${id}`);
};

/**
 * @description 导出日志管理
 * @return {null}
 */
export const exportLog = () => {
  let url = `${axios.defaults.baseURL}/sysLogs/excel`;
  return url;
};

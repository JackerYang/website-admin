import axios from "../axios";

/**
 * @description 发布数量统计
 * @param {String} year 年份
 * @return {Array}
 */
export const getReleaseEcharts = year => {
  return axios.get("/publishCounts", {
    params: {
      year
    }
  });
};

/**
 * @description 阅读数量统计
 * @return {Array}
 */
export const getReadEcharts = year => {
  return axios.get("/readCounts", {
    params: {
      year
    }
  });
};

/**
 * @description 导出发布数量Excel
 * @param {String} year 年
 * @return {String}
 */
export const exportRelease = year => {
  let url = year
    ? `${axios.defaults.baseURL}/publishCounts/excel?year=${year}`
    : `${axios.defaults.baseURL}/publishCounts/excel`;
  return url;
};

/**
 * @description 导出阅读数量Excel
 * @param {String} year 年
 * @return {String}
 */
export const exportRead = year => {
  let url = year
    ? `${axios.defaults.baseURL}/readCounts/excel?year=${year}`
    : `${axios.defaults.baseURL}/readCounts/excel`;
  return url;
};

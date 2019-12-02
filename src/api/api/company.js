import axios from "../axios";

/**
 * ========================================================================================
 * 企业简介
 */

/**
 * @description 获取企业简介
 * @return {Object}
 */
export const getOrgProfile = () => {
  return axios.get("/orgProfiles");
};

/**
 * @description 修改企业简介
 * @param {Number} sysUser
 * @param {String} content
 * @return {Null}
 */
export const editOrgProfile = params => {
  return axios.post("/orgProfiles", params);
};

/**
 * ========================================================================================
 * 企业风光
 */

/**
 * @description 获取企业风光
 * @param {Number} page 页码
 * @param {Number} pageSize 每页多少条
 * @param {Object} obj 自定义搜索
 * @return {Array}
 */
export const getOrgSceneryList = params => {
  return axios.get("/orgScenerys", {
    params
  });
};

/**
 * @description 获取企业风光排序列表
 * @return {Array}
 */
export const getOrgScenerySortList = () => {
  return axios.get("/orgScenerys/sort");
};

/**
 * @description 获取一个企业风光
 * @param {Number} id id
 * @return {Object}
 */
export const getOrgScenery = id => {
  return axios.get(`/orgScenerys/${id}`);
};

/**
 * @description 添加/修改企业风光
 * @param {Number} id id 有就修改没有就添加
 * @param {String} title 标题
 * @param {String} imgPath 缩略图
 * @return {Null}
 */
export const editOrgScenery = params => {
  return axios.post("/orgScenerys", params);
};

/**
 * @description 修改企业风光顺序
 * @param {Array} oldSortList 排序前的数据
 * @param {Array} newSortList 排序后的数据
 * @return {Null}
 */
export const editOrgScenerySort = params => {
  return axios.post("/orgScenerys/sort", params);
};

/**
 * @description 删除企业风光
 * @param {Array} ids 企业风光id
 * @return {Null}
 */
export const delOrgScenery = ids => {
  return axios.delete(`/orgScenerys/${ids.toString()}`);
};

/**
 * ========================================================================================
 * 企业印象
 */

/**
 * @description 获取企业印象
 * @param {Number} page 页码
 * @param {Number} pageSize 每页多少条
 * @param {Object} obj 自定义搜索
 * @return {Array}
 */
export const getOrgImpressionList = params => {
  return axios.get("/orgImpressions", {
    params
  });
};

/**
 * @description 获取一个企业印象
 * @param {Number} id id
 * @return {Object}
 */
export const getOrgImpression = id => {
  return axios.get(`/orgImpressions/${id}`);
};

/**
 * @description 添加/修改企业印象
 * @param {Number} id id 有就修改没有就添加
 * @param {String} title 标题
 * @param {String} subTitle 副标题
 * @param {String} eventDate 事件日期
 * @param {Number} isPublish 是否发布
 * @param {String} imgPath 图片
 * @return {Null}
 */
export const editOrgImpression = params => {
  return axios.post("/orgImpressions", params);
};

/**
 * @description 发布企业印象
 * @param {Array} ids ids
 * @return {Null}
 */
export const orgImpressionPublish = ids => {
  return axios.get(`/orgImpressions/publish/${ids.toString()}`);
};

/**
 * @description 撤销企业印象
 * @param {Array} ids ids
 * @return {Null}
 */
export const orgImpressionCancel = ids => {
  return axios.delete(`/orgImpressions/publish/${ids.toString()}`);
};

/**
 * @description 删除企业印象
 * @param {Array} ids 企业风光id
 * @return {Null}
 */
export const delOrgImpression = ids => {
  return axios.delete(`/orgImpressions/${ids.toString()}`);
};

/**
 * ========================================================================================
 * 企业成果
 */

 /**
 * @description 获取企业成果
 * @param {Number} page 页码
 * @param {Number} pageSize 每页多少条
 * @param {Object} obj 自定义搜索
 * @return {Array}
 */
export const getOrgAchievementList = params => {
  return axios.get("/orgAchievements", {
    params
  });
};

/**
 * @description 获取一个企业成果
 * @param {Number} id id
 * @return {Object}
 */
export const getOrgAchievement = id => {
  return axios.get(`/orgAchievements/${id}`);
};

/**
 * @description 添加/修改企业成果
 * @param {Number} id id 有就修改没有就添加
 * @param {String} title 标题
 * @param {String} subTitle 副标题
 * @param {String} eventDate 事件日期
 * @param {Number} isPublish 是否发布
 * @param {String} imgPath 图片
 * @return {Null}
 */
export const editOrgAchievement = params => {
  return axios.post("/orgAchievements", params);
};

/**
 * @description 发布企业成果
 * @param {Array} ids ids
 * @return {Null}
 */
export const orgAchievementPublish = ids => {
  return axios.get(`/orgAchievements/publish/${ids.toString()}`);
};

/**
 * @description 撤销企业成果
 * @param {Array} ids ids
 * @return {Null}
 */
export const orgAchievementCancel = ids => {
  return axios.delete(`/orgAchievements/publish/${ids.toString()}`);
};

/**
 * @description 删除企业成果
 * @param {Array} ids 企业成果id
 * @return {Null}
 */
export const delOrgAchievement = ids => {
  return axios.delete(`/orgAchievements/${ids.toString()}`);
};

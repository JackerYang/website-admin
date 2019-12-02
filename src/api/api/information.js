import axios from "../axios";

/**
 * @description 获取信息发布左侧列表
 *
 */
export const getInfoNav = () => {
  return axios.get("/plateInfos/menu");
};

/**
 * @description 获取信息发布
 * @param {Number} page 页码
 * @param {Number} pageSize 每页多少条
 * @param {Object} obj 自定义搜索
 * @return {Array}
 */
export const getInformationList = params => {
  return axios.get("/plateInfos", {
    params
  });
};

/**
 * @description 获取一个信息发布
 * @param {Number} id id
 * @return {Object}
 */
export const getInformation = id => {
  return axios.get(`/plateInfos/${id}`);
};

/**
 * @description 添加/修改信息发布
 * @param {Number} id id 有就修改没有就添加
 * @param {Number} plate 所属板块
 * @param {String} title 标题
 * @param {String} subTitle 副标题
 * @param {String} eventDate 信息日期
 * @param {Number} isPublish 是否发布 0否 1是
 * @param {Number} isTop 是否置顶 0否 1是
 * @param {Number} orgImpression 是否发布到企业印象 0否 1是
 * @param {Number} orgAchievement 是否发布到企业成果 0否 1是
 * @param {String} imgPath 缩略图
 * @return {Null}
 */
export const editInformation = params => {
  return axios.post("/plateInfos", params);
};

/**
 * @description 发布信息发布
 * @param {Array} ids ids
 * @return {Null}
 */
export const informationPublish = ids => {
  return axios.get(`/plateInfos/publish/${ids.toString()}`);
};

/**
 * @description 撤销信息发布
 * @param {Array} ids ids
 * @return {Null}
 */
export const informationCancel = ids => {
  return axios.delete(`/plateInfos/publish/${ids.toString()}`);
};

/**
 * @description 删除信息发布
 * @param {Array} ids 信息发布id
 * @return {Null}
 */
export const delInformation = ids => {
  return axios.delete(`/plateInfos/${ids.toString()}`);
};

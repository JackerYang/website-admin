import axios from "../axios";

/**
 * @description 获取主要成员
 * @param {Object} params 筛选条件
 * @return {Array}
 */
export const getMemberList = params => {
  return axios.get("/primaryMembers", {
    params
  });
};

/**
 * @description 获取主要成员的排序
 * @return {Array}
 */
export const getMemberSortList = () => {
  return axios.get("/primaryMembers/sort");
};

/**
 * @description 获取一个主要成员详情
 * @param {Number} id id
 * @return {Array}
 */
export const getMember = id => {
  return axios.get(`/primaryMembers/${id}`);
};

/**
 * @description 添加或修改主要成员
 * @param {Number} id 有就修改没有就添加
 * @param {String} name 姓名
 * @param {String} birthday 出生日期
 * @param {String} workDate 参加工作日期
 * @param {String} nation 民族
 * @param {String} politicCountenance 政治面貌
 * @param {String} title 职称
 * @param {String} imgPath 头像
 * @return {Null}
 */
export const editMember = params => {
  return axios.post("/primaryMembers", params);
};

/**
 * @description 修改主要成员顺序
 * @param {Array} oldSortList 排序前的数据
 * @param {Array} newSortList 排序后的数据
 * @return {Null}
 */
export const editMemberSort = params => {
  return axios.post("/primaryMembers/sort", params);
};

/**
 * @description 删除主要成员
 * @param {Array} ids 主要成员id
 * @return {Null}
 */
export const delMember = ids => {
  return axios.delete(`/primaryMembers/${ids.toString()}`);
};

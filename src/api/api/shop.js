import axios from "../axios";

/**
 * @description 获取商品分类结构树
 * @param {Number} id id (not required)
 * @return {Array}
 */
export const getShopClassifyTree = id => {
  return axios.get("/productTypes/tree", {
    params: {
      id
    }
  });
};

/**
 * ========================================================================================
 * 商品分类
 */

/**
 * @description 获取商品分类
 * @param {Number} id 左侧树id
 * @param {Number} page 页码
 * @param {Number} pageSize 每页多少条
 * @param {Object} obj 自定义搜索
 * @return {Array}
 */
export const getShopClassifyList = params => {
  return axios.get("/productTypes", {
    params
  });
};

/**
 * @description 获取商品分类排序列表
 * @param {Number} id 左侧数id
 * @return {Array}
 */
export const getShopClassifySortList = id => {
  return axios.get("/productTypes/sort", {
    params: {
      id
    }
  });
};

/**
 * @description 获取一个商品分类
 * @param {Number} id
 * @return {Object}
 */
export const getShopClassify = id => {
  return axios.get(`/productTypes/${id}`);
};

/**
 * @description 添加 / 修改商品分类
 * @param {Number} id id 没有就是添加，有就是修改
 * @param {String} typeName 机构名称
 * @param {Number} pId 上级分类(id)
 * @return {Null}
 */
export const editShopClassify = params => {
  return axios.post("/productTypes", params);
};

/**
 * @description 修改商品分类顺序
 * @param {Array} oldSortList 排序前的数据
 * @param {Array} newSortList 排序后的数据
 * @return {Null}
 */
export const editShopClassifySort = params => {
  return axios.post("/productTypes/sort", params);
};

/**
 * @description 删除商品分类
 * @param {Array} ids 商品分类id
 * @return {Null}
 */
export const delShopClassify = ids => {
  return axios.delete(`/productTypes/${ids.toString()}`);
};

/**
 * ========================================================================================
 * 商品管理
 */

/**
 * @description 获取商品列表
 * @param {Number} page 页码
 * @param {Number} pageSize 每页多少条
 * @param {Object} obj 自定义搜索
 * @return {Array}
 */
export const getShopList = params => {
  return axios.get("/products", {
    params
  });
};

/**
 * @description 根据id数组获取商品
 * @param {Array} ids
 * @return {Array}
 */
export const getShops = ids => {
  return axios.get(`/products/details/${ids}`);
};

/**
 * @description 获取一个商品
 * @param {Number} id id
 * @return {Object}
 */
export const getShop = id => {
  return axios.get(`/products/${id}`);
};

/**
 * @description 添加/修改商品
 * @param {Number} id id 有就修改没有就添加
 * @param {Number} productType 所属分类
 * @param {String} productName 商品名称
 * @param {Number} productPrice 商品价格
 * @param {String} productStock 库存
 * @param {String} remark 商品描述
 * @param {Number} isPublish 是否发布 0否 1是
 * @param {Array} productImgList 多个缩略图
 * @return {Null}
 */
export const editShop = params => {
  return axios.post("/products", params);
};

/**
 * @description 商品批量入库
 * @param {String} productSource 货源
 * @param {Array} productInboundRecordDetailList 商品
 *  @param {Number} productId id
 *  @param {Number} num num
 * @param {String} remark 描述
 * @return {Null}
 */
export const inBoundShop = params => {
  return axios.post("/products/inbound", params);
};

/**
 * @description 发布商品
 * @param {Array} ids ids
 * @return {Null}
 */
export const shopPublish = ids => {
  return axios.get(`/products/publish/${ids.toString()}`);
};

/**
 * @description 撤销商品
 * @param {Array} ids ids
 * @return {Null}
 */
export const shopCancel = ids => {
  return axios.delete(`/products/publish/${ids.toString()}`);
};

/**
 * @description 删除商品
 * @param {Array} ids 商品id
 * @return {Null}
 */
export const delShop = ids => {
  return axios.delete(`/products/${ids.toString()}`);
};

/**
 * ========================================================================================
 * 入库记录
 */

/**
 * @description 获取入库日志列表
 * @param {Number} page
 * @param {Number} pageSize
 * @param {String} createDate 入库时间
 * @param {String} userName 操作人
 * @return {Array}
 */
export const inBoundRecord = params => {
  return axios.get("/productInboundRecords", {
    params
  });
};

/**
 * @description 获取入库日志列表
 * @param {Number} id
 * @return {Array}
 */
export const inBoundRecordDetail = id => {
  return axios.get(`/productInboundRecords/${id}`);
};

/**
 * @description 导出日志管理
 * @return {null}
 */
export const exportInbound = () => {
  let url = `${axios.defaults.baseURL}/products/inbound/excel`;
  return url;
};

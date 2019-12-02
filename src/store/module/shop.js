import { getShopClassifyTree } from "@/api/api";
export default {
  state: {
    // 商品分类数据
    shopClassify: [],

    // 修改商品分类，需要部分限制
    shopClassifyFilter: [],

  },

  getters: {
    // 商品分类数据用于商品
    getShopClassifyForShop: state => {
      let str = JSON.stringify(state.shopClassify)
        .replace(/id/g, "key")
        .replace(/typeName/g, "title");
      return JSON.parse(str);
    },

    // 商品分类数据用于商品的添加时选择上级分类的下拉菜单
    getShopClassifyForSelect: state => {
      let str = JSON.stringify(state.shopClassify)
        .replace(/typeName/g, "label")
        .replace(/id/g, "value");
      return JSON.parse(str);
    },

    // 商品分类数据用于商品的修改时选择上级分类的下拉菜单
    getShopClassifyForSelectFilter: state => {
      let str = JSON.stringify(state.shopClassifyFilter)
        .replace(/typeName/g, "label")
        .replace(/id/g, "value");
      return JSON.parse(str);
    }
  },

  mutations: {
    // 获取商品分类数据
    GET_SHOP_CLASSIFY_TREE: (state, data) => (state.shopClassify = data),
    GET_SHOP_CLASSIFY_TREE_FILTER: (state, data) => (state.shopClassifyFilter = data)
  },

  actions: {
    // 获取商品分类数据
    async getShopClassifyTree({ commit }, id) {
      let res = await getShopClassifyTree(id);
      let data = res.data.data || [];
      id ? commit("GET_SHOP_CLASSIFY_TREE_FILTER", data) : commit("GET_SHOP_CLASSIFY_TREE", data);
    }
  }
};

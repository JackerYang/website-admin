import { getInfoNav } from "@/api/api";

export default {
  state: {
    // 板块列表数据
    plateList: []
  },

  mutations: {
    // 获取结构树数据
    GET_PLATE_LIST: (state, data) => (state.plateList = data)
  },

  actions: {
    // 获取板块列表数据
    async getPlateSortList({ commit }) {
      let res = await getInfoNav();
      commit("GET_PLATE_LIST", res.data.data);
    }
  }
};

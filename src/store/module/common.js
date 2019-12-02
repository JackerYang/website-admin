import { getOrgTree } from "@/api/api";
export default {
  state: {
    // 结构树数据
    orgTree: [],

    // 修改时的结构树，需要部分限制
    orgTreeFilter: [],

    // 当前自定义搜索数据
    searchFilter: [],

    // 所有搜索条件
    filterCondition: {
      page: 1,
      pageSize: 10,
      id: null
    },

    // 预览详情
    visible: false,
    detail: {}
  },

  getters: {
    // 结构树数据用于组织结构
    getOrgTreeForOrg: state => {
      let str = JSON.stringify(state.orgTree)
        .replace(/id/g, "key")
        .replace(/orgName/g, "title");
      return JSON.parse(str);
    },

    // 结构树数据用于组织结构的添加时选择上级机构的下拉菜单
    getOrgTreeForSelect: state => {
      let str = JSON.stringify(state.orgTree)
        .replace(/orgName/g, "label")
        .replace(/id/g, "value");
      return JSON.parse(str);
    },

    // 结构树数据用于组织结构的修改时选择上级机构的下拉菜单
    getOrgTreeForSelectFilter: state => {
      let str = JSON.stringify(state.orgTreeFilter)
        .replace(/orgName/g, "label")
        .replace(/id/g, "value");
      return JSON.parse(str);
    }
  },

  mutations: {
    // 获取结构树数据
    GET_ORG_TREE: (state, data) => (state.orgTree = data),
    GET_ORG_TREE_FILTER: (state, data) => (state.orgTreeFilter = data),

    // 修改当前搜索数据
    CHANGE_SEARCH_FILTER: (state, data) => (state.searchFilter = data),

    // 所有查询条件改变
    CHANGE_FILTER_CONDITION: (state, data) => (state.filterCondition = data),

    SET_VISIBLE: (state, data) => (state.visible = data),
    SET_DETAIL: (state, data) => (state.detail = data)
  },

  actions: {
    // 获取结构树数据
    async getOrgTree({ commit }, id) {
      let res = await getOrgTree(id);
      let data = res.data.data || [];
      id ? commit("GET_ORG_TREE_FILTER", data) : commit("GET_ORG_TREE", data);
    }
  }
};

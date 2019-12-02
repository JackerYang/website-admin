import { getMenuByRoutes } from "@/libs/util";
import routes from "@/router/routes";

export default {
  state: {},

  getters: {
    menuList: () => getMenuByRoutes(routes[1].children)
  },

  mutations: {},

  actions: {}
};

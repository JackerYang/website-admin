import Vue from "vue";
import Vuex from "vuex";

import app from "./module/app";
import common from "./module/common";
import information from "./module/information";
import shop from "./module/shop";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    common,
    information,
    shop
  }
});

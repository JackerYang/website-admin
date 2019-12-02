import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import antd from "./assets/js/antd";
import plugin from "./assets/js/directive";
import moment from "moment";

Vue.prototype.$moment = moment;

Vue.use(antd);
Vue.use(plugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

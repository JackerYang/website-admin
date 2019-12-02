import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";
//引入nprogress
import NProgress from "../assets/js/nprogress";
import { getToken } from "../libs/token";

Vue.use(Router);

const router = new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 跳转前
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    // 已登录
    if (to.name === "login") {
      router.push({ name: "home" });
    } else {
      next();
    }
  } else {
    // 未登录
    if (to.name === "login") {
      next();
    } else {
      router.push({ name: "login" });
    }
  }
});

// 跳转后
router.afterEach(() => {
  NProgress.done();
});

export default router;

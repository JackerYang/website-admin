<template>
  <div class="to-website" @click="goWebsite">
    <a-tooltip placement="bottom">
      <template slot="title">前往官方网站</template>
      <a-icon type="link" />
      <span>官网网站</span>
    </a-tooltip>
  </div>
</template>

<script>
const { website_port } = require("../../../config");
import { on, off } from "@/libs/tools";
import { getToken } from "@/libs/token";
import { isIp } from "@/libs/util";
export default {
  name: "to-website",
  methods: {
    goWebsite() {
      const host = window.location.hostname;
      // 官网地址
      let website_url = "";
      if (host.indexOf("localhost") > -1 || isIp(host)) {
        website_url = `http://${host}:${website_port}`;
      } else {
        website_url = `http://${host}`;
      }
      let website_url_token = `${website_url}?token=${getToken()}`;
      window.open(website_url_token, "website");
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/common.less";
.to-website {
  margin: 0 20px;
  cursor: pointer;
  height: 24px;
  line-height: 20px;
  border-radius: 12px;
  padding: 2px 15px;
  background: rgba(143, 150, 211, 0.2);
  transition: @Animation;
  span {
    margin-left: 5px;
  }
  &:hover {
    color: @mainColor;
    background: rgba(153, 204, 252, 0.2);
  }
}
</style>

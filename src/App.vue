<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>
  </div>
</template>

<script>
const { website_port } = require("../config");
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import { on, off } from "@/libs/tools";
import { isIp } from "@/libs/util";
import { setToken } from "@/libs/token";
export default {
  name: "App",
  data() {
    return {
      locale: zhCN
    };
  },
  beforeCreate() {
    const { search, origin, pathname } = window.location;
    // 路径中包含token
    if (search.indexOf("token") > -1) {
      let token = search.split("token=")[1];
      setToken(token);
      window.location.href = origin + pathname;
    }
  }
};
</script>

<style lang="less">
@import "./assets/less/reset.less";

// 表格超出打点
table {
  table-layout: fixed; /* 只有定义了表格的布局算法为fixed，下面td的定义才能起作用。 */
  td,
  th div {
    width: 100%;
    word-break: keep-all; /* 不换行 */
    white-space: nowrap; /* 不换行 */
    overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
}

// 富文本样式
.neditor {
  width: 100%;
  height: 100%;
  & > div {
    height: 100%;
    & > div {
      height: 100%;
      display: flex;
      flex-direction: column;
      .edui-editor-toolbarbox {
        height: auto;
      }
      .edui-editor-iframeholder {
        flex: 1;
      }
      .edui-editor-bottomContainer {
        height: 23px;
      }
    }
  }
}
</style>

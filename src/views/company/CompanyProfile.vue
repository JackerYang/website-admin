<template>
  <div class="company-profile">
    <fn-template title="公司简介" cancelText="预览" @on-save="save" @on-cancel="preview">
      <div class="profile neditor">
        <vue-neditor-wrap v-model="content" @ready="ready" :config="myConfig"></vue-neditor-wrap>
      </div>
    </fn-template>
  </div>
</template>

<script>
const { api, prod_build_url } = require("../../../config");
import VueNeditorWrap from "vue-neditor-wrap";
import FnTemplate from "@/components/common/FnTemplate.vue";
import { getOrgProfile, editOrgProfile } from "@/api/api";
export default {
  name: "company-profile",
  components: {
    FnTemplate,
    VueNeditorWrap
  },
  data() {
    return {
      content: "",
      id: 0,

      editor: "",
      myConfig: {
        // 如果需要上传功能,找后端小伙伴要服务器接口地址
        serverUrl: api + "/api/image/upload",
        // 你的UEditor资源存放的路径,相对于打包后的index.html
        UEDITOR_HOME_URL: prod_build_url + "NEditor/",
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 关闭自动保存
        enableAutoSave: false
      }
    };
  },
  methods: {
    save() {
      editOrgProfile({
        content: this.content,
        id: this.id
      }).then(res => {
        if (res.data.res) {
          this.$Message.success(res.data.msg);
        }
      });
    },

    preview() {
      this.editor.execCommand("preview");
    },

    ready(e) {
      this.editor = e;
      getOrgProfile().then(res => {
        if (res.data.res) {
          this.content = res.data.data.content;
          this.id = res.data.data.id;
        }
      });
    }
  }
};
</script>

<style lang="less">
.company-profile {
  width: 100%;
  height: 100%;
  .profile {
    width: 100%;
    height: 100%;
  }
}
.show {
  & /deep/ img {
    max-width: 100%;
  }
}
</style>

<template>
  <div class="org-tree">
    <a-tree :treeData="treeData" @select="onSelect" defaultExpandAll></a-tree>
  </div>
</template>

<script>
import { hasOf } from "@/libs/util";
export default {
  name: "org-tree",
  computed: {
    treeData() {
      return this.$store.getters.getOrgTreeForOrg;
    }
  },
  methods: {
    onSelect(selectedKeys) {
      if (selectedKeys) {
        this.init(selectedKeys[0]);
      } else {
        this.init();
      }

      if (hasOf(this.$route.path, "organization")) {
        this.$router.push({
          name: "organization-index"
        });
      } else if (hasOf(this.$route.path, "user")) {
        this.$router.push({
          name: "user-index"
        });
      }
    },
    // 初始化
    init(id) {
      // 所有条件重置
      this.$store.commit("CHANGE_FILTER_CONDITION", {
        page: 1,
        pageSize: 10,
        id: id || null
      });
      // 自定义过滤条件为空
      this.$store.commit("CHANGE_SEARCH_FILTER", []);
    }
  },
  created() {
    // 获取结构树数据
    this.$store.dispatch("getOrgTree");

    this.init();
  }
};
</script>

<style lang="less" scoped>
.org-tree {
  width: 100%;
  height: 100%;
  padding: 15px;
  overflow-y: auto;
}
</style>
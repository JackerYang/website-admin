<template>
  <div class="classify-tree">
    <a-tree :treeData="treeData" @select="onSelect" defaultExpandAll></a-tree>
  </div>
</template>

<script>
import { hasOf } from "@/libs/util";
export default {
  name: "classify-tree",
  computed: {
    treeData() {
      return this.$store.getters.getShopClassifyForShop;
    }
  },
  methods: {
    onSelect(selectedKeys) {
      if (selectedKeys) {
        this.init(selectedKeys[0]);
      } else {
        this.init();
      }

      if (hasOf(this.$route.path, "classify")) {
        this.$router.push({
          name: "shop-classify"
        });
      } else if (hasOf(this.$route.path, "management")) {
        this.$router.push({
          name: "shop-management"
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
    this.$store.dispatch("getShopClassifyTree");

    this.init();
  }
};
</script>

<style lang="less" scoped>
.classify-tree {
  width: 100%;
  height: 100%;
  padding: 15px;
  overflow-y: auto;
}
</style>
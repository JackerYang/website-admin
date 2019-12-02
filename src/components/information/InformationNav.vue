<template>
  <div class="information-nav">
    <a-menu style="width: 220px" v-model="selectedKeys" mode="vertical" @click="handleClick">
      <a-menu-item v-for="nav in navs" :key="nav.id">{{ nav.plateName }}</a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: "information-nav",
  computed: {
    navs() {
      return this.$store.state.information.plateList;
    }
  },
  data() {
    return {
      selectedKeys: []
    };
  },
  methods: {
    handleClick({ key }) {
      if (key === this.selectedKeys[0]) {
        this.selectedKeys = [];
        this.init();
      } else {
        this.init(key);
      }
      this.$router.push({
        name: "information-index"
      });
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
    this.$store.dispatch("getPlateSortList");

    this.init();
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/common.less";
.information-nav {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
  background: #fff;
  box-shadow: @shadow;
  .ant-menu {
    border: 0 none;
  }
}
</style>
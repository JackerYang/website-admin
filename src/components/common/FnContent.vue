<template>
  <div class="fn-content">
    <div class="head">
      <!-- 栏目名称 -->
      <div class="title">{{ title }}</div>
      <!-- 工具条 -->
      <div class="tools" v-elLtWidth="ltWidth">
        <!-- 搜索 -->
        <search-filter :searchList="searchList" @handleSearch="handleSearch"></search-filter>

        <!-- btnList -->
        <tool-button :isNormal="isNormal" :selectedRowKeys="selectedRowKeys" :btnList="btnList"></tool-button>
      </div>
    </div>
    <div class="line">
      <!-- 分割线 -->
    </div>
    <!-- 内容 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import SearchFilter from "@/components/common/SearchFilter.vue";
import ToolButton from "@/components/common/ToolButton.vue";
export default {
  name: "fn-content",
  components: {
    SearchFilter,
    ToolButton
  },
  props: {
    // 名称
    title: {
      type: String,
      required: true
    },
    // 搜索列表
    searchList: {
      type: Array,
      default: () => []
    },
    // 按钮列表
    btnList: {
      type: Array,
      default: () => []
    },
    // 已选列表
    selectedRowKeys: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 操作按钮显示状态
      isNormal: true
    };
  },
  methods: {
    // 搜索
    handleSearch(item) {
      let req = {};
      item.forEach(v => {
        req[v.value] = v.searchVal;
      });
      this.$emit("handleSearch", req);
    },
    // 控制操作按钮显示方式
    ltWidth(data) {
      let elWidth = parseInt(data.width);
      let needWidth = this.btnList.length * 82 + 216;
      if (elWidth >= needWidth) {
        this.isNormal = true;
      } else {
        this.isNormal = false;
      }
    }
  }
};
</script>

<style lang="less">
@import "../../assets/less/common.less";
.fn-content {
  width: 100%;
  height: 100%;
  padding: 15px;
  background: #fff;
  box-shadow: @shadow;
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 16px;
      font-weight: bold;
      white-space: nowrap;
    }
    .tools {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
      .show {
        .ant-select {
          width: 150px;
        }
        .ant-input {
          width: 150px;
          margin-left: 15px;
        }
        .ant-btn {
          margin-left: 15px;
        }
      }
    }
  }
  .line {
    width: 100%;
    height: 1px;
    background: #999;
    margin: 15px 0;
    box-shadow: @shadow;
  }
  .content {
    width: 100%;
    height: ~"calc(100% - 62px)";
    overflow-y: auto;
  }
}
</style>
<template>
  <div class="statistics-layout">
    <div class="head">
      <!-- 栏目名称 -->
      <div class="title">{{ title }}</div>
      <!-- 工具条 -->
      <div class="tools">
        <!-- 搜索 -->
        <a-select
          v-model="year"
          placeholder="请选择日期"
          showSearch
          optionFilterProp="value"
        >
          <a-select-option v-for="year in years" :key="year">{{ year }}</a-select-option>
        </a-select>
        <!-- 按钮 -->
        <a-button type="primary" icon="search" @click="search">查询</a-button>

        <a-button icon="upload" @click="exportExcel">导出</a-button>
      </div>
    </div>
    <div class="line">
      <!-- 分割线 -->
    </div>
    <!-- 表格 -->
    <div class="main">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { generateContinuousArray } from "@/libs/util";
export default {
  name: "statistics-layout",
  props: {
    // 名称
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    years() {
      return generateContinuousArray(2018, new Date().getFullYear()).reverse();
    }
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  },
  methods: {
    // 搜索
    search() {
      this.$emit("selectChange", {
        year: this.year
      });
    },

    // 导出
    exportExcel() {
      this.$emit("exportExcel", {
        year: this.year
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/common.less";
.statistics-layout {
  width: 100%;
  height: 100%;
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    .tools {
      display: flex;
      align-items: center;
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
  .line {
    width: 100%;
    height: 1px;
    background: #999;
    margin: 15px 0;
    box-shadow: @shadow;
  }
  .main {
    width: 100%;
    height: ~"calc(100% - 62px)";
    overflow-y: auto;
  }
}
</style>

<template>
  <div class="fn-table">
    <div class="head">
      <!-- 栏目名称 -->
      <div class="title">{{ title }}</div>
      <!-- 工具条 -->
      <div class="tools" v-elLtWidth="ltWidth">
        <!-- 搜索 -->
        <search-filter ref="search-filter" :searchList="searchList" @handleSearch="handleSearch"></search-filter>

        <!-- btnList -->
        <tool-button
          :isNormal="isNormal"
          :selectedRows="selectedRows"
          :selectedRowKeys="selectedRowKeys"
          :btnList="btnList"
        ></tool-button>
      </div>
    </div>
    <div class="line">
      <!-- 分割线 -->
    </div>
    <!-- 表格 -->
    <div class="table">
      <a-table
        bordered
        :rowKey="record => record.id"
        :rowSelection="rowSelection"
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        :customRow="setRow"
      >
        <!-- 商品入库详情 -->
        <template slot="viewShopRecordDetail" slot-scope="text, record">
          <a-button
            size="small"
            @click="$router.push({name: 'shop-record-detail', params: {id: record.id}})"
          >查看详情</a-button>
        </template>
        <!-- 日志详情 -->
        <template slot="viewLogDetail" slot-scope="text, record">
          <a-button
            size="small"
            @click="$router.push({name: 'log-detail', params: {id: record.id}})"
          >查看详情</a-button>
        </template>

        <!-- 预览详情 -->
        <template slot="viewDetail" slot-scope="text, record">
          <a-button size="small" @click.stop="viewDetail(record)">查看详情</a-button>
        </template>

        <slot></slot>
      </a-table>
    </div>
  </div>
</template>

<script>
import SearchFilter from "@/components/common/SearchFilter.vue";
import ToolButton from "@/components/common/ToolButton.vue";
export default {
  name: "fn-table",
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
    // 列
    columns: {
      type: Array,
      required: true
    },
    // 数据
    data: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      default: 0
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
    openSelectedRowKeys: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    filterCondition() {
      return this.$store.state.common.filterCondition;
    },
    page() {
      return this.filterCondition.page;
    },
    id() {
      return this.filterCondition.id;
    },
    rowSelection() {
      if (this.openSelectedRowKeys) {
        return {
          selectedRowKeys: this.selectedRowKeys,
          onChange: ($event, e) => {
            this.selectedRowKeys = $event;
            this.selectedRows = e;
          }
        };
      } else {
        return null;
      }
    }
  },
  data() {
    return {
      // 选中的行
      selectedRowKeys: [],
      selectedRows: [],
      // 分页
      pagination: {
        showSizeChanger: true,
        pageSize: 10,
        onChange: this.onChange,
        onShowSizeChange: this.onShowSizeChange,
        total: this.total,
        current: 1,
        showTotal: (total, range) =>
          `显示 ${total} 条中的 ${range[0]} - ${range[1]} 条`
      },

      // 筛选条件
      req: {},
      // 操作按钮显示状态
      isNormal: true
    };
  },
  watch: {
    id() {
      this.idChange(this.id);
    },
    total() {
      this.pagination.total = this.total;
    },
    page() {
      this.pagination.current = this.page;
    },
    data() {
      this.selectedRowKeys = [];
      this.selectedRows = [];
    }
  },
  methods: {
    // 改变id
    idChange(id) {
      this.pagination.current = 1;
      this.pagination.pageSize = 10;
      this.$refs["search-filter"].reset(true);

      let obj = {
        page: this.pagination.current,
        pageSize: this.pagination.pageSize,
        id
      };
      this.$store.commit("CHANGE_FILTER_CONDITION", obj);
      this.$emit("pageChange");
    },
    // 搜索
    handleSearch(item) {
      this.pagination.current = 1;
      this.pagination.pageSize = 10;
      this.selectedRowKeys = [];
      this.selectedRows = [];

      this.req = {};
      item.forEach(v => {
        if (v.searchVal || v.searchVal === 0) {
          this.req[v.value] = v.searchVal;
        }
      });

      let obj = {
        page: this.pagination.current,
        pageSize: this.pagination.pageSize,
        ...this.req,
        id: this.id
      };
      this.$store.commit("CHANGE_FILTER_CONDITION", obj);
      this.$emit("pageChange");
    },
    // 改变page
    onChange(page, pageSize) {
      this.selectedRowKeys = [];
      this.selectedRows = [];

      let obj = {
        page,
        pageSize,
        ...this.req,
        id: this.id
      };
      this.$store.commit("CHANGE_FILTER_CONDITION", obj);
      this.$emit("pageChange");
    },
    // 改变pageSize
    onShowSizeChange(page, pageSize) {
      this.pagination.pageSize = pageSize;
      this.selectedRowKeys = [];
      this.selectedRows = [];

      let obj = {
        page: 1,
        pageSize,
        ...this.req,
        id: this.id
      };
      this.$store.commit("CHANGE_FILTER_CONDITION", obj);
      this.$emit("pageChange");
    },

    // 控制操作按钮显示方式
    ltWidth(data) {
      if (!this.btnList || !this.btnList.length) return false;
      let elWidth = parseInt(data.width);
      let needWidth = this.btnList.length * 82 + 216;
      if (elWidth >= needWidth) {
        this.isNormal = true;
      } else {
        this.isNormal = false;
      }
    },

    // 点击行
    setRow(record) {
      return {
        on: {
          click: () => {
            let flag = false;
            let keys = [];
            if (!this.rowSelection) return;
            keys = this.rowSelection.selectedRowKeys;
            if (keys.indexOf(record.id) >= 0) {
              flag = true;
            }
            if (flag) {
              keys.splice(keys.findIndex(item => item === record.id), 1);
            } else {
              keys.push(record.id);
            }
          }
        }
      };
    },

    viewDetail(item) {
      this.$store.commit("SET_DETAIL", item);
      this.$store.commit("SET_VISIBLE", true);
    }
  },
  created() {
    this.pagination.pageSize = this.filterCondition.pageSize;
    this.pagination.current = this.page;
  }
};
</script>

<style lang="less">
@import "../../assets/less/common.less";
.fn-table {
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
  .table {
    width: 100%;
    height: ~"calc(100% - 62px)";
    overflow-y: auto;
    .ant-table-wrapper {
      height: 100%;
      .ant-spin-nested-loading {
        min-height: 600px;
        .ant-spin-container {
          min-height: 600px;
          .ant-table {
            min-height: 600px;
            .ant-table-content {
              height: 100%;
              .ant-table-body {
                tr {
                  height: 53px;
                  td {
                    padding: 0 16px;
                    img {
                      height: 40px;
                      margin: 5px 0;
                      vertical-align: top;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
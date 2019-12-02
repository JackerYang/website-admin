<template>
  <div class="log">
    <fn-table
      title="日志管理"
      :columns="columns"
      :data="tableData"
      :searchList="searchList"
      :btnList="btnList"
      :total="total"
      :openSelectedRowKeys="false"
      @pageChange="pageChange"
    ></fn-table>
  </div>
</template>

<script>
import FnTable from "@/components/common/FnTable.vue";
import { getLog, exportLog } from "@/api/api";
import { downloadFile } from "@/libs/util";
export default {
  name: "log",
  components: {
    FnTable
  },
  computed: {
    // 所有过滤条件
    filterCondition() {
      return this.$store.state.common.filterCondition;
    }
  },
  data() {
    return {
      // 表格列
      columns: [
        {
          title: "操作人",
          dataIndex: "userName"
        },
        {
          title: "操作类型",
          dataIndex: "logType"
        },
        {
          title: "操作结果",
          dataIndex: "_logResult"
        },
        {
          title: "操作时间",
          dataIndex: "createDate"
        },
        {
          title: "操作内容",
          dataIndex: "content"
        },
        {
          title: "查看详情",
          dataIndex: "viewDetail",
          scopedSlots: { customRender: "viewLogDetail" },
          align: "center",
          minWidth: 120
        }
      ],
      // 表格数据
      tableData: [],
      total: 0,
      // 搜索列表
      searchList: [
        {
          label: "操作人",
          value: "userName",
          key: "input"
        },
        {
          label: "操作类型",
          value: "logType",
          key: "input"
        },
        {
          label: "操作结果",
          value: "logResult",
          key: "select",
          options: [
            {
              label: "成功",
              value: 1
            },
            {
              label: "失败",
              value: 0
            }
          ]
        }
      ],
      // 按钮列表
      btnList: [
        {
          label: "导出",
          type: "default",
          icon: "upload",
          ghost: false,
          condition: 0,
          fn: this.export
        }
      ]
    };
  },
  methods: {
    // 导出
    export() {
      exportLog;
      this.$confirm({
        title: "导出确认",
        content: `确定导出所有的操作日志？`,
        onOk: () => {
          return new Promise(resolve => {
            downloadFile(exportLog());
            resolve(true);
            this.$Message.success("导出成功！");
          });
        }
      });
    },

    // page改变 || pageSize改变 || 搜索
    pageChange() {
      this.getData(this.filterCondition);
    },

    // 获取数据
    getData(params) {
      getLog(params).then(res => {
        if (res.data.res) {
          this.total = res.data.data.total;
          this.tableData = res.data.data.list.map(item => {
            item._logResult = item.logResult === 1 ? "成功" : "失败";
            return item;
          });
        }
      });
    }
  },
  created() {
    this.getData(this.filterCondition);
  }
};
</script>

<style lang="less" scoped>
.log {
  width: 100%;
  height: 100%;
}
</style>

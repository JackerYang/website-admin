<template>
  <div class="shop-record-index">
    <fn-table
      title="入库管理"
      :columns="columns"
      :data="tableData"
      :searchList="searchList"
      :total="total"
      :btnList="btnList"
      :openSelectedRowKeys="false"
      @pageChange="pageChange"
    ></fn-table>
  </div>
</template>

<script>
import FnTable from "@/components/common/FnTable.vue";
import { inBoundRecord, inBoundRecordDetail, exportInbound } from "@/api/api";
import { downloadFile } from "@/libs/util";
export default {
  name: "shop-record-index",
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
          title: "货源",
          dataIndex: "productSource"
        },
        {
          title: "备注",
          dataIndex: "remark"
        },
        {
          title: "入库商品种类",
          dataIndex: "productCount",
          customRender: text => `${text} 种`
        },
        {
          title: "操作人",
          dataIndex: "userName"
        },
        {
          title: "入库时间",
          dataIndex: "createDate"
        },
        {
          title: "查看详情",
          dataIndex: "viewDetail",
          scopedSlots: { customRender: "viewShopRecordDetail" },
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
          label: "日期",
          value: "createDate",
          key: "time",
          option: {
            type: "date",
            showTime: false
          }
        }
      ],

      // 按钮列表
      btnList: [
        {
          label: "入库",
          type: "default",
          icon: "inbox",
          ghost: false,
          condition: 0,
          fn: this.inbound
        },
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
      this.$confirm({
        title: "导出确认",
        content: `确定导出所有的入库日志？`,
        onOk: () => {
          return new Promise(resolve => {
            downloadFile(exportInbound());
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
      inBoundRecord(params).then(res => {
        if (res.data.res) {
          this.total = res.data.data.total;
          this.tableData = res.data.data.list.map(item => {
            item._logResult = item.logResult === 1 ? "成功" : "失败";
            return item;
          });
        }
      });
    },

    // 入库
    inbound(selectedRowKeys) {
      this.$router.push({
        name: "shop-record-storage"
      });
    }
  },
  created() {
    this.getData(this.filterCondition);
  }
};
</script>

<style lang="less" scoped>
.shop-record-index {
  width: 100%;
  height: 100%;
}
</style>
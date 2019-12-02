<template>
  <div class="organization-index">
    <fn-table
      title="组织机构"
      :columns="columns"
      :data="tableData"
      :total="total"
      :searchList="searchList"
      :btnList="btnList"
      @pageChange="pageChange"
    ></fn-table>
  </div>
</template>

<script>
import FnTable from "@/components/common/FnTable.vue";
import { getOrgList, delOrg } from "@/api/api";
export default {
  name: "organization-index",
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
          title: "机构名称",
          dataIndex: "orgName"
        },
        {
          title: "上级机构",
          dataIndex: "pName"
        },
        {
          title: "机构简介",
          dataIndex: "remark"
        }
      ],
      // 表格数据
      tableData: [],
      total: 0,
      // 搜索列表
      searchList: [
        {
          label: "机构名称",
          value: "orgName",
          key: "input"
        }
      ],
      // 按钮列表
      btnList: [
        {
          label: "新建",
          type: "default",
          icon: "plus",
          ghost: false,
          condition: 0,
          fn: this.add
        },
        {
          label: "编辑",
          type: "default",
          icon: "edit",
          ghost: false,
          condition: 1,
          fn: this.edit
        },
        {
          label: "删除",
          type: "danger",
          icon: "delete",
          ghost: false,
          condition: 2,
          fn: this.del
        },
        {
          label: "排序",
          type: "default",
          icon: "sort-ascending",
          ghost: false,
          condition: 0,
          fn: this.sort
        }
      ]
    };
  },
  methods: {
    // page改变 || pageSize改变 || 搜索
    pageChange() {
      this.getData(this.filterCondition);
    },

    // 获取数据
    getData(params) {
      getOrgList(params).then(res => {
        if (res.data.res) {
          this.total = res.data.data.total;
          this.tableData = res.data.data.list;
        }
      });
    },

    // 添加 || 编辑 || 删除 || 排序
    add() {
      this.$router.push({
        name: "organization-add"
      });
    },
    edit(selectedRowKeys) {
      this.$router.push({
        name: "organization-edit",
        params: {
          id: selectedRowKeys[0]
        }
      });
    },
    del(selectedRowKeys) {
      this.$confirm({
        title: "确定删除？",
        content: (
          <p>
            确定删除当前选中的
            <span style="color: #f00;">{selectedRowKeys.length}</span>
            个组织机构？
          </p>
        ),
        onOk: () => {
          return new Promise(resolve => {
            delOrg(selectedRowKeys).then(res => {
              if (res.data.res) {
                this.$Message.success(res.data.msg);
                // 刷新列表
                this.$store.commit("CHANGE_FILTER_CONDITION", {
                  ...this.filterCondition,
                  page: 1
                });
                this.getData(this.filterCondition);
                // 刷新左侧树
                this.$store.dispatch("getOrgTree");
              }
              resolve();
            });
          });
        }
      });
    },
    sort() {
      this.$router.push({
        name: "organization-sort"
      });
    }
  },
  created() {
    this.getData(this.filterCondition);
  }
};
</script>

<style lang="less">
.organization-index {
  width: 100%;
  height: 100%;
}
</style>

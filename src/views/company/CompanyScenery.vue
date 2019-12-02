<template>
  <div class="company-scenery">
    <fn-table
      title="企业风光"
      :columns="columns"
      :data="tableData"
      :searchList="searchList"
      :btnList="btnList"
      @pageChange="pageChange"
    ></fn-table>
  </div>
</template>

<script>
import FnTable from "@/components/common/FnTable.vue";
import { getOrgSceneryList, delOrgScenery } from "@/api/api";
export default {
  name: "company-scenery",
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
          title: "标题",
          dataIndex: "title"
        },
        {
          title: "缩略图",
          dataIndex: "imgPath",
          customRender: record => <img src={record} />
        }
      ],
      // 表格数据
      tableData: [],
      total: 0,
      // 搜索列表
      searchList: [
        {
          label: "标题",
          value: "title",
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
      getOrgSceneryList(params).then(res => {
        if (res.data.res) {
          this.total = res.data.data.total;
          this.tableData = res.data.data.list;
        }
      });
    },

    // 添加 || 编辑 || 删除 || 排序
    add() {
      this.$router.push({
        name: "company-scenery-add"
      });
    },
    edit(selectedRowKeys) {
      this.$router.push({
        name: "company-scenery-edit",
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
            条企业风光？
          </p>
        ),
        onOk: () => {
          return new Promise(resolve => {
            delOrgScenery(selectedRowKeys).then(res => {
              if (res.data.res) {
                this.$Message.success(res.data.msg);
                // 刷新列表
                this.$store.commit("CHANGE_FILTER_CONDITION", {
                  ...this.filterCondition,
                  page: 1
                });
                this.getData(this.filterCondition);
              }
              resolve();
            });
          });
        }
      });
    },
    sort() {
      this.$router.push({
        name: "company-scenery-sort"
      });
    }
  },
  created() {
    this.getData(this.filterCondition);
  }
};
</script>

<style lang="less" scoped>
.company-scenery {
  width: 100%;
  height: 100%;
}
</style>

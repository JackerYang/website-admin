<template>
  <div class="shop-classify-index">
    <fn-table
      title="分类管理"
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
import { getShopClassifyList, delShopClassify } from "@/api/api";
export default {
  name: "shop-classify-index",
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
          title: "分类名称",
          dataIndex: "typeName"
        },
        {
          title: "上级分类",
          dataIndex: "pName"
        }
      ],
      // 表格数据
      tableData: [],
      total: 0,
      // 搜索列表
      searchList: [
        {
          label: "分类名称",
          value: "typeName",
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
      getShopClassifyList(params).then(res => {
        if (res.data.res) {
          this.total = res.data.data.total;
          this.tableData = res.data.data.list;
        }
      });
    },

    // 添加 || 编辑 || 删除 || 排序
    add() {
      this.$router.push({
        name: "shop-classify-add"
      });
    },
    edit(selectedRowKeys) {
      this.$router.push({
        name: "shop-classify-edit",
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
            个商品分类？
          </p>
        ),
        onOk: () => {
          return new Promise(resolve => {
            delShopClassify(selectedRowKeys).then(res => {
              if (res.data.res) {
                this.$Message.success(res.data.msg);
                // 刷新列表
                this.$store.commit("CHANGE_FILTER_CONDITION", {
                  ...this.filterCondition,
                  page: 1
                });
                this.getData(this.filterCondition);
                // 刷新左侧树
                this.$store.dispatch("getShopClassifyTree");
              }
              resolve();
            });
          });
        }
      });
    },
    sort() {
      this.$router.push({
        name: "shop-classify-sort"
      });
    }
  },
  created() {
    this.getData(this.filterCondition);
  }
};
</script>

<style lang="less">
.shop-classify-index {
  width: 100%;
  height: 100%;
}
</style>

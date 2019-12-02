<template>
  <div class="plate">
    <fn-table
      title="板块管理"
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
import { getPlateList, delPlate, platePublish, plateCancel } from "@/api/api";
export default {
  name: "plate",
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
          title: "板块名称",
          dataIndex: "plateName"
        },
        {
          title: "图标",
          dataIndex: "plateIcon",
          customRender: record => <img src={record} />
        },
        {
          title: "状态",
          dataIndex: "_isUse"
        }
      ],
      // 表格数据
      tableData: [],
      // 搜索列表
      searchList: [
        {
          label: "板块名称",
          value: "plateName",
          key: "input"
        },
        {
          label: "是否启用",
          value: "isUse",
          key: "select",
          options: [
            {
              label: "已启用",
              value: 1
            },
            {
              label: "未启用",
              value: 0
            }
          ]
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
        },
        {
          label: "启用",
          type: "default",
          icon: "notification",
          ghost: false,
          condition: 2,
          fn: this.publish
        },
        {
          label: "撤销",
          type: "default",
          icon: "rollback",
          ghost: false,
          condition: 2,
          fn: this.cancel
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
      getPlateList(params).then(res => {
        if (res.data.res) {
          this.total = res.data.data.total;
          this.tableData = res.data.data.list.map(item => {
            item._isUse = item.isUse ? "已启用" : "未启用";
            return item;
          });
        }
      });
    },

    // 添加 || 编辑 || 删除 || 排序 || 发布 || 撤销
    add() {
      this.$router.push({
        name: "plate-add"
      });
    },
    edit(selectedRowKeys) {
      this.$router.push({
        name: "plate-edit",
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
            个板块？
          </p>
        ),
        onOk: () => {
          return new Promise(resolve => {
            delPlate(selectedRowKeys).then(res => {
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
        name: "plate-sort"
      });
    },
    publish(selectedRowKeys, selectedRows) {
      let len = selectedRowKeys.length;
      let cancelItems = selectedRows.filter(i => i.isUse === 0);
      let ids = cancelItems.map(i => i.id);
      let cancelLen = cancelItems.length;
      if (cancelLen) {
        this.$confirm({
          title: "确定启用？",
          content: (
            <div>
              <p>
                当前选中了{len}个板块，其中未启用数量为{cancelLen}
                个，确定启用这{cancelLen}个板块？
              </p>
              <p style="color: #999;">已启用的板块不受影响</p>
            </div>
          ),
          onOk: () => {
            return new Promise(resolve => {
              platePublish(ids).then(res => {
                if (res.data.res) {
                  this.$Message.success(res.data.msg);
                  // 刷新列表
                  this.getData(this.filterCondition);
                }
                resolve();
              });
            });
          }
        });
      } else {
        this.$info({
          title: "无可启用的板块",
          okText: "确定",
          content: (
            <div>
              <p>
                当前选中了{len}
                个板块，其中未启用数量为0个，无需执行启用操作！
              </p>
              <p style="color: #999;">无可启用的板块</p>
            </div>
          )
        });
      }
    },
    cancel(selectedRowKeys, selectedRows) {
      let len = selectedRowKeys.length;
      let publishItems = selectedRows.filter(i => i.isUse === 1);
      let ids = publishItems.map(i => i.id);
      let publishLen = publishItems.length;
      if (publishLen) {
        this.$confirm({
          title: "确定撤销？",
          content: (
            <div>
              <p>
                当前选中了{len}个板块，其中已启用数量为{publishLen}
                个，确定撤销这{publishLen}个板块？
              </p>
              <p style="color: #999;">未启用的板块不受影响</p>
            </div>
          ),
          onOk: () => {
            return new Promise(resolve => {
              plateCancel(ids).then(res => {
                if (res.data.res) {
                  this.$Message.success(res.data.msg);
                  // 刷新列表
                  this.getData(this.filterCondition);
                }
                resolve();
              });
            });
          }
        });
      } else {
        this.$info({
          title: "无可撤销的板块",
          okText: "确定",
          content: (
            <div>
              <p>
                当前选中了{len}
                个板块，其中已启用数量为0个，无需执行撤销操作！
              </p>
              <p style="color: #999;">无可撤销的板块</p>
            </div>
          )
        });
      }
    }
  },
  created() {
    this.getData(this.filterCondition);
  }
};
</script>

<style lang="less" scoped>
.plate {
  width: 100%;
  height: 100%;
}
</style>

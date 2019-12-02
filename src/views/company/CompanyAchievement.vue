<template>
  <div class="company-achievement">
    <fn-table
      title="企业成果"
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
import {
  getOrgAchievementList,
  delOrgAchievement,
  orgAchievementPublish,
  orgAchievementCancel
} from "@/api/api";
export default {
  name: "company-achievement",
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
          title: "事件日期",
          dataIndex: "_eventDate"
        },
        {
          title: "状态",
          dataIndex: "_isPublish"
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
        },
        {
          label: "状态",
          value: "isPublish",
          key: "select",
          options: [
            {
              label: "已发布",
              value: 1
            },
            {
              label: "未发布",
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
          label: "发布",
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
      getOrgAchievementList(params).then(res => {
        if (res.data.res) {
          this.total = res.data.data.total;
          this.tableData = res.data.data.list.map(item => {
            item._eventDate = this.$moment(item.eventDate).format(
              "YYYY年MM月DD日"
            );
            item._isPublish = item.isPublish ? "已发布" : "未发布";
            return item;
          });
        }
      });
    },

    // 添加 || 编辑 || 删除 || 发布 || 撤销
    add() {
      this.$router.push({
        name: "company-achievement-add"
      });
    },
    edit(selectedRowKeys) {
      this.$router.push({
        name: "company-achievement-edit",
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
            条企业成果？
          </p>
        ),
        onOk: () => {
          return new Promise(resolve => {
            delOrgAchievement(selectedRowKeys).then(res => {
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
    publish(selectedRowKeys, selectedRows) {
      let len = selectedRowKeys.length;
      let cancelItems = selectedRows.filter(i => i.isPublish === 0);
      let ids = cancelItems.map(i => i.id);
      let cancelLen = cancelItems.length;
      if (cancelLen) {
        this.$confirm({
          title: "确定发布？",
          content: (
            <div>
              <p>
                当前选中了{len}条企业成果，其中未发布数量为{cancelLen}
                条，确定发布这{cancelLen}条企业成果？
              </p>
              <p style="color: #999;">已发布的企业成果不受影响</p>
            </div>
          ),
          onOk: () => {
            return new Promise(resolve => {
              orgAchievementPublish(ids).then(res => {
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
          title: "无可发布的企业成果",
          okText: "确定",
          content: (
            <div>
              <p>
                当前选中了{len}
                条企业成果，其中未发布数量为0条，无需执行发布操作！
              </p>
              <p style="color: #999;">无可发布的企业成果</p>
            </div>
          )
        });
      }
    },
    cancel(selectedRowKeys, selectedRows) {
      let len = selectedRowKeys.length;
      let publishItems = selectedRows.filter(i => i.isPublish === 1);
      let ids = publishItems.map(i => i.id);
      let publishLen = publishItems.length;
      if (publishLen) {
        this.$confirm({
          title: "确定撤销？",
          content: (
            <div>
              <p>
                当前选中了{len}条企业成果，其中已发布数量为{publishLen}
                条，确定撤销这{publishLen}条企业成果？
              </p>
              <p style="color: #999;">未发布的企业成果不受影响</p>
            </div>
          ),
          onOk: () => {
            return new Promise(resolve => {
              orgAchievementCancel(ids).then(res => {
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
          title: "无可撤销的企业成果",
          okText: "确定",
          content: (
            <div>
              <p>
                当前选中了{len}
                条企业成果，其中已发布数量为0条，无需执行撤销操作！
              </p>
              <p style="color: #999;">无可撤销的企业成果</p>
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
.company-achievement {
  width: 100%;
  height: 100%;
}
</style>
